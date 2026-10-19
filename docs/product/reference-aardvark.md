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

Divalidasi ulang 2026-10-19 dengan REA (`rea-agents@6.7.0 analyze-javascript-application --format json` pada bundle dan HTML yang diunduh ke scratchpad). REA memetakan 16 script, sekitar 150 fungsi, timer, dan listener, tetapi tidak mengekstrak parameter tween (3.904 unknown semantik, coverage "unknown"). Parameter gerak di bawah diverifikasi dengan membaca kode langsung. Klaim yang bergantung pada CSS eksternal (font, ukuran, hex, radius, grid) diukur dari computed style di browser dan tidak diperiksa REA.

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
| `osmo` (default) | cubic-bezier 0.625, 0.05, 0, 1; `gsap.defaults` durasi 0.6 | tween umum |
| `energy` | M0,0 C0.32,0.72 0,1 1,1 (37 pemakaian) | paragraf, tombol, header masuk, intro FAQ dan halaman buku |
| `elastic.out(1, 0.72)` / `(1, 0.75)` | pegas | judul, kartu, label, huruf tulisan tangan, logo masuk |
| `elastic.out(1, 0.4)`, `elastic.in(1, 0.72)` | pegas lentur, pegas keluar | huruf tombol saat hover, logo keluar |
| `circ.out` | | clip ellipse hero |
| durasi | 0.35 sampai 1.25 s (reset hover 0.2, blob 3, emoji 0.8 sampai 1.8); stagger 0.011 sampai 0.088, juga `amount: 0.225` | |
| Lenis | lerp 0.2, autoRaf, anchors; scroll memanggil ScrollTrigger.update | |

Pola khas:

