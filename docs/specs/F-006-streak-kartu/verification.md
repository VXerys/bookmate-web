---
id: F-006
title: "Streak dan kartu pembaca"
type: verification
status: superseded
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002]
supersedes: null
---

# Verification: Streak dan kartu pembaca

## Evidence



### EV-001 — Api streak dan kartu pembaca (T-001, T-002)
- command: `npm test && npm run lint && npm run typecheck && npm run build` (exit codes checked); Browser pane on next dev at 1440 and 360 px, ticker by hand
- output:
  ```text
  ✔ the app's 30 badges in 6 groups, each with title, philosophy, and criteria; ✔ every group has a tier I badge; tests 47 pass
  streak pinned: days on 0 -> 15 -> 30, counter 0 -> 15 -> 30; caption "Contoh kalender 30 hari"; all days filled in server HTML
  deck stacked at x 537 -> dealt once to the grid 40 / 495 / 950 px (no leftover transform); 360 px cards end at 324
  card button: aria-pressed true, front aria-hidden true, back shows "Tamatkan minimal 3 buku bacaan."; ripple scale 22.6 while hovered
  ```
- date: 2026-10-19
- commit: 0c8cfaa
- covers: [AC-001, AC-003, AC-004, AC-005, AC-006, AC-007]

## Coverage

| Criterion | Evidence | Result |
|---|---|---|
| AC-001, AC-003, AC-004, AC-005, AC-006, AC-007 | EV-001 | pass |
| AC-002 | none | not_run (reduced motion: cek pemilik; tanpa JS kalender penuh dan counter 30 ada di HTML server) |

## Not run

- Reduced motion dan kesan gerak langsung: cek pemilik di browser yang terlihat.
