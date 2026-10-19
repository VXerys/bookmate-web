---
id: F-013
title: "Revamp gaya Aardvark"
type: verification
status: verification
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002, FR-003, FR-004]
supersedes: F-012
---

# Verification: Revamp gaya Aardvark

## Evidence

### EV-001 — Revamp gaya Aardvark, rak buku demo, validasi REA (T-001 sampai T-003)
- command: `npm run lint && npm run typecheck && npm test && npm run build` (masing-masing exit 0); Browser pane next dev 1440 dan 375 px dengan ticker manual; `next start` :3101; `npx rea-agents@6.7.0 analyze-javascript-application <bundle> --format json` lewat agent
- output:
  ```text
  lint clean; typecheck 0 errors; tests 49 pass 0 fail; build ok (/ static)
  hero: Rubik 800, clip-path inset(0 round 0 0 120px 120px), ellipse reveal saat intro, judul 3 baris di 1440
  buku: 20 kartu dari mock app, sampul tipografis, tag genre + kondisi, status, label "Data demo"
  hari: 5 kartu jatuh elastic; manfaat: 5 kapsul tanpa tumpang (cek bounding box); rak: 6 kartu balik
  overflow: scrollWidth = clientWidth di 1440, 997, dan 375 px
  :3101 intro done, 0 error console, 1 h1, 0 img tanpa alt, 10 section berurutan
  menu 1024: Buku/Fitur/Satu hari/Lencana/FAQ tiba di 72 px, indikator 02/03/04/08/09, aria-current=location
  REA: 16 script, ~150 fungsi terpetakan; tween tidak terekstrak, parameter diverifikasi dari kode; koreksi diterapkan
  ```
- date: 2026-10-19
- commit: 76167f3
- covers: [AC-001, AC-002, AC-003, AC-005, AC-006, AC-007, AC-008, AC-009]

## Coverage

| Criterion | Evidence | Result |
|---|---|---|
| AC-001, AC-002, AC-003, AC-005 sampai AC-009 | EV-001 | pass |
| AC-004 | none | not_run: reduced motion tidak bisa diemulasikan di Browser pane; cek pemilik |

## Not run

- Reduced motion dan rasa gerak langsung (pane tersembunyi menahan rAF dan animasi CSS): cek pemilik di browser yang terlihat.
- Tool MCP REA (setelah restart sesi) belum dipakai; validasi memakai CLI.
