"use client";

import { useRef, type ReactNode } from "react";

import { gsap, HOVER_MOTION, SplitText, useGSAP } from "@/lib/motion/gsap";

// Primary CTAs are yellow on blue and dark blocks and navy on light ones; white is the quiet alternative. Each pairs
// the label with a contrasting round arrow chip (F-014 palette pass: blue leads, yellow is the one warm accent).
type Tone = "highlight" | "navy" | "white";

const TONE: Record<Tone, { pill: string; chip: string }> = {
  highlight: { pill: "bg-highlight text-navy", chip: "bg-navy text-highlight" },
  navy: { pill: "bg-navy text-white", chip: "bg-highlight text-navy" },
  white: { pill: "bg-white text-navy", chip: "bg-blue text-white" },
};

type ButtonAltProps = {
  href: string;
  children: ReactNode;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  cursorLabel?: string;
  className?: string;
};

const SIZE = {
  sm: { pill: "h-11 gap-2 pl-4 pr-1 text-sm", chip: "size-9" },
  md: { pill: "h-13 gap-3 pl-5 pr-1.5 text-base", chip: "size-10" },
  lg: { pill: "h-15 gap-4 pl-7 pr-2 text-[1.2rem]", chip: "size-11" },
} as const;

// A capsule with a round arrow chip. On hover the capsule lifts, the chip turns and nudges the arrow forward, and each
// letter drops, squashes, and springs back (the reference's letter bounce, kept from F-013).
export function ButtonAlt({ href, children, tone = "highlight", size = "md", cursorLabel, className }: ButtonAltProps) {
  const root = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const link = root.current;
      const text = link?.querySelector<HTMLElement>("[data-button-text]");
      if (!link || !text) return;
      const mm = gsap.matchMedia();
      mm.add(HOVER_MOTION, () => {
        // aria "auto" keeps the label readable as one word to screen readers once split into letters.
        // Words first, then letters: a letters-only split lost the spaces between words ("Undu hd iGoogl ePlay").
        const split = SplitText.create(text, { type: "words,chars", aria: "auto" });
        gsap.set(split.words, { display: "inline-block" });
        gsap.set(split.chars, { display: "inline-block", transformOrigin: "50% 50%" });
        const bounce = gsap.timeline({ paused: true }).to(split.chars, {
          keyframes: {
            "0%": { yPercent: 0, scaleY: 1, rotate: 0 },
            "20%": { yPercent: 45, scaleY: 0.4, rotate: 12, ease: "power2.in" },
            "100%": { yPercent: 0, scaleY: 1, rotate: 0, ease: "elastic.out(1, 0.45)" },
          },
          duration: 0.7,
          stagger: { amount: 0.2 },
        });
        const play = () => bounce.restart();
        link.addEventListener("pointerenter", play);
        return () => {
          link.removeEventListener("pointerenter", play);
          split.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const look = TONE[tone];
  return (
    <a
      ref={root}
      href={href}
      data-cursor-label={cursorLabel}
      className={`group inline-flex items-center rounded-full font-bold whitespace-nowrap shadow-[0_10px_24px_-14px_rgb(3_4_10/0.6)] transition-[translate,box-shadow] duration-300 ease-(--ease-expo) hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-14px_rgb(3_4_10/0.65)] active:translate-y-0 ${SIZE[size].pill} ${look.pill} ${className ?? ""}`}
    >
      <span data-button-text>{children}</span>
      <span className={`grid shrink-0 place-items-center rounded-full transition-transform duration-500 ease-(--ease-expo) group-hover:-rotate-45 ${SIZE[size].chip} ${look.chip}`} aria-hidden="true">
        <svg viewBox="0 0 12 10" className="w-3.5 transition-transform duration-300 group-hover:translate-x-0.5">
          <path d="M1 5h9M6.5 1.5 10 5 6.5 8.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
