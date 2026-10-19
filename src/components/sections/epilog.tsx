"use client";

import { useRef } from "react";

import { BookCover } from "@/components/art/books";
import { Burst, CurvedArrow, Highlight, Sparkle } from "@/components/art/doodles";
import { Magnetic } from "@/components/motion/magnetic";
import { shell } from "@/content/shell";
import { site } from "@/content/site";
import { epilog } from "@/content/story";
import { drawDoodle, prepareDoodles, revealDoodles, sweepHighlight } from "@/lib/motion/draw";
import { gsap, MOTION_OK, useGSAP } from "@/lib/motion/gsap";

// The last page: the closing line settles from oversized (AC-005), the highlighter and stars go on, and two books
// drift in from the margins. Everything is drawn already without motion.
export function Epilog() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        prepareDoodles(section);
        gsap.fromTo(
          "[data-epilog-line]",
          { scale: 1.2, opacity: 0.4 },
          { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "center center", scrub: 0.8 } },
        );
        gsap.fromTo(
          "[data-epilog-book]",
          { y: (i: number) => (i ? 160 : 220), rotation: (i: number) => (i ? 24 : -20) },
          { y: 0, rotation: (i: number) => (i ? 10 : -8), ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "center center", scrub: 0.8 } },
        );
        const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 45%", once: true } });
        tl.add(sweepHighlight(section.querySelector("[data-highlight]")!));
        gsap.utils.toArray<Element>("[data-draw]", section).forEach((doodle, index) => tl.add(drawDoodle(doodle, { duration: 0.6 }), 0.3 + index * 0.12));
        tl.from("[data-epilog-note]", { autoAlpha: 0, y: 8, duration: 0.5 }, 0.8);
        return () => revealDoodles(section);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="epilog"
      data-chapter="epilog"
      className="relative flex min-h-svh flex-col items-center justify-center gap-10 overflow-hidden px-4 py-24 text-center md:px-10"
    >
      <div data-epilog-book className="pointer-events-none absolute top-[14%] left-[4%] hidden w-[9vw] md:block" aria-hidden="true">
        <BookCover tone="forest" pattern="arches" id="epilog-a" className="w-full drop-shadow-[6px_8px_0_var(--color-ink)]" />
      </div>
      <div data-epilog-book className="pointer-events-none absolute right-[5%] bottom-[16%] hidden w-[10vw] md:block" aria-hidden="true">
        <BookCover tone="blue" pattern="stripes" id="epilog-b" className="w-full drop-shadow-[6px_8px_0_var(--color-ink)]" />
      </div>
      <Sparkle className="pointer-events-none absolute top-[18%] right-[22%] size-16 text-blue" />
      <Burst className="pointer-events-none absolute bottom-[24%] left-[20%] size-12 text-ember" />

      <h2 data-epilog-line className="display relative isolate text-[clamp(3.25rem,10vw,11rem)]">
        {epilog.statementLead}{" "}
        <span className="relative inline-block">
          <Highlight className="absolute -inset-x-[0.1em] bottom-[0.06em] -z-10 h-[0.58em] w-[calc(100%+0.2em)]" />
          <em>{epilog.statementEmphasis}</em>
        </span>
      </h2>
      <div className="relative">
        <Magnetic>
          <a
            href={site.app.playStoreUrl}
            data-cursor-label={shell.header.cta}
            className="inline-flex min-h-11 items-center rounded-full border-2 border-ink bg-ember px-8 py-4 text-lg font-medium text-ink shadow-[5px_5px_0_var(--color-ink)] transition-shadow hover:shadow-[2px_2px_0_var(--color-ink)]"
          >
            {shell.footer.download}
          </a>
        </Magnetic>
        <div className="pointer-events-none absolute top-1/2 left-full hidden items-center gap-1 pl-4 md:flex" aria-hidden="true">
          <CurvedArrow className="h-14 w-16 rotate-[100deg] text-ink" />
          <p data-epilog-note className="hand -rotate-3 text-2xl whitespace-nowrap text-blue">
            {epilog.note}
          </p>
        </div>
      </div>
    </section>
  );
}
