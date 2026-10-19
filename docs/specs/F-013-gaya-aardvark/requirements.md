---
id: F-013
title: "Revamp gaya Aardvark"
type: requirements
status: approved
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
supersedes: null
---

# Requirements: Revamp gaya Aardvark

## Problem

Pemilik menilai desain F-012 masih kotak-kotak: outline tinta dan bayangan offset di semua elemen. Pemilik ingin gaya semirip mungkin dengan aardvarkbookclub.com (bulat, blok warna, gerak berpegas) dengan cerita BookMate sendiri.

## Goal

Halaman / memakai sistem visual dan gerak dari docs/product/reference-aardvark.md, diterjemahkan ke warna, font gratis, logo, dan cerita BookMate.

## Non-goals

- Aset, font, atau copy Aardvark.
- Render 3D image sequence (slot disiapkan untuk render pemilik nanti).
- Dependency npm baru.

## Functional requirements

### FR-001 — Sistem visual

Situs harus memakai pasangan warna jenuh dan lembut dari app_colors.dart, Rubik untuk display, Plus Jakarta Sans untuk teks, Caveat biru untuk tulisan tangan, bentuk section lewat clip-path (bawah, kapsul, kapsul menjorok) dengan radius 120/24/6, tanpa outline tinta dan bayangan offset.

- AC-001: Given palette.ts dan globals.css, then semua token baru ada dengan hex dari app_colors.dart dan test sinkronisasi serta kontras lulus.
- AC-002: Given halaman /, then tidak ada elemen UI (selain ilustrasi) dengan border tinta tebal atau bayangan offset, dan setiap section memakai salah satu dari tiga bentuk clip-path.

### FR-002 — Gerak berpegas

Gerak harus memakai ease osmo dan energy (CustomEase) serta elastic untuk momen mendarat, semuanya di dalam gsap.matchMedia dengan cabang reduced motion.

- AC-003: Given motion diizinkan, then judul masuk per kata dengan pegas, tulisan tangan per huruf, kartu jatuh dengan pegas, dan huruf tombol memantul saat hover pointer halus.
- AC-004: Given reduced motion atau tanpa JS, then semua konten tampil dalam keadaan akhir tanpa pin.

### FR-003 — Section BookMate

Halaman harus berisi loader, hero, slider fitur, satu hari pembaca (5 kartu jam), buka aplikasinya (ponsel 3D ter-pin), daftar fitur dengan pratinjau hover, kapsul manfaat, rak lencana, FAQ, penutup, dan footer biru, dengan fakta dari repo app.

- AC-005: Given 1440 dan 375 px, then setiap section tampil tanpa overflow horizontal dan semua screenshot punya alt.
- AC-006: Given slider fitur dan rak lencana, then keduanya bisa dioperasikan dengan keyboard (tombol dan fokus) dan tetap bisa digeser di layar sentuh.
- AC-007: Given tautan header, when diklik, then section tujuan tiba di bawah header dan indikator berganti.

## Dependencies, scope, and open questions

- Keputusan grilling 2026-10-19 (Q1 sampai Q10) menetapkan arah; detail ronde 2 diputuskan sesuai rekomendasi atas arahan pemilik.
- Menggantikan lapisan visual F-012; screenshot tetap sementara (A-002 open).
