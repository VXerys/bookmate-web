---
id: F-002
title: "Shell global: sampul, header, slice transition, menu, cursor, footer"
type: verification
status: implementing
tier: full
owner: "M Sechan Alfarisi"
created: 2026-10-18
last_updated: 2026-10-18
last_verified: 2026-10-18
requirements: [FR-001, FR-002, FR-003, FR-004, FR-005, FR-006]
supersedes: null
---

# Verification: Shell global

Evidence that acceptance criteria hold at a named commit. A claim without a command and an output excerpt is not evidence. Unrun checks are listed, never omitted.

## Evidence

### EV-001 — Registry kunci scroll dan toolchain (T-001)
- command: `npm test && npm run test:sdd && npm run lint && npm run typecheck && npm run build` (each exit code checked)
- output:
  ```text
  ✔ stays locked until the last owner unlocks (menu open, then slice transition)
  ✔ locking twice by the same owner needs a single unlock
  ✔ unlocking an owner that never locked changes nothing
  ✔ listeners hear only the transitions between unlocked and locked
  ✔ an unsubscribed listener is not called again
  tests 25 pass 0 fail; SDD 34 pass; lint exit 0; typecheck exit 0; build exit 0, static 3/3; dev handle absent from .next/static
  ```
- date: 2026-10-18
- commit: uncommitted on feat/F-002-shell-global (base 816573d)
- covers: [AC-020]

### EV-002 — Kunci bertumpuk diterapkan ke Lenis dan overflow (T-001)
- command: `Browser pane on next dev via window.__bookmateMotion (lockScroll, unlockScroll, scrollLock, lenis)`
- output:
  ```text
  start:              owners []                overflow (empty)  lenis stopped false
  lock menu:          owners [menu]            overflow hidden   lenis stopped true
  lock slice:         owners [menu, slice]     overflow hidden   lenis stopped true
  unlock menu:        owners [slice]           overflow hidden   lenis stopped true
  unlock slice:       owners []                overflow (empty)  lenis stopped false
  unlock slice again: owners []                overflow (empty)  lenis stopped false
  setScrollLocked no longer exported
  ```
- date: 2026-10-18
- commit: uncommitted on feat/F-002-shell-global (base 816573d)
- covers: [AC-020]

## Coverage

| Criterion | Evidence | Result |
|---|---|---|
| AC-020 | EV-001, EV-002 | pass di tingkat registry dan penerapan; alur menu lalu slice end-to-end dicek di T-006 |
| AC-001 to AC-019 | none | not_run (T-002 sampai T-009) |

## Not run

- Kunci yang diminta sebelum Lenis dibuat (sampul mount lebih dulu) belum diuji di browser; jalurnya `scrollLock.isLocked()` saat Lenis dibuat, dicek saat sampul ada di T-003.
- Pengaruh kunci pada wheel dan keyboard asli tidak diuji ulang karena Browser pane tersembunyi (rAF berhenti); perilaku penerapan sama dengan F-001 EV-007.
