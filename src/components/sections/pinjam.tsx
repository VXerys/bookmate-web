"use client";

import { useRef } from "react";

import { BorrowIcon } from "@/components/art/borrow-icons";
import { HandNote } from "@/components/motion/hand-note";
import { PopTitle } from "@/components/motion/pop-title";
import { shelfBook } from "@/components/site/shelf";
import { pinjam } from "@/content/story";
import { gsap, LAND, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { SectionWaves } from "@/components/art/section-waves";

const WIDE_MOTION = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const STACK_MOTION = "(max-width: 1023px) and (prefers-reduced-motion: no-preference)";
const TILT = [-4, 3, -2, 4] as const;
const TRAVELLER = shelfBook("remarkablyBrightCreatures");

// Chapter 2, borrow (F-014): the four steps of the app's borrow flow as cards with animated step icons. On wide
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
        // Cards stay opaque (only position and tilt animate), so the road behind never shows through the copy.
        gsap.set(cards, { yPercent: 35, scale: 0.9, rotation: (i: number) => -TILT[i] });
        const shown = cards.map(() => false);
        const reveal = (index: number, on: boolean) => {
          if (shown[index] === on) return;
          shown[index] = on;
          gsap.to(cards[index], on ? { yPercent: 0, scale: 1, rotation: 0, duration: 0.9, ease: LAND, overwrite: true } : { yPercent: 35, scale: 0.9, rotation: -TILT[index], duration: 0.4, ease: "power2.in", overwrite: true });
        };
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: "[data-road]",
              start: "top 85%",
              end: "bottom 60%",
              scrub: 0.8,
              onUpdate: (self) => cards.forEach((_, i) => reveal(i, self.progress >= i / cards.length + 0.02)),
            },
          })
          .fromTo("[data-road-line]", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1 }, 0)
          .to("[data-road-book]", { motionPath: { path: "[data-road-guide]", align: "[data-road-guide]", alignOrigin: [0.5, 0.5], autoRotate: false }, rotation: 360, transformOrigin: "50% 50%", duration: 1 }, 0);
        // Only the transform: "all" would also wipe each card's inline background and tilt, leaving it see-through.
        return () => gsap.set(cards, { clearProps: "transform" });
      });
      // Each step icon acts out its step on a loop, only while it is on screen.
      mm.add(MOTION_OK, () => {
        const icon = (kind: string) => section.querySelector<SVGSVGElement>(`[data-icon="${kind}"]`);
        const loops: [SVGSVGElement | null, gsap.core.Timeline][] = [];
        const cari = icon("cari");
        if (cari) {
          const tl = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: "power2.inOut" } });
          tl.to(cari.querySelector("[data-icon-lens]"), { x: 31, duration: 1 })
            .to(cari.querySelector("[data-icon-lift]"), { y: -14, rotation: -6, svgOrigin: "95 122", duration: 0.45, ease: "back.out(2)" })
            .to({}, { duration: 0.6 })
            .to(cari.querySelector("[data-icon-lift]"), { y: 0, rotation: 0, duration: 0.4 })
            .to(cari.querySelector("[data-icon-lens]"), { x: 88, duration: 0.9 })
            .to(cari.querySelector("[data-icon-lens]"), { x: 0, duration: 1.1 });
          loops.push([cari, tl]);
        }
        const tap = icon("pinjam");
        if (tap) {
          const check = tap.querySelector("[data-icon-check]");
          gsap.set(check, { scale: 0, svgOrigin: "146 34" });
          const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6, paused: true });
          tl.to(tap.querySelector("[data-icon-button]"), { scale: 0.88, svgOrigin: "100 115", duration: 0.15, ease: "power2.in" }, 0.4)
            .to(tap.querySelector("[data-icon-button]"), { scale: 1, duration: 0.5, ease: "back.out(3)" })
            .fromTo(tap.querySelector("[data-icon-ripple]"), { scale: 0.4, opacity: 1, svgOrigin: "100 115" }, { scale: 2.6, opacity: 0, duration: 0.7, ease: "power2.out" }, 0.55)
            .to(check, { scale: 1, duration: 0.5, ease: "back.out(2.5)" }, 0.8)
            .to(check, { scale: 0, duration: 0.3, ease: "power2.in" }, 2.4);
          loops.push([tap, tl]);
        }
        const chat = icon("chat");
        if (chat) {
          const a = chat.querySelector('[data-icon-bubble="a"]');
          const b = chat.querySelector('[data-icon-bubble="b"]');
          gsap.set(a, { scale: 0, svgOrigin: "46 94" });
          gsap.set(b, { scale: 0, svgOrigin: "156 144" });
          const tl = gsap.timeline({ repeat: -1, paused: true });
          tl.to(a, { scale: 1, duration: 0.5, ease: "back.out(2)" })
            .to(chat.querySelectorAll("[data-icon-dot]"), { y: -7, duration: 0.25, ease: "sine.inOut", yoyo: true, repeat: 3, stagger: 0.1 })
            .to(b, { scale: 1, duration: 0.5, ease: "back.out(2)" }, "-=0.3")
            .to({}, { duration: 1 })
            .to([a, b], { scale: 0, duration: 0.3, ease: "power2.in", stagger: 0.08 });
          loops.push([chat, tl]);
        }
        const ulas = icon("ulas");
        if (ulas) {
          const stars = ulas.querySelectorAll("[data-icon-star]");
          gsap.set(stars, { fill: "var(--color-white)" });
          const tl = gsap.timeline({ repeat: -1, paused: true });
          tl.to(ulas.querySelector("[data-icon-loop]"), { rotation: 360, duration: 1.4, ease: "power2.inOut" })
            .to(stars, { fill: "var(--color-highlight)", scale: 1.25, transformOrigin: "50% 50%", duration: 0.2, stagger: 0.14 })
            .to(stars, { scale: 1, duration: 0.25, stagger: 0.14 }, "<0.15")
            .to({}, { duration: 1 })
            .to(stars, { fill: "var(--color-white)", duration: 0.3 });
          loops.push([ulas, tl]);
        }
        loops.forEach(([el, tl]) => {
          if (!el) return;
          ScrollTrigger.create({ trigger: el, start: "top bottom", end: "bottom top", onToggle: (self) => (self.isActive ? tl.play() : tl.pause()) });
        });
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
      <section ref={root} id="pinjam" data-chapter="pinjam" className="shape-inset relative isolate overflow-x-clip bg-peach-pale px-6 py-16 lg:py-20 lg:px-10">
        <SectionWaves variant="pinjam" />
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <p data-rise className="label">{pinjam.kicker}</p>
          <PopTitle className="heading">{pinjam.title}</PopTitle>
          <p data-rise="0.15" className="lead">{pinjam.lead}</p>
          <HandNote decorative className="rotate-2">
            {pinjam.note}
          </HandNote>
        </div>

        <div data-road className="relative mx-auto mt-10 max-w-[84rem] lg:mt-12">
          <svg viewBox="0 0 1200 420" className="pointer-events-none absolute inset-x-0 top-1/2 hidden w-full -translate-y-1/2 lg:block" aria-hidden="true">
            <path d="M-20 300 C 140 80 300 80 380 220 S 600 380 720 200 S 980 40 1220 160" fill="none" stroke="var(--color-sky)" strokeWidth="26" strokeLinecap="round" />
            <path data-road-line d="M-20 300 C 140 80 300 80 380 220 S 600 380 720 200 S 980 40 1220 160" fill="none" stroke="var(--color-blue)" strokeWidth="8" strokeLinecap="round" />
          </svg>
          {/* The travelling cover rides the road behind the cards (an invisible copy of it in the same box), showing in the
              gaps between them and never covering their copy. */}
          <svg viewBox="0 0 1200 420" className="pointer-events-none absolute inset-x-0 top-1/2 hidden w-full -translate-y-1/2 overflow-visible lg:block" aria-hidden="true">
            <path data-road-guide d="M-20 300 C 140 80 300 80 380 220 S 600 380 720 200 S 980 40 1220 160" fill="none" />
            <g data-road-book>
              <rect x="-32" y="-46" width="64" height="94" rx="8" fill="var(--color-navy)" fillOpacity="0.3" transform="translate(6 9)" />
              <rect x="-35" y="-49" width="70" height="100" rx="9" fill="var(--color-white)" />
              <image href={TRAVELLER.cover.src} x="-32" y="-46" width="64" height="94" preserveAspectRatio="xMidYMid slice" opacity="1" />
            </g>
          </svg>

          <ol className="relative grid gap-6 lg:grid-cols-4 lg:gap-5">
            {pinjam.steps.map((step, index) => (
              <li key={step.title} className="sticky lg:static" style={{ top: `${5.5 + index * 1.25}rem` }}>
                <article
                  data-step-card
                  className="will-change-transform flex min-h-[21rem] flex-col gap-3 rounded-[1.5rem] p-5 shadow-[0_24px_50px_-30px_rgb(3_4_10/0.5)]"
                  style={{ background: `var(--color-${step.tone})`, rotate: `${TILT[index]}deg` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-full bg-navy font-display text-xl font-extrabold text-white">{index + 1}</span>
                  </div>
                  <div className={`relative mx-auto grid aspect-[5/4] w-full max-w-[15rem] place-items-center rounded-[1.25rem] ${step.tone === "white" ? "bg-sky" : "bg-white"}`}>
                    <BorrowIcon kind={step.art} className="w-[86%]" />
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
