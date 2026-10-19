---
id: F-005
title: "Bab horizontal"
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

# Design: Bab horizontal

## Summary

`bab-track.tsx` (klien) merender panel vertikal secara default; di cabang `(min-width: 1024px)` + motion, ia menandai section `data-horizontal`, CSS mengubah track menjadi baris, dan ScrollTrigger mem-pin section serta menggeser track. Parallax bingkai di dalam panel memakai `containerAnimation`.

## Component changes

| Component or path | Change | Responsibility after change |
|---|---|---|
| `src/content/story.ts` | tambah daftar bab dengan `tone` | copy dan warna bab |
| `src/components/sections/bab-track.tsx` | baru | Bab 01 sampai 05 |
| `src/app/globals.css` | aturan `[data-horizontal]` untuk track | tata letak horizontal |

## Motion and fallbacks

- Track: `x` ke `-(lebar track - lebar viewport)`, `pin: true`, `scrub: 0.6`, `invalidateOnRefresh`.
- Bingkai: `xPercent` -8 ke 8 per panel dengan `containerAnimation`.
- Penanda bab: ScrollTrigger per panel dengan `containerAnimation`, `onToggle`.

## Testing

| Requirement or risk | Test | Layer |
|---|---|---|
| AC-001 | `src/content/story.test.ts` (lima bab, pasangan kontras) | unit |
| AC-002 sampai AC-005 | Browser pane: 1440 px (horizontal) dan 360 px (vertikal) | manual |
