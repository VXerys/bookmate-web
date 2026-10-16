---
id: IDEA-BRIEF
title: "BookMate Web"
type: idea-brief
status: review
tier: lite
owner: "M Sechan Alfarisi"
created: "2026-10-16"
last_updated: "2026-10-16"
last_verified: "2026-10-16"
supersedes: null
---

# Idea Brief: BookMate Web

The problem before the product. Written once, before the PRD; the PRD supersedes it for scope.

## Problem statement

BookMate v1.1.0 berpindah posisi dari app pinjam buku ke klub baca komunitas, tetapi satu-satunya tempat orang bisa mengenalnya adalah listing Google Play. Tautan yang dibagikan di media sosial langsung jatuh ke halaman toko tanpa cerita.

## Affected users

- Primary user: calon pembaca Android 18 sampai 30 tahun yang datang dari tautan media sosial.
- Context: membuka tautan dari ponsel, memutuskan dalam satu atau dua menit.
- Current workaround: membaca deskripsi singkat dan screenshot di Play Store.

## Evidence

- 2026-10-16, repo `bookmeet`: tidak ditemukan website, landing page, atau URL kebijakan privasi publik.
- 2026-10-16, repo `bookmeet`: `docs/product/roadmap.md` di repo itu mencatat pivot v1.1.0 ke klub baca komunitas.
- Belum ada data trafik atau konversi; angka di PRD adalah target, bukan baseline.

## Desired outcome

Pengunjung paham lima kemampuan inti dan menekan tombol unduh; app punya URL publik untuk kebijakan privasi dan hapus akun.

## Constraints

- Static site tanpa backend; stack sama dengan `sechan-portfolio`.
- Tidak ada klaim angka tanpa sumber.

## Assumptions to validate

Dicatat di `docs/context/ASSUMPTIONS.md` (A-001 sampai A-007).

## Risks

| ID | Risk | Impact | Mitigation |
|---|---|---|---|
| RISK-001 | motion berat membuat ponsel tersendat | high | efek berat hanya desktop; audit di F-010 |
| RISK-002 | rebranding ke Tabaca di tengah pembangunan | medium | nama hanya di `src/content/site.ts` |
