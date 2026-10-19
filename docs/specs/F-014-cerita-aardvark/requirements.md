---
id: F-014
title: "Cerita BookMate dengan aset asli"
type: requirements
status: implementing
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
supersedes: F-013
---

# Requirements: Cerita BookMate dengan aset asli

## Problem

Pemilik menilai F-013 masih jelek dan tanpa alur cerita: ilustrasi digambar sendiri dengan path SVG, sampul buku tipografis palsu, dua slider berurutan, dan section yang terasa seperti daftar fitur. Rekaman REA atas aardvarkbookclub.com menunjukkan kekuatannya ada pada aset asli (render 3D, sampul, ilustrasi orang) dan elemen SVG grafis yang hidup.

## Goal

Halaman / bercerita dalam satu alur (temukan, pinjam, baca, diskusi, rayakan, mulai) memakai aset asli dari repo app BookMate, dengan elemen SVG grafis beranimasi penuh di setiap section dan ritme visual Aardvark.

## Non-goals

- Ilustrasi orang atau benda yang digambar sendiri dengan path SVG (build-awwwards-quality-sites).
- Dependency npm baru; MorphSVG ada di paket gsap.
- Rilis: sampul komersial dan screenshot sementara tetap memblokir rilis.

## Functional requirements

### FR-001 — Aset asli app

Situs harus memakai sampul buku, lencana tarot, memoji, sampul komunitas, dan ilustrasi dari repo app bookmeet, dioptimasi untuk web, dengan asal setiap file di public/CREDITS.md.

- AC-001: Given rak buku, then 10 dari 18 buku mock yang punya sampul lokal tampil dengan sampul aslinya, warna kartu dari warna dominan sampul, dan teks kartu lolos kontras AA. (Diubah pemilik 2026-10-19: 18 kartu terlalu lama di-scroll.)
- AC-002: Given section lencana dan komunitas, then gambarnya berasal dari aset app (tarot tier IV dan V, memoji, sampul komunitas); given section cara pinjam, then setiap langkah memakai ikon antarmuka SVG beranimasi, bukan ilustrasi orang. (Diubah pemilik 2026-10-19: minta ikon SVG animasi untuk empat kartu, dan hanya lencana tier IV/V.)

### FR-002 — Alur cerita

Section harus tersusun sebagai satu cerita: hero, rak bulan ini, cara pinjam, aplikasi di saku, pilih fitur, kenapa BookMate, komunitas, pita promo, lencana, FAQ, penutup.

- AC-003: Given urutan section, then setiap section punya judul yang melanjutkan section sebelumnya dan tautan header membawa ke bab yang benar.

### FR-003 — SVG grafis beranimasi

Setiap section harus punya elemen SVG grafis yang hidup: gelombang yang berubah bentuk, teks di lingkaran dan kurva, starburst, pita diagonal berjalan, blob bernapas; semuanya dengan cabang reduced motion.

- AC-004: Given motion diizinkan, then gelombang hero berubah bentuk, teks melingkar berputar, teks kurva bergeser mengikuti scroll, pita berjalan, dan starburst berputar.
- AC-005: Given reduced motion atau tanpa JS, then semua elemen tampil diam dalam keadaan akhir dan konten terbaca.

### FR-004 — Kualitas

Halaman harus lulus lint, typecheck, test, build, tanpa overflow horizontal dan tanpa error console di 1440 dan 375 px, diverifikasi dengan rekaman browser.

- AC-006: Given build produksi, then rekaman REA di 1440 dan 375 px tidak menunjukkan overflow, elemen tumpang yang tidak disengaja, atau error console.

## Dependencies, scope, and open questions

- Instruksi pemilik 2026-10-19: pakai sampul buku dari data mock dan aset app; pengecualian atas aturan sampul komersial, dicatat sebagai pemblokir rilis (A-002).
- Tiga penulis di mock app tidak cocok dengan sampulnya; situs memakai nama di sampul dan mencatat selisihnya.
- Menggantikan F-013 untuk lapisan section.
- Instruksi pemilik 2026-10-19: animasi pembuka diputar di setiap load dan reload (reload memakai versi singkat sekitar 1 detik). Ini menggantikan perilaku F-002 AC-003 yang melewati sampul setelah tampil sekali per tab.
