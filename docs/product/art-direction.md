---
id: ART-DIRECTION
title: "Art direction: klub baca yang berpegas"
type: art-direction
status: review
tier: lite
owner: "M Sechan Alfarisi"
created: "2026-10-16"
last_updated: "2026-10-19"
last_verified: "2026-10-19"
supersedes: null
---

# Art direction: klub baca yang berpegas

Arah visual dan gerak situs sejak F-013 (2026-10-19). Referensi tunggalnya aardvarkbookclub.com, dibedah di `docs/product/reference-aardvark.md`. Yang diambil adalah sistemnya (bentuk, ritme warna, gerak), bukan aset, font, atau copy. Ceritanya milik BookMate: klub baca komunitas yang menemani satu hari pembaca. Arah sebelumnya (editorial F-001 sampai F-007, Marginalia F-012) ada di riwayat git.

## Keputusan pemilik (grilling 2026-10-19)

| # | Keputusan |
|---|---|
| Q1 | Hanya warna `app_colors.dart`, disusun sebagai pasangan jenuh dan lembut |
| Q2 | Rubik (display), Plus Jakarta Sans (teks), Caveat (tulisan tangan) |
| Q3 | Tanpa outline tinta dan bayangan offset; bentuk dari blok warna |
| Q4 | Section dibentuk `clip-path`: sudut bawah, kapsul penuh, kapsul menjorok; radius 120 / 24 / 6 |
| Q5 | Ease `osmo`, `energy`, dan `elastic.out(1, 0.72)` untuk momen mendarat |
| Q6 | Ritme section Aardvark dengan cerita BookMate (tabel di bawah) |
| Q7 | Objek 3D dari CSS dulu; slot untuk render pemilik nanti |
| Q8 | Motif kartu: pita pembatas buku yang menjuntai |
| Q9 | Logo `logo-bookmate.svg` dari repo app |
| Q10 | Spec F-013, commit tanpa konfirmasi, merge menunggu pemilik |

## Palet

| Pasangan | Jenuh | Lembut | Peran |
|---|---|---|---|
| Kuning | `highlight` `#FFD700` | `peach` `#F6D7AB` | hero, rak lencana |
| Biru | `blue` `#3B6FF5` | `sky` `#E8EEFE` | loader, daftar fitur, footer, tulisan tangan |
| Oranye | `ember` `#FF7F14` | `pale-orange` `#FFECD8` | tombol utama, satu hari pembaca |
| Hijau | `green` `#4CAF50` | `soft-green` `#E5F6E5` | kartu, kapsul manfaat |
| Merah muda | `coral` `#FF4D4D` | `soft-red` `#FFD8D8` | kartu, kapsul manfaat |
| Emas | `gold` `#FFB300` | `peach-pale` `#FFF4E6` | api streak, kapsul |
| Netral | `white` `#FFFFFF`, `paper` `#FCF9F4`, `ink` `#03040A`, `slate` `#64748B` | | latar dan teks |

Teks selalu `ink`, kecuali di atas `blue` (paper, hanya teks besar) dan di footer. Pasangan yang diizinkan dites di `palette.test.ts`.

## Urutan halaman `/`

| # | Id | Bentuk dan latar | Isi | Gerak |
|---|---|---|---|---|
| 0 | loader | biru penuh | logo pop, buku kecil membalik halaman, counter | coretan raksasa terhapus dari ujung, logo elastic |
| 1 | prolog | kuning, sudut bawah | judul, lead, tombol, tulisan tangan, buku 3D + ponsel, blob bernapas | latar terbuka ellipse, kata elastic, huruf tangan |
| 2 | fitur | putih | slider 6 kartu fitur warna dengan pita, screenshot, tag | kartu muncul elastic, slider geser |
| 3 | hari | `pale-orange`, kapsul menjorok | 5 kartu jam berilustrasi | kartu jatuh elastic, miring acak, ikut mouse |
| 4 | buka | `sky`, kapsul menjorok, ter-pin | ponsel 3D berputar dan membesar, 3 langkah mulai, tombol Google Play | scrub |
| 5 | daftar | biru, kapsul penuh | daftar fitur raksasa, pratinjau screenshot saat hover | pratinjau mengikuti kursor |
| 6 | manfaat | `peach`, sudut bawah | kapsul raksasa: Gratis, Android, Klub komunitas, Pinjam buku fisik, 30 lencana | pop elastic, dorongan momentum |
| 7 | rak | kuning, kapsul penuh | 6 kartu lencana yang bisa dibalik | kartu jatuh elastic |
| 8 | indeks | putih | FAQ kartu `sky` radius 18 | details bawaan |
| 9 | epilog | putih, sudut bawah, menutupi footer | penutup + tombol + buku 3D | judul elastic |
| 10 | footer | biru | tagline, tautan | parallax naik |

## Aturan gerak

- Semua efek di `gsap.matchMedia()`; reduced motion menampilkan keadaan akhir, tanpa pin dan tanpa Lenis.
- Hover hanya untuk `(hover: hover) and (pointer: fine)`.
- Satu pin saja (buka). Elemen lain sekali jalan saat masuk viewport.
- Animasikan transform, opacity, clip-path, dan stroke.

## Aset

- Ilustrasi, pita, blob, buku dan ponsel 3D: SVG dan CSS buatan repo ini (`src/components/art/`).
- Logo dari repo app. Screenshot sementara dari pemilik (`public/CREDITS.md`, A-002).
