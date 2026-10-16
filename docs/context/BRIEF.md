<!-- GENERATED FILE — DO NOT EDIT. Rendered by `npm run context:render`.
Source: sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.
source_hash: 438a8129b4cb52e865b5001f85b1a66dbb24c904ac4c75009005e6f23a4b77b6 -->

# Brief

BookMate Web adalah situs pemasaran untuk aplikasi BookMate yang mengajak pembaca Indonesia bergabung ke klub baca komunitas lewat pengalaman scroll yang sinematik, lalu mengunduh aplikasinya dari Google Play.

Project `BookMate Web`, tier `lite`. Rendered from sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.

## Active
Feature F-001 — Fondasi dan motion core (`implementing`, docs/specs/F-001-fondasi-motion-core/)
Task T-002 — Token desain, font, dan gaya dasar (`review`); requirements: FR-002; depends on: T-001

Scope: `src/content/palette.ts`, `src/lib/color/contrast.ts` + test, `@theme` di `globals.css`, `next/font/google` (Newsreader dengan sumbu `opsz` dan italic, Inter, JetBrains Mono) di `layout.tsx`, kelas `.display`, `.statement`, `.label`, `.grain`, gaya fokus. Acceptance: AC-003, AC-004, AC-005. Stop jika pasangan warna dari art direction gagal kontras: laporkan, jangan ubah palet diam-diam.

Acceptance criteria:
- AC-003: Given token di `@theme`, when komponen memakai `bg-paper`, `text-ink`, `bg-ember`, `font-serif`, `font-sans`, `font-mono`, then nilai sesuai tabel art direction.
- AC-004: Given setiap pasangan teks dan latar yang diizinkan, when test kontras berjalan, then rasionya minimal 4,5:1 untuk teks normal dan 3:1 untuk teks besar.
- AC-005: Given halaman dimuat, when font web selesai dimuat, then CLS di Lighthouse di bawah 0,1.

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

Pemilik review dan commit T-002, set T-002 `done`, lalu `/sdd:task T-003` (hub GSAP, Lenis, state intro, boot script): `src/lib/motion/gsap.ts`, `src/lib/motion/intro-state.ts` + test, `src/components/motion/smooth-scroll.tsx`, `src/app/layout.tsx`, `src/app/globals.css`. Verifikasi: `npm test && npm run lint && npm run typecheck && npm run build`, lalu Browser pane dengan emulasi reduced motion.

## Other open tasks
- T-003 — Hub GSAP, Lenis, state intro, dan boot script (`planned`)
- T-004 — Primitive reveal teks (`planned`)
- T-005 — Integrasi dan verifikasi fondasi (`planned`)

## Features
| Feature | Status | Phase | Done/Total |
|---|---|---|---|
| F-001 Fondasi dan motion core | implementing | in_progress | 1/5 |
