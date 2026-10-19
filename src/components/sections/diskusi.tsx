"use client";

import { useRef } from "react";

import { diskusi } from "@/content/story";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";

export function Diskusi() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", section);
      const row = section.querySelector<HTMLElement>("[data-marquee-row]");
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Each card shrinks a little as the next one slides over it (sticky stack, AC-001).
        cards.slice(0, -1).forEach((card, index) => {
          gsap.to(card, {
            scale: 0.92,
            ease: "none",
            scrollTrigger: { trigger: cards[index + 1], start: "top bottom", end: "top 30%", scrub: true },
          });
        });
        if (!row) return;
        // The marquee speeds up with scroll velocity and rests outside the viewport (AC-002).
        const loop = gsap.to(row, { xPercent: -50, duration: 24, ease: "none", repeat: -1, paused: true });
        const visibility = ScrollTrigger.create({
          trigger: row,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
          onUpdate: (self) => {
            const boost = Math.min(Math.abs(self.getVelocity()) / 300, 5);
            gsap.to(loop, { timeScale: 1 + boost, duration: 0.3, overwrite: true });
          },
        });
        return () => {
          visibility.kill();
          loop.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="diskusi" data-chapter="diskusi" className="flex flex-col gap-12 overflow-hidden bg-blue py-24 text-ink">
      <div className="flex flex-col gap-4 px-4 md:px-10">
        <h2 className="label">{diskusi.kicker}</h2>
        <p className="statement max-w-3xl">{diskusi.statement}</p>
      </div>
      <ol className="flex flex-col gap-6 px-4 md:px-10">
        {diskusi.cards.map((card, index) => (
          <li
            key={card.title}
            data-stack-card
            className="sticky flex min-h-56 origin-top flex-col justify-between gap-6 rounded-3xl bg-paper p-6 text-ink shadow-xl md:p-10"
            style={{ top: `${6 + index * 1.5}rem` }}
          >
            <span className="label text-slate">{String(index + 1).padStart(2, "0")}</span>
            <span className="statement">{card.title}</span>
            <span className="max-w-xl text-lg">{card.body}</span>
          </li>
        ))}
      </ol>
      <div className="flex overflow-hidden whitespace-nowrap [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]" aria-hidden="true">
        <div data-marquee-row className="flex shrink-0">
          {[0, 1].map((copy) =>
            diskusi.marquee.map((word) => (
              <span key={`${copy}-${word}`} className="display px-6 text-[clamp(2.5rem,6vw,5.5rem)] italic">
                {word} ·
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
