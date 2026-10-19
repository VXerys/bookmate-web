---
id: F-003
title: "Prolog (hero)"
type: requirements
status: verification
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
supersedes: null
---

# Requirements: Prolog (hero)

## Problem

Halaman uji F-001 dan F-002 belum menjual apa pun: first viewport hanya judul dan CTA. Art direction menjadikan Prolog momen terkuat situs: headline, mockup ponsel, dan elemen app yang melayang berlapis.

## Goal

Dalam satu layar, pengunjung tahu BookMate adalah klub baca di ponsel, melihat potongan UI-nya, dan bisa langsung mengunduh.

## Non-goals

- Screenshot final (menunggu A-002); bingkai ponsel memakai slot berlabel.
- WebGL (F-009).

## Functional requirements

### FR-001 — Isi hero

Prolog harus menampilkan kicker, headline dua baris dengan bagian italic, deskripsi, CTA Google Play yang magnetis, dan tautan sekunder ke bab fitur, semuanya dari `src/content/story.ts`.

- AC-001: Given halaman dimuat, when Prolog tampil, then headline, deskripsi, CTA ke `com.mangcoding.bookmate2`, dan tautan `#bab` terlihat dalam viewport 360 x 780 dan 1440 x 900 tanpa overflow.
- AC-002: Given tautan sekunder diaktifkan, when motion diizinkan, then navigasi memakai slice transition F-002 ke `#bab`.

### FR-002 — Lapisan melayang dan parallax

Prolog harus menampilkan bingkai ponsel dan tiga kartu UI melayang yang bergerak berlapis mengikuti pointer dan scroll.

- AC-003: Given pointer halus dan motion diizinkan, when pointer bergerak, then setiap lapisan bergeser sebanding kedalamannya (paling dalam paling sedikit).
- AC-004: Given motion diizinkan, when pengunjung scroll melewati Prolog, then lapisan bergeser vertikal dengan kecepatan berbeda (scrub).
- AC-005: Given reduced motion, layar sentuh, atau tanpa JavaScript, when Prolog tampil, then semua lapisan terlihat di posisi akhir tanpa gerak.

### FR-003 — Koreografi masuk

Setelah intro selesai, lapisan muncul berurutan setelah headline.

- AC-006: Given motion diizinkan, when `completeIntro()` dipanggil, then lapisan naik dan muncul berurutan, dan sebelum itu tidak berkedip terlihat.

## Dependencies, scope, and open questions

- Memakai `Reveal`, `Magnetic`, `navigateTo`, `whenIntroDone` dari F-001 dan F-002. Tidak ada dependency baru.
- A-002 (screenshot) terbuka: layar ponsel berupa slot berlabel sampai screenshot asli tersedia; tidak memblokir struktur.
