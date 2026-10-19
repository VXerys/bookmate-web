"use client";

import { useRef } from "react";

import { Book3D } from "@/components/art/book3d";
import { HandNote } from "@/components/motion/hand-note";
import { PopTitle } from "@/components/motion/pop-title";
import { ButtonAlt } from "@/components/site/button-alt";
import { shell } from "@/content/shell";
import { site } from "@/content/site";
import { epilog } from "@/content/story";
import { gsap, LAND, useGSAP } from "@/lib/motion/gsap";

const WIDE_MOTION = "(min-width: 991px) and (prefers-reduced-motion: no-preference)";

// The last page (F-013, reference "exclusive" over the footer): white with rounded bottom corners, lifting away to
// reveal the blue footer, whose content drops into place as it appears (footer parallax, scrub 0.2).
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
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="epilog" data-chapter="epilog" className="shape-bottom relative isolate flex min-h-svh flex-col items-center justify-center gap-10 overflow-hidden bg-white px-6 py-28 text-center lg:px-10">
      <div data-epilog-book className="pointer-events-none absolute top-[12%] left-[6%] hidden text-[clamp(8px,0.9vw,13px)] md:block" aria-hidden="true">
        <Book3D tone="green" pattern="arches" id="epilog-a" pose="rotateX(12deg) rotateY(-30deg) rotateZ(-10deg)" />
      </div>
      <div data-epilog-book className="pointer-events-none absolute right-[7%] bottom-[12%] hidden text-[clamp(8px,1vw,14px)] md:block" aria-hidden="true">
        <Book3D tone="blue" pattern="stripes" id="epilog-b" pose="rotateX(-8deg) rotateY(34deg) rotateZ(12deg)" />
      </div>
      <PopTitle className="display max-w-5xl">
        {epilog.statementLead} <em className="text-blue">{epilog.statementEmphasis}</em>
      </PopTitle>
      <div data-epilog-cta className="flex flex-col items-center gap-4">
        <ButtonAlt href={site.app.playStoreUrl} cursorLabel={shell.header.cta} size="lg">
          {shell.footer.download}
        </ButtonAlt>
        <HandNote decorative className="rotate-2">
          {epilog.note}
        </HandNote>
      </div>
    </section>
  );
}
