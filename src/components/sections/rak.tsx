"use client";

import { useRef, useState } from "react";

import { BookSpine, type BookPattern, type BookTone } from "@/components/art/books";
import { CurvedArrow, Tape } from "@/components/art/doodles";
import { badges } from "@/content/badges";
import { rak } from "@/content/story";
import { drawDoodle, prepareDoodles, revealDoodles } from "@/lib/motion/draw";
import { EASE_OUT, gsap, MOTION_OK, useGSAP } from "@/lib/motion/gsap";

// One tier I badge per category stands on the shelf; names and criteria come straight from the app (badges.ts).
const shelf = [...new Set(badges.map((badge) => badge.group))].map(
  (group) => badges.find((badge) => badge.group === group && badge.tier === "I")!,
);
const groupName = (group: string) => group.replace(/\s*\(.*\)$/, "");

// Literal looks per spine so the shelf reads as six different books, not a repeated component.
const LOOKS: { tone: BookTone; pattern: BookPattern; height: string; width: string }[] = [
  { tone: "blue", pattern: "waves", height: "h-[92%]", width: "w-[4.6rem]" },
  { tone: "ember", pattern: "dots", height: "h-[78%]", width: "w-[4rem]" },
  { tone: "plum", pattern: "stripes", height: "h-full", width: "w-[5.2rem]" },
  { tone: "highlight", pattern: "grid", height: "h-[84%]", width: "w-[4.2rem]" },
  { tone: "forest", pattern: "arches", height: "h-[95%]", width: "w-[4.8rem]" },
  { tone: "peach", pattern: "sun", height: "h-[74%]", width: "w-[4.4rem]" },
];
const LABEL_ON_DARK = new Set<BookTone>(["blue", "plum", "forest"]);

// The badge deck as a bookshelf (F-012 FR-004): spines drop onto the shelf, a pointer pulls one up, and choosing one
// opens its note. Buttons with aria-expanded keep it usable by keyboard and screen reader (AC-007).
export function Rak() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);
  const badge = shelf[open];

  const { contextSafe } = useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        prepareDoodles(section);
        const spines = gsap.utils.toArray<HTMLElement>("[data-spine]", section);
        gsap
          .timeline({ scrollTrigger: { trigger: "[data-shelf]", start: "top 75%", once: true } })
          .from(spines, {
            y: -220,
            rotation: (i: number) => (i % 2 ? 14 : -10),
            autoAlpha: 0,
            duration: 1.1,
            ease: EASE_OUT,
            stagger: 0.08,
            clearProps: "transform",
          })
          .from("[data-rak-note]", { y: 40, rotation: 6, autoAlpha: 0, duration: 1, ease: EASE_OUT }, 0.3)
          .add(drawDoodle(section.querySelector("[data-rak-arrow]")!, { duration: 0.6 }), 0.9);
        return () => revealDoodles(section);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const choose = contextSafe((index: number) => {
    setOpen(index);
    if (window.matchMedia(MOTION_OK).matches) {
      gsap.fromTo("[data-rak-note-body]", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: EASE_OUT });
    }
  });

  return (
    <section ref={root} id="rak" data-chapter="rak" className="relative overflow-hidden px-4 py-24 md:px-10">
      <div className="flex max-w-4xl flex-col gap-4">
        <h2 className="label text-slate">{rak.kicker}</h2>
        <p className="statement">{rak.statement}</p>
        <p className="text-slate">
          {rak.summary} {rak.hint}
        </p>
      </div>

      <div className="mt-14 grid items-end gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)]">
        <div className="relative">
          <div data-shelf className="flex h-[min(56svh,26rem)] items-end gap-2.5 overflow-x-auto px-2 pt-10 sm:gap-3.5">
            {shelf.map((item, index) => {
              const look = LOOKS[index % LOOKS.length];
              const expanded = open === index;
              return (
                <button
                  key={item.code}
                  type="button"
                  data-spine
                  aria-expanded={expanded}
                  aria-controls="rak-catatan"
                  onClick={() => choose(index)}
                  className={`spine relative shrink-0 ${look.height} ${look.width} cursor-pointer text-left focus-visible:outline-offset-4`}
                >
                  <BookSpine tone={look.tone} pattern={look.pattern} id={item.code}>
                    <span
                      className={`absolute inset-0 flex items-center justify-center px-1 font-display text-lg font-bold [writing-mode:vertical-rl] ${LABEL_ON_DARK.has(look.tone) ? "text-paper" : "text-ink"}`}
                    >
                      <span className="rotate-180 rounded-full px-1.5 py-2" style={{ background: `var(--color-${look.tone})` }}>
                        {groupName(item.group)}
                      </span>
                    </span>
                  </BookSpine>
                </button>
              );
            })}
          </div>
          {/* The shelf plank and its two brackets. */}
          <div className="h-4 rounded-sm border-[3px] border-ink bg-peach" aria-hidden="true" />
          <div className="flex justify-between px-10" aria-hidden="true">
            <span className="h-8 w-4 border-x-[3px] border-b-[3px] border-ink bg-peach" />
            <span className="h-8 w-4 border-x-[3px] border-b-[3px] border-ink bg-peach" />
          </div>
        </div>

        <div data-rak-note id="rak-catatan" aria-live="polite" className="relative rotate-1 rounded-sm bg-peach-pale p-7 pt-10 text-ink shadow-[6px_8px_0_var(--color-ink)]">
          <Tape className="absolute -top-3 left-1/2 w-24 -translate-x-1/2 -rotate-2" />
          <div data-rak-note-body className="flex flex-col gap-4">
            <p className="label">
              {rak.tierLabel} {badge.tier} · {groupName(badge.group)}
            </p>
            <p className="font-serif text-4xl italic">{badge.title}</p>
            <p className="text-slate">“{badge.philosophy}”</p>
            <p>
              <span className="label block">{rak.criteriaLabel}</span>
              <span className="text-xl font-medium">{badge.criteria}</span>
            </p>
          </div>
          <div className="pointer-events-none absolute -bottom-16 -left-4 hidden items-center gap-1 lg:flex" aria-hidden="true">
            <CurvedArrow data-rak-arrow="" className="h-14 w-16 rotate-[150deg] text-ink" />
            <p className="hand -rotate-3 text-2xl text-blue">{rak.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
