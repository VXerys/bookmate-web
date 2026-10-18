---
id: F-002
title: "Shell global: sampul, header, slice transition, menu, cursor, footer"
type: design
status: implementing
tier: full
owner: "M Sechan Alfarisi"
created: 2026-10-18
last_updated: 2026-10-18
last_verified: 2026-10-18
requirements: [FR-001, FR-002, FR-003, FR-004, FR-005, FR-006]
supersedes: null
---

# Design: Shell global

## Summary

Shell dibangun di atas API F-001 dan pola `sechan-portfolio` (intro, slice transition, cursor, magnetic), dengan dua perubahan arsitektur dari `system-architecture.md`: kunci scroll per pemilik, dan keputusan sampul di boot script. Semua teks shell berasal dari `src/content/`.

## Current state

Dari F-001 (`3f9a8db`): `smooth-scroll.tsx` (Lenis, `setScrollLocked(boolean)`, `jumpToTarget`), `intro-gate.tsx` (`completeIntro()` saat `fonts.ready`), `boot-script.ts` (+ test), `Reveal`, token dan font. Belum ada pemanggil `setScrollLocked` di luar handle dev.

## Component changes

| Component or path | Change | Responsibility after change |
|---|---|---|
| `src/lib/motion/scroll-lock.ts` | baru: `createScrollLock()` dengan `lock(owner)`, `unlock(owner)`, `isLocked()`, `subscribe(fn)` + test | registry kunci murni |
| `src/components/motion/smooth-scroll.tsx` | `setScrollLocked` diganti `lockScroll(owner)`, `unlockScroll(owner)` yang menerapkan registry ke Lenis dan `overflow` | satu penerap kunci |
| `src/lib/motion/boot-script.ts` | tambah: baca `sessionStorage["bm:sampul"]` dalam `try`, set `data-sampul="skip"` atau `"play"` + test | keputusan sampul sebelum paint |
| `src/content/navigation.ts` | baru: daftar bab `{ id, label, number, inNav }` + test (id unik, cocok pola `[a-z-]+`) | sumber label bab dan tautan |
| `src/components/motion/sampul.tsx` | baru, menggantikan `intro-gate.tsx`: overlay dua belahan, counter, batas 2,0 sampai 4,5 s, `completeIntro()`; jalur lewati memakai `fonts.ready` | satu-satunya pemanggil `completeIntro()` |
| `src/components/motion/slice-transition.tsx` | baru: overlay 5 irisan + label, `navigateTo(id)`, flag `busy`, delegasi klik `a[href^="#"]`, `focusSection(id)`, `history.pushState` | navigasi antar bab |
| `src/components/site/skip-link.tsx` | baru: "Lewati ke konten" ke `#konten` | AC-005 |
| `src/components/site/header.tsx` | baru (client): wordmark, tautan bab, CTA magnetis, indikator bab, sembunyi saat scroll turun | AC-006 sampai AC-008 |
| `src/components/site/menu.tsx` | baru (client): tombol "Menu", panel curtain, focus trap, Esc, tutup saat lebar ≥ 768 px | AC-012, AC-013 |
| `src/components/motion/cursor.tsx` | baru: titik + cincin `quickTo`, state lewat `data-cursor` dan `data-cursor-label` | AC-014, AC-015 |
| `src/components/motion/magnetic.tsx` | baru: pembungkus magnetis, kekuatan 0,3, `elastic.out` | AC-016 |
| `src/components/site/footer.tsx` | baru: footer `sticky bottom-0` di belakang konten, wordmark, Google Play, kredit | AC-018, AC-019 |
| `src/app/layout.tsx` | mount shell; `<main id="konten">` dibungkus lapisan `relative z-10 bg-paper` di atas footer | komposisi |
| `src/app/page.tsx` | section stub ber-id dari `navigation.ts` untuk menguji navigasi | halaman uji, diganti F-003 |
| `src/app/globals.css` | aturan tampil sampul (`html.js[data-sampul="play"]` + `no-preference`), gaya irisan, cursor | CSS shell |

## Flow

```text
<head> boot script -> html.js, data-sampul
layout: SkipLink, Header (+Menu), SliceTransition, Cursor, Sampul, SmoothScroll, grain
  main#konten (z-10, bg-paper) -> sections [data-chapter]
  Footer (sticky bottom-0, z-0)
```

## Data and state

- Kunci scroll: himpunan pemilik di `scroll-lock.ts`; `smooth-scroll.tsx` berlangganan dan menerapkan.
- Status transisi: `busy` di modul slice. Status menu: state React lokal di `menu.tsx`.
- Sesi sampul: `sessionStorage["bm:sampul"] = "1"` setelah sampul selesai.

## Error handling and security

| Failure | Detection | Handling | User or system result |
|---|---|---|---|
| Sampul tidak selesai | timeout `setTimeout` 4,5 s | buka paksa, `completeIntro()` | konten terlihat |
| `sessionStorage` dilarang | `try/catch` di boot script dan sampul | anggap `play` | sampul diputar setiap muat |
| Target `#id` tidak ada | `document.getElementById` null | biarkan perilaku tautan bawaan | tidak ada overlay macet |
| Unmount saat terkunci | cleanup `useEffect` | `unlockScroll(owner)` | scroll tidak tertinggal terkunci |

## Testing

| Requirement or risk | Test | Layer |
|---|---|---|
| EC-001 | `src/lib/motion/scroll-lock.test.ts` | unit |
| AC-003, AC-004, EC-004 | `src/lib/motion/boot-script.test.ts` (data-sampul, sessionStorage melempar) | unit |
| BR-001 | `src/content/navigation.test.ts` | unit |
| AC-001, AC-002, AC-005 sampai AC-019 | Browser pane (`next start`, handle dev untuk kunci dan fokus), keyboard asli | manual |
| kesan gerak | pemilik di browser terlihat | manual |

## Out of scope

- Konten section, halaman legal, dan tautan ke halaman yang belum ada.
