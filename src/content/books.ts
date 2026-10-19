// Generated from the BookMate app mock data (lib/core/mock/mock_data_constants.dart, 20 books seeded for the Play Store
// screenshots). Titles, authors, descriptions, genres, condition, and status are copied as the app defines them; the
// cover image paths are left out on purpose: the site draws its own typographic covers (rules.md bans commercial covers).
export type MockBook = {
  id: string;
  title: string;
  author: string;
  description: string;
  genre: readonly string[];
  condition: "LIKE_NEW" | "GOOD" | "FAIR";
  status: "AVAILABLE" | "BORROWED";
};

export const mockBooks: readonly MockBook[] = [
  {
    id: "mock-book-001",
    title: "A Sunny Place for Shady People",
    author: "Mariana Enriquez",
    description: "Sebuah koleksi cerita horor yang menghantui dari penulis Argentina terkemuka. Setiap cerita membawa pembaca ke dunia gelap yang tak terduga, penuh dengan kejutan dan ketegangan.",
    genre: ["Literature & Fiction","Mysteries, Thrillers & Suspense"],
    condition: "LIKE_NEW",
    status: "AVAILABLE",
  },
  {
    id: "mock-book-002",
    title: "Anita de Monte Laughs Last",
    author: "Xochitl Gonzalez",
    description: "Novel yang memadukan seni, cinta, dan ketidakadilan. Mengisahkan dua wanita Latina di dunia seni New York yang terpisah dua dekade, diikat oleh misteri yang mengejutkan.",
    genre: ["Arts & Photography","Literature & Fiction"],
    condition: "GOOD",
    status: "AVAILABLE",
  },
  {
    id: "mock-book-003",
    title: "Every Drop Is a Man's Nightmare",
    author: "Megan Kamalei Kakimoto",
    description: "Cerita-cerita yang hidup dan liar dari Hawaii, menggabungkan mitologi dan kehidupan modern para wanita Filipina-Jepang-Hawaii dalam kisah yang penuh emosi dan kekuatan.",
    genre: ["Literature & Fiction"],
    condition: "GOOD",
    status: "BORROWED",
  },
  {
    id: "mock-book-004",
    title: "Immaculate Conception",
    author: "María Fernanda Ampuero",
    description: "Thriller psikologis yang menyelami sisi gelap keluarga dan masyarakat di Amerika Latin. Ditulis dengan prosa yang tajam dan mengguncang.",
    genre: ["Politics & Social Sciences","Mysteries, Thrillers & Suspense"],
    condition: "FAIR",
    status: "AVAILABLE",
  },
  {
    id: "mock-book-005",
    title: "Jawbone",
    author: "Mónica Ojeda",
    description: "Novel horor sastra yang mengeksplorasi ketakutan, kekuasaan, dan hubungan guru-murid dalam setting sekolah elit di Ekuador. Gelap, intens, dan tak terlupakan.",
    genre: ["Literature & Fiction","Mysteries, Thrillers & Suspense"],
    condition: "LIKE_NEW",
    status: "AVAILABLE",
  },
  {
    id: "mock-book-006",
    title: "Somebody Is Walking on Your Grave",
    author: "Mariana Enriquez",
    description: "Perjalanan sastra yang memadukan travel writing dengan horror folk. Penulis menjelajahi pemakaman di seluruh dunia sambil mengungkap cerita-cerita misterius.",
    genre: ["History","Religion & Spirituality"],
    condition: "GOOD",
    status: "AVAILABLE",
  },
  {
    id: "mock-book-007",
    title: "The Mysterious Disappearance of the Marquise of Loria",
    author: "José Donoso",
    description: "Novel misteri berlatar Eropa abad 19 yang penuh intrik, dekadensi, dan rahasia gelap kaum aristokrat. Sebuah mahakarya sastra Chile.",
    genre: ["Mysteries, Thrillers & Suspense","History"],
    condition: "GOOD",
    status: "BORROWED",
  },
  {
    id: "mock-book-008",
    title: "The Obscene Bird of Night",
    author: "José Donoso",
    description: "Masterpiece sastra Latin Amerika yang surealis dan menghantui. Mengisahkan kehidupan seorang pria tuli-bisu di rumah peristirahatan yang dipenuhi monster dan keajaiban.",
    genre: ["Literature & Fiction"],
    condition: "FAIR",
    status: "AVAILABLE",
  },
  {
    id: "mock-book-009",
    title: "The Pumpkin Spice Café",
    author: "Laurie Gilmore",
    description: "Sebuah romansa yang hangat dan manis berlatar kafe kecil di kota Dream Harbor. Sempurna untuk pecinta kisah cinta yang nyaman dan menghangatkan hati.",
    genre: ["Romance"],
    condition: "LIKE_NEW",
    status: "AVAILABLE",
  },
  {
    id: "mock-book-010",
    title: "Things Don't Break on Their Own",
    author: "Sarah Easter Collins",
    description: "Novel sastra yang mengisahkan tiga generasi wanita dalam keluarga yang penuh rahasia. Tentang bagaimana masa lalu membentuk siapa kita.",
    genre: ["Literature & Fiction","Health, Family & Lifestyle"],
    condition: "GOOD",
    status: "AVAILABLE",
  },
  {
    id: "mock-book-011",
    title: "Things We Lost in the Fire",
    author: "Mariana Enriquez",
    description: "Koleksi dua belas cerita pendek yang menakjubkan dari Argentina. Menggabungkan horor dengan realita sosial untuk menciptakan sastra yang tak terlupakan.",
    genre: ["Literature & Fiction","Biographies & Memoirs"],
    condition: "LIKE_NEW",
    status: "BORROWED",
  },
  {
    id: "mock-book-012",
    title: "A Court of Thorns and Roses",
    author: "Sarah J. Maas",
    description: "Kisah epik fantasi dan romansa. Seorang pemburu muda ditarik ke dunia peri yang mempesona dan berbahaya, di mana ia menemukan cinta dan kekuatan sejatinya.",
    genre: ["Sci-Fi & Fantasy","Romance"],
    condition: "GOOD",
    status: "AVAILABLE",
  },
  {
    id: "mock-book-013",
    title: "A Palace Near the Wind",
    author: "Alison Hagy",
    description: "Novel sastra yang indah tentang kekuatan alam, seni, dan hubungan manusia di pedalaman Amerika. Prosa yang puitis dan menggetarkan jiwa.",
    genre: ["Literature & Fiction"],
    condition: "GOOD",
    status: "AVAILABLE",
  },
  {
    id: "mock-book-014",
    title: "Project Hail Mary",
    author: "Andy Weir",
    description: "Petualangan luar angkasa yang mendebarkan dari penulis The Martian. Seorang guru sains terbangun sendirian di pesawat antariksa dengan misi menyelamatkan Bumi.",
    genre: ["Sci-Fi & Fantasy","Science & Technology"],
    condition: "LIKE_NEW",
    status: "AVAILABLE",
  },
  {
    id: "mock-book-015",
    title: "Remarkably Bright Creatures",
    author: "Shelby Van Pelt",
    description: "Novel mengharukan tentang persahabatan tak terduga antara seorang wanita tua dan seekor gurita raksasa di akuarium. Kisah yang hangat dan penuh hikmah.",
    genre: ["Literature & Fiction"],
    condition: "GOOD",
    status: "AVAILABLE",
  },
  {
    id: "mock-book-016",
    title: "Rites of the Starling",
    author: "Lily Blaze",
    description: "Fantasi gelap yang memukau tentang sihir, pengorbanan, dan takdir. Di dunia di mana bintang-bintang berbicara, seorang gadis harus memilih antara kekuasaan dan kemanusiaan.",
    genre: ["Sci-Fi & Fantasy"],
    condition: "FAIR",
    status: "AVAILABLE",
  },
  {
    id: "mock-book-017",
    title: "The Lion, the Witch and the Wardrobe",
    author: "C.S. Lewis",
    description: "Klasik abadi tentang empat bersaudara yang menemukan dunia ajaib Narnia melalui sebuah lemari tua. Penuh petualangan, keberanian, dan keajaiban.",
    genre: ["Children & Kids","Sci-Fi & Fantasy"],
    condition: "LIKE_NEW",
    status: "BORROWED",
  },
  {
    id: "mock-book-018",
    title: "What You Are Looking for Is in the Library",
    author: "Michiko Aoyama",
    description: "Dari Jepang, kisah hangat tentang perpustakaan kecil yang mengubah hidup pengunjungnya. Setiap bab mengisahkan orang berbeda yang menemukan jawabannya di rak buku.",
    genre: ["Literature & Fiction"],
    condition: "GOOD",
    status: "AVAILABLE",
  },
  {
    id: "mock-book-019",
    title: "The Midnight Library",
    author: "Matt Haig",
    description: "Bagaimana jika kamu bisa mencoba semua kehidupan yang mungkin kamu jalani? Di perpustakaan tengah malam, setiap buku berisi kehidupan alternatif. Novel penuh harapan dan inspirasi.",
    genre: ["Literature & Fiction","Sci-Fi & Fantasy"],
    condition: "GOOD",
    status: "AVAILABLE",
  },
  {
    id: "mock-book-020",
    title: "Atomic Habits",
    author: "James Clear",
    description: "Panduan praktis untuk membangun kebiasaan baik dan menghilangkan kebiasaan buruk. Buku self-improvement terlaris yang mengajarkan kekuatan perubahan kecil.",
    genre: ["Business & Economics","Reference & Education"],
    condition: "LIKE_NEW",
    status: "AVAILABLE",
  },
];

// Labels as the app shows them in Indonesian.
export const conditionLabel: Record<MockBook["condition"], string> = { LIKE_NEW: "Seperti baru", GOOD: "Bagus", FAIR: "Cukup" };
export const statusLabel: Record<MockBook["status"], string> = { AVAILABLE: "Tersedia", BORROWED: "Sedang Dipinjam" };
