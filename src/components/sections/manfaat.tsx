"use client";

import { useRef } from "react";

import { Blobs } from "@/components/motion/blobs";
import { LogoMark } from "@/components/site/logo";
import { manfaat } from "@/content/story";
import { gsap, HOVER_MOTION, LAND, MOTION_OK, useGSAP } from "@/lib/motion/gsap";

// Where each pill rests on wide screens: position (percent of the section) and tilt.
const SPOT = [
  { left: "4%", top: "20%", rotate: -8 },
  { left: "36%", top: "13%", rotate: 6 },
  { left: "3%", top: "46%", rotate: 4 },
  { left: "56%", top: "37%", rotate: -5 },
  { left: "24%", top: "71%", rotate: 3 },
] as const;

const BLOBS = [
  { d: "M1180 80 C1320 30 1470 120 1460 270 C1450 410 1320 470 1210 430 C1100 390 1060 290 1080 200 C1090 140 1120 100 1180 80 Z", color: "var(--color-pale-orange)" },
] as const;

// The benefits as big rounded labels (F-013, reference "benefits"): they pop in at random tilts with a spring, and a
// fine pointer can shove them; each one drifts with the pointer's speed and springs back home.
export function Manfaat() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const pills = gsap.utils.toArray<HTMLElement>("[data-pill]", section);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          pills,
          { scale: 0, rotate: (i: number) => (i % 2 ? 33 : -33) },
          {
            scale: 1,
            rotate: (i: number) => SPOT[i % SPOT.length].rotate,
            ease: "elastic.out(1, 0.75)",
            duration: 0.85,
            stagger: 0.072,
            scrollTrigger: { trigger: section, start: "top 45%", once: true },
          },
        );
        gsap.from("[data-badge]", { scale: 0, rotate: -64, duration: 1, ease: LAND, scrollTrigger: { trigger: section, start: "top 45%", once: true } });
      });

      // Momentum hover: the pointer's velocity at the moment it crosses a pill becomes a push and a spin, clamped, after
      // which the pill springs back to its spot.
      mm.add(`${HOVER_MOTION} and (min-width: 1024px)`, () => {
        let last = { x: 0, y: 0, t: 0 };
        let velocity = { x: 0, y: 0 };
        const onMove = (event: PointerEvent) => {
          const dt = Math.max(1, event.timeStamp - last.t);
          velocity = { x: ((event.clientX - last.x) / dt) * 16, y: ((event.clientY - last.y) / dt) * 16 };
          last = { x: event.clientX, y: event.clientY, t: event.timeStamp };
        };
        const clamp = gsap.utils.clamp(-140, 140);
        const shoves = pills.map((pill, index) => {
          const shove = () => {
            const rest = SPOT[index % SPOT.length].rotate;
            gsap
              .timeline({ overwrite: true })
              .to(pill, { x: clamp(velocity.x * 6), y: clamp(velocity.y * 6), rotate: rest + clamp(velocity.x * 1.2) / 4, duration: 0.45, ease: "power3.out" })
              .to(pill, { x: 0, y: 0, rotate: rest, duration: 1.1, ease: "elastic.out(1, 0.5)" });
          };
          pill.addEventListener("pointerenter", shove);
          return () => pill.removeEventListener("pointerenter", shove);
        });
        section.addEventListener("pointermove", onMove);
        return () => {
          section.removeEventListener("pointermove", onMove);
          shoves.forEach((off) => off());
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="manfaat" data-chapter="manfaat" className="shape-bottom relative isolate overflow-hidden bg-peach px-6 pt-24 pb-28 lg:min-h-[52rem] lg:px-10">
      <Blobs blobs={BLOBS} small className="absolute inset-0 -z-10 h-full w-full" />
      <h2 className="statement relative">{manfaat.title}</h2>
      <ul className="mt-10 flex flex-wrap justify-center gap-3 lg:mt-0 lg:block">
        {manfaat.pills.map((pill, index) => (
          <li
            key={pill.label}
            data-pill
            className="rounded-full px-[0.6em] py-[0.25em] font-display text-[clamp(1.9rem,4.4vw,4.25rem)] leading-none font-extrabold tracking-tight lg:absolute lg:whitespace-nowrap"
            style={{ background: `var(--color-${pill.tone})`, left: SPOT[index].left, top: SPOT[index].top }}
          >
            {pill.label}
          </li>
        ))}
      </ul>
      {/* The club's badge: the app's mark on a white disc, like a sticker on the board. */}
      <div data-badge className="mx-auto mt-12 grid size-40 place-items-center rounded-full bg-white lg:absolute lg:right-[7%] lg:bottom-[9%] lg:mt-0 lg:size-56" aria-hidden="true">
        <LogoMark className="w-1/2 text-blue" />
      </div>
    </section>
  );
}
