# BookMate Web

Situs pemasaran untuk app [BookMate](https://play.google.com/store/apps/details?id=com.mangcoding.bookmate2), klub baca komunitas di Android. Konsepnya "Satu Halaman Lagi": situs terasa seperti membaca satu buku bersama, dengan preloader sampul, bab-bab yang di-scroll, dan motion editorial (GSAP + Lenis).

Status: setup dan perencanaan. Lihat `docs/context/BRIEF.md` untuk task aktif.

## Stack

Next.js 16.4 (App Router, Turbopack), React 19.3, TypeScript 5, Tailwind CSS v4, GSAP 3.15 + `@gsap/react`, Lenis 1.3. Sama dengan `sechan-portfolio`; alasannya di `docs/adr/ADR-0001-motion-stack-gsap-lenis.md`.

## Perintah

| Tujuan | Perintah |
|---|---|
| Install | `npm ci` |
| Dev server | `npm run dev` |
| Lint | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Test konten | `npm test` |
| Build | `npm run build` |
| Render context | `npm run context:render` |
| Validasi context | `npm run context:validate` |
| Sinkron adapter AI | `npm run adapters:sync` |

## Dokumen penting

| Dokumen | Isi |
|---|---|
| `docs/product/art-direction.md` | visual thesis, palet, tipografi, urutan section, katalog motion |
| `docs/product/prd.md` | masalah, tujuan, kebutuhan produk |
| `docs/product/roadmap.md` | fase M1 sampai M4 dan fitur F-001 sampai F-010 |
| `docs/steering/` | aturan kanonis: product, tech, structure, rules, workflow |
| `docs/specs/` | spec per fitur (requirements, design, tasks, verification) |
| `docs/context/ASSUMPTIONS.md` | hal yang belum pasti dan menunggu keputusan pemilik |

## Alur kerja (spec-driven)

Proyek ini memakai template AI-Assisted SDD v2.0.0. Mulai sesi dari `docs/context/BRIEF.md`, kerjakan satu task, catat bukti di `verification.md`, lalu `npm run context:render` dan `npm run context:validate`. Di Claude Code: `/sdd:task T-XXX`, `/sdd:handoff`, `/sdd:review`, `/sdd:render`. Detail di `docs/automation/README.md` dan `docs/context/CONTEXT_SYSTEM.md`.
