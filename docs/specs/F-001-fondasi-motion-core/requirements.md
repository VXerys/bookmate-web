---
id: F-001
title: "Fondasi dan motion core"
type: requirements
status: implementing
tier: full
owner: "M Sechan Alfarisi"
created: 2026-10-16
last_updated: 2026-10-16
last_verified: 2026-10-16
supersedes: null
---

# Requirements: Fondasi dan motion core

## Problem

Semua section situs bergantung pada hal yang sama: token warna dan font, satu engine animasi, smooth scroll yang sinkron dengan ScrollTrigger, jalur reduced motion, dan konten yang tetap terbaca tanpa JavaScript. Jika fondasi ini dibuat per section, setiap section akan punya bug sinkronisasi dan aksesibilitas sendiri.

## Goal

Satu fondasi yang dipakai semua fitur berikutnya: toolchain hijau, token sesuai art direction, Lenis + GSAP tersinkron, dan primitive reveal teks yang aksesibel.

## Non-goals

- Preloader, header, cursor, slice transition (F-002).
- Konten section apa pun selain halaman uji fondasi.

## Functional requirements

### FR-001 — Toolchain dan sumber fakta merek

Proyek harus lolos lint, typecheck, test, dan build dengan stack di `docs/steering/tech.md`, dan fakta merek hanya berasal dari `src/content/site.ts`.

- AC-001: Given checkout bersih, when `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` dijalankan, then semuanya keluar dengan kode 0.
- AC-002: Given `src/content/site.ts`, when test konten berjalan, then tautan Google Play memakai package id produksi dan semua field merek terisi.

### FR-002 — Token desain dan tipografi

Situs harus menyediakan token palet dan tiga keluarga font dari `docs/product/art-direction.md` sebagai utility Tailwind.

- AC-003: Given token di `@theme`, when komponen memakai `bg-paper`, `text-ink`, `bg-ember`, `font-serif`, `font-sans`, `font-mono`, then nilai sesuai tabel art direction.
- AC-004: Given setiap pasangan teks dan latar yang diizinkan, when test kontras berjalan, then rasionya minimal 4,5:1 untuk teks normal dan 3:1 untuk teks besar.
- AC-005: Given halaman dimuat, when font web selesai dimuat, then CLS di Lighthouse di bawah 0,1.

### FR-003 — Smooth scroll dan hub motion

Situs harus menjalankan Lenis yang digerakkan ticker GSAP dan memperbarui ScrollTrigger, serta menyediakan API kunci dan lompat scroll.

- AC-006: Given motion diizinkan, when halaman dimuat, then satu instance Lenis berjalan dan `ScrollTrigger.update` dipanggil pada setiap event scroll Lenis.
- AC-007: Given `prefers-reduced-motion: reduce`, when halaman dimuat, then Lenis tidak dibuat dan scroll native berjalan.
- AC-008: Given scroll dikunci lewat API, when pengguna memakai wheel, sentuh, atau keyboard, then halaman tidak bergulir sampai kunci dilepas, dan layout tidak bergeser karena scrollbar.

### FR-004 — Progressive enhancement

Konten harus terlihat tanpa JavaScript dan tidak boleh terjebak tersembunyi jika skrip gagal.

- AC-009: Given JavaScript dimatikan, when halaman dimuat, then semua teks dan gambar terlihat.
- AC-010: Given skrip boot berjalan tetapi intro tidak pernah menandai selesai dalam 6 detik, when batas waktu lewat, then kelas `js` dilepas dan konten terlihat.

### FR-005 — Primitive reveal teks

Situs harus menyediakan komponen reveal judul per baris dan kata yang aksesibel.

- AC-011: Given motion diizinkan, when judul masuk viewport, then baris muncul dari balik mask dengan stagger dan hanya sekali.
- AC-012: Given screen reader, when membaca judul yang di-split, then teks utuh dibacakan satu kali.
- AC-013: Given reduced motion, when judul masuk viewport, then teks langsung tampil tanpa animasi.

### FR-006 — CI

- AC-014: Given pull request ke `main`, when CI berjalan, then lint, typecheck, test konten, test SDD, build, dan `context:validate --strict` dijalankan dan gagal jika salah satu gagal.

## Dependencies, scope, and open questions

- Dependency yang disetujui pemilik (2026-10-16): `gsap`, `@gsap/react`, `lenis`. Tidak ada dependency lain.
- Out of scope: halaman legal, metadata SEO lengkap, deploy. Tidak ada assumption yang memblokir F-001.
