"use client";

import { useRef } from "react";

import { manifesto } from "@/content/story";
import { addScreenReaderCopy } from "@/lib/motion/accessible-split";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/motion/gsap";

// The problem statement fills in word by word as the visitor scrolls, like ink soaking into paper (F-004 FR-001).
export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      const text = section?.querySelector<HTMLElement>("[data-manifesto]");
      if (!section || !text) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const restoreCopy = addScreenReaderCopy(text);
        const split = SplitText.create(text, { type: "words", aria: "none" });
        gsap.fromTo(
          split.words,
          { opacity: 0.15 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: section, start: "top top", end: "+=120%", scrub: true, pin: true },
          },
        );
        return () => {
          split.revert();
          restoreCopy();
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
      className="flex min-h-svh flex-col justify-center gap-8 px-4 py-24 md:px-10"
    >
      <h2 className="label text-slate">{manifesto.kicker}</h2>
      <p data-manifesto className="statement max-w-5xl">
        {manifesto.text}
      </p>
    </section>
  );
}
