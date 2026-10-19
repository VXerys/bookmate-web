---
id: ASSUMPTIONS
title: Assumptions Log
status: active
owner: "M Sechan Alfarisi"
last_updated: "2026-10-16"
---

# Assumptions

Agents and contributors log unknowns here instead of guessing. An `open` assumption blocks the tasks it affects, and a feature cannot become `implemented` while it has an `open` assumption. The owner resolves entries to `confirmed` or `rejected` and records the resolution; rejected assumptions stay in the log.

## Block format

Every entry uses exactly this shape; the key-value lines are parsed.

```markdown
### A-001 — title
- status: open          # open | confirmed | rejected
- feature: F-001
- raised: YYYY-MM-DD
- resolution:

What was assumed, why it could not be verified, and what changes if it is wrong.
```

## Entries

### A-001 — Nama merek tetap BookMate selama pembangunan situs
- status: open
- feature:
- raised: 2026-10-16
- resolution:

Fitur terdampak: F-003, F-004, F-005, F-007. Field `feature` diisi saat folder spec fitur itu dibuat.

Repo app berisi usulan rebranding ke "Tabaca: Baca Buku Digital" (`proposal_rebranding_tabaca/PROPOSAL_REBRANDING_TABACA.md` di repo `bookmeet`, status "Usulan Persetujuan", Oktober 2026) dengan pivot ke e-reader. Situs memakai BookMate dan positioning klub baca komunitas karena itu yang ada di app v1.1.0. Jika rebranding disetujui, ganti `src/content/site.ts`, logo, palet aksen, dan copy bab; e-reader menjadi fitur baru.

### A-002 — Screenshot asli app tersedia
- status: open
- feature:
- raised: 2026-10-16
- resolution:

Fitur terdampak: F-003, F-004, F-005. Field `feature` diisi saat folder spec fitur itu dibuat.

Situs butuh screenshot asli dari build produksi v1.1.0 (Home, Catat Bacaan, Streak, Bedah Buku, Komunitas, Thread, Pinjam dan Chat, Profil dengan lencana), minimal 1080 x 2340, tanpa data pribadi pengguna nyata. Mockup di `marketing_assets/threads/` repo app dibuat AI dan tidak dipakai. Tanpa screenshot, F-003 sampai F-005 hanya bisa memakai bingkai kosong berlabel.

2026-10-19 (F-011): atas instruksi pemilik, bingkai ponsel sementara memakai screenshot dari perangkat pemilik (`public/CREDITS.md`). Screenshot itu memuat sampul buku komersial, nama dan foto pemilik, avatar anggota, dan nama lawan chat, dan belum ada layar kalender streak, jadi assumption ini tetap open dan rilis tetap diblokir sampai screenshot bersih tersedia.

### A-003 — Lencana tarot boleh dipakai di web, dan daftar nama serta syaratnya tersedia
- status: open
- feature:
- raised: 2026-10-16
- resolution:

Fitur terdampak: F-006. Field `feature` diisi saat folder spec fitur itu dibuat.

30 aset `assets/images/tarot_badges/*.webp` di repo app diasumsikan milik Mangcoding dan boleh dipublikasikan. Nama lencana (contoh "The Curious Ursa") dan syarat mendapatkannya harus diambil dari kode app, bukan dikarang. Jika asal gambarnya tidak jelas, section memakai aset lain.

### A-004 — Hosting di Vercel dengan domain yang belum ditentukan
- status: open
- feature:
- raised: 2026-10-16
- resolution:

Fitur terdampak: F-008, F-010. Field `feature` diisi saat folder spec fitur itu dibuat.

Belum ada domain. `metadataBase`, sitemap, dan canonical menunggu domain. Deploy produksi butuh persetujuan pemilik.

### A-005 — Isi kebijakan privasi dan prosedur hapus akun disediakan pemilik
- status: open
- feature:
- raised: 2026-10-16
- resolution:

Fitur terdampak: F-008. Field `feature` diisi saat folder spec fitur itu dibuat.

Agent tidak menulis teks hukum. Isi harus sesuai data yang benar-benar dikumpulkan app (Supabase auth, FCM, lokasi untuk radius komunitas, Google Sign-In) dan alur di `delete_account_page.dart` repo app.

### A-006 — Tautan komunitas WhatsApp resmi boleh ditampilkan publik
- status: open
- feature:
- raised: 2026-10-16
- resolution:

Fitur terdampak: F-007. Field `feature` diisi saat folder spec fitur itu dibuat.

Tautan undangan ada di `help_center_data.dart` repo app. Menaruhnya di web publik bisa mengundang spam. Tanpa persetujuan, CTA sekunder diarahkan ke Google Play saja.

### A-007 — Analytics yang dipakai
- status: open
- feature:
- raised: 2026-10-16
- resolution:

Fitur terdampak: F-008. Field `feature` diisi saat folder spec fitur itu dibuat.

Belum dipilih (contoh: Vercel Web Analytics atau tanpa analytics). Pilihan menentukan perlu tidaknya banner persetujuan cookie dan dependency baru.
