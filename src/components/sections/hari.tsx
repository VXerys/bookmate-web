"use client";

import { useRef } from "react";

import { Checkmark, Sparkle } from "@/components/art/doodles";
import { Scene } from "@/components/art/scenes";
import { PhoneFrame } from "@/components/site/phone-frame";
import { palette } from "@/content/palette";
import { hari, outsideText, type Spread } from "@/content/story";
import { drawDoodle, prepareDoodles, revealDoodles } from "@/lib/motion/draw";
import { EASE_OUT, gsap, MotionPathPlugin, useGSAP } from "@/lib/motion/gsap";

const BOOK = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const STACK = "(max-width: 1023px) and (prefers-reduced-motion: no-preference)";
const spreads = hari.spreads;
// Trig results can differ in the last digit between server and browser; rounding keeps hydration identical.
const r2 = (value: number) => Math.round(value * 100) / 100;

// Where the sun (or the moon) stands on the sky arc at each spread; null keeps it below the horizon.
const SUN = [0.14, 0.5, 0.84, null, 0.24] as const;
const MOON = [null, null, null, 0.42, null] as const;

function LeftPage({ spread, index }: { spread: Spread; index: number }) {
  return (
    <div data-spread={spread.id} className="relative h-full overflow-hidden bg-paper p-[clamp(1.25rem,2.4vw,2.25rem)] text-ink">
      <span className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink/12 to-transparent" aria-hidden="true" />
      <p className="flex items-baseline gap-3">
        <span className="hand text-[clamp(2.5rem,4.4vw,4.25rem)] text-blue">{spread.time}</span>
        <span className="label">{spread.when}</span>
      </p>
      <Scene moment={spread.id} className="mt-2 w-[56%]" />
      <div className="absolute right-[6%] bottom-[7%] w-[31%] -rotate-3">
        <PhoneFrame screen={spread.screen} sizes="(min-width: 1024px) 210px, 40vw" />
      </div>
      <p className="label absolute bottom-4 left-[clamp(1.25rem,2.4vw,2.25rem)] text-slate" aria-hidden="true">
        {hari.pageLabel} {2 + index * 2}
      </p>
    </div>
  );
}

function RightPage({ spread, index }: { spread: Spread; index: number }) {
  return (
    <div data-spread={spread.id} className="relative flex h-full flex-col justify-center gap-[clamp(0.75rem,1.6vw,1.25rem)] overflow-hidden bg-paper px-[clamp(1.5rem,3.4vw,3.5rem)] py-10 text-ink">
      <span className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink/12 to-transparent" aria-hidden="true" />
      <p className="label text-slate">Bab {String(index + 1).padStart(2, "0")}</p>
      <h3 className="display text-[clamp(2.5rem,4.4vw,5rem)]">{spread.title}</h3>
      <p className="max-w-md text-[clamp(1rem,1.25vw,1.125rem)]">{spread.body}</p>
      <ul className="flex flex-col gap-1.5">
        {spread.points.map((point) => (
          <li key={point} className="flex items-center gap-3">
            <Checkmark className="size-6 shrink-0 text-blue" />
            {point}
          </li>
        ))}
      </ul>
      <p data-note className="hand flex items-center gap-2 text-[clamp(1.6rem,2.2vw,2.1rem)] text-blue" aria-hidden="true">
        <Sparkle data-draw={undefined} className="size-8 shrink-0 text-ember" />
        {spread.note}
      </p>
      <p className="label absolute right-[clamp(1.5rem,3.4vw,3.5rem)] bottom-4 text-slate" aria-hidden="true">
        {hari.pageLabel} {3 + index * 2}
      </p>
    </div>
  );
}

