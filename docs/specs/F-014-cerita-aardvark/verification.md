---
id: F-014
title: "Cerita BookMate dengan aset asli"
type: verification
status: implementing
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002, FR-003, FR-004]
supersedes: F-013
---

# Verification: Cerita BookMate dengan aset asli

## Evidence


### EV-001 — Cerita BookMate dengan aset asli, revisi pemilik, validasi browser (T-001 sampai T-004)
- command: `npm run lint && npm run typecheck && npm test && npm run build` (masing-masing exit 0); `node scripts/assets/import-app-assets.mjs ../bookmeet`; rekaman REA `capture_browser_scenario` (Chrome, 1920x945, 1440x900, 375x812, motion dan reduced motion) pada `next dev` dan `next start`; screenshot CDP headless per section pada `next start` :3101
- output:
  ```text
  lint clean; typecheck 0 errors; tests 58 pass 0 fail; build ok (/ static)
  impor: books 18, communities 5, tarot 30, memoji 13; kontras kartu buku >= 4.5:1 untuk semua 18 (app-data.test.ts)
  urutan: prolog, buku, pinjam, aplikasi, fitur, kenapa, komunitas, (pita), lencana, indeks, epilog (story.test.ts)
  rak: 10 buku, tiga buku hero di depan; pin horizontal 1920 dan 1440 menampilkan kartu utuh
  overflowX: -15 (scrollbar) di 1920 dan 1440, 0 di 375; tidak ada scroll horizontal
  klik navbar: tirai kuning-biru dengan label bab, mendarat di section yang benar; refresh di #komunitas mendarat di komunitas
  reduced motion (CDP setEmulatedMedia): semua section statis dan lengkap, stiker dan kartu terlihat, tanpa pin
  page errors: 0 di semua rekaman
  ```
- date: 2026-10-19
- commit: 9a0fd26
- covers: [AC-001, AC-002, AC-003, AC-004, AC-005, AC-006]

## Coverage

| Criterion | Evidence | Result |
|---|---|---|
| AC-001, AC-002, AC-003, AC-004, AC-005, AC-006 | EV-001 | pass |

## Not run

- Rasa gerak di layar pemilik (60 fps, Lenis) tidak bisa diukur dari rekaman headless; cek pemilik di browser.
- Rilis tetap diblokir: sampul penerbit dan screenshot sementara (A-002), hak tarot dan memoji (A-003).
