"use client";

import { useRef, type ReactNode } from "react";

import { gsap, LAND, MOTION_OK, useGSAP } from "@/lib/motion/gsap";

type CardShelfProps = {
  id: string;
  label: string;
  previous: string;
  next: string;
  // Heading block shown to the left of the round buttons.
  intro: ReactNode;
  children: ReactNode;
};

// A horizontal shelf of cards (F-013, reference "books" slider). Native scrolling with snap keeps touch, trackpad, and
// keyboard working; the round buttons step one card. Cards drop in with a spring and rest with small alternating tilts
// and offsets, like the reference's slider items (rotation 1.5 to 3 degrees, y 3 to 9 percent).
export function CardShelf({ id, label, previous, next, intro, children }: CardShelfProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-shelf-card]", el);
        const rest = (i: number) => ({ rotation: (i % 2 ? 1 : -1) * (1.5 + (i % 3) * 0.75), yPercent: (i % 2 ? 1 : -1) * (1.5 + (i % 3)) });
        gsap.set(cards, { rotation: (i: number) => rest(i).rotation, yPercent: (i: number) => rest(i).yPercent });
        gsap.from(cards, {
          yPercent: 40,
          rotation: (i: number) => (i % 2 ? 9 : -8),
          autoAlpha: 0,
          duration: 1.05,
          ease: LAND,
          stagger: 0.072,
          scrollTrigger: { trigger: el.querySelector("[data-shelf-track]"), start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const step = (direction: 1 | -1) => {
    const track = root.current?.querySelector<HTMLElement>("[data-shelf-track]");
    const card = track?.querySelector<HTMLElement>("[data-shelf-card]");
    if (!track || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * (card.offsetWidth + 16), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div ref={root}>
      <div className="mx-auto flex max-w-[90rem] flex-wrap items-end justify-between gap-8 px-6 lg:px-10">
        <div className="flex max-w-2xl flex-col gap-5">{intro}</div>
        <div className="flex gap-2">
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              onClick={() => step(direction)}
              aria-label={direction < 0 ? previous : next}
              aria-controls={id}
              className="grid size-14 place-items-center rounded-full bg-ink text-white transition-transform hover:scale-105"
            >
              <svg viewBox="0 0 14 12" className={`w-4 ${direction < 0 ? "rotate-180" : ""}`} aria-hidden="true">
                <path d="M1 6h11M7.5 1.5 12 6l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>
      <ul
        id={id}
        data-shelf-track
        tabIndex={0}
        aria-label={label}
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pt-8 pb-12 lg:scroll-px-10 lg:px-10"
      >
        {children}
      </ul>
    </div>
  );
}
