"use client";

import { useRef } from "react";

import { gsap, POINTER_MOTION, useGSAP } from "@/lib/motion/gsap";

type CursorState = "idle" | "link" | "label";

// Fine pointers only (AC-014, AC-017); the native cursor stays visible, so a slow script never leaves the visitor
// without a pointer. States come from the element under the pointer: links and buttons grow the ring,
// data-cursor-label turns it into a labelled pill, data-cursor="hide" hides it (AC-015).
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLDivElement>(null);
  const pillText = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(POINTER_MOTION, () => {
      const d = dot.current;
      const r = ring.current;
      const p = pill.current;
      if (!d || !r || !p) return;
      const all = [d, r, p];
      gsap.set(all, { xPercent: -50, yPercent: -50 });

      const dotX = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" });
      const dotY = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });
      const ringX = gsap.quickTo([r, p], "x", { duration: 0.5, ease: "power3" });
      const ringY = gsap.quickTo([r, p], "y", { duration: 0.5, ease: "power3" });

      let visible = false;
      let state: CursorState = "idle";
      const show = (on: boolean) => {
        if (on === visible) return;
        visible = on;
        gsap.to([d, r], { autoAlpha: on ? 1 : 0, duration: 0.25, overwrite: "auto" });
        if (!on) gsap.to(p, { autoAlpha: 0, duration: 0.2, overwrite: "auto" });
      };
      const setState = (next: CursorState, label = "") => {
        if (pillText.current) pillText.current.textContent = label;
        if (next === state) return;
        state = next;
        r.dataset.cursorState = next;
        gsap.to(p, { autoAlpha: next === "label" ? 1 : 0, scale: next === "label" ? 1 : 0.6, duration: 0.3, overwrite: "auto" });
        gsap.to(r, { autoAlpha: next === "label" ? 0 : 1, duration: 0.2, overwrite: "auto" });
      };

      const onMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        dotX(event.clientX);
        dotY(event.clientY);
        ringX(event.clientX);
        ringY(event.clientY);
        const target = event.target instanceof Element ? event.target : null;
        if (target?.closest('[data-cursor="hide"]')) {
          show(false);
          return;
        }
        show(true);
        const labelled = target?.closest<HTMLElement>("[data-cursor-label]");
        if (labelled) setState("label", labelled.dataset.cursorLabel);
        else setState(target?.closest("a, button") ? "link" : "idle");
      };
      const onLeave = () => show(false);

      document.addEventListener("pointermove", onMove);
      document.documentElement.addEventListener("pointerleave", onLeave);
      window.addEventListener("blur", onLeave);
      return () => {
        document.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("blur", onLeave);
      };
    });
    return () => mm.revert();
  });

  return (
    <>
      <div
        ref={ring}
        data-cursor-state="idle"
        aria-hidden="true"
        className="cursor-ring pointer-events-none invisible fixed top-0 left-0 z-[95] opacity-0 mix-blend-difference"
      >
        <div className="cursor-circle size-9 rounded-full border-2 border-paper" />
      </div>
      <div
        ref={pill}
        aria-hidden="true"
        className="pointer-events-none invisible fixed top-0 left-0 z-[96] opacity-0"
      >
        <span ref={pillText} className="label block rounded-full bg-ember px-4 py-2 whitespace-nowrap text-ink" />
      </div>
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none invisible fixed top-0 left-0 z-[96] size-2 rounded-full bg-paper opacity-0 mix-blend-difference"
      />
    </>
  );
}
