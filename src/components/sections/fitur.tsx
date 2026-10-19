"use client";

import Image from "next/image";
import { useRef } from "react";

import { CurveText } from "@/components/art/curve-text";
import { HandNote } from "@/components/motion/hand-note";
import { screenImages } from "@/components/site/screen-images";
import { fitur } from "@/content/story";
import { gsap, LAND, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { SectionWaves } from "@/components/art/section-waves";

const CURVE_MORPH = [
  "M-80 150 C 240 260 460 260 760 130 S 1240 20 1520 200",
  "M-80 220 C 200 60 480 80 740 210 S 1200 290 1520 90",
];

// The feature list as giant words on a blue capsule (F-014, reference "genre" section). Each word fills in as it
// crosses the middle of the screen, a highlighter ribbon of feature names bends across the top, and on wide screens two
// phones flank the list and show the screens of the latest two features. Every word keeps a one-line description below
// it, so touch and keyboard users read the same facts.
export function Fitur() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-list-word]", section).forEach((word) => {
          gsap.fromTo(
            word,
            { color: "rgb(255 255 255 / 0.2)", xPercent: -3 },
            { color: "rgb(255 255 255 / 1)", xPercent: 0, ease: "none", scrollTrigger: { trigger: word, start: "top 82%", end: "top 48%", scrub: 0.5 } },
          );
        });
        gsap.from("[data-list-body]", { y: 16, autoAlpha: 0, duration: 0.7, ease: LAND, stagger: 0.06, scrollTrigger: { trigger: "[data-list]", start: "top 70%", once: true } });
      });

      // Two screens flank the list (after the reference's covers beside its genre list): whichever word sits at the middle
      // of the screen becomes active, and its screenshot slides into one of the two phones, alternating left and right,
      // so both sides keep showing the latest two features. Hovering a word on a fine pointer does the same.
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-list-row]", section);
        const cards = gsap.utils.toArray<HTMLElement>("[data-side-card]", section);
        let current = -1;
        const activate = (index: number) => {
          if (index === current || index < 0) return;
          current = index;
          const card = cards[index % 2];
          if (!card) return;
          const shots = gsap.utils.toArray<HTMLElement>("[data-side-shot]", card);
          shots.forEach((shot) => {
            const on = Number(shot.dataset.sideShot) === index;
            gsap.to(shot, on ? { autoAlpha: 1, yPercent: 0, duration: 0.6, ease: "power3.out", overwrite: true } : { autoAlpha: 0, yPercent: -10, duration: 0.35, ease: "power2.in", overwrite: true });
          });
          gsap.fromTo(card, { scale: 0.94 }, { scale: 1, duration: 0.8, ease: LAND, overwrite: "auto" });
        };
        rows.forEach((row, index) => {
          ScrollTrigger.create({ trigger: row, start: "top 55%", end: "bottom 55%", onToggle: (self) => self.isActive && activate(index) });
        });
        const offs = rows.map((row, index) => {
          const enter = () => activate(index);
          row.addEventListener("pointerenter", enter);
          return () => row.removeEventListener("pointerenter", enter);
        });
        // The phones lean with the scroll as the list passes, opposite ways, like the reference's tilted covers.
        cards.forEach((card, i) => {
          gsap.fromTo(card, { y: 60, rotationY: i ? -10 : 10 }, { y: -60, rotationY: i ? 8 : -8, ease: "none", scrollTrigger: { trigger: "[data-list]", start: "top bottom", end: "bottom top", scrub: 1 } });
        });
        return () => offs.forEach((off) => off());
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="bg-white">
      <section ref={root} id="fitur" data-chapter="fitur" className="shape-capsule relative isolate overflow-x-clip bg-blue pt-16 pb-20">
        <SectionWaves variant="fitur" />
        <CurveText id="fitur-curve" text={fitur.curve} tone="highlight" ink="navy" morph={CURVE_MORPH} from="-10%" to="-55%" className="-mt-4 mb-10 h-[clamp(7rem,16vw,14rem)] lg:mb-14" />
        <div className="mx-auto flex max-w-[90rem] flex-col items-center gap-3 px-6 text-center lg:px-10">
          <h2 className="statement text-white">{fitur.kicker}</h2>
          <HandNote decorative className="rotate-2 !text-highlight">
            {fitur.note}
          </HandNote>
        </div>
        <div className="relative">
          {/* Decorative: the screenshots show what each feature looks like; the words and descriptions carry the meaning.
              The phones ride a sticky layer, so they stay level with the middle of the screen while the list scrolls. */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
            <div className="sticky top-[calc(50svh-13rem)] flex h-[26rem] items-center justify-between px-[3%] [perspective:1400px]">
              {[0, 1].map((side) => (
                // A black phone in 3D, turned toward the list: a body of stacked edge plates, side buttons, a dynamic
                // island, and a glass glare. data-side-card is the pop and scroll-lean target.
                <div key={side} className="[transform-style:preserve-3d]" style={{ transform: side ? "rotateY(-24deg) rotateZ(6deg)" : "rotateY(24deg) rotateZ(-6deg)" }}>
                  <div data-side-card className="phone-black relative aspect-[9/19.5] w-[clamp(9.5rem,12.5vw,14rem)] [transform-style:preserve-3d]">
                    {Array.from({ length: 14 }, (_, i) => (
                      <span key={i} className="phone-black-slab" style={{ transform: `translateZ(${-(i + 1) * 1.3}px)` }} />
                    ))}
                    <span className="absolute top-[22%] -left-[2%] h-[9%] w-[2.2%] rounded-l-sm bg-[#2a2d35]" />
                    <span className="absolute top-[22%] -right-[2%] h-[13%] w-[2.2%] rounded-r-sm bg-[#2a2d35]" />
                    <div className="absolute inset-[3%] overflow-hidden rounded-[13%/6%] bg-white">
                      {fitur.items.map((item, index) => (
                        <div key={item.id} data-side-shot={index} className={`absolute inset-0 ${index === side ? "" : "invisible opacity-0"}`}>
                          <Image src={screenImages[item.screen]} alt="" fill sizes="224px" className="object-cover object-top" />
                        </div>
                      ))}
                      <span className="absolute top-[1.8%] left-1/2 z-10 h-[3.4%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
                      <span className="absolute inset-0 z-10" style={{ background: "linear-gradient(118deg, rgb(255 255 255 / 0.18) 0%, rgb(255 255 255 / 0.04) 30%, transparent 45%)" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        <ul data-list className="relative mx-auto mt-12 flex max-w-[90rem] flex-col items-center gap-6 px-6 text-center lg:gap-2 lg:px-10">
          {fitur.items.map((item) => (
            <li key={item.id} data-list-row className="flex flex-col items-center">
              <span data-list-word className="block font-display text-[clamp(2.4rem,7.4vw,7rem)] leading-[0.92] font-extrabold tracking-tight text-white">
                {item.title}
              </span>
              <span data-list-body className="mt-2 rounded-xl bg-white px-3 py-1 text-sm font-bold text-navy lg:text-base">
                {item.body}
              </span>
            </li>
          ))}
        </ul>
        </div>
      </section>
    </div>
  );
}
