---
id: REF-AARDVARK
title: "Reverse engineering: aardvarkbookclub.com"
type: reference
status: review
tier: lite
owner: "M Sechan Alfarisi"
created: "2026-10-19"
last_updated: "2026-10-19"
last_verified: "2026-10-19"
supersedes: null
---

# Reverse engineering: aardvarkbookclub.com

Diukur 2026-10-19 dari halaman publik di viewport 1440 x 900: computed style, DOM, dan script `slater.app/18601/54937.js`. Hanya untuk referensi gaya; aset, font, dan copy Aardvark tidak dipakai.

## Stack

Webflow + Barba (transisi halaman) + GSAP (ScrollTrigger, SplitText, CustomEase, InertiaPlugin, DrawSVG) + Lenis + smooothy (slider). Semua modul dipicu atribut `data-*` (contoh `data-button-alt`, `data-call-out`, `data-handwritten-text-inview`).

## Sistem visual

| Unsur | Nilai |
|---|---|
| Display | Champ 700, h1 120px/96px (-1.2px), h2 78px/62.4px (-0.78px), h3 30px/26.4px. Bulat, padat, leading < 1 |
| Teks | Degular 600: 24px/28.8 (lead), 18px/21.6 (isi), 15px (kartu), 12px (tombol) |
| Tulisan tangan | Hello Organichand 400, 24px/24px, selalu warna violet `#3b308f` |
| Warna utama | yellow `#ffd24a`, pale-yellow `#faed8f`, magenta `#ff008c`, bright-pink `#fd48f2`, cyan `#1ce8ed`, orange `#f9a220`, periwinkle `#9982de`, violet `#3b308f`, olive `#857521`, wine `#670a2e` |
| Warna lembut | soft-pink `#ffdbfd`, soft-blue `#ddfcfc`, pale-blue `#a4f6f8`, pale-pink `#feb6fa`, soft-orange `#fddaa6`, soft-periwinkle `#d7cdf1`, soft-grey `#f2f2f2` |
| Garis | hampir tidak ada border; bentuk dibangun dari isian warna, bukan outline |
| Sudut | section memakai `clip-path: inset(... round 120px)`; kartu 24px; tag 18px; tombol 6px; kontrol bulat 50% |
| Grid | 12 kolom, margin 1.5em, gutter 0; ukuran font dalam `em` dari satu basis |

Section tidak memakai border-radius. Semuanya `clip-path: inset()`:

- `inset(0 round 0 0 120px 120px)`: hanya sudut bawah membulat (hero, exclusive, benefits).
- `inset(0 round 120px)`: kapsul penuh, empat sudut (genre, choice).
- `inset(18px round 120px)`: kapsul yang menjorok 18px dari tepi layar, latar putih di sekitarnya terlihat (flow, box).

## Motion

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `osmo` (default) | cubic-bezier 0.625, 0.05, 0, 1 | semua tween umum |
| `energy` | M0,0 C0.32,0.72 0,1 1,1 | paragraf, tombol, logo |
| `elastic.out(1, 0.72)` / `(1, 0.75)` | pegas | judul, kartu, label, huruf tulisan tangan |
| `circ.out` | | clip ellipse hero |
| durasi | 0.35 sampai 1.25 s, stagger 0.016 (huruf) sampai 0.088 (kata, kartu) | |

Pola khas:

1. Transisi halaman: satu path coretan raksasa (viewBox 1080, `stroke-width: 70%`) di-DrawSVG dari `0% 100%` ke `100% 100%` (terhapus dari ujung) selama 1.25 s, sambil logo pop `scale 0 -> 1, rotate -64 -> 0` dengan elastic.
2. Intro hero: latar dibuka `clipPath: ellipse(20% 0% at 100% 100%) -> ellipse(150% 130% at 100% 100%)` (circ.out, 1.1 s). Kata judul masuk dengan keyframes `xPercent 40, scaleY 0.1, rotate 8 -> 0` dan elastic, stagger 0.088.
3. Tulisan tangan: SplitText huruf, `opacity 0, rotate 22, x -0.25em, y 0.5em -> 0`, elastic.out(1, 0.75), stagger 0.016, saat masuk viewport (top 95%).
4. Tombol `button-alt`: dua kapsul terpisah (teks + kotak panah) warna sama, radius 6px. Hover: tiap huruf turun dan gepeng (`yPercent 55, scaleY 0.3, rotate 17`) lalu memantul kembali (elastic.out(1, 0.4)).
5. Latar "bernapas": blob SVG (fill dan stroke warna sama) berdenyut `stroke-width 0 <-> 60` dan `rotate 0 <-> 2` per 3 s (sine), hanya saat terlihat.
6. Kartu callout: posisi dan rotasi acak kecil, masuk dari `yPercent +150` dengan elastic, stagger 0.088; mengikuti posisi mouse.
7. Label benefit: kapsul raksasa warna-warni (radius 60px) muncul `scale 0, rotate acak ±33 -> 0` dengan elastic; hover berbasis momentum (InertiaPlugin, kecepatan pointer jadi dorongan dan putaran).
8. Image sequence: hero dan box memutar puluhan frame render 3D di `<canvas>` mengikuti scroll (`scrub: true`).
9. Footer parallax: konten turun dari `y -12.5em`, visual berputar masuk (`rotate 30, xPercent -35`), scrub 0.2.
10. Plop-in, emoji rain (perayaan), tagline melengkung di jalur SVG, marquee badge promo.

