"use client";

import { useRef } from "react";

import { Book3D } from "@/components/art/book3d";
import { Blobs } from "@/components/motion/blobs";
import { HandNote } from "@/components/motion/hand-note";
import { PopTitle } from "@/components/motion/pop-title";
import { ButtonAlt } from "@/components/site/button-alt";
import { PhoneFrame } from "@/components/site/phone-frame";
import { shell } from "@/content/shell";
import { site } from "@/content/site";
import { prolog } from "@/content/story";
import { ENERGY, gsap, LAND, MOTION_OK, POINTER_MOTION, useGSAP } from "@/lib/motion/gsap";
import { whenIntroDone } from "@/lib/motion/intro-state";

const HERO_BLOBS = [
  { d: "M1140 120 C1290 40 1480 120 1500 300 C1520 470 1380 560 1240 520 C1100 480 1010 380 1030 260 C1040 190 1080 150 1140 120 Z", color: "var(--color-peach)" },
  { d: "M-60 640 C80 560 260 600 330 720 C400 840 330 960 180 980 C40 1000 -90 900 -110 790 C-120 720 -100 670 -60 640 Z", color: "var(--color-peach)" },
  { d: "M760 760 C820 700 930 710 970 790 C1010 870 960 950 870 960 C790 970 720 910 720 850 C720 810 735 785 760 760 Z", color: "var(--color-ember)" },
] as const;

// The yellow cover of the story (F-013): the background opens from the bottom-right corner, the title lands word by
// word, and a phone with two hardcovers tumbles in, then drifts as the page scrolls (reference-aardvark.md, hero).
export function Prolog() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const bg = section.querySelector<HTMLElement>("[data-hero-bg]");
      const visual = section.querySelector<HTMLElement>("[data-hero-visual]");
      const fades = section.querySelectorAll<HTMLElement>("[data-hero-fade]");
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        if (!document.documentElement.classList.contains("js")) return;
        const wide = window.matchMedia("(min-width: 992px)").matches;
        if (bg && wide) gsap.set(bg, { clipPath: "ellipse(20% 0% at 100% 100%)" });
        gsap.set(fades, { autoAlpha: 0, y: "-0.75em" });
        if (visual) gsap.set(visual, { autoAlpha: 0, y: "5em", rotate: -43 });
        section.dataset.heroReady = "";

        // The intro callback can fire outside this context (from completeIntro), so its timeline is killed by hand.
        let intro: gsap.core.Timeline | undefined;
        const stop = whenIntroDone(() => {
          intro = gsap.timeline();
          if (bg && wide) intro.to(bg, { clipPath: "ellipse(150% 130% at 100% 100%)", duration: 1.1, ease: "circ.out" }, 0);
          intro.to(fades, { autoAlpha: 1, y: 0, duration: 0.35, ease: ENERGY, stagger: 0.075 }, 0.45);
          if (visual) intro.to(visual, { autoAlpha: 1, y: 0, rotate: 0, duration: 1.2, ease: LAND }, 0.3);
        });

        // Once on screen, the visual drifts up and turns a little as the hero scrolls away.
        const drift = visual?.querySelector("[data-hero-drift]");
        if (drift) {
          gsap.to(drift, { yPercent: -18, rotate: 6, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.8 } });
        }
        return () => {
          stop();
          intro?.kill();
          gsap.set([bg, visual, ...fades].filter(Boolean), { clearProps: "clipPath,opacity,visibility,transform" });
          delete section.dataset.heroReady;
        };
      });

      // The books and the phone lean toward the pointer at different depths.
      mm.add(`${POINTER_MOTION} and (min-width: 992px)`, () => {
        const layers = gsap.utils.toArray<HTMLElement>("[data-hero-depth]", section).map((layer) => ({
          x: gsap.quickTo(layer, "x", { duration: 0.9, ease: "power3" }),
          y: gsap.quickTo(layer, "y", { duration: 0.9, ease: "power3" }),
          depth: Number(layer.dataset.heroDepth),
        }));
        const onMove = (event: PointerEvent) => {
          const nx = event.clientX / window.innerWidth - 0.5;
          const ny = event.clientY / window.innerHeight - 0.5;
          layers.forEach((layer) => {
            layer.x(nx * 60 * layer.depth);
            layer.y(ny * 40 * layer.depth);
          });
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="prolog" data-chapter="prolog" className="shape-bottom relative isolate min-h-[min(100svh,66rem)] overflow-hidden">
      <div data-hero-bg className="absolute inset-0 -z-10 bg-highlight">
        <Blobs blobs={HERO_BLOBS} className="absolute inset-0 h-full w-full" />
      </div>

      <div className="mx-auto grid min-h-[inherit] max-w-[90rem] items-center gap-10 px-6 pt-32 pb-24 lg:grid-cols-[1.25fr_0.75fr] lg:px-10">
        <div className="flex flex-col items-start gap-7">
          <PopTitle as="h1" intro className="display">
            {prolog.headlineLead} <em>{prolog.headlineEmphasis}</em>
          </PopTitle>
          <p data-hero-fade className="lead max-w-md">
            {prolog.body}
          </p>
          <div data-hero-fade className="flex flex-wrap items-center gap-3">
            <ButtonAlt href={site.app.playStoreUrl} cursorLabel={shell.header.cta} size="lg">
              {shell.footer.download}
            </ButtonAlt>
            <a href="#fitur" className="inline-flex h-14 items-center rounded-md bg-white px-6 font-bold transition-colors hover:bg-peach-pale">
              {prolog.secondary}
            </a>
          </div>
        </div>

        <div data-hero-visual className="relative mx-auto h-[min(70svh,36rem)] w-full max-w-[32rem]">
          <div data-hero-drift className="absolute inset-0">
            <div data-hero-depth="1.3" className="absolute top-[6%] left-[2%] text-[clamp(9px,1vw,14px)]">
              <Book3D tone="blue" pattern="waves" id="hero-a" pose="rotateX(14deg) rotateY(-34deg) rotateZ(-16deg)" />
            </div>
            <div data-hero-depth="0.4" className="absolute inset-0 flex items-center justify-center">
              <div className="w-[min(56vw,15.5rem)] rotate-[6deg]">
                <PhoneFrame screen={prolog.screen} eager decorative sizes="(min-width: 992px) 248px, 56vw" />
              </div>
            </div>
            <div data-hero-depth="0.9" className="absolute right-[0%] bottom-[4%] text-[clamp(8px,0.9vw,13px)]">
              <Book3D tone="coral" pattern="dots" id="hero-b" pose="rotateX(-10deg) rotateY(32deg) rotateZ(18deg)" />
            </div>
          </div>
          <HandNote intro delay={0.5} className="absolute -top-4 right-0 -rotate-6 text-[clamp(1.5rem,2.2vw,2rem)]">
            {prolog.note}
          </HandNote>
        </div>
      </div>
    </section>
  );
}
