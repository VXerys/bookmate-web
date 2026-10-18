---
id: F-002
title: "Shell global: sampul, header, slice transition, menu, cursor, footer"
type: system-architecture
status: approved
tier: full
owner: "M Sechan Alfarisi"
created: 2026-10-18
last_updated: 2026-10-18
last_verified: 2026-10-18
supersedes: null
---

# System Architecture: Shell global

## 1. Intent

- Capability: lapisan interaksi yang membungkus semua section: sampul, header, menu, slice transition, cursor, footer.
- Objective: tiga overlay (sampul, menu, slice) bisa berjalan bergantian atau bertumpuk tanpa saling melepas kunci scroll, mencuri fokus, atau meninggalkan layar tertutup.
- In scope: koordinasi kunci scroll, urutan fokus, satu sumber status "sedang transisi", dan sesi sampul.
- Out of scope: isi section; Lenis dan state intro tetap milik F-001.
- Why a separate architecture document: F-001 hanya punya `setScrollLocked(boolean)`. Dengan tiga overlay, boolean tunggal membuat overlay yang selesai lebih dulu melepas kunci milik overlay lain (EC-001). Ini shared state, bukan detail komponen.

## 2. Drivers

| Driver | Requirement or assumption | Priority | Architectural consequence |
|---|---|---|---|
| Kunci scroll bertumpuk | EC-001, AC-012, AC-009 | high | kunci per pemilik dengan hitungan, bukan boolean |
| Fokus selalu jelas | AC-005, AC-010, AC-013 | high | satu fungsi yang memindahkan fokus setelah navigasi; menu mengembalikan fokus hanya bila slice tidak mengambilnya |
| Tanpa kedipan sampul | AC-003, AC-004 | high | keputusan "putar sampul" dibuat di boot script sebelum paint |
| Satu transisi pada satu waktu | AC-011 | medium | flag `busy` di modul slice |

## 4. Context and boundaries

```text
boot script -> data-sampul (play | skip) on <html>
Sampul -> lockScroll("sampul") -> completeIntro() -> unlockScroll("sampul")
Header / Menu / in-page link -> navigateTo(id) -> [slice cover -> jumpToTarget -> uncover] -> focusSection(id)
Menu -> lockScroll("menu") ... unlockScroll("menu")
```

| Boundary or component | Owns | Does not own | Trust level |
|---|---|---|---|
| `src/lib/motion/scroll-lock.ts` | himpunan pemilik kunci | Lenis, DOM | trusted, murni |
| `smooth-scroll.tsx` | menerapkan kunci ke Lenis dan `overflow` | siapa yang mengunci | trusted |
| `slice-transition.tsx` | `navigateTo(id)`, flag `busy`, fokus setelah lompat | daftar bab | trusted |
| `src/content/navigation.ts` | id dan label bab | markup | trusted, data |

Invarian: scroll terkunci selama himpunan pemilik tidak kosong; hanya `navigateTo` yang memindahkan fokus ke section; hanya sampul yang memanggil `completeIntro()` setelah F-002.

## 5. Components and dependency direction

| Component | Responsibility | May depend on | Must not depend on |
|---|---|---|---|
| `src/lib/motion/scroll-lock.ts` | `createScrollLock()`: `lock(owner)`, `unlock(owner)`, `isLocked()`, `onChange` | none | DOM, GSAP |
| `src/components/motion/*` (sampul, slice, cursor, magnetic) | efek | `src/lib/motion`, `src/content` | section |
| `src/components/site/*` (header, menu, footer, skip link) | markup dan kontrol | `src/components/motion`, `src/content` | Lenis langsung |

## 6. Critical flows

```text
Kunjungan pertama: boot -> data-sampul=play -> Sampul mount -> lock("sampul") -> counter -> fonts+load (2.0-4.5 s) -> buka sampul -> completeIntro -> sessionStorage set -> unlock("sampul") -> overlay removed
Muat ulang di tab yang sama: boot -> data-sampul=skip -> CSS tidak pernah menampilkan overlay -> IntroGate menyelesaikan intro saat fonts.ready
Menu ke bab: lock("menu") -> pilih tautan -> navigateTo(id) [busy] -> lock("slice") -> tutup -> close menu, unlock("menu") -> jump -> buka -> unlock("slice") -> focusSection(id)
Gagal: sampul melebihi 4,5 s -> buka paksa; skrip mati -> fallback boot F-001 melepas html.js -> overlay tidak tampil
```

## 8. Consistency, concurrency, ordering

- `lock` dan `unlock` idempoten per pemilik; `unlock` pemilik yang tidak mengunci tidak berefek.
- `navigateTo` menolak panggilan saat `busy`; status `busy` dilepas di `onComplete` dan di cleanup unmount.

## 12. Reliability and resilience

Sampul punya batas keras 4,5 detik dan timeout pengaman yang membuka sampul walau tab tersembunyi (EC-002, pakai `setTimeout`, bukan ticker). `sessionStorage` dibungkus `try/catch` (EC-004).

## 13. Security, privacy, abuse

Boot script tetap satu-satunya skrip inline dan hanya membaca kunci `sessionStorage` milik situs. Tidak ada data pengguna.

## 18. Accepted trade-offs

| Trade-off | Benefit | Cost accepted | Why acceptable now | Review trigger |
|---|---|---|---|---|
| Sampul sekali per tab | kunjungan ulang langsung ke konten | tab baru memutar lagi | perilaku yang diminta art direction | jika analytics menunjukkan banyak kunjungan ulang singkat |
| Cursor kustom tanpa menyembunyikan cursor bawaan | aksesibilitas, tidak ada "cursor hilang" saat JS lambat | dua indikator di layar | sama dengan portfolio | umpan balik pemilik |

## 19. Risks

| Risk | Likelihood | Impact | Mitigation or verification |
|---|---|---|---|
| Kunci tertinggal sehingga halaman tidak bisa di-scroll | medium | high | unit test registry kunci; cleanup unlock di setiap unmount |
| Fokus hilang setelah slice | medium | medium | `focusSection` memberi `tabindex="-1"` pada heading target; dicek manual dengan keyboard |
| Sampul berkedip saat muat ulang | low | medium | keputusan di boot script, dites atas string yang dikirim |

## 20. Verification plan

| Claim | Evidence method | Environment | Pass condition |
|---|---|---|---|
| Kunci bertumpuk tidak saling melepas | unit test `scroll-lock` | `node --test` | tetap terkunci sampai pemilik terakhir unlock |
| Sampul dilewati tanpa kedipan di muat ulang | unit test boot script + cek DOM | `node --test`, Browser pane | `data-sampul="skip"` sebelum paint |
| Fokus dan hash setelah navigasi | keyboard di Browser pane | `next start` | `document.activeElement` adalah heading target, `location.hash` benar |
| Kelancaran sampul, slice, cursor | pemilik di browser terlihat | `next start` | tidak ada frame jatuh yang terasa |

## 21. Impact on global architecture and ADRs

Mengganti API kunci F-001 (`setScrollLocked`) dengan `lockScroll(owner)` dan `unlockScroll(owner)`; belum ada pemanggil lain, jadi tidak ada migrasi. Tidak perlu ADR baru: tetap GSAP + Lenis (ADR-0001).
