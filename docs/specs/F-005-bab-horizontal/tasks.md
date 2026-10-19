---
id: F-005
title: "Bab horizontal"
type: tasks
status: implementing
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002]
supersedes: null
---

# Tasks: Bab horizontal

This file is the master for task status. `state.yaml`, `BRIEF.md`, and the progress views are rendered from it and never edited by hand.

Disetujui lewat instruksi pemilik 2026-10-19: selesaikan semua fase tanpa menunggu konfirmasi per langkah.

## Tasks

### T-001 — Konten bab dan test kontras
- status: review
- requirements: [FR-001]
- depends_on: []
- evidence: [EV-001]

Daftar bab di `story.ts` + test. Acceptance: AC-001.

### T-002 — Track horizontal dan fallback vertikal
- status: review
- requirements: [FR-001, FR-002]
- depends_on: [T-001]
- evidence: [EV-001]

`bab-track.tsx`, CSS, pasang di halaman. Acceptance: AC-002 sampai AC-005.

## Deferred

None.
