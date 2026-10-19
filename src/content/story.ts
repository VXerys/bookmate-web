import type { PaletteToken } from "./palette.ts";

// Story copy for / (F-003 to F-005). Product facts come from the BookMate app repo (AGENTS.md, prd.md, lib/features);
// nothing here is a metric or a user claim.

export const prolog = {
  kicker: "Klub baca komunitas di Android",
  headlineLead: "Satu halaman lagi,",
  headlineEmphasis: "bareng teman.",
  body: "Catat progres bacaan, jaga streak harian, bedah buku bareng komunitas, dan pinjam buku fisik dari sesama pembaca.",
  secondary: "Lihat cara kerjanya",
  // Fragments of the app's UI floating around the phone; the values are illustrative, not user data.
  chips: {
    streak: "Streak harian",
    progress: "Catat bacaan · hal. 128",
    badge: "Lencana pembaca",
  },
} as const;

export const manifesto = {
  kicker: "Kenapa BookMate",
  text: "Membaca sendirian gampang berhenti di tengah jalan. Catatan tercecer di spreadsheet, semangat hilang di grup obrolan yang sepi. BookMate mengumpulkan progres, diskusi, dan teman baca di satu tempat, supaya selalu ada alasan untuk membuka satu halaman lagi.",
} as const;

export const buka = {
  kicker: "Buka aplikasinya",
  statement: "Semua bacaanmu, satu rak.",
  screen: "Beranda",
} as const;

// Shown inside phone frames until real screenshots from the production build arrive (docs/context/ASSUMPTIONS.md A-002).
export const screenPending = "Tangkapan layar menyusul";

export const babHeading = "Lima bab BookMate";

export type BabTone = Extract<PaletteToken, "plum" | "ember" | "forest" | "blue" | "peach">;

export type Bab = {
  number: string;
  title: string;
  body: string;
  screen: string;
  tone: BabTone;
};

export const babs: readonly Bab[] = [
  {
    number: "01",
    title: "Catat Bacaan",
    body: "Catat per halaman, bab, persen, atau catatan bebas. Buku baru dihitung selesai saat kamu sendiri menekan Selesai.",
    screen: "Catat Bacaan",
    tone: "plum",
  },
  {
    number: "02",
    title: "Streak Harian",
    body: "Check-in setiap hari dan lihat kalender bacaanmu terisi. Api streak menjaga kebiasaan tetap menyala.",
    screen: "Streak",
    tone: "ember",
  },
  {
    number: "03",
    title: "Bedah Buku",
    body: "Tulis refleksi mendalam dengan rating beberapa aspek, kutipan favorit, dan video bedah buku langsung di aplikasi.",
    screen: "Bedah Buku",
    tone: "forest",
  },
  {
    number: "04",
    title: "Komunitas",
    body: "Gabung komunitas baca di sekitarmu, buka thread diskusi, buat polling, dan beri reaksi.",
    screen: "Komunitas",
    tone: "blue",
  },
  {
    number: "05",
    title: "Pinjam Buku",
    body: "Pinjam buku fisik dari sesama anggota. Ruang obrolan terbuka begitu permintaanmu diterima.",
    screen: "Pinjam dan Chat",
    tone: "peach",
  },
];

// Text colour per chapter background; palette.test.ts and story.test.ts keep each pair inside the allowed list.
export const babText: Record<BabTone, PaletteToken> = {
  plum: "paper",
  ember: "ink",
  forest: "paper",
  blue: "ink",
  peach: "ink",
};

export const streak = {
  kicker: "Api streak",
  statement: "Check-in setiap hari. Lihat api streak-mu tumbuh.",
  calendarLabel: "Contoh kalender 30 hari",
  counterUnit: "hari berturut-turut",
} as const;

export const kartu = {
  kicker: "Kartu pembaca",
  statement: "Setiap kebiasaan membuka satu lencana.",
  summary: "30 lencana dalam 6 kategori",
  flipHint: "Balik kartu untuk melihat syaratnya",
  criteriaLabel: "Syarat",
} as const;

export const diskusi = {
  kicker: "Ruang diskusi",
  statement: "Bacaan terasa lebih seru kalau dibicarakan.",
  cards: [
    { title: "Thread diskusi", body: "Buka topik di komunitasmu dan balas langsung di bawahnya." },
    { title: "Polling", body: "Tanya pendapat anggota: buku apa yang dibaca bulan depan?" },
    { title: "Reaksi", body: "Beri reaksi emoji pada thread tanpa perlu mengetik panjang." },
    { title: "Chat pinjam buku", body: "Ruang obrolan terbuka begitu permintaan pinjam diterima." },
  ],
  marquee: ["Catat Bacaan", "Streak Harian", "Bedah Buku", "Komunitas", "Pinjam Buku", "Lencana Pembaca"],
} as const;

export const mulai = {
  kicker: "Cara mulai",
  steps: [
    { title: "Unduh BookMate", body: "Pasang dari Google Play di ponsel Android kamu." },
    { title: "Masuk", body: "Daftar dengan email atau akun Google." },
    { title: "Mulai halaman pertama", body: "Gabung komunitas baca, lalu catat bacaan pertamamu." },
  ],
} as const;

// Every answer cites where it comes from in the BookMate app repo, so the page never states an unverified fact.
export const faq = {
  kicker: "Pertanyaan",
  items: [
    {
      question: "Apakah BookMate gratis?",
      answer: "Ya. BookMate bisa diunduh gratis di Google Play.",
      source: "marketing_assets/threads/post_01_update_v1.1.0/content.md",
    },
    {
      question: "Apakah ada versi iPhone?",
      answer: "Saat ini BookMate tersedia untuk Android melalui Google Play.",
      source: "RELEASE_NOTES.md",
    },
    {
      question: "Bagaimana cara meminjam buku?",
      answer: "Kirim permintaan pinjam ke pemilik buku. Begitu diterima, ruang obrolan terbuka untuk mengatur penyerahan. Panduan lengkapnya ada di Pusat Bantuan aplikasi.",
      source: "lib/features/profile/data/datasources/help_center_data.dart",
    },
    {
      question: "Bagaimana cara menghapus akun?",
      answer: "Buka Pengaturan di aplikasi, lalu pilih Hapus Akun untuk menghapus akun dan datamu secara permanen.",
      source: "lib/features/profile/presentation/pages/settings_page.dart",
    },
  ],
} as const;

export const epilog = {
  statementLead: "Mulai halaman",
  statementEmphasis: "pertamamu.",
} as const;
