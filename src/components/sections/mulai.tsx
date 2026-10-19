"use client";

import { useRef } from "react";

import { CurvedArrow } from "@/components/art/doodles";
import { PhoneFrame } from "@/components/site/phone-frame";
import { mulai } from "@/content/story";
import { drawDoodle, prepareDoodles, revealDoodles } from "@/lib/motion/draw";
import { gsap, MOTION_OK, useGSAP } from "@/lib/motion/gsap";

// The three steps hang off a bookmark ribbon that draws itself as the visitor scrolls, with the bookmark riding the
// ribbon down to the step being read (F-012 AC-008). Without motion the ribbon is simply drawn.
export function Mulai() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const ribbon = section.querySelector<SVGPathElement>("[data-ribbon]");
      const marker = section.querySelector<HTMLElement>("[data-ribbon-marker]");
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (!ribbon || !marker) return;
        prepareDoodles(section);
        const scrollTrigger = { trigger: "[data-steps]", start: "top 70%", end: "bottom 55%", scrub: 0.8 };
        gsap
          .timeline({ defaults: { ease: "none" }, scrollTrigger })
          .to(ribbon, { drawSVG: "100%", duration: 1 }, 0)
          .fromTo(
            marker,
            { motionPath: { path: ribbon, align: ribbon, alignOrigin: [0.5, 0.2], start: 0, end: 0 } },
            { motionPath: { path: ribbon, align: ribbon, alignOrigin: [0.5, 0.2], start: 0, end: 1 }, duration: 1 },
            0,
          );
        gsap.fromTo(
          "[data-mulai-phone]",
          { y: 80, rotation: -6 },
          { y: -40, rotation: 2, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom center", scrub: 0.8 } },
        );
        gsap
          .timeline({ scrollTrigger: { trigger: "[data-mulai-phone]", start: "top 70%", once: true } })
          .add(drawDoodle(section.querySelector("[data-mulai-arrow]")!, { duration: 0.6 }))
          .from("[data-mulai-note]", { autoAlpha: 0, y: 8, duration: 0.5 }, "-=0.2");
        return () => {
          revealDoodles(section);
          gsap.set(marker, { clearProps: "transform" });
        };
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
      className="slab grid gap-12 overflow-hidden bg-sky px-4 py-24 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:px-10"
    >
      <div className="flex flex-col gap-12">
        <h2 className="label text-slate">{mulai.kicker}</h2>
        <ol data-steps className="relative flex max-w-3xl flex-col gap-16 pl-20">
          <svg viewBox="0 0 60 600" preserveAspectRatio="none" className="absolute top-0 left-0 h-full w-14" aria-hidden="true">
            <path
              data-draw=""
              data-ribbon=""
              d="M30 4 C6 80 54 150 30 230 S6 380 30 450 S54 560 30 596"
              fill="none"
              stroke="var(--color-ember)"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
          {/* The bookmark: a ribbon tail with a notch, riding the path. */}
          <span data-ribbon-marker className="absolute top-0 left-[13px] block h-12 w-7" aria-hidden="true">
            <svg viewBox="0 0 28 48" className="h-full w-full">
              <path d="M2 2 H26 V46 L14 36 L2 46 Z" fill="var(--color-blue)" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
          </span>
          {mulai.steps.map((step, index) => (
            <li key={step.title} className="relative flex flex-col gap-2">
              <span className="hand absolute -top-1 -left-[4.5rem] flex size-11 items-center justify-center rounded-full border-[2.5px] border-ink bg-paper text-3xl" aria-hidden="true">
                {index + 1}
              </span>
              <span className="statement">{step.title}</span>
              <span className="text-lg text-slate">{step.body}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="relative hidden md:block md:mr-[6vw]">
        <div data-mulai-phone className="w-[min(26vw,260px)]">
          <PhoneFrame screen={mulai.screen} sizes="260px" />
        </div>
        <div className="pointer-events-none absolute -top-20 -left-40 flex items-end gap-1" aria-hidden="true">
          <p data-mulai-note className="hand -rotate-6 text-3xl text-blue">
            {mulai.note}
          </p>
          <CurvedArrow data-mulai-arrow="" className="h-16 w-20 text-ink" />
        </div>
      </div>
    </section>
  );
}
