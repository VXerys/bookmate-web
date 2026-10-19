---
id: F-005
title: "Bab horizontal"
type: verification
status: implementing
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002]
supersedes: null
---

# Verification: Bab horizontal

## Evidence



### EV-001 — Bab horizontal dan fallback vertikal (T-001, T-002)
- command: `npm test && npm run lint && npm run typecheck && npm run build` (exit codes checked); Browser pane on next dev at 1440 and 360 px
- output:
  ```text
  ✔ there are five chapters numbered 01 to 05 with copy; ✔ each chapter's text colour on its background is an allowed normal-size pair
  1440 px: data-horizontal set, section pinned (top 0), track x 0 -> -1421 -> -2843 -> -4264 -> -5685, indicator Bab 01 -> 05
  360 px: no data-horizontal, panels stacked, indicator hidden, no horizontal overflow; no-JS HTML: 5 panels, no data-horizontal
  ```
- date: 2026-10-19
- commit: uncommitted on feat/M2-cerita-utama (base bdc4c6b)
- covers: [AC-001, AC-002, AC-003, AC-004, AC-005]

## Coverage

| Criterion | Evidence | Result |
|---|---|---|
| AC-001, AC-002, AC-003, AC-004, AC-005 | EV-001 | pass (AC-002 untuk tanpa JS dan layar sempit; reduced motion di layar lebar dicek pemilik) |

## Not run

- Reduced motion dan kesan gerak langsung: cek pemilik di browser yang terlihat (Browser pane sesi ini tersembunyi).
