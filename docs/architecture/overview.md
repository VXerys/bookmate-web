---
id: ARCH
title: "BookMate Web"
type: architecture-baseline
status: review
tier: lite
owner: "M Sechan Alfarisi"
created: "2026-10-16"
last_updated: "2026-10-16"
last_verified: "2026-10-16"
supersedes: null
---

# Architecture Baseline: BookMate Web

Module-level reasoning lives in `docs/specs/F-XXX/system-architecture.md`; the stack and commands live in `docs/steering/tech.md`; directory responsibilities live in `docs/steering/structure.md`. Do not repeat them here.

## System context

Situs statis (Next.js, prerender) yang menceritakan app BookMate dan mengarahkan ke Google Play. Tidak ada backend, akun, atau penyimpanan data pengguna. Di luar batas sistem: app BookMate, Supabase milik app, dan Google Play.

| Actor or external system | Relationship | Trust boundary |
|---|---|---|
| Pengunjung (browser) | membaca halaman statis | publik, tanpa input yang diproses server |
| Google Play | tujuan tautan CTA | tautan keluar saja |
| Vercel (rencana, A-004) | hosting dan CDN | konfigurasi produksi butuh persetujuan pemilik |
| Analytics (rencana, A-007) | menerima event klik CTA | tidak ada data pribadi yang dikirim |

```text
browser -> CDN (HTML, CSS, JS, gambar statis) -> outbound link ke Google Play
```

## Components

| Component | Responsibility | Owns | Does not own |
|---|---|---|---|
| Routes (`src/app/`) | menyusun section dan metadata | struktur halaman | animasi |
| Sections | satu bab cerita dan timeline-nya | layout dan motion section | copy (dibaca dari content) |
| Motion system | smooth scroll, intro, cursor, transisi, primitive | state scroll dan intro global | konten |
| Content | copy, fakta merek, data bab, lencana, FAQ | semua teks yang terlihat | markup |

## Boundaries

- B-001: copy dan fakta merek hanya di `src/content/`. Section tidak menulis string produk sendiri. Alasan: rebranding (A-001) dan aturan klaim bersumber.
- B-002: hanya `src/lib/motion/gsap.ts` yang mengimpor plugin GSAP dari paket `gsap`. Alasan: registrasi sekali, satu engine (ADR-0001).
- B-003: hanya `smooth-scroll.tsx` yang membuat atau mengendalikan Lenis; komponen lain memakai API ekspornya.

## Dependency direction

```text
app -> components/sections -> components/{site,motion} -> lib/motion
any layer -> content
```

Tidak ada siklus. `content` tidak mengimpor komponen.

## Data flow and classification

| Data | Owner | Where stored | Sensitivity |
|---|---|---|---|
| Copy dan fakta merek | pemilik produk | `src/content/` | public |
| Screenshot app | pemilik produk | `src/assets/images/` | public, tanpa data pribadi (A-002) |
| Event klik CTA | pemilik produk | layanan analytics (A-007) | internal, tanpa data pribadi |

## State ownership

| State | Owner | Source of truth | Mutation path | Invalidation or sync |
|---|---|---|---|---|
| Posisi dan kunci scroll | `smooth-scroll.tsx` (kunci: registry `src/lib/motion/scroll-lock.ts`) | instance Lenis; himpunan pemilik kunci | `lockScroll(owner)`, `unlockScroll(owner)`, `scrollToTarget`, `jumpToTarget` | `ScrollTrigger.update` per scroll; scroll terkunci selama ada pemilik |
| Intro selesai | `src/lib/motion/intro-state.ts` | flag modul | `finishIntro()` | `ScrollTrigger.refresh()` |
| Intro sudah diputar di tab ini | sampul (F-002) | `sessionStorage` | set setelah intro | dibaca saat boot |

## Security

Tidak ada identitas, sesi, atau rahasia. Satu-satunya skrip inline adalah boot script tanpa input pengguna. Header keamanan (CSP, `Referrer-Policy`) diputuskan di F-010.

## Deployment

Build `next build` menghasilkan halaman statis. Deploy ke Vercel dengan preview per PR dan produksi dari `main` setelah persetujuan pemilik (A-004). Rollback: promote deployment sebelumnya di Vercel.

## Decisions and open questions

- ADR-0001: GSAP + Lenis, tanpa WebGL di baseline (review).
- Open: A-001 sampai A-007.

## Approval and change rule

Pemilik arsitektur M Sechan Alfarisi; belum disetujui. Perubahan lintas fitur atau mahal dibalik butuh ADR dan persetujuan pemilik sebelum implementasi.
