---
id: F-002
title: "Shell global: sampul, header, slice transition, menu, cursor, footer"
type: requirements
status: approved
tier: full
owner: "M Sechan Alfarisi"
created: 2026-10-18
last_updated: 2026-10-18
last_verified: 2026-10-18
supersedes: null
---

# Requirements: Shell global

## Problem

F-001 memberi fondasi motion, tetapi situs belum punya rasa "BookMate": tidak ada pembuka, tidak ada navigasi, dan pointer tidak memberi umpan balik. Setiap section F-003 sampai F-007 akan berada di dalam shell ini, jadi shell harus selesai dan stabil sebelum section dibuat. Arah visualnya ada di `docs/product/art-direction.md` (Sampul, katalog motion, aturan motion).

## Goal

Pengunjung yang membuka `/` melihat sampul yang terbuka seperti buku, bisa berpindah antar bab lewat header atau menu dengan transisi irisan halaman, merasakan pointer yang hidup di desktop, dan menutup halaman di footer yang terungkap dari bawah konten. Semua tetap bisa dipakai dengan keyboard, layar sentuh, reduced motion, dan tanpa JavaScript.

## Non-goals

- Konten section (F-003 sampai F-007) dan halaman legal (F-008).
- Transisi antar route; situs masih satu halaman.
- WebGL (F-009).

## Actors

- ACTOR-001: pengunjung desktop dengan mouse atau trackpad.
- ACTOR-002: pengunjung ponsel dengan layar sentuh.
- ACTOR-003: pengguna keyboard atau screen reader.
- ACTOR-004: pengunjung dengan `prefers-reduced-motion: reduce`.

## Functional requirements

### FR-001 — Sampul (preloader)

Situs harus membuka kunjungan pertama di tab dengan sampul: wordmark, counter halaman 001 sampai 100, lalu sampul terbelah dua dan membuka ke hero.

- AC-001: Given kunjungan pertama di tab dengan motion diizinkan, when halaman dimuat, then sampul terlihat sejak paint pertama, scroll terkunci, dan counter naik sampai 100.
- AC-002: Given sampul berjalan, when font dan event `load` selesai, then sampul terbuka paling cepat 2,0 detik dan paling lambat 4,5 detik sejak boot, lalu `completeIntro()` dipanggil sekali dan scroll dilepas.
- AC-003: Given sampul sudah diputar di tab ini, when halaman dimuat ulang, then sampul tidak muncul sama sekali, termasuk tidak berkedip di paint pertama.
- AC-004: Given reduced motion atau JavaScript mati, when halaman dimuat, then tidak ada overlay sampul dan konten langsung terlihat.

### FR-002 — Header dan navigasi

Situs harus menampilkan header dengan wordmark, tautan bab, dan CTA unduh, ditambah tautan lewati ke konten dan indikator bab aktif.

- AC-005: Given halaman dimuat, when pengguna menekan Tab pertama kali, then tautan "Lewati ke konten" muncul dan memindahkan fokus ke `<main>`.
- AC-006: Given motion diizinkan dan scroll lebih dari 120 px, when pengguna scroll ke bawah, then header bergeser keluar layar; when scroll ke atas, then header kembali. Header selalu terlihat saat elemen di dalamnya menerima fokus.
- AC-007: Given section dengan label bab, when section itu melewati tengah viewport, then indikator di header menampilkan label bab tersebut.
- AC-008: Given reduced motion, when pengguna scroll, then header tetap terlihat tanpa animasi.

### FR-003 — Slice transition

Navigasi antar bab dari header, menu, atau tautan internal harus memakai transisi irisan halaman.

- AC-009: Given motion diizinkan, when pengguna mengaktifkan tautan ke `#id` sebuah section, then 5 irisan vertikal menutup layar berurutan, label bab tujuan terlihat, halaman melompat ke target saat tertutup, lalu irisan membuka.
- AC-010: Given transisi selesai atau reduced motion, when target tercapai, then fokus pindah ke heading section target dan URL hash berubah ke `#id` tanpa memicu lompatan kedua dari browser.
- AC-011: Given transisi sedang berjalan, when tautan lain diaktifkan, then klik kedua diabaikan sampai transisi selesai.

