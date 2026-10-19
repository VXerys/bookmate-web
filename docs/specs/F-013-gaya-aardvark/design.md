---
id: F-013
title: "Revamp gaya Aardvark"
type: design
status: approved
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002, FR-003]
supersedes: null
---

# Design: Revamp gaya Aardvark

## Summary

Token dan bentuk di globals.css; ease di src/lib/motion/gsap.ts; komponen bersama: ButtonAlt, HandNote, PopTitle, Blobs, Ribbon, Logo. Section baru di src/components/sections/ menggantikan prolog-layers, manifesto, hari, papan, mulai.

## Component changes

| Component or path | Change | Responsibility after change |
|---|---|---|
| `globals.css`, `palette.ts`, `layout.tsx` | ubah | token pasangan warna, font Rubik dan Plus Jakarta Sans, utilitas bentuk |
| `src/lib/motion/gsap.ts` | ubah | CustomEase osmo dan energy, InertiaPlugin untuk dorongan kapsul |
| `src/components/site/button-alt.tsx`, `logo.tsx` | baru | tombol dua kapsul, logo app |
| `src/components/motion/pop-title.tsx`, `hand-note.tsx`, `blobs.tsx` | baru | judul per kata, tulisan tangan per huruf, blob bernapas |
| `src/components/sections/*` | baru, ubah | hero, fitur, hari, buka, daftar, manfaat, rak, faq, epilog |

## Motion and fallbacks

- Ease: osmo (0.625, 0.05, 0, 1), energy (C0.32,0.72 0,1 1,1), elastic.out(1, 0.72) untuk mendarat.
- Satu pin saja (buka); kartu dan kapsul memakai scroll-triggered sekali jalan.

## Testing

| Requirement or risk | Test | Layer |
|---|---|---|
| FR-001, FR-003 | palette, story, navigation tests | node --test |
| FR-002, FR-003 | Browser pane 1440 dan 375 px, ticker manual, :3101 tanpa error console | manual |
