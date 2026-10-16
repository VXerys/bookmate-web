---
id: F-001
title: "Fondasi dan motion core"
type: design
status: implementing
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-16
last_updated: 2026-10-16
last_verified: 2026-10-16
requirements: [FR-001, FR-002, FR-003, FR-004, FR-005, FR-006]
supersedes: null
---

# Design: Fondasi dan motion core

## Summary

Mengikuti arsitektur motion `sechan-portfolio` yang sudah terbukti: satu hub plugin GSAP, Lenis sebagai singleton modul yang digerakkan `gsap.ticker`, state intro pub-sub kecil, dan boot script `html.js`. Token dan font mengikuti `docs/product/art-direction.md`. Logika murni (kontras, state intro) ditulis tanpa React agar bisa dites dengan `node --test`.

## Current state

T-001 selesai: Next 16.4.2, React 19.3, Tailwind v4 lewat `@tailwindcss/turbopack`, GSAP 3.15, `@gsap/react`, Lenis 1.3 terpasang; `src/content/site.ts` dan tesnya ada; `src/app/page.tsx` masih halaman uji polos.

## Component changes

| Component or path | Change | Responsibility after change |
|---|---|---|
| `src/app/globals.css` | `@theme` palet, font, ease; base, `.grain`, fokus, blok reduced motion, CSS Lenis | token dan gaya dasar |
| `src/app/layout.tsx` | `next/font/google` Newsreader, Inter, JetBrains Mono; boot script; `<SmoothScroll/>` | shell root |
| `src/lib/motion/gsap.ts` | baru: register ScrollTrigger, SplitText, Flip, ScrambleText, `useGSAP`; ekspor `MOTION_OK`, `DESKTOP_MOTION`, `POINTER_FINE`, `EASE_OUT` | satu-satunya pintu masuk GSAP |
| `src/lib/motion/intro-state.ts` | baru: `finishIntro()`, `whenIntroDone(cb)` | sinyal intro selesai |
| `src/lib/color/contrast.ts` | baru: rasio kontras WCAG murni | dipakai test token |
| `src/content/palette.ts` | baru: hex token + pasangan teks/latar yang diizinkan | sumber data test kontras |
| `src/components/motion/smooth-scroll.tsx` | baru: Lenis singleton, `setScrollLocked`, `scrollToTarget`, `jumpToTarget` | smooth scroll |
| `src/components/motion/reveal.tsx` | baru: SplitText `mask: "lines"`, `aria: "auto"`, `autoSplit` | reveal judul |
| `.github/workflows/context-integrity.yml` | ganti workflow template dengan CI proyek | gerbang PR |

## Flow

```text
boot script (html.js, scrollRestoration manual, fallback 6 s)
  -> SmoothScroll: matchMedia(MOTION_OK)? new Lenis -> lenis.on(scroll, ScrollTrigger.update) -> gsap.ticker.add(raf)
  -> section useGSAP: gsap.matchMedia() -> ScrollTrigger / SplitText
  -> finishIntro() (F-002) -> ScrollTrigger.refresh()
```

## Data and state

- Tidak ada data store. Token hex disimpan sekali di `src/content/palette.ts` dan disalin ke `@theme`; test memastikan keduanya sama.
- State Lenis: modul singleton; `lockedBeforeStart` agar kunci yang diminta sebelum Lenis siap tetap berlaku.

## Error handling and security

| Failure | Detection | Handling | User or system result |
|---|---|---|---|
| Skrip gagal sebelum intro | fallback 6 s di boot script | lepas `html.js` | konten terlihat tanpa animasi |
| Font lambat | `document.fonts.ready` | `ScrollTrigger.refresh()` setelahnya | trigger tidak meleset |
| Reduced motion | `matchMedia` | Lenis tidak dibuat, tween langsung ke state akhir | konten statis lengkap |

Boot script inline tidak membaca input pengguna; tidak ada data sensitif.

## Testing

| Requirement or risk | Test | Layer |
|---|---|---|
| AC-002 | `src/content/site.test.ts` | unit |
| AC-003, AC-004 | `src/content/palette.test.ts`, `src/lib/color/contrast.test.ts` | unit |
| AC-010 | `src/lib/motion/intro-state.test.ts` (urutan callback) + cek manual tanpa JS | unit, manual |
| AC-005 to AC-009, AC-011 to AC-013 | Browser pane: desktop, mobile, emulasi reduced motion, JS dimatikan | manual |

## Out of scope

- Intro visual (sampul), cursor, header: F-002.
