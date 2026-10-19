---
id: F-006
title: "Streak dan kartu pembaca"
type: design
status: verification
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002]
supersedes: null
---

# Design: Streak dan kartu pembaca

## Summary

`badges.ts` dibangkitkan dari resolver app. `streak.tsx` dan `kartu.tsx` adalah section klien. Liquid hover memakai satu filter SVG `feTurbulence` + `feDisplacementMap` yang `scale`-nya ditween GSAP (atribut) hanya selama ripple.

## Component changes

| Component or path | Change | Responsibility after change |
|---|---|---|
| `src/content/badges.ts` | baru, hasil ekstraksi resolver app | 30 lencana |
| `src/content/story.ts` | copy Streak dan Kartu | copy |
| `src/components/sections/streak.tsx` | baru | Api streak |
| `src/components/sections/kartu.tsx` | baru | Kartu pembaca |
| `src/lib/motion/gsap.ts` | daftarkan Flip | plugin |

## Motion and fallbacks

- Streak: timeline scrub ter-pin, hari diwarnai via kelas `data-on`, counter via objek proxy.
- Kartu: kelas `deck-stacked` saat mount (hanya motion), `Flip.from` sekali saat ScrollTrigger masuk.
- Tilt: `quickTo` rotateX/rotateY maks 8 derajat; liquid: tween atribut `scale` 0 -> 24 -> 0.

## Testing

| Requirement or risk | Test | Layer |
|---|---|---|
| AC-004 | `src/content/badges.test.ts` | unit |
| AC-001, AC-005 sampai AC-007 | Browser pane `next dev`, ticker manual | manual |
