// Single home for brand facts, so a confirmed rename (see A-001 in docs/context/ASSUMPTIONS.md) touches one file.
export const site = {
  name: "BookMate",
  tagline: "Tempat buku bertemu rumah barunya, dan pembaca menemukan teman seperjalanannya.",
  description:
    "Klub baca di saku kamu: catat progres bacaan, jaga streak harian, bedah buku bareng komunitas, dan pinjam buku fisik dari sesama pembaca.",
  // Title and description for link previews (WhatsApp, Instagram, X, search results), kept under about 160 characters.
  shareTitle: "BookMate: klub baca komunitas & pinjam buku fisik",
  shareDescription:
    "Pinjam buku fisik dari rak teman, catat progres, jaga streak, bedah buku bareng klub, dan kumpulkan 30 lencana. Gratis untuk Android di Google Play.",
  publisher: "Mangcoding",
  locale: "id-ID",
  app: {
    version: "1.1.0",
    platform: "Android",
    packageId: "com.mangcoding.bookmate2",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.mangcoding.bookmate2",
  },
} as const;
