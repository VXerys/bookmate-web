---
id: ART-DIRECTION
title: "Art direction: Satu Halaman Lagi"
type: art-direction
status: review
tier: lite
owner: "M Sechan Alfarisi"
created: "2026-10-16"
last_updated: "2026-10-16"
last_verified: "2026-10-16"
supersedes: null
---

# Art direction: Satu Halaman Lagi

Arah visual dan motion untuk seluruh situs. Spec fitur (`docs/specs/F-XXX/`) merujuk ke section di file ini; perubahan arah besar dicatat di sini dulu, baru di spec.

## Visual thesis

Situsnya terasa seperti **membaca satu buku bersama**. Preloader adalah sampul yang terbuka, setiap section adalah "Bab" dengan nomor halaman, perpindahan section memakai irisan halaman (screen slice), dan kalimat penggerak di sepanjang scroll adalah dorongan yang dikenal setiap pembaca: *"satu halaman lagi"*. Situs ini menjual kebiasaan membaca yang ditemani komunitas, bukan katalog buku.

Kesan yang dituju: editorial, hangat, tenang tapi hidup. Bukan startup-gradient, bukan dashboard.

## Sumber identitas (dari app BookMate, bukan karangan)

| Elemen | Nilai | Sumber di repo `bookmeet` |
|---|---|---|
| Nama | BookMate | `AGENTS.md`, `about_us_page.dart` |
| Tagline | "Tempat buku bertemu rumah barunya, dan pembaca menemukan teman seperjalanannya." | `about_us_page.dart` |
| Font serif | Newsreader | `pubspec.yaml` |
| Font UI | Inter | `pubspec.yaml` |
| Warna | lihat palet di bawah | `lib/core/constants/app_colors.dart`, `app_gradients.dart` |
| Logo | `logo-bookmate.svg` | `assets/icons/splashscreen/` |
| Lencana | 30 kartu tarot `.webp` | `assets/images/tarot_badges/` |

Rebranding ke "Tabaca" masih usulan (A-001). Semua nama dan tagline hanya boleh dibaca dari `src/content/site.ts`.

## Palet

Satu warna dominan per section, bukan gradien. Token di `src/app/globals.css` (`@theme`).

| Token | Hex | Peran |
|---|---|---|
| `paper` | `#FCF9F4` | latar utama (kertas) |
| `ink` | `#03040A` | teks, bab gelap |
| `peach` | `#F6D7AB` | permukaan hangat, bab Pinjam |
| `peach-pale` | `#FFF4E6` | kartu, kolom FAQ |
| `ember` | `#FF7F14` | aksen utama: CTA, streak |
| `blue` | `#3B6FF5` | aksen merek, bab Komunitas; dipakai hemat |
| `plum` | `#52405A` | bab Catat Bacaan |
| `forest` | `#19382B` | bab Bedah Buku |
| `slate` | `#64748B` | teks sekunder |

Kontras teks wajib lolos WCAG AA di setiap pasangan latar dan teks yang dipakai.

## Tipografi

- Display: **Newsreader** (variable, sumbu `opsz`, italic). Judul besar `clamp()` sampai sekitar 14vw, leading rapat, kata kunci dalam italic.
- Teks dan UI: **Inter**.
- Label, nomor bab, nomor halaman, counter: **JetBrains Mono**, huruf kapital kecil, tracking lebar.
- Semua lewat `next/font/google` sebagai CSS variable. Tidak ada font lokal.

## Urutan halaman `/`

| # | Section | Isi | Momen motion utama |
|---|---|---|---|
| 0 | Sampul (preloader) | wordmark, counter halaman 001 sampai 100 | curtain wipe terbelah dua seperti sampul dibuka |
| 1 | Prolog (hero) | headline, mockup ponsel berisi screenshot asli, kartu tarot, chip streak, CTA | intro GSAP, parallax berlapis mouse + scroll, magnetic CTA |
| 2 | Manifesto | paragraf masalah: membaca sendirian gampang berhenti | pin + kata per kata "terisi tinta" (scrub) |
| 3 | Buka aplikasinya | screenshot dalam bingkai ponsel | scroll-linked scale dari bingkai kecil ke full-bleed |
| 4 | Bab 01 sampai 05 | Catat Bacaan, Streak, Bedah Buku, Komunitas, Pinjam Buku | horizontal scroll ter-pin, warna latar berganti per bab, parallax gambar di dalam track |
| 5 | Api streak | kalender 30 hari, counter, chip api | pin, kalender terisi hari demi hari (scrub), counter angka |
| 6 | Kartu pembaca | dek lencana tarot | GSAP Flip: dek dibagikan jadi kipas/grid, hover liquid distortion + tilt, klik membalik kartu |
| 7 | Ruang diskusi | thread, polling, reaksi, chat pinjam | sticky card stack, marquee kategori yang ikut kecepatan scroll |
| 8 | Cara mulai | unduh, gabung komunitas, catat bacaan pertama | garis progres tergambar mengikuti scroll |
| 9 | FAQ | pertanyaan faktual | accordion CSS + tinggi dianimasikan GSAP |
| 10 | Epilog (CTA akhir) | "Mulai halaman pertamamu." + tombol Google Play + QR | teks skala turun saat masuk, magnetic CTA |
| 11 | Footer | kredit Mangcoding, tautan legal | footer reveal (konten terangkat, footer diam di bawah) |

