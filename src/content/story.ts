import type { PaletteToken } from "./palette.ts";
import type { ScreenId } from "./screens.ts";

// Story copy for / (F-014). One thread runs through the page: find a book on a friend's shelf, borrow it, read it with
// the app, talk about it in a club, earn a badge, start. Product facts come from the BookMate app repo (AGENTS.md,
// lib/features); nothing here is a metric or a user claim. Handwritten notes are decorative scribbles, not testimonials.
// Polling is left out on purpose: it is frozen in the app (composer_action_sheet.dart, "TODO/FROZEN").

// Card and pill colours: every tone here carries ink text (palette.test.ts and story.test.ts check the pairs).
export type Tone = Extract<PaletteToken, "highlight" | "ember" | "green" | "coral" | "gold" | "sky" | "blue" | "peach" | "white">;

export const prolog = {
  headlineLead: "Satu halaman lagi,",
  headlineEmphasis: "bareng teman.",
  eyebrow: "Klub baca komunitas di Android",
  body: "Pinjam buku fisik dari rak teman, catat progres, jaga streak, dan bedah buku bareng komunitasmu.",
  secondary: "Intip rak teman",
  // Three things the app does, shown as chips under the buttons (lib/features: borrow_request, streak, reflection).
  chips: ["Pinjam buku fisik", "Streak harian", "Bedah buku"],
  stamp: "KLUB BACA · PINJAM BUKU · BEDAH BUKU · ",
  sticker: "Gratis!",
  note: "ada di Google Play",
} as const;

// The shelf shows the app's own demo data (src/content/app-data.ts); the label says so, so no visitor reads it as
// live listings.
export const buku = {
  kicker: "Bab 1 · Temukan",
  title: "Rak teman bulan ini",
  lead: "Buku-buku ini menunggu di rak sesama anggota. Cek kondisinya, lihat yang tersedia, lalu ajukan pinjam lewat aplikasi.",
  note: "geser raknya, pilih satu",
  demoLabel: "Data demo aplikasi",
  // Ten of the 18 demo books, picked for varied cover colours; a longer shelf made the pinned scroll drag (owner, F-014).
  // The hero's three books come first, so each lands on its own card when the hero hands off to the shelf.
  featured: [
    "aCourtOfThornsAndRoses",
    "thePumpkinSpiceCafe",
    "remarkablyBrightCreatures",
    "aSunnyPlaceForShadyPeople",
    "anitaDeMonteLaughsLast",
    "immaculateConception",
    "somebodyIsWalkingOnYourGrave",
    "projectHailMary",
    "thingsWeLostInTheFire",
    "whatYouAreLookingForIsInTheLibrary",
  ],
  condition: { LIKE_NEW: "Seperti baru", GOOD: "Bagus", FAIR: "Cukup" },
  status: { AVAILABLE: "Tersedia", BORROWED: "Dipinjam" },
  previous: "Buku sebelumnya",
  next: "Buku berikutnya",
} as const;

export type BorrowStep = {
  title: string;
  body: string;
  // Which animated step icon the card shows (src/components/art/borrow-icons.tsx).
  art: "cari" | "pinjam" | "chat" | "ulas";
  tone: Tone;
};

// Steps and button names follow the app's borrow flow (lib/features/borrow_request): the borrower taps Pinjam Buku,
// the owner taps Setujui Permintaan, the chat opens, the owner taps Tandai Sudah Dikembalikan, the borrower taps
// Berikan Ulasan.
export const pinjam = {
  kicker: "Bab 2 · Pinjam",
  title: "Dari rak teman ke tanganmu",
  lead: "Bukunya pindah tangan, pertemanannya bertambah. Begini perjalanan satu buku pinjaman.",
  note: "bukunya ikut jalan-jalan",
  steps: [
    { title: "Temukan bukunya", body: "Cari judul atau intip rak anggota. Kondisi dan ketersediaannya terlihat sebelum kamu meminta.", art: "cari", tone: "white" },
    { title: "Tekan Pinjam Buku", body: "Permintaanmu masuk ke pemilik buku, yang tinggal menekan Setujui Permintaan.", art: "pinjam", tone: "highlight" },
    { title: "Ngobrol di chat", body: "Begitu disetujui, ruang Chat Peminjaman terbuka untuk mengatur waktu dan tempat ketemu.", art: "chat", tone: "white" },
    { title: "Kembalikan, beri ulasan", body: "Pemilik menandai buku sudah dikembalikan, lalu kamu menulis ulasan untuk peminjamannya.", art: "ulas", tone: "highlight" },
  ] as readonly BorrowStep[],
} as const;

