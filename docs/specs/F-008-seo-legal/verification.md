---
id: F-008
title: "SEO dan halaman legal"
type: verification
status: implementing
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002]
supersedes: null
---

# Verification: SEO dan halaman legal

## Evidence



### EV-001 — Metadata, gambar OG, robots, JSON-LD (T-001)
- command: `npm test && npm run lint && npm run typecheck && npm run build` (exit codes checked); `node audit.mjs` against next start
- output:
  ```text
  ✔ describes BookMate as a free Android app installed from Google Play; ✔ claims no rating or download count; tests 49 pass
  og:title "BookMate | Klub baca komunitas", og:description, og:image, twitter:card summary_large_image; /opengraph-image PNG 1200 x 630
  JSON-LD MobileApplication, ANDROID, price 0, installUrl Google Play; robots.txt "User-Agent: * | Allow: /"; og:image host is localhost until A-004
  ```
- date: 2026-10-19
- commit: acd87e4
- covers: [AC-001, AC-002, AC-003, AC-004]

## Coverage

| Criterion | Evidence | Result |
|---|---|---|
| AC-001, AC-002, AC-003, AC-004 | EV-001 | pass |
| AC-005, AC-006, AC-007 | none | blocked (A-005 teks legal, A-004 domain, A-007 analytics) |

## Not run

- Bagian yang diblokir assumption terbuka tercatat di Coverage; tidak ada yang diklaim lolos tanpa evidence.
