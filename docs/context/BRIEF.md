<!-- GENERATED FILE — DO NOT EDIT. Rendered by `npm run context:render`.
Source: sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.
source_hash: 2feebab76df5e916e3f41649d3bf64090052e245cea27c5589344b1980c92368 -->

# Brief

BookMate Web adalah situs pemasaran untuk aplikasi BookMate yang mengajak pembaca Indonesia bergabung ke klub baca komunitas lewat pengalaman scroll yang sinematik, lalu mengunduh aplikasinya dari Google Play.

Project `BookMate Web`, tier `lite`. Rendered from sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.

## Active
Feature F-002 — Shell global: sampul, header, slice transition, menu, cursor, footer (`implementing`, docs/specs/F-002-shell-global/)
Task T-001 — Kunci scroll per pemilik (`review`); requirements: FR-001, FR-003, FR-004; depends on: none

`src/lib/motion/scroll-lock.ts` + test, `smooth-scroll.tsx` memakai `lockScroll(owner)` dan `unlockScroll(owner)`; handle dev ikut diperbarui. Acceptance: EC-001, diformalkan sebagai AC-020 agar bisa dilacak oleh evidence. Tidak mengubah perilaku Lenis lainnya.

Hasil: `ScrollLockOwner = "sampul" | "menu" | "slice"` mencegah salah ketik pemilik; listener hanya dipanggil saat transisi terkunci/terbuka, jadi Lenis tidak di-stop/start berulang. Dokumen yang menggambarkan keadaan sekarang ikut diperbarui (`docs/architecture/overview.md`, design dan arsitektur F-001).

Acceptance criteria:
- AC-020: Given dua overlay memegang kunci scroll (contoh menu lalu slice, EC-001), when overlay pertama selesai lebih dulu, then scroll tetap terkunci sampai pemegang terakhir melepas kuncinya.

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

Pemilik commit T-001 dan set `done` dengan hash. Lalu kerjakan T-002 (`src/content/navigation.ts` + test, section stub ber-id di `src/app/page.tsx`) dan T-003 (sampul + keputusan sesi di boot script). Verifikasi: `npm test && npm run lint && npm run typecheck && npm run build`, cek exit code satu per satu.

## Other open tasks
- T-002 — Model navigasi dan section stub (`planned`)
- T-003 — Sampul dan keputusan sesi di boot script (`planned`)
- T-004 — Skip link, header, dan indikator bab (`planned`)
- T-005 — Slice transition, fokus, dan hash (`planned`)
- T-006 — Menu mobile (`planned`)
- T-007 — Custom cursor dan magnetic (`planned`)
- T-008 — Footer reveal (`planned`)
- T-009 — Integrasi dan verifikasi shell (`planned`)

## Features
| Feature | Status | Phase | Done/Total |
|---|---|---|---|
| F-001 Fondasi dan motion core | implementing | in_progress | 4/5 |
| F-002 Shell global: sampul, header, slice transition, menu, cursor, footer | implementing | in_progress | 0/9 |
