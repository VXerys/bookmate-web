---
id: F-001
title: "Fondasi dan motion core"
type: system-architecture
status: implementing
tier: full
owner: "M Sechan Alfarisi"
created: 2026-10-16
last_updated: 2026-10-16
last_verified: 2026-10-16
supersedes: null
---

# System Architecture: Fondasi dan motion core

## 1. Intent

- Capability: satu sistem motion bersama untuk seluruh situs: engine animasi, smooth scroll, sinyal intro selesai, dan jalur aman saat motion dimatikan atau skrip gagal.
- Objective: setiap fitur F-002 sampai F-010 menulis efeknya tanpa membuat instance scroll, registrasi plugin, atau logika reduced motion sendiri.
- In scope: hub plugin GSAP, instance Lenis dan API kunci/lompat, state intro, boot script `html.js`, token dan font.
- Out of scope: efek visual per section, sampul visual (F-002), cursor (F-002).
- Why a separate architecture document: ini shared state lintas semua fitur (posisi dan kunci scroll, status intro, kelas `html.js`). Satu kesalahan di sini membuat setiap section salah ukur atau konten tersembunyi.

## 2. Drivers

| Driver | Requirement or assumption | Priority | Architectural consequence |
|---|---|---|---|
| Konten selalu terbaca | FR-004, AC-009, AC-010 | high | konten hanya disembunyikan di bawah `html.js`; boot script punya fallback waktu |
| Satu sumber gerak | FR-003, ADR-0001 | high | satu instance Lenis, satu hub GSAP; komponen lain hanya memakai API-nya |
| Reduced motion | AC-007, AC-013 | high | keputusan dibuat sekali di titik masuk (Lenis, `gsap.matchMedia()`), bukan per efek |
| Trigger akurat | AC-006 | high | Lenis memanggil `ScrollTrigger.update`; refresh setelah intro dan font |

Unknowns: tidak ada yang memblokir. A-002 (screenshot) memengaruhi kapan `refresh` perlu dipanggil ulang setelah gambar dimuat (F-003).

## 4. Context and boundaries

```text
boot script (head) -> SmoothScroll (Lenis + GSAP ticker) -> ScrollTrigger -> section timelines
                   -> IntroGate / sampul -> completeIntro() -> refresh + whenIntroDone listeners
```

| Boundary or component | Owns | Does not own | Trust level |
|---|---|---|---|
| Boot script | kelas `html.js`, `scrollRestoration`, fallback 6 s | animasi | trusted (inline, tanpa input) |
| `smooth-scroll.tsx` | instance Lenis, kunci scroll | posisi target section | trusted |
| `intro-state.ts` | flag selesai dan antrean listener | DOM | trusted |
| `intro-gate.tsx` (`completeIntro`) | `data-intro="done"`, `ScrollTrigger.refresh()` | kapan intro visual berakhir (F-002) | trusted |

Invarian: hanya `completeIntro()` yang menyatakan intro selesai; hanya `smooth-scroll.tsx` yang membuat atau menghentikan Lenis; hanya `src/lib/motion/gsap.ts` yang mendaftarkan plugin.

## 5. Components and dependency direction

| Component | Responsibility | May depend on | Must not depend on |
|---|---|---|---|
| `src/lib/motion/*` | hub GSAP, state intro, boot script | `gsap`, `@gsap/react` | komponen React, `src/content` copy |
| `src/components/motion/*` | SmoothScroll, IntroGate, Reveal | `src/lib/motion` | section |
| Section (F-003+) | timeline section | `src/components/motion`, `src/lib/motion`, `src/content` | Lenis langsung, `gsap` langsung |

## 6. Critical flows

```text
Muat halaman: boot script -> html.js + scrollRestoration manual -> hidrasi -> SmoothScroll (jika MOTION_OK) -> fonts.ready -> completeIntro -> refresh -> lagSmoothing(0)
Kunci scroll: setScrollLocked(true) -> overflow hidden + lenis.stop -> setScrollLocked(false) -> overflow kosong + lenis.start
Gagal skrip: boot script -> 6 s tanpa data-intro="done" -> html.js dilepas -> konten terlihat tanpa animasi
Reduced motion: SmoothScroll keluar sebelum new Lenis -> scroll native; efek memakai cabang state akhir
```

## 8. Consistency, concurrency, ordering

- Kunci diminta sebelum Lenis ada disimpan (`lockedBeforeStart`) dan diterapkan saat Lenis dibuat, jadi urutan mount tidak memengaruhi hasil.
- `finishIntro()` idempoten; listener yang mendaftar setelah selesai langsung dijalankan, sehingga section yang mount terlambat tidak menunggu selamanya.

## 11. Scalability and performance

Satu loop frame (`gsap.ticker`) menggerakkan Lenis dan semua tween; tidak ada `requestAnimationFrame` kedua. `scrollbar-gutter: stable` mencegah reflow saat kunci, yang kalau terjadi akan membuat semua trigger salah ukur.

## 12. Reliability and resilience

Fallback boot memastikan kegagalan skrip tidak menyembunyikan konten. Risiko sisa: JS yang terhidrasi setelah 6 detik akan berjalan tanpa `html.js`; komponen reveal (T-004) wajib memeriksa `html.js` sebelum menyembunyikan apa pun.

## 13. Security, privacy, abuse

Satu skrip inline tanpa input pengguna. CSP dengan hash untuk skrip ini diputuskan di F-010. Handle debug `window.__bookmateMotion` hanya ada di development dan dibuang saat build produksi.

## 17. Alternatives and decision

Engine dan scroll: ADR-0001. Untuk state intro, alternatif React context ditolak karena listener dipakai juga di luar pohon React (callback ticker) dan karena modul singleton sudah terbukti di `sechan-portfolio`.

## 18. Accepted trade-offs

| Trade-off | Benefit | Cost accepted | Why acceptable now | Review trigger |
|---|---|---|---|---|
| Lenis dan state intro sebagai singleton modul | API sederhana untuk semua fitur | sulit diuji di unit test tanpa DOM | logika murni (state intro, boot script) tetap dites | jika butuh lebih dari satu scroll container |
| `scrollRestoration = 'manual'` | intro selalu mulai dari atas | reload tidak kembali ke posisi terakhir | situs satu halaman dengan intro | jika ada halaman panjang tanpa intro |

## 19. Risks

| Risk | Likelihood | Impact | Mitigation or verification |
|---|---|---|---|
| Trigger meleset setelah font atau gambar dimuat | medium | high | `completeIntro()` memanggil refresh; F-003 menambah refresh setelah gambar |
| Konten tersembunyi karena skrip gagal | low | high | fallback boot (tes unit EV-006) |

## 20. Verification plan

| Claim | Evidence method | Environment | Pass condition |
|---|---|---|---|
| Lenis menggerakkan scroll dan ScrollTrigger mengikuti | Browser pane, handle dev | `next dev` | progress trigger sama dengan posisi scroll |
| Kunci menahan wheel dan keyboard tanpa reflow | input asli di Browser pane | `next dev` | scrollY tetap, lebar body sama |
| Fallback boot melepas `html.js` | unit test atas string skrip yang dikirim | `node --test` | kelas dilepas tanpa `data-intro="done"` |
| Reduced motion tidak membuat Lenis | DevTools emulasi media | browser pemilik | tidak ada kelas `lenis` di `html` |

## 21. Impact on global architecture and ADRs

Memakai batas B-002 dan B-003 di `docs/architecture/overview.md`. Tidak ada ADR baru.
