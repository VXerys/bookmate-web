import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

import { WCAG_AA, contrastRatio } from "../lib/color/contrast.ts";
import { demoBooks, demoCommunities, memojiIds } from "./app-data.ts";
import { palette } from "./palette.ts";

const images = readFileSync(new URL("../components/site/app-images.ts", import.meta.url), "utf8");
const imported = (key: string) => new RegExp(`^  "${key}": \\w+,$`, "m").test(images);

test("the shelf holds the 18 mock books that ship a cover in the app", () => {
  assert.equal(demoBooks.length, 18);
  assert.equal(new Set(demoBooks.map((book) => book.key)).size, 18);
  for (const book of demoBooks) assert.ok(imported(book.key), `${book.title} has no cover import`);
});

test("every card colour carries its text colour at WCAG AA", () => {
  for (const book of demoBooks) {
    const ratio = contrastRatio(book.text === "ink" ? palette.ink : palette.white, book.color);
    assert.ok(ratio >= WCAG_AA.normal, `${book.title}: ${book.text} on ${book.color} is ${ratio.toFixed(2)}:1`);
  }
});

test("the site shows the author printed on the cover where the mock differs", () => {
  const author = (title: string) => demoBooks.find((book) => book.title === title)?.author;
  assert.equal(author("Immaculate Conception"), "Ling Ling Huang");
  assert.equal(author("A Palace Near the Wind"), "Ai Jiang");
  assert.equal(author("Rites of the Starling"), "Devney Perry");
});

test("communities and memoji all have an imported image file", () => {
  assert.equal(demoCommunities.length, 5);
  for (const community of demoCommunities) {
    assert.ok(imported(community.key), community.name);
    assert.ok(community.city.length > 0, community.name);
  }
  for (const id of memojiIds) {
    assert.ok(imported(id), `memoji ${id}`);
    assert.ok(existsSync(new URL(`../assets/images/app/memoji/${id}.webp`, import.meta.url)), `memoji ${id} file`);
  }
});
