---
id: F-004
title: "Manifesto dan buka aplikasi"
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

# Design: Manifesto dan buka aplikasi

## Summary

Dua section: `manifesto.tsx` dan `buka.tsx`, masing-masing dengan klien gerak kecil. Pemisahan salinan aksesibel dipindah dari `Reveal` ke `src/lib/motion/accessible-split.ts` agar Manifesto dan Reveal berbagi aturan yang sama.

## Component changes

| Component or path | Change | Responsibility after change |
|---|---|---|
| `src/lib/motion/accessible-split.ts` | baru: `addScreenReaderCopy(target)` mengembalikan fungsi pulih | salinan sr-only saat split |
| `src/components/motion/reveal.tsx` | memakai helper di atas | tanpa perubahan perilaku |
| `src/components/sections/manifesto.tsx` | baru: pin + scrub opasitas kata | Manifesto |
| `src/components/sections/buka.tsx` | baru: pin + scrub skala bingkai | Buka aplikasinya |

## Motion and fallbacks

- Manifesto: SplitText `words`, `aria: none` + salinan sr-only, `scrub: true`, `pin: true`, `end: +=120%`.
- Buka: `scale` bingkai dan `opacity` pernyataan, `pin: true`, `end: +=100%`.
- Keduanya hanya di cabang `MOTION_OK`; tanpa cabang itu tidak ada pin.

## Testing

| Requirement or risk | Test | Layer |
|---|---|---|
| AC-003 | DOM: teks terekspos sekali (salinan sr-only, visual aria-hidden) | manual |
| AC-001, AC-004 | Browser pane `next dev`, scroll + `ScrollTrigger.update()` + ticker manual | manual |
