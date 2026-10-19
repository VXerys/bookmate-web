"use client";

import Image from "next/image";
import { useRef } from "react";

import { CircleText } from "@/components/art/circle-text";
import { mix } from "@/components/art/swells";
import { HandNote } from "@/components/motion/hand-note";
import { LogoMark } from "@/components/site/logo";
import { PhoneFrame } from "@/components/site/phone-frame";
import { shelfBook } from "@/components/site/shelf";
import { shell } from "@/content/shell";
import { site } from "@/content/site";
import { aplikasi } from "@/content/story";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { SectionWaves } from "@/components/art/section-waves";

const PINNED = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

// Covers that burst out from behind the phone as it turns to face the reader, then rest around the edges.
const ORBIT = [
  { book: shelfBook("projectHailMary"), spot: "left-[7%] top-[14%]", tilt: -14 },
  { book: shelfBook("whatYouAreLookingForIsInTheLibrary"), spot: "right-[8%] top-[10%]", tilt: 12 },
  { book: shelfBook("aSunnyPlaceForShadyPeople"), spot: "left-[12%] bottom-[10%]", tilt: 9 },
  { book: shelfBook("theLionTheWitchAndTheWardrobe"), spot: "right-[13%] bottom-[12%]", tilt: -10 },
] as const;


