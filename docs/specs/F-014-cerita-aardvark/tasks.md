---
id: F-014
title: "Cerita BookMate dengan aset asli"
type: tasks
status: implementing
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002, FR-003, FR-004]
supersedes: F-013
---

# Tasks: Cerita BookMate dengan aset asli

This file is the master for task status. `state.yaml`, `BRIEF.md`, and the progress views are rendered from it and never edited by hand.

Disetujui pemilik 2026-10-19: kerjakan sesuai rekomendasi, setiap section cinematic dan keren secara visual, pakai aset buku dari mock.

## Tasks

### T-001 — Pipeline aset app dan data buku
- status: done
- requirements: [FR-001]
- depends_on: []
- evidence: [EV-001]

Skrip impor, books.ts dengan warna, CREDITS. Acceptance: AC-001, AC-002.

### T-002 — Komponen SVG grafis beranimasi
- status: done
- requirements: [FR-003]
- depends_on: [T-001]
- evidence: [EV-001]

Acceptance: AC-004, AC-005.

### T-003 — Section cerita
- status: done
- requirements: [FR-002]
- depends_on: [T-002]
- evidence: [EV-001]

Acceptance: AC-003.

### T-004 — Audit dan checks
- status: done
- requirements: [FR-004]
- depends_on: [T-003]
- evidence: [EV-001]

Acceptance: AC-006.

## Deferred

None.
