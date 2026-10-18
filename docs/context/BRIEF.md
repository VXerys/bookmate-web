<!-- GENERATED FILE — DO NOT EDIT. Rendered by `npm run context:render`.
Source: sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.
source_hash: a681eb625f753c6249024f0c1d8c3b3f8e85f35a2edc19f6aecff14f44629e1a -->

# Brief

BookMate Web adalah situs pemasaran untuk aplikasi BookMate yang mengajak pembaca Indonesia bergabung ke klub baca komunitas lewat pengalaman scroll yang sinematik, lalu mengunduh aplikasinya dari Google Play.

Project `BookMate Web`, tier `lite`. Rendered from sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.

## Active
Feature F-001 — Fondasi dan motion core (`implementing`, docs/specs/F-001-fondasi-motion-core/)
Task T-005 — Integrasi dan verifikasi fondasi (`review`); requirements: FR-001, FR-002, FR-003, FR-004, FR-005, FR-006; depends on: T-004

Halaman uji fondasi di `/` memakai token, font, Lenis, dan reveal. Verifikasi di Browser pane pada 360, 768, 1440 px, emulasi reduced motion, dan JavaScript dimatikan; CLS. AC-014: CI hijau di PR `feat/F-001-fondasi-motion-core` ke `main` (push butuh izin pemilik). Semua EV dicatat, handoff diperbarui.

Progres 2026-10-18: clean install, semua cek, layout di tiga lebar, dan baseline bundle tercatat di EV-011. Repo private `VXerys/bookmate-web` dibuat dan [PR #1](https://github.com/VXerys/bookmate-web/pull/1) dibuka atas izin pemilik; CI hijau (EV-012, AC-014). Status `review`: semua cek yang bisa dijalankan agent sudah tercatat. Yang tersisa adalah cek manual pemilik, yaitu reduced motion (AC-007, AC-013) dan kesan gerak Lenis/Reveal serta CLS di browser yang terlihat; langkahnya ada di `verification.md`.

Acceptance criteria:
- AC-007: Given `prefers-reduced-motion: reduce`, when halaman dimuat, then Lenis tidak dibuat dan scroll native berjalan.
- AC-013: Given reduced motion, when judul masuk viewport, then teks langsung tampil tanpa animasi.
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

Pemilik membuka `http://localhost:3101/` di Chrome: nilai reveal dan scroll Lenis di 1440 px dan mode ponsel, lalu emulasikan `prefers-reduced-motion: reduce` untuk AC-007 dan AC-013. Jika lolos, set T-005 `done`, F-001 `implemented`, merge PR #1 (atas keputusan pemilik), lalu mulai F-002 (shell global) dengan membuat `docs/specs/F-002-shell-global/`.

## Other open tasks
None.

## Features
| Feature | Status | Phase | Done/Total |
|---|---|---|---|
| F-001 Fondasi dan motion core | implementing | in_progress | 4/5 |
