"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";

import { Starburst } from "@/components/art/starburst";
import { HandNote } from "@/components/motion/hand-note";
import { PopTitle } from "@/components/motion/pop-title";
import { shelfBook } from "@/components/site/shelf";
import { buku } from "@/content/story";
import { gsap, LAND, MOTION_OK, useGSAP } from "@/lib/motion/gsap";

const PINNED = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const BOOKS = buku.featured.map((key) => shelfBook(key));

// Chapter 1, find (F-014 FR-001): ten demo books as cards in their cover's own colour. On wide screens with motion
// the section pins and the shelf slides sideways with the scroll while a squiggle draws underneath; the cards stay
// upright while it moves (owner: no lean with the scroll). Narrow screens and reduced motion get a native, snapping, keyboard-scrollable shelf with step buttons.
export function Buku() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const track = section.querySelector<HTMLElement>("[data-shelf-track]");
      if (!track) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-shelf-card]", section);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.from(cards.slice(0, 6), {
          yPercent: 40,
          rotation: (i: number) => (i % 2 ? 9 : -8),
          autoAlpha: 0,
          duration: 1.05,
          ease: LAND,
          stagger: 0.072,
          scrollTrigger: { trigger: track, start: "top 85%", once: true },
        });
      });

      mm.add(PINNED, () => {
        section.dataset.shelfPinned = "";
        const distance = () => track.scrollWidth - track.clientWidth;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to(track, { x: () => -distance() }, 0).fromTo("[data-shelf-squiggle]", { drawSVG: "0%" }, { drawSVG: "100%" }, 0);
        return () => {
          delete section.dataset.shelfPinned;
          gsap.set(cards, { clearProps: "transform" });
        };
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
    track.scrollBy({ left: direction * (card.offsetWidth + 20), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section ref={root} id="buku" data-chapter="buku" className="shelf relative overflow-x-clip bg-white py-16 lg:flex lg:h-svh lg:min-h-[40rem] lg:flex-col lg:justify-start lg:pt-20 lg:pb-6">
      <div className="mx-auto flex w-full max-w-[90rem] flex-wrap items-end justify-between gap-8 px-6 lg:px-10">
        <div className="flex max-w-2xl flex-col gap-4 lg:gap-3">
          <p data-rise className="label">{buku.kicker}</p>
          <PopTitle className="heading">{buku.title}</PopTitle>
        </div>
        <div className="flex flex-wrap items-center gap-4 lg:max-w-[30rem] lg:flex-col lg:items-start">
          <p data-rise="0.15" className="lead">{buku.lead}</p>
          <HandNote decorative className="-rotate-3">
            {buku.note}
          </HandNote>
          <div className="shelf-steps flex gap-2">
            {([-1, 1] as const).map((direction) => (
              <button
                key={direction}
                type="button"
                onClick={() => step(direction)}
                aria-label={direction < 0 ? buku.previous : buku.next}
                aria-controls="buku-track"
                className="grid size-14 place-items-center rounded-full bg-navy text-white transition-transform hover:scale-105"
              >
                <svg viewBox="0 0 14 12" className={`w-4 ${direction < 0 ? "rotate-180" : ""}`} aria-hidden="true">
                  <path d="M1 6h11M7.5 1.5 12 6l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      <ul
        id="buku-track"
        data-shelf-track
        tabIndex={0}
        aria-label={buku.title}
        className="will-change-transform no-scrollbar mt-12 flex lg:min-h-0 lg:flex-1 snap-x snap-mandatory gap-6 overflow-x-auto lg:gap-12 scroll-px-6 px-6 pt-10 pb-10 lg:mt-4 lg:pt-8 lg:pb-5 lg:scroll-px-10 lg:px-10"
      >
        {BOOKS.map((book, index) => {
          const available = book.status === "AVAILABLE";
          const ink = book.text === "ink" ? "var(--color-ink)" : "var(--color-white)";
          return (
            <li
              key={book.id}
              data-shelf-card
              className="group/card relative isolate will-change-transform w-[min(84vw,21rem)] shrink-0 snap-start [rotate:var(--tilt)] transition-[rotate,translate] duration-500 ease-(--ease-expo) hover:-translate-y-3 hover:[rotate:0deg] focus-within:[rotate:0deg] lg:w-[clamp(15rem,calc((100svh-30.5rem)/1.25),23rem)]"
              style={{ "--tilt": `${index % 2 ? 2 : -2}deg` } as CSSProperties}
            >
              {/* Hover: the card straightens and lifts, a bookmark ribbon in the card's own colour slides up from behind its
                  top edge, two small stars bloom beside it, the cover eases in, and the sticker turns (CSS only, so it is
                  instant under reduced motion through the global transition override). */}
              <svg
                viewBox="0 0 40 90"
                className="absolute top-0 left-[14%] -z-10 w-[15%] translate-y-[20%] transition-transform duration-500 ease-(--ease-expo) group-hover/card:-translate-y-[62%] group-focus-within/card:-translate-y-[62%]"
                aria-hidden="true"
              >
                <path d="M4 6 Q4 0 10 0 H30 Q36 0 36 6 V88 L20 72 L4 88 Z" style={{ fill: `color-mix(in srgb, ${book.color} 70%, var(--color-navy))` }} />
                <path d="M12 14 H28" stroke="var(--color-white)" strokeOpacity="0.6" strokeWidth="3" strokeLinecap="round" />
              </svg>
              {[
                { spot: "left-[34%] -top-[2.2rem] w-7", delay: "delay-100" },
                { spot: "left-[4%] -top-[1.2rem] w-5", delay: "delay-200" },
              ].map((spark) => (
                <svg
                  key={spark.spot}
                  viewBox="0 0 20 20"
                  className={`absolute -z-10 scale-0 rotate-45 transition-transform duration-500 ease-(--ease-expo) group-hover/card:scale-100 group-hover/card:rotate-0 ${spark.spot} ${spark.delay}`}
                  aria-hidden="true"
                >
                  <path d="M10 0 12.6 7.4 20 10 12.6 12.6 10 20 7.4 12.6 0 10 7.4 7.4Z" fill="var(--color-highlight)" stroke="var(--color-navy)" strokeWidth="1.2" />
                </svg>
              ))}
              <article className="relative flex h-full flex-col gap-3 rounded-[1.75rem] p-3.5 pb-5 shadow-[0_12px_24px_-18px_rgb(3_4_10/0.4)] transition-shadow duration-500 group-hover/card:shadow-[0_34px_50px_-24px_rgb(3_4_10/0.55)]" style={{ background: book.color, color: ink }}>
                <div className="relative lg:min-h-0 lg:flex-1">
                  <div className="overflow-hidden rounded-[1.1rem] shadow-[0_18px_30px_-14px_rgb(3_4_10/0.55)] lg:h-full">
                  <Image
                    src={book.cover}
                    data-shelf-cover={book.key}
                    alt={`Sampul ${book.title}`}
                    sizes="(min-width: 1024px) 304px, 80vw"
                    className="aspect-[4/5] w-full object-cover object-top lg:aspect-auto lg:h-full transition-transform duration-700 ease-(--ease-expo) group-hover/card:scale-[1.06]"
                  />
                  </div>
                  <div className="absolute -top-5 -right-4 w-[5.25rem] transition-transform duration-700 ease-(--ease-expo) group-hover/card:scale-110 group-hover/card:rotate-[30deg]">
                    <Starburst tone={available ? "green" : "white"} points={12} spin={index % 2 ? -14 : 14} className="aspect-square w-full rotate-12 text-[0.8rem]">
                      {available ? buku.status.AVAILABLE : buku.status.BORROWED}
                    </Starburst>
                  </div>
                </div>
                <div className="flex gap-1.5 px-1">
                  <span className="inline-flex h-7 items-center rounded-full bg-white px-3 text-xs font-bold whitespace-nowrap text-navy">{book.genre[0].split(" & ")[0]}</span>
                  <span className="inline-flex h-7 items-center rounded-full bg-navy px-3 text-xs font-bold whitespace-nowrap text-white">{buku.condition[book.condition]}</span>
                </div>
                <h3 className="statement line-clamp-2 px-1 text-[1.5rem] lg:text-[1.35rem]">{book.title}</h3>
                <p className="px-1 text-sm font-bold">{book.author}</p>
              </article>
            </li>
          );
        })}
      </ul>

      <div className="mx-auto flex w-full max-w-[90rem] items-center gap-4 px-6 lg:px-10">
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="hidden h-5 flex-1 lg:block" aria-hidden="true">
          <path data-shelf-squiggle d="M4 20 C 60 0 100 40 160 20 S 260 0 320 20 S 420 40 480 20 S 580 0 640 20 S 740 40 800 20 S 900 0 960 20 S 1060 40 1120 20 S 1180 10 1196 20" fill="none" stroke="var(--color-blue)" strokeWidth="5" strokeLinecap="round" />
        </svg>
        <p className="label shrink-0">{buku.demoLabel}</p>
      </div>
    </section>
  );
}
