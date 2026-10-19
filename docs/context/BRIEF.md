<!-- GENERATED FILE — DO NOT EDIT. Rendered by `npm run context:render`.
Source: sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.
source_hash: 23573e7288dd4173bf1c5562dd4165dd239ab232c1e4ae2169472e61bbdd94e2 -->

# Brief

BookMate Web adalah situs pemasaran untuk aplikasi BookMate yang mengajak pembaca Indonesia bergabung ke klub baca komunitas lewat pengalaman scroll yang sinematik, lalu mengunduh aplikasinya dari Google Play.

Project `BookMate Web`, tier `lite`. Rendered from sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.

## Active
Feature F-002 — Shell global: sampul, header, slice transition, menu, cursor, footer (`implementing`, docs/specs/F-002-shell-global/)
Task T-005 — Slice transition, fokus, dan hash (`done`); requirements: FR-003; depends on: T-001, T-002

`slice-transition.tsx` dengan `navigateTo(id)`, delegasi klik tautan internal, `focusSection`, `history.pushState`. Acceptance: AC-009 sampai AC-011.

Hasil: aturan klik mana yang dicegat ada di `src/lib/motion/in-page-link.ts` + test (modifier, tombol tengah, `data-slice="off"`, `#` kosong, halaman lain tetap native). `navigateTo(id, { onCovered })` disiapkan untuk menu T-006. Pengaman `setTimeout` 3 detik mendaratkan pengunjung bila ticker macet. Catatan verifikasi: Lenis 1.3 sudah menghormati `scroll-margin-top`, jadi offset manual yang sempat ditambahkan ke `jumpToTarget` dicabut lagi karena membuat jarak ganda (144 px).

Acceptance criteria:
- AC-009: Given motion diizinkan, when pengguna mengaktifkan tautan ke `#id` sebuah section, then 5 irisan vertikal menutup layar berurutan, label bab tujuan terlihat, halaman melompat ke target saat tertutup, lalu irisan membuka.
- AC-011: Given transisi sedang berjalan, when tautan lain diaktifkan, then klik kedua diabaikan sampai transisi selesai.

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

Pemilik commit T-005 dan set `done`. Lalu T-006: `src/components/site/menu.tsx` (tombol "Menu" di bawah 768 px, panel curtain, kunci `menu`, focus trap, Esc, tutup saat lebar ≥ 768 px, pilih tautan memanggil `navigateTo(id, { onCovered: close })`), copy menu di `src/content/shell.ts`. Ini juga menguji AC-020 end-to-end (menu lalu slice).

## Other open tasks
- T-006 — Menu mobile (`review`)
- T-007 — Custom cursor dan magnetic (`planned`)
- T-008 — Footer reveal (`planned`)
- T-009 — Integrasi dan verifikasi shell (`planned`)

## Features
| Feature | Status | Phase | Done/Total |
|---|---|---|---|
| F-001 Fondasi dan motion core | implementing | in_progress | 4/5 |
| F-002 Shell global: sampul, header, slice transition, menu, cursor, footer | implementing | in_progress | 5/9 |
