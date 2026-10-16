---
inclusion: always          # always | fileMatch | manual
---

# Tech

Stack and commands. `npm run sdd:init` filled the preset values; everything else comes from the real repository. A command listed here must exist and run. The stack mirrors `sechan-portfolio` on purpose (same versions, same motion architecture); ADR-0001 records the motion stack decision.

## Stack

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

## Commands

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

## Stack rules

- Server Components by default; client components opt in with `'use client'` and stay leaf-sized.
- Secrets are read in server code only; a variable reaches the browser only with the `NEXT_PUBLIC_` prefix.
- `npm run typecheck` at 0 errors and `npm run lint` clean before a task is done. It runs `next typegen` first because `next-env.d.ts` and `.next/types` (for example `LayoutProps`) are generated, not committed.
- Next.js 16 differs from older versions; read the matching guide in `node_modules/next/dist/docs/` before using an unfamiliar API. `agentRules: false` in `next.config.ts` stops `next dev` from appending to the rendered `AGENTS.md`.
- Every GSAP animation lives in a client component inside `useGSAP` (scoped, auto-reverted). Plugins are registered once in `src/lib/motion/gsap.ts`; components import `gsap` from there, never from `"gsap"` directly.
- Every effect sits inside `gsap.matchMedia()` with a reduced-motion branch that shows the final state. Pointer effects also require `(pointer: fine)`; pinned or horizontal sequences declare their breakpoint.
- Animate `transform` and `opacity`; `clipPath` only for wipes. No layout properties in scroll-linked tweens. Call `ScrollTrigger.refresh()` after fonts and media that change layout have loaded.
- Content stays readable with JavaScript disabled: elements are hidden for entrance animations only under `html.js` with motion allowed.
- Images go through `next/image` with explicit sizes; anything below the first viewport loads lazily.

## Environment and secrets

- Secrets come from the environment or a secret manager; `.env*`, key files, and store credentials are never read, printed, or committed by an agent.
- Example-config files (`.env.example` or equivalent) document required variables without values.

## Dependency policy

Before adding or replacing a dependency, state the problem it solves, the native alternative considered, maintenance health, runtime or bundle impact, and license. Approval rule: the owner approves every new or replaced dependency; record the approval in the task that adds it. GSAP plugins shipped inside the `gsap` package are not new dependencies.

## Data store changes

None: the site has no data store.