### FR-004 — Menu mobile

Di bawah 768 px, navigasi harus berada di menu layar penuh.

- AC-012: Given lebar di bawah 768 px, when tombol "Menu" diaktifkan, then panel layar penuh terbuka dengan curtain wipe, `aria-expanded="true"`, scroll terkunci, dan fokus berpindah ke tautan pertama.
- AC-013: Given menu terbuka, when pengguna menekan Tab di tautan terakhir, then fokus kembali ke tombol tutup; when Esc ditekan atau tautan dipilih, then menu tertutup, scroll dilepas, dan fokus kembali ke tombol "Menu" (kecuali fokus dipindah ke target oleh slice transition).

### FR-005 — Custom cursor dan magnetic

Pointer halus harus mendapat cursor titik dengan cincin yang tertinggal, dan CTA bersifat magnetis.

- AC-014: Given `(pointer: fine)` dan motion diizinkan, when pointer bergerak, then titik mengikuti cepat dan cincin tertinggal; cursor bawaan tetap terlihat.
- AC-015: Given pointer masuk tautan atau tombol, then cincin membesar; given elemen punya `data-cursor-label`, then cincin menjadi pil berisi label itu; given `data-cursor="hide"` atau pointer keluar jendela, then cursor kustom tersembunyi.
- AC-016: Given CTA magnetis, when pointer berada di atasnya, then CTA bergeser ke arah pointer paling jauh 30% dari jarak pointer ke pusat dan kembali dengan pegas saat pointer keluar.
- AC-017: Given layar sentuh atau reduced motion, when halaman dipakai, then tidak ada cursor kustom dan tidak ada efek magnetis.

### FR-006 — Footer reveal

- AC-018: Given pengguna scroll ke akhir halaman, when konten terakhir naik, then footer terungkap dari bawah konten, berisi wordmark, tautan Google Play, dan kredit "Dibuat oleh Mangcoding" dari `src/content/site.ts`.
- AC-019: Given reduced motion atau tanpa JavaScript, when pengguna sampai di akhir halaman, then footer tetap terbaca dan semua tautannya dapat dijangkau keyboard.

## Business and validation rules

- BR-001: semua teks shell (label bab, tautan, kredit) dibaca dari `src/content/`, tidak ditulis di komponen.
- BR-002: tidak ada tautan ke halaman yang belum ada; tautan legal ditambahkan di F-008.

## Edge cases and failure states <!-- full-tier -->

- EC-001: dua overlay meminta kunci scroll bersamaan (menu terbuka lalu slice transition dimulai): scroll baru dilepas setelah keduanya selesai.
- EC-002: tab disembunyikan saat sampul berjalan: sampul tetap selesai dalam batas 4,5 detik dan tidak macet.
- EC-003: hash di URL saat dimuat (contoh `/#bab`): setelah sampul, halaman berada di target tanpa animasi slice.
- EC-004: `sessionStorage` tidak tersedia (mode privat ketat): sampul diputar setiap muat, tanpa error.
- EC-005: jendela di-resize melewati 768 px saat menu terbuka: menu tertutup dan kunci scroll dilepas.

## Non-functional requirements <!-- full-tier -->

- NFR-001 (performance): efek pointer berjalan di `gsap.ticker`, tanpa listener `requestAnimationFrame` kedua; tidak ada tween properti layout.
- NFR-002 (accessibility): semua kontrol shell punya nama aksesibel, fokus terlihat, dan target sentuh minimal 44 x 44 px.
- NFR-003 (stability): CLS tetap di bawah 0,1 dengan shell terpasang.

## Dependencies and constraints

- Memakai API F-001: `completeIntro()`, `whenIntroDone()`, Lenis lewat `smooth-scroll.tsx`, `Reveal`. Tidak ada dependency baru.
- Kunci scroll F-001 (`setScrollLocked(boolean)`) harus diganti dengan kunci per pemilik sebelum menu dan slice dibuat (EC-001).

## Out of scope

- Section stub di halaman uji hanya untuk menguji navigasi; konten final datang di F-003 dan seterusnya.

## Open questions

- Tidak ada yang memblokir. A-001 (nama merek) memengaruhi wordmark; nama tetap dibaca dari `src/content/site.ts`.
