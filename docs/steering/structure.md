---
inclusion: always          # always | fileMatch | manual
---

# Structure

Where things live and which direction dependencies point. Document only what an agent cannot infer by listing the tree.

## Directory responsibilities

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
| `src/components/art/` | SVG illustrations, doodles, abstract covers and spines (F-012) | server-safe markup only; motion hooks in through `data-*` attributes; no copy |
| `src/content/` | typed copy and data: `site.ts` (brand facts), chapters, badges, FAQ | the only place UI copy and brand names live; no React imports |
| `src/lib/motion/` | GSAP plugin hub, media-query constants, eases, intro state | imports `gsap` and `lenis` only; no React components |
| `src/assets/images/` | statically imported images (screenshots, badges) for `next/image` | provenance recorded in `public/CREDITS.md` |
| `public/` | favicons, Open Graph image, `CREDITS.md` | no generated files committed |
| `src/**/*.test.ts` | tests next to the code they cover | mirrors the source layout |

## Generated paths

Never hand-edit. Listed in `sdd.config.json` under `generated`:

- `docs/context/state.yaml`
- `docs/context/PROJECT_STATE.md`
- `docs/context/PROGRESS.md`
- `docs/context/BRIEF.md`
- `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.cursor/rules/`, `.github/copilot-instructions.md`, `.github/instructions/`, `.kiro/steering/` (only the tools in `sdd.config.json` are written)
- Project-specific generated code (example: `*.g.dart`, `*.freezed.dart`, generated API clients): none

## Frozen paths

Listed in `sdd.config.json` under `frozen`. Edits need explicit owner approval and an ADR when the freeze is architectural.

- none

## Dependency direction

```text
app (routes) -> components/sections -> components/{site,motion,art} -> lib/motion
any layer    -> content (typed copy and brand facts; imports nothing back)
```

- Inner layers never import outer layers.
- Framework and provider SDKs stay behind a project-owned boundary.
- Project-specific rule: `app -> components/sections -> components/{site,motion,art} -> lib/motion`; `src/content/` is imported by any layer and imports none of them.

## Naming

- Features: `F-001-short-name`. Tasks: `T-001`. Evidence: `EV-001`. Assumptions: `A-001`. ADRs: `ADR-0001-short-name.md`.
- Code naming follows the language's standard style guide unless `docs/steering/rules.md` says otherwise.
