---
id: F-003
title: "Prolog (hero)"
type: tasks
status: implementing
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002, FR-003]
supersedes: null
---

# Tasks: Prolog (hero)

This file is the master for task status. `state.yaml`, `BRIEF.md`, and the progress views are rendered from it and never edited by hand.

Disetujui lewat instruksi pemilik 2026-10-19: selesaikan semua fase tanpa menunggu konfirmasi per langkah.

## Tasks

### T-001 — Konten cerita dan bingkai ponsel
- status: review
- requirements: [FR-001]
- depends_on: []
- evidence: [EV-001]

`src/content/story.ts` + test, `phone-frame.tsx`. Acceptance: AC-001.

### T-002 — Section Prolog dan lapisan bergerak
- status: review
- requirements: [FR-001, FR-002, FR-003]
- depends_on: [T-001]
- evidence: [EV-001]

`prolog.tsx`, `prolog-layers.tsx`, pasang di halaman. Acceptance: AC-001 sampai AC-006.

## Deferred

None.
