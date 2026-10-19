---
id: F-013
title: "Revamp gaya Aardvark"
type: tasks
status: verification
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002, FR-003, FR-004]
supersedes: F-012
---

# Tasks: Revamp gaya Aardvark

This file is the master for task status. `state.yaml`, `BRIEF.md`, and the progress views are rendered from it and never edited by hand.

Disetujui pemilik 2026-10-19: semua rekomendasi grilling diterima, kerjakan sampai selesai tanpa konfirmasi commit; merge menunggu pemilik.

## Tasks

### T-001 — Sistem visual dan gerak
- status: done
- requirements: [FR-001, FR-002]
- depends_on: []
- evidence: [EV-001]

Token, font, ease, bentuk, komponen bersama. Acceptance: AC-001 sampai AC-004.

### T-002 — Section BookMate
- status: done
- requirements: [FR-003]
- depends_on: [T-001]
- evidence: [EV-001]

Semua section, navigasi, copy. Acceptance: AC-005 sampai AC-007.

### T-003 — Rak buku dari data demo dan validasi REA
- status: done
- requirements: [FR-004]
- depends_on: [T-001]
- evidence: [EV-001]

`src/content/books.ts` (dari mock app), `typo-cover.tsx`, `card-shelf.tsx`, `buku.tsx`, koreksi REA. Acceptance: AC-008, AC-009.

## Deferred

None.
