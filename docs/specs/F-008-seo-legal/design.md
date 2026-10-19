---
id: F-008
title: "SEO dan halaman legal"
type: design
status: implementing
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002]
supersedes: null
---

# Design: SEO dan halaman legal

## Summary

`src/app/opengraph-image.tsx` (ImageResponse), `src/app/robots.ts`, metadata di `layout.tsx` dengan `metadataBase` dari `NEXT_PUBLIC_SITE_URL` bila ada, JSON-LD di `page.tsx` dari `src/lib/structured-data.ts` (+ test).

## Component changes

| Component or path | Change | Responsibility after change |
|---|---|---|
| `src/lib/structured-data.ts` | baru: `mobileApplicationJsonLd()` + test | data terstruktur |
| `src/app/opengraph-image.tsx` | baru | gambar pratinjau |
| `src/app/robots.ts` | baru | robots.txt |
| `src/app/layout.tsx` | Open Graph, Twitter, `metadataBase` opsional | metadata |
| `.env.example` | baru: `NEXT_PUBLIC_SITE_URL` tanpa nilai | dokumentasi variabel |

## Motion and fallbacks

- Tidak ada motion baru.

## Testing

| Requirement or risk | Test | Layer |
|---|---|---|
| AC-003 | `src/lib/structured-data.test.ts` | unit |
| AC-001, AC-002, AC-004 | `curl` ke `next start` | manual |
