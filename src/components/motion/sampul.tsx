"use client";

import { useRef } from "react";

import { jumpToTarget, lockScroll, unlockScroll } from "@/components/motion/smooth-scroll";
import { LogoMark } from "@/components/site/logo";
import { site } from "@/content/site";
import { SAMPUL_SESSION_KEY } from "@/lib/motion/boot-script";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { finishIntro, isIntroDone } from "@/lib/motion/intro-state";
import { SAMPUL_OPEN_MIN_MS, SAMPUL_REPLAY_OPEN_MIN_MS, SAMPUL_SAFETY_MS, settleWaits } from "@/lib/motion/sampul-timing";

// The cover (after the reference's page transition, original paths): one giant blue scribble 70% of the box wide that
// paints the whole screen, and a slim yellow ribbon that draws itself while the logo holds the centre. Only one large
// stroke is ever redrawn, and its width is never animated, so the sweep stays smooth. Butt caps keep its leaving end
// a clean diagonal instead of a giant round blob (owner: nothing round).
const SCRIBBLE = "M-80 170C230-30 470 250 330 430S760 90 930 350 230 660 390 840 960 760 1160 1010";
// Sits just under the wordmark, inside the band a 16:9 screen keeps visible.
const RIBBON = "M-60 700C220 600 420 760 640 670S960 600 1140 660";

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

// Resolves once fonts and the load event are in and the opening window has started, or when the window closes.
function pageSettled(replay: boolean) {
  const { min, max } = settleWaits(performance.now(), replay);
  const fonts = document.fonts?.ready.then(() => undefined) ?? Promise.resolve();
  const loaded =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true }));
  return Promise.race([Promise.all([fonts, loaded, wait(min)]), wait(max)]);
}

// The one place that declares the intro finished (F-002 system architecture): it tells the boot fallback to keep
// html.js, re-measures triggers against final fonts, and releases everything waiting on whenIntroDone.
export function completeIntro() {
  if (isIntroDone()) return;
  document.documentElement.dataset.intro = "done";
  ScrollTrigger.refresh();
  finishIntro();
}

// A hash in the URL (EC-003) is honoured once the intro has settled, as a plain jump without the slice transition.
function jumpToHash() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  const target = id ? document.getElementById(id) : null;
  if (target) jumpToTarget(target);
}

function rememberSampul() {
  try {
    window.sessionStorage.setItem(SAMPUL_SESSION_KEY, "1");
  } catch {
    // Blocked storage only means the sampul plays again on the next load (EC-004).
  }
}

export function Sampul() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = root.current;
    // CSS shows the cover only under html.js, data-sampul="play", and motion allowed, so its display is the single
    // answer to "does it play"; every other path finishes the intro as soon as fonts have settled.
    if (!el || getComputedStyle(el).display === "none") {
      let cancelled = false;
      (document.fonts?.ready ?? Promise.resolve()).then(() => {
        if (cancelled) return;
        completeIntro();
        jumpToHash();
      });
      return () => {
        cancelled = true;
      };
    }

    const replay = document.documentElement.dataset.sampul === "replay";
    window.scrollTo(0, 0);
    lockScroll("sampul");

    let ended = false;
    let cancelled = false;
    const end = () => {
      if (ended) return;
      ended = true;
      window.clearTimeout(safety);
      completeIntro();
      rememberSampul();
      // Leaving "play" hides the cover through CSS, so no inline style is left behind.
      document.documentElement.dataset.sampul = "done";
      unlockScroll("sampul");
      jumpToHash();
    };
    // setTimeout, not the GSAP ticker, so a stalled ticker in a hidden tab still opens the page (EC-002).
    const safety = window.setTimeout(end, SAMPUL_SAFETY_MS);

    const q = gsap.utils.selector(el);
    const hold = (replay ? SAMPUL_REPLAY_OPEN_MIN_MS : SAMPUL_OPEN_MIN_MS) / 1000;
    // While the page loads underneath, the logo and wordmark rest in the centre (CSS raised them before hydration) and
    // the yellow ribbon draws itself across the hold.
    const drawing = gsap.fromTo(q("[data-sampul-ribbon]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: hold, ease: "power1.inOut" });

    pageSettled(replay).then(() => {
      if (cancelled) return;
      drawing.progress(1).kill();
      // The exit starts on a fresh frame after loading, then runs as one move: the mark lifts away, the ribbon and the
      // scribble erase from their start (reference: 0% 100% -> 100% 100%), and the hero lands while the sweep passes.
      window.requestAnimationFrame(() => {
        if (cancelled) return;
        gsap
          .timeline({ onComplete: end, defaults: { ease: "power2.inOut" } })
          .to(q("[data-sampul-mark]"), { yPercent: -60, autoAlpha: 0, duration: 0.6, ease: "power3.in" }, 0)
          .to(q("[data-sampul-ribbon]"), { drawSVG: "100% 100%", duration: 0.8 }, 0.1)
          .fromTo(q("[data-sampul-brush]"), { drawSVG: "0% 100%" }, { drawSVG: "100% 100%", duration: 1.2 }, 0.25)
          .call(completeIntro, [], 0.7)
          .set(el, { autoAlpha: 0 }, 1.5);
      });
    });

    // Releases only what this run holds, so a remount (React Strict Mode in development) replays the sampul cleanly.
    return () => {
      cancelled = true;
      drawing.kill();
      window.clearTimeout(safety);
      unlockScroll("sampul");
    };
  });

  return (
    <div ref={root} className="sampul fixed inset-0 z-[90] overflow-hidden" aria-hidden="true">
      {/* The scribble is fully drawn by default, so before hydration it already covers the screen. */}
      <svg viewBox="0 0 1080 1080" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <path data-sampul-brush d={SCRIBBLE} fill="none" stroke="var(--color-blue)" strokeWidth="70%" strokeLinecap="butt" strokeLinejoin="round" />
        <path data-sampul-ribbon d={RIBBON} fill="none" stroke="var(--color-highlight)" strokeWidth="5%" strokeLinecap="round" style={{ strokeDasharray: "0 99999" }} />
      </svg>
      <div data-sampul-mark className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <span className="sampul-rise block">
          <LogoMark className="w-[clamp(4.5rem,7vw,6rem)] text-white" />
        </span>
        <p className="display flex overflow-hidden pb-[0.08em] text-[clamp(2.75rem,6vw,5rem)] text-white">
          {[...site.name].map((letter, index) => (
            <span key={`${letter}-${index}`} className="sampul-rise inline-block" style={{ animationDelay: `${0.15 + index * 0.045}s` }}>
              {letter}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
