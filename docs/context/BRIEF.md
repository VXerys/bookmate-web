<!-- GENERATED FILE — DO NOT EDIT. Rendered by `npm run context:render`.
Source: sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.
source_hash: 2adada7da28a43eb6bbefdf6963a5d4d82ac1454623f1bf9ddcc857838463e2a -->

# Brief

BookMate Web adalah situs pemasaran untuk aplikasi BookMate yang mengajak pembaca Indonesia bergabung ke klub baca komunitas lewat pengalaman scroll yang sinematik, lalu mengunduh aplikasinya dari Google Play.

Project `BookMate Web`, tier `lite`. Rendered from sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.

## Active
Feature F-001 — Fondasi dan motion core (`implementing`, docs/specs/F-001-fondasi-motion-core/)
Task T-001 — Scaffold Next.js, toolchain, CI, dan sumber fakta merek (`review`); requirements: FR-001, FR-006; depends on: none

Scope: `package.json` (stack sama dengan `sechan-portfolio`, `"type": "module"`), `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `.gitignore`, `src/app/{layout,page}.tsx`, `src/app/globals.css` minimal, `src/content/site.ts` + test, `.github/workflows/context-integrity.yml`. Dependency `gsap`, `@gsap/react`, `lenis` disetujui pemilik (2026-10-16). Acceptance: AC-001, AC-002, AC-014 (AC-014 baru terbukti di PR pertama). Menunggu commit pertama dan review pemilik.

Acceptance criteria:
- AC-001: Given checkout bersih, when `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` dijalankan, then semuanya keluar dengan kode 0.
- AC-002: Given `src/content/site.ts`, when test konten berjalan, then tautan Google Play memakai package id produksi dan semua field merek terisi.
- AC-014: Given pull request ke `main`, when CI berjalan, then lint, typecheck, test konten, test SDD, build, dan `context:validate --strict` dijalankan dan gagal jika salah satu gagal.

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

Pemilik review art direction dan roadmap, lalu commit awal. Setelah itu set T-001 ke `done` dengan hash commit di EV-001 sampai EV-003, dan jalankan `/sdd:task T-002` (token, font, gaya dasar: `src/content/palette.ts`, `src/lib/color/contrast.ts`, `src/app/globals.css`, `src/app/layout.tsx`). Verifikasi: `npm run lint && npm run typecheck && npm test && npm run build`.

## Other open tasks
- T-002 — Token desain, font, dan gaya dasar (`planned`)
- T-003 — Hub GSAP, Lenis, state intro, dan boot script (`planned`)
- T-004 — Primitive reveal teks (`planned`)
- T-005 — Integrasi dan verifikasi fondasi (`planned`)

## Features
| Feature | Status | Phase | Done/Total |
|---|---|---|---|
| F-001 Fondasi dan motion core | implementing | in_progress | 0/5 |
