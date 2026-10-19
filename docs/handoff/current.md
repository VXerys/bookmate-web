---
status: active
owner: M Sechan Alfarisi
session_date: 2026-10-19
branch: feat/F-002-shell-global
base_commit: 694c5aa
current_commit: uncommitted
feature_id: F-002
task_id: T-003
expires_after: 2026-11-18
---

# Session Handoff

Current coding session delta. It does not replace product docs, architecture, ADRs, feature specs, or `tasks.md`.

## Session objective

Commit T-001, lalu kerjakan T-002 (model navigasi dan section stub) dan T-003 (sampul dan keputusan sesi di boot script).

## Context used

- `docs/specs/F-002-shell-global/{requirements,system-architecture,design,tasks}.md`, `docs/product/art-direction.md`
- `sechan-portfolio-marquee/src/components/motion/intro.tsx` (pola timing dan cleanup)

## Completed

- T-001 di-commit `694c5aa` dan `done`.
- T-002 `review`: `src/content/navigation.ts` + test (10 bab, 5 tautan header), section stub di `src/app/page.tsx`, `<main id="konten">` di layout. BR-001 diformalkan sebagai AC-021.
- T-003 `review`: boot script menulis `data-sampul` (play atau skip) dari `sessionStorage`, `src/lib/motion/sampul-timing.ts` + test, `src/components/motion/sampul.tsx` (sampul dua belahan, counter, pengaman `setTimeout`, hash setelah intro), `src/content/shell.ts`, CSS penampil sampul; `intro-gate.tsx` dihapus.

## Requirement coverage

- AC-001, AC-002, AC-003, AC-021: pass (EV-003 sampai EV-006); AC-002 dengan catatan, karena halaman dev sudah lewat jendela waktu saat diukur.
- AC-004: pass untuk tanpa JS lewat aturan CSS; reduced motion menunggu cek pemilik.
- AC-020: pass juga untuk kunci sampul.

## Changed files

| File | Change | State |
|---|---|---|
| `src/content/{navigation,shell}.ts`, `navigation.test.ts` | model bab dan copy shell | Complete |
| `src/lib/motion/{boot-script,sampul-timing}.ts` + test | data-sampul, jendela waktu | Complete |
| `src/components/motion/sampul.tsx` (baru), `intro-gate.tsx` (dihapus) | sampul | Complete |
| `src/app/{layout.tsx,page.tsx,globals.css}` | mount sampul, `main#konten`, section stub, CSS sampul | Complete |
| `docs/specs/F-002-shell-global/*`, `docs/specs/F-001-fondasi-motion-core/{design,system-architecture}.md` | AC-021, evidence, catatan penggantian IntroGate | Complete |

## Commands executed

```bash
npm test && npm run test:sdd && npm run lint && npm run typecheck && npm run build && npm run context:validate -- --strict
```

Result:

```text
tests 36 pass; SDD 34 pass; lint exit 0; typecheck exit 0; build exit 0; dev handle absent from .next/static
Context validation passed: 0 error(s), 0 warning(s); 66 Markdown files, 2 feature(s), strict.
```

## Current implementation state

Kunjungan pertama di tab baru menampilkan sampul; muat ulang di tab yang sama langsung ke konten. Belum ada header, menu, slice, cursor, atau footer.

## Uncommitted work

- T-002, T-003, dan pembaruan dokumen di branch `feat/F-002-shell-global`.

## Blockers

- Tidak ada untuk lanjut ke T-004. Kesan gerak sampul dan reduced motion menunggu cek pemilik; F-001 T-005 juga masih menunggu cek manual.

## Decisions made during session

- Jendela tunggu sampul digeser 0,8 detik lebih awal agar sampul mulai terbuka dalam 2,0 sampai 4,5 detik dan intro selesai sebelum fallback boot 6 detik (dites di `sampul-timing.test.ts`).
- `<main id="konten">` dipindah ke layout lebih awal dari T-004 agar tidak ada task tanpa landmark `main`.

## Context updates

- Dev server `bookmate-web` (port 3100) berjalan. Untuk menguji sampul lagi: `sessionStorage.clear()`, lalu `navigate` (bukan ganti hash) dalam satu batch, lalu gerakkan `window.__bookmateMotion.gsap.ticker.tick()` bila pane tersembunyi.

## Exact next step

Pemilik commit T-002 dan T-003, set keduanya `done` dengan hash. Lalu T-004: `src/components/site/skip-link.tsx`, `src/components/site/header.tsx` (wordmark, tautan dari `navChapters`, CTA, indikator bab, sembunyi saat scroll turun), copy di `src/content/shell.ts`. Verifikasi: `npm test && npm run lint && npm run typecheck && npm run build`, cek exit code satu per satu, lalu uji keyboard di Browser pane.

## Do not do next

- Jangan memanggil `completeIntro()` selain dari `sampul.tsx`.
- Jangan menjalankan `npm ci` atau `next build` saat server yang memakai `node_modules` atau `.next` hidup.

## Validity

Berlaku sampai 2026-11-18 atau sampai T-004 dimulai.
