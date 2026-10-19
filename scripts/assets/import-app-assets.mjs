// Imports the BookMate app's own artwork into the site (F-014): book covers, tarot badges, memoji, community covers, and
// illustrations, resized for the web, plus the demo book and community data with each cover's dominant colour.
// Usage: node scripts/assets/import-app-assets.mjs [path to the bookmeet repo, default ../bookmeet]
// sharp comes with Next.js (image optimisation), so this script adds no dependency.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "../..");
const app = path.resolve(process.argv[2] ?? path.join(root, "../bookmeet"));
const out = path.join(root, "src/assets/images/app");
const mockFile = fs.readFileSync(path.join(app, "lib/core/mock/mock_data_constants.dart"), "utf8");
const resolver = fs.readFileSync(path.join(app, "lib/features/profile/domain/services/reading_achievement_resolver.dart"), "utf8");

const slug = (value) =>
  value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const camel = (value) => slug(value).replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

function block(name) {
  const start = mockFile.indexOf(`static final List<Map<String, dynamic>> ${name}`);
  return mockFile.slice(start, mockFile.indexOf("\n  ];", start)).split(/\n    \{/).slice(1);
}
function str(entry, key) {
  const single = new RegExp(`'${key}':\\s*'((?:[^'\\\\]|\\\\.)*)'`).exec(entry);
  if (single) return single[1].replace(/\\'/g, "'");
  const double = new RegExp(`'${key}':\\s*"([^"]*)"`).exec(entry);
  return double ? double[1] : null;
}
const num = (entry, key) => Number(new RegExp(`'${key}':\\s*(\\d+)`).exec(entry)?.[1] ?? 0);
const list = (entry, key) => {
  const m = new RegExp(`'${key}':\\s*\\[([^\\]]*)\\]`).exec(entry);
  return m ? [...m[1].matchAll(/'([^']*)'/g)].map((x) => x[1]) : [];
};

// WCAG relative luminance and contrast, so every card colour gets the readable text colour.
const lum = ([r, g, b]) => {
  const c = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const contrast = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const hex = (rgb) => "#" + rgb.map((v) => v.toString(16).padStart(2, "0")).join("");

// sharp's `dominant` lands on black or white for most covers, which makes flat cards. Pick the most present saturated
// colour instead: bucket the pixels, weight each bucket by its saturation, skip near-black and near-white pixels.
async function vibrant(file) {
  const { data, info } = await sharp(file).resize(60, 90, { fit: "fill" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const buckets = new Map();
  for (let i = 0; i < data.length; i += info.channels) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const max = Math.max(r, g, b) / 255;
    const min = Math.min(r, g, b) / 255;
    const light = (max + min) / 2;
    if (light < 0.12 || light > 0.93) continue;
    const sat = max === min ? 0 : (max - min) / (1 - Math.abs(2 * light - 1));
    const key = `${r >> 5}-${g >> 5}-${b >> 5}`;
    const bucket = buckets.get(key) ?? { n: 0, w: 0, r: 0, g: 0, b: 0 };
    bucket.n += 1;
    bucket.w += 0.1 + sat * sat;
    bucket.r += r;
    bucket.g += g;
    bucket.b += b;
    buckets.set(key, bucket);
  }
  const best = [...buckets.values()].sort((x, y) => y.w - x.w)[0];
  if (!best || best.n < 40) {
    const { dominant } = await sharp(file).stats();
    return [dominant.r, dominant.g, dominant.b];
  }
  return [best.r, best.g, best.b].map((v) => Math.round(v / best.n));
}
const INK = [3, 4, 10];
const WHITE = [255, 255, 255];

async function webp(source, target, width, quality = 82) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const image = sharp(source, { density: 220 }).resize({ width, withoutEnlargement: !source.endsWith(".svg") });
  await image.webp({ quality, alphaQuality: 90 }).toFile(target);
}

// Some mock authors do not match the printed cover; the site shows what the cover says.
const COVER_AUTHOR = {
  "Immaculate Conception": "Ling Ling Huang",
  "A Palace Near the Wind": "Ai Jiang",
  "Rites of the Starling": "Devney Perry",
};

const books = [];
for (const entry of block("books")) {
  const image = str(entry, "book_image");
  if (!image || !image.startsWith("$_bookAssetBase/")) continue;
  const file = path.join(app, "assets/images/book-image-cover", image.replace("$_bookAssetBase/", ""));
  if (!fs.existsSync(file)) continue;
  const title = str(entry, "title");
  const key = camel(title);
  const target = path.join(out, "covers", `${slug(title)}.webp`);
  await webp(file, target, 400, 86);
  const rgb = await vibrant(file);
  const text = contrast(rgb, INK) >= contrast(rgb, WHITE) ? "ink" : "white";
  books.push({
    id: str(entry, "id"),
    key,
    file: `covers/${slug(title)}.webp`,
    title,
    author: COVER_AUTHOR[title] ?? str(entry, "author"),
    mockAuthor: str(entry, "author"),
    description: str(entry, "description"),
    genre: list(entry, "genre"),
    condition: str(entry, "condition"),
    status: str(entry, "status"),
    color: hex(rgb),
    text,
    contrast: Number(Math.max(contrast(rgb, INK), contrast(rgb, WHITE)).toFixed(2)),
  });
}

const communities = [];
for (const entry of block("communities")) {
  const image = str(entry, "community_image");
  if (!image || image.startsWith("http")) continue;
  const file = path.join(app, image.replace(/^\$_\w+\//, "assets/images/komunitas-image-cover/"));
  const resolved = fs.existsSync(file) ? file : path.join(app, image);
  if (!fs.existsSync(resolved)) continue;
  const name = str(entry, "name");
  await webp(resolved, path.join(out, "komunitas", `${slug(name)}.webp`), 480);
  communities.push({
    id: str(entry, "id"),
    key: camel(name),
    file: `komunitas/${slug(name)}.webp`,
    name,
    description: str(entry, "description"),
    visibility: str(entry, "visibility"),
    members: num(entry, "member_count"),
    books: num(entry, "book_count"),
    city: /'city':\s*'([^']*)'/.exec(entry)?.[1] ?? "",
  });
}

// Tarot badges by code, from the resolver's own assetPath pairs.
const tarot = [...resolver.matchAll(/code:\s*'([A-Z_0-9]+)'[\s\S]*?assetPath:\s*'([^']+)'/g)].map((m) => ({ code: m[1], source: m[2] }));
for (const badge of tarot) {
  await webp(path.join(app, badge.source), path.join(out, "tarot", `${badge.code.toLowerCase()}.webp`), 520, 80);
}

const memojiDir = path.join(app, "assets/icons/memoji");
const memoji = fs.readdirSync(memojiDir).filter((f) => f.endsWith(".webp")).sort((a, b) => parseInt(a) - parseInt(b));
for (const file of memoji) await webp(path.join(memojiDir, file), path.join(out, "memoji", file), 320, 82);

const ILLUSTRATIONS = {
  rak: "icons/icons-color-bookmate/buku-saya.svg",
  pinjam: "icons/icons-color-bookmate/peminjaman-saya.svg",
  chat: "icons/icons-color-bookmate/chat-icons.svg",
  baca: "icons/icons-color-bookmate/create-book.svg",
  komunitas: "icons/icons-color-bookmate/community.svg",
  tandai: "icons/icons-color-bookmate/bookmark.svg",
  orangPinjam: "icons/empty-state/no-borrow.svg",
  orangPesan: "icons/empty-state/no-message.svg",
  orangKomunitas: "icons/empty-state/tidak-ada-komunitas.svg",
  orangRak: "icons/empty-state/tidak-ada-buku-saya.svg",
  orangCari: "icons/empty-state/search.svg",
};
for (const [key, source] of Object.entries(ILLUSTRATIONS)) {
  await webp(path.join(app, "assets", source), path.join(out, "ilustrasi", `${slug(key)}.webp`), 640, 86);
}

// Generated content (no bundler imports) and the image map (static imports for next/image).
const withoutFile = (item) => {
  const copy = { ...item };
  delete copy.file;
  return copy;
};
const header = "// Generated by scripts/assets/import-app-assets.mjs from the BookMate app repo. Do not edit by hand; rerun the script.\n";
fs.writeFileSync(
  path.join(root, "src/content/app-data.ts"),
  `${header}// Covers are publisher artwork used on the owner's instruction (2026-10-19); they block release until cleared (A-002).
// \`mockAuthor\` keeps the app's value where the cover prints a different author.

export type DemoBook = {
  id: string;
  key: string;
  title: string;
  author: string;
  mockAuthor: string;
  description: string;
  genre: readonly string[];
  condition: "LIKE_NEW" | "GOOD" | "FAIR";
  status: "AVAILABLE" | "BORROWED";
  color: string;
  text: "ink" | "white";
  contrast: number;
};

export type DemoCommunity = {
  id: string;
  key: string;
  name: string;
  description: string;
  visibility: string;
  members: number;
  books: number;
  city: string;
};

export const demoBooks: readonly DemoBook[] = ${JSON.stringify(books.map(withoutFile), null, 2)};

export const demoCommunities: readonly DemoCommunity[] = ${JSON.stringify(communities.map(withoutFile), null, 2)};

export const memojiIds = ${JSON.stringify(memoji.map((f) => f.replace(".webp", "")))} as const;
`,
);

const imports = [];
const entries = (items, prefix) => items.map(({ key, file }) => {
  const name = `${prefix}${key[0].toUpperCase()}${key.slice(1)}`;
  imports.push(`import ${name} from "@/assets/images/app/${file}";`);
  return `  ${JSON.stringify(key)}: ${name},`;
});
const coverEntries = entries(books, "cover");
const communityEntries = entries(communities, "community");
const tarotEntries = entries(tarot.map((t) => ({ key: t.code, file: `tarot/${t.code.toLowerCase()}.webp` })), "tarot");
const memojiEntries = entries(memoji.map((f) => ({ key: f.replace(".webp", ""), file: `memoji/${f}` })), "memoji");
const illustrationEntries = entries(Object.keys(ILLUSTRATIONS).map((key) => ({ key, file: `ilustrasi/${slug(key)}.webp` })), "art");
fs.writeFileSync(
  path.join(root, "src/components/site/app-images.ts"),
  `${header}import type { StaticImageData } from "next/image";

${imports.join("\n")}

export const coverImages: Record<string, StaticImageData> = {
${coverEntries.join("\n")}
};

export const communityImages: Record<string, StaticImageData> = {
${communityEntries.join("\n")}
};

export const tarotImages: Record<string, StaticImageData> = {
${tarotEntries.join("\n")}
};

export const memojiImages: Record<string, StaticImageData> = {
${memojiEntries.join("\n")}
};

export const illustrationImages = {
${illustrationEntries.join("\n")}
} satisfies Record<string, StaticImageData>;
`,
);

console.log(`books ${books.length}, communities ${communities.length}, tarot ${tarot.length}, memoji ${memoji.length}, illustrations ${Object.keys(ILLUSTRATIONS).length}`);
for (const book of books) console.log(`  ${book.title} | ${book.author}${book.author !== book.mockAuthor ? ` (mock: ${book.mockAuthor})` : ""} | ${book.color} ${book.text} ${book.contrast}`);
