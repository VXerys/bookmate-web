---
id: F-011
title: "Screenshot sementara dan perbaikan bug animasi"
type: verification
status: verification
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002, FR-003]
supersedes: null
---

# Verification: Screenshot sementara dan perbaikan bug animasi

## Evidence

### EV-001 — Screenshot, posisi trigger, kualitas gerak (T-001 sampai T-003)
- command: `npm run lint && npm run typecheck && npm test && npm run build` (exit 0); Browser pane next dev 1440x900 dan 375x812, ticker manual; `next start` :3101
- output:
  ```text
  lint clean; typecheck 0 errors; tests 50 pass 0 fail; build ok (/ static)
  sebelum: 9 trigger header bergeser saat refresh (bab 2250 -> 4230 px); lenis.limit 12730 vs scroll max 18055
  sesudah: refresh ulang 0 dari 32 trigger berubah, lenis.limit = scroll max; menu Lencana/Komunitas/FAQ tiba di 72 px,
  Streak/Fitur di 0 px; indikator 06/05/07/09/04 (scroll event dikirim manual karena pane tersembunyi)
  kartu: scrollHeight 18955 sebelum dan sesudah deal; buka: lead dan tail mengapit ponsel, akhir pin skala 1.8
  :3101 8 screenshot termuat (w=640), 1 alt kosong (Prolog dekoratif), 0 error console
  ```
- date: 2026-10-19
- commit: 523ae22
- covers: [AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007]

## Coverage

| Criterion | Evidence | Result |
|---|---|---|
| AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007 | EV-001 | pass (AC-007 dari kode dan ticker; rasa gerak langsung dicek pemilik) |

## Not run

- Rasa gerak langsung, reduced motion, dan cursor di browser yang terlihat: cek pemilik (pane tersembunyi menahan rAF, scroll event, ResizeObserver).
