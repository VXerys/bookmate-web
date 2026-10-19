"use client";

import { useRef } from "react";

import { Magnetic } from "@/components/motion/magnetic";
import { shell } from "@/content/shell";
import { site } from "@/content/site";
import { epilog } from "@/content/story";
import { gsap, MOTION_OK, useGSAP } from "@/lib/motion/gsap";

export function Epilog() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // The closing line settles from oversized to its final size as it arrives (AC-005).
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-epilog-line]",
          { scale: 1.25, opacity: 0.4 },
          { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: 0.8 } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="epilog" data-chapter="epilog" className="flex min-h-svh flex-col items-center justify-center gap-10 overflow-hidden px-4 py-24 text-center md:px-10">
      <h2 data-epilog-line className="display text-[clamp(3.25rem,10vw,11rem)]">
        {epilog.statementLead} <em>{epilog.statementEmphasis}</em>
      </h2>
      <Magnetic>
        <a
          href={site.app.playStoreUrl}
          data-cursor-label={shell.header.cta}
          className="inline-flex min-h-11 items-center rounded-full bg-ember px-8 py-4 text-lg font-medium text-ink"
        >
          {shell.footer.download}
        </a>
      </Magnetic>
    </section>
  );
}
