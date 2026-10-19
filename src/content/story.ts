import type { PaletteToken } from "./palette.ts";
import type { ScreenId } from "./screens.ts";

// Story copy for / (F-012 Marginalia: one reader's day). Product facts come from the BookMate app repo (AGENTS.md,
// prd.md, lib/features); nothing here is a metric or a user claim. Margin notes ("note") are illustrative scribbles of
// a club member, shown decoratively, never as testimonials or quotes from real people.

export const prolog = {
  kicker: "Klub baca komunitas di Android",
  headlineLead: "Satu halaman lagi,",
  headlineEmphasis: "bareng teman.",
  body: "Catat progres bacaan, jaga streak harian, bedah buku bareng komunitas, dan pinjam buku fisik dari sesama pembaca.",
  secondary: "Lihat satu harinya",
  screen: "onboarding" satisfies ScreenId,
  notes: {
    cta: "mulai dari sini!",
    page: "hal. 128, dikit lagi",
    club: "bedah bab 3 malam ini ya",
  },
} as const;

// Segments let the manifesto strike out the problem and circle the answer without splitting words by hand.
export type ManifestoMark = "strike" | "circle";
export const manifesto = {
  kicker: "Kenapa BookMate",
  segments: [
    { text: "Membaca sendirian gampang berhenti di tengah jalan. Catatan tercecer di " },
    { text: "spreadsheet", mark: "strike" },
    { text: ", semangat hilang di " },
    { text: "grup obrolan yang sepi", mark: "strike" },
    { text: ". BookMate mengumpulkan progres, diskusi, dan teman baca di " },
    { text: "satu tempat", mark: "circle" },
    { text: ", supaya selalu ada alasan untuk membuka satu halaman lagi." },
  ] as readonly { text: string; mark?: ManifestoMark }[],
  note: "relate banget.",
} as const;

export const buka = {
  kicker: "Buka aplikasinya",
  // Split around the phone: the lead sits above it and the tail below, so the sentence reads across the device.
  statementLead: "Semua bacaanmu,",
  statementTail: "satu rak.",
  screen: "bukuSaya" satisfies ScreenId,
  note: "rak digitalmu",
} as const;

export type Moment = "pagi" | "siang" | "sore" | "malam" | "besok";

export type Spread = {
  id: Moment;
  time: string;
  when: string;
  title: string;
  body: string;
  points: readonly string[];
  note: string;
  screen: ScreenId;
  // The colour of the room around the book at that hour; text outside the book follows `outsideText`.
  outside: PaletteToken;
};

export const hari = {
  kicker: "Satu hari pembaca",
  title: "Dari kopi pagi sampai buku pindah tangan.",
  pageLabel: "hal.",
  spreads: [
    {
      id: "pagi",
      time: "06.30",
      when: "Pagi",
      title: "Streak Harian",
      body: "Check-in setiap hari dan lihat kalender bacaanmu terisi. Api streak menjaga kebiasaan tetap menyala.",
      points: ["Check-in sekali sehari", "Kalender bacaan terisi", "Api streak ikut tumbuh"],
      note: "jangan sampai putus!",
      screen: "beranda",
      outside: "sky",
    },
    {
      id: "siang",
      time: "12.15",
      when: "Siang",
      title: "Catat Bacaan",
      body: "Catat per halaman, bab, persen, atau catatan bebas. Buku baru dihitung selesai saat kamu sendiri menekan Selesai.",
      points: ["Per halaman, bab, atau persen", "Catatan bebas", "Selesai saat kamu bilang selesai"],
      note: "istirahat makan = 12 halaman",
      screen: "catatBacaan",
      outside: "peach-pale",
    },
    {
      id: "sore",
      time: "16.00",
      when: "Sore",
      title: "Bedah Buku",
      body: "Tulis refleksi mendalam dengan rating beberapa aspek, kutipan favorit, dan video bedah buku langsung di aplikasi.",
      points: ["Rating beberapa aspek", "Kutipan favorit", "Video bedah buku"],
      note: "kutipan ini wajib dibahas",
      screen: "bedahBuku",
      outside: "peach",
    },
    {
      id: "malam",
      time: "20.00",
      when: "Malam",
      title: "Komunitas",
      body: "Gabung komunitas baca di sekitarmu, buka thread diskusi, buat polling, dan beri reaksi.",
      points: ["Thread diskusi", "Polling", "Reaksi"],
      note: "bulan depan baca apa?",
      screen: "komunitas",
      outside: "plum",
    },
    {
      id: "besok",
      time: "09.00",
      when: "Besok",
      title: "Pinjam Buku",
      body: "Pinjam buku fisik dari sesama anggota. Ruang obrolan terbuka begitu permintaanmu diterima.",
      points: ["Pinjam dari sesama anggota", "Chat terbuka saat diterima"],
      note: "nanti kubalikin, janji",
      screen: "chatPinjam",
      outside: "sky",
    },
  ] as readonly Spread[],
} as const;

// Text colour for labels that sit outside the book, on the room colour of each hour (palette.test.ts checks pairs).
export const outsideText: Partial<Record<PaletteToken, PaletteToken>> = {
  sky: "ink",
  "peach-pale": "ink",
  peach: "ink",
  plum: "paper",
};

export const rak = {
  kicker: "Rak lencana",
  statement: "Setiap kebiasaan membuka satu lencana.",
  summary: "30 lencana dalam 6 kategori.",
  hint: "Tarik satu buku dari rak untuk melihat syaratnya.",
  tierLabel: "Tier",
  criteriaLabel: "Syarat",
  note: "aku lagi ngejar yang ini",
} as const;

export const papan = {
  kicker: "Papan komunitas",
  statement: "Bacaan terasa lebih seru kalau dibicarakan.",
  notes: [
    { id: "thread", title: "Thread diskusi", body: "Buka topik di komunitasmu dan balas langsung di bawahnya." },
    { id: "polling", title: "Polling", body: "Tanya pendapat anggota: buku apa yang dibaca bulan depan?" },
    { id: "reaksi", title: "Reaksi", body: "Beri reaksi pada thread tanpa perlu mengetik panjang." },
    { id: "chat", title: "Chat pinjam buku", body: "Ruang obrolan terbuka begitu permintaan pinjam diterima." },
  ],
  // Labels inside the illustrated poll; an example, not real votes.
  pollExample: { label: "contoh", options: ["Fiksi", "Nonfiksi", "Puisi"] },
  marquee: ["Catat Bacaan", "Streak Harian", "Bedah Buku", "Komunitas", "Pinjam Buku", "Lencana Pembaca"],
} as const;

export const mulai = {
  kicker: "Cara mulai",
  screen: "onboardingPinjam" satisfies ScreenId,
  steps: [
    { title: "Unduh BookMate", body: "Pasang dari Google Play di ponsel Android kamu." },
    { title: "Masuk", body: "Daftar dengan email atau akun Google." },
    { title: "Mulai halaman pertama", body: "Gabung komunitas baca, lalu catat bacaan pertamamu." },
  ],
  note: "cuma tiga langkah",
} as const;

// Every answer cites where it comes from in the BookMate app repo, so the page never states an unverified fact.
export const faq = {
  kicker: "Indeks",
  title: "Pertanyaan yang sering muncul",
  note: "masih bingung? tanya di komunitas",
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
  note: "sampai jumpa di halaman berikutnya",
} as const;
