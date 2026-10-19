"use client";

import { useRef } from "react";

import { PhoneFrame } from "@/components/site/phone-frame";
import { prolog } from "@/content/story";
import { EASE_OUT, gsap, MOTION_OK, POINTER_MOTION, useGSAP } from "@/lib/motion/gsap";
import { whenIntroDone } from "@/lib/motion/intro-state";

// Each layer has two wrappers: the outer one takes scroll parallax (yPercent) and the entrance (y), the inner one takes
// pointer parallax (x, y), so no two effects write the same property (F-003 design).
export function PrologLayers() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const section = el?.closest("section");
      if (!el || !section) return;
      const layers = gsap.utils.toArray<HTMLElement>("[data-depth]", el);
      const depth = (layer: HTMLElement) => Number(layer.dataset.depth);

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        let stopWaiting = () => {};
        if (document.documentElement.classList.contains("js")) {
          stopWaiting = whenIntroDone(() => {
            el.dataset.revealReady = "";
            gsap.from(layers, { y: 70, autoAlpha: 0, duration: 1.2, ease: EASE_OUT, stagger: 0.12, delay: 0.35 });
          });
        } else {
          el.dataset.revealReady = "";
        }
        layers.forEach((layer) => {
          gsap.to(layer, {
            yPercent: -40 * depth(layer),
            ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
          });
        });
        return () => {
          stopWaiting();
          delete el.dataset.revealReady;
        };
      });

      mm.add(`${POINTER_MOTION} and (min-width: 768px)`, () => {
        const movers = layers.map((layer) => {
          const inner = layer.firstElementChild as HTMLElement;
          return {
            x: gsap.quickTo(inner, "x", { duration: 0.9, ease: "power3" }),
            y: gsap.quickTo(inner, "y", { duration: 0.9, ease: "power3" }),
            depth: depth(layer),
          };
        });
        const onMove = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          const nx = event.clientX / window.innerWidth - 0.5;
          const ny = event.clientY / window.innerHeight - 0.5;
          for (const mover of movers) {
            mover.x(nx * 60 * mover.depth);
            mover.y(ny * 40 * mover.depth);
          }
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} data-reveal="" className="relative mx-auto h-[min(78svh,620px)] w-full max-w-[520px]" aria-hidden="true">
      {/* Centred with flex, not translate utilities: GSAP owns this element's transform (yPercent). */}
      <div data-depth="0.3" className="absolute inset-0 flex items-center justify-center">
        <div className="w-[min(62vw,270px)]">
          <PhoneFrame screen={prolog.screen} eager decorative sizes="(min-width: 768px) 270px, 62vw" />
        </div>
      </div>
      <div data-depth="0.8" className="absolute top-[12%] left-0">
        <div className="rounded-full bg-ember px-4 py-2 text-sm font-medium text-ink shadow-lg">{prolog.chips.streak}</div>
      </div>
      <div data-depth="1" className="absolute bottom-[14%] left-[2%]">
        <div className="rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-sm text-ink shadow-lg">{prolog.chips.progress}</div>
      </div>
      <div data-depth="0.6" className="absolute top-[22%] right-0">
        <div className="flex h-36 w-24 flex-col justify-end rounded-xl bg-plum p-3 text-paper shadow-lg">
          <span className="label">{prolog.chips.badge}</span>
        </div>
      </div>
    </div>
  );
}
