<!-- GENERATED FILE — DO NOT EDIT. Rendered by `npm run context:render`.
Source: sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.
source_hash: 5c7c9acd67d6741343fe1a3b4a99ac72c0fe8136838cd19b86d4297db6c8a94d -->

# Brief

BookMate Web adalah situs pemasaran untuk aplikasi BookMate yang mengajak pembaca Indonesia bergabung ke klub baca komunitas lewat pengalaman scroll yang sinematik, lalu mengunduh aplikasinya dari Google Play.

Project `BookMate Web`, tier `lite`. Rendered from sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.

## Active
Feature F-002 — Shell global: sampul, header, slice transition, menu, cursor, footer (`approved`, docs/specs/F-002-shell-global/)
Task T-001 — Kunci scroll per pemilik (`planned`); requirements: FR-001, FR-003, FR-004; depends on: none

`src/lib/motion/scroll-lock.ts` + test, `smooth-scroll.tsx` memakai `lockScroll(owner)` dan `unlockScroll(owner)`; handle dev ikut diperbarui. Acceptance: EC-001. Tidak mengubah perilaku Lenis lainnya.

Acceptance criteria:
- AC-001: Given kunjungan pertama di tab dengan motion diizinkan, when halaman dimuat, then sampul terlihat sejak paint pertama, scroll terkunci, dan counter naik sampai 100.
- AC-002: Given sampul berjalan, when font dan event `load` selesai, then sampul terbuka paling cepat 2,0 detik dan paling lambat 4,5 detik sejak boot, lalu `completeIntro()` dipanggil sekali dan scroll dilepas.
- AC-003: Given sampul sudah diputar di tab ini, when halaman dimuat ulang, then sampul tidak muncul sama sekali, termasuk tidak berkedip di paint pertama.
- AC-004: Given reduced motion atau JavaScript mati, when halaman dimuat, then tidak ada overlay sampul dan konten langsung terlihat.
- AC-009: Given motion diizinkan, when pengguna mengaktifkan tautan ke `#id` sebuah section, then 5 irisan vertikal menutup layar berurutan, label bab tujuan terlihat, halaman melompat ke target saat tertutup, lalu irisan membuka.
- AC-010: Given transisi selesai atau reduced motion, when target tercapai, then fokus pindah ke heading section target dan URL hash berubah ke `#id` tanpa memicu lompatan kedua dari browser.
- AC-011: Given transisi sedang berjalan, when tautan lain diaktifkan, then klik kedua diabaikan sampai transisi selesai.
- AC-012: Given lebar di bawah 768 px, when tombol "Menu" diaktifkan, then panel layar penuh terbuka dengan curtain wipe, `aria-expanded="true"`, scroll terkunci, dan fokus berpindah ke tautan pertama.
- AC-013: Given menu terbuka, when pengguna menekan Tab di tautan terakhir, then fokus kembali ke tombol tutup; when Esc ditekan atau tautan dipilih, then menu tertutup, scroll dilepas, dan fokus kembali ke tombol "Menu" (kecuali fokus dipindah ke target oleh slice transition).

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

Setelah pemilik menyetujui spec F-002: set status spec F-002 ke `approved` lalu `implementing`, commit spec, dan kerjakan T-001 (`src/lib/motion/scroll-lock.ts` + test, `smooth-scroll.tsx`). Verifikasi: `npm test && npm run lint && npm run typecheck && npm run build`.

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
| F-002 Shell global: sampul, header, slice transition, menu, cursor, footer | approved | not_started | 0/9 |
