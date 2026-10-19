<!-- GENERATED FILE — DO NOT EDIT. Rendered by `npm run context:render`.
Source: sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.
source_hash: 2d7e7177532608ee427ca94f09a03d9cc494ee77424dc85b5d955a41b8b6e96e -->

# Brief

BookMate Web adalah situs pemasaran untuk aplikasi BookMate yang mengajak pembaca Indonesia bergabung ke klub baca komunitas lewat pengalaman scroll yang sinematik, lalu mengunduh aplikasinya dari Google Play.

Project `BookMate Web`, tier `lite`. Rendered from sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.

## Active
Feature F-012 — Redesign Marginalia: satu hari pembaca (`verification`, docs/specs/F-012-marginalia/)
Task T-005 — Navigasi, audit visual, checks (`done`); requirements: FR-005; depends on: T-002, T-003, T-004

Acceptance: AC-009, AC-010.

Acceptance criteria:
- AC-009: Given chapters baru, when tautan menu diklik, then section tujuan tiba di bawah header dan indikator menampilkan bab itu.
- AC-010: Given 1440 dan 375 px, then tidak ada overflow horizontal, tidak ada error console, dan lint, typecheck, test, build lulus.

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
Active handoff without an "Exact next step" section.

## Other open tasks
None.

## Features
| Feature | Status | Phase | Done/Total |
|---|---|---|---|
| F-001 Fondasi dan motion core | implementing | in_progress | 4/5 |
| F-002 Shell global: sampul, header, slice transition, menu, cursor, footer | verification | complete | 9/9 |
| F-003 Prolog (hero) | verification | complete | 2/2 |
| F-004 Manifesto dan buka aplikasi | verification | complete | 2/2 |
| F-005 Bab horizontal | verification | complete | 2/2 |
| F-006 Streak dan kartu pembaca | verification | complete | 2/2 |
| F-007 Diskusi, cara mulai, FAQ, dan epilog | verification | complete | 2/2 |
| F-008 SEO dan halaman legal | implementing | blocked | 1/4 |
| F-009 WebGL hover distortion (opsional) | draft | complete | 0/1 |
| F-010 QA dan rilis | implementing | blocked | 2/3 |
| F-011 Screenshot sementara dan perbaikan bug animasi | verification | complete | 3/3 |
| F-012 Redesign Marginalia: satu hari pembaca | verification | complete | 6/6 |
| F-013 Revamp gaya Aardvark | approved | not_started | 0/2 |
