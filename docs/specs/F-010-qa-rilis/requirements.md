---
id: F-010
title: "QA dan rilis"
type: requirements
status: implementing
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
supersedes: null
---

# Requirements: QA dan rilis

## Problem

Semua section sudah ada; sebelum dipublikasikan, situs perlu header keamanan, audit aksesibilitas dan performa, dan jalur deploy.

## Goal

Situs lolos audit yang bisa dijalankan di repo, dengan daftar jelas apa yang masih menunggu pemilik sebelum rilis.

## Non-goals

- Deploy produksi tanpa persetujuan pemilik dan domain (A-004).

## Functional requirements

### FR-001 — Header keamanan

Semua respons harus membawa header keamanan dasar.

- AC-001: Given `next start`, when `/` diminta, then respons membawa `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, dan `Permissions-Policy` yang mematikan kamera, mikrofon, dan geolokasi.

### FR-002 — Audit

Audit struktur aksesibilitas, konten tanpa JavaScript, dan ukuran bundle harus tercatat.

- AC-002: Given HTML produksi, when diaudit, then ada tepat satu `h1`, landmark `header`, `main`, `footer`, `nav` berlabel, setiap section punya heading, dan tidak ada `img` tanpa `alt`.
- AC-003: Given build produksi, when ukuran first-load diukur, then angkanya tercatat sebagai baseline dan dibandingkan dengan F-001 EV-011.

### FR-003 — Rilis

Deploy ke Vercel dengan domain setelah persetujuan pemilik.

- AC-004: Given persetujuan pemilik dan domain (A-004), when deploy produksi, then situs dapat diakses di domain dan Lighthouse mobile memenuhi target PRD.

## Dependencies, scope, and open questions

- Tidak ada dependency baru.
- AC-004 diblokir A-004 dan persetujuan deploy.
