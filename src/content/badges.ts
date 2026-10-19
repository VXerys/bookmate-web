// Generated from the BookMate app: lib/features/profile/domain/services/reading_achievement_resolver.dart
// (names, philosophy, and unlock criteria exactly as the app defines them). The tarot card art ships since F-014 on the
// owner's instruction; its rights are still tracked in docs/context/ASSUMPTIONS.md A-003.
export type Badge = {
  code: string;
  title: string;
  philosophy: string;
  criteria: string;
  category: string;
  tier: string;
  group: string;
};

export const badges: readonly Badge[] = [
  {
    "code": "READ_COMPLETED_01",
    "title": "The Curious Ursa",
    "philosophy": "Langkah awal sang penjelajah cilik mengikuti panduan bintang menembus semesta cerita pertamanya.",
    "criteria": "Tamatkan minimal 3 buku bacaan.",
    "category": "reading",
    "tier": "I",
    "group": "Perjalanan Membaca (Completed Books)"
  },
  {
    "code": "READ_COMPLETED_03",
    "title": "The Starlight Cat",
    "philosophy": "Untuk para pengembara yang betah terjaga larut malam bersama kisah-kisah memikat.",
    "criteria": "Tamatkan minimal 8 buku bacaan.",
    "category": "reading",
    "tier": "II",
    "group": "Perjalanan Membaca (Completed Books)"
  },
  {
    "code": "READ_COMPLETED_05",
    "title": "The Story Pixie",
    "philosophy": "Imajinasi yang kini memiliki sayap untuk terbang ke berbagai dunia baru.",
    "criteria": "Tamatkan minimal 18 buku bacaan.",
    "category": "reading",
    "tier": "III",
    "group": "Perjalanan Membaca (Completed Books)"
  },
  {
    "code": "READ_COMPLETED_10",
    "title": "The Tome Whelp",
    "philosophy": "Bukan menimbun emas, naga kecil ini menimbun cerita dan ilmu tak ternilai.",
    "criteria": "Tamatkan minimal 35 buku bacaan.",
    "category": "reading",
    "tier": "IV",
    "group": "Perjalanan Membaca (Completed Books)"
  },
  {
    "code": "READ_COMPLETED_25",
    "title": "The Cosmic Astral Whale",
    "philosophy": "Paus kosmik yang mengarungi samudra bintang pengetahuan dan kebijaksanaan sejati.",
    "criteria": "Tamatkan minimal 60 buku bacaan.",
    "category": "reading",
    "tier": "V",
    "group": "Perjalanan Membaca (Completed Books)"
  },
  {
    "code": "ACTIVITY_COUNT_01",
    "title": "The Chrono-Hummingbird",
    "philosophy": "Ketukan sayap pertama yang menandai dimulainya catatan waktu dan riwayat membaca.",
    "criteria": "Catat sesi bacaan minimal 5 kali.",
    "category": "activity",
    "tier": "I",
    "group": "Rutinitas Catat Bacaan (Reading Activities)"
  },
  {
    "code": "ACTIVITY_COUNT_05",
    "title": "The Clockwork Owl",
    "philosophy": "Disiplin membaca yang mulai berdetak teratur bagai jam mekanik.",
    "criteria": "Catat sesi bacaan minimal 20 kali.",
    "category": "activity",
    "tier": "II",
    "group": "Rutinitas Catat Bacaan (Reading Activities)"
  },
  {
    "code": "ACTIVITY_COUNT_15",
    "title": "The Coffee Golem",
    "philosophy": "Sahabat setia yang tak pernah lelah menemani ritual membacamu.",
    "criteria": "Catat sesi bacaan minimal 50 kali.",
    "category": "activity",
    "tier": "III",
    "group": "Rutinitas Catat Bacaan (Reading Activities)"
  },
  {
    "code": "ACTIVITY_COUNT_30",
    "title": "The Moon Rabbit",
    "philosophy": "Ketekunan tanpa henti melompat dari halaman ke halaman menembus waktu.",
    "criteria": "Catat sesi bacaan minimal 100 kali.",
    "category": "activity",
    "tier": "IV",
    "group": "Rutinitas Catat Bacaan (Reading Activities)"
  },
  {
    "code": "ACTIVITY_COUNT_60",
    "title": "The Azure Phoenix",
    "philosophy": "Semangat membaca yang tak pernah padam, selalu terlahir kembali di setiap buku baru.",
    "criteria": "Catat sesi bacaan minimal 200 kali.",
    "category": "activity",
    "tier": "V",
    "group": "Rutinitas Catat Bacaan (Reading Activities)"
  },
  {
    "code": "BORROW_COUNT_01",
    "title": "The Wandering Red Panda",
    "philosophy": "Pengelana yang mengetuk pintu ilmu untuk meminjam hikmah.",
    "criteria": "Pinjam minimal 2 buku dari komunitas.",
    "category": "circulation",
    "tier": "I",
    "group": "Sirkulasi & Berbagi Buku (Borrow & Upload)"
  },
  {
    "code": "BORROW_COUNT_03",
    "title": "The Loyal Gryphon",
    "philosophy": "Menjaga buku pinjaman seperti menjaga pusaka kerajaan.",
    "criteria": "Pinjam dan kembalikan minimal 6 buku tepat waktu.",
    "category": "circulation",
    "tier": "II",
    "group": "Sirkulasi & Berbagi Buku (Borrow & Upload)"
  },
  {
    "code": "BORROW_COUNT_10",
    "title": "The Direwolf Sentinel",
    "philosophy": "Penjaga kehormatan buku yang setia; memegang teguh amanah pinjaman tanpa cela.",
    "criteria": "Pinjam dan kembalikan minimal 15 buku tepat waktu.",
    "category": "circulation",
    "tier": "III",
    "group": "Sirkulasi & Berbagi Buku (Borrow & Upload)"
  },
  {
    "code": "UPLOAD_COUNT_01",
    "title": "The Spring Otter",
    "philosophy": "Satu buku yang kamu tambahkan adalah mata air ilmu yang tak pernah kering.",
    "criteria": "Tambahkan 2 buku ke rak komunitas.",
    "category": "circulation",
    "tier": "I",
    "group": "Sirkulasi & Berbagi Buku (Borrow & Upload)"
  },
  {
    "code": "UPLOAD_COUNT_03",
    "title": "The Forest Unicorn",
    "philosophy": "Kemurahan hati yang menumbuhkan keajaiban di perpustakaan bersama.",
    "criteria": "Tambahkan 5 buku ke rak komunitas.",
    "category": "circulation",
    "tier": "II",
    "group": "Sirkulasi & Berbagi Buku (Borrow & Upload)"
  },
  {
    "code": "UPLOAD_COUNT_10",
    "title": "The Golden Dragon Patron",
    "philosophy": "Penaung agung yang memperkaya khazanah literasi seluruh komunitas.",
    "criteria": "Tambahkan 12 buku ke rak komunitas.",
    "category": "circulation",
    "tier": "III",
    "group": "Sirkulasi & Berbagi Buku (Borrow & Upload)"
  },
  {
    "code": "REFLECTION_COUNT_01",
    "title": "The Scholar Scribe",
    "philosophy": "Goresan pena pertama yang mengabadikan buah pemikiran dan intisari berharga dari sebuah buku.",
    "criteria": "Tulis minimal 2 Bedah Buku.",
    "category": "reflection",
    "tier": "I",
    "group": "Bedah Buku & Dampak Literasi (Reflections & Views)"
  },
  {
    "code": "REFLECTION_COUNT_03",
    "title": "The Raven Philosopher",
    "philosophy": "Bukan sekadar membaca alur, melainkan membedah jiwa sang penulis.",
    "criteria": "Tulis minimal 6 Bedah Buku.",
    "category": "reflection",
    "tier": "II",
    "group": "Bedah Buku & Dampak Literasi (Reflections & Views)"
  },
  {
    "code": "REFLECTION_COUNT_10",
    "title": "The Astral Stag of Insight",
    "philosophy": "Kedalaman visi dan kebijaksanaan luhur yang mampu mengurai benang cerita paling rumit sekalipun.",
    "criteria": "Tulis minimal 15 Bedah Buku.",
    "category": "reflection",
    "tier": "III",
    "group": "Bedah Buku & Dampak Literasi (Reflections & Views)"
  },
  {
    "code": "REFLECTION_VIEWS_25",
    "title": "The Literary Muse",
    "philosophy": "Ulasan dan buah pemikiranmu memikat, menjadi lentera inspirasi bagi banyak pembaca.",
    "criteria": "Total pembaca Bedah Buku mencapai 50 kali.",
    "category": "reflection",
    "tier": "IV",
    "group": "Bedah Buku & Dampak Literasi (Reflections & Views)"
  },
  {
    "code": "REFLECTION_VIEWS_100",
    "title": "The Chrono-Dragon",
    "philosophy": "Naga penguasa ruang dan waktu; buah pemikiranmu abadi melintasi zaman.",
    "criteria": "Total pembaca Bedah Buku mencapai 250 kali.",
    "category": "reflection",
    "tier": "V",
    "group": "Bedah Buku & Dampak Literasi (Reflections & Views)"
  },
  {
    "code": "COMMUNITY_JOIN_01",
    "title": "The Guardian Pup",
    "philosophy": "Salam hangat dan sambutan bersahabat di gerbang lingkaran komunitas pertama.",
    "criteria": "Bergabung ke minimal 2 komunitas.",
    "category": "community",
    "tier": "I",
    "group": "Komunitas & Percakapan (Communities & Threads)"
  },
  {
    "code": "COMMUNITY_JOIN_03",
    "title": "The Guild Griffin of Concord",
    "philosophy": "Langkah aktif merajut persaudaraan dan aliansi kokoh di berbagai perkumpulan.",
    "criteria": "Bergabung ke minimal 5 komunitas.",
    "category": "community",
    "tier": "II",
    "group": "Komunitas & Percakapan (Communities & Threads)"
  },
  {
    "code": "THREAD_START_01",
    "title": "The Lantern Sprite",
    "philosophy": "Satu lentera yang dinyalakan di kegelapan malam, pemantik awal perbincangan hangat.",
    "criteria": "Mulai minimal 2 thread diskusi di komunitas.",
    "category": "community",
    "tier": "I",
    "group": "Komunitas & Percakapan (Communities & Threads)"
  },
  {
    "code": "THREAD_START_05",
    "title": "The Celestial Lyrebird",
    "philosophy": "Gubahan nada dan topik memikat yang menggugah ruang diskusi menjadi riuh penuh inspirasi.",
    "criteria": "Mulai minimal 8 thread diskusi di komunitas.",
    "category": "community",
    "tier": "II",
    "group": "Komunitas & Percakapan (Communities & Threads)"
  },
  {
    "code": "THREAD_REPLY_05",
    "title": "The Messenger Doves",
    "philosophy": "Dua sayap yang berpadu mengantarkan pesan, merajut kehangatan dialog antar pembaca.",
    "criteria": "Kirim minimal 10 balasan komentar di diskusi.",
    "category": "community",
    "tier": "I",
    "group": "Komunitas & Percakapan (Communities & Threads)"
  },
  {
    "code": "THREAD_REPLY_20",
    "title": "The Silver Chameleon",
    "philosophy": "Sahabat diskusi yang selalu mampu menghidupkan suasana di setiap sudut obrolan.",
    "criteria": "Kirim minimal 35 balasan komentar di diskusi.",
    "category": "community",
    "tier": "II",
    "group": "Komunitas & Percakapan (Communities & Threads)"
  },
  {
    "code": "BOOKMARK_COUNT_03",
    "title": "The Archive Ermine",
    "philosophy": "Naluri manis pembaca yang mulai mengumpulkan dan menandai lembaran impian.",
    "criteria": "Simpan minimal 5 buku ke daftar bookmark.",
    "category": "collection",
    "tier": "I",
    "group": "Eksplorasi & Jejak Koleksi (Bookmarks)"
  },
  {
    "code": "BOOKMARK_COUNT_10",
    "title": "The Blue Magpie",
    "philosophy": "Mata jeli yang lihai menemukan mutiara-mutiara literasi tersembunyi.",
    "criteria": "Simpan minimal 15 buku ke daftar bookmark.",
    "category": "collection",
    "tier": "II",
    "group": "Eksplorasi & Jejak Koleksi (Bookmarks)"
  },
  {
    "code": "BOOKMARK_COUNT_25",
    "title": "The Celestial Kirin Archivist",
    "philosophy": "Penjaga naskah surgawi yang mengawal jejak bacaan dan khazanah literasi paling berharga.",
    "criteria": "Simpan minimal 40 buku ke daftar bookmark.",
    "category": "collection",
    "tier": "III",
    "group": "Eksplorasi & Jejak Koleksi (Bookmarks)"
  }
];
