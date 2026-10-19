---
id: F-002
title: "Shell global: sampul, header, slice transition, menu, cursor, footer"
type: verification
status: verification
tier: full
owner: "M Sechan Alfarisi"
created: 2026-10-18
last_updated: 2026-10-18
last_verified: 2026-10-18
requirements: [FR-001, FR-002, FR-003, FR-004, FR-005, FR-006]
supersedes: null
---

# Verification: Shell global

Evidence that acceptance criteria hold at a named commit. A claim without a command and an output excerpt is not evidence. Unrun checks are listed, never omitted.

## Evidence

### EV-001 — Registry kunci scroll dan toolchain (T-001)
- command: `npm test && npm run test:sdd && npm run lint && npm run typecheck && npm run build` (each exit code checked)
- output:
  ```text
  ✔ stays locked until the last owner unlocks (menu open, then slice transition)
  ✔ locking twice by the same owner needs a single unlock
  ✔ unlocking an owner that never locked changes nothing; ✔ listeners hear only the transitions between unlocked and locked; ✔ an unsubscribed listener is not called again; tests 25 pass 0 fail; SDD 34 pass; lint exit 0; typecheck exit 0; build exit 0, static 3/3; dev handle absent from .next/static
  ```
- date: 2026-10-18
- commit: 694c5aa
- covers: [AC-020]

### EV-002 — Kunci bertumpuk diterapkan ke Lenis dan overflow (T-001)
- command: `Browser pane on next dev via window.__bookmateMotion (lockScroll, unlockScroll, scrollLock, lenis)`
- output:
  ```text
  start:              owners []                overflow (empty)  lenis stopped false
  lock menu:          owners [menu]            overflow hidden   lenis stopped true
  lock slice:         owners [menu, slice]     overflow hidden   lenis stopped true; unlock menu:        owners [slice]           overflow hidden   lenis stopped true; unlock slice:       owners []                overflow (empty)  lenis stopped false; unlock slice again: owners []                overflow (empty)  lenis stopped false; setScrollLocked no longer exported
  ```
- date: 2026-10-18
- commit: 694c5aa
- covers: [AC-020]

### EV-003 — Model navigasi dan section halaman (T-002)
- command: `npm test (navigation.test.ts); Browser pane on next dev: main#konten > section ids, data-chapter, headings`
- output:
  ```text
  ✔ chapter ids are unique, lowercase anchors; ✔ the story opens with the prolog and closes with the epilog
  ✔ every chapter has a label, and the header stays short; ✔ chapter numbers follow the story order
  DOM: 10 sections prolog, manifesto, buka, bab, streak, kartu, diskusi, mulai, faq, epilog; data-chapter = id for all;; each section has an h1 or h2; exactly one <main id="konten">
  ```
- date: 2026-10-19
- commit: dda1721
- covers: [AC-021]

### EV-004 — Keputusan sesi di boot script, jendela waktu sampul, toolchain (T-003)
- command: `npm test && npm run test:sdd && npm run lint && npm run typecheck && npm run build` (each exit code checked)
- output:
  ```text
  ✔ plays the sampul on the first load in a tab; ✔ skips the sampul once this tab has seen it
  ✔ blocked sessionStorage still boots and plays the sampul
  ✔ opening starts no earlier than 2.0 s and no later than 4.5 s after navigation start; ✔ the intro reports done before the boot fallback would drop html.js; ✔ the safety net only fires after a normal run would have ended; tests 36 pass 0 fail; SDD 34 pass; lint exit 0; typecheck exit 0; build exit 0, static 3/3; dev handle absent from .next/static; built CSS: .sampul{display:none} and only @media (prefers-reduced-motion:no-preference){html.js[data-sampul=play] .sampul{display:block}}
  ```
- date: 2026-10-19
- commit: dda1721
- covers: [AC-002, AC-003, AC-004]

### EV-005 — Sampul jalur normal (T-003)
- command: `Browser pane on next dev: sessionStorage.clear(), navigate, then gsap.ticker.tick() every 16 ms via window.__bookmateMotion (pane hidden)`
- output:
  ```text
  first sample: data-sampul=play, overlay display block, lock owners [sampul], html overflow hidden, counter 001
  counter 001 -> 032 -> 040 ... 098 -> 099 -> 100 (15 steps)
  timeline start (page already past the window) -> intro done +1.15 s -> data-sampul=done +1.99 s; after: overlay display none, lock owners [], overflow (empty), sessionStorage bm:sampul = 1, html.js kept; halves: translate(-100%) rotateY(14deg) / translate(100%) rotateY(-14deg); spine scale(1, 0); title faded out
  ```
- date: 2026-10-19
- commit: dda1721
- covers: [AC-001, AC-002, AC-020]

