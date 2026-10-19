---
id: F-012
title: "Redesign Marginalia: satu hari pembaca"
type: tasks
status: approved
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002, FR-003, FR-004, FR-005]
supersedes: null
---

# Tasks: Redesign Marginalia: satu hari pembaca

This file is the master for task status. `state.yaml`, `BRIEF.md`, and the progress views are rendered from it and never edited by hand.

Disetujui pemilik 2026-10-19: semua rekomendasi grilling ronde 1 diterima; kerjakan sampai selesai tanpa konfirmasi commit; merge di akhir menunggu pemilik.

## Tasks

### T-001 — Fondasi visual dan pustaka doodle
- status: planned
- requirements: [FR-001]
- depends_on: []
- evidence: []

Token, font, plugin, `src/components/art/doodles.tsx`, `src/lib/motion/draw.ts`. Acceptance: AC-001, AC-002.

### T-002 — Sampul, prolog, manifesto, buka
- status: planned
- requirements: [FR-002]
- depends_on: [T-001]
- evidence: []

Acceptance: AC-003, AC-004.

### T-003 — Satu hari pembaca
- status: planned
- requirements: [FR-003]
- depends_on: [T-001]
- evidence: []

`hari.tsx`, adegan jam, busur matahari. Acceptance: AC-005, AC-006.

### T-004 — Rak, papan, mulai, indeks, epilog, cursor
- status: planned
- requirements: [FR-004]
- depends_on: [T-001]
- evidence: []

Acceptance: AC-007, AC-008.

### T-005 — Navigasi, audit visual, checks
- status: planned
- requirements: [FR-005]
- depends_on: [T-002, T-003, T-004]
- evidence: []

Acceptance: AC-009, AC-010.

## Deferred

None.
