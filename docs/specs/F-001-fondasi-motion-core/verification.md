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

Evidence that acceptance criteria hold at a named commit. A claim without a command and an output excerpt is not evidence. Unrun checks are listed, never omitted.

## Evidence

### EV-001 — Clean install, lint, dan typecheck
- command: `npm ci && npm run lint && npm run typecheck`
- output:
  ```text
  > bookmate-web@0.1.0 lint
  > eslint
  (no findings)
  Generating route types...
  ✓ Types generated successfully
  ```
- date: 2026-10-16
- commit: uncommitted (scaffold awal, belum ada commit)
- covers: [AC-001]

### EV-002 — Test konten merek
- command: `npm test`
- output:
  ```text
  ✔ Play Store link targets the production package id
  ✔ brand copy is filled in
  ℹ tests 2
  ℹ pass 2
  ℹ fail 0
  ```
- date: 2026-10-16
- commit: uncommitted (scaffold awal, belum ada commit)
- covers: [AC-001, AC-002]

### EV-003 — Build produksi
- command: `npm run build`
- output:
  ```text
  ✓ Compiled successfully in 37.7s
  ✓ Generating static pages using 4 workers (3/3) in 5.2s
  Route (app)
  ┌ ○ /
  └ ○ /_not-found
  ```
- date: 2026-10-16
- commit: uncommitted (scaffold awal, belum ada commit)
- covers: [AC-001]

## Coverage

| Criterion | Evidence | Result |
|---|---|---|
| AC-001 | EV-001, EV-002, EV-003 | pass |
| AC-002 | EV-002 | pass |
| AC-003 to AC-013 | none | not_run (T-002 sampai T-005) |
| AC-014 | none | not_run |

## Not run

- AC-014: workflow CI baru bisa terbukti setelah repo di-push dan PR pertama dibuka. `npm run test:sdd` lokal lulus (34 dari 34) dan dipanggil di workflow.
- `npm ci` menampilkan peringatan `allow-scripts` untuk `unrs-resolver` (postinstall tidak dijalankan); lint tetap jalan tanpa temuan. Perlu dicek ulang di CI.
