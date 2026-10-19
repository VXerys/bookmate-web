"use client";

import { useRef, useState } from "react";

import { badges } from "@/content/badges";
import { kartu } from "@/content/story";
import { Flip, gsap, MOTION_OK, POINTER_MOTION, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";

// One tier I badge per category opens the deck; names and criteria come straight from the app (badges.ts).
const deck = [...new Set(badges.map((badge) => badge.group))].map(
  (group) => badges.find((badge) => badge.group === group && badge.tier === "I")!,
);

const groupName = (group: string) => group.replace(/\s*\(.*\)$/, "");

export function Kartu() {
  const root = useRef<HTMLElement>(null);
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  useGSAP(
    () => {
      const section = root.current;
      const grid = section?.querySelector<HTMLElement>("[data-deck]");
      if (!section || !grid) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", section);
      const mm = gsap.matchMedia();

      // Dealt once from a stack into the grid as the section arrives (AC-005).
      mm.add(MOTION_OK, () => {
        grid.classList.add("deck-stacked");
        const deal = ScrollTrigger.create({
          trigger: grid,
          start: "top 75%",
          once: true,
          onEnter: () => {
            const state = Flip.getState(cards);
            grid.classList.remove("deck-stacked");
            Flip.from(state, { duration: 1.1, ease: "expo.out", stagger: 0.06, absolute: true });
          },
        });
        return () => {
          deal.kill();
          grid.classList.remove("deck-stacked");
        };
      });

      // Tilt toward the pointer and a short liquid ripple through the SVG filter (AC-007).
      mm.add(POINTER_MOTION, () => {
        const displacement = section.querySelector("#liquid-ripple feDisplacementMap");
        const cleanups = cards.map((card) => {
          const tiltX = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
          const tiltY = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
          const onMove = (event: PointerEvent) => {
            if (event.pointerType !== "mouse") return;
            const box = card.getBoundingClientRect();
            tiltX(((event.clientX - box.left) / box.width - 0.5) * 16);
            tiltY(-((event.clientY - box.top) / box.height - 0.5) * 16);
          };
          const onEnter = () => {
            if (!displacement) return;
            card.classList.add("is-rippling");
            gsap.fromTo(displacement, { attr: { scale: 0 } }, {
              attr: { scale: 24 },
              duration: 0.35,
              ease: "power2.out",
              yoyo: true,
              repeat: 1,
              onComplete: () => card.classList.remove("is-rippling"),
            });
          };
          const onLeave = () => {
            tiltX(0);
            tiltY(0);
          };
          card.addEventListener("pointermove", onMove);
          card.addEventListener("pointerenter", onEnter);
          card.addEventListener("pointerleave", onLeave);
          return () => {
            card.removeEventListener("pointermove", onMove);
            card.removeEventListener("pointerenter", onEnter);
            card.removeEventListener("pointerleave", onLeave);
          };
        });
        return () => cleanups.forEach((cleanup) => cleanup());
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="kartu" data-chapter="kartu" className="flex min-h-svh flex-col gap-10 px-4 py-24 md:px-10">
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <filter id="liquid-ripple">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="flex flex-col gap-4">
        <h2 className="label text-slate">{kartu.kicker}</h2>
        <p className="statement max-w-3xl">{kartu.statement}</p>
        <p className="text-slate">
          {kartu.summary}. {kartu.flipHint}.
        </p>
      </div>
      <ul data-deck className="deck relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [perspective:1200px]">
        {deck.map((badge) => {
          const isFlipped = Boolean(flipped[badge.code]);
          return (
            <li key={badge.code} data-card className="card min-h-72">
              <button
                type="button"
                aria-pressed={isFlipped}
                onClick={() => setFlipped((all) => ({ ...all, [badge.code]: !isFlipped }))}
                className="card-inner relative block h-full min-h-72 w-full rounded-2xl text-left"
                data-flipped={isFlipped || undefined}
              >
                <span className="card-face card-front absolute inset-0 flex flex-col justify-between rounded-2xl bg-plum p-5 text-paper" aria-hidden={isFlipped}>
                  <span className="label text-peach">Tier {badge.tier} · {groupName(badge.group)}</span>
                  <span className="font-serif text-3xl italic">{badge.title}</span>
                </span>
                <span className="card-face card-back absolute inset-0 flex flex-col justify-between gap-4 rounded-2xl bg-peach-pale p-5 text-ink" aria-hidden={!isFlipped}>
                  <span className="text-sm italic">“{badge.philosophy}”</span>
                  <span>
                    <span className="label block">{kartu.criteriaLabel}</span>
                    <span className="text-lg">{badge.criteria}</span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
