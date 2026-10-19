"use client";

import { useRef, useState } from "react";

import { PhoneFrame } from "@/components/site/phone-frame";
import { babHeading, babs, type BabTone } from "@/content/story";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";

// Literal class names so Tailwind generates them; the text colours match babText in story.ts (tested for contrast).
const TONE: Record<BabTone, string> = {
  plum: "bg-plum text-paper",
  ember: "bg-ember text-ink",
  forest: "bg-forest text-paper",
  blue: "bg-blue text-ink",
  peach: "bg-peach text-ink",
};

const HORIZONTAL = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

// Panels stack vertically by default (no JS, reduced motion, narrow screens). On wide screens with motion allowed the
// section pins and the track slides sideways (F-005 FR-002).
export function BabTrack() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const section = root.current;
      const track = section?.querySelector<HTMLElement>("[data-bab-track]");
      if (!section || !track) return;
      const mm = gsap.matchMedia();
      mm.add(HORIZONTAL, () => {
        section.dataset.horizontal = "";
        const distance = () => track.scrollWidth - window.innerWidth;
        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-bab-panel]", section).forEach((panel, index) => {
          const frame = panel.querySelector("[data-bab-frame]");
          if (frame) {
            gsap.fromTo(
              frame,
              { xPercent: -8 },
              {
                xPercent: 8,
                ease: "none",
                scrollTrigger: { trigger: panel, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
              },
            );
          }
          ScrollTrigger.create({
            trigger: panel,
            containerAnimation: slide,
            start: "left center",
            end: "right center",
            onToggle: (self) => {
              if (self.isActive) setActive(index);
            },
          });
        });
        return () => {
          delete section.dataset.horizontal;
          gsap.set(track, { clearProps: "transform" });
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="bab" data-chapter="bab" className="bab relative overflow-hidden">
      {/* On a paper pill: it floats over five differently coloured panels, and ink on paper passes on all of them. */}
      <div className="bab-head pointer-events-none absolute top-24 left-4 z-10 flex items-baseline gap-4 rounded-full bg-paper/95 px-4 py-2 text-ink md:left-10">
        <h2 className="label">{babHeading}</h2>
        <p className="bab-indicator label hidden" aria-hidden="true">
          Bab {babs[active].number} / {String(babs.length).padStart(2, "0")}
        </p>
      </div>
      <div data-bab-track className="flex flex-col">
        {babs.map((bab) => (
          <article
            key={bab.number}
            data-bab-panel
            className={`bab-panel grid min-h-svh items-center gap-10 px-4 pt-36 pb-16 md:px-10 lg:grid-cols-[1fr_auto] ${TONE[bab.tone]}`}
          >
            <div className="flex max-w-xl flex-col gap-6">
              <p className="label">Bab {bab.number}</p>
              <h3 className="display text-[clamp(2.75rem,6vw,6.5rem)]">{bab.title}</h3>
              <p className="text-lg">{bab.body}</p>
            </div>
            <div data-bab-frame className="w-[min(62vw,280px)] justify-self-center">
              <PhoneFrame screen={bab.screen} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
