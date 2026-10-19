---
id: F-012
title: "Redesign Marginalia: satu hari pembaca"
type: design
status: approved
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002, FR-003, FR-004, FR-005, FR-006]
supersedes: null
---

# Design: Redesign Marginalia: satu hari pembaca

## Summary

Ilustrasi dan doodle adalah komponen server di `src/components/art/`; section klien menggerakkannya lewat `data-draw`, `data-highlight`, dan sejenisnya. Copy di `src/content/story.ts`, bab di `navigation.ts`.

## Component changes

| Component or path | Change | Responsibility after change |
|---|---|---|
| `globals.css`, `palette.ts`, `layout.tsx` | ubah | token sky dan highlight, font display dan tangan, kelas doodle |
| `src/lib/motion/gsap.ts`, `src/lib/motion/draw.ts` | ubah, baru | DrawSVG dan MotionPath; helper siapkan dan gambar doodle |
| `src/components/art/*` | baru | doodle, stabilo, sampul abstrak, punggung buku, adegan jam, busur matahari |
| `sampul.tsx`, `prolog*.tsx`, `manifesto.tsx`, `buka.tsx` | ubah | buku terbuka, hero bercatatan, coretan manifesto |
| `hari.tsx` (baru) menggantikan `bab-track.tsx` dan `streak.tsx` | baru | buku ter-pin dengan daun halaman 3D |
| `rak.tsx`, `papan.tsx` menggantikan `kartu.tsx`, `diskusi.tsx` | baru | rak lencana dan papan komunitas |
| `mulai.tsx`, `faq.tsx` (indeks), `epilog.tsx`, `cursor.tsx` | ubah | pita pembatas, indeks, penutup, cursor coretan |

## Motion and fallbacks

- Semua di gsap.matchMedia; buku hari hanya ter-pin di (min-width: 1024px) dengan motion.
- Daun halaman: z-index ditukar saat rotasi melewati -90 derajat supaya urutan tumpukan benar saat maju dan mundur.
- Doodle disembunyikan sebelum siap lewat `html.js [data-draw]:not([data-draw-ready])` hanya saat motion diizinkan.

## Testing

| Requirement or risk | Test | Layer |
|---|---|---|
| FR-001, FR-003, FR-005 | `palette.test.ts`, `story.test.ts`, `navigation.test.ts`: token, copy lima jam, bab | node --test |
| FR-002 sampai FR-005 | Browser pane 1440 dan 375 px, ticker manual, screenshot per section | manual |