### EV-006 — Muat ulang di tab yang sama, hash, dan ticker macet (T-003)
- command: `Browser pane on next dev: location.reload() at /#streak in the same tab; separately a first load left with the ticker stalled`
- output:
  ```text
  reload: data-sampul=skip from boot, overlay display none, left half style untouched (never animated), lock owners [],
  intro done, scrollY 2676 = top of #streak (EC-003)
  stalled ticker (EC-002): boot fallback dropped html.js, safety net ended the sampul: data-sampul=done, overlay none,; lock owners [], intro done, bm:sampul = 1
  ```
- date: 2026-10-19
- commit: dda1721
- covers: [AC-003]

### EV-007 — Skip link, header, dan indikator bab (T-004)
- command: `npm test && npm run test:sdd && npm run lint && npm run typecheck && npm run build` (exit codes checked); Browser pane on next dev with real Tab and Enter keys, gsap.ticker driven by hand
- output:
  ```text
  tests 37 pass (✔ every shell string is filled in); SDD 34 pass; lint, typecheck, build exit 0; dev handle absent from .next/static
  first Tab -> "Lewati ke konten" (175 x 44, top 12 px once focused); Enter -> document.activeElement = MAIN#konten, hash #konten
  next Tab -> "Unduh di Google Play" in the hero (header skipped); header yPercent: top 0, at 80 px 0, down to 700 -> -110, up to 500 -> 0, down to 1200 -> -110,; focus a header link -> 0, scroll down while focused -> 0, blur then down -> -110; indicator at each section centre: 01 Prolog, 02 Manifesto, 03 Buka aplikasinya, 04 Bab 01 sampai 05, 05 Api streak,; 06 Kartu pembaca, 07 Ruang diskusi, 08 Cara mulai, 09 Pertanyaan, 10 Epilog; aria-current=location on Fitur, Streak,; Lencana, Komunitas, FAQ at their chapters; back at top -> 01 Prolog; 1440 px: nav and indicator shown; 360 px: hidden (menu comes in T-006), no horizontal overflow; header targets at 1024 px: BookMate 95x44, Fitur 54x44, Streak 66x44, Lencana 80x44, Komunitas 93x44, FAQ 51x44, Unduh 84x44
  ```
- date: 2026-10-19
- commit: 004b251
- covers: [AC-005, AC-006, AC-007]

### EV-008 — Slice transition, fokus, dan hash (T-005)
- command: `npm test && npm run test:sdd && npm run lint && npm run typecheck && npm run build` (exit codes checked); Browser pane on next dev at 1440 px: real click on header "Streak", dispatched clicks for the rest, gsap.ticker driven by hand
- output:
  ```text
  ✔ a plain left click on an in-page link travels to that section; ✔ new-tab clicks, other buttons, and handled events stay native
  ✔ opted-out links, bare hashes, and other pages stay native; ✔ encoded ids are decoded and malformed ones are ignored
  tests 41 pass; SDD 34 pass; lint, typecheck, build exit 0; dev handle absent from .next/static; click Streak: overlay on, lock owners [slice], label "05 — Api streak"; strips 100 -> 0 staggered (first 0, last 16 at 485 ms); covered at ~1010 ms: scrollY 0 -> 2751, hash #streak; strips 0 -> -100; overlay hidden, lock owners [] at 1675 ms; second click to #faq at 206 ms ignored; final hash #streak, focus H2 "Api streak", indicator "05 — Api streak"; after cache-cleared restart: #kartu (down) and #bab (up) land 72 px below the viewport top (= scroll-margin-top);; going up the header bottom is 69 px, so the section is not covered; focus on each section heading; skip link: click not prevented by the slice handler, overlay opacity 0, no lock
  ```
- date: 2026-10-19
- commit: 5093b04
- covers: [AC-009, AC-010, AC-011]

### EV-009 — Menu mobile (T-006)
- command: `npm test && npm run lint && npm run typecheck && npm run build` (exit codes checked); Browser pane on next dev at 360 px: menu opened with button.click(), real Tab, Shift+Tab, Escape; gsap.ticker driven by hand
- output:
  ```text
  tests 41 pass; lint, typecheck, build exit 0; panel portalled to <body>; focus stays on <body> after load
  open: aria-expanded true, lock owners [menu], focus on first link "04 Fitur"
  Tab x4 -> "09 FAQ" (last); Tab -> "Tutup" (wraps inside the dialog); Shift+Tab -> "09 FAQ"; Escape: aria-expanded false, panel hidden, owners [], overflow (empty), focus back on BUTTON "Menu"; menu link #diskusi: owners menu+slice (menu open) -> slice (menu closed behind the strips) -> none;; focus on "Ruang diskusi", hash #diskusi, section 72 px below the top; EC-005: at 1024 px a resize event closes the menu and releases the lock (the pane's emulated resize alone fires no; event while rendering is paused, so the event was dispatched by hand)
  ```
- date: 2026-10-19
- commit: fa3d7d2
- covers: [AC-012, AC-013, AC-020]