// Chapter 3, read (F-014): the one pinned scene. The phone turns from a tilted three-quarter view to face the reader
// between the two halves of the sentence while four books burst out from behind it and the blob behind breathes; the
// phone then flips through its screens, steps left, and the three steps to start appear. Narrow screens and reduced
// motion read the same content stacked.
export function Aplikasi() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();
      mm.add(PINNED, () => {
        section.dataset.pinned = "";
        // Offsets ignore transforms, so a refresh mid-scene still measures each cover's resting spot.
        const toCentre = (el: HTMLElement) => ({
          x: section.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2),
          y: section.clientHeight / 2 - (el.offsetTop + el.offsetHeight / 2),
        });
        const covers = gsap.utils.toArray<HTMLElement>("[data-orbit]", section);
        const extras = gsap.utils.toArray<HTMLElement>("[data-phone-extra]", section);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section, start: "top top", end: "+=220%", scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
        });
        tl.fromTo("[data-app-phone]", { rotationY: -34, rotationX: 14, rotationZ: -8, scale: 0.86 }, { rotationY: 0, rotationX: 0, rotationZ: 0, scale: 1.06, duration: 1 }, 0)
          .from(covers, { x: (i: number) => toCentre(covers[i]).x * 0.55, y: (i: number) => toCentre(covers[i]).y * 0.55, scale: 0.6, duration: 0.7, stagger: 0.05 }, 0)
          .to("[data-app-lead]", { yPercent: -60, autoAlpha: 0, duration: 0.6 }, 0.75)
          .to("[data-app-tail]", { yPercent: 60, autoAlpha: 0, duration: 0.6 }, 0.75)
          .to(extras[0] ?? {}, { autoAlpha: 1, duration: 0.25 }, 1.05)
          .to("[data-app-phone]", { x: () => -window.innerWidth * 0.2, scale: 1, rotationY: 12, duration: 0.8 }, 1.25)
          .to("[data-app-rings]", { x: () => -window.innerWidth * 0.2, duration: 0.8 }, 1.25)
          .to(covers, { scale: 0.85, duration: 0.6 }, 1.25)
          .from("[data-app-card]", { x: 140, autoAlpha: 0, rotation: 4, duration: 0.5 }, 1.35)
          .from("[data-app-step]", { x: 40, autoAlpha: 0, stagger: 0.12, duration: 0.4 }, 1.55)
          .to(extras[1] ?? {}, { autoAlpha: 1, duration: 0.25 }, 1.75)
          .from("[data-app-cta]", { y: 40, autoAlpha: 0, duration: 0.4 }, 2)
          .to({}, { duration: 0.3 });
        return () => delete section.dataset.pinned;
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="bg-white">
      <section
        ref={root}
        id="aplikasi"
        data-chapter="aplikasi"
        data-depth="off"
        className="aplikasi shape-inset relative isolate flex min-h-svh flex-col items-center justify-center gap-10 overflow-hidden bg-sky px-6 py-20 [--app-phone:min(56svh,30rem)] lg:px-10"
      >
        <SectionWaves variant="aplikasi" />
        {/* Signal rings: the phone "calls" the reader; they ripple out from behind it and travel with it. */}
        <div data-app-rings className="pointer-events-none absolute top-1/2 left-1/2 -z-10 hidden aspect-square w-[min(90svh,52rem)] -translate-x-1/2 -translate-y-1/2 lg:block" aria-hidden="true">
          <div className="absolute inset-[18%] rounded-full" style={{ background: `radial-gradient(circle, var(--color-white) 0%, ${mix("var(--color-white)", 60, "transparent")} 35%, transparent 70%)` }} />
          <svg viewBox="0 0 600 600" data-pulse className="absolute inset-0 h-full w-full overflow-visible">
            {[0, 1, 2, 3].map((ring) => (
              <circle key={ring} cx="300" cy="300" r="290" fill="none" stroke="var(--color-blue)" strokeOpacity={0.45 - ring * 0.08} strokeWidth="2.5" />
            ))}
          </svg>
        </div>
        {ORBIT.map(({ book, spot, tilt }) => (
          <div key={book.key} data-orbit className={`pointer-events-none absolute hidden w-[clamp(6rem,8.5vw,8.5rem)] lg:block ${spot}`} style={{ rotate: `${tilt}deg` }} aria-hidden="true">
            <Image src={book.cover} alt="" sizes="136px" className="aspect-[2/3] w-full rounded-[0.6rem] object-cover shadow-[0_24px_40px_-18px_rgb(3_4_10/0.55)]" />
          </div>
        ))}

        <p className="aplikasi-statement heading relative z-0 text-center text-[clamp(2.2rem,5.6vw,5rem)] text-navy">
          <span data-app-lead className="block">
            {aplikasi.statementLead}
          </span>{" "}
          <span className="aplikasi-gap block" aria-hidden="true" />
          <span data-app-tail className="block">
            {aplikasi.statementTail}
          </span>
        </p>

        <div className="aplikasi-stage relative z-10 flex w-full max-w-[72rem] flex-col items-center gap-12">
          <div className="[perspective:1600px]">
            <div data-app-phone className="relative aspect-[9/19.5] h-(--app-phone) [transform-style:preserve-3d]">
              <PhoneFrame screen={aplikasi.screens[0]} more={aplikasi.screens.slice(1)} sizes="(min-width: 1024px) 300px, 70vw" />
              <div className="absolute -bottom-6 -left-12 w-[clamp(5.5rem,7vw,7rem)]">
                <div data-pop>
                  <CircleText id="app-stamp" text={aplikasi.stamp} tone="blue" ink="white" className="aspect-square w-full">
                    <LogoMark className="w-full text-white" />
                  </CircleText>
                </div>
              </div>
            </div>
          </div>
          <div data-app-card className="aplikasi-steps flex w-full max-w-[27rem] flex-col gap-5 rounded-[2rem] bg-white p-7 shadow-[0_30px_60px_-30px_rgb(3_4_10/0.55)] lg:p-8">
            <p data-app-step className="label">
              {aplikasi.kicker}
            </p>
            <h2 data-app-step className="statement">
              {aplikasi.stepsTitle}
            </h2>
            <ol className="flex flex-col gap-5">
              {aplikasi.steps.map((step, index) => (
                <li key={step.title} data-app-step className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-highlight font-display text-xl font-extrabold text-navy">
                    {index + 1}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="font-display text-xl font-bold">{step.title}</span>
                    <span className="font-semibold">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div data-app-cta className="flex flex-wrap items-center gap-4">
              <a
                href={site.app.playStoreUrl}
                data-cursor-label={shell.header.cta}
                className="inline-flex h-14 items-center gap-3 rounded-full bg-navy px-6 font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
                  <path d="M5 3.5v17l14.5-8.5L5 3.5Z" fill="var(--color-highlight)" />
                </svg>
                {shell.footer.download}
              </a>
              <HandNote decorative className="-rotate-3">
                {aplikasi.note}
              </HandNote>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
