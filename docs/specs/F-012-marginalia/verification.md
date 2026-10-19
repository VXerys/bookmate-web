---
id: F-012
title: "Redesign Marginalia: satu hari pembaca"
type: verification
status: verification
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002, FR-003, FR-004, FR-005, FR-006]
supersedes: null
---

# Verification: Redesign Marginalia: satu hari pembaca

## Evidence

### EV-001 — Marginalia + energi Aardvark (T-001 sampai T-006)
- command: `npm run lint && npm run typecheck && npm test && npm run build` (masing-masing exit 0); Browser pane next dev 1440, 1024, dan 375 px dengan ticker manual; `next start` :3101
- output:
  ```text
  lint clean; typecheck 0 errors; tests 51 pass 0 fail; build ok (/ static)
  hari 1024+: pin 4334-7867, 4 daun dibalik berurutan, matahari -> bulan (malam) -> matahari (besok), latar sky -> peach-pale -> peach -> plum -> sky
  hari 375: 5 spread bertumpuk, doodle tergambar saat masuk; rak 6 punggung buku, catatan berganti; papan 2 baris pill
  manifesto: "spreadsheet" dan "grup obrolan yang sepi" dicoret, "satu tempat" dilingkari seiring scroll
  overflow: scrollWidth = clientWidth di 1024 dan 375 (setelah min-w-0 di rak dan header CTA disembunyikan < 640px)
  :3101 sampul biru + Book3D, intro done, 0 error console, 1 h1, 0 img tanpa alt, 9 section berurutan
  menu 1024: Fitur/Lencana/Komunitas/FAQ tiba di 72 px; indikator 04/05/06/08 dan aria-current=location
  ```
- date: 2026-10-19
- commit: bc841eb
- covers: [AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007, AC-008, AC-009, AC-010, AC-011, AC-012]

## Coverage

| Criterion | Evidence | Result |
|---|---|---|
| AC-001, AC-003 sampai AC-012 | EV-001 | pass |
| AC-002 | EV-001 (sebagian) | doodle tampil penuh tanpa JS lewat CSS; reduced motion tidak bisa diemulasikan di pane, cek pemilik |

## Not run

- Reduced motion dan rasa gerak langsung (pane tersembunyi menahan rAF, scroll event, dan animasi CSS): cek pemilik.
