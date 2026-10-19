import type { PaletteToken } from "./palette.ts";
import type { ScreenId } from "./screens.ts";

// Story copy for / (F-013). Product facts come from the BookMate app repo (AGENTS.md, prd.md, lib/features); nothing
// here is a metric or a user claim. Handwritten notes are illustrative scribbles shown decoratively, never testimonials.

// Card and pill colours: every tone here carries ink text (palette.test.ts and story.test.ts check the pairs).
export type Tone = Extract<PaletteToken, "highlight" | "ember" | "green" | "coral" | "gold" | "sky" | "blue" | "peach">;

export const prolog = {
  headlineLead: "Satu halaman lagi,",
  headlineEmphasis: "bareng teman.",
  body: "Klub baca komunitas di Android. Catat progres, jaga streak, bedah buku bareng, dan pinjam buku fisik dari sesama pembaca.",
  secondary: "Lihat fiturnya",
  note: "Gratis di Google Play",
  screen: "onboarding" satisfies ScreenId,
} as const;

// The books shelf shows the app's own demo data (src/content/books.ts); the label says so, so no visitor reads it as
// live listings.
export const buku = {
  title: "Buku di rak teman",
  lead: "Intip rak anggota: lihat kondisinya, cek yang tersedia, lalu ajukan pinjam lewat aplikasi.",
  note: "contoh dari data demo aplikasi",
  demoLabel: "Data demo",
  previous: "Buku sebelumnya",
  next: "Buku berikutnya",
} as const;

export type Feature = {
  id: string;
  title: string;
  body: string;
  tags: readonly string[];
  screen: ScreenId;
  tone: Tone;
};

export const fitur = {
  title: "Semua yang kamu butuh buat baca bareng",
  lead: "Satu aplikasi untuk mencatat, menjaga semangat, dan ngobrolin buku dengan komunitasmu.",
  note: "geser buat lihat semua",
  previous: "Fitur sebelumnya",
  next: "Fitur berikutnya",
  items: [
    {
      id: "catat",
      title: "Catat Bacaan",
      body: "Catat per halaman, bab, persen, atau catatan bebas. Buku selesai saat kamu sendiri menekan Selesai.",
      tags: ["Progres", "Catatan"],
      screen: "catatBacaan",
      tone: "coral",
    },
    {
      id: "streak",
      title: "Streak Harian",
      body: "Check-in setiap hari dan lihat kalender bacaanmu terisi. Api streak menjaga kebiasaan tetap menyala.",
      tags: ["Kebiasaan", "Kalender"],
      screen: "beranda",
      tone: "highlight",
    },
    {
      id: "bedah",
      title: "Bedah Buku",
      body: "Tulis refleksi dengan rating beberapa aspek, kutipan favorit, dan video bedah buku langsung di aplikasi.",
      tags: ["Refleksi", "Rating"],
      screen: "bedahBuku",
      tone: "green",
    },
    {
      id: "komunitas",
      title: "Komunitas",
      body: "Gabung komunitas baca di sekitarmu, buka thread diskusi, buat polling, dan beri reaksi.",
      tags: ["Thread", "Polling"],
      screen: "komunitas",
      tone: "sky",
    },
    {
      id: "pinjam",
      title: "Pinjam Buku",
      body: "Pinjam buku fisik dari sesama anggota. Ruang obrolan terbuka begitu permintaanmu diterima.",
      tags: ["Buku fisik", "Chat"],
      screen: "chatPinjam",
      tone: "ember",
    },
    {
      id: "rak-buku",
      title: "Buku Saya",
      body: "Kumpulkan buku milikmu di satu rak dan tandai mana yang tersedia untuk dipinjam teman.",
      tags: ["Koleksi", "Ketersediaan"],
      screen: "bukuSaya",
      tone: "gold",
    },
  ] as readonly Feature[],
} as const;

export type Moment = "pagi" | "siang" | "sore" | "malam" | "besok";

export type Hour = {
  id: Moment;
  time: string;
  when: string;
  title: string;
  body: string;
  tone: Tone;
};

export const hari = {
  title: "Satu hari bareng BookMate",
  lead: "Dari kopi pagi sampai buku pindah tangan.",
  note: "begini harinya pembaca",
  hours: [
    { id: "pagi", time: "06.30", when: "Pagi", title: "Check-in streak", body: "Buka aplikasi, check-in, dan api streak-mu bertambah satu hari.", tone: "sky" },
    { id: "siang", time: "12.15", when: "Siang", title: "Catat bacaan", body: "Istirahat makan siang, catat sampai halaman berapa kamu membaca.", tone: "highlight" },
    { id: "sore", time: "16.00", when: "Sore", title: "Bedah buku", body: "Tulis refleksi, beri rating, dan simpan kutipan favoritmu.", tone: "ember" },
    { id: "malam", time: "20.00", when: "Malam", title: "Ngobrol di komunitas", body: "Balas thread, ikut polling, dan beri reaksi di klub bacamu.", tone: "blue" },
    { id: "besok", time: "09.00", when: "Besok", title: "Pinjam ke teman", body: "Ajukan pinjam buku fisik; chat terbuka begitu diterima.", tone: "green" },
  ] as readonly Hour[],
} as const;

export const buka = {
  // Split around the phone: the lead sits above it and the tail below, so the sentence reads across the device.
  statementLead: "Semua bacaanmu,",
  statementTail: "satu rak.",
  screen: "bukuSaya" satisfies ScreenId,
  stepsTitle: "Mulai dalam tiga langkah",
  steps: [
    { title: "Unduh BookMate", body: "Pasang dari Google Play di ponsel Android kamu." },
    { title: "Masuk", body: "Daftar dengan email atau akun Google." },
    { title: "Mulai halaman pertama", body: "Gabung komunitas baca, lalu catat bacaan pertamamu." },
  ],
  note: "cuma tiga langkah",
} as const;

export const daftar = {
  kicker: "Pilih caramu membaca",
  note: "ada fitur untuk setiap pembaca",
} as const;

// Each pill states a fact with its source in the app repo, so the page never claims more than the app does.
export const manfaat = {
  title: "Kenapa BookMate",
  pills: [
    { label: "Gratis", tone: "coral", source: "marketing_assets/threads/post_01_update_v1.1.0/content.md" },
    { label: "Untuk Android", tone: "ember", source: "RELEASE_NOTES.md" },
    { label: "Klub baca komunitas", tone: "sky", source: "AGENTS.md" },
    { label: "Pinjam buku fisik", tone: "green", source: "lib/features" },
    { label: "30 lencana", tone: "gold", source: "reading_achievement_resolver.dart" },
  ] as readonly { label: string; tone: Tone; source: string }[],
} as const;

export const rak = {
  title: "Setiap kebiasaan membuka satu lencana",
  lead: "30 lencana dalam 6 kategori. Balik kartunya untuk melihat syaratnya.",
  note: "aku lagi ngejar yang ini",
  tierLabel: "Tier",
  criteriaLabel: "Syarat",
  flipLabel: "Balik kartu",
} as const;

// Every answer cites where it comes from in the BookMate app repo, so the page never states an unverified fact.
export const faq = {
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
