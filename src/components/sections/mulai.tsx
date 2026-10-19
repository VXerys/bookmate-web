"use client";

import { useRef } from "react";

import { PhoneFrame } from "@/components/site/phone-frame";
import { mulai } from "@/content/story";
import { gsap, MOTION_OK, useGSAP } from "@/lib/motion/gsap";

export function Mulai() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();
      // The progress line draws itself with scroll; without motion it is simply full (AC-003).
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-progress]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-steps]", start: "top 70%", end: "bottom 60%", scrub: 0.6 } },
        );
        // The phone drifts against the scroll and straightens up, a slower layer behind the steps.
        gsap.fromTo(
          "[data-mulai-phone]",
          { y: 80, rotation: -5 },
          { y: -40, rotation: 0, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom center", scrub: 0.8 } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="mulai"
      data-chapter="mulai"
      className="grid gap-12 overflow-hidden px-4 py-24 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:px-10"
    >
      <div className="flex flex-col gap-12">
        <h2 className="label text-slate">{mulai.kicker}</h2>
        <ol data-steps className="relative flex max-w-3xl flex-col gap-14 pl-10">
          <span className="absolute top-2 bottom-2 left-3 w-px bg-ink/15" aria-hidden="true" />
          <span data-progress className="absolute top-2 bottom-2 left-3 w-px origin-top bg-ember" aria-hidden="true" />
          {mulai.steps.map((step, index) => (
            <li key={step.title} className="relative flex flex-col gap-2">
              <span className="label absolute top-1 -left-10 flex size-7 items-center justify-center rounded-full bg-ink text-paper">
                {index + 1}
              </span>
              <span className="statement">{step.title}</span>
              <span className="text-lg text-slate">{step.body}</span>
            </li>
          ))}
        </ol>
      </div>
      <div data-mulai-phone className="hidden w-[min(26vw,260px)] md:block md:mr-[6vw]">
        <PhoneFrame screen={mulai.screen} sizes="260px" />
      </div>
    </section>
  );
}
