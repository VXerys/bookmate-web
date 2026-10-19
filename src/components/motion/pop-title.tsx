"use client";

import { useRef, type ElementType, type ReactNode } from "react";

import { gsap, LAND, MOTION_OK, SplitText, useGSAP } from "@/lib/motion/gsap";
import { whenIntroDone } from "@/lib/motion/intro-state";

type PopTitleProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  // Hero titles wait for the intro instead of the viewport.
  intro?: boolean;
  delay?: number;
};

// Headings land word by word: each word starts squashed, shifted right and tilted, then springs upright
// (reference-aardvark.md, intro hero). Hidden only while JS runs with motion allowed, via [data-reveal] in globals.css.
export function PopTitle({ as: Tag = "h2", className, children, intro = false, delay = 0 }: PopTitleProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (!document.documentElement.classList.contains("js")) return;
        const split = SplitText.create(el, { type: "words", aria: "auto" });
        gsap.set(split.words, { display: "inline-block", transformOrigin: "0% 0%" });
        gsap.set(split.words, { yPercent: -10, xPercent: 40, scaleY: 0.1, scaleX: 0.85, rotate: 8, opacity: 0 });
        el.dataset.revealReady = "";
        let tween: gsap.core.Tween | undefined;
        const land = () => {
          tween = gsap.to(split.words, {
            keyframes: { "0%": {}, "10%": { opacity: 1 }, "100%": { yPercent: 0, xPercent: 0, scaleY: 1, scaleX: 1, rotate: 0, ease: LAND } },
            duration: 0.875,
            stagger: 0.088,
            delay,
            scrollTrigger: intro ? undefined : { trigger: el, start: "top 85%", once: true },
          });
        };
        // whenIntroDone may call back outside this context (from completeIntro), so the tween is killed by hand.
        const stop = intro ? whenIntroDone(land) : (land(), () => {});
        return () => {
          stop();
          tween?.kill();
          split.revert();
          delete el.dataset.revealReady;
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [intro, delay] },
  );

  return (
    <Tag ref={ref} className={className} data-reveal="">
      {children}
    </Tag>
  );
}
