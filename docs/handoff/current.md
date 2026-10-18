---
status: active
owner: M Sechan Alfarisi
session_date: 2026-10-16
branch: feat/F-001-fondasi-motion-core
base_commit: 242a2ba
current_commit: uncommitted
feature_id: F-001
task_id: T-004
expires_after: 2026-11-15
---

# Session Handoff

Current coding session delta. It does not replace product docs, architecture, ADRs, feature specs, or `tasks.md`.

## Session objective

Commit T-003 dan tandai selesai, lalu kerjakan T-004: primitive reveal teks.

## Context used

- `docs/specs/F-001-fondasi-motion-core/{requirements,design,system-architecture,tasks}.md`
- `sechan-portfolio-marquee/src/components/motion/reveal.tsx` (pola), `node_modules/gsap/SplitText.js` (perilaku opsi `aria`)
- `node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md` (pola `InlineScript`)

## Completed

- T-003 di-commit `242a2ba` dan `done`. AC-007 tetap menunggu cek manual pemilik.
- T-004 `review`: `src/components/motion/reveal.tsx`, `src/lib/motion/reveal-strategy.ts` + test, aturan CSS `[data-reveal]`, `Reveal` dipakai di halaman uji untuk h1 dan dua paragraf.
- Perbaikan yang ditemukan saat verifikasi: boot script lewat `src/components/site/inline-script.tsx` agar React tidak memperingatkan tag `<script>`; handle dev ditambah `gsap`.

## Requirement coverage

- AC-011: pass untuk logika tween dan trigger (ticker digerakkan manual). Kelancaran visual belum dilihat langsung.
- AC-012: pass lewat cek DOM yang melewati `aria-hidden`; screen reader nyata belum.
- AC-007, AC-013: menunggu cek manual DevTools (langkah di `verification.md`). AC-014: T-005.

## Changed files

| File | Change | State |
|---|---|---|
| `src/components/motion/reveal.tsx` | reveal words dan lines | Complete |
| `src/lib/motion/reveal-strategy.ts`, `.test.ts` | aturan nama aksesibel | Complete |
| `src/components/site/inline-script.tsx`, `src/app/layout.tsx` | boot script tanpa peringatan | Complete |
| `src/app/globals.css`, `src/app/page.tsx` | aturan `[data-reveal]`, pemakaian di halaman uji | Complete |
| `src/components/motion/smooth-scroll.tsx` | handle dev ditambah `gsap` | Complete |
| `docs/specs/F-001-fondasi-motion-core/*` | evidence dan status T-004 | Complete |

## Commands executed

```bash
npm test && npm run test:sdd && npm run lint && npm run typecheck && npm run build && npm run context:validate -- --strict
```

Result:

```text
tests 20 pass 0 fail; SDD 34 pass; eslint clean; tsc clean; build static 3/3; dev handle absent from .next/static
prerendered HTML: no sr-only copies; boot script emitted as text/javascript
```

## Current implementation state

Halaman uji fondasi memakai token, font, Lenis, dan Reveal. Belum ada sampul, header, atau cursor (F-002).

## Uncommitted work

- Semua perubahan T-004 di branch `feat/F-001-fondasi-motion-core`.

## Blockers

- Tidak ada. AC-007 dan AC-013 menunggu cek manual dan tidak memblokir T-005.

## Decisions made during session

- Heading memakai `aria-label` dari SplitText; selain heading memakai salinan `sr-only` yang dibuat saat split, karena `aria-label` pada `<p>` tidak dibacakan secara konsisten.
- Konten berisi tautan atau kontrol tidak di-split, hanya di-fade.
- Split dibuat setelah intro selesai agar baris diukur dengan font final.

## Context updates

- Saat sesi tidak terbuka di jendela, Browser pane tersembunyi dan `requestAnimationFrame` berhenti. Gerakkan `window.__bookmateMotion.gsap.ticker.tick()` secara manual untuk menguji logika animasi; jangan pakai angka timing dari kondisi ini.
- Tool `read_page` tidak menghormati `aria-hidden`; cek nama aksesibel lewat DOM.
- Dev server Turbopack kadang menyajikan CSS lama setelah `globals.css` berubah; `rm -rf .next` lalu restart.

## Exact next step

Pemilik cek AC-007 dan AC-013 di DevTools, lalu commit T-004 dan set `done` dengan hash. Setelah itu `/sdd:task T-005`: verifikasi integrasi di Browser pane yang terlihat (360, 768, 1440 px), lihat kelancaran reveal secara langsung, lalu push branch dan buka PR ke `main` untuk membuktikan AC-014 (push dan PR butuh izin pemilik).

## Do not do next

- Jangan membungkus tautan atau tombol dengan `Reveal` mode split; komponen akan jatuh ke fade.
- Jangan menyembunyikan konten di CSS tanpa awalan `html.js` dan media `prefers-reduced-motion: no-preference`.

## Validity

Berlaku sampai 2026-11-15 atau sampai T-005 dimulai.
