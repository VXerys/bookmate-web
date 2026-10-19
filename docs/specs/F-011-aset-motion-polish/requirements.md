---
id: F-011
title: "Screenshot sementara dan perbaikan bug animasi"
type: requirements
status: verification
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
supersedes: null
---

# Requirements: Screenshot sementara dan perbaikan bug animasi

## Problem

Mockup perangkat masih bingkai kosong berlabel, dan audit di Browser pane menemukan bug gerak: indikator bab dan batas scroll Lenis dihitung tanpa pin spacer, deal kartu menggeser layout, statement Buka tertutup ponsel, tombol magnetik bergoyang.

## Goal

Mockup berisi screenshot asli app (sementara), dan setiap efek gerak dari F-001 sampai F-007 berjalan tanpa lompatan layout atau posisi trigger yang basi.

## Non-goals

- Screenshot bersih dari build produksi (A-002 tetap open).
- Efek baru di luar katalog art-direction.md; WebGL tetap F-009.

## Functional requirements

### FR-001 — Screenshot di mockup

Setiap bingkai ponsel harus menampilkan screenshot app lewat next/image dengan alt yang menjelaskan isi layar, dan asal setiap file tercatat di public/CREDITS.md.

- AC-001: Given halaman /, when dimuat, then Prolog, Buka, lima panel Bab, dan Cara mulai menampilkan screenshot, bukan label kosong.
- AC-002: Given screenshot, then setiap bingkai non-dekoratif punya alt lebih dari 20 karakter dan setiap file tercatat di CREDITS.md beserta daftar hal yang harus diganti.

### FR-002 — Posisi scroll yang benar

Indikator bab, tautan menu, dan trigger setelah pin harus memakai posisi yang sudah memperhitungkan pin spacer.

- AC-003: Given pin Manifesto, Buka, Bab, dan Streak, when trigger di-refresh lagi, then tidak ada start atau end yang berubah (urutan sudah benar).
- AC-004: Given tautan menu ke Lencana, Streak, Komunitas, FAQ, atau Fitur, when diklik, then section tiba di bawah header (72 px) atau di awal pin (0 px), dan indikator menampilkan bab tersebut.
- AC-005: Given deal kartu, when berjalan, then tinggi dokumen tidak berubah.

### FR-003 — Kualitas gerak

Gerak harus halus dan terbaca: tidak ada ease elastic pada pointer, scrub punya smoothing, dan komposisi tidak menutupi teks penting.

- AC-006: Given Buka, when pin dimulai, then kalimat terbaca utuh di atas dan bawah ponsel; when berakhir, then ponsel mengisi sekitar 90% tinggi viewport.
- AC-007: Given tombol magnetik, cursor, dan marquee, then magnetik memakai power3, cursor membaca ulang target saat scroll, dan kecepatan marquee kembali ke 1 setelah scroll berhenti.

## Dependencies, scope, and open questions

- Screenshot berisi sampul buku komersial, nama dan foto pemilik, avatar anggota, dan nama lawan chat: pengecualian sementara atas instruksi pemilik 2026-10-19; wajib diganti sebelum rilis (A-002).
- Bab 02 memakai Beranda karena belum ada screenshot kalender streak.
