---
id: F-011
title: "Screenshot sementara dan perbaikan bug animasi"
type: design
status: verification
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002, FR-003]
supersedes: null
---

# Design: Screenshot sementara dan perbaikan bug animasi

## Summary

Data layar di `src/content/screens.ts` (label, alt), gambar statis di `src/components/site/screen-images.ts`, `PhoneFrame` merender next/image. Indikator header membaca layout langsung saat scroll; `SmoothScroll` mengurutkan trigger di setiap refresh dan me-resize Lenis.

## Component changes

| Component or path | Change | Responsibility after change |
|---|---|---|
| `src/content/screens.ts`, `story.ts` | baru, ubah | id layar per section; statement Buka dibagi dua |
| `src/components/site/phone-frame.tsx`, `screen-images.ts` | ubah, baru | next/image fill, blur placeholder, `eager` untuk Prolog |
| `src/components/site/header.tsx` | ubah | indikator dari getBoundingClientRect, hide dari scroll listener |
| `src/components/motion/smooth-scroll.tsx` | ubah | ScrollTrigger.sort di refreshInit, lenis.resize di refresh dan sebelum scrollTo |
| `src/components/sections/kartu.tsx`, `globals.css`, `gsap.ts` | ubah | deal berbasis transform; Flip dan `.deck-stacked` dihapus |
| `buka.tsx`, `bab-track.tsx`, `mulai.tsx` | ubah | komposisi baru dan entrance per panel |
| `magnetic.tsx`, `cursor.tsx`, `diskusi.tsx`, scrub di section lain | ubah | ease, scroll re-read, decay marquee, smoothing |

## Motion and fallbacks

- Semua efek tetap di dalam gsap.matchMedia dengan cabang reduced motion; Buka tanpa motion tetap terbaca karena ponsel duduk di celah kalimat.
- Transform dan opacity saja; tidak ada properti layout di tween scroll.

## Testing

| Requirement or risk | Test | Layer |
|---|---|---|
| FR-001 | `story.test.ts`: setiap layar punya alt | node --test |
| FR-002, FR-003 | Browser pane: refresh drift, klik menu, tinggi dokumen, screenshot 1440 dan 375 px | manual (dev, ticker manual) |
