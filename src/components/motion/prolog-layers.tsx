"use client";

import { useRef } from "react";

import { Book3D } from "@/components/art/book3d";
import { Sparkle, Tape } from "@/components/art/doodles";
import { PhoneFrame } from "@/components/site/phone-frame";
import { prolog } from "@/content/story";
import { drawDoodle, prepareDoodles, revealDoodles } from "@/lib/motion/draw";
import { EASE_OUT, gsap, MOTION_OK, POINTER_MOTION, useGSAP } from "@/lib/motion/gsap";
import { whenIntroDone } from "@/lib/motion/intro-state";

// Each layer has two wrappers: the outer one takes scroll parallax (yPercent) and the entrance (y), the inner one takes
// pointer parallax (x, y), so no two effects write the same property (F-003 design). Deeper layers move more.
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
        let intro: gsap.core.Timeline | undefined;
        if (document.documentElement.classList.contains("js")) {
          prepareDoodles(el);
          stopWaiting = whenIntroDone(() => {
            el.dataset.revealReady = "";
            intro = gsap
              .timeline({ delay: 0.3 })
              .from(layers, {
                y: (i: number) => 90 + i * 20,
                rotation: (i: number) => (i % 2 ? 8 : -8),
                autoAlpha: 0,
                duration: 1.3,
                ease: EASE_OUT,
                stagger: 0.09,
              })
              .add(
                gsap.utils.toArray<Element>("[data-draw]", el).map((doodle) => drawDoodle(doodle, { duration: 0.8 })),
                0.9,
              );
          });
        } else {
          el.dataset.revealReady = "";
        }
        // The 3D books bob gently on their own and tumble a little further as the page scrolls past them.
        gsap.utils.toArray<HTMLElement>(".book3d", el).forEach((book, index) => {
          gsap.to(book, { y: -14, duration: 2.6 + index * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
          gsap.to(book.querySelector(".book3d-box"), {
            rotationY: `+=${index % 2 ? -70 : 80}`,
            rotationX: `+=${index % 2 ? 24 : -18}`,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
          });
        });
        layers.forEach((layer) => {
          gsap.to(layer, {
            yPercent: -45 * depth(layer),
            ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.8 },
          });
        });
        return () => {
          stopWaiting();
          intro?.kill();
          gsap.set(layers, { clearProps: "transform,opacity,visibility" });
          revealDoodles(el);
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
            mover.x(nx * 70 * mover.depth);
            mover.y(ny * 46 * mover.depth);
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
    <div ref={root} data-reveal="" className="relative mx-auto h-[min(80svh,640px)] w-full max-w-[560px]" aria-hidden="true">
      {/* Positioned with insets, not translate utilities: GSAP owns each layer's transform. */}
      <div data-depth="1.1" className="absolute top-[4%] left-[0%] text-[clamp(9px,1.05vw,15px)]">
        <div>
          <Book3D tone="blue" pattern="waves" id="prolog-a" pose="rotateX(14deg) rotateY(-34deg) rotateZ(-16deg)" />
        </div>
      </div>
      <div data-depth="0.75" className="absolute right-[0%] bottom-[6%] text-[clamp(8.5px,0.95vw,14px)]">
        <div>
          <Book3D tone="ember" pattern="dots" id="prolog-b" pose="rotateX(-10deg) rotateY(32deg) rotateZ(18deg)" />
        </div>
      </div>
      <div data-depth="1.4" className="absolute top-[0%] right-[24%] text-[clamp(6px,0.62vw,9px)]">
        <div>
          <Book3D tone="plum" pattern="stripes" id="prolog-c" pose="rotateX(20deg) rotateY(40deg) rotateZ(64deg)" depth={2.8} />
        </div>
      </div>
      <div data-depth="0.35" className="absolute inset-0 flex items-center justify-center">
        <div className="w-[min(58vw,262px)] rotate-[4deg]">
          <PhoneFrame screen={prolog.screen} eager decorative sizes="(min-width: 768px) 262px, 58vw" />
        </div>
      </div>
      <div data-depth="0.9" className="absolute top-[16%] right-[2%]">
        <div className="relative w-40 rotate-[5deg] rounded-sm bg-peach px-4 pt-6 pb-4 text-ink shadow-[4px_6px_0_var(--color-ink)]">
          <Tape className="absolute -top-3 left-1/2 w-20 -translate-x-1/2 -rotate-3" />
          <p className="hand text-2xl">{prolog.notes.page}</p>
        </div>
      </div>
      <div data-depth="0.6" className="absolute bottom-[12%] left-[0%]">
        <div className="relative w-44 -rotate-[6deg] rounded-sm bg-sky px-4 pt-6 pb-4 text-ink shadow-[4px_6px_0_var(--color-ink)]">
          <Tape className="absolute -top-3 left-6 w-16 rotate-6" />
          <p className="hand text-2xl">{prolog.notes.club}</p>
        </div>
      </div>
      <div data-depth="1.3" className="absolute top-[2%] right-[30%]">
        <div>
          <Sparkle className="size-14 text-blue" />
        </div>
      </div>
      <div data-depth="1.2" className="absolute bottom-[2%] left-[42%]">
        <div>
          <Sparkle className="size-10 text-ember" />
        </div>
      </div>
    </div>
  );
}
