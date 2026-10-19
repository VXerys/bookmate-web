"use client";

import { useRef } from "react";

import { CurvedArrow, ScribbleCircle } from "@/components/art/doodles";
import { manifesto } from "@/content/story";
import { addScreenReaderCopy } from "@/lib/motion/accessible-split";
import { drawDoodle, prepareDoodles, revealDoodles } from "@/lib/motion/draw";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/motion/gsap";

// The problem statement fills in word by word as the visitor scrolls (F-004 FR-001). A friend strikes out each
// problem the moment it is read and circles the answer (F-012 AC-004).
export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      const text = section?.querySelector<HTMLElement>("[data-manifesto]");
      if (!section || !text) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        prepareDoodles(section);
        const restoreCopy = addScreenReaderCopy(text);
        const split = SplitText.create(text, { type: "words", aria: "none" });
        const step = 0.1;
        // Where a marked phrase sits in the fill, so its mark lands as its last word turns dark.
        const at = (mark: Element) => {
          const words = split.words.filter((word) => mark.contains(word));
          return split.words.indexOf(words.at(-1)!) * step + 0.5;
        };
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section, start: "top top", end: "+=140%", scrub: 0.8, pin: true, anticipatePin: 1 },
        });
        tl.fromTo(split.words, { opacity: 0.15 }, { opacity: 1, stagger: step, duration: 0.5 }, 0);
        gsap.utils.toArray<HTMLElement>("[data-mark='strike']", text).forEach((mark) => {
          tl.fromTo(mark, { "--strike": "0%" }, { "--strike": "100%", duration: 0.6 }, at(mark));
        });
        gsap.utils.toArray<HTMLElement>("[data-mark='circle']", text).forEach((mark) => {
          const doodle = mark.querySelector("[data-draw]");
          if (doodle) tl.add(drawDoodle(doodle, { duration: 0.8, ease: "none" }), at(mark));
        });
        tl.from("[data-manifesto-note]", { autoAlpha: 0, y: 10, duration: 0.4 }, ">-0.2");
        const arrow = section.querySelector("[data-manifesto-arrow]");
        if (arrow) tl.add(drawDoodle(arrow, { duration: 0.5, ease: "none" }), "<");
        return () => {
          split.revert();
          restoreCopy();
          revealDoodles(section);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="manifesto"
      data-chapter="manifesto"
      className="relative flex min-h-svh flex-col justify-center gap-8 overflow-hidden px-4 py-24 md:px-10"
    >
      <h2 className="label text-slate">{manifesto.kicker}</h2>
      <p data-manifesto className="statement max-w-5xl">
        {manifesto.segments.map((segment, index) =>
          segment.mark === "circle" ? (
            <span key={index} data-mark="circle" className="relative inline-block whitespace-nowrap">
              {segment.text}
              <ScribbleCircle className="pointer-events-none absolute -inset-x-[0.35em] -inset-y-[0.3em] h-[calc(100%+0.6em)] w-[calc(100%+0.7em)] text-blue" />
            </span>
          ) : segment.mark === "strike" ? (
            <span key={index} data-mark="strike" className="mark-strike">
              {segment.text}
            </span>
          ) : (
            segment.text
          ),
        )}
      </p>
      <div className="pointer-events-none flex items-start gap-2 self-end md:mr-[8vw]" aria-hidden="true">
        <CurvedArrow data-manifesto-arrow="" className="h-16 w-20 rotate-[200deg] text-ink" />
        <p data-manifesto-note className="hand mt-10 -rotate-3 text-3xl text-blue">
          {manifesto.note}
        </p>
      </div>
    </section>
  );
}
