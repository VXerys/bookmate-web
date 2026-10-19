---
id: F-008
title: "SEO dan halaman legal"
type: requirements
status: implementing
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
supersedes: null
---

# Requirements: SEO dan halaman legal

## Problem

Situs belum punya gambar pratinjau saat dibagikan, data terstruktur untuk mesin pencari, maupun URL kebijakan privasi dan hapus akun untuk Play Console.

## Goal

Tautan situs tampil rapi saat dibagikan, mesin pencari mengenali BookMate sebagai aplikasi, dan halaman legal siap begitu isinya tersedia.

## Non-goals

- Menulis teks hukum (A-005).
- Analytics sebelum keputusan A-007.

## Functional requirements

### FR-001 — Metadata, gambar OG, robots, data terstruktur

Situs harus menyediakan judul, deskripsi, Open Graph dan Twitter card dengan gambar 1200 x 630, `robots.txt`, dan JSON-LD `MobileApplication` dari `site.ts`.

- AC-001: Given build produksi, when `/` dimuat, then `<head>` berisi `og:title`, `og:description`, `og:image`, dan `twitter:card` `summary_large_image`.
- AC-002: Given `/opengraph-image`, when diminta, then responsnya PNG 1200 x 630.
- AC-003: Given `/`, when HTML dibaca, then ada JSON-LD `MobileApplication` dengan nama, sistem operasi Android, harga 0, dan tautan Google Play.
- AC-004: Given `/robots.txt`, when diminta, then semua crawler diizinkan.

### FR-002 — Halaman legal, sitemap, analytics

Situs harus menyediakan `/kebijakan-privasi` dan `/hapus-akun`, sitemap dan canonical absolut, serta analytics, setelah input pemilik tersedia.

- AC-005: Given isi dari pemilik (A-005), when halaman legal dibuka, then teks tampil dan tertaut dari footer.
- AC-006: Given domain (A-004), when `/sitemap.xml` diminta, then berisi URL absolut halaman publik, dan `/` punya canonical.
- AC-007: Given keputusan analytics (A-007), when CTA unduh diklik, then event tercatat tanpa data pribadi.

## Dependencies, scope, and open questions

- Tidak ada dependency baru: `next/og` bawaan Next.
- A-004, A-005, A-007 terbuka dan memblokir FR-002.
