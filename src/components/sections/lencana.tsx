"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";

import { Starburst } from "@/components/art/starburst";
import { HandNote } from "@/components/motion/hand-note";
import { PopTitle } from "@/components/motion/pop-title";
import { tarotImages } from "@/components/site/app-images";
import { badges } from "@/content/badges";
import { lencana } from "@/content/story";
import { gsap, HOVER_MOTION, MOTION_OK, useGSAP } from "@/lib/motion/gsap";

// The top tiers only (IV and V): their cards are the richest art in the set, which the owner asked to show. Names and
// criteria come straight from the app (badges.ts), the art from the app's tarot set (A-003).
const hand = badges.filter((badge) => badge.tier === "IV" || badge.tier === "V");
const groupName = (group: string) => group.replace(/\s*\(.*\)$/, "");
const TILT = [-3, 2, -2, 3, -1, 2] as const;
const BACK = ["sky", "highlight", "soft-green", "pale-orange", "soft-red", "peach"] as const;
const SPARKS = [
  { spot: "left-[6%] top-[18%]", size: "w-8", spin: 7 },
  { spot: "right-[9%] top-[30%]", size: "w-6", spin: -5 },
  { spot: "left-[14%] bottom-[14%]", size: "w-5", spin: 6 },
  { spot: "right-[16%] bottom-[8%]", size: "w-9", spin: -8 },
] as const;

// Chapter 5, celebrate (F-014): the app's top-tier tarot badges on a night stage. As the section scrolls in, the cards
// are dealt from one deck in the middle and fan out into the grid; each can then be turned over to read its philosophy
// and criteria. Real buttons with aria-pressed keep it usable by keyboard.
export function Lencana() {
  const root = useRef<HTMLElement>(null);
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const grid = section.querySelector<HTMLElement>("[data-deck]");
        const cards = gsap.utils.toArray<HTMLElement>("[data-deal]", section);
        if (!grid) return;
        // Offsets ignore transforms, so a refresh mid-deal still measures each card's place in the grid.
        const toDeck = (card: HTMLElement) => ({
          x: grid.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2),
          y: grid.clientHeight / 2 - (card.offsetTop + card.offsetHeight / 2),
        });
        gsap.from(cards, {
          x: (i: number) => toDeck(cards[i]).x,
          y: (i: number) => toDeck(cards[i]).y,
          rotation: (i: number) => (i % 2 ? 14 : -14),
          scale: 0.8,
          ease: "power2.inOut",
          stagger: 0.12,
          scrollTrigger: { trigger: grid, start: "top 80%", end: "center 55%", scrub: 0.8, invalidateOnRefresh: true },
        });
      });
      // A card held under a fine pointer tilts toward it (under 7 degrees), like turning a real card to the light.
      mm.add(HOVER_MOTION, () => {
        const offs = gsap.utils.toArray<HTMLElement>("[data-tilt]", section).map((card) => {
          const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });
          const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });
          const move = (event: PointerEvent) => {
            const box = card.getBoundingClientRect();
            ry(((event.clientX - box.left) / box.width - 0.5) * 14);
            rx(((event.clientY - box.top) / box.height - 0.5) * -14);
          };
          const leave = () => {
            rx(0);
            ry(0);
          };
          card.addEventListener("pointermove", move);
          card.addEventListener("pointerleave", leave);
          return () => {
            card.removeEventListener("pointermove", move);
            card.removeEventListener("pointerleave", leave);
          };
        });
        return () => offs.forEach((off) => off());
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="bg-white">
      <section ref={root} id="lencana" data-chapter="lencana" className="shape-capsule relative isolate overflow-hidden bg-navy px-6 py-28 text-paper lg:px-10">
        {SPARKS.map((spark) => (
          <svg key={spark.spot} viewBox="0 0 20 20" data-spin={spark.spin} className={`pointer-events-none absolute -z-10 ${spark.spot} ${spark.size}`} aria-hidden="true">
            <path d="M10 0 12.6 7.4 20 10 12.6 12.6 10 20 7.4 12.6 0 10 7.4 7.4Z" fill="var(--color-highlight)" />
          </svg>
        ))}
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <p data-rise className="label text-peach">{lencana.kicker}</p>
          <PopTitle className="heading">{lencana.title}</PopTitle>
          <p data-rise="0.15" className="lead text-peach">{lencana.lead}</p>
          <HandNote decorative className="-rotate-2 !text-highlight">
            {lencana.note}
          </HandNote>
        </div>

        <div className="relative mx-auto mt-16 max-w-6xl">
          <div className="absolute -top-12 -right-2 z-20 w-24 lg:-top-16 lg:right-[-3%] lg:w-32">
            <div data-pop>
              <Starburst tone="highlight" text="navy" spin={-14} className="aspect-square w-full rotate-12 font-display text-base lg:text-xl">
                {lencana.sticker}
              </Starburst>
            </div>
          </div>
          <ul data-deck className="grid grid-cols-2 gap-4 [perspective:1600px] sm:gap-6 lg:grid-cols-3">
            {hand.map((badge, index) => {
              const isFlipped = Boolean(flipped[badge.code]);
              return (
                <li key={badge.code} data-deal className="sm:[rotate:var(--tilt)]" style={{ "--tilt": `${TILT[index]}deg` } as CSSProperties}>
                  <div data-tilt className="[transform-style:preserve-3d]">
                  <button
                    type="button"
                    aria-pressed={isFlipped}
                    aria-label={`${lencana.flipLabel}: ${badge.title}`}
                    onClick={() => setFlipped((all) => ({ ...all, [badge.code]: !isFlipped }))}
                    className="flip-inner relative block aspect-[520/745] w-full text-left"
                    data-flipped={isFlipped || undefined}
                  >
                    <span className="flip-face absolute inset-0 flex flex-col" aria-hidden={isFlipped}>
                      <Image src={tarotImages[badge.code]} alt="" sizes="(min-width: 1024px) 360px, 45vw" className="h-full w-full object-contain drop-shadow-[0_24px_30px_rgb(0_0_0/0.45)]" />
                      <span className="absolute inset-x-[8%] bottom-[5%] rounded-xl bg-navy/85 px-3 py-2 text-center">
                        <span className="label block text-peach">
                          {lencana.tierLabel} {badge.tier} · {groupName(badge.group)}
                        </span>
                        <span className="block font-display text-[clamp(1rem,1.8vw,1.5rem)] leading-tight font-extrabold text-paper">{badge.title}</span>
                      </span>
                    </span>
                    <span
                      className="flip-face flip-back absolute inset-0 flex flex-col justify-between gap-4 rounded-[1.5rem] p-5 text-ink sm:p-6"
                      style={{ background: `var(--color-${BACK[index % BACK.length]})` }}
                      aria-hidden={!isFlipped}
                    >
                      <span className="text-[clamp(0.95rem,1.5vw,1.25rem)] leading-snug font-bold">“{badge.philosophy}”</span>
                      <span className="flex flex-col gap-1">
                        <span className="label">{lencana.criteriaLabel}</span>
                        <span className="font-display text-[clamp(1.1rem,2vw,1.6rem)] leading-tight font-bold">{badge.criteria}</span>
                      </span>
                    </span>
                  </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
