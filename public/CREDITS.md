# Credits and asset provenance

Every image the site ships is listed here with its source and status (rules.md: no asset without a recorded source).

## App screenshots (temporary)

Source: screenshots of the BookMate Android app taken by the owner on their own device, handed over on 2026-10-19 in
`Downloads/listing-bookmate`. Resized to 720 px wide JPEG (quality 82) and stored in `src/assets/images/screens/`.
Used with the owner's explicit instruction to fill the device mockups for now (F-011).

| File | Original | Shown in |
|---|---|---|
| `onboarding.jpg` | `splashcreen/onboarding-bookmate.jpg` | Prolog |
| `onboarding-pinjam.jpg` | `splashcreen/onboarding-bookmate2.jpg` | Cara mulai |
| `buku-saya.jpg` | `home-screen-bookmate/detail-buku-saya.jpg` | Buka |
| `catat-bacaan.jpg` | `activity-reading/detail-catat-bacaan.jpg` | Bab 01 |
| `beranda.jpg` | `home-screen-bookmate/home-screen-bookmate.jpg` | Bab 02 (no streak screen yet) |
| `bedah-buku.jpg` | `komunitas/detail-komunitas-section-bedahbuku.jpg` | Bab 03 |
| `komunitas.jpg` | `komunitas/detail-komunitas-section-1.jpg` | Bab 04 |
| `chat-pinjam.jpg` | `chat-bookmate.png` | Bab 05 |

Must be replaced before production (A-002 stays open):

- Commercial book covers are visible (Jujutsu Kaisen, Naruto, One Piece, Project Hail Mary, and others). The project
  rule is that commercial covers are never used; this is a temporary, owner-approved exception.
- Personal data is visible: the owner's name and photo, member avatars, and a chat partner's name.
- Bab 02 shows the home screen, not the streak calendar, because no streak screenshot exists yet.

## Illustrations and doodles (F-012)

Every illustration on the page is SVG or CSS drawn in this repository, with no third-party asset: doodles
(`src/components/art/doodles.tsx`), abstract covers and spines (`books.tsx`), CSS 3D hardcovers (`book3d.tsx`), hour
scenes (`scenes.tsx`), and the loader brush stroke. Layout energy was inspired by Aardvark Book Club (Awwwards SOTD);
none of its assets, fonts (Champ, Degular), or copy are used.

## BookMate app assets (F-014)

Source: the BookMate app repository (`bookmeet`, publisher Mangcoding), copied and resized by
`scripts/assets/import-app-assets.mjs` into `src/assets/images/app/`. Used on the owner's instruction of 2026-10-19
("pakai image buku yang ada di mock, cek codebase bookmate nya").

| Folder | Original in the app repo | Treatment | Status |
|---|---|---|---|
| `covers/` (18) | `assets/images/book-image-cover/*.webp`, the covers of the app's mock books | WebP 400 px, card colour picked from the cover | publisher artwork, blocks release (A-002) |
| `tarot/` (30) | `assets/images/tarot_badges/*.webp`, mapped by code in `reading_achievement_resolver.dart` | WebP 520 px | assumed Mangcoding-owned (A-003) |
| `memoji/` (13) | `assets/icons/memoji/*.webp` | WebP 320 px | assumed Mangcoding-licensed (A-003) |
| `komunitas/` (5) | `assets/images/komunitas-image-cover/*.webp` | WebP 480 px | assumed Mangcoding-owned (A-003) |
| `ilustrasi/` (11) | `assets/icons/icons-color-bookmate/*.svg`, `assets/icons/empty-state/*.svg` | rasterised to WebP 640 px | Mangcoding app artwork |

The book and community data (`src/content/app-data.ts`) comes from `lib/core/mock/mock_data_constants.dart`. Three
mock authors differ from the printed cover; the site shows the cover's author: Immaculate Conception (Ling Ling Huang),
A Palace Near the Wind (Ai Jiang), Rites of the Starling (Devney Perry).
