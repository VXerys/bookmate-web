---
id: F-010
title: "QA dan rilis"
type: design
status: implementing
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002, FR-003]
supersedes: null
---

# Design: QA dan rilis

## Summary

Header lewat `headers()` di `next.config.ts`. Audit memakai skrip Node atas `.next/server/app/index.html` hasil build.

## Component changes

| Component or path | Change | Responsibility after change |
|---|---|---|
| `next.config.ts` | tambah `headers()` | header keamanan |

## Motion and fallbacks

- Tidak ada motion baru.

## Testing

| Requirement or risk | Test | Layer |
|---|---|---|
| AC-001 | `curl -I` ke `next start` | manual |
| AC-002, AC-003 | skrip audit di atas HTML dan chunk build | manual |