## Section per section

| # | Section | Latar dan bentuk | Isi | Motion |
|---|---|---|---|---|
| 0 | Header | transparan, mengambang | logo kiri, tombol pill pale-yellow radius 24px di tengah, `button-alt` oranye kanan, ikon sosial bulat hitam | tombol: huruf memantul saat hover |
| 1 | Hero | yellow, sudut bawah 120px, 1050px | h1 tiga baris kiri, paragraf, `button-alt`, tulisan tangan violet di kanan atas, render kotak 3D (canvas sequence), blob pale-yellow dan orange di belakang | ellipse reveal, kata elastic, huruf tangan, blob bernapas, sequence ikut scroll |
| 2 | Books | putih | h2 + lead + tulisan tangan, slider kartu 264 x 558: latar warna per buku (radius 24, dengan dua "telinga" SVG di atas), sampul 240 x 370, tag kecil warna-warni radius 18, tombol bulat hitam 54px | slider drag (smooothy), kontras teks dihitung otomatis per warna kartu |
| 3 | Flow (How it works) | soft-pink, kapsul menjorok 18px | h2, lead tangan, CTA, 4 kartu 300 x 450 radius 24 (cyan, bright-pink, yellow, periwinkle) bernomor "Step #1" dengan ilustrasi | kartu jatuh masuk elastic, miring acak, ikut mouse |
| 4 | Box | pale-blue, kapsul menjorok 18px, 2700px (ter-pin) | canvas 1440 x 900 memutar kotak terbuka, judul SVG, tombol App Store dan Google Play hitam radius 12 | image sequence scrub |
| 5 | Genre | bright-pink, kapsul penuh, 1390px | daftar nama genre raksasa; hover memunculkan sampul buku genre itu | hover-reveal gambar mengikuti item |
| 6 | Benefits | pale-yellow, sudut bawah 120px | 5 kapsul label raksasa (magenta, orange, periwinkle, cyan, olive) bertumpuk acak + logo bulat besar | pop elastic, dorongan momentum |
| 7 | FAQ | putih | h2 + accordion kartu soft-blue radius 18 | buka-tutup accordion |
| 8 | Gift | putih | judul melengkung di jalur SVG, logo media dalam kotak abu radius 19.5, visual paket | tagline mengikuti kurva |
| 9 | Badge | transparan | pita promo melengkung, berulang | marquee |
| 10 | Choice | yellow, kapsul penuh | kartu pemenang pale-yellow radius 24, ilustrasi hati | plop-in, emoji rain |
| 11 | Exclusive | putih, sudut bawah 120px, menutupi footer | kartu besar pale-pink radius 60 berisi slider buku dan penulis | slider |
| 12 | Footer | violet, padding atas 120px, di bawah exclusive | tautan, sosial | footer parallax scrub 0.2 |

## Yang membuatnya terasa "rounded" dan matang

- Satu radius besar yang konsisten (120px) untuk section, 24px untuk kartu, 6px untuk tombol: tiga tingkat, tidak lebih.
- Tidak ada garis luar. Kontras datang dari blok warna jenuh di atas warna lembut pasangannya (yellow di atas pale-yellow, pink di atas soft-pink).
- Section kapsul menjorok dari tepi layar, jadi halaman terasa seperti tumpukan stiker di atas kertas putih.
- Semua gerak punya pegas (elastic) di akhir: huruf, kartu, dan label "mendarat", bukan berhenti.
- Tulisan tangan violet selalu hadir sebagai suara manusia di samping judul.
