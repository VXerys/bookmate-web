<!-- GENERATED FILE — DO NOT EDIT. Rendered by `npm run context:render`.
Source: sdd.config.json, docs/steering/, docs/specs/F-*/, docs/context/ASSUMPTIONS.md, docs/handoff/current.md.
source_hash: 737781f299a3dd05fabbfedfd15ec6af40e9941a1a6b9279a5e3672b9e656685 -->

# Project Progress

## F-001 — Fondasi dan motion core (`implementing`, in_progress)

| Task | Status | Requirements | Depends on | Evidence |
|---|---|---|---|---|
| T-001 Scaffold Next.js, toolchain, CI, dan sumber fakta merek | done | FR-001 |  | EV-001, EV-002, EV-003 |
| T-002 Token desain, font, dan gaya dasar | done | FR-002 | T-001 | EV-004, EV-005 |
| T-003 Hub GSAP, Lenis, state intro, dan boot script | done | FR-003, FR-004 | T-002 | EV-006, EV-007, EV-008 |
| T-004 Primitive reveal teks | done | FR-005 | T-003 | EV-009, EV-010 |
| T-005 Integrasi dan verifikasi fondasi | review | FR-001, FR-002, FR-003, FR-004, FR-005, FR-006 | T-004 | EV-011, EV-012 |

## F-002 — Shell global: sampul, header, slice transition, menu, cursor, footer (`verification`, complete)

| Task | Status | Requirements | Depends on | Evidence |
|---|---|---|---|---|
| T-001 Kunci scroll per pemilik | done | FR-001, FR-003, FR-004 |  | EV-001, EV-002 |
| T-002 Model navigasi dan section stub | done | FR-002, FR-003 |  | EV-003 |
| T-003 Sampul dan keputusan sesi di boot script | done | FR-001 | T-001 | EV-004, EV-005, EV-006 |
| T-004 Skip link, header, dan indikator bab | done | FR-002 | T-002 | EV-007 |
| T-005 Slice transition, fokus, dan hash | done | FR-003 | T-001, T-002 | EV-008 |
| T-006 Menu mobile | done | FR-004 | T-004, T-005 | EV-009 |
| T-007 Custom cursor dan magnetic | done | FR-005 |  | EV-010 |
| T-008 Footer reveal | done | FR-006 | T-004 | EV-011 |
| T-009 Integrasi dan verifikasi shell | done | FR-001, FR-002, FR-003, FR-004, FR-005, FR-006 | T-003, T-006, T-007, T-008 | EV-012 |

## F-003 — Prolog (hero) (`verification`, complete)

| Task | Status | Requirements | Depends on | Evidence |
|---|---|---|---|---|
| T-001 Konten cerita dan bingkai ponsel | done | FR-001 |  | EV-001 |
| T-002 Section Prolog dan lapisan bergerak | done | FR-001, FR-002, FR-003 | T-001 | EV-001 |

## F-004 — Manifesto dan buka aplikasi (`verification`, complete)

| Task | Status | Requirements | Depends on | Evidence |
|---|---|---|---|---|
| T-001 Helper salinan aksesibel dan Manifesto | done | FR-001 |  | EV-001 |
| T-002 Buka aplikasinya | done | FR-002 |  | EV-001 |

## F-005 — Bab horizontal (`verification`, complete)

| Task | Status | Requirements | Depends on | Evidence |
|---|---|---|---|---|
| T-001 Konten bab dan test kontras | done | FR-001 |  | EV-001 |
| T-002 Track horizontal dan fallback vertikal | done | FR-001, FR-002 | T-001 | EV-001 |

## F-006 — Streak dan kartu pembaca (`verification`, complete)

| Task | Status | Requirements | Depends on | Evidence |
|---|---|---|---|---|
| T-001 Data lencana dan Api streak | done | FR-001, FR-002 |  | EV-001 |
| T-002 Kartu pembaca | done | FR-002 | T-001 | EV-001 |

## F-007 — Diskusi, cara mulai, FAQ, dan epilog (`verification`, complete)

| Task | Status | Requirements | Depends on | Evidence |
|---|---|---|---|---|
| T-001 Ruang diskusi | done | FR-001 |  | EV-001 |
| T-002 Cara mulai, FAQ, Epilog | done | FR-002, FR-003 |  | EV-001 |

## F-008 — SEO dan halaman legal (`implementing`, blocked)

| Task | Status | Requirements | Depends on | Evidence |
|---|---|---|---|---|
| T-001 Metadata, gambar OG, robots, JSON-LD | done | FR-001 |  | EV-001 |
| T-002 Halaman kebijakan privasi dan hapus akun | blocked | FR-002 |  |  |
| T-003 Sitemap dan canonical | blocked | FR-002 |  |  |
| T-004 Analytics klik CTA | blocked | FR-002 |  |  |

## F-009 — WebGL hover distortion (opsional) (`draft`, complete)

| Task | Status | Requirements | Depends on | Evidence |
|---|---|---|---|---|
| T-001 ADR-0002 dan implementasi shader | deferred | FR-001 |  |  |

## F-010 — QA dan rilis (`implementing`, blocked)

| Task | Status | Requirements | Depends on | Evidence |
|---|---|---|---|---|
| T-001 Header keamanan | done | FR-001 |  | EV-001 |
| T-002 Audit aksesibilitas struktur dan bundle | done | FR-002 |  | EV-001 |
| T-003 Deploy produksi | blocked | FR-003 |  |  |
