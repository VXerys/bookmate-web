---
id: F-003
title: "Prolog (hero)"
type: verification
status: implementing
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002, FR-003]
supersedes: null
---

# Verification: Prolog (hero)

## Evidence



### EV-001 — Prolog (T-001, T-002)
- command: `npm test && npm run lint && npm run typecheck && npm run build` (exit codes checked); Browser pane on next dev with gsap.ticker driven by hand; prerendered HTML
- output:
  ```text
  tests 44 pass (story copy filled, CTA from site.ts); lint, typecheck, build exit 0; 1440 px headline right edge 790, 360 px 344 (gutter 16)
  layers ready after the intro, opacity 1; pointer at the right edge: x 9 / 24 / 30 / 18 px for depth 0.3 / 0.8 / 1 / 0.6
  scroll 450 px: yPercent -6 / -16 / -20 / -12 (scrub, by depth); no-JS HTML contains the layers and copy
  ```
- date: 2026-10-19
- commit: uncommitted on feat/M2-cerita-utama (base bdc4c6b)
- covers: [AC-001, AC-003, AC-004, AC-006]

## Coverage

| Criterion | Evidence | Result |
|---|---|---|
| AC-001, AC-003, AC-004, AC-006 | EV-001 | pass |
| AC-002 | none | not_run (slice ke #bab memakai handler F-002 yang sudah terbukti di F-002 EV-008; tidak diuji ulang) |
| AC-005 | none | not_run (reduced motion: cek pemilik; layar sentuh tidak memicu parallax pointer secara kode) |

## Not run

- Reduced motion dan kesan gerak langsung: cek pemilik di browser yang terlihat (Browser pane sesi ini tersembunyi).
