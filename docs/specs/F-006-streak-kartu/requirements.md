---
id: F-006
title: "Streak dan kartu pembaca"
type: requirements
status: verification
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
supersedes: null
---

# Requirements: Streak dan kartu pembaca

## Problem

Dua hal yang paling membedakan BookMate secara emosional, kebiasaan harian (streak) dan lencana tarot, belum punya momen di halaman.

## Goal

Pengunjung merasakan kalender streak terisi hari demi hari dan menemukan lencana pembaca yang bisa dibuka, dengan nama dan syarat persis seperti di app.

## Non-goals

- Gambar kartu lencana (menunggu izin A-003); kartu tipografis dulu.
- WebGL (F-009).

## Functional requirements

### FR-001 — Api streak

Section Streak harus ter-pin dan mengisi kalender contoh 30 hari serta menaikkan counter seiring scroll.

- AC-001: Given motion diizinkan, when pengunjung scroll melewati Streak, then hari di kalender terisi berurutan dan counter naik dari 0 ke 30 (scrub, pin).
- AC-002: Given reduced motion atau tanpa JavaScript, when Streak tampil, then kalender tampil penuh dan counter menunjukkan 30 tanpa pin.
- AC-003: Given kalender adalah contoh, when ditampilkan, then labelnya menyebut contoh, bukan data pengguna.

### FR-002 — Kartu pembaca

Section Kartu harus menampilkan satu lencana tier I dari tiap kategori, dari data app, yang dibagikan dari tumpukan ke grid saat terlihat dan bisa dibalik.

- AC-004: Given `src/content/badges.ts`, when test konten berjalan, then ada 30 lencana dalam 6 kategori dan setiap lencana punya judul, filosofi, dan syarat.
- AC-005: Given motion diizinkan, when Kartu masuk viewport, then kartu bergerak dari tumpukan ke grid (Flip) sekali.
- AC-006: Given kartu, when diaktifkan dengan klik, Enter, atau Spasi, then kartu terbalik menampilkan syarat dan filosofi, `aria-pressed` berubah, dan sisi yang tersembunyi `aria-hidden`.
- AC-007: Given pointer halus dan motion diizinkan, when pointer di atas kartu, then kartu miring mengikuti pointer dan permukaan bergelombang singkat (filter SVG); layar sentuh dan reduced motion tidak mendapat efek ini.

## Dependencies, scope, and open questions

- GSAP Flip dari paket `gsap` (bukan dependency baru) didaftarkan di `src/lib/motion/gsap.ts`.
- A-003 terbuka: gambar lencana tidak dipakai; nama dan syarat diambil dari `reading_achievement_resolver.dart` app.
