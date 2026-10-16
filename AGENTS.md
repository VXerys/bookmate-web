<!-- GENERATED FILE — DO NOT EDIT. Rendered by `npm run adapters:sync`.
Source: docs/steering/, sdd.config.json.
source_hash: 65557d9e0e601b5a748c8c961f561f9260b3d5b01878742d17ac19d53f3e5f57 -->

# Repository contract: BookMate Web

BookMate Web adalah situs pemasaran untuk aplikasi BookMate yang mengajak pembaca Indonesia bergabung ke klub baca komunitas lewat pengalaman scroll yang sinematik, lalu mengunduh aplikasinya dari Google Play.

Rendered from `docs/steering/` and `sdd.config.json` for humans and coding agents. Edit the steering files, then run `npm run adapters:sync`.

## Read first

1. `docs/context/BRIEF.md` (single entry point; rendered, never hand-edited)
2. `docs/steering/rules.md`, `docs/steering/tech.md`, `docs/steering/structure.md`, `docs/steering/workflow.md`, `docs/steering/product.md`
3. The active feature under `docs/specs/`: `tasks.md`, then the sections it references

Fallback when `BRIEF.md` is absent: `docs/context/NEW_CHAT_PROTOCOL.md`.

## Source of truth

| Question | Source |
|---|---|
| Product intent | `docs/steering/product.md`, `docs/product/prd.md` |
| Stack and commands | `docs/steering/tech.md` |
| Directory and dependency rules | `docs/steering/structure.md` |
| Engineering and security rules | `docs/steering/rules.md` |
| Lifecycle and status vocabulary | `docs/steering/workflow.md` |
| Shared architecture | `docs/architecture/` |
| Decisions | `docs/adr/` |
| Feature behavior, design, tasks, evidence | `docs/specs/F-XXX-name/` |
| Task status | `docs/specs/F-XXX-name/tasks.md` (master) |
| Unknowns | `docs/context/ASSUMPTIONS.md` |
| Session delta | `docs/handoff/current.md` |
| Current behavior | code, tests, schema, configuration |

Chat history and provider memory are never a source of truth.

## Read-only paths

