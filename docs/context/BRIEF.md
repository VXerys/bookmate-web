<!-- GENERATED FILE — DO NOT EDIT. Rendered by `npm run context:render`.
Source: sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.
source_hash: fa754734bf1d1bff8c41abd1d484308d98fe75757ed4b05f7012531fb24d3b7b -->

# Brief

BookMate Web adalah situs pemasaran untuk aplikasi BookMate yang mengajak pembaca Indonesia bergabung ke klub baca komunitas lewat pengalaman scroll yang sinematik, lalu mengunduh aplikasinya dari Google Play.

Project `BookMate Web`, tier `lite`. Rendered from sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.

## Active
Feature F-001 — Fondasi dan motion core (`implementing`, docs/specs/F-001-fondasi-motion-core/)
Task T-003 — Hub GSAP, Lenis, state intro, dan boot script (`review`); requirements: FR-003, FR-004; depends on: T-002

Scope: `src/lib/motion/gsap.ts`, `src/lib/motion/intro-state.ts` + test, `src/components/motion/smooth-scroll.tsx`, boot script di `layout.tsx`, CSS Lenis, `scrollbar-gutter: stable`, blok `prefers-reduced-motion`. Acceptance: AC-006 sampai AC-010. Referensi pola: `sechan-portfolio/src/components/motion/smooth-scroll.tsx`.

Hasil: boot script dipindah ke `src/lib/motion/boot-script.ts` agar string yang dikirim bisa dites; `intro-gate.tsx` (`completeIntro()`) menjadi satu-satunya penanda intro selesai sampai sampul F-002 ada; Flip dan ScrambleText belum didaftarkan. Temuan kecil ikut diperbaiki: `@import "tailwindcss" source("..")` membatasi pemindaian ke `src/` (CSS 17,7 KB menjadi 15,6 KB). AC-007 menunggu cek manual pemilik (lihat `verification.md`).

Acceptance criteria:
- AC-006: Given motion diizinkan, when halaman dimuat, then satu instance Lenis berjalan dan `ScrollTrigger.update` dipanggil pada setiap event scroll Lenis.
- AC-007: Given `prefers-reduced-motion: reduce`, when halaman dimuat, then Lenis tidak dibuat dan scroll native berjalan.
- AC-010: Given skrip boot berjalan tetapi intro tidak pernah menandai selesai dalam 6 detik, when batas waktu lewat, then kelas `js` dilepas dan konten terlihat.

## Rules
Stop conditions:

Stop and report, instead of implementing, when the task would require any prohibited action above, when two sources of truth conflict, when a blocking assumption is open, or when a required command is unavailable.

Prohibited without explicit owner approval:

- Changing a public API, event, or data contract.
- Destructive data operations: drop, mass delete, reset, backfill with unknown impact, editing an applied migration.
- Replacing a major framework, provider, or dependency; adding a dependency outside the policy in `tech.md`.
- Breaking an architecture boundary or dependency direction.
- Changing production infrastructure, credentials, or configuration.
- Bypassing authentication or authorization.
- Force push, history rewrite, or any git operation that can destroy work.
- Editing a generated or frozen path.
- Publishing, deploying, or sending messages on the owner's behalf.

## Read-only paths
Generated: `docs/context/state.yaml`, `docs/context/PROJECT_STATE.md`, `docs/context/PROGRESS.md`, `docs/context/BRIEF.md`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.cursor/rules/`, `.github/copilot-instructions.md`, `.github/instructions/`, `.kiro/steering/`
Frozen: none

## Open assumptions
None.

## Handoff
Next step:

Pemilik cek AC-007 di DevTools dan commit T-003. Setelah itu set T-003 `done` dengan hash commit, lalu `/sdd:task T-004` (reveal teks): `src/components/motion/reveal.tsx` dengan SplitText `mask: "lines"`, `aria: "auto"`, `autoSplit`, hanya menyembunyikan saat `html.js` ada dan motion diizinkan. Verifikasi: `npm test && npm run lint && npm run typecheck && npm run build`, lalu Browser pane dan pemeriksaan aksesibilitas nama judul.

## Other open tasks
- T-004 — Primitive reveal teks (`planned`)
- T-005 — Integrasi dan verifikasi fondasi (`planned`)

## Features
| Feature | Status | Phase | Done/Total |
|---|---|---|---|
| F-001 Fondasi dan motion core | implementing | in_progress | 2/5 |
