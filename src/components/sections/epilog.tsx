"use client";

import { useRef } from "react";

import { Book3D } from "@/components/art/book3d";
import { CircleText } from "@/components/art/circle-text";
import { CurveText } from "@/components/art/curve-text";
import { HandNote } from "@/components/motion/hand-note";
import { PopTitle } from "@/components/motion/pop-title";
import { ButtonAlt } from "@/components/site/button-alt";
import { LogoMark } from "@/components/site/logo";
import { shelfBook } from "@/components/site/shelf";
import { shell } from "@/content/shell";
import { site } from "@/content/site";
import { epilog } from "@/content/story";
import { gsap, LAND, useGSAP } from "@/lib/motion/gsap";

const WIDE_MOTION = "(min-width: 991px) and (prefers-reduced-motion: no-preference)";
const BOOK_A = shelfBook("thingsWeLostInTheFire");
const BOOK_B = shelfBook("whatYouAreLookingForIsInTheLibrary");
const CURVE_MORPH = ["M-80 210 C 260 60 460 90 740 200 S 1180 260 1520 80", "M-80 150 C 220 260 480 260 720 140 S 1260 60 1520 220"];

// The last page (F-014, reference "exclusive" over the footer): a ribbon of the opening line bends across the top and
// slides with the scroll, two real books from the shelf tumble in from the sides, and the white page lifts away with
// rounded corners to reveal the blue footer, whose content drops into place (footer parallax, scrub 0.2).
export function Epilog() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-epilog-book]", {
          y: 160,
          rotation: (i: number) => (i ? 40 : -40),
          autoAlpha: 0,
          duration: 1.2,
          ease: LAND,
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: "top 60%", once: true },
        });
        gsap.from("[data-epilog-cta]", { y: 30, autoAlpha: 0, duration: 0.5, ease: "energy", scrollTrigger: { trigger: section, start: "top 50%", once: true } });
      });
      mm.add(WIDE_MOTION, () => {
        const inner = document.querySelector("[data-footer-inner]");
        if (!inner) return;
        gsap.fromTo(inner, { y: "-12.5em" }, { y: 0, ease: "none", scrollTrigger: { trigger: section, start: "bottom bottom", end: "bottom top", scrub: 0.2 } });
      });
      // The footer is 70svh tall, so at the very end of the page the epilog's bottom sits about 30% from the top: the
      // scrub ends before that, or the last letters would never finish rising.
      // Footer in and out, scrubbed both ways: the tagline's words rise from their line, the link columns come out of a
      // light blur, then the wordmark's letters climb up one by one; scrolling back up plays it in reverse.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const footer = document.querySelector("footer");
        if (!footer) return;
        const rises = footer.querySelectorAll("[data-footer-rise]");
        const letters = footer.querySelectorAll("[data-footer-letter]");
        const words = footer.querySelectorAll("[data-footer-word]");
        gsap
          .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: section, start: "bottom 95%", end: "bottom 40%", scrub: 0.6 } })
          // The tagline's words rise out of their clipping boxes one by one, the same move as the wordmark letters.
          .fromTo(words, { yPercent: 110, rotation: 6 }, { yPercent: 0, rotation: 0, stagger: 0.035, duration: 0.45 }, 0)
          .fromTo(rises, { y: 60, autoAlpha: 0, filter: "blur(6px)" }, { y: 0, autoAlpha: 1, filter: "blur(0px)", stagger: 0.12, duration: 0.5 }, 0.1)
          .fromTo(letters, { yPercent: 110, rotation: 8 }, { yPercent: 0, rotation: 0, stagger: 0.06, duration: 0.5 }, 0.25);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="epilog" data-chapter="epilog" className="shape-bottom relative isolate flex min-h-svh flex-col items-center justify-center gap-10 overflow-hidden bg-white px-6 pt-10 pb-20 text-center lg:px-10">
      <CurveText id="epilog-curve" text={epilog.curve} tone="highlight" ink="navy" morph={CURVE_MORPH} from="-30%" to="5%" className="-mx-6 h-[clamp(6rem,14vw,12rem)] w-[calc(100%+3rem)] lg:-mx-10 lg:w-[calc(100%+5rem)]" />
      <div data-epilog-book className="pointer-events-none absolute top-[30%] left-[5%] hidden text-[clamp(8px,0.9vw,13px)] md:block" aria-hidden="true">
        <Book3D cover={BOOK_A.cover} color={BOOK_A.color} pose="rotateX(12deg) rotateY(-30deg) rotateZ(-10deg)" />
      </div>
      <div data-epilog-book className="pointer-events-none absolute right-[6%] bottom-[10%] hidden text-[clamp(8px,1vw,14px)] md:block" aria-hidden="true">
        <Book3D cover={BOOK_B.cover} color={BOOK_B.color} pose="rotateX(-8deg) rotateY(34deg) rotateZ(12deg)" />
      </div>
      <p data-rise className="label">{epilog.kicker}</p>
      <PopTitle className="display max-w-5xl">
        {epilog.statementLead} <em>{epilog.statementEmphasis}</em>
      </PopTitle>
      <div data-epilog-cta className="flex flex-col items-center gap-4">
        <ButtonAlt href={site.app.playStoreUrl} cursorLabel={shell.header.cta} tone="navy" size="lg">
          {shell.footer.download}
        </ButtonAlt>
        <HandNote decorative className="rotate-2">
          {epilog.note}
        </HandNote>
      </div>
      <div data-pop className="w-28 lg:absolute lg:top-[26%] lg:right-[12%] lg:w-36">
        <CircleText id="epilog-stamp" text={epilog.stamp} tone="blue" ink="white" spin={-24} className="aspect-square w-full">
          <LogoMark className="w-full text-white" />
        </CircleText>
      </div>
    </section>
  );
}
