"use client";

import { useRef } from "react";

import { streak } from "@/content/story";
import { gsap, MOTION_OK, useGSAP } from "@/lib/motion/gsap";

const DAYS = 30;

// The calendar is an illustration labelled as such (F-006 AC-003): it fills day by day while the section is pinned.
export function Streak() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const days = gsap.utils.toArray<HTMLElement>("[data-day]", section);
      const counter = section.querySelector<HTMLElement>("[data-counter]");
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const state = { value: 0 };
        const render = () => {
          const filled = Math.round(state.value);
          if (counter) counter.textContent = String(filled);
          days.forEach((day, index) => day.toggleAttribute("data-on", index < filled));
        };
        render();
        gsap.to(state, {
          value: DAYS,
          ease: "none",
          onUpdate: render,
          scrollTrigger: { trigger: section, start: "top top", end: "+=120%", scrub: true, pin: true },
        });
        gsap.fromTo("[data-flame]", { scale: 0.6 }, { scale: 1.15, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: "+=120%", scrub: true } });
        return () => days.forEach((day) => day.setAttribute("data-on", ""));
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="streak" data-chapter="streak" className="grid min-h-svh items-center gap-12 bg-ink px-4 py-24 text-paper md:grid-cols-2 md:px-10">
      <div className="flex flex-col gap-6">
        <h2 className="label text-peach">{streak.kicker}</h2>
        <p className="statement">{streak.statement}</p>
        <p className="flex items-baseline gap-3">
          <span data-flame className="inline-block rounded-full bg-ember px-3 py-1 text-sm font-medium text-ink" aria-hidden="true">
            Streak
          </span>
          <span data-counter className="display text-[clamp(4rem,10vw,9rem)] text-ember">
            {DAYS}
          </span>
          <span className="text-peach">{streak.counterUnit}</span>
        </p>
      </div>
      <figure className="flex flex-col gap-3">
        <div className="grid grid-cols-7 gap-2" aria-hidden="true">
          {Array.from({ length: DAYS }, (_, index) => (
            <span key={index} data-day data-on="" className="streak-day aspect-square rounded-md border border-paper/20" />
          ))}
        </div>
        <figcaption className="label text-peach">{streak.calendarLabel}</figcaption>
      </figure>
    </section>
  );
}