1. Transisi halaman: satu path coretan raksasa (viewBox 1080, `stroke-width: 70%`). Saat pergi: DrawSVG `0% 0% -> 0% 100%` (keyframe 90%) dengan stroke 8% ke 70%, 1.25 s. Saat datang: `0% 100% -> 100% 100%` (terhapus dari ujung), stroke menyempit ke 8% di keyframe 95% (circ.out), 1.25 s. Logo pop `scale 0 -> 1, rotate -64 -> 0` (elastic, delay 0.5) lalu keluar `scale 0, rotate 64` (elastic.in, 0.45 sampai 0.6 s). Header turun `yPercent -100 -> 0`, 0.5 s energy.
2. Intro hero (>= 992px): latar dibuka `clipPath: ellipse(20% 0% at 100% 100%) -> ellipse(150% 130% at 100% 100%)` (circ.out, 1.1 s, delay 0.2). Kata judul: `yPercent -10, xPercent 40, scaleY 0.1, scaleX 0.85, rotate 8`, origin kiri atas, opacity 1 di keyframe 10%, elastic.out(1, 0.72), 0.875 s, stagger 0.088, delay 0.25. Paragraf dan tombol `y -0.75em`, 0.35 s energy, delay 0.45 dan 0.525. Visual `y 5em, rotate -43 -> -21`, 0.75 s elastic.
3. Tulisan tangan: SplitText huruf, `opacity 0, rotate 22, x -0.25em, y 0.5em -> 0`, elastic.out(1, 0.75), stagger 0.016, saat masuk viewport (top 95%).
4. Tombol `button-alt`: dua kapsul terpisah (teks + kotak panah) warna sama, radius 6px. Hover: tiap huruf turun dan gepeng (`yPercent 55, scaleY 0.3, rotate 17`) lalu memantul kembali (elastic.out(1, 0.4)).
5. Latar "bernapas": blob SVG (fill dan stroke warna sama) berdenyut `stroke-width 0 <-> 60` dan `rotate 0 <-> 2` per 3 s (sine), hanya saat terlihat.
6. Kartu callout: mulai di posisi acak (xPercent dan yPercent ±5, rotasi ±7.5), masuk dari `yPercent +150` (elastic.out(1, 0.75), 1.05 s, stagger 0.088, sekali, top 85%). Mouse tidak diikuti: lebar baris dibagi rata, kartu aktif = `ceil(mouseX / lebar x N)` dan menjadi `x, y, rotasi 0, scale 1.075` (0.85 s, elastic.out(1, 0.75)); kartu sebelumnya kembali ke posisi acak (rotasi ±10).
7. Label benefit: kapsul raksasa warna-warni (radius 60px) muncul `scale 0, rotate acak ±33 -> 0` (satu nilai acak untuk semua), elastic.out(1, 0.75), 0.85 s, stagger 0.072, top 25%. Hover momentum (InertiaPlugin, hanya hover + pointer halus): pengali xy 25, rotasi 15, resistance 160, clamp xy ±1080 dan rotasi ±60, torsi = offsetX·velY − offsetY·velX dibagi jarak, kecepatan diambil per frame.
8. Image sequence: masing-masing 120 frame webp di `<canvas>`. Hero: loop 24 fps yang diputar saat terlihat (>= 992px), bukan scrub. Box: scrub `top 85%` sampai `bottom 80%` di dalam wrapper CSS sticky (bukan pin GSAP); tulisan tangan muncul di progres 0.3, judul dan tombol di 0.81. Frame dimuat pertama, terakhir, lalu titik tengah secara biner.
9. Footer parallax (>= 991px): `clamp(top bottom)` sampai `clamp(top top)`, scrub 0.2. Konten turun dari `y -12.5em`; visual `scale 0.9, xPercent -35, y 17.5em, rotate 30 -> 0`; overlay opacity 0.55 ke 0.
10. Plop-in (`scale 0, rotate -20, y -4em -> scale 1, rotate 11`, 0.7 s elastic). Emoji rain: 40 emoji naik 0.8 sampai 1.8 s dengan goyangan, hanya saat scroll ke bawah. Tagline melengkung: `startOffset` textPath ter-scrub 0.5. Badge promo: dua pita jatuh dengan elastic (bukan marquee di JS). Accordion: Web Animations tinggi `<details>` 450 ms dengan kurva energy. Kontras teks kartu: luma (0.299R + 0.587G + 0.114B) > 0.5 memilih hitam.
11. Header tidak bersembunyi saat scroll; hanya menandai `data-scrolling-started` setelah 50 px.

## Section per section

| # | Section | Latar dan bentuk | Isi | Motion |
|---|---|---|---|---|
| 0 | Header | transparan, mengambang | logo kiri, tombol pill pale-yellow radius 24px di tengah, `button-alt` oranye kanan, ikon sosial bulat hitam | tombol: huruf memantul saat hover |
| 1 | Hero | yellow, sudut bawah 120px, 1050px | h1 tiga baris kiri, paragraf, `button-alt`, tulisan tangan violet di kanan atas, render kotak 3D (canvas sequence), blob pale-yellow dan orange di belakang | ellipse reveal, kata elastic, huruf tangan, blob bernapas, sequence ikut scroll |
| 2 | Books | putih | h2 + lead + tulisan tangan, slider kartu 264 x 558: latar warna per buku (radius 24, dengan dua "telinga" SVG di atas), sampul 240 x 370, tag kecil warna-warni radius 18, tombol bulat hitam 54px | slider drag (smooothy), kontras teks dihitung otomatis per warna kartu |
| 3 | Flow (How it works) | soft-pink, kapsul menjorok 18px | h2, lead tangan, CTA, 4 kartu 300 x 450 radius 24 (cyan, bright-pink, yellow, periwinkle) bernomor "Step #1" dengan ilustrasi | kartu jatuh masuk elastic, miring acak, ikut mouse |
| 4 | Box | pale-blue, kapsul menjorok 18px, 2700px (CSS sticky) | canvas 1440 x 900 memutar kotak terbuka, judul SVG, tombol App Store dan Google Play hitam radius 12 | image sequence scrub |
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
