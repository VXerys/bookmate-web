---
id: F-001
title: "Fondasi dan motion core"
type: verification
status: implementing
tier: lite
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
- commit: uncommitted on feat/F-001-fondasi-motion-core (base fa6aab4)
- covers: [AC-001, AC-003, AC-004]

### EV-005 — Computed style dan CLS di browser (T-002)
- command: `Browser pane: getComputedStyle on next dev; PerformanceObserver layout-shift on next start (375 and 1440 px)`
- output:
  ```text
  9 tokens on :root, no default palette; h1 Newsreader (em italic), body Inter, .label JetBrains Mono; CTA ember/ink; CLS 0 at 375 and 1440 px
  ```
- date: 2026-10-16
- commit: uncommitted on feat/F-001-fondasi-motion-core (base fa6aab4)
- covers: [AC-003, AC-005]

## Coverage

| Criterion | Evidence | Result |
|---|---|---|
| AC-001 | EV-001, EV-002, EV-003, EV-004 | pass |
| AC-002 | EV-002 | pass |
| AC-003, AC-004 | EV-004, EV-005 | pass |
| AC-005 | EV-005 | pass (PerformanceObserver di localhost, bukan Lighthouse) |
| AC-006 to AC-014 | none | not_run (T-003 to T-005; AC-014 butuh PR pertama) |

Not run: Lighthouse (CLS diukur tanpa throttling jaringan; ulangi di F-010). Peringatan `allow-scripts` untuk `unrs-resolver` saat `npm ci` dicek di CI.