### EV-010 — Custom cursor dan magnetic (T-007)
- command: `npm test && npm run lint && npm run typecheck && npm run build` (exit codes checked); Browser pane: synthetic mouse and touch PointerEvents on real elements, gsap.ticker driven by hand (next dev); computed styles on next start
- output:
  ```text
  tests 41 pass; lint, typecheck, build exit 0; dev handle absent from .next/static
  (pointer: fine) and motion allowed; before any move: dot and ring opacity 0 (next start: visibility hidden)
  move over h1 to (300, 400): dot (300, 400), ring (297, 396) after 80 ms then (300, 400), state idle, native cursor untouched; over a header link: state link; next start computed ring circle transform matrix(1.6, 0, 0, 1.6, 0, 0), idle none; over the hero CTA: state label, pill opacity 1 with text "Unduh", ring opacity 0; pointerleave on the document: dot and ring opacity 0; pointerType touch: ignored, cursor stays where the last mouse event put it; magnetic CTA, pointer 40 px right of centre: element x 12 px (0.3 x 40), steady over 1.6 s; pointerleave -> 0, 0
  ```
- date: 2026-10-19
- commit: a3c71bf
- covers: [AC-014, AC-015, AC-016]

### EV-011 — Footer reveal (T-008)
- command: `npm test && npm run lint && npm run typecheck && npm run build` (exit codes checked); Browser pane on next start at 1440, 768, 360 px
- output:
  ```text
  tests 41 pass; lint, typecheck, build exit 0; prerendered HTML contains the footer credit "Dibuat oleh Mangcoding"
  footer position sticky, z 0; page layer z 10; 400 px before the end the layer still covers it (layer bottom 604 > footer top 205)
  at the end the layer stops at 205 = footer top, footer bottom 900 = viewport; footer links last in tab order; 360 px fits one screen
  ```
- date: 2026-10-19
- commit: uncommitted on feat/F-002-shell-global (base a3c71bf)
- covers: [AC-018, AC-019]

### EV-012 — Integrasi shell (T-009)
- command: `npm test && npm run test:sdd && npm run lint && npm run typecheck && npm run build && npm run context:validate -- --strict`; Browser pane on next start
- output:
  ```text
  tests 41 pass; SDD 34 pass; lint, typecheck, build exit 0; context validation passed strict; no console errors on next start
  768 and 360 px: no horizontal overflow; reload in the same tab: data-sampul=skip, intro done
  per-feature evidence: sampul EV-004 to EV-006, header EV-007, slice EV-008, menu EV-009, cursor EV-010, footer EV-011
  ```
- date: 2026-10-19
- commit: uncommitted on feat/F-002-shell-global (base a3c71bf)
- covers: [AC-001, AC-005, AC-009, AC-018]

## Coverage

| Criterion | Evidence | Result |
|---|---|---|
| AC-001 | EV-005 | pass (logika; tampil sejak paint pertama dijamin aturan CSS di EV-004) |
| AC-002 | EV-004, EV-005 | pass (jendela 2,0 sampai 4,5 s dites di unit; di dev halaman sudah lewat jendela sehingga sampul langsung terbuka) |
| AC-003 | EV-004, EV-006 | pass |
| AC-004 | EV-004 | pass untuk tanpa JS lewat aturan CSS; reduced motion menunggu cek pemilik |
| AC-020 | EV-001, EV-002, EV-005, EV-009 | pass, termasuk alur menu lalu slice end-to-end |
| AC-021 | EV-003 | pass |
| AC-005, AC-006, AC-007 | EV-007 | pass |
| AC-008 | none | not_run (reduced motion, cek pemilik; secara kode logika sembunyi hanya ada di cabang `MOTION_OK`) |
| AC-009, AC-010, AC-011 | EV-008 | pass (AC-010 jalur reduced motion lewat kode: lompat langsung lalu fokus; cek pemilik) |
| AC-012, AC-013 | EV-009 | pass |
| AC-014, AC-015, AC-016 | EV-010 | pass |
| AC-017 | none | not_run (layar sentuh nyata dan reduced motion; secara kode efek hanya di POINTER_MOTION dan event touch diabaikan) |
| AC-018, AC-019 | EV-011, EV-012 | pass (AC-019 tanpa JS dari CSS sticky murni; reduced motion tidak mengubah footer) |

## Not run

- Kesan gerak sampul (counter, judul naik, sampul terbelah) dan rentang 2,0 detik minimum di build produksi belum dilihat langsung: Browser pane tersembunyi, jadi timeline digerakkan ticker manual dan halaman dev sudah lewat jendela waktu saat diukur. Cek pemilik di `next start`, tab baru.
- Reduced motion (AC-004): Browser pane tidak bisa mengemulasikan media query; cek pemilik di DevTools Rendering.
- Pengaruh kunci pada wheel dan keyboard asli tidak diuji ulang karena pane tersembunyi; penerapannya sama dengan F-001 EV-007.
- Kunci yang diambil sampul sebelum Lenis dibuat: pemilik `sampul` dan `overflow: hidden` terbukti (EV-005), tetapi `lenis.isStopped` tidak dicatat pada sampel itu.
