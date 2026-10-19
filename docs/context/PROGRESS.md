<!-- GENERATED FILE — DO NOT EDIT. Rendered by `npm run context:render`.
Source: sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.
source_hash: 23573e7288dd4173bf1c5562dd4165dd239ab232c1e4ae2169472e61bbdd94e2 -->

# Project Progress

## F-001 — Fondasi dan motion core (`implementing`, in_progress)

| Task | Status | Requirements | Depends on | Evidence |
|---|---|---|---|---|
| T-001 Scaffold Next.js, toolchain, CI, dan sumber fakta merek | done | FR-001 |  | EV-001, EV-002, EV-003 |
| T-002 Token desain, font, dan gaya dasar | done | FR-002 | T-001 | EV-004, EV-005 |
| T-003 Hub GSAP, Lenis, state intro, dan boot script | done | FR-003, FR-004 | T-002 | EV-006, EV-007, EV-008 |
| T-004 Primitive reveal teks | done | FR-005 | T-003 | EV-009, EV-010 |
| T-005 Integrasi dan verifikasi fondasi | review | FR-001, FR-002, FR-003, FR-004, FR-005, FR-006 | T-004 | EV-011, EV-012 |

## F-002 — Shell global: sampul, header, slice transition, menu, cursor, footer (`implementing`, in_progress)

| Task | Status | Requirements | Depends on | Evidence |
|---|---|---|---|---|
| T-001 Kunci scroll per pemilik | done | FR-001, FR-003, FR-004 |  | EV-001, EV-002 |
| T-002 Model navigasi dan section stub | done | FR-002, FR-003 |  | EV-003 |
| T-003 Sampul dan keputusan sesi di boot script | done | FR-001 | T-001 | EV-004, EV-005, EV-006 |
| T-004 Skip link, header, dan indikator bab | done | FR-002 | T-002 | EV-007 |
| T-005 Slice transition, fokus, dan hash | done | FR-003 | T-001, T-002 | EV-008 |
| T-006 Menu mobile | review | FR-004 | T-004, T-005 | EV-009 |
| T-007 Custom cursor dan magnetic | planned | FR-005 |  |  |
| T-008 Footer reveal | planned | FR-006 | T-004 |  |
| T-009 Integrasi dan verifikasi shell | planned | FR-001, FR-002, FR-003, FR-004, FR-005, FR-006 | T-003, T-006, T-007, T-008 |  |
