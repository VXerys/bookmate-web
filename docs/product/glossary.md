# Product Glossary

Use this file when domain language can be misunderstood or used inconsistently.

| Term | Canonical meaning | Do not confuse with | Notes |
|---|---|---|---|
| BookMate | app Android klub baca komunitas, package `com.mangcoding.bookmate2` | BookMate Web (situs ini) | nama bisa berubah, lihat A-001 |
| Bab | satu section bercerita di halaman `/`, diberi nomor `Bab 01` dan seterusnya | bab buku di dalam app | label memakai font mono |
| Sampul | preloader yang terbuka seperti sampul buku | cover gambar buku | |
| Prolog | hero, first viewport | | |
| Epilog | section CTA akhir sebelum footer | | |
| Catat Bacaan | fitur app untuk mencatat progres per halaman, bab, persen, atau catatan | review | istilah dari app |
| Bedah Buku | fitur refleksi mendalam dengan rating multi-aspek | review bintang (F-004 app, belum rilis) | istilah dari app |
| Lencana tarot | kartu pencapaian bergaya tarot di profil app | badge generik | 30 aset `.webp` |
| Slice transition | 5 irisan layar yang menutup lalu membuka saat lompat antar section | curtain wipe | |
| Curtain wipe | panel penuh yang menyapu masuk atau keluar | slice transition | preloader, menu mobile, halaman legal |
| Reduced motion | `prefers-reduced-motion: reduce`; semua efek langsung di state akhir | animasi dipercepat | |

Rules:

1. Requirements, UI copy, API contracts, and database terminology should use canonical terms.
2. Do not add synonyms unless users genuinely use them.
3. When a term changes meaning, record the change and update affected specifications.
