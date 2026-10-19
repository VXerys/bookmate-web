"use client";

import Image from "next/image";
import { useRef } from "react";

import { HandNote } from "@/components/motion/hand-note";
import { screenImages } from "@/components/site/screen-images";
import { daftar, fitur } from "@/content/story";
import { gsap, HOVER_MOTION, LAND, MOTION_OK, useGSAP } from "@/lib/motion/gsap";

// The feature list as giant words on a blue capsule (F-013, reference "genre" section). On a fine pointer, hovering a
// word floats that feature's screenshot beside the cursor; touch and keyboard users read the list as plain text.
export function Daftar() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.from("[data-list-word]", {
          yPercent: 80,
          rotate: 4,
          autoAlpha: 0,
          duration: 0.9,
          ease: LAND,
          stagger: 0.07,
          scrollTrigger: { trigger: "[data-list]", start: "top 80%", once: true },
        });
      });

      mm.add(HOVER_MOTION, () => {
        const preview = section.querySelector<HTMLElement>("[data-preview]");
        const shots = gsap.utils.toArray<HTMLElement>("[data-preview-shot]", section);
        const words = gsap.utils.toArray<HTMLElement>("[data-list-word]", section);
        if (!preview) return;
        gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0, rotate: -12 });
        const x = gsap.quickTo(preview, "x", { duration: 0.55, ease: "power3" });
        const y = gsap.quickTo(preview, "y", { duration: 0.55, ease: "power3" });
        let shown = -1;
        const show = (index: number) => {
          if (index === shown) return;
          shown = index;
          shots.forEach((shot, i) => gsap.to(shot, { autoAlpha: i === index ? 1 : 0, duration: 0.25, overwrite: true }));
          gsap.to(preview, { scale: index < 0 ? 0 : 1, rotate: index < 0 ? -12 : index % 2 ? 6 : -6, duration: 0.6, ease: index < 0 ? "power3.in" : LAND, overwrite: "auto" });
        };
        const onMove = (event: PointerEvent) => {
          const box = section.getBoundingClientRect();
          x(event.clientX - box.left);
          y(event.clientY - box.top);
        };
        const enters = words.map((word, index) => {
          const enter = () => show(index);
          word.addEventListener("pointerenter", enter);
          return () => word.removeEventListener("pointerenter", enter);
        });
        const leave = () => show(-1);
        section.addEventListener("pointermove", onMove);
        section.querySelector("[data-list]")?.addEventListener("pointerleave", leave);
        return () => {
          enters.forEach((off) => off());
          section.removeEventListener("pointermove", onMove);
          section.querySelector("[data-list]")?.removeEventListener("pointerleave", leave);
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="bg-white">
      <section ref={root} id="daftar" data-chapter="daftar" className="shape-capsule relative overflow-hidden bg-blue px-6 py-28 lg:px-10">
        <div className="mx-auto flex max-w-[90rem] flex-col items-center gap-3 text-center">
          <h2 className="statement">{daftar.kicker}</h2>
          <HandNote decorative className="rotate-2 !text-highlight">
            {daftar.note}
          </HandNote>
        </div>
        <ul data-list className="mx-auto mt-12 flex max-w-[90rem] flex-col items-center">
          {fitur.items.map((item) => (
            <li key={item.id} className="overflow-hidden">
              <a
                href="#fitur"
                data-list-word
                className="block font-display text-[clamp(2.75rem,9vw,8.5rem)] leading-[0.92] font-extrabold tracking-tight text-ink transition-colors duration-300 hover:text-paper focus-visible:text-paper"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
        {/* Decorative: the same screenshots appear, with alt text, in the feature shelf above. */}
        <div data-preview className="pointer-events-none absolute top-0 left-0 hidden w-48 lg:block" aria-hidden="true">
          <div className="relative aspect-[240/370] overflow-hidden rounded-3xl bg-highlight p-2">
            {fitur.items.map((item) => (
              <div key={item.id} data-preview-shot className="invisible absolute inset-2 overflow-hidden rounded-2xl opacity-0">
                <Image src={screenImages[item.screen]} alt="" fill sizes="192px" className="object-cover object-top" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
