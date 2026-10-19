---
id: F-011
title: "Screenshot sementara dan perbaikan bug animasi"
type: tasks
status: verification
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002, FR-003]
supersedes: null
---

# Tasks: Screenshot sementara dan perbaikan bug animasi

This file is the master for task status. `state.yaml`, `BRIEF.md`, and the progress views are rendered from it and never edited by hand.

Disetujui lewat instruksi pemilik 2026-10-19: pakai aset sementara di mockup dan perbaiki bug animasi sampai selesai sambil memeriksa preview.

## Tasks

### T-001 — Screenshot di mockup
- status: done
- requirements: [FR-001]
- depends_on: []
- evidence: [EV-001]

`screens.ts`, `screen-images.ts`, `phone-frame.tsx`, `CREDITS.md`. Acceptance: AC-001, AC-002.

### T-002 — Posisi scroll dan trigger
- status: done
- requirements: [FR-002]
- depends_on: []
- evidence: [EV-001]

`header.tsx`, `smooth-scroll.tsx`, `kartu.tsx`. Acceptance: AC-003 sampai AC-005.

### T-003 — Kualitas gerak
- status: done
- requirements: [FR-003]
- depends_on: []
- evidence: [EV-001]

`buka.tsx`, `bab-track.tsx`, `mulai.tsx`, `magnetic.tsx`, `cursor.tsx`, `diskusi.tsx`. Acceptance: AC-006, AC-007.

## Deferred

None.
