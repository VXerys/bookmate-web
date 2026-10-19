"use client";

import { useRef, type ReactNode } from "react";

import { gsap, HOVER_MOTION, SplitText, useGSAP } from "@/lib/motion/gsap";

type Tone = "ember" | "blue" | "ink" | "white" | "highlight";

const TONE: Record<Tone, string> = {
  ember: "bg-ember text-ink",
  blue: "bg-blue text-white",
  ink: "bg-ink text-white",
  white: "bg-white text-ink",
  highlight: "bg-highlight text-ink",
};

type ButtonAltProps = {
  href: string;
  children: ReactNode;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  cursorLabel?: string;
  className?: string;
};

const SIZE = { sm: "h-10 px-4 text-sm", md: "h-12 px-5 text-base", lg: "h-14 px-7 text-lg" } as const;
const ICON = { sm: "w-10", md: "w-12", lg: "w-14" } as const;

// The reference's two-capsule button: a label pill and a square arrow pill of the same colour, a hair apart. On hover
// each letter drops, squashes, and springs back (docs/product/reference-aardvark.md, button-alt).
export function ButtonAlt({ href, children, tone = "ember", size = "md", cursorLabel, className }: ButtonAltProps) {
  const root = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const link = root.current;
      const text = link?.querySelector<HTMLElement>("[data-button-text]");
      if (!link || !text) return;
      const mm = gsap.matchMedia();
      mm.add(HOVER_MOTION, () => {
        // aria "auto" keeps the label readable as one word to screen readers once split into letters.
        const split = SplitText.create(text, { type: "chars", aria: "auto" });
        gsap.set(split.chars, { display: "inline-block", transformOrigin: "50% 50%" });
        const bounce = gsap.timeline({ paused: true }).to(split.chars, {
          keyframes: {
            "0%": { yPercent: 0, scaleY: 1, rotate: 0 },
            "20%": { yPercent: 55, scaleY: 0.3, rotate: 17, ease: "power2.in" },
            "100%": { yPercent: 0, scaleY: 1, rotate: 0, ease: "elastic.out(1, 0.4)" },
          },
          duration: 0.725,
          stagger: { amount: 0.225 },
        });
        const arrow = link.querySelector("[data-button-arrow]");
        const play = () => {
          bounce.restart();
          if (arrow) gsap.fromTo(arrow, { x: -14, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.5, ease: "elastic.out(1, 0.6)" });
        };
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

  return (
    <a ref={root} href={href} data-cursor-label={cursorLabel} className={`group inline-flex items-stretch gap-[3px] font-bold ${className ?? ""}`}>
      <span className={`flex items-center rounded-md ${SIZE[size]} ${TONE[tone]}`}>
        <span data-button-text>{children}</span>
      </span>
      <span className={`grid place-items-center overflow-hidden rounded-md ${ICON[size]} ${TONE[tone]}`} aria-hidden="true">
        <svg data-button-arrow viewBox="0 0 12 10" className="w-3.5">
          <path d="M1 5h9M6.5 1.5 10 5 6.5 8.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
