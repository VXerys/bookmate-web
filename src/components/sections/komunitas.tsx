"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";

import { Starburst } from "@/components/art/starburst";
import { HandNote } from "@/components/motion/hand-note";
import { PopTitle } from "@/components/motion/pop-title";
import { communityImages, memojiImages } from "@/components/site/app-images";
import { demoCommunities, memojiIds } from "@/content/app-data";
import { komunitas } from "@/content/story";
import { gsap, LAND, MOTION_OK, useGSAP } from "@/lib/motion/gsap";
import { SectionWaves } from "@/components/art/section-waves";

const FAN = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const FACE_TONES = ["bg-white", "bg-highlight", "bg-peach-pale", "bg-blue"] as const;
// Where each card rests in the fan, relative to the middle card: sideways step (rem), drop (rem), and tilt (deg).
const fanSpot = (i: number, count: number) => {
  const offset = i - (count - 1) / 2;
  return { x: offset * 8.5, y: Math.abs(offset) * 1.6, r: offset * 7 };
};

// Chapter 4, talk (F-014): the club chapter. Members' faces from the app's memoji set pile up beside the title, and the
// demo communities (src/content/app-data.ts) start as one stacked deck that fans open as the section scrolls into view.
// Narrow screens get a snapping row of the same cards; reduced motion shows the fan already open.
export function Komunitas() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-face]", { scale: 0, rotation: -30, duration: 0.9, ease: LAND, stagger: 0.06, scrollTrigger: { trigger: "[data-faces]", start: "top 85%", once: true } });
      });
      mm.add(FAN, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-club]", section);
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
        // Each card's CSS left/top/rotate is its resting spot; GSAP's offsets start them all on the middle card.
        gsap.from(cards, {
          x: (i: number) => -fanSpot(i, cards.length).x * rem,
          y: (i: number) => -fanSpot(i, cards.length).y * rem + 40,
          rotation: (i: number) => -fanSpot(i, cards.length).r + (i % 2 ? 4 : -4),
          ease: "none",
          stagger: 0.04,
          scrollTrigger: { trigger: "[data-clubs]", start: "top 85%", end: "center 55%", scrub: 0.8 },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="bg-white">
      <section ref={root} id="komunitas" data-chapter="komunitas" className="shape-capsule relative isolate overflow-hidden bg-sky px-6 py-16 lg:py-20 lg:px-10">
        <SectionWaves variant="komunitas" />
        <div className="mx-auto grid max-w-[90rem] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="flex min-w-0 flex-col items-start gap-5">
            <p data-rise className="label">{komunitas.kicker}</p>
            <PopTitle className="heading">{komunitas.title}</PopTitle>
            <p data-rise="0.15" className="lead max-w-lg">{komunitas.lead}</p>
            <div data-faces className="flex items-center pl-3" aria-hidden="true">
              {memojiIds.slice(0, 8).map((id, index) => (
                <div key={id} data-face className={`-ml-3 size-12 overflow-hidden rounded-full ring-4 ring-sky ${FACE_TONES[index % FACE_TONES.length]} sm:size-14 lg:size-16`}>
                  <Image src={memojiImages[id]} alt="" sizes="64px" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <HandNote decorative className="-rotate-2">
              {komunitas.note}
            </HandNote>
          </div>

          {/* min-w-0: the card row scrolls inside this column instead of widening the grid on phones. */}
          <div className="relative min-w-0">
            <div className="absolute -top-8 right-0 z-10 w-24 lg:-top-4 lg:right-[4%] lg:w-28">
              <div data-pop>
                <Starburst tone="blue" text="white" spin={16} className="aspect-square w-full -rotate-6 px-2 font-display text-sm lg:text-base">
                  {komunitas.sticker}
                </Starburst>
              </div>
            </div>
            <ul data-clubs className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pt-6 pb-4 lg:relative lg:mx-0 lg:block lg:h-[30rem] lg:overflow-visible lg:p-0">
              {demoCommunities.map((club, index) => {
                const spot = fanSpot(index, demoCommunities.length);
                const vars = { "--fx": `calc(50% - 7.5rem + ${spot.x}rem)`, "--fy": `${spot.y + 2}rem`, "--fr": `${spot.r}deg` } as CSSProperties;
                return (
                  <li key={club.id} data-club className="w-[15rem] shrink-0 will-change-transform snap-start lg:absolute lg:top-(--fy) lg:left-(--fx) lg:rotate-(--fr)" style={{ ...vars, zIndex: index === 2 ? 5 : 5 - Math.abs(index - 2) }}>
                    <article className="flex flex-col gap-3 rounded-[1.5rem] bg-white p-3 pb-4 shadow-[0_24px_50px_-28px_rgb(3_4_10/0.5)]">
                      <Image src={communityImages[club.key]} alt={`Sampul komunitas ${club.name}`} sizes="232px" className="aspect-[4/5] w-full rounded-[1rem] object-cover" />
                      <h3 className="statement px-1 text-[1.35rem]">{club.name}</h3>
                      <p className="flex flex-wrap gap-1.5 px-1">
                        <span className="rounded-full bg-navy px-2.5 py-1 text-xs font-bold text-white">{club.city}</span>
                        <span className="rounded-full bg-highlight px-2.5 py-1 text-xs font-bold">{komunitas.visibility[club.visibility] ?? club.visibility}</span>
                      </p>
                    </article>
                  </li>
                );
              })}
            </ul>
            <p className="label mt-4 lg:mt-6 lg:text-center">{komunitas.demoLabel}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
