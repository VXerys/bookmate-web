---
id: ART-DIRECTION
title: "Art direction: Marginalia, satu hari pembaca"
type: art-direction
status: review
tier: lite
owner: "M Sechan Alfarisi"
created: "2026-10-16"
last_updated: "2026-10-19"
last_verified: "2026-10-19"
supersedes: null
---

# Art direction: Marginalia, satu hari pembaca

Arah visual dan motion untuk seluruh situs. Spec fitur merujuk ke section di file ini. Versi 2026-10-19 (F-012) menggantikan arah editorial polos versi pertama, yang terasa kosong: serif di atas krem tanpa lapisan ilustrasi.

## Visual thesis

Situsnya adalah **buku yang sedang dibaca bareng teman**. Di pinggir halaman muncul jejak anggota klub: stabilo yang menyapu judul, garis bawah dan lingkaran yang tergambar sendiri, panah, sticky note, dan stiker. Komunitas tidak diceritakan, tapi terlihat sebagai orang lain yang menulis di bukumu.

Ceritanya mengikuti **satu hari seorang pembaca**: pagi check-in streak, siang mencatat bacaan, sore bedah buku, malam diskusi komunitas, besok pagi meminjam buku ke teman. Warna di luar buku berubah mengikuti jam, sedangkan halaman buku tetap kertas.

Referensi Awwwards (dilihat 2026-10-19): Aardvark Book Club (SOTD: tipografi tebal, buku melayang, coretan tangan), MY STELLA (kehangatan buku cerita), Grail (kartu app di ruang 3D). Tidak ada yang disalin; yang diambil hanya keberanian tipografi dan lapisan ilustrasi.

## Sumber identitas

| Elemen | Nilai | Sumber |
|---|---|---|
| Nama, tagline | dari `src/content/site.ts` | repo `bookmeet` (A-001 untuk rebranding) |
| Warna | palet di bawah | `lib/core/constants/app_colors.dart` |
| Serif | Newsreader (aksen italic) | `pubspec.yaml` app |
| Display | Bricolage Grotesque | dipilih untuk web: materi listing Play Store memakai grotesk tebal |
| Tulisan tangan | Caveat | catatan pinggir anggota klub |

## Palet

Semua hex dari `app_colors.dart`. Token di `globals.css` dan `src/content/palette.ts` (dites).

| Token | Hex | Peran |
|---|---|---|
| `paper` | `#FCF9F4` | halaman buku, latar utama |
| `ink` | `#03040A` | teks, garis ilustrasi, malam |
| `blue` | `#3B6FF5` | sampul buku BookMate, aksen merek |
| `sky` | `#E8EEFE` | langit pagi, besok |
| `highlight` | `#FFD700` | stabilo, bintang |
| `ember` | `#FF7F14` | CTA, api streak, matahari sore |
| `peach`, `peach-pale` | `#F6D7AB`, `#FFF4E6` | sore, sticky note |
| `plum`, `forest` | `#52405A`, `#19382B` | malam, punggung buku |
| `slate` | `#64748B` | teks sekunder |

Aturan kontras tetap: ember dan highlight adalah isian, bukan warna teks di atas paper; tombol oranye memakai teks ink.

## Tipografi

- Display: **Bricolage Grotesque** variable (`wght` 800, `opsz` 96, `wdth` 85 sampai 100), `clamp()` sampai sekitar 11vw, leading 0.9.
- Aksen: **Newsreader** italic untuk satu atau dua kata per judul.
- Catatan pinggir: **Caveat** 600, miring 2 sampai 4 derajat, selalu terasa seperti tulisan teman.
- Teks: **Inter**. Label, jam, nomor halaman: **JetBrains Mono**.

## Urutan halaman `/`

