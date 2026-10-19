---
id: F-006
title: "Streak dan kartu pembaca"
type: tasks
status: verification
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002]
supersedes: null
---

# Tasks: Streak dan kartu pembaca

This file is the master for task status. `state.yaml`, `BRIEF.md`, and the progress views are rendered from it and never edited by hand.

Disetujui lewat instruksi pemilik 2026-10-19: selesaikan semua fase tanpa menunggu konfirmasi per langkah.

## Tasks

### T-001 — Data lencana dan Api streak
- status: done
- requirements: [FR-001, FR-002]
- depends_on: []
- evidence: [EV-001]

`badges.ts` + test, `streak.tsx`. Acceptance: AC-001 sampai AC-004.

### T-002 — Kartu pembaca
- status: done
- requirements: [FR-002]
- depends_on: [T-001]
- evidence: [EV-001]

`kartu.tsx`, Flip, tilt, liquid, balik kartu. Acceptance: AC-005 sampai AC-007.

## Deferred

None.
