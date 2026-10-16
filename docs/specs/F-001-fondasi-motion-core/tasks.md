---
id: F-001
title: "Fondasi dan motion core"
type: tasks
status: implementing
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-16
last_updated: 2026-10-16
last_verified: 2026-10-16
requirements: [FR-001, FR-002, FR-003, FR-004, FR-005, FR-006]
supersedes: null
---

# Tasks: Fondasi dan motion core

This file is the master for task status. `state.yaml`, `BRIEF.md`, and the progress views are rendered from it and never edited by hand.

## Tasks

### T-001 — Scaffold Next.js, toolchain, CI, dan sumber fakta merek
- status: review
- requirements: [FR-001, FR-006]
- depends_on: []
- evidence: [EV-001, EV-002, EV-003]

Scope: `package.json` (stack sama dengan `sechan-portfolio`, `"type": "module"`), `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `.gitignore`, `src/app/{layout,page}.tsx`, `src/app/globals.css` minimal, `src/content/site.ts` + test, `.github/workflows/context-integrity.yml`. Dependency `gsap`, `@gsap/react`, `lenis` disetujui pemilik (2026-10-16). Acceptance: AC-001, AC-002, AC-014 (AC-014 baru terbukti di PR pertama). Menunggu commit pertama dan review pemilik.

### T-002 — Token desain, font, dan gaya dasar
- status: planned
- requirements: [FR-002]
- depends_on: [T-001]
- evidence: []

Scope: `src/content/palette.ts`, `src/lib/color/contrast.ts` + test, `@theme` di `globals.css`, `next/font/google` (Newsreader dengan sumbu `opsz` dan italic, Inter, JetBrains Mono) di `layout.tsx`, kelas `.display`, `.statement`, `.label`, `.grain`, gaya fokus. Acceptance: AC-003, AC-004, AC-005. Stop jika pasangan warna dari art direction gagal kontras: laporkan, jangan ubah palet diam-diam.

### T-003 — Hub GSAP, Lenis, state intro, dan boot script
- status: planned
- requirements: [FR-003, FR-004]
- depends_on: [T-002]
- evidence: []

Scope: `src/lib/motion/gsap.ts`, `src/lib/motion/intro-state.ts` + test, `src/components/motion/smooth-scroll.tsx`, boot script di `layout.tsx`, CSS Lenis, `scrollbar-gutter: stable`, blok `prefers-reduced-motion`. Acceptance: AC-006 sampai AC-010. Referensi pola: `sechan-portfolio/src/components/motion/smooth-scroll.tsx`.

### T-004 — Primitive reveal teks
- status: planned
- requirements: [FR-005]
- depends_on: [T-003]
- evidence: []

Scope: `src/components/motion/reveal.tsx` (mode `lines` dan `words`), dipakai di halaman uji. Acceptance: AC-011, AC-012, AC-013. Tidak men-split tautan atau markup inline bermakna.

### T-005 — Integrasi dan verifikasi fondasi
- status: planned
- requirements: [FR-001, FR-002, FR-003, FR-004, FR-005]
- depends_on: [T-004]
- evidence: []

Halaman uji fondasi di `/` memakai token, font, Lenis, dan reveal. Verifikasi di Browser pane pada 360, 768, 1440 px, emulasi reduced motion, dan JavaScript dimatikan; Lighthouse CLS. Semua EV dicatat, handoff diperbarui.

## Deferred

None.
