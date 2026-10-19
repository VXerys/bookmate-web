verification |verification |verification |---
id: PRD
title: "BookMate Web"
type: prd
status: review
tier: lite
owner: "M Sechan Alfarisi"
created: "2026-10-16"
last_updated: "2026-10-16"
last_verified: "2026-10-16"
supersedes: null
---

# Product Requirements: BookMate Web

Product intent and scope. Feature-level behavior lives in `docs/specs/F-XXX/requirements.md`; the short version of vision and personas lives in `docs/steering/product.md` and must agree with this file. Arah visual dan motion ada di `docs/product/art-direction.md`.

## Context

BookMate adalah app Android (v1.1.0, rilis September 2026, package `com.mangcoding.bookmate2`, publisher Mangcoding) untuk klub baca komunitas: catat progres bacaan, streak harian, bedah buku, diskusi komunitas, dan pinjam buku fisik antar anggota. Saat ini BookMate belum punya website, landing page, atau URL kebijakan privasi publik.

## Problem

- Current state: satu-satunya pintu masuk adalah listing Google Play. Calon pengguna tidak bisa melihat cara kerja app sebelum memasang, dan tautan yang dibagikan di media sosial langsung ke Play Store tanpa cerita.
- Pain or opportunity: pivot v1.1.0 dari "app pinjam buku" ke "klub baca komunitas" belum punya tempat untuk dijelaskan secara utuh.
- Desired outcome: satu halaman yang menjelaskan BookMate dalam kurang dari dua menit scroll, terasa premium, dan berakhir di tombol unduh.

## Goals and non-goals

- G-001: pengunjung memahami lima kemampuan inti (catat, streak, bedah buku, komunitas, pinjam) dari satu halaman.
- G-002: setiap section berakhir dekat dengan CTA ke Google Play.
- G-003: kualitas motion setara situs editorial kelas atas, tanpa mengorbankan aksesibilitas dan performa.
- G-004: menyediakan halaman kebijakan privasi dan penghapusan akun yang bisa ditautkan dari Play Console.
- NG-001: tidak ada login, akun, katalog buku, atau data pengguna di website.
- NG-002: tidak ada e-reader atau fitur "Tabaca" sampai rebranding disetujui (A-001).
- NG-003: tidak ada blog atau CMS di rilis pertama.

## Actors and use cases

- ACTOR-001: Calon pembaca (18 sampai 30 tahun, ponsel Android), datang dari tautan media sosial atau pencarian.
- ACTOR-002: Pengelola komunitas baca (klub kampus atau lokal) yang menilai apakah BookMate cocok untuk anggotanya.
- ACTOR-003: Pengguna lama yang mencari kebijakan privasi atau cara hapus akun.
- UC-001: ACTOR-001 membuka situs dari ponsel, scroll sampai akhir, menekan "Unduh di Google Play".
- UC-002: ACTOR-002 membuka situs di desktop, membaca bab Komunitas dan Pinjam, memindai QR untuk memasang di ponsel.
- UC-003: ACTOR-003 membuka `/hapus-akun` dan menemukan langkah penghapusan akun.

## Functional requirements

- FR-001: the system shall present the five core capabilities as chapters on one scrolling page.
- FR-002: the system shall link every primary CTA to the Google Play listing of `com.mangcoding.bookmate2`.
- FR-003: the system shall render complete, readable content with JavaScript disabled or under reduced motion.
- FR-004: the system shall publish a privacy policy page and an account deletion page with owner-supplied content.
- FR-005: the system shall expose metadata for search and social sharing (title, description, Open Graph image, sitemap, structured data for a mobile app).
- BR-001: setiap klaim angka (unduhan, pengguna, rating) hanya tampil jika ada sumber terverifikasi; tanpa sumber, klaim dihapus.
- BR-002: UI copy dalam Bahasa Indonesia dengan sapaan "kamu".

## Constraints

- Hanya Android yang dipromosikan; iOS tidak disebut sampai ada rilis App Store.
- Static site tanpa backend; hosting Vercel (A-004).
- Aset mengikuti aturan provenance di art direction; tidak ada sampul buku komersial.

## Success criteria

| Signal | Target or interpretation | Measurement source |
|---|---|---|
| Lighthouse mobile | Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95 | Lighthouse di build produksi |
| Core Web Vitals | LCP < 2,5 s, CLS < 0,1, INP < 200 ms | Lighthouse dan Vercel Speed Insights jika diaktifkan |
| Klik CTA unduh | naik setelah rilis; baseline belum ada | analytics yang dipilih di F-008 (A-007) |

## Risks and assumptions

- R-001: motion berat menurunkan performa di ponsel kelas menengah. Mitigasi: efek berat hanya desktop, budget di F-010.
- R-002: rebranding mengubah nama di tengah jalan. Mitigasi: nama hanya di `src/content/site.ts`.
- Assumptions: A-001 sampai A-007 di `docs/context/ASSUMPTIONS.md`.

## Milestones

Detail per phase di `docs/product/roadmap.md`.

- M1: fondasi dan shell global (F-001, F-002).
- M2: cerita utama (F-003, F-004, F-005).
- M3: momen signature dan konversi (F-006, F-007).
- M4: legal, SEO, polish, rilis (F-008, F-009 opsional, F-010).

## Feature map

| Feature | Capability | Outcome | Depends on | Status |
|---|---|---|---|---|
| F-001 | Fondasi dan motion core | toolchain, token, font, Lenis + GSAP, reduced motion | none | implementing |
| F-002 | Shell global | sampul, header, slice transition, menu, cursor, footer reveal | F-001 | verification |
| F-003 | Prolog (hero) | hero berlapis dengan CTA | F-002 | verification |
| F-004 | Manifesto dan buka aplikasi | scrub text fill, scroll-linked scale | F-002 | verification |
| F-005 | Bab horizontal | lima bab kemampuan | F-002 | verification |
| F-006 | Streak dan kartu pembaca | kalender streak, dek tarot Flip + liquid | F-002 | verification |
| F-007 | Diskusi, cara mulai, FAQ, epilog | sticky stack, marquee, CTA akhir | F-002 | verification |
| F-008 | Legal dan SEO | privasi, hapus akun, metadata, analytics | F-001 | implementing |
| F-009 | WebGL hover (opsional) | shader distortion di kartu dan gambar | F-006, ADR | draft |
| F-010 | QA dan rilis | audit performa, a11y, perangkat, deploy | semua | implementing |

## Approval

Menunggu review M Sechan Alfarisi (art direction, roadmap, A-001).
