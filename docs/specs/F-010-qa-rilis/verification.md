---
id: F-010
title: "QA dan rilis"
type: verification
status: implementing
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002, FR-003]
supersedes: null
---

# Verification: QA dan rilis

## Evidence



### EV-001 — Header keamanan, audit struktur, bundle (T-001, T-002)
- command: `npm run build` then `node audit.mjs` and `node bundle-size.mjs` against next start
- output:
  ```text
  X-Content-Type-Options nosniff; Referrer-Policy strict-origin-when-cross-origin; X-Frame-Options DENY; Permissions-Policy camera=(), microphone=(), geolocation=()
  h1 1; header 1; main 1; footer 1; labelled nav 1; img without alt 0; 10 sections all with a heading; html lang id
  first-load JS 246.6 KB gzip in 9 files (F-001 baseline 223.7 KB), CSS 7.7 KB gzip
  ```
- date: 2026-10-19
- commit: uncommitted on feat/M4-seo-qa (base e7f302c)
- covers: [AC-001, AC-002, AC-003]

## Coverage

| Criterion | Evidence | Result |
|---|---|---|
| AC-001, AC-002, AC-003 | EV-001 | pass |
| AC-004 | none | blocked (A-004 domain dan persetujuan deploy; Lighthouse dijalankan setelah deploy) |

## Not run

- Bagian yang diblokir assumption terbuka tercatat di Coverage; tidak ada yang diklaim lolos tanpa evidence.
