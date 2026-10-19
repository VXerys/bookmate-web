// App screens shown inside phone frames. The images are temporary screenshots from the owner's own device
// (public/CREDITS.md); they still show the owner's name, a chat partner, and commercial book covers, so A-002 stays
// open until clean captures from the production build replace them.
export const screens = {
  onboarding: {
    label: "Onboarding",
    alt: "Layar pembuka BookMate: Temukan Teman Baca dan Pinjam Bukunya.",
  },
  onboardingPinjam: {
    label: "Onboarding pinjam",
    alt: "Layar pembuka BookMate: Pinjam Buku Jadi Lebih Mudah dan Cepat.",
  },
  bukuSaya: {
    label: "Buku Saya",
    alt: "Rak Buku Saya di BookMate berisi kartu buku dengan status ketersediaan.",
  },
  beranda: {
    label: "Beranda",
    alt: "Beranda BookMate dengan kartu Aktivitas Membaca dan progres halaman.",
  },
  catatBacaan: {
    label: "Catat Bacaan",
    alt: "Layar Catat Bacaan: pilih Mulai, Update, atau Selesai, lalu isi progres per halaman, persen, bab, atau catatan.",
  },
  bedahBuku: {
    label: "Bedah Buku",
    alt: "Daftar Bedah Buku di sebuah komunitas BookMate.",
  },
  komunitas: {
    label: "Komunitas",
    alt: "Halaman komunitas Ruang Tumbuh Bersama dengan deskripsi, pengelola, dan jumlah anggota.",
  },
  chatPinjam: {
    label: "Chat pinjam",
    alt: "Ruang obrolan peminjaman buku antara peminjam dan pemilik buku.",
  },
} as const;

export type ScreenId = keyof typeof screens;
