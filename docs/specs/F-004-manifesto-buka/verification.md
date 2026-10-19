---
id: F-004
title: "Manifesto dan buka aplikasi"
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

# Verification: Manifesto dan buka aplikasi

## Evidence



### EV-001 — Manifesto dan Buka (T-001, T-002)
- command: `npm test && npm run lint && npm run typecheck && npm run build` (exit codes checked); Browser pane on next dev at 1440 px, scroll + ScrollTrigger.update + ticker by hand
- output:
  ```text
  manifesto pinned (top 0); 37 words at 0.15 at the start; midway first 1.00, middle 0.57, last 0.15; at the end last 1.00
  sr-only copy present beside the aria-hidden split text; no-JS HTML contains the full paragraph
  buka frame scale 0.55 -> 0.78 -> 1.00 across its pinned range; statement fades with it
  ```
- date: 2026-10-19
- commit: c2669d2
- covers: [AC-001, AC-003, AC-004]

## Coverage

| Criterion | Evidence | Result |
|---|---|---|
| AC-001, AC-003, AC-004 | EV-001 | pass |
| AC-002, AC-005 | none | not_run (reduced motion: cek pemilik; tanpa JS teks penuh ada di HTML) |

## Not run

- Reduced motion dan kesan gerak langsung: cek pemilik di browser yang terlihat (Browser pane sesi ini tersembunyi).
