"use client";

import { useRef, type ElementType, type ReactNode } from "react";

import { EASE_OUT, gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/motion/gsap";
import { whenIntroDone } from "@/lib/motion/intro-state";
import { accessibleCopyFor, INTERACTIVE_SELECTOR } from "@/lib/motion/reveal-strategy";

type RevealProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  // "words" rises a heading word by word; "lines" lifts a paragraph line by line.
  mode?: "words" | "lines";
  delay?: number;
  start?: string;
};

export function Reveal({ as: Tag = "p", className, children, mode = "words", delay = 0, start = "top 88%" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const copy = accessibleCopyFor(typeof Tag === "string" ? Tag : "div");

  useGSAP(
    () => {
      const el = ref.current;
      const target = copy === "label" ? el : el?.querySelector<HTMLElement>("[data-reveal-visual]");
      if (!el || !target) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Without html.js the CSS never hid the text (boot fallback fired or JS came late), so leave it as is.
        if (!document.documentElement.classList.contains("js")) return;

        let split: SplitText | undefined;
        let srCopy: HTMLSpanElement | undefined;
        const scrollTrigger = { trigger: el, start, once: true };

        // Splitting after the intro means lines are measured with the final web fonts, so autoSplit rarely re-runs.
        const stopWaiting = whenIntroDone(() => {
          if (target.querySelector(INTERACTIVE_SELECTOR)) {
            el.dataset.revealReady = "";
            gsap.from(target, { y: 32, autoAlpha: 0, duration: 1.1, ease: EASE_OUT, delay, scrollTrigger });
            return;
          }
          if (copy === "duplicate") {
            // Built only once JS splits, so the no-JS page and its HTML carry the text exactly once.
            srCopy = document.createElement("span");
            srCopy.className = "sr-only";
            srCopy.textContent = target.textContent;
            target.before(srCopy);
            target.setAttribute("aria-hidden", "true");
          }
          split = SplitText.create(target, {
            type: mode === "words" ? "words,lines" : "lines",
            mask: "lines",
            aria: copy === "label" ? "auto" : "none",
            autoSplit: true,
            onSplit: (self) => {
              el.dataset.revealReady = "";
              // Returning the tween lets autoSplit carry its progress over when it re-splits on resize.
              return gsap.from(mode === "words" ? self.words : self.lines, {
                yPercent: 110,
                duration: 1.1,
                ease: EASE_OUT,
                stagger: mode === "words" ? 0.035 : 0.08,
                delay,
                scrollTrigger,
              });
            },
          });
        });

        return () => {
          stopWaiting();
          split?.revert();
          srCopy?.remove();
          if (srCopy) target.removeAttribute("aria-hidden");
          delete el.dataset.revealReady;
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [copy, mode, delay, start] },
  );

  return (
    <Tag ref={ref} className={className} data-reveal="">
      {copy === "label" ? (
        children
      ) : (
        <span className="block" data-reveal-visual="">
          {children}
        </span>
      )}
    </Tag>
  );
}
