"use client";

import { useRef, type ReactNode } from "react";

import { gsap, POINTER_MOTION, useGSAP } from "@/lib/motion/gsap";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  // Share of the pointer's distance from the centre that the element follows (AC-016: 0.3).
  strength?: number;
};

export function Magnetic({ children, className, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(POINTER_MOTION, () => {
        const el = ref.current;
        if (!el) return;
        // power3, not elastic: quickTo restarts on every pointermove, and an elastic ease wobbled the button in place.
        const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
        const onMove = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          // Measured without the current offset, so the pull is relative to where the element really sits.
          const box = el.getBoundingClientRect();
          const x = Number(gsap.getProperty(el, "x"));
          const y = Number(gsap.getProperty(el, "y"));
          xTo((event.clientX - (box.left - x + box.width / 2)) * strength);
          yTo((event.clientY - (box.top - y + box.height / 2)) * strength);
        };
        // The release eases home a little slower than the pull, so letting go reads as a settle, not a snap.
        const onLeave = () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "power3.out", overwrite: true });
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
          gsap.set(el, { x: 0, y: 0 });
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [strength] },
  );

  return (
    <span ref={ref} className={`inline-block ${className ?? ""}`}>
      {children}
    </span>
  );
}
