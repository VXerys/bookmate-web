---
id: PRODUCT-ROADMAP
title: Product Roadmap
status: review
owner: "M Sechan Alfarisi"
last_updated: "2026-10-16"
---

# Product Roadmap

Strategic capability order, release intent, and dependency rationale. Not the execution board: task status belongs in each feature's `tasks.md`, and the context views are rendered from it.

Prinsip urutan: fondasi motion dulu (sekali benar, dipakai semua section), lalu shell global yang menentukan rasa situs, baru section cerita, lalu momen signature, terakhir legal, SEO, dan audit. Spec ditulis per fitur saat fitur itu dimulai, bukan sekaligus di awal. Satu fitur, satu branch `feat/F-XXX-nama`, satu PR ke `main`.

## Releases and milestones

### M1 — Fondasi dan shell global

- Outcome: halaman kosong yang sudah terasa "BookMate": token, font, smooth scroll, preloader sampul, header, cursor, slice transition, footer reveal, semuanya dengan jalur reduced motion.
- Capabilities:
  - F-001 Fondasi dan motion core: toolchain, token `@theme`, font, hub plugin GSAP, Lenis tersinkron ticker, `intro-state`, boot script `html.js`, model konten, CI.
  - F-002 Shell global: preloader sampul (counter + curtain wipe terbelah), header + indikator bab + menu mobile curtain, slice transition, custom cursor trailing + magnetic, grain, footer reveal.
- Dependencies: A-002 tidak memblokir (shell tidak butuh screenshot).
- Excluded: konten section, gambar app.
- Exit criteria: lint, typecheck, test, build hijau; intro, cursor, dan slice berjalan di desktop; reduced motion menampilkan state akhir; tidak ada overlay di mode tanpa JavaScript.

### M2 — Cerita utama

- Outcome: pengunjung paham apa itu BookMate dan lima kemampuannya.
- Capabilities:
  - F-003 Prolog (hero): headline split reveal, mockup ponsel, kartu dan chip melayang dengan parallax mouse + scroll, CTA magnetic.
  - F-004 Manifesto dan buka aplikasi: paragraf ter-pin dengan scrub text fill; scroll-linked scale bingkai ponsel ke full-bleed.
  - F-005 Bab horizontal: lima bab dalam track horizontal ter-pin, warna latar per bab, parallax dalam track, fallback vertikal di bawah 1024px.
- Dependencies: A-002 (screenshot asli) memblokir F-003 sampai F-005 untuk aset final; layout boleh jalan dengan bingkai kosong berlabel.
- Excluded: streak, tarot, komunitas.
- Exit criteria: alur dari Sampul sampai Bab 05 utuh di 360, 768, 1024, 1440 px; LCP hero < 2,5 s di Lighthouse mobile.

### M3 — Momen signature dan konversi

- Outcome: dua momen yang diingat (streak dan dek tarot) dan jalur jelas ke unduhan.
- Capabilities:
  - F-006 Streak dan kartu pembaca: kalender 30 hari terisi oleh scroll, counter; dek tarot dibagikan dengan Flip, hover liquid (SVG) + tilt, klik membalik kartu.
  - F-007 Diskusi, cara mulai, FAQ, epilog: sticky card stack, velocity marquee kategori, garis progres langkah, accordion FAQ, CTA akhir dengan QR.
- Dependencies: A-003 (izin dan daftar lencana) untuk F-006; A-006 (tautan komunitas WhatsApp) untuk F-007.
- Excluded: WebGL.
- Exit criteria: semua section ada; setiap section punya jalur ke CTA; marquee dan kartu berhenti di luar viewport.

### M4 — Legal, SEO, polish, rilis

- Outcome: situs siap dipublikasikan dan ditautkan dari Play Console.
- Capabilities:
  - F-008 Legal dan SEO: `/kebijakan-privasi`, `/hapus-akun`, metadata, gambar OG, `sitemap.xml`, `robots.txt`, JSON-LD `MobileApplication`, analytics ringan.
  - F-009 WebGL hover (opsional): shader displacement untuk kartu tarot dan gambar bab, hanya jika ADR-0002 disetujui; fallback SVG tetap ada.
  - F-010 QA dan rilis: audit performa, aksesibilitas (keyboard, fokus, kontras, screen reader), reduced motion, Safari/Firefox/Chrome, perangkat Android kelas menengah; deploy Vercel dan domain dengan persetujuan pemilik.
- Dependencies: A-004 (domain dan hosting), A-005 (isi kebijakan privasi), A-007 (analytics).
- Excluded: blog, multi-bahasa.
- Exit criteria: target Lighthouse di PRD tercapai; deploy produksi disetujui pemilik.

## Capability ordering

| Capability | Why now | Depends on | Intended milestone |
|---|---|---|---|
| F-001 | semua efek bergantung pada hub GSAP, Lenis, dan jalur reduced motion | none | M1 |
| F-002 | shell menentukan rasa situs dan dipakai setiap section | F-001 | M1 |
| F-003 | first viewport adalah momen terkuat | F-002 | M2 |
| F-004 | menjembatani hero ke bab | F-002 | M2 |
| F-005 | inti penjelasan produk | F-002 | M2 |
| F-006 | pembeda emosional (kebiasaan, gamifikasi) | F-002, A-003 | M3 |
| F-007 | konversi dan jawaban keberatan | F-002, A-006 | M3 |
| F-008 | syarat publikasi dan Play Console | F-001, A-005 | M4 |
| F-009 | polish opsional, biaya bundle | F-006, ADR-0002 | M4 |
| F-010 | gerbang rilis | semua | M4 |

## Roadmap changes

| Date | Change | Rationale | Approved by |
|---|---|---|---|
| 2026-10-16 | roadmap awal M1 sampai M4 | setup proyek | menunggu |
| 2026-10-19 | semua fase dikerjakan tanpa konfirmasi per langkah; F-009 ditunda; bagian F-008 dan F-010 diblokir A-004, A-005, A-007 | instruksi pemilik | M Sechan Alfarisi (2026-10-19) |
