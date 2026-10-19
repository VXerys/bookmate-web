"use client";

import Image from "next/image";
import { useRef } from "react";

import { HandNote } from "@/components/motion/hand-note";
import { PopTitle } from "@/components/motion/pop-title";
import { illustrationImages } from "@/components/site/app-images";
import { shelfBook } from "@/components/site/shelf";
import { pinjam } from "@/content/story";
import { gsap, LAND, useGSAP } from "@/lib/motion/gsap";

const WIDE_MOTION = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const STACK_MOTION = "(max-width: 1023px) and (prefers-reduced-motion: no-preference)";
const TILT = [-4, 3, -2, 4] as const;
const TRAVELLER = shelfBook("remarkablyBrightCreatures");

// Chapter 2, borrow (F-014): the four steps of the app's borrow flow as cards with the app's own illustrations. On wide
// screens a road draws itself behind the cards and a real cover travels along it, so the book visibly moves from the
// owner's shelf to the reader; each card springs up as the book reaches it. Narrow screens stack the cards as sticky
// pages that pile up while scrolling (pure CSS, so it also works under reduced motion).
export function Pinjam() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();
      mm.add(WIDE_MOTION, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-step-card]", section);
        // Cards rest at their CSS rotate tilt; GSAP's rotation adds to it, so -TILT starts them upright.
        gsap.set(cards, { yPercent: 30, autoAlpha: 0, rotation: (i: number) => -TILT[i] });
        const shown = cards.map(() => false);
        const reveal = (index: number, on: boolean) => {
          if (shown[index] === on) return;
          shown[index] = on;
          gsap.to(cards[index], on ? { yPercent: 0, autoAlpha: 1, rotation: 0, duration: 0.9, ease: LAND } : { yPercent: 30, autoAlpha: 0, rotation: -TILT[index], duration: 0.35, ease: "power2.in" });
        };
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: "[data-road]",
              start: "top 75%",
              end: "bottom 45%",
              scrub: 0.8,
              onUpdate: (self) => cards.forEach((_, i) => reveal(i, self.progress >= i / cards.length + 0.02)),
            },
          })
          .fromTo("[data-road-line]", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1 }, 0)
          .to("[data-road-book]", { motionPath: { path: "[data-road-guide]", align: "[data-road-guide]", alignOrigin: [0.5, 0.5], autoRotate: false }, rotation: 360, transformOrigin: "50% 50%", duration: 1 }, 0);
        return () => gsap.set(cards, { clearProps: "all" });
      });
      // Narrow screens: the sticky cards pile up, and each one recedes and dims as the next slides over it.
      mm.add(STACK_MOTION, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-step-card]", section);
        cards.slice(0, -1).forEach((card, index) => {
          gsap.to(card, {
            scale: 0.92 + index * 0.015,
            filter: "brightness(0.92)",
            ease: "none",
            scrollTrigger: { trigger: cards[index + 1], start: "top 85%", end: "top 30%", scrub: true, invalidateOnRefresh: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="bg-white">
      <section ref={root} id="pinjam" data-chapter="pinjam" className="shape-inset relative overflow-x-clip bg-sky px-6 py-28 lg:px-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <p data-rise className="label">{pinjam.kicker}</p>
          <PopTitle className="heading">{pinjam.title}</PopTitle>
          <p data-rise="0.15" className="lead">{pinjam.lead}</p>
          <HandNote decorative className="rotate-2">
            {pinjam.note}
          </HandNote>
        </div>

        <div data-road className="relative mx-auto mt-16 max-w-[84rem] lg:mt-24">
          <svg viewBox="0 0 1200 420" className="pointer-events-none absolute inset-x-0 top-1/2 hidden w-full -translate-y-1/2 lg:block" aria-hidden="true">
            <path d="M-20 300 C 140 80 300 80 380 220 S 600 380 720 200 S 980 40 1220 160" fill="none" stroke="var(--color-white)" strokeWidth="26" strokeLinecap="round" />
            <path data-road-line d="M-20 300 C 140 80 300 80 380 220 S 600 380 720 200 S 980 40 1220 160" fill="none" stroke="var(--color-blue)" strokeWidth="8" strokeLinecap="round" />
          </svg>
          {/* The travelling cover rides above the cards on an invisible copy of the road in the same box. */}
          <svg viewBox="0 0 1200 420" className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden w-full -translate-y-1/2 overflow-visible lg:block" aria-hidden="true">
            <path data-road-guide d="M-20 300 C 140 80 300 80 380 220 S 600 380 720 200 S 980 40 1220 160" fill="none" />
            <g data-road-book>
              <rect x="-32" y="-46" width="64" height="94" rx="8" fill="var(--color-ink)" opacity="0.25" transform="translate(6 8)" />
              <image href={TRAVELLER.cover.src} x="-32" y="-46" width="64" height="94" preserveAspectRatio="xMidYMid slice" />
            </g>
          </svg>

          <ol className="relative grid gap-6 lg:grid-cols-4 lg:gap-5">
            {pinjam.steps.map((step, index) => (
              <li key={step.title} className="sticky lg:static" style={{ top: `${5.5 + index * 1.25}rem` }}>
                <article
                  data-step-card
                  className="flex min-h-[25rem] flex-col gap-4 rounded-[1.5rem] p-5 shadow-[0_24px_50px_-30px_rgb(3_4_10/0.5)]"
                  style={{ background: `var(--color-${step.tone})`, rotate: `${TILT[index]}deg` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-full bg-navy font-display text-xl font-extrabold text-white">{index + 1}</span>
                  </div>
                  <div className="relative mx-auto aspect-square w-[min(70%,12rem)] overflow-hidden rounded-[1.25rem] bg-sky">
                    <Image src={illustrationImages[step.art]} alt="" sizes="192px" className="h-full w-full object-contain p-2" />
                  </div>
                  <h3 className="statement mt-auto">{step.title}</h3>
                  <p className="font-semibold">{step.body}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