| # | Id | Isi | Momen motion |
|---|---|---|---|
| 0 | sampul | buku biru BookMate tertutup, counter halaman | sampul buku berputar terbuka, halaman pertama memenuhi layar |
| 1 | prolog | headline, ponsel onboarding, buku melayang, sticky note | stabilo menyapu "bareng teman", panah ke CTA tergambar, parallax mouse dan scroll |
| 2 | manifesto | masalah membaca sendirian | kata terisi tinta (scrub), kata masalah dicoret, solusi dilingkari |
| 3 | buka | "Semua bacaanmu, satu rak." dan ponsel | ponsel membesar memisahkan kalimat |
| 4 | hari | lima spread: 06.30 streak, 12.15 catat, 16.00 bedah, 20.00 komunitas, besok 09.00 pinjam | buku besar ter-pin, halaman dibalik (3D) per scroll, matahari bergerak menjadi bulan, latar berganti warna jam |
| 5 | rak | 6 kategori lencana sebagai punggung buku | punggung buku jatuh ke rak, hover menarik keluar, klik membuka catatan syarat |
| 6 | papan | thread, polling, reaksi, chat pinjam sebagai catatan bertempel selotip | catatan beterbangan lalu menempel (scrub), bar polling terisi, pita marquee |
| 7 | mulai | tiga langkah | pita pembatas buku tergambar sepanjang jalur, pembatas berjalan mengikutinya |
| 8 | indeks | FAQ sebagai indeks buku | titik penuntun, catatan pinggir |
| 9 | epilog | "Mulai halaman pertamamu." + CTA | bintang dan stabilo tergambar, headline mengendap |

Di bawah 1024px atau dengan reduced motion, buku "hari" menjadi lima kartu halaman bertumpuk vertikal tanpa balik halaman 3D.

## Katalog motion

| Efek | Teknik |
|---|---|
| Doodle tergambar | `DrawSVGPlugin` (ada di paket `gsap`, bukan dependency baru); scrub di scroll, sekali jalan di hero |
| Balik halaman | CSS 3D (`rotateY` di tepi punggung, `backface-visibility`), z-index ditukar di tengah putaran |
| Matahari ke bulan | `MotionPathPlugin` di busur SVG, warna latar di-tween per jam |
| Pembatas berjalan | `MotionPathPlugin` dengan `align` ke jalur pita |
| Stabilo | `scaleX` dari kiri pada path stabilo |
| Coretan teks | `background-size` gradien (paint saja, tanpa layout) |
| Catatan beterbangan | transform ter-scrub dari posisi acak ke posisi akhir |
| Cursor | titik + lingkaran coretan tangan yang tergambar saat di atas tautan |

## Aturan motion

- GSAP dan Lenis saja (ADR-0001). Plugin dari paket `gsap` didaftarkan di `src/lib/motion/gsap.ts`.
- Setiap efek di dalam `gsap.matchMedia()`; reduced motion menampilkan state akhir, doodle sudah tergambar.
- Konten terbaca tanpa JavaScript; elemen disembunyikan untuk animasi hanya di `html.js` dengan motion diizinkan.
- Animasikan transform, opacity, stroke (DrawSVG), dan clip-path. Ease `expo.out` dan `power3`; tanpa bounce dan elastic.
- Ilustrasi tidak boleh menutupi teks; teks di halaman buku selalu ink di atas paper.

## Aset

- Ilustrasi, doodle, sampul abstrak, dan punggung buku dibuat sebagai SVG di `src/components/art/`, tanpa aset luar.
- Screenshot app sementara dari pemilik (`public/CREDITS.md`, A-002 open).
- Tidak ada sampul komersial buatan sendiri, wajah orang nyata, testimoni, atau angka pengguna.

## Yang ditolak

Gradien blob generik, bento grid, glassmorphism, ilustrasi orang generik bergaya korporat, efek tanpa peran dalam cerita.

## Revisi 2026-10-19: energi Aardvark Book Club

Atas permintaan pemilik, lapisan visual didorong ke energi Aardvark Book Club (SOTD Awwwards, situs klub buku). Yang diambil: ritme dan keberanian, bukan aset. Font, warna, ilustrasi, dan copy tetap milik BookMate.

| Pola Aardvark | Terjemahan BookMate |
|---|---|
| Loader ungu + sapuan kuas raksasa | layar `blue` + ikon buku, lalu satu sapuan kuas `highlight` tebal (DrawSVG) menutup layar dan membuka hero kuning |
| Hero kuning dengan blob gelombang | Prolog `highlight` dengan blob `paper` transparan, display Bricolage 800 `wdth` 75 |
| Buku hardcover 3D melayang | `Book3D`: kotak CSS 3D (sampul, punggung, blok halaman) yang berputar pelan, ikut scroll dan pointer |
| Nav pill, CTA pink dengan kotak panah | nav pill `paper`, CTA `ember` dengan kotak panah `ink` |
| Section blok warna dengan sudut membulat yang saling menumpuk | setiap section berwarna bersudut atas `3rem` dan menumpuk di atas section sebelumnya |
| Genre sebagai pill marquee | fitur BookMate sebagai dua baris pill berlawanan arah di papan |

Champ (font Aardvark) berlisensi komersial, jadi tidak dipakai; potongan condensed Bricolage memberi bobot serupa.
