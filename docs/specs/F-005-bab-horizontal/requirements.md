---
id: F-005
title: "Bab horizontal"
type: requirements
status: superseded
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
supersedes: null
---

# Requirements: Bab horizontal

> Digantikan F-013 (2026-10-19): lapisan visual dan section ini diganti revamp gaya Aardvark. Dokumen ini disimpan sebagai riwayat.

## Problem

Lima kemampuan inti BookMate (Catat Bacaan, Streak Harian, Bedah Buku, Komunitas, Pinjam Buku) adalah inti penjelasan produk dan belum ada di halaman.

## Goal

Pengunjung melewati lima bab dalam satu track horizontal ter-pin di desktop, atau tumpukan vertikal di ponsel, dan tahu apa yang dilakukan tiap fitur.

## Non-goals

- Screenshot final (A-002).
- Detail streak dan lencana (F-006).

## Functional requirements

### FR-001 — Lima bab dari konten

Section Bab harus menampilkan lima panel dari `story.ts`, masing-masing dengan nomor, judul, deskripsi, bingkai ponsel, dan warna latar sendiri yang lolos kontras.

- AC-001: Given `story.ts`, when test konten berjalan, then ada lima bab dengan judul dan deskripsi, dan setiap pasangan teks/latar ada di `textPairs` untuk ukuran normal.
- AC-002: Given halaman dimuat tanpa JavaScript atau dengan reduced motion, when pengunjung scroll, then lima panel tersusun vertikal dan terbaca.

### FR-002 — Track horizontal

Di lebar ≥ 1024 px dengan motion diizinkan, panel bergerak horizontal saat scroll vertikal.

- AC-003: Given lebar ≥ 1024 px dan motion diizinkan, when pengunjung scroll melewati Bab, then section ter-pin dan track bergeser sampai panel kelima terlihat penuh, lalu halaman lanjut.
- AC-004: Given track bergerak, when panel aktif berganti, then penanda "Bab 0X / 05" ikut berganti.
- AC-005: Given lebar di bawah 1024 px, when pengunjung scroll, then tidak ada pin dan tidak ada overflow horizontal.

## Dependencies, scope, and open questions

- Memakai `phone-frame.tsx`, `story.ts`, `palette.ts`. Tidak ada dependency baru.
- A-002 terbuka: layar memakai slot berlabel.
