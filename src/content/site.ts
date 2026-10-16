// Single home for brand facts, so a confirmed rename (see A-001 in docs/context/ASSUMPTIONS.md) touches one file.
export const site = {
  name: "BookMate",
  tagline: "Tempat buku bertemu rumah barunya, dan pembaca menemukan teman seperjalanannya.",
  description:
    "Klub baca di saku kamu: catat progres bacaan, jaga streak harian, bedah buku bareng komunitas, dan pinjam buku fisik dari sesama pembaca.",
  publisher: "Mangcoding",
  locale: "id-ID",
  app: {
    version: "1.1.0",
    platform: "Android",
    packageId: "com.mangcoding.bookmate2",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.mangcoding.bookmate2",
  },
} as const;
