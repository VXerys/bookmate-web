"use client";

import { useRef } from "react";

import { Scene } from "@/components/art/scenes";
import { HandNote } from "@/components/motion/hand-note";
import { PopTitle } from "@/components/motion/pop-title";
import { hari } from "@/content/story";
import { drawDoodle, prepareDoodles, revealDoodles } from "@/lib/motion/draw";
import { gsap, MOTION_OK, POINTER_MOTION, useGSAP } from "@/lib/motion/gsap";

// Resting tilt per card, fixed rather than random so every visit settles the same way.
const TILT = [-4, 3, -2, 4, -3] as const;

// One reader's day as five hour cards (F-013, reference "how it works"): they drop in from below with a spring,
// settle at slight angles, and the card under the pointer stands up straight. Scene doodles draw as each card lands.
export function Hari() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-hour-card]", section);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        prepareDoodles(section);
        gsap.set(cards, { rotation: (i: number) => TILT[i] });
        const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-hour-row]", start: "top 85%", once: true } });
        tl.from(cards, { yPercent: 150, rotation: (i: number) => TILT[i] * 3, duration: 1.05, ease: "elastic.out(1, 0.75)", stagger: 0.088 });
        cards.forEach((card, index) => {
          card.querySelectorAll("[data-draw]").forEach((doodle) => tl.add(drawDoodle(doodle, { duration: 0.6 }), 0.5 + index * 0.088));
          const bar = card.querySelector("[data-scene-progress]");
          if (bar) tl.from(bar, { scaleX: 0, transformOrigin: "0% 50%", duration: 0.8 }, 0.7 + index * 0.088);
        });
        return () => revealDoodles(section);
      });

      // The row is split into equal portions; the card under the pointer's portion straightens and grows to 1.075 with
      // a spring, the one it replaces returns to its tilt (reference callout, validated with REA).
      mm.add(`${POINTER_MOTION} and (min-width: 1024px)`, () => {
        const row = section.querySelector<HTMLElement>("[data-hour-row]");
        if (!row) return;
        const spring = { duration: 0.85, ease: "elastic.out(1, 0.75)", overwrite: "auto" } as const;
        let active = -1;
        const pick = (next: number) => {
          if (next === active) return;
          if (active >= 0) gsap.to(cards[active], { scale: 1, rotation: TILT[active], ...spring });
          if (next >= 0) gsap.to(cards[next], { scale: 1.075, rotation: 0, ...spring });
          active = next;
        };
        const settle = () => pick(-1);
        const onMove = (event: PointerEvent) => {
          const box = row.getBoundingClientRect();
          pick(Math.min(cards.length - 1, Math.max(0, Math.floor(((event.clientX - box.left) / box.width) * cards.length))));
        };
        row.addEventListener("pointermove", onMove);
        row.addEventListener("pointerleave", settle);
        return () => {
          row.removeEventListener("pointermove", onMove);
          row.removeEventListener("pointerleave", settle);
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    // The white backing shows around the inset capsule instead of whatever sits behind the page layer.
    <div className="bg-white">
      <section ref={root} id="hari" data-chapter="hari" className="shape-inset overflow-hidden bg-pale-orange px-6 py-28 lg:px-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <PopTitle className="heading">{hari.title}</PopTitle>
          <p className="lead">{hari.lead}</p>
          <HandNote decorative className="rotate-2">
            {hari.note}
          </HandNote>
        </div>
        <ol data-hour-row className="mx-auto mt-16 flex max-w-[90rem] flex-wrap justify-center gap-5 lg:flex-nowrap lg:gap-0">
          {hari.hours.map((hour) => (
            <li
              key={hour.id}
              data-hour-card
              className="flex w-[min(86vw,17rem)] flex-col gap-3 rounded-3xl p-5 lg:-mx-2 lg:w-[19%]"
              style={{ background: `var(--color-${hour.tone})` }}
            >
              <p className="label">
                {hour.time} · {hour.when}
              </p>
              <h3 className="statement">{hour.title}</h3>
              <p className="text-[0.95rem] leading-snug font-semibold">{hour.body}</p>
              <div className="mt-auto rounded-2xl bg-white p-2">
                <Scene moment={hour.id} className="w-full" />
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
