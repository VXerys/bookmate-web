---
id: ADR-0001
title: "Motion stack: GSAP sebagai satu-satunya engine animasi, Lenis sebagai smooth scroll"
type: adr
status: review
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-16
last_updated: 2026-10-16
last_verified: 2026-10-16
supersedes: null
---

# ADR-0001: Motion stack GSAP + Lenis, tanpa WebGL di baseline

## Context

Situs ini bergantung pada motion: preloader, pinned section, horizontal scroll, Flip, parallax, cursor, distortion. Pemilik meminta library yang sama dengan `sechan-portfolio` (GSAP, Lenis) karena hasilnya sudah terbukti di sana. Memilih engine kedua di tengah jalan mahal: setiap section harus ditulis ulang.

## Decision drivers

1. Satu sumber kebenaran untuk setiap properti yang dianimasikan (tidak ada dua sistem yang menulis `transform` yang sama).
2. Integrasi scroll yang akurat untuk pin, scrub, dan horizontal scroll.
3. Jalur reduced motion yang seragam.
4. Pola dan kode yang sudah dikuasai pemilik.
5. Biaya bundle dan performa di ponsel kelas menengah.

## Options

### Option A — GSAP (+ `@gsap/react`) dan Lenis

- Kelebihan: ScrollTrigger, SplitText, Flip, ScrambleText dalam satu paket (semua plugin gratis sejak GSAP 3.13); `gsap.matchMedia()` untuk reduced motion; Lenis kecil dan disinkronkan lewat `gsap.ticker`; sama dengan portfolio.
- Kekurangan: API imperatif; komponen perlu disiplin `useGSAP` dan cleanup.

### Option B — Motion (Framer Motion) dan scroll native

- Kelebihan: deklaratif, cocok dengan React.
- Kekurangan: tidak ada padanan SplitText dan Flip lintas layout setara; pin dan horizontal scroll perlu kode sendiri; berbeda dari portfolio.

### Option C — GSAP dan Locomotive Scroll

- Kekurangan: v5 dibangun di atas Lenis, jadi menambah lapisan tanpa manfaat untuk situs ini.

## Decision

Kita memakai GSAP 3 dengan `@gsap/react` sebagai satu-satunya engine animasi dan Lenis sebagai satu-satunya smooth scroll, dengan versi yang sama seperti `sechan-portfolio`. Three.js dan shader tidak masuk baseline; hover distortion memakai filter SVG. WebGL hanya boleh masuk lewat F-009 dengan ADR-0002 tersendiri.

Applies to: semua animasi dan scroll di `src/`. Does not apply to: transisi hover sederhana di CSS.

## Rationale

Option A memenuhi semua driver: satu engine, ScrollTrigger yang matang untuk pin dan horizontal scroll, reduced motion lewat `gsap.matchMedia()`, dan pola yang sudah dipakai pemilik. Menunda WebGL menjaga bundle tetap kecil sampai ada momen yang benar-benar butuh kedalaman 3D.

## Consequences

- Positive: satu pola untuk semua section; plugin di-register sekali di `src/lib/motion/gsap.ts`.
- Negative or cost: setiap efek wajib ditulis di dalam `useGSAP` dan `gsap.matchMedia()`; reviewer harus memeriksa cleanup.
- Operational: menambah Framer Motion, Anime.js, Locomotive, atau Three.js butuh ADR baru.

## Risks

| Risk | Impact | Mitigation or verification |
|---|---|---|
| Lenis dan ScrollTrigger tidak sinkron setelah font atau gambar dimuat | trigger meleset | `ScrollTrigger.refresh()` setelah intro dan `document.fonts.ready`; dicek di F-001 dan F-010 |
| Efek berat membuat ponsel tersendat | INP dan FPS buruk | efek berat dibatasi `min-width` dan `(pointer: fine)`; audit di F-010 |

## Follow-up

F-001 membuat hub plugin, smooth scroll, dan state intro. F-009 menulis ADR-0002 jika WebGL diusulkan.

## Revisit when

- Ada efek yang tidak bisa dicapai GSAP + SVG dengan kualitas yang diminta.
- Performa mobile gagal target PRD karena engine, bukan karena konten.
