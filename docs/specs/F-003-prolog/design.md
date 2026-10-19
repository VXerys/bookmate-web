---
id: F-003
title: "Prolog (hero)"
type: design
status: superseded
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002, FR-003]
supersedes: null
---

# Design: Prolog (hero)

## Summary

Section server-rendered `src/components/sections/prolog.tsx` dengan satu klien kecil `prolog-layers.tsx` untuk parallax. Lapisan memakai dua pembungkus: luar untuk scroll (`yPercent`), dalam untuk pointer (`x`, `y`), agar dua efek tidak menulis properti yang sama.

## Component changes

| Component or path | Change | Responsibility after change |
|---|---|---|
| `src/content/story.ts` | baru: copy Prolog, Manifesto, Buka, Bab | satu sumber copy cerita |
| `src/components/site/phone-frame.tsx` | baru: bingkai ponsel CSS dengan slot layar berlabel | dipakai F-003 sampai F-005 |
| `src/components/sections/prolog.tsx` | baru: markup hero | Prolog |
| `src/components/motion/prolog-layers.tsx` | baru: parallax pointer + scroll, masuk setelah intro | gerak lapisan |
| `src/app/page.tsx` | hero uji diganti `<Prolog />` | komposisi |

## Motion and fallbacks

- Pointer: `gsap.quickTo` per lapisan, kedalaman 0,2 sampai 1, hanya `POINTER_MOTION` dan lebar ≥ 768 px.
- Scroll: `yPercent` -10 sampai -40 sesuai kedalaman, `scrub: true`, hanya `MOTION_OK`.
- Masuk: pembungkus lapisan ber-`data-reveal`, ditandai siap lalu `gsap.from` setelah `whenIntroDone`.

## Testing

| Requirement or risk | Test | Layer |
|---|---|---|
| FR-001 | `src/content/story.test.ts` (copy terisi, CTA dari site) | unit |
| AC-001 sampai AC-006 | Browser pane `next start` dan `next dev` dengan ticker manual | manual |
