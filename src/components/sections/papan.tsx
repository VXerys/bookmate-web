"use client";

import { useRef } from "react";

import { Tape } from "@/components/art/doodles";
import { papan } from "@/content/story";
import { EASE_OUT, gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";

type NoteId = (typeof papan.notes)[number]["id"];

// Literal looks per note: paper colour, tilt, and where it sits on the board (wide screens).
const LOOK: Record<NoteId, string> = {
  thread: "bg-paper -rotate-2 lg:mt-0",
  polling: "bg-highlight rotate-2 lg:mt-16",
  reaksi: "bg-sky rotate-1 lg:-mt-6",
  chat: "bg-peach -rotate-3 lg:mt-10",
};

const stroke = { fill: "none", stroke: "var(--color-ink)", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

// Small drawings inside each note; decorative, the note text carries the meaning.
function NoteArt({ id }: { id: NoteId }) {
  if (id === "thread") {
    return (
      <svg viewBox="0 0 200 90" className="w-full" aria-hidden="true">
        {[0, 1, 2].map((row) => (
          <g key={row} transform={`translate(${row ? 22 : 0} ${row * 30})`}>
            <circle cx="12" cy="14" r="9" {...stroke} fill={["var(--color-ember)", "var(--color-blue)", "var(--color-plum)"][row]} strokeWidth={2.5} />
            <path {...stroke} strokeWidth={2.5} d={`M30 10 H${150 - row * 26}`} />
            <path {...stroke} strokeWidth={2.5} strokeOpacity={0.4} d={`M30 20 H${110 - row * 16}`} />
          </g>
        ))}
      </svg>
    );
  }
  if (id === "polling") {
    return (
      <div className="flex flex-col gap-2" aria-hidden="true">
        {papan.pollExample.options.map((option, index) => (
          <div key={option} className="flex items-center gap-3">
            <span className="w-20 text-sm font-medium">{option}</span>
            <span className="relative h-4 flex-1 overflow-hidden rounded-full border-2 border-ink bg-paper">
              <span data-poll-bar className="absolute inset-y-0 left-0 rounded-full bg-blue" style={{ width: `${[64, 42, 22][index]}%` }} />
            </span>
          </div>
        ))}
        <span className="label self-end">{papan.pollExample.label}</span>
      </div>
    );
  }
  if (id === "reaksi") {
    return (
      <div className="flex gap-3" aria-hidden="true">
        {[
          { fill: "var(--color-highlight)", face: "M14 22 c4 5 12 5 16 0" },
          { fill: "var(--color-ember)", face: "M14 26 c4 -4 12 -4 16 0" },
          { fill: "var(--color-paper)", face: "M13 23 h18" },
        ].map((sticker, index) => (
          <svg key={index} data-sticker viewBox="0 0 44 44" className="size-14">
            <circle cx="22" cy="22" r="19" {...stroke} fill={sticker.fill} />
            <circle cx="16" cy="17" r="2.2" fill="var(--color-ink)" />
            <circle cx="28" cy="17" r="2.2" fill="var(--color-ink)" />
            <path {...stroke} strokeWidth={2.5} d={sticker.face} />
          </svg>
        ))}
      </div>
    );
  }
  return (
    <svg viewBox="0 0 200 92" className="w-full" aria-hidden="true">
      <path {...stroke} fill="var(--color-paper)" d="M8 8 h120 a10 10 0 0 1 10 10 v20 a10 10 0 0 1 -10 10 h-96 l-14 12 v-12 h-10 a10 10 0 0 1 -10 -10 v-20 a10 10 0 0 1 10 -10 Z" />
      <path {...stroke} fill="var(--color-blue)" d="M70 50 h112 a10 10 0 0 1 10 10 v14 a10 10 0 0 1 -10 10 h-6 v10 l-14 -10 h-92 a10 10 0 0 1 -10 -10 v-14 a10 10 0 0 1 10 -10 Z" />
    </svg>
  );
}

// The community as a board of taped notes (F-012 FR-004): notes fly in from around the board and stick as the
// visitor scrolls, the poll fills, reactions pop, and a ribbon of features runs underneath at scroll speed.
export function Papan() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const notes = gsap.utils.toArray<HTMLElement>("[data-board-note]", section);
      const row = section.querySelector<HTMLElement>("[data-marquee-row]");
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const scatter = [
          { x: -220, y: 160, rotation: -24 },
          { x: 180, y: 220, rotation: 20 },
          { x: -160, y: 260, rotation: 16 },
          { x: 240, y: 200, rotation: -18 },
        ];
        gsap.fromTo(
          notes,
          { x: (i: number) => scatter[i % 4].x, y: (i: number) => scatter[i % 4].y, rotation: (i: number) => scatter[i % 4].rotation, autoAlpha: 0 },
          {
            x: 0,
            y: 0,
            rotation: 0,
            autoAlpha: 1,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: { trigger: "[data-board]", start: "top 90%", end: "top 30%", scrub: 0.8 },
          },
        );
        gsap
          .timeline({ scrollTrigger: { trigger: "[data-board]", start: "top 40%", once: true } })
          .from("[data-poll-bar]", { scaleX: 0, transformOrigin: "0% 50%", duration: 1, ease: EASE_OUT, stagger: 0.12 })
          .from("[data-sticker]", { scale: 0, rotation: -30, duration: 0.6, ease: EASE_OUT, stagger: 0.1 }, 0.2);

        if (!row) return;
        // The ribbon speeds up with scroll velocity, eases back to its resting pace, and rests outside the viewport.
        const loop = gsap.to(row, { xPercent: -50, duration: 28, ease: "none", repeat: -1, paused: true });
        const visibility = ScrollTrigger.create({
          trigger: row,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
          onUpdate: (self) => {
            const boost = Math.min(Math.abs(self.getVelocity()) / 300, 4);
            gsap
              .timeline()
              .to(loop, { timeScale: 1 + boost, duration: 0.25, ease: "power2.out", overwrite: true })
              .to(loop, { timeScale: 1, duration: 1.2, ease: "power2.inOut" });
          },
        });
        return () => {
          visibility.kill();
          loop.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="papan" data-chapter="papan" className="relative overflow-hidden bg-blue pt-24 pb-16 text-ink">
      <div className="flex max-w-4xl flex-col gap-4 px-4 md:px-10">
        <h2 className="label">{papan.kicker}</h2>
        <p className="statement">{papan.statement}</p>
      </div>
      <ul data-board className="mt-14 grid gap-10 px-6 sm:grid-cols-2 md:px-14 lg:grid-cols-4 lg:gap-8">
        {papan.notes.map((note) => (
          <li key={note.id} data-board-note className={`relative flex min-h-80 flex-col gap-4 rounded-sm border-[2.5px] border-ink p-6 pt-9 shadow-[6px_8px_0_var(--color-ink)] ${LOOK[note.id]}`}>
            <Tape className="absolute -top-3.5 left-1/2 w-24 -translate-x-1/2 rotate-2" />
            <h3 className="font-display text-3xl font-bold tracking-tight">{note.title}</h3>
            <p>{note.body}</p>
            <div className="mt-auto">
              <NoteArt id={note.id} />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-20 -rotate-2 border-y-[3px] border-ink bg-highlight py-3" aria-hidden="true">
        <div className="flex overflow-hidden whitespace-nowrap">
          <div data-marquee-row className="flex shrink-0">
            {[0, 1].map((copy) =>
              papan.marquee.map((word) => (
                <span key={`${copy}-${word}`} className="display px-6 text-[clamp(2.25rem,5vw,4.5rem)]">
                  {word} <span className="font-serif italic">✶</span>
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
