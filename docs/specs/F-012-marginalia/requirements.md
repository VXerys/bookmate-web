---
id: F-012
title: "Redesign Marginalia: satu hari pembaca"
type: requirements
status: superseded
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
supersedes: null
---

# Requirements: Redesign Marginalia: satu hari pembaca

> Digantikan F-013 (2026-10-19): lapisan visual dan section ini diganti revamp gaya Aardvark. Dokumen ini disimpan sebagai riwayat.

## Problem

Pemilik menilai UI terlalu kosong dan generik, dan alur animasinya kurang bercerita: setiap section hanya judul serif dan satu ponsel di atas krem polos.

## Goal

Halaman / bercerita sebagai buku yang dibaca bareng teman sepanjang satu hari, dengan lapisan ilustrasi SVG, doodle yang tergambar, dan satu momen motion khas per section (docs/product/art-direction.md).

## Non-goals

- Dependency baru, termasuk Three.js (F-009 tetap terpisah).
- Screenshot bersih (A-002) dan gambar lencana tarot (A-003).
- Halaman legal (F-008).

## Functional requirements

### FR-001 — Fondasi visual

Situs harus memakai palet, tipografi, dan pustaka doodle dari art direction 2026-10-19, dengan setiap doodle tergambar penuh tanpa JavaScript atau dengan reduced motion.

- AC-001: Given palette.ts dan globals.css, then token sky dan highlight ada dengan hex dari app_colors.dart dan test sinkronisasi lulus.
- AC-002: Given reduced motion atau tanpa JS, when halaman dimuat, then setiap doodle dan stabilo tampil dalam keadaan akhir.

### FR-002 — Sampul, prolog, manifesto

Pembuka harus berupa buku BookMate yang terbuka; prolog harus memberi stabilo, panah, buku melayang, dan catatan pinggir; manifesto harus mencoret masalah dan melingkari solusi saat scroll.

- AC-003: Given intro diputar, when selesai, then sampul berputar terbuka dan halaman siap dipakai dalam 4,5 detik.
- AC-004: Given prolog setelah intro, then stabilo di belakang frasa penekanan dan panah ke CTA tergambar; given manifesto ter-pin, then frasa masalah tercoret dan frasa solusi dilingkari seiring scroll.

### FR-003 — Satu hari pembaca

Section hari harus menampilkan lima spread berjam (pagi, siang, sore, malam, besok) dengan fakta fitur dari app, satu ilustrasi dan satu screenshot per spread.

- AC-005: Given layar 1024px atau lebih dan motion diizinkan, when scroll, then buku ter-pin dan empat halaman dibalik satu per satu, matahari bergerak sepanjang busur menjadi bulan, dan latar berganti warna jam.
- AC-006: Given layar di bawah 1024px atau reduced motion, then lima spread tampil bertumpuk vertikal dan semua teks terbaca tanpa pin.

### FR-004 — Rak, papan, mulai, indeks, epilog

Lencana harus tampil sebagai rak punggung buku yang bisa dibuka dengan keyboard; komunitas sebagai papan catatan; cara mulai sebagai pita pembatas; FAQ sebagai indeks; epilog menutup cerita dengan CTA.

- AC-007: Given rak, when punggung buku diaktifkan dengan klik, Enter, atau Spasi, then catatan berisi nama lencana, filosofi, dan syarat tampil dan aria-expanded berubah.
- AC-008: Given papan dan mulai saat scroll, then catatan menempel ke posisi akhir dan jalur pita tergambar dengan pembatas berjalan di atasnya; given indeks, then setiap jawaban tetap memakai details bawaan.

### FR-005 — Navigasi dan kualitas

Bab baru harus terhubung ke header, menu, dan slice transition, tanpa overflow horizontal dan tanpa error console.

- AC-009: Given chapters baru, when tautan menu diklik, then section tujuan tiba di bawah header dan indikator menampilkan bab itu.
- AC-010: Given 1440 dan 375 px, then tidak ada overflow horizontal, tidak ada error console, dan lint, typecheck, test, build lulus.

### FR-006 — Energi Aardvark

Atas permintaan pemilik 2026-10-19, situs harus memakai ritme blok warna bersudut membulat, loader sapuan kuas, buku 3D CSS, nav pill, dan pill marquee (art-direction.md, Revisi 2026-10-19), tanpa aset atau font Aardvark.

- AC-011: Given halaman dimuat dengan motion, then loader biru tertutup sapuan kuas kuning lalu hero kuning tampil, dan buku 3D di hero berputar mengikuti scroll dan pointer.
- AC-012: Given section berwarna, then masing-masing bersudut atas membulat dan menumpuk di atas section sebelumnya tanpa overflow horizontal di 1440 dan 375 px.

## Dependencies, scope, and open questions

- Menggantikan lapisan visual section F-003 sampai F-007 dan F-011; perilaku yang dipertahankan (reveal teks, slice, scroll lock, footer reveal) tetap milik F-001 dan F-002.
- Tokoh pembaca digambarkan lewat benda di sekitarnya (cangkir, buku, lampu), bukan figur orang, supaya tidak menjadi ilustrasi orang generik.
