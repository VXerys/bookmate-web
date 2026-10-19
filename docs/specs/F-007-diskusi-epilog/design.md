---
id: F-007
title: "Diskusi, cara mulai, FAQ, dan epilog"
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

# Design: Diskusi, cara mulai, FAQ, dan epilog

## Summary

Empat section: `diskusi.tsx`, `mulai.tsx`, `faq.tsx` (server, `<details>`), `epilog.tsx`. Marquee memakai `timeScale` yang mengikuti `ScrollTrigger.getVelocity()`.

## Component changes

| Component or path | Change | Responsibility after change |
|---|---|---|
| `src/content/story.ts` | copy Diskusi, Cara mulai, FAQ, Epilog | copy |
| `src/components/sections/diskusi.tsx` | baru: sticky stack + marquee | Ruang diskusi |
| `src/components/sections/mulai.tsx` | baru: tiga langkah + garis progres | Cara mulai |
| `src/components/sections/faq.tsx` | baru: `<details>` | FAQ |
| `src/components/sections/epilog.tsx` | baru: kalimat besar + CTA | Epilog |

## Motion and fallbacks

- Stack: CSS `sticky` + scrub `scale` 1 -> 0,92 pada kartu sebelumnya.
- Marquee: tween `xPercent -50` repeat, `timeScale` dari kecepatan scroll, `paused` di luar viewport.
- Garis progres: `scaleY` 0 -> 1 scrub. Epilog: `scale` 1,25 -> 1 scrub.

## Testing

| Requirement or risk | Test | Layer |
|---|---|---|
| FR-002 | `src/content/story.test.ts` (FAQ punya sumber) | unit |
| AC-001 sampai AC-005 | Browser pane `next dev`, ticker manual; keyboard pada `<details>` | manual |
