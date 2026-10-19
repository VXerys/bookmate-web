"use client";

import { useRef } from "react";

import { PhoneFrame } from "@/components/site/phone-frame";
import { buka } from "@/content/story";
import { gsap, MOTION_OK, useGSAP } from "@/lib/motion/gsap";

// The phone grows as the visitor scrolls while the statement behind it fades (F-004 FR-002).
export function Buka() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: section, start: "top top", end: "+=100%", scrub: true, pin: true } })
          .fromTo("[data-buka-frame]", { scale: 0.55 }, { scale: 1, ease: "none" }, 0)
          .fromTo("[data-buka-statement]", { opacity: 1 }, { opacity: 0.12, ease: "none" }, 0);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="buka"
      data-chapter="buka"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-peach px-4 py-24 text-ink"
    >
      <h2 className="label absolute top-24 left-4 md:left-10">{buka.kicker}</h2>
      <p
        data-buka-statement
        className="display pointer-events-none absolute inset-x-4 top-1/2 -translate-y-1/2 text-center text-[clamp(3rem,10vw,11rem)]"
      >
        {buka.statement}
      </p>
      <div data-buka-frame className="relative w-[min(70vw,320px)]">
        <PhoneFrame screen={buka.screen} />
      </div>
    </section>
  );
}
