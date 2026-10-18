<!-- GENERATED FILE — DO NOT EDIT. Rendered by `npm run context:render`.
Source: sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.
source_hash: f644f740bddf16720cdd75c1d31f3366899eaaf57d380ef3a690313d7ad66e84 -->

# Brief

BookMate Web adalah situs pemasaran untuk aplikasi BookMate yang mengajak pembaca Indonesia bergabung ke klub baca komunitas lewat pengalaman scroll yang sinematik, lalu mengunduh aplikasinya dari Google Play.

Project `BookMate Web`, tier `lite`. Rendered from sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.

## Active
Feature F-001 — Fondasi dan motion core (`implementing`, docs/specs/F-001-fondasi-motion-core/)
Task T-004 — Primitive reveal teks (`review`); requirements: FR-005; depends on: T-003

Scope: `src/components/motion/reveal.tsx` (mode `lines` dan `words`), dipakai di halaman uji. Acceptance: AC-011, AC-012, AC-013. Tidak men-split tautan atau markup inline bermakna.

Hasil: `src/lib/motion/reveal-strategy.ts` + test memilih nama aksesibel (heading lewat `aria-label`, selain heading lewat salinan `sr-only` yang dibuat saat split, bukan di HTML server); konten dengan tautan atau kontrol hanya di-fade. Split dibuat setelah `whenIntroDone` agar baris diukur dengan font final. CSS menyembunyikan `[data-reveal]` hanya di bawah `html.js` dan media `no-preference` sampai `data-reveal-ready`. Temuan ikut diperbaiki: React memperingatkan tag `<script>` boot di dev; diganti `src/components/site/inline-script.tsx` (pola dari guide Next 16 "preventing flash before hydration"). Handle dev kini juga mengekspos `gsap` untuk menggerakkan ticker saat pane tersembunyi. AC-013 menunggu cek manual pemilik bersama AC-007.

Acceptance criteria:
- AC-007: Given `prefers-reduced-motion: reduce`, when halaman dimuat, then Lenis tidak dibuat dan scroll native berjalan.
- AC-011: Given motion diizinkan, when judul masuk viewport, then baris muncul dari balik mask dengan stagger dan hanya sekali.
- AC-012: Given screen reader, when membaca judul yang di-split, then teks utuh dibacakan satu kali.
- AC-013: Given reduced motion, when judul masuk viewport, then teks langsung tampil tanpa animasi.

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

Pemilik cek AC-007 dan AC-013 di DevTools, lalu commit T-004 dan set `done` dengan hash. Setelah itu `/sdd:task T-005`: verifikasi integrasi di Browser pane yang terlihat (360, 768, 1440 px), lihat kelancaran reveal secara langsung, lalu push branch dan buka PR ke `main` untuk membuktikan AC-014 (push dan PR butuh izin pemilik).

## Other open tasks
- T-005 — Integrasi dan verifikasi fondasi (`planned`)

## Features
| Feature | Status | Phase | Done/Total |
|---|---|---|---|
| F-001 Fondasi dan motion core | implementing | in_progress | 3/5 |
