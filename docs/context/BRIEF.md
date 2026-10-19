<!-- GENERATED FILE — DO NOT EDIT. Rendered by `npm run context:render`.
Source: sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.
source_hash: da45f2842cad20a2f5d0f1709e2e20c228db58323f9b4c2339edc13aa80d27ee -->

# Brief

BookMate Web adalah situs pemasaran untuk aplikasi BookMate yang mengajak pembaca Indonesia bergabung ke klub baca komunitas lewat pengalaman scroll yang sinematik, lalu mengunduh aplikasinya dari Google Play.

Project `BookMate Web`, tier `lite`. Rendered from sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.

## Active
Feature F-010 — QA dan rilis (`implementing`, docs/specs/F-010-qa-rilis/)
Task T-003 — Deploy produksi (`blocked`); requirements: FR-003; depends on: none

Diblokir A-004 dan persetujuan deploy pemilik. Acceptance: AC-004.

Acceptance criteria:
- AC-004: Given persetujuan pemilik dan domain (A-004), when deploy produksi, then situs dapat diakses di domain dan Lighthouse mobile memenuhi target PRD.

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

Pemilik: cek reduced motion dan kesan gerak di `next start`, jawab A-001 sampai A-007, lalu putuskan push branch bertumpuk dan PR. Setelah A-002 tersedia: ganti slot `PhoneFrame` dengan screenshot asli lewat `next/image` dan catat di `public/CREDITS.md`.

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
