---
status: active
owner: M Sechan Alfarisi
session_date: 2026-10-19
branch: feat/F-002-shell-global
base_commit: dda1721
current_commit: uncommitted
feature_id: F-002
task_id: T-004
expires_after: 2026-11-18
---

# Session Handoff

Current coding session delta. It does not replace product docs, architecture, ADRs, feature specs, or `tasks.md`.

## Session objective

Commit T-002 dan T-003, lalu kerjakan T-004 (skip link, header, indikator bab).

## Context used

- `docs/specs/F-002-shell-global/{requirements,design,tasks}.md`, `src/content/navigation.ts`

## Completed

- T-002 dan T-003 di-commit `dda1721` dan `done`.
- T-004 `review`: `src/components/site/skip-link.tsx`, `src/components/site/header.tsx` (wordmark, tautan dari `navChapters`, CTA, indikator bab, sembunyi saat scroll turun, muncul saat fokus), `main#konten` dengan `tabIndex={-1}`, `scroll-margin-top` di section, copy di `src/content/shell.ts` + test.

## Requirement coverage

- AC-005, AC-006, AC-007: pass (EV-007).
- AC-008 dan AC-004: menunggu cek reduced motion pemilik.

## Changed files

| File | Change | State |
|---|---|---|
| `src/components/site/{skip-link,header}.tsx` | baru | Complete |
| `src/content/shell.ts`, `shell.test.ts` | copy header dan skip link | Complete |
| `src/app/{layout.tsx,globals.css}` | mount header dan skip link, `main` fokusable, scroll margin | Complete |
| `docs/specs/F-002-shell-global/{tasks,verification,design}.md` | status, EV-007 | Complete |

## Commands executed

```bash
npm test && npm run test:sdd && npm run lint && npm run typecheck && npm run build && npm run context:validate -- --strict
```

Result:

```text
tests 37 pass; SDD 34 pass; lint exit 0; typecheck exit 0; build exit 0; context validation passed strict
```

## Current implementation state

Header lengkap di 768 px ke atas. Di bawah 768 px tautan bab tersembunyi sampai menu mobile ada (T-006). Tautan header masih memakai lompatan native; slice transition datang di T-005.

## Uncommitted work

- T-004 dan pembaruan dokumen di branch `feat/F-002-shell-global`.

## Blockers

- Tidak ada untuk T-005. Cek reduced motion (AC-004, AC-008) dan kesan gerak menunggu pemilik.

## Decisions made during session

- Header memakai bar kertas semi-transparan, bukan `mix-blend-difference`, agar kontras teks terjamin di atas bab gelap.
- Indikator bab tidak diumumkan ke screen reader (`aria-hidden`); posisi bab untuk teknologi bantu datang dari `aria-current="location"` di nav dan landmark section.

## Context updates

- `useGSAP({ scope })` membatasi selector teks ke dalam elemen scope; elemen di luar komponen harus di-query lewat `document`.

## Exact next step

Pemilik commit T-004 dan set `done`. Lalu T-005: `src/components/motion/slice-transition.tsx` dengan `navigateTo(id)`, delegasi klik `a[href^="#"]` (kecuali `data-slice="off"`), fokus ke heading target, `history.pushState`, kunci `slice`. Verifikasi seperti biasa, lalu uji keyboard dan hash di Browser pane.

## Do not do next

- Jangan mencegat tautan skip (`data-slice="off"`) di slice transition.
- Jangan menjalankan `npm ci` atau `next build` saat server yang memakai `node_modules` atau `.next` hidup.

## Validity

Berlaku sampai 2026-11-18 atau sampai T-005 dimulai.