export const aplikasi = {
  kicker: "Bab 3 · Baca",
  // Split around the phone: the lead sits above it and the tail below, so the sentence reads across the device.
  statementLead: "Semua bacaanmu,",
  statementTail: "satu saku.",
  // Screens the phone flips through while the scene is pinned.
  screens: ["bukuSaya", "catatBacaan", "bedahBuku"] satisfies ScreenId[],
  stamp: "CATAT · STREAK · BEDAH BUKU · ",
  stepsTitle: "Mulai dalam tiga langkah",
  steps: [
    { title: "Unduh BookMate", body: "Pasang dari Google Play di ponsel Android kamu." },
    { title: "Masuk", body: "Daftar dengan email atau akun Google." },
    { title: "Mulai halaman pertama", body: "Gabung komunitas baca, lalu catat bacaan pertamamu." },
  ],
  note: "cuma tiga langkah",
} as const;

export type Feature = {
  id: string;
  title: string;
  body: string;
  screen: ScreenId;
  tone: Tone;
};

export const fitur = {
  kicker: "Pilih caramu membaca",
  note: "arahkan kursor, intip layarnya",
  curve: "catat · streak · bedah · pinjam · komunitas ·",
  items: [
    { id: "catat", title: "Catat Bacaan", body: "Per halaman, bab, persen, atau catatan bebas.", screen: "catatBacaan", tone: "coral" },
    { id: "streak", title: "Streak Harian", body: "Check-in tiap hari, nyalakan api streak.", screen: "beranda", tone: "highlight" },
    { id: "bedah", title: "Bedah Buku", body: "Refleksi, rating beberapa aspek, kutipan favorit.", screen: "bedahBuku", tone: "green" },
    { id: "komunitas", title: "Komunitas", body: "Thread diskusi dan reaksi di klub bacamu.", screen: "komunitas", tone: "sky" },
    { id: "pinjam", title: "Pinjam Buku", body: "Buku fisik dari sesama anggota, lengkap dengan chat.", screen: "chatPinjam", tone: "ember" },
    { id: "rak-buku", title: "Buku Saya", body: "Satu rak untuk semua bukumu dan ketersediaannya.", screen: "bukuSaya", tone: "gold" },
  ] as readonly Feature[],
} as const;

// Each pill states a fact with its source in the app repo, so the page never claims more than the app does.
export const kenapa = {
  kicker: "Kenapa BookMate",
  title: "Karena membaca lebih seru kalau ada temannya",
  stamp: "BOOKMATE · TEMAN BACAMU · ",
  sticker: "Ayo baca!",
  pills: [
    { label: "Gratis", tone: "highlight", source: "marketing_assets/threads/post_01_update_v1.1.0/content.md" },
    { label: "Untuk Android", tone: "blue", source: "RELEASE_NOTES.md" },
    { label: "Klub baca komunitas", tone: "white", source: "AGENTS.md" },
    { label: "Pinjam buku fisik", tone: "sky", source: "lib/features/borrow_request" },
    { label: "30 lencana", tone: "highlight", source: "reading_achievement_resolver.dart" },
  ] as readonly { label: string; tone: Tone; source: string }[],
} as const;

export const komunitas = {
  kicker: "Bab 4 · Diskusi",
  title: "Temukan klub bacamu",
  lead: "Gabung komunitas di kotamu atau yang sehobi denganmu. Buka thread, bedah buku bareng, dan beri reaksi.",
  note: "kenalan dulu, baca bareng kemudian",
  demoLabel: "Contoh dari data demo aplikasi",
  sticker: "Klub baca",
  visibility: { PUBLIC: "Publik", PRIVATE: "Privat" } as Record<string, string>,
} as const;

export const pita = {
  // Sentence case, like a real promo line; each fact is backed elsewhere on the page (FAQ, kenapa pills).
  phrases: ["Unduh gratis di Google Play", "Pinjam buku fisik dari rak teman", "Gabung klub baca di kotamu", "Kumpulkan 30 lencana tarot"],
} as const;

export const lencana = {
  kicker: "Bab 5 · Rayakan",
  title: "Setiap kebiasaan membuka satu lencana",
  lead: "30 lencana bergaya kartu tarot dalam 6 kategori. Ini kartu tier tertingginya; balik kartunya untuk melihat syarat.",
  note: "aku lagi ngejar yang ini",
  sticker: "30 kartu",
  tierLabel: "Tier",
  criteriaLabel: "Syarat",
  flipLabel: "Balik kartu",
} as const;

// Every answer cites where it comes from in the BookMate app repo, so the page never states an unverified fact.
export const faq = {
  title: "Pertanyaan yang sering muncul",
  note: "masih bingung? tanya di komunitas",
  sticker: "Tanya?",
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
  kicker: "Bab terakhir · Mulai",
  statementLead: "Mulai halaman",
  statementEmphasis: "pertamamu.",
  curve: "satu halaman lagi · bareng teman ·",
  stamp: "SAMPAI JUMPA · DI HALAMAN BERIKUTNYA · ",
  note: "sampai jumpa di halaman berikutnya",
} as const;
