---
id: F-002
title: "Shell global: sampul, header, slice transition, menu, cursor, footer"
type: tasks
status: implementing
tier: full
owner: "M Sechan Alfarisi"
created: 2026-10-18
last_updated: 2026-10-18
last_verified: 2026-10-18
requirements: [FR-001, FR-002, FR-003, FR-004, FR-005, FR-006]
supersedes: null
---

# Tasks: Shell global

This file is the master for task status. `state.yaml`, `BRIEF.md`, and the progress views are rendered from it and never edited by hand.

Branch `feat/F-002-shell-global`, dibuat dari `feat/F-001-fondasi-motion-core` karena PR #1 belum di-merge; rebase ke `main` setelah PR #1 masuk.

## Tasks

### T-001 — Kunci scroll per pemilik
- status: review
- requirements: [FR-001, FR-003, FR-004]
- depends_on: []
- evidence: [EV-001, EV-002]

`src/lib/motion/scroll-lock.ts` + test, `smooth-scroll.tsx` memakai `lockScroll(owner)` dan `unlockScroll(owner)`; handle dev ikut diperbarui. Acceptance: EC-001, diformalkan sebagai AC-020 agar bisa dilacak oleh evidence. Tidak mengubah perilaku Lenis lainnya.

Hasil: `ScrollLockOwner = "sampul" | "menu" | "slice"` mencegah salah ketik pemilik; listener hanya dipanggil saat transisi terkunci/terbuka, jadi Lenis tidak di-stop/start berulang. Dokumen yang menggambarkan keadaan sekarang ikut diperbarui (`docs/architecture/overview.md`, design dan arsitektur F-001).

### T-002 — Model navigasi dan section stub
- status: planned
- requirements: [FR-002, FR-003]
- depends_on: []
- evidence: []

`src/content/navigation.ts` + test; `src/app/page.tsx` mendapat section stub ber-id dan `data-chapter` untuk menguji navigasi. Acceptance: BR-001.

### T-003 — Sampul dan keputusan sesi di boot script
- status: planned
- requirements: [FR-001]
- depends_on: [T-001]
- evidence: []

`boot-script.ts` + test (data-sampul, sessionStorage melempar), `src/components/motion/sampul.tsx` menggantikan `intro-gate.tsx`, CSS tampil sampul. Acceptance: AC-001 sampai AC-004, EC-002, EC-003, EC-004.

### T-004 — Skip link, header, dan indikator bab
- status: planned
- requirements: [FR-002]
- depends_on: [T-002]
- evidence: []

`skip-link.tsx`, `header.tsx`, `<main id="konten">` di layout. Acceptance: AC-005 sampai AC-008.

### T-005 — Slice transition, fokus, dan hash
- status: planned
- requirements: [FR-003]
- depends_on: [T-001, T-002]
- evidence: []

`slice-transition.tsx` dengan `navigateTo(id)`, delegasi klik tautan internal, `focusSection`, `history.pushState`. Acceptance: AC-009 sampai AC-011.

### T-006 — Menu mobile
- status: planned
- requirements: [FR-004]
- depends_on: [T-004, T-005]
- evidence: []

`menu.tsx`: curtain wipe, focus trap, Esc, tutup saat lebar ≥ 768 px. Acceptance: AC-012, AC-013, EC-005.

### T-007 — Custom cursor dan magnetic
- status: planned
- requirements: [FR-005]
- depends_on: []
- evidence: []

`cursor.tsx`, `magnetic.tsx`, CTA header dan halaman uji memakai `Magnetic` dan `data-cursor-label="Unduh"`. Acceptance: AC-014 sampai AC-017.

### T-008 — Footer reveal
- status: planned
- requirements: [FR-006]
- depends_on: [T-004]
- evidence: []

`footer.tsx` sticky di belakang konten, lapisan konten `relative z-10 bg-paper`. Acceptance: AC-018, AC-019.

### T-009 — Integrasi dan verifikasi shell
- status: planned
- requirements: [FR-001, FR-002, FR-003, FR-004, FR-005, FR-006]
- depends_on: [T-003, T-006, T-007, T-008]
- evidence: []

Semua cek dari `tech.md`, uji keyboard dan fokus di Browser pane, layout di 360, 768, 1440 px, CLS, NFR-001 sampai NFR-003, PR ke `main`. Kesan gerak dan reduced motion dicek pemilik di browser terlihat.

## Deferred

None.
