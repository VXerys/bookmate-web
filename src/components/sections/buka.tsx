"use client";

import { useRef } from "react";

import { Sparkle } from "@/components/art/doodles";
import { PhoneFrame } from "@/components/site/phone-frame";
import { buka } from "@/content/story";
import { gsap, MOTION_OK, useGSAP } from "@/lib/motion/gsap";

// The sentence reads across the phone: the lead above it, the tail below. While pinned, the two halves part and fade
// and the phone grows toward the viewport, so the screenshot becomes the subject (F-004 FR-002, F-011).
export function Buka() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      const frame = section?.querySelector<HTMLElement>("[data-buka-frame]");
      if (!section || !frame) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Grows until the phone fills about 90% of the viewport height, never past 1.8x so the screenshot stays sharp.
        const grow = () => Math.min(1.8, Math.max(1, (window.innerHeight * 0.9) / frame.offsetHeight));
        const part = () => window.innerHeight * 0.32;
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: section, start: "top top", end: "+=120%", scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
          })
          .to(frame, { scale: grow }, 0)
          .to("[data-buka-lead]", { y: () => -part(), autoAlpha: 0 }, 0)
          .to("[data-buka-tail]", { y: part, autoAlpha: 0 }, 0)
          .to("[data-buka-note]", { x: 60, autoAlpha: 0 }, 0)
          .fromTo("[data-buka-frame] [data-phone-screen]", { scale: 1.12 }, { scale: 1 }, 0);
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
      className="slab relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-peach-pale px-4 py-24 text-ink [--buka-phone:min(52svh,34rem)]"
    >
      <h2 className="label absolute top-24 left-4 md:left-10">{buka.kicker}</h2>
      <p className="display relative z-0 text-center text-[clamp(2.25rem,9vw,9.5rem)]">
        <span data-buka-lead className="block">
          {buka.statementLead}
        </span>{" "}
        {/* Room for the phone, which is positioned over this gap rather than inside the sentence. */}
        <span className="block h-(--buka-phone) my-[2svh]" aria-hidden="true" />
        <span data-buka-tail className="block">
          {buka.statementTail}
        </span>
      </p>
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <p data-buka-note className="hand absolute top-1/2 left-[calc(50%+min(13svh,8.5rem))] hidden -rotate-6 text-3xl text-blue md:flex md:items-center md:gap-2">
          <Sparkle data-draw={undefined} className="size-10 text-ember" />
          {buka.note}
        </p>
        <div data-buka-frame className="aspect-[9/20] h-(--buka-phone) will-change-transform">
          <PhoneFrame screen={buka.screen} sizes="(min-width: 1024px) 480px, 80vw" />
        </div>
      </div>
    </section>
  );
}
