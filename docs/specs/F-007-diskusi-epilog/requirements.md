---
id: F-007
title: "Diskusi, cara mulai, FAQ, dan epilog"
type: requirements
status: superseded
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
supersedes: null
---

# Requirements: Diskusi, cara mulai, FAQ, dan epilog

> Digantikan F-013 (2026-10-19): lapisan visual dan section ini diganti revamp gaya Aardvark. Dokumen ini disimpan sebagai riwayat.

## Problem

Halaman belum menunjukkan sisi komunitas, cara mulai, jawaban keberatan umum, dan penutup yang mengarah ke unduhan.

## Goal

Pengunjung melihat ruang diskusi BookMate, tahu tiga langkah memulai, mendapat jawaban faktual, dan berakhir di CTA unduh.

## Non-goals

- Tautan komunitas WhatsApp (A-006).
- QR code (butuh dependency atau aset baru; ditunda ke F-010).

## Functional requirements

### FR-001 — Ruang diskusi

Section Diskusi harus menampilkan empat kartu kemampuan komunitas yang menumpuk saat scroll dan marquee nama fitur yang mengikuti kecepatan scroll.

- AC-001: Given motion diizinkan, when pengunjung scroll melewati Diskusi, then kartu menumpuk (sticky) dan kartu di belakang mengecil.
- AC-002: Given marquee, when scroll lebih cepat, then marquee bergerak lebih cepat; when berada di luar viewport, then berhenti.

### FR-002 — Cara mulai dan FAQ

Tiga langkah memulai dan FAQ faktual dari repo app.

- AC-003: Given Cara mulai, when pengunjung scroll, then garis progres tergambar mengikuti scroll; tanpa motion garis tampil penuh.
- AC-004: Given FAQ, when pertanyaan diaktifkan dengan mouse atau keyboard, then jawabannya terbuka (`<details>`), dan setiap jawaban punya sumber di repo app.

### FR-003 — Epilog

Penutup dengan kalimat besar dan CTA unduh magnetis.

- AC-005: Given Epilog masuk viewport, when motion diizinkan, then kalimat besar mengecil ke ukuran akhir (scrub), dan CTA mengarah ke Google Play.

## Dependencies, scope, and open questions

- Tidak ada dependency baru.
- FAQ bersumber: "100% gratis" dari `marketing_assets/threads/post_01_update_v1.1.0/content.md`; Hapus Akun dari `settings_page.dart`; Android saja dari `RELEASE_NOTES.md`; Pusat Bantuan dari `help_center_data.dart` (repo app).
