<!-- GENERATED FILE — DO NOT EDIT. Rendered by `npm run context:render`.
Source: sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.
source_hash: 84c8f5e0a97fe3a89b96c8f2f44280b6fc727b35cd96369f8ed3926fc0872f19 -->

# Brief

BookMate Web adalah situs pemasaran untuk aplikasi BookMate yang mengajak pembaca Indonesia bergabung ke klub baca komunitas lewat pengalaman scroll yang sinematik, lalu mengunduh aplikasinya dari Google Play.

Project `BookMate Web`, tier `lite`. Rendered from sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.

## Active
Feature F-002 — Shell global: sampul, header, slice transition, menu, cursor, footer (`implementing`, docs/specs/F-002-shell-global/)
Task T-003 — Sampul dan keputusan sesi di boot script (`review`); requirements: FR-001; depends on: T-001

`boot-script.ts` + test (data-sampul, sessionStorage melempar), `src/components/motion/sampul.tsx` menggantikan `intro-gate.tsx`, CSS tampil sampul. Acceptance: AC-001 sampai AC-004, EC-002, EC-003, EC-004.

Hasil: `completeIntro()` pindah ke `sampul.tsx` dan `intro-gate.tsx` dihapus. Jendela waktu ada di `src/lib/motion/sampul-timing.ts` + test; karena sampul butuh 0,8 detik (counter ke 100, judul keluar) sebelum terbelah, penantian "halaman siap" berakhir 0,8 detik lebih awal, sehingga sampul mulai terbuka di 2,0 sampai 4,5 detik dan intro selesai sebelum fallback boot 6 detik. Copy shell di `src/content/shell.ts`. Kesan gerak dan reduced motion menunggu cek pemilik.

Acceptance criteria:
- AC-001: Given kunjungan pertama di tab dengan motion diizinkan, when halaman dimuat, then sampul terlihat sejak paint pertama, scroll terkunci, dan counter naik sampai 100.
- AC-004: Given reduced motion atau JavaScript mati, when halaman dimuat, then tidak ada overlay sampul dan konten langsung terlihat.

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

Pemilik commit T-002 dan T-003, set keduanya `done` dengan hash. Lalu T-004: `src/components/site/skip-link.tsx`, `src/components/site/header.tsx` (wordmark, tautan dari `navChapters`, CTA, indikator bab, sembunyi saat scroll turun), copy di `src/content/shell.ts`. Verifikasi: `npm test && npm run lint && npm run typecheck && npm run build`, cek exit code satu per satu, lalu uji keyboard di Browser pane.

## Other open tasks
- T-002 — Model navigasi dan section stub (`review`)
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
| F-002 Shell global: sampul, header, slice transition, menu, cursor, footer | implementing | in_progress | 1/9 |
