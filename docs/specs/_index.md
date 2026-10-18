---
id: FEATURE-REGISTRY
title: Feature Registry
status: active
owner: "M Sechan Alfarisi"
last_updated: "2026-10-16"
---

# Feature Registry

This file is the durable navigation registry for feature specifications.

Task status belongs in each feature's `tasks.md`; `docs/context/state.yaml` and the context views are rendered from it.

| Feature ID | Feature | Spec path | Product priority | Lifecycle gate | Related milestone |
|---|---|---|---|---|---|
| `F-001` | Fondasi dan motion core | `docs/specs/F-001-fondasi-motion-core/` | P0 | review | M1 |
| `F-002` | Shell global: sampul, header, slice transition, menu, cursor, footer reveal | `docs/specs/F-002-shell-global/` | P0 | approved | M1 |
| `F-003` | Prolog (hero) | belum dibuat | P0 | draft | M2 |
| `F-004` | Manifesto dan buka aplikasi | belum dibuat | P0 | draft | M2 |
| `F-005` | Bab horizontal | belum dibuat | P0 | draft | M2 |
| `F-006` | Streak dan kartu pembaca | belum dibuat | P1 | draft | M3 |
| `F-007` | Diskusi, cara mulai, FAQ, epilog | belum dibuat | P0 | draft | M3 |
| `F-008` | Legal dan SEO | belum dibuat | P0 | draft | M4 |
| `F-009` | WebGL hover distortion (opsional, butuh ADR-0002) | belum dibuat | P2 | draft | M4 |
| `F-010` | QA dan rilis | belum dibuat | P0 | draft | M4 |

Ruang lingkup tiap fitur yang belum dibuat ada di `docs/product/roadmap.md`. Folder spec dibuat saat fitur dimulai, bukan sekaligus.

## Lifecycle gate meaning

- `draft`: specification is being written;
- `review`: awaiting product or architecture review;
- `approved`: contract is approved and may enter execution planning;
- `implemented`: accepted implementation exists;
- `superseded`: replaced by another feature contract.

Do not update this file for every task transition. The context system owns mutable progress.
