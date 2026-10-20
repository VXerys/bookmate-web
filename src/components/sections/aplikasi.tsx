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


// Chapter 3, read (F-014): the one pinned scene. A thick 3D phone turns toward the reader with its screen off, powers
// on to the BookMate splash while four books burst out around it, then steps left as the three start steps light up
// one by one, the screen following each step: splash for "Unduh", onboarding for "Masuk", Catat Bacaan for the first
// page. Narrow screens and reduced motion read the same content stacked, with the screen already on.
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
        const steps = gsap.utils.toArray<HTMLElement>("[data-app-step-item]", section);
        gsap.set("[data-app-stage]", { rotationY: -32, rotationX: 14, rotationZ: -6, scale: 0.9 });
        gsap.set(steps, { autoAlpha: 0.35 });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section, start: "top top", end: "+=260%", scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
        });
        // Turn toward the reader with the screen off, then power on: the black glass clears and the splash logo pops.
        tl.to("[data-app-stage]", { rotationY: 0, rotationX: 0, rotationZ: 0, scale: 1.04, duration: 0.6, ease: "power1.inOut" }, 0)
          .from(covers, { x: (i: number) => toCentre(covers[i]).x * 0.55, y: (i: number) => toCentre(covers[i]).y * 0.55, scale: 0.6, duration: 0.6, stagger: 0.05 }, 0.1)
          .to("[data-phone-off]", { autoAlpha: 0, duration: 0.08 }, 0.55)
          .from("[data-phone-splash] > *", { scale: 0.4, autoAlpha: 0, duration: 0.25, ease: "back.out(2)" }, 0.6)
          // The sentence clears, the phone steps left, and the steps card arrives with every step dimmed.
          .to("[data-app-lead]", { yPercent: -60, autoAlpha: 0, duration: 0.4 }, 0.85)
          .to("[data-app-tail]", { yPercent: 60, autoAlpha: 0, duration: 0.4 }, 0.85)
          .to("[data-app-stage]", { x: () => -window.innerWidth * 0.17, scale: 1, rotationY: 10, duration: 0.6 }, 1)
          .to("[data-app-rings]", { x: () => -window.innerWidth * 0.17, duration: 0.6 }, 1)
          .to(covers, { scale: 0.85, duration: 0.5 }, 1)
          .from("[data-app-card]", { x: 120, autoAlpha: 0, rotation: 4, duration: 0.45 }, 1.1)
          // Step 1 lights on the splash, step 2 swaps to onboarding, step 3 to Catat Bacaan; swaps are instant.
          .to(steps[0] ?? {}, { autoAlpha: 1, duration: 0.15 }, 1.45)
          .to(steps[1] ?? {}, { autoAlpha: 1, duration: 0.15 }, 1.85)
          .to("[data-phone-splash]", { autoAlpha: 0, duration: 0.01 }, 1.85)
          .to(steps[2] ?? {}, { autoAlpha: 1, duration: 0.15 }, 2.25)
          .to(extras[0] ?? {}, { autoAlpha: 1, duration: 0.01 }, 2.25)
          .from("[data-app-cta]", { y: 30, autoAlpha: 0, duration: 0.3 }, 2.45)
          .to({}, { duration: 0.3 });
        return () => {
          delete section.dataset.pinned;
          gsap.set("[data-app-stage]", { clearProps: "transform" });
          gsap.set("[data-app-step-item]", { clearProps: "opacity,visibility" });
        };
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
          <div key={book.key} data-orbit className={`pointer-events-none absolute will-change-transform hidden w-[clamp(6rem,8.5vw,8.5rem)] lg:block ${spot}`} style={{ rotate: `${tilt}deg` }} aria-hidden="true">
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
          <div className="[perspective:1700px]">
            <div data-app-stage className="relative will-change-transform [transform-style:preserve-3d]">
            <div data-app-phone className="relative aspect-[9/19.5] h-(--app-phone) [transform-style:preserve-3d]">
              <PhoneFrame
                screen={aplikasi.screens[0]}
                more={aplikasi.screens.slice(1)}
                sizes="(min-width: 1024px) 300px, 70vw"
                thick
                splash={
                  <span className="flex flex-col items-center gap-3 text-white">
                    <span className="grid size-[4.5rem] place-items-center rounded-[1.4rem] bg-white">
                      <LogoMark className="w-10 text-blue" />
                    </span>
                    <span className="font-display text-2xl font-extrabold tracking-tight">{site.name}</span>
                  </span>
                }
              />
              <div className="absolute -bottom-6 -left-12 w-[clamp(5.5rem,7vw,7rem)]">
                <div data-pop>
                  <CircleText id="app-stamp" text={aplikasi.stamp} tone="blue" ink="white" className="aspect-square w-full">
                    <LogoMark className="w-full text-white" />
                  </CircleText>
                </div>
              </div>
            </div>
            </div>
          </div>
          <div data-app-card className="aplikasi-steps flex w-full max-w-[22rem] flex-col gap-4 rounded-[1.75rem] bg-white p-6 shadow-[0_30px_60px_-30px_rgb(3_4_10/0.55)]">
            <p data-app-step className="label">
              {aplikasi.kicker}
            </p>
            <h2 data-app-step className="statement">
              {aplikasi.stepsTitle}
            </h2>
            <ol className="flex flex-col gap-3.5">
              {aplikasi.steps.map((step, index) => (
                <li key={step.title} data-app-step data-app-step-item className="flex gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-highlight font-display text-lg font-extrabold text-navy">
                    {index + 1}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="font-display text-lg leading-tight font-bold">{step.title}</span>
                    <span className="text-sm font-semibold">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div data-app-cta className="flex flex-wrap items-center gap-4">
              <a
                href={site.app.playStoreUrl}
                data-cursor-label={shell.header.cta}
                className="inline-flex h-12 items-center gap-2.5 rounded-full bg-navy px-5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
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