Generated (edit the sources, then run `npm run context:render` or `npm run adapters:sync`): `docs/context/state.yaml`, `docs/context/PROJECT_STATE.md`, `docs/context/PROGRESS.md`, `docs/context/BRIEF.md`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.cursor/rules/`, `.github/copilot-instructions.md`, `.github/instructions/`, `.kiro/steering/`

Frozen (explicit owner approval required): none

## Rules

Engineering rules every agent and contributor applies. The principles behind them are in the project constitution; the lifecycle is in `workflow.md`.

### Engineering

- Follow existing project patterns before introducing a new abstraction.
- Keep the change inside the selected task. Discovered work becomes a new task in `tasks.md`, not a silent extension.
- Inspect the repository before asserting a path, API, schema field, command, or framework behavior. Never invent one.
- Preserve existing behavior and contracts unless the referenced spec changes them.
- Add or update tests for changed behavior. Never weaken or disable a test to make a check pass.
- Comments explain why, not what. No decorative banners or separator comments.
- Treat generated and frozen paths from `sdd.config.json` as read-only.

### Evidence before claims

- "Done" means: analyze, typecheck, test, and build commands from `tech.md` ran, and their output is recorded as EV blocks in the feature's `verification.md`.
- A check that could not run is reported with the reason and residual risk. It is never reported as passed.
- A task reaches `done` only with at least one evidence id. A feature reaches `implemented` only with every task `done` or `deferred` and no `open` assumption.

### Unknowns

Log an unknown in `docs/context/ASSUMPTIONS.md` as `A-XXX` with `status: open` instead of guessing. Continue only on work the assumption does not affect; mark the affected task `blocked`.

### Prohibited without explicit owner approval

- Changing a public API, event, or data contract.
- Destructive data operations: drop, mass delete, reset, backfill with unknown impact, editing an applied migration.
- Replacing a major framework, provider, or dependency; adding a dependency outside the policy in `tech.md`.
- Breaking an architecture boundary or dependency direction.
- Changing production infrastructure, credentials, or configuration.
- Bypassing authentication or authorization.
- Force push, history rewrite, or any git operation that can destroy work.
- Editing a generated or frozen path.
- Publishing, deploying, or sending messages on the owner's behalf.

### Stop conditions

Stop and report, instead of implementing, when the task would require any prohibited action above, when two sources of truth conflict, when a blocking assumption is open, or when a required command is unavailable.

### Data and security

- No secrets in the repository. Never read, print, or commit `.env*`, key files, keystores, or store credentials.
- Authorization is enforced at a trusted boundary; hiding UI is not authorization.
- Validate untrusted input at the boundary. Do not log secrets, tokens, auth headers, or unnecessary personal data.
- Data store changes are versioned, append-only, reviewed, and reversible or explicitly accepted as forward-only.
- Project-specific rule: no product claim without a source. Download counts, ratings, user numbers, testimonials, partner logos, and avatars appear only with verified evidence linked from the task; copyrighted commercial book covers are never used; every new asset is recorded in `public/CREDITS.md`.

### Source of truth and conflicts

Requirements own behavior, system architecture owns module decisions, design owns the repository mapping, `tasks.md` owns task status, code and tests own current behavior, `tech.md` owns commands. Chat history and provider memory are never a source of truth.

When sources conflict: stop the affected work, name both sources, inspect code and git, propose the smallest correction, get approval for product, architecture, security, or data changes, update the canonical source, then continue.

## Tech

Stack and commands. `npm run sdd:init` filled the preset values; everything else comes from the real repository. A command listed here must exist and run. The stack mirrors `sechan-portfolio` on purpose (same versions, same motion architecture); ADR-0001 records the motion stack decision.

### Stack

| Concern | Technology | Reason or constraint |
|---|---|---|
| Language and runtime | TypeScript 5 on Node 22+ (developed on Node 24) | `"type": "module"` so `node --test` loads `.ts` without warnings |
| Application framework | Next.js 16.4 (App Router, Turbopack), React 19.3 | static marketing site; no route handlers |
| Styling | Tailwind CSS v4 through `@tailwindcss/turbopack` | design tokens in `@theme` in `src/app/globals.css` |
| Motion | GSAP 3.15 + `@gsap/react` (`useGSAP`); plugins ScrollTrigger, SplitText, Flip, ScrambleText as needed | one animation engine; no Framer Motion or Anime.js alongside it (ADR-0001) |
| Smooth scroll | Lenis 1.3, driven by the GSAP ticker | one scroll engine; never started under `prefers-reduced-motion` |
| 3D and shaders | none | Three.js only through F-009 after ADR-0002 is approved |
| Data store | none | site content is typed data in `src/content/` |
| Test framework | Node test runner with type stripping (`node --test`) | content and pure-logic invariants; browser checks are manual until F-010 |
| Deployment target | Vercel (planned) | project, domain, and production branch pending A-004 |
| Source and test paths | `src/**`, `public/**` | globs used by `fileMatch` steering rules |

### Commands

Run these before claiming any task done. Report a command that cannot run; never claim its success. `none` means the project has no command for that purpose yet.

| Purpose | Command |
|---|---|
| Install | `npm ci` |
| Analyze or lint | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Format check | `none` |
| Test | `npm test` |
| Build | `npm run build` |
| Run locally | `npm run dev` |
| Data store change check | `none` |
| Context validation | `npm run context:validate` |
| SDD tooling tests | `npm run test:sdd` |

### Stack rules

- Server Components by default; client components opt in with `'use client'` and stay leaf-sized.
- Secrets are read in server code only; a variable reaches the browser only with the `NEXT_PUBLIC_` prefix.
- `npm run typecheck` at 0 errors and `npm run lint` clean before a task is done. It runs `next typegen` first because `next-env.d.ts` and `.next/types` (for example `LayoutProps`) are generated, not committed.
- Next.js 16 differs from older versions; read the matching guide in `node_modules/next/dist/docs/` before using an unfamiliar API. `agentRules: false` in `next.config.ts` stops `next dev` from appending to the rendered `AGENTS.md`.
- Every GSAP animation lives in a client component inside `useGSAP` (scoped, auto-reverted). Plugins are registered once in `src/lib/motion/gsap.ts`; components import `gsap` from there, never from `"gsap"` directly.
- Every effect sits inside `gsap.matchMedia()` with a reduced-motion branch that shows the final state. Pointer effects also require `(pointer: fine)`; pinned or horizontal sequences declare their breakpoint.
- Animate `transform` and `opacity`; `clipPath` only for wipes. No layout properties in scroll-linked tweens. Call `ScrollTrigger.refresh()` after fonts and media that change layout have loaded.
- Content stays readable with JavaScript disabled: elements are hidden for entrance animations only under `html.js` with motion allowed.
- Images go through `next/image` with explicit sizes; anything below the first viewport loads lazily.

### Environment and secrets

- Secrets come from the environment or a secret manager; `.env*`, key files, and store credentials are never read, printed, or committed by an agent.
- Example-config files (`.env.example` or equivalent) document required variables without values.

### Dependency policy

Before adding or replacing a dependency, state the problem it solves, the native alternative considered, maintenance health, runtime or bundle impact, and license. Approval rule: the owner approves every new or replaced dependency; record the approval in the task that adds it. GSAP plugins shipped inside the `gsap` package are not new dependencies.

### Data store changes

None: the site has no data store.

## Structure

Where things live and which direction dependencies point. Document only what an agent cannot infer by listing the tree.

### Directory responsibilities

| Path | Responsibility | Rule |
|---|---|---|
| `docs/steering/` | canonical project rules, product, stack, structure, workflow | edit by hand; `AGENTS.md` and tool adapters are rendered from it by `npm run adapters:sync` |
| `docs/specs/F-XXX-name/` | one feature: requirements, system-architecture, design, tasks, verification | `tasks.md` is the master for task status |
| `docs/adr/` | one decision per record | approved ADRs are never rewritten |
| `docs/architecture/` | cross-feature boundaries and invariants | module reasoning stays in the feature |
| `docs/context/` | rendered state, brief, assumptions log | only `ASSUMPTIONS.md` is hand-edited |
| `docs/handoff/current.md` | session delta | updated at the end of every implementation session |
| `src/app/` | routes `/`, `/kebijakan-privasi`, `/hapus-akun`; root layout, fonts, metadata | Server Components; a page composes sections and holds no animation code |
| `src/components/sections/` | one file per section of `/` (prolog, manifesto, bab, streak, and so on) | owns its own `useGSAP` timeline; reads copy from `src/content/` |
| `src/components/motion/` | cross-section motion: smooth scroll, sampul, slice transition, cursor, reveal, magnetic, liquid filter | client components; no product copy |
| `src/components/site/` | header, footer, menu, buttons, phone frame | props in, markup out |
| `src/content/` | typed copy and data: `site.ts` (brand facts), chapters, badges, FAQ | the only place UI copy and brand names live; no React imports |
| `src/lib/motion/` | GSAP plugin hub, media-query constants, eases, intro state | imports `gsap` and `lenis` only; no React components |
| `src/assets/images/` | statically imported images (screenshots, badges) for `next/image` | provenance recorded in `public/CREDITS.md` |
| `public/` | favicons, Open Graph image, `CREDITS.md` | no generated files committed |
| `src/**/*.test.ts` | tests next to the code they cover | mirrors the source layout |

### Generated paths

Never hand-edit. Listed in `sdd.config.json` under `generated`:

- `docs/context/state.yaml`
- `docs/context/PROJECT_STATE.md`
- `docs/context/PROGRESS.md`
- `docs/context/BRIEF.md`
- `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.cursor/rules/`, `.github/copilot-instructions.md`, `.github/instructions/`, `.kiro/steering/` (only the tools in `sdd.config.json` are written)
- Project-specific generated code (example: `*.g.dart`, `*.freezed.dart`, generated API clients): none

### Frozen paths

Listed in `sdd.config.json` under `frozen`. Edits need explicit owner approval and an ADR when the freeze is architectural.

- none

### Dependency direction

```text
app (routes) -> components/sections -> components/{site,motion} -> lib/motion
any layer    -> content (typed copy and brand facts; imports nothing back)
```

- Inner layers never import outer layers.
- Framework and provider SDKs stay behind a project-owned boundary.
- Project-specific rule: `app -> components/sections -> components/{site,motion} -> lib/motion`; `src/content/` is imported by any layer and imports none of them.

### Naming

- Features: `F-001-short-name`. Tasks: `T-001`. Evidence: `EV-001`. Assumptions: `A-001`. ADRs: `ADR-0001-short-name.md`.
- Code naming follows the language's standard style guide unless `docs/steering/rules.md` says otherwise.

## Workflow

The spec-driven lifecycle from session start to handoff.

### Start a session

1. Read `docs/context/BRIEF.md`. It is the single entry point: active feature and task, open assumptions, blockers, next action.
2. If `BRIEF.md` is absent or stale, read in this order: `docs/steering/*.md`, `docs/handoff/current.md`, the active feature's `tasks.md`, then its `requirements.md` and `design.md`.
3. Confirm branch and worktree match the handoff before editing anything.

### Pick a task

- Take the task the brief names, or the first `planned` task whose `depends_on` are all `done`.
- Read only the FR ids, design sections, and architecture sections the task references, plus the code it touches.
- Set `status: in_progress` in `tasks.md`. One task in progress per session. In Claude Code, `/sdd:task T-XXX` builds the task prompt from the brief and the spec and follows it.

### Status transitions

```text
planned -> in_progress -> review -> done
                |            |
                v            v
             blocked      deferred
```

- `blocked`: an unresolved decision or assumption; log it in `ASSUMPTIONS.md` and stop the task.
- `review`: implementation complete, evidence recorded, awaiting review.
- `done`: reviewed, with at least one `EV-XXX` id in `evidence`.
- `deferred`: removed from current scope with a reason; never deleted.

Feature status in frontmatter: `draft -> review -> approved -> implementing -> verification -> implemented`, or `superseded`. A feature becomes `implemented` only when every task is `done` or `deferred` and no assumption is `open`.

### Evidence

Every check runs through the commands in `tech.md` and is recorded as an EV block in `verification.md` with command, output excerpt, date, commit, and the AC ids it covers. Claims without evidence are not accepted at review.

### Close a session

1. Review `git diff` and `git status`.
2. Run the commands in `tech.md`; record evidence.
3. Update task status in `tasks.md`; run `npm run context:render`, then `npm run context:validate`. After a steering or `sdd.config.json` change, also `npm run adapters:sync`.
4. Update `docs/handoff/current.md`: objective, changed files, commands and results, uncommitted work, blockers, exact next step. In Claude Code, `/sdd:handoff` writes it and runs render and validate; `/sdd:review`, `/sdd:bug`, and `/sdd:render` fill the review template, open a bug file, and run the three context commands.
5. Report the next task.

### When to write an ADR

Write one in `docs/adr/` from `docs/_templates/adr.md` when a decision is expensive to reverse, changes a boundary or trust model, introduces or replaces a framework, provider, store, or major dependency, changes a public contract, or will be questioned later. One decision per ADR; supersede, never rewrite.

### Tiers

`lite` is the default: requirements, design, tasks, verification, each within 80 lines. `full` adds `system-architecture.md` and the sections marked `<!-- full-tier -->`, within 200 lines (300 for system architecture). Choose `full` when the feature has shared state, realtime or async communication, external integration, a security boundary, or material scale or cost.

## Product

Short, always-loaded product context. The full product requirements live in `docs/product/prd.md`; this file must agree with it and stays under 120 lines. Visual and motion direction: `docs/product/art-direction.md`.

### Vision

BookMate Web adalah situs pemasaran untuk aplikasi BookMate yang mengajak pembaca Indonesia bergabung ke klub baca komunitas lewat pengalaman scroll yang sinematik, lalu mengunduh aplikasinya dari Google Play.

BookMate (Android, v1.1.0, publisher Mangcoding) belum punya website. Situs ini menjelaskan pivot v1.1.0 ke klub baca komunitas dalam satu halaman yang terasa seperti membaca buku bersama, lalu mengarahkan ke Google Play. "Berhasil" berarti pengunjung paham lima kemampuan inti dan menekan tombol unduh. Project content (specs, product docs, UI copy) is written in Indonesian; the framework text stays English.

### Personas

- Calon pembaca: 18 sampai 30 tahun, ponsel Android, datang dari tautan media sosial; ingin kebiasaan membaca yang konsisten dan teman baca.
- Pengelola komunitas baca: admin klub kampus atau lokal yang menilai apakah BookMate cocok untuk anggotanya, sering membuka dari desktop.
- Pengguna lama: mencari kebijakan privasi atau cara hapus akun.

### Core use cases

- UC-001: calon pembaca membuka situs dari ponsel, scroll sampai akhir, menekan "Unduh di Google Play".
- UC-002: pengelola komunitas membaca bab Komunitas dan Pinjam di desktop, memindai QR untuk memasang app.
- UC-003: pengguna lama membuka `/hapus-akun` dan menemukan langkah penghapusan akun.

### Non-goals

- Login, akun, katalog buku, atau data pengguna di website.
- E-reader atau branding "Tabaca" sampai rebranding disetujui (A-001).
- Blog, CMS, dan multi-bahasa di rilis pertama.
- Promosi iOS sebelum ada rilis App Store.

### Success signals

| Signal | What it tells us | Source |
|---|---|---|
| Klik CTA "Unduh di Google Play" | situs mengonversi | analytics yang dipilih di F-008 (A-007) |
| Lighthouse mobile Performance ≥ 85, Accessibility ≥ 95 | motion tidak mengorbankan kualitas | Lighthouse pada build produksi |
| LCP < 2,5 s, CLS < 0,1 | first viewport cepat dan stabil | Lighthouse |

### Constraints that shape product decisions

- Fakta produk hanya dari repo app `bookmeet` (fitur, warna, font, tagline). Tidak ada angka unduhan, rating, testimoni, atau logo mitra tanpa bukti terverifikasi.
- Nama, tagline, dan tautan toko hanya dibaca dari `src/content/site.ts`, karena rebranding masih terbuka (A-001).
- UI copy Bahasa Indonesia, sapaan "kamu", hangat dan santai.
- Tidak memakai sampul buku komersial asli; screenshot app harus asli dari build produksi (A-002).

## Commands

Project commands: the Commands table in `docs/steering/tech.md` (the Tech section above). Context: `npm run context:render`, then `npm run context:validate`. Adapters: `npm run adapters:sync`.