// Draws whatever belongs to one spread: checkmarks, scene strokes, the progress bar, poll bars, the travelling book.
function spreadIn(root: ParentNode, spread: Spread, scrubbed: boolean) {
  const pages = root.querySelectorAll(`[data-spread="${spread.id}"]`);
  const ease = scrubbed ? "none" : "power2.inOut";
  const tl = gsap.timeline();
  pages.forEach((page) => {
    page.querySelectorAll("[data-draw]").forEach((doodle, i) => tl.add(drawDoodle(doodle, { duration: 0.5, ease, stagger: 0.08 }), i * 0.08));
    const progress = page.querySelector("[data-scene-progress]");
    if (progress) tl.fromTo(progress, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.6, ease }, 0.1);
    const bars = page.querySelectorAll("[data-scene-bar]");
    if (bars.length) tl.fromTo(bars, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.5, stagger: 0.1, ease }, 0.2);
    const traveler = page.querySelector("[data-scene-traveler]");
    const path = page.querySelector<SVGPathElement>("[data-scene-path]");
    if (traveler && path) {
      tl.fromTo(
        traveler,
        { motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 0, end: 0 } },
        { motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 0, end: 1, autoRotate: false }, duration: 0.9, ease },
        0.15,
      );
    }
    const note = page.querySelector("[data-note]");
    if (note) tl.fromTo(note, { autoAlpha: 0, y: 10, rotate: -4 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 0.4, ease }, 0.3);
  });
  return tl;
}

