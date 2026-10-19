"use client";

import Image from "next/image";
import { useRef } from "react";

import { CurveText } from "@/components/art/curve-text";
import { HandNote } from "@/components/motion/hand-note";
import { screenImages } from "@/components/site/screen-images";
import { fitur } from "@/content/story";
import { gsap, HOVER_MOTION, LAND, MOTION_OK, useGSAP } from "@/lib/motion/gsap";

const CURVE_MORPH = [
  "M-80 150 C 240 260 460 260 760 130 S 1240 20 1520 200",
  "M-80 220 C 200 60 480 80 740 210 S 1200 290 1520 90",
];

// The feature list as giant words on a blue capsule (F-014, reference "genre" section). Each word fills in from a
// faint outline to solid ink as it crosses the middle of the screen, a highlighter ribbon of feature names bends across
// the top, and on a fine pointer hovering a word floats that feature's screenshot beside the cursor. Every word keeps a
// one-line description below it, so touch and keyboard users read the same facts.
export function Fitur() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-list-word]", section).forEach((word) => {
          gsap.fromTo(
            word,
            { color: "rgb(255 255 255 / 0.2)", xPercent: -3 },
            { color: "rgb(255 255 255 / 1)", xPercent: 0, ease: "none", scrollTrigger: { trigger: word, start: "top 82%", end: "top 48%", scrub: 0.5 } },
          );
        });
        gsap.from("[data-list-body]", { y: 16, autoAlpha: 0, duration: 0.7, ease: LAND, stagger: 0.06, scrollTrigger: { trigger: "[data-list]", start: "top 70%", once: true } });
      });

      mm.add(HOVER_MOTION, () => {
        const preview = section.querySelector<HTMLElement>("[data-preview]");
        const shots = gsap.utils.toArray<HTMLElement>("[data-preview-shot]", section);
        const rows = gsap.utils.toArray<HTMLElement>("[data-list-row]", section);
        if (!preview) return;
        gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0, rotate: -12 });
        const x = gsap.quickTo(preview, "x", { duration: 0.55, ease: "power3" });
        const y = gsap.quickTo(preview, "y", { duration: 0.55, ease: "power3" });
        const pointer = { x: -1, y: -1 };
        let shown = -1;
        const place = (instant: boolean) => {
          const box = section.getBoundingClientRect();
          if (instant) gsap.set(preview, { x: pointer.x - box.left, y: pointer.y - box.top });
          else {
            x(pointer.x - box.left);
            y(pointer.y - box.top);
          }
        };
        const show = (index: number) => {
          if (index === shown) return;
          // Appearing from hidden jumps to the pointer first, so the card never flies in from the section's corner.
          if (shown < 0 && index >= 0) place(true);
          shown = index;
          shots.forEach((shot, i) => gsap.to(shot, { autoAlpha: i === index ? 1 : 0, duration: 0.25, overwrite: true }));
          gsap.to(preview, { scale: index < 0 ? 0 : 1, rotate: index < 0 ? -12 : index % 2 ? 6 : -6, duration: 0.6, ease: index < 0 ? "power3.in" : LAND, overwrite: "auto" });
        };
        // Smooth scrolling moves rows under a still pointer without any pointer event, so the row under the pointer and
        // the card position are re-read every frame while the card is out.
        const follow = () => {
          if (pointer.x < 0) return;
          const row = document.elementFromPoint(pointer.x, pointer.y)?.closest<HTMLElement>("[data-list-row]");
          show(row ? rows.indexOf(row) : -1);
          if (shown >= 0) place(false);
        };
        const onMove = (event: PointerEvent) => {
          pointer.x = event.clientX;
          pointer.y = event.clientY;
        };
        const onLeave = () => {
          pointer.x = -1;
          show(-1);
        };
        gsap.ticker.add(follow);
        section.addEventListener("pointermove", onMove);
        section.addEventListener("pointerleave", onLeave);
        return () => {
          gsap.ticker.remove(follow);
          section.removeEventListener("pointermove", onMove);
          section.removeEventListener("pointerleave", onLeave);
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="bg-white">
      <section ref={root} id="fitur" data-chapter="fitur" className="shape-capsule relative overflow-hidden bg-blue pt-16 pb-28">
        <CurveText id="fitur-curve" text={fitur.curve} tone="highlight" ink="navy" morph={CURVE_MORPH} from="-10%" to="-55%" className="-mt-4 mb-6 h-[clamp(7rem,16vw,14rem)]" />
        <div className="mx-auto flex max-w-[90rem] flex-col items-center gap-3 px-6 text-center lg:px-10">
          <h2 className="statement text-white">{fitur.kicker}</h2>
          <HandNote decorative className="rotate-2 !text-highlight">
            {fitur.note}
          </HandNote>
        </div>
        <ul data-list className="mx-auto mt-12 flex max-w-[90rem] flex-col items-center gap-6 px-6 text-center lg:gap-2 lg:px-10">
          {fitur.items.map((item) => (
            <li key={item.id} data-list-row className="flex flex-col items-center">
              <span data-list-word className="block font-display text-[clamp(2.4rem,7.4vw,7rem)] leading-[0.92] font-extrabold tracking-tight text-white">
                {item.title}
              </span>
              <span data-list-body className="mt-2 rounded-xl bg-white px-3 py-1 text-sm font-bold text-navy lg:text-base">
                {item.body}
              </span>
            </li>
          ))}
        </ul>
        {/* Decorative: the screenshots show what each feature looks like; the words and descriptions carry the meaning. */}
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
