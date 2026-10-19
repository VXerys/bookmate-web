"use client";

import { useRef } from "react";

import { HandNote } from "@/components/motion/hand-note";
import { PhoneFrame } from "@/components/site/phone-frame";
import { shell } from "@/content/shell";
import { site } from "@/content/site";
import { buka } from "@/content/story";
import { gsap, useGSAP } from "@/lib/motion/gsap";

const PINNED = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

// The one pinned scene (F-013, reference "box" sequence): the phone turns from a tilted three-quarter view to face the
// reader and grows between the two halves of the sentence; then the sentence clears, the phone steps left, and the
// three steps to start appear beside it. Narrow screens and reduced motion read the same content stacked.
export function Buka() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();
      mm.add(PINNED, () => {
        section.dataset.pinned = "";
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section, start: "top top", end: "+=180%", scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
        });
        tl.fromTo("[data-buka-phone]", { rotationY: -38, rotationX: 16, rotationZ: -8, scale: 0.72 }, { rotationY: 0, rotationX: 0, rotationZ: 0, scale: 1.08, duration: 1 }, 0)
          .to("[data-buka-lead]", { yPercent: -60, autoAlpha: 0, duration: 0.6 }, 0.7)
          .to("[data-buka-tail]", { yPercent: 60, autoAlpha: 0, duration: 0.6 }, 0.7)
          .to("[data-buka-phone]", { xPercent: -62, scale: 1, rotationY: 14, duration: 0.8 }, 1.2)
          .from("[data-buka-step]", { x: 80, autoAlpha: 0, stagger: 0.18, duration: 0.5 }, 1.45)
          .from("[data-buka-cta]", { y: 40, autoAlpha: 0, duration: 0.4 }, 1.95)
          .to({}, { duration: 0.3 });
        return () => delete section.dataset.pinned;
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="bg-white">
      <section
        ref={root}
        id="buka"
        data-chapter="buka"
        className="buka shape-inset relative flex min-h-svh flex-col items-center justify-center gap-10 overflow-hidden bg-sky px-6 py-28 [--buka-phone:min(56svh,34rem)] lg:px-10"
      >
        <p className="buka-statement heading relative z-0 text-center text-[clamp(2.4rem,7vw,6.5rem)]">
          <span data-buka-lead className="block">
            {buka.statementLead}
          </span>{" "}
          <span className="buka-gap block" aria-hidden="true" />
          <span data-buka-tail className="block">
            {buka.statementTail}
          </span>
        </p>

        <div className="buka-stage relative z-10 flex w-full max-w-[72rem] flex-col items-center gap-12">
          <div className="[perspective:1600px]">
            <div data-buka-phone className="aspect-[9/20] h-(--buka-phone) [transform-style:preserve-3d]">
              <PhoneFrame screen={buka.screen} sizes="(min-width: 1024px) 300px, 70vw" />
            </div>
          </div>
          <div className="buka-steps flex max-w-md flex-col gap-6">
            <h2 className="statement">{buka.stepsTitle}</h2>
            <ol className="flex flex-col gap-5">
              {buka.steps.map((step, index) => (
                <li key={step.title} data-buka-step className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blue font-display text-xl font-extrabold text-paper">
                    {index + 1}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="font-display text-2xl font-bold">{step.title}</span>
                    <span className="font-semibold text-slate">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div data-buka-cta className="flex flex-wrap items-center gap-4">
              <a
                href={site.app.playStoreUrl}
                data-cursor-label={shell.header.cta}
                className="inline-flex h-14 items-center gap-3 rounded-xl bg-ink px-5 font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
                  <path d="M5 3.5v17l14.5-8.5L5 3.5Z" fill="var(--color-highlight)" />
                </svg>
                {shell.footer.download}
              </a>
              <HandNote decorative className="-rotate-3">
                {buka.note}
              </HandNote>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
