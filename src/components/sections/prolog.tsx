"use client";

import { useRef } from "react";

import { CurvedArrow, Highlight } from "@/components/art/doodles";
import { Magnetic } from "@/components/motion/magnetic";
import { CtaLink } from "@/components/site/cta-link";
import { PrologLayers } from "@/components/motion/prolog-layers";
import { shell } from "@/content/shell";
import { site } from "@/content/site";
import { prolog } from "@/content/story";
import { drawDoodle, prepareDoodles, revealDoodles, sweepHighlight } from "@/lib/motion/draw";
import { EASE_OUT, gsap, MOTION_OK, useGSAP } from "@/lib/motion/gsap";
import { whenIntroDone } from "@/lib/motion/intro-state";

// The opening page of the book (F-012): the headline rises line by line, a friend's highlighter sweeps under
// "bareng teman.", and an arrow with a margin note points at the download button.
export function Prolog() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const copy = section.querySelector<HTMLElement>("[data-hero-copy]");
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (!copy || !document.documentElement.classList.contains("js")) return;
        prepareDoodles(section);
        gsap.set("[data-hero-line]", { yPercent: 110 });
        gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 24 });
        copy.dataset.revealReady = "";

        // The intro callback can fire outside this context (from completeIntro), so its timeline is killed by hand.
        let intro: gsap.core.Timeline | undefined;
        const stopWaiting = whenIntroDone(() => {
          intro = gsap
            .timeline({ defaults: { ease: EASE_OUT }, delay: 0.15 })
            .to("[data-hero-line]", { yPercent: 0, duration: 1.2, stagger: 0.12 })
            .add(sweepHighlight(section.querySelector("[data-highlight]")!, { duration: 0.7 }), 0.75)
            .to("[data-hero-fade]", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 0.7)
            .add(drawDoodle(section.querySelector("[data-hero-arrow]")!, { duration: 0.7 }), 1.25)
            .from("[data-hero-note]", { autoAlpha: 0, y: 8, rotate: -6, duration: 0.6 }, 1.55);
        });
        return () => {
          stopWaiting();
          intro?.kill();
          gsap.set(section.querySelectorAll("[data-hero-line], [data-hero-fade], [data-hero-note]"), { clearProps: "transform,opacity,visibility" });
          revealDoodles(section);
          delete copy.dataset.revealReady;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="prolog"
      data-chapter="prolog"
      className="relative grid min-h-svh items-center gap-10 overflow-hidden bg-highlight px-4 pt-28 pb-20 md:grid-cols-[1.1fr_0.9fr] md:px-10"
    >
      {/* Paler waves rolling across the yellow, like the light on a page. */}
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M-40 300 C220 160 420 420 720 300 S1180 120 1480 260 V-40 H-40 Z" fill="var(--color-paper)" opacity="0.28" />
        <path d="M-40 760 C260 600 520 860 860 700 S1280 560 1480 660 V940 H-40 Z" fill="var(--color-paper)" opacity="0.32" />
        <path data-hero-wave d="M-40 520 C300 420 560 640 900 520 S1300 400 1480 470" fill="none" stroke="var(--color-paper)" strokeOpacity="0.55" strokeWidth="56" strokeLinecap="round" />
      </svg>
      <div data-hero-copy data-reveal="" className="relative z-10 flex flex-col gap-7">
        <p data-hero-fade className="label w-fit rounded-full border-[2.5px] border-ink bg-paper px-3 py-1.5">
          {prolog.kicker}
        </p>
        <h1 className="display relative isolate text-[clamp(3rem,8.4vw,9.5rem)]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              {prolog.headlineLead}
            </span>
          </span>{" "}
          <span className="relative block w-fit">
            <Highlight tone="paper" className="absolute -inset-x-[0.12em] bottom-[0.04em] -z-10 h-[0.62em] w-[calc(100%+0.24em)]" />
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-hero-line className="block">
                <em>{prolog.headlineEmphasis}</em>
              </span>
            </span>
          </span>
        </h1>
        <p data-hero-fade className="max-w-md text-lg">
          {prolog.body}
        </p>
        <div data-hero-fade className="relative flex flex-wrap items-center gap-x-6 gap-y-3">
          <Magnetic>
            <CtaLink href={site.app.playStoreUrl} cursorLabel={shell.header.cta}>
              {shell.footer.download}
            </CtaLink>
          </Magnetic>
          <a href="#hari" className="inline-flex min-h-11 items-center rounded-full border-[2.5px] border-ink bg-paper px-5 font-semibold transition-colors hover:bg-sky">
            {prolog.secondary}
          </a>
          {/* A note in the empty margin beside the buttons, its arrow curling back toward them. */}
          <div className="pointer-events-none absolute top-1/2 left-[25rem] hidden -translate-y-1/2 items-center gap-2 xl:flex" aria-hidden="true">
            <CurvedArrow data-hero-arrow="" className="h-16 w-20 rotate-90 text-ink" />
            <p data-hero-note className="hand -rotate-6 text-3xl whitespace-nowrap text-ink">
              {prolog.notes.cta}
            </p>
          </div>
        </div>
      </div>
      <PrologLayers />
    </section>
  );
}