// One reader's day as a book on the table (F-012 FR-003). Wide screens with motion pin the book and turn its leaves
// while the sun crosses the sky and the room changes colour; everyone else reads five stacked pages.
export function Hari() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      const book = section?.querySelector<HTMLElement>("[data-book]");
      const stack = section?.querySelector<HTMLElement>("[data-stack]");
      if (!section || !book || !stack) return;
      const mm = gsap.matchMedia();

      mm.add(BOOK, () => {
        prepareDoodles(book);
        const leaves = gsap.utils.toArray<HTMLElement>("[data-leaf]", book);
        const arc = section.querySelector<SVGPathElement>("[data-sky-arc]");
        const sun = section.querySelector<SVGGElement>("[data-sun]");
        const moon = section.querySelector<SVGGElement>("[data-moon]");
        const raw = arc ? MotionPathPlugin.getRawPath(arc) : null;
        if (raw) MotionPathPlugin.cacheRawPathMeasurements(raw);
        const sky = { sun: SUN[0] as number, moon: -0.2 };
        const place = (body: SVGGElement | null, progress: number) => {
          if (!body || !raw) return;
          const visible = progress >= 0 && progress <= 1;
          const point = MotionPathPlugin.getPositionOnPath(raw, Math.min(1, Math.max(0, progress)));
          gsap.set(body, { x: point.x, y: point.y, autoAlpha: visible ? 1 : 0 });
        };
        const renderSky = () => {
          place(sun, sky.sun);
          place(moon, sky.moon);
        };
        renderSky();

        // A leaf above the spine belongs to the right-hand stack until it passes upright, then to the left-hand one.
        const stackLeaf = (leaf: HTMLElement, index: number) => {
          const turned = Number(gsap.getProperty(leaf, "rotationY")) < -90;
          leaf.style.zIndex = String(turned ? 20 + index : 20 - index);
        };
        leaves.forEach((leaf, index) => stackLeaf(leaf, index));

        const stage = section.querySelector<HTMLElement>("[data-hari-stage]")!;
        gsap.set(stage, { backgroundColor: palette[spreads[0].outside], color: palette[outsideText[spreads[0].outside] ?? "ink"] });
        const beat = 1.7;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          onUpdate: renderSky,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * (spreads.length - 1) * 1.15}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        spreads.forEach((spread, index) => {
          const at = index * beat;
          tl.add(spreadIn(book, spread, true), at);
          const next = spreads[index + 1];
          if (!next) return;
          const leaf = leaves[index];
          tl.to(leaf, { rotationY: -180, duration: 1, ease: "power1.inOut", onUpdate: () => stackLeaf(leaf, index) }, at + 0.7);
          tl.to(stage, { backgroundColor: palette[next.outside], color: palette[outsideText[next.outside] ?? "ink"], duration: 1 }, at + 0.7);
          // Past the horizon the sun runs on to 1.1 (hidden) and the moon rises from -0.1, and the other way at dawn.
          const sunTo = SUN[index + 1] ?? 1.1;
          const sunFrom = SUN[index] ?? -0.1;
          const moonTo = MOON[index + 1] ?? (MOON[index] === null ? -0.2 : 1.1);
          tl.fromTo(sky, { sun: sunFrom }, { sun: sunTo, duration: 1 }, at + 0.7);
          tl.to(sky, { moon: moonTo, duration: 1 }, at + 0.7);
        });
        tl.to({}, { duration: 0.6 });
        return () => {
          revealDoodles(book);
          gsap.set(leaves, { clearProps: "transform,zIndex" });
          gsap.set(stage, { clearProps: "backgroundColor,color" });
        };
      });

      mm.add(STACK, () => {
        prepareDoodles(stack);
        gsap.utils.toArray<HTMLElement>("[data-stack-page]", stack).forEach((page, index) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: page, start: "top 75%", once: true } });
          tl.from(page.querySelectorAll("[data-stack-sheet]"), { y: 60, rotate: index % 2 ? 2 : -2, autoAlpha: 0, duration: 1, ease: EASE_OUT, stagger: 0.12 });
          tl.add(spreadIn(page, spreads[index], false), 0.4);
        });
        return () => revealDoodles(stack);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const last = spreads.length - 1;
  return (
    <section ref={root} id="hari" data-chapter="hari" className="slab">
      <div data-hari-stage className="hari-stage relative flex min-h-svh flex-col overflow-hidden rounded-[inherit] bg-sky text-ink">
        <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="hari-sky pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <path data-sky-arc="" d="M520 600 C640 -70 920 -70 1060 600" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="2" strokeDasharray="4 14" />
          <g data-sun="" style={{ visibility: "hidden" }}>
            <circle r="38" fill="var(--color-highlight)" stroke="var(--color-ink)" strokeWidth="3" />
            {Array.from({ length: 8 }, (_, i) => {
              const a = (i / 8) * Math.PI * 2;
              return <line key={i} x1={r2(Math.cos(a) * 50)} y1={r2(Math.sin(a) * 50)} x2={r2(Math.cos(a) * 64)} y2={r2(Math.sin(a) * 64)} stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />;
            })}
          </g>
          <g data-moon="" style={{ visibility: "hidden" }}>
            <path d="M-6 -36 a36 36 0 1 0 40 44 a28 28 0 1 1 -40 -44 Z" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3" />
          </g>
        </svg>

        <div className="relative z-10 flex flex-col gap-2 px-4 pt-24 md:px-10">
          <h2 className="label">{hari.kicker}</h2>
          <p className="statement max-w-3xl">{hari.title}</p>
        </div>

        <div className="hari-book relative z-10 flex flex-1 items-center justify-center px-4 py-8">
          <div data-book className="relative aspect-[1.84] w-[min(94vw,1240px,calc(72svh*1.84))] [perspective:2600px]">
            <div className="absolute inset-0 flex overflow-hidden rounded-xl border-[3px] border-ink bg-ink shadow-[12px_14px_0_var(--color-ink)]">
              <div className="h-full w-1/2 border-r-[1.5px] border-ink">
                <LeftPage spread={spreads[0]} index={0} />
              </div>
              <div className="h-full w-1/2 border-l-[1.5px] border-ink">
                <RightPage spread={spreads[last]} index={last} />
              </div>
            </div>
            {spreads.slice(0, -1).map((spread, index) => (
              <div key={spread.id} data-leaf className="absolute inset-y-[3px] right-[3px] w-[calc(50%-3px)] origin-left [transform-style:preserve-3d]">
                <div className="absolute inset-0 overflow-hidden rounded-r-lg border-l-[1.5px] border-ink [backface-visibility:hidden]">
                  <RightPage spread={spread} index={index} />
                </div>
                <div className="absolute inset-0 overflow-hidden rounded-l-lg border-r-[1.5px] border-ink [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <LeftPage spread={spreads[index + 1]} index={index + 1} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <ol data-stack className="hari-stack relative z-10 flex flex-col gap-16 px-4 pt-10 pb-24 md:px-10">
          {spreads.map((spread, index) => (
            <li key={spread.id} data-stack-page className="grid gap-4 md:grid-cols-2">
              <div data-stack-sheet className="min-h-[30rem] overflow-hidden rounded-xl border-[3px] border-ink shadow-[6px_8px_0_var(--color-ink)]">
                <LeftPage spread={spread} index={index} />
              </div>
              <div data-stack-sheet className="overflow-hidden rounded-xl border-[3px] border-ink shadow-[6px_8px_0_var(--color-ink)]">
                <RightPage spread={spread} index={index} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
