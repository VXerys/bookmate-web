---
id: F-007
title: "Diskusi, cara mulai, FAQ, dan epilog"
type: verification
status: verification
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002, FR-003]
supersedes: null
---

# Verification: Diskusi, cara mulai, FAQ, dan epilog

## Evidence



### EV-001 — Diskusi, cara mulai, FAQ, epilog (T-001, T-002)
- command: `npm test && npm run lint && npm run typecheck && npm run build` (exit codes checked); Browser pane on next dev at 1440 and 360 px, ticker by hand
- output:
  ```text
  ✔ every FAQ answer cites a source in the app repo; tests 47 pass; no console errors; no horizontal overflow at 1440 and 360 px
  diskusi: first card scale 0.92 once the second slides over it; marquee xPercent moves while in view
  cara mulai progress scaleY 0.68 midway; FAQ: 4 native <details>; epilog line scale 1.21 at entry -> 1.00 at centre
  ```
- date: 2026-10-19
- commit: uncommitted on feat/M3-signature-konversi (base 93e3e0f)
- covers: [AC-001, AC-002, AC-003, AC-004, AC-005]

## Coverage

| Criterion | Evidence | Result |
|---|---|---|
| AC-001, AC-002, AC-003, AC-004, AC-005 | EV-001 | pass (keyboard pada <details> adalah perilaku bawaan; reduced motion dicek pemilik) |

## Not run

- Reduced motion dan kesan gerak langsung: cek pemilik di browser yang terlihat.
