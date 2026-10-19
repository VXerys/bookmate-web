<!-- GENERATED FILE — DO NOT EDIT. Rendered by `npm run context:render`.
Source: sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.
source_hash: a997e4b8f6650c6e36d776413359f83f1c403b82fd73e0763bd2a3a2b51ac5f0 -->

# Brief

BookMate Web adalah situs pemasaran untuk aplikasi BookMate yang mengajak pembaca Indonesia bergabung ke klub baca komunitas lewat pengalaman scroll yang sinematik, lalu mengunduh aplikasinya dari Google Play.

Project `BookMate Web`, tier `lite`. Rendered from sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.

## Active
Feature F-002 — Shell global: sampul, header, slice transition, menu, cursor, footer (`implementing`, docs/specs/F-002-shell-global/)
Task T-004 — Skip link, header, dan indikator bab (`review`); requirements: FR-002; depends on: T-002

`skip-link.tsx`, `header.tsx`, `<main id="konten">` di layout. Acceptance: AC-005 sampai AC-008.

Hasil: `main` diberi `tabIndex={-1}` agar skip link memindahkan fokus, bukan hanya posisi scroll; section diberi `scroll-margin-top` agar tidak tertutup header. Header memakai bar `bg-paper/90` (kontras teks terjamin di atas bab gelap), indikator berjalan juga di reduced motion, dan header muncul kembali saat ada fokus di dalamnya. Temuan saat verifikasi yang ikut diperbaiki: scope `useGSAP` membuat selector section kosong (indikator diam); `not-sr-only` Tailwind me-reset padding skip link; target nav di bawah 44 px. AC-008 menunggu cek reduced motion pemilik.

Acceptance criteria:
- AC-005: Given halaman dimuat, when pengguna menekan Tab pertama kali, then tautan "Lewati ke konten" muncul dan memindahkan fokus ke `<main>`.
- AC-008: Given reduced motion, when pengguna scroll, then header tetap terlihat tanpa animasi.

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

Pemilik commit T-004 dan set `done`. Lalu T-005: `src/components/motion/slice-transition.tsx` dengan `navigateTo(id)`, delegasi klik `a[href^="#"]` (kecuali `data-slice="off"`), fokus ke heading target, `history.pushState`, kunci `slice`. Verifikasi seperti biasa, lalu uji keyboard dan hash di Browser pane.

## Other open tasks
- T-005 — Slice transition, fokus, dan hash (`planned`)
- T-006 — Menu mobile (`planned`)
- T-007 — Custom cursor dan magnetic (`planned`)
- T-008 — Footer reveal (`planned`)
- T-009 — Integrasi dan verifikasi shell (`planned`)

## Features
| Feature | Status | Phase | Done/Total |
|---|---|---|---|
| F-001 Fondasi dan motion core | implementing | in_progress | 4/5 |
| F-002 Shell global: sampul, header, slice transition, menu, cursor, footer | implementing | in_progress | 3/9 |
