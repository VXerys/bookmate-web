---
id: F-001
title: "Fondasi dan motion core"
type: verification
status: implementing
tier: full
owner: "M Sechan Alfarisi"
created: 2026-10-16
last_updated: 2026-10-16
last_verified: 2026-10-16
requirements: [FR-001, FR-002, FR-003, FR-004, FR-005, FR-006]
supersedes: null
---

# Verification: Fondasi dan motion core

## Evidence

### EV-001 — Clean install, lint, dan typecheck
- command: `npm ci && npm run lint && npm run typecheck`
- output:
  ```text
  eslint: no findings; ✓ Types generated successfully; tsc clean
  ```
- date: 2026-10-16
- commit: fa6aab4
- covers: [AC-001]

### EV-002 — Test konten merek
- command: `npm test`
- output:
  ```text
  ✔ Play Store link targets the production package id; ✔ brand copy is filled in; pass 2, fail 0
  ```
- date: 2026-10-16
- commit: fa6aab4
- covers: [AC-001, AC-002]

### EV-003 — Build produksi
- command: `npm run build`
- output:
  ```text
  ✓ Compiled successfully; ✓ Generating static pages (3/3); ○ / and ○ /_not-found static
  ```
- date: 2026-10-16
- commit: fa6aab4
- covers: [AC-001]

### EV-004 — Token, palet, dan kontras (T-002)
- command: `npm test && npm run lint && npm run typecheck && npm run build`
- output:
  ```text
  ✔ allowed text pairs meet WCAG AA; ✔ @theme matches palette; tests 10 pass 0 fail; eslint clean; tsc clean; build 3/3
  ```
- date: 2026-10-16
- commit: 879854e
- covers: [AC-001, AC-003, AC-004]

### EV-005 — Computed style dan CLS di browser (T-002)
- command: `Browser pane: getComputedStyle on next dev; PerformanceObserver layout-shift on next start (375 and 1440 px)`
- output:
  ```text
  9 tokens on :root, no default palette; h1 Newsreader (em italic), body Inter, .label JetBrains Mono; CTA ember/ink; CLS 0 at 375 and 1440 px
  ```
- date: 2026-10-16
- commit: 879854e
- covers: [AC-003, AC-005]

### EV-006 — Unit test state intro dan boot script, toolchain (T-003)
- command: `npm test && npm run lint && npm run typecheck && npm run build`
- output:
  ```text
  ✔ marks JavaScript as present and takes over scroll restoration before paint
  ✔ keeps html.js when the intro reported done in time
  ✔ removes html.js when the intro never reported done, so content shows
  ✔ listeners registered before the intro run once when it finishes (+3 intro-state tests)
  tests 17, pass 17, fail 0; eslint no findings; tsc clean; build static 3/3
  grep "__bookmateMotion" .next/static -> none (dev handle not in production bundle)
  ```
- date: 2026-10-16
- commit: uncommitted on feat/F-001-fondasi-motion-core (base 879854e)
- covers: [AC-001, AC-010]

### EV-007 — Lenis, sinkron ScrollTrigger, dan kunci scroll di browser (T-003)
- command: `Browser pane on next dev via window.__bookmateMotion; trusted wheel and keys from the computer tool`
- output:
  ```text
  html classes: js lenis; data-intro=done; scrollRestoration=manual; scrollbar-gutter=stable
  lenis.scrollTo(400): 45 ScrollTrigger onUpdate calls; trigger progress 0.774 = scrollY/maxScroll 0.774
  real wheel x3: 48 interpolated frames from 28 to 300 px (smooth, not a jump)
  locked: wheel x5 + PageDown + space -> scrollY 0; body width 306.67 -> 306.67 (no reflow)
  unlocked: PageDown -> 517, wheel x3 -> 300
  ```
- date: 2026-10-16
- commit: uncommitted on feat/F-001-fondasi-motion-core (base 879854e)
- covers: [AC-006, AC-008]

### EV-008 — Konten tanpa JavaScript (T-003)
- command: `curl -s http://localhost:3101/ (next start) and grep the built CSS for hiding rules`
- output:
  ```text
  SSR <html lang="id"> carries no js class; headline, tagline, CTA, description, Bab 01 copy all present
  hiding rules in CSS: only Tailwind preflight [hidden] and the .hidden utility; none tied to page content
  ```
- date: 2026-10-16
- commit: uncommitted on feat/F-001-fondasi-motion-core (base 879854e)
- covers: [AC-009]

## Coverage

| Criterion | Evidence | Result |
|---|---|---|
| AC-001 | EV-001, EV-002, EV-003, EV-004 | pass |
| AC-002 | EV-002 | pass |
| AC-003, AC-004 | EV-004, EV-005 | pass |
| AC-005 | EV-005 | pass (PerformanceObserver di localhost, bukan Lighthouse) |
| AC-006, AC-008 | EV-007 | pass |
| AC-007 | none | not_run (lihat di bawah) |
| AC-009 | EV-008 | pass |
| AC-010 | EV-006 | pass (unit test atas string boot script yang dikirim) |
| AC-011 to AC-013 | none | not_run (T-004) |
| AC-014 | none | not_run (T-005, butuh PR pertama) |

## Not run

- AC-007: Browser pane tidak bisa mengemulasikan `prefers-reduced-motion`, dan mengubah pengaturan animasi Windows adalah perubahan sistem. Cek manual oleh pemilik: Chrome DevTools > Rendering > Emulate CSS media feature `prefers-reduced-motion: reduce`, muat ulang `/`, lalu pastikan `document.documentElement.classList.contains("lenis")` bernilai `false` dan scroll terasa native. Secara kode, `SmoothScroll` keluar sebelum `new Lenis` saat `MOTION_OK` tidak cocok.
- Lighthouse belum dijalankan; CLS diukur dengan PerformanceObserver tanpa throttling jaringan. Ulangi di F-010.
- Peringatan `allow-scripts` untuk `unrs-resolver` saat `npm ci`: cek di CI.
