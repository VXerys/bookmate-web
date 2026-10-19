"use client";

import { useRef, type ReactNode } from "react";

import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/motion/gsap";
import { whenIntroDone } from "@/lib/motion/intro-state";

type HandNoteProps = {
  children: ReactNode;
  className?: string;
  intro?: boolean;
  delay?: number;
  // Decorative scribbles stay out of the accessibility tree; notes that carry meaning are read normally.
  decorative?: boolean;
};

// A club member's handwritten note: letters tumble in one by one and spring into place (reference-aardvark.md,
// handwritten text in view).
export function HandNote({ children, className, intro = false, delay = 0, decorative = false }: HandNoteProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (!document.documentElement.classList.contains("js")) return;
        const split = SplitText.create(el, { type: "words,chars", aria: decorative ? "none" : "auto" });
        gsap.set(split.words, { display: "inline-block" });
        gsap.set(split.chars, { display: "inline-block", opacity: 0, rotate: 22, x: "-0.25em", y: "0.5em" });
        el.dataset.revealReady = "";
        let tween: gsap.core.Tween | undefined;
        const write = () => {
          tween = gsap.to(split.chars, {
            opacity: 1,
            rotate: 0,
            x: 0,
            y: 0,
            ease: "elastic.out(1, 0.75)",
            duration: 0.75,
            stagger: 0.016,
            delay,
            scrollTrigger: intro ? undefined : { trigger: el, start: "top 95%", once: true },
          });
        };
        const stop = intro ? whenIntroDone(write) : (write(), () => {});
        return () => {
          stop();
          tween?.kill();
          split.revert();
          delete el.dataset.revealReady;
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [intro, delay, decorative] },
  );

  return (
    <p ref={ref} className={`hand ${className ?? ""}`} data-reveal="" aria-hidden={decorative || undefined}>
      {children}
    </p>
  );
}
