"use client";

import { useRef, useState, type CSSProperties } from "react";

import { BookCover, type BookPattern, type BookTone } from "@/components/art/books";
import { Ribbon } from "@/components/art/ribbon";
import { HandNote } from "@/components/motion/hand-note";
import { PopTitle } from "@/components/motion/pop-title";
import { badges } from "@/content/badges";
import { rak } from "@/content/story";
import { gsap, MOTION_OK, useGSAP } from "@/lib/motion/gsap";

// One tier I badge per category; names and criteria come straight from the app (badges.ts).
const shelf = [...new Set(badges.map((badge) => badge.group))].map(
  (group) => badges.find((badge) => badge.group === group && badge.tier === "I")!,
);
const groupName = (group: string) => group.replace(/\s*\(.*\)$/, "");

const LOOKS: { tone: BookTone; pattern: BookPattern; ribbon: string }[] = [
  { tone: "blue", pattern: "waves", ribbon: "coral" },
  { tone: "coral", pattern: "dots", ribbon: "blue" },
  { tone: "green", pattern: "stripes", ribbon: "ember" },
  { tone: "ember", pattern: "sun", ribbon: "green" },
  { tone: "gold", pattern: "arches", ribbon: "blue" },
  { tone: "sky", pattern: "grid", ribbon: "coral" },
];
const TILT = [-3, 2, -2, 3, -1, 2] as const;

// The badge shelf as cards on a yellow capsule (F-013, reference "members' choice"): cards drop in with a spring and
// each turns over to show its philosophy and criteria. Real buttons with aria-pressed keep it usable by keyboard.
export function Rak() {
  const root = useRef<HTMLElement>(null);
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-badge-card]", {
          yPercent: 120,
          rotation: (i: number) => TILT[i] * 4,
          autoAlpha: 0,
          duration: 1.05,
          ease: "elastic.out(1, 0.75)",
          stagger: 0.088,
          scrollTrigger: { trigger: "[data-badge-grid]", start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="bg-white">
      <section ref={root} id="rak" data-chapter="rak" className="shape-capsule overflow-hidden bg-highlight px-6 py-28 lg:px-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <PopTitle className="heading">{rak.title}</PopTitle>
          <p className="lead">{rak.lead}</p>
          <HandNote decorative className="-rotate-2">
            {rak.note}
          </HandNote>
        </div>
        <ul data-badge-grid className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shelf.map((badge, index) => {
            const look = LOOKS[index % LOOKS.length];
            const isFlipped = Boolean(flipped[badge.code]);
            return (
              <li key={badge.code} data-badge-card className="[perspective:1400px] sm:[rotate:var(--tilt)]" style={{ "--tilt": `${TILT[index]}deg` } as CSSProperties}>
                <button
                  type="button"
                  aria-pressed={isFlipped}
                  aria-label={`${rak.flipLabel}: ${badge.title}`}
                  onClick={() => setFlipped((all) => ({ ...all, [badge.code]: !isFlipped }))}
                  className="flip-inner relative block h-[26rem] w-full text-left"
                  data-flipped={isFlipped || undefined}
                >
                  <span className="flip-face absolute inset-0 flex flex-col gap-4 rounded-3xl bg-peach-pale p-4" aria-hidden={isFlipped}>
                    <Ribbon tone={look.ribbon} className="absolute -top-3 right-6 h-16 w-6" />
                    <span className="label px-2 pt-2">
                      {rak.tierLabel} {badge.tier} · {groupName(badge.group)}
                    </span>
                    <span className="mx-auto w-[46%] -rotate-3">
                      <BookCover tone={look.tone} pattern={look.pattern} id={`rak-${badge.code}`} className="w-full" />
                    </span>
                    <span className="statement mt-auto px-2 pb-2">{badge.title}</span>
                  </span>
                  <span className="flip-face flip-back absolute inset-0 flex flex-col justify-between gap-4 rounded-3xl p-6" style={{ background: `var(--color-${look.tone === "blue" ? "sky" : look.tone})` }} aria-hidden={!isFlipped}>
                    <span className="lead">“{badge.philosophy}”</span>
                    <span className="flex flex-col gap-1">
                      <span className="label">{rak.criteriaLabel}</span>
                      <span className="font-display text-2xl font-bold">{badge.criteria}</span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
