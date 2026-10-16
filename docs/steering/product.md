---
inclusion: always          # always | fileMatch | manual
---

# Product

Short, always-loaded product context. The full product requirements live in `docs/product/prd.md`; this file must agree with it and stays under 120 lines. Visual and motion direction: `docs/product/art-direction.md`.

## Vision

BookMate Web adalah situs pemasaran untuk aplikasi BookMate yang mengajak pembaca Indonesia bergabung ke klub baca komunitas lewat pengalaman scroll yang sinematik, lalu mengunduh aplikasinya dari Google Play.

BookMate (Android, v1.1.0, publisher Mangcoding) belum punya website. Situs ini menjelaskan pivot v1.1.0 ke klub baca komunitas dalam satu halaman yang terasa seperti membaca buku bersama, lalu mengarahkan ke Google Play. "Berhasil" berarti pengunjung paham lima kemampuan inti dan menekan tombol unduh. Project content (specs, product docs, UI copy) is written in Indonesian; the framework text stays English.

## Personas

- Calon pembaca: 18 sampai 30 tahun, ponsel Android, datang dari tautan media sosial; ingin kebiasaan membaca yang konsisten dan teman baca.
- Pengelola komunitas baca: admin klub kampus atau lokal yang menilai apakah BookMate cocok untuk anggotanya, sering membuka dari desktop.
- Pengguna lama: mencari kebijakan privasi atau cara hapus akun.

## Core use cases

- UC-001: calon pembaca membuka situs dari ponsel, scroll sampai akhir, menekan "Unduh di Google Play".
- UC-002: pengelola komunitas membaca bab Komunitas dan Pinjam di desktop, memindai QR untuk memasang app.
- UC-003: pengguna lama membuka `/hapus-akun` dan menemukan langkah penghapusan akun.

## Non-goals

- Login, akun, katalog buku, atau data pengguna di website.
- E-reader atau branding "Tabaca" sampai rebranding disetujui (A-001).
- Blog, CMS, dan multi-bahasa di rilis pertama.
- Promosi iOS sebelum ada rilis App Store.

## Success signals

| Signal | What it tells us | Source |
|---|---|---|
| Klik CTA "Unduh di Google Play" | situs mengonversi | analytics yang dipilih di F-008 (A-007) |
| Lighthouse mobile Performance ≥ 85, Accessibility ≥ 95 | motion tidak mengorbankan kualitas | Lighthouse pada build produksi |
| LCP < 2,5 s, CLS < 0,1 | first viewport cepat dan stabil | Lighthouse |

## Constraints that shape product decisions

- Fakta produk hanya dari repo app `bookmeet` (fitur, warna, font, tagline). Tidak ada angka unduhan, rating, testimoni, atau logo mitra tanpa bukti terverifikasi.
- Nama, tagline, dan tautan toko hanya dibaca dari `src/content/site.ts`, karena rebranding masih terbuka (A-001).
- UI copy Bahasa Indonesia, sapaan "kamu", hangat dan santai.
- Tidak memakai sampul buku komersial asli; screenshot app harus asli dari build produksi (A-002).
