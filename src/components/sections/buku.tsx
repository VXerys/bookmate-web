"use client";

import Image from "next/image";
import { useRef } from "react";

import { Starburst } from "@/components/art/starburst";
import { HandNote } from "@/components/motion/hand-note";
import { PopTitle } from "@/components/motion/pop-title";
import { shelfBooks } from "@/components/site/shelf";
import { buku } from "@/content/story";
import { gsap, LAND, MOTION_OK, useGSAP } from "@/lib/motion/gsap";

const PINNED = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

// Chapter 1, find (F-014 FR-001): the 18 demo books as cards in their cover's own colour. On wide screens with motion
// the section pins and the shelf slides sideways with the scroll while a squiggle draws underneath; cards lean with the
// scroll speed. Narrow screens and reduced motion get a native, snapping, keyboard-scrollable shelf with step buttons.
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
        const lean = cards.map((card) => gsap.quickTo(card, "skewX", { duration: 0.5, ease: "power3" }));
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
            onUpdate: (self) => {
              const skew = gsap.utils.clamp(-8, 8, self.getVelocity() / -220);
              lean.forEach((to) => to(skew));
            },
            onScrubComplete: () => lean.forEach((to) => to(0)),
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
    <section ref={root} id="buku" data-chapter="buku" className="shelf relative overflow-hidden bg-white py-24 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-16">
      <div className="mx-auto flex w-full max-w-[90rem] flex-wrap items-end justify-between gap-8 px-6 lg:px-10">
        <div className="flex max-w-2xl flex-col gap-4">
          <p data-rise className="label">{buku.kicker}</p>
          <PopTitle className="heading">{buku.title}</PopTitle>
          <p data-rise="0.15" className="lead lg:max-w-xl">{buku.lead}</p>
        </div>
        <div className="flex items-center gap-4">
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
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pt-10 pb-10 lg:mt-6 lg:pt-8 lg:pb-6 lg:scroll-px-10 lg:px-10"
      >
        {shelfBooks.map((book, index) => {
          const available = book.status === "AVAILABLE";
          const ink = book.text === "ink" ? "var(--color-ink)" : "var(--color-white)";
          return (
            <li key={book.id} data-shelf-card className="w-[min(76vw,17rem)] shrink-0 snap-start lg:w-[clamp(12.5rem,15vw,15rem)]" style={{ rotate: `${index % 2 ? 1.5 : -1.5}deg` }}>
              <article className="relative flex h-full flex-col gap-3 rounded-[1.5rem] p-3 pb-5" style={{ background: book.color, color: ink }}>
                <div className="relative">
                  <Image
                    src={book.cover}
                    alt={`Sampul ${book.title}`}
                    sizes="(min-width: 1024px) 248px, 70vw"
                    className="aspect-[2/3] w-full rounded-[1rem] object-cover shadow-[0_18px_30px_-14px_rgb(3_4_10/0.55)]"
                  />
                  <div className="absolute -top-5 -right-4 w-[5.25rem]">
                    <Starburst tone={available ? "green" : "white"} points={12} spin={index % 2 ? -14 : 14} className="aspect-square w-full rotate-12 text-[0.8rem]">
                      {available ? buku.status.AVAILABLE : buku.status.BORROWED}
                    </Starburst>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 px-1">
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-ink">{book.genre[0]}</span>
                  <span className="rounded-full bg-navy px-2.5 py-1 text-xs font-bold text-white">{buku.condition[book.condition]}</span>
                </div>
                <h3 className="statement px-1 text-[1.5rem] lg:text-[1.3rem]">{book.title}</h3>
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
