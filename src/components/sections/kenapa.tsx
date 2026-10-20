"use client";

import Image from "next/image";
import { useRef } from "react";

import { CircleText } from "@/components/art/circle-text";
import { Starburst } from "@/components/art/starburst";
import { PopTitle } from "@/components/motion/pop-title";
import { memojiImages } from "@/components/site/app-images";
import { LogoMark } from "@/components/site/logo";
import { kenapa } from "@/content/story";
import { gsap, HOVER_MOTION, MOTION_OK, useGSAP } from "@/lib/motion/gsap";
import { SectionWaves } from "@/components/art/section-waves";

// Where each pill rests on the wide board: position (percent of the board) and tilt.
const SPOT = [
  { left: "0%", top: "2%", rotate: -8 },
  { left: "24%", top: "0%", rotate: 6 },
  { left: "6%", top: "30%", rotate: 4 },
  { left: "20%", top: "58%", rotate: -5 },
  { left: "2%", top: "80%", rotate: 3 },
] as const;

// Club members' faces from the app's memoji set, sitting between the pills on wide screens.
const FACES = [
  { id: "3", spot: "left-[66%] top-[4%]", tone: "bg-sky" },
  { id: "16", spot: "left-[70%] top-[34%]", tone: "bg-highlight" },
  { id: "27", spot: "left-[44%] top-[82%]", tone: "bg-white" },
] as const;


// Why BookMate as big rounded labels (F-014, reference "benefits"): they pop in at random tilts with a spring, the club
// stamp turns in the corner, members' faces bob between them, and a fine pointer can shove the pills; each one drifts
// with the pointer's speed and springs back home.
export function Kenapa() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const pills = gsap.utils.toArray<HTMLElement>("[data-pill]", section);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          pills,
          { scale: 0, rotate: (i: number) => (i % 2 ? 33 : -33) },
          {
            scale: 1,
            rotate: (i: number) => SPOT[i % SPOT.length].rotate,
            ease: "elastic.out(1, 0.75)",
            duration: 0.85,
            stagger: 0.072,
            scrollTrigger: { trigger: "[data-board]", start: "top 70%", once: true },
          },
        );
      });

      // Momentum hover: the pointer's velocity at the moment it crosses a pill becomes a push and a spin, clamped, after
      // which the pill springs back to its spot.
      mm.add(`${HOVER_MOTION} and (min-width: 1024px)`, () => {
        let last = { x: 0, y: 0, t: 0 };
        let velocity = { x: 0, y: 0 };
        const onMove = (event: PointerEvent) => {
          const dt = Math.max(1, event.timeStamp - last.t);
          velocity = { x: ((event.clientX - last.x) / dt) * 16, y: ((event.clientY - last.y) / dt) * 16 };
          last = { x: event.clientX, y: event.clientY, t: event.timeStamp };
        };
        const clamp = gsap.utils.clamp(-140, 140);
        const shoves = pills.map((pill, index) => {
          const shove = () => {
            const rest = SPOT[index % SPOT.length].rotate;
            gsap
              .timeline({ overwrite: true })
              .to(pill, { x: clamp(velocity.x * 6), y: clamp(velocity.y * 6), rotate: rest + clamp(velocity.x * 1.2) / 4, duration: 0.45, ease: "power3.out" })
              .to(pill, { x: 0, y: 0, rotate: rest, duration: 1.1, ease: "elastic.out(1, 0.5)" });
          };
          pill.addEventListener("pointerenter", shove);
          return () => pill.removeEventListener("pointerenter", shove);
        });
        section.addEventListener("pointermove", onMove);
        return () => {
          section.removeEventListener("pointermove", onMove);
          shoves.forEach((off) => off());
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="bg-white">
    <section ref={root} id="kenapa" data-chapter="kenapa" className="shape-inset relative isolate overflow-hidden bg-peach-pale px-6 pt-16 pb-20 lg:pt-20 lg:px-10">
      <SectionWaves variant="kenapa" />
      <div className="mx-auto max-w-[90rem]">
        <div className="flex max-w-4xl flex-col gap-4">
          <p data-rise className="label">{kenapa.kicker}</p>
          <PopTitle className="heading">{kenapa.title}</PopTitle>
        </div>

        <div data-board className="relative mt-8 lg:h-[32rem]">
          <ul className="flex flex-wrap justify-center gap-3 lg:block">
            {kenapa.pills.map((pill, index) => (
              <li
                key={pill.label}
                data-pill
                className="rounded-full px-[0.6em] py-[0.25em] font-display text-[clamp(1.6rem,3.6vw,3.6rem)] leading-none font-extrabold tracking-tight lg:absolute lg:whitespace-nowrap"
                style={{ background: `var(--color-${pill.tone})`, color: pill.tone === "blue" ? "var(--color-white)" : undefined, left: SPOT[index].left, top: SPOT[index].top }}
              >
                {pill.label}
              </li>
            ))}
          </ul>
          {FACES.map((face) => (
            <div key={face.id} className={`absolute hidden lg:block ${face.spot}`} aria-hidden="true">
              <div data-pop>
                <div data-float className={`size-24 overflow-hidden rounded-full ${face.tone} ring-4 ring-white`}>
                  <Image src={memojiImages[face.id]} alt="" sizes="96px" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          ))}
          <div className="mx-auto mt-12 flex items-center justify-center gap-6 lg:absolute lg:right-[2%] lg:bottom-[4%] lg:mt-0">
            <div data-pop className="w-40 lg:w-56">
              <CircleText id="kenapa-stamp" text={kenapa.stamp} tone="white" ink="blue" spin={-26} className="aspect-square w-full">
                <LogoMark className="w-full text-blue" />
              </CircleText>
            </div>
            <div data-pop className="w-24 lg:absolute lg:-top-10 lg:-left-12 lg:w-28">
              <Starburst tone="highlight" spin={-12} className="aspect-square w-full rotate-6 font-display text-lg lg:text-xl">
                {kenapa.sticker}
              </Starburst>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
