---
id: F-004
title: "Manifesto dan buka aplikasi"
type: requirements
status: superseded
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
supersedes: null
---

# Requirements: Manifesto dan buka aplikasi

> Digantikan F-013 (2026-10-19): lapisan visual dan section ini diganti revamp gaya Aardvark. Dokumen ini disimpan sebagai riwayat.

## Problem

Setelah hero, pengunjung perlu alasan: kenapa klub baca, bukan sekadar pencatat. Art direction menaruh Manifesto (masalah membaca sendirian) dan momen "Buka aplikasinya" sebagai jembatan ke bab fitur.

## Goal

Pengunjung membaca masalah inti kata demi kata seiring scroll, lalu melihat layar app membesar memenuhi layar sebelum masuk ke bab.

## Non-goals

- Screenshot final (A-002).
- Angka atau klaim pengguna.

## Functional requirements

### FR-001 — Manifesto terisi tinta

Section Manifesto harus ter-pin dan mengisi kata demi kata dari pudar ke penuh mengikuti scroll.

- AC-001: Given motion diizinkan, when pengunjung scroll melewati Manifesto, then opasitas kata naik dari 0,15 ke 1 berurutan dan mundur saat scroll balik (scrub).
- AC-002: Given reduced motion atau tanpa JavaScript, when Manifesto tampil, then paragraf terbaca penuh tanpa pin.
- AC-003: Given screen reader, when membaca Manifesto, then paragraf utuh dibacakan sekali.

### FR-002 — Buka aplikasinya

Section Buka harus memperbesar bingkai ponsel dari kecil ke memenuhi layar seiring scroll, dengan pernyataan besar di belakangnya.

- AC-004: Given motion diizinkan, when pengunjung scroll melewati Buka, then skala bingkai naik dari sekitar 0,55 ke 1 dan pernyataan memudar (scrub, pin).
- AC-005: Given reduced motion atau tanpa JavaScript, when Buka tampil, then bingkai dan pernyataan tampil statis tanpa pin dan tanpa overflow.

## Dependencies, scope, and open questions

- Memakai `phone-frame.tsx` dan `story.ts` dari F-003. Tidak ada dependency baru.
- A-002 terbuka: layar memakai slot berlabel.