Halaman tambahan: `/kebijakan-privasi` dan `/hapus-akun` (isi dari pemilik, A-005), masuk lewat curtain wipe.

## Katalog motion

| Efek | Di mana | Teknik |
|---|---|---|
| Curtain wipe | preloader, menu mobile, masuk halaman legal | GSAP timeline, `clipPath`/`yPercent` pada dua panel |
| Screen slice | navigasi antar section dari header | 5 irisan vertikal stagger, label bab tujuan, `lenis.scrollTo` saat layar tertutup |
| Parallax | hero (mouse + scroll), gambar di dalam bab | `gsap.quickTo` untuk pointer, ScrollTrigger `scrub` untuk `yPercent` |
| Custom cursor trailing | global, pointer halus saja | titik + cincin yang tertinggal (`quickTo` beda durasi), state `link`, `label`, `hidden` lewat `data-cursor*` |
| Magnetic button | CTA, tombol nav | `quickTo` dengan `elastic.out` |
| Hover distortion / liquid | kartu tarot, gambar bab | M3: filter SVG `feTurbulence` + `feDisplacementMap`; M4 opsional: shader WebGL (F-009, butuh ADR) |
| Scroll-linked scale | "Buka aplikasinya", Epilog | ScrollTrigger `scrub` pada `scale` dan `clipPath: inset()` |
| Horizontal scroll | Bab 01 sampai 05 | pin + `x` ter-scrub, `containerAnimation` untuk efek di dalam track; di bawah 1024px jadi tumpukan vertikal |
| Split text reveal | semua judul besar | SplitText `mask: "lines"`, `aria: "auto"`, stagger kata |
| Scrub text fill | Manifesto | SplitText kata, opacity 0.15 ke 1 |
| Flip layout | dek tarot | GSAP Flip dari tumpukan ke kipas/grid |
| Sticky stack | Ruang diskusi | pin per kartu, kartu belakang mengecil |
| Velocity marquee | kategori buku | `timeScale` mengikuti `ScrollTrigger.getVelocity()` |
| Counter | preloader, streak | tween angka dengan `snap` |
| Footer reveal | footer | footer `position: sticky` di bawah, konten di atasnya |
| Grain | global | overlay noise statis, `pointer-events: none` |

## Aturan motion

- Satu engine animasi (GSAP) dan satu engine smooth scroll (Lenis). Alasannya di ADR-0001.
- Setiap efek dibungkus `gsap.matchMedia()`. Di `prefers-reduced-motion: reduce`, Lenis tidak berjalan, tidak ada preloader overlay, dan semua elemen langsung di state akhir.
- Konten terbaca tanpa JavaScript. Elemen hanya disembunyikan untuk animasi masuk saat `html.js` ada dan motion diizinkan.
- Animasikan `transform` dan `opacity`. `clipPath` boleh untuk wipe. Tidak ada properti layout di tween yang terikat scroll.
- Efek pointer (cursor, magnetic, tilt, distortion) hanya untuk `(pointer: fine)`. Layar sentuh mendapat state tap yang jelas.
- Header, pesan utama, dan CTA hero tetap bisa dipakai sebelum intro selesai.
- Durasi intro: minimal sekitar 2 detik, maksimal 4,5 detik, lalu `ScrollTrigger.refresh()`. Intro hanya sekali per sesi tab.

## Aset dan provenance

- Screenshot app: tangkapan asli dari build produksi BookMate v1.1.0, tidak diedit kecuali crop (A-002). Bingkai ponsel dibuat dengan CSS.
- Lencana tarot dan logo: aset milik app BookMate (A-003 untuk izin pakai di web).
- Sampul buku: tidak memakai sampul buku komersial asli (risiko hak cipta). Pakai sampul tipografis buatan CSS atau gambar generatif orisinal yang dicatat sumbernya.
- Ikon UI: Solar via Iconify. Tidak ada avatar, testimoni, logo mitra, atau angka pengguna sampai ada bukti terverifikasi.
- Setiap aset baru dicatat di `public/CREDITS.md` (sumber, lisensi, tanggal).

## Yang ditolak

Gradien blob generik, bento grid dekoratif, glassmorphism di mana-mana, testimoni palsu, klaim "jutaan pembaca", dan animasi tanpa peran dalam cerita.
