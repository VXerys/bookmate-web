---
id: F-014
title: "Cerita BookMate dengan aset asli"
type: design
status: implementing
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
requirements: [FR-001, FR-002, FR-003, FR-004]
supersedes: F-013
---

# Design: Cerita BookMate dengan aset asli

## Summary

Aset dioptimasi oleh scripts/assets/import-app-assets.mjs ke src/assets/images/app/. Warna dominan sampul dihitung saat impor ke src/content/books.ts. Komponen SVG grafis di src/components/art/ (waves, circle-text, curve-text, starburst, ribbons); geraknya di komponen motion.

## Component changes

| Component or path | Change | Responsibility after change |
|---|---|---|
| `scripts/assets/import-app-assets.mjs` | baru | salin, kecilkan, ukur warna dominan aset app |
| `src/components/art/*` | baru, ubah | gelombang morph, teks lingkaran, teks kurva, starburst, pita |
| `src/components/sections/*` | baru, ubah | hero, rak, cara, aplikasi, fitur, kenapa, komunitas, pita, lencana, faq, penutup |

## Motion and fallbacks

- MorphSVG untuk gelombang hero; textPath startOffset ter-scrub untuk teks kurva; rotasi tak berujung untuk teks lingkaran dan starburst; satu pin (aplikasi).
- Pegas elastic untuk kartu dan kapsul, osmo untuk umum, semua di gsap.matchMedia.

## Testing

| Requirement or risk | Test | Layer |
|---|---|---|
| FR-001, FR-002 | books, story, navigation, palette tests (kontras warna kartu) | node --test |
| FR-003, FR-004 | rekaman REA capture_browser_scenario 1440 dan 375 px | manual |
