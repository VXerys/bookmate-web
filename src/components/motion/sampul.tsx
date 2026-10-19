"use client";

import { useRef } from "react";

import { jumpToTarget, lockScroll, unlockScroll } from "@/components/motion/smooth-scroll";
import { LogoMark } from "@/components/site/logo";
import { SAMPUL_SESSION_KEY } from "@/lib/motion/boot-script";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { finishIntro, isIntroDone } from "@/lib/motion/intro-state";
import { SAMPUL_LEAD_MS, SAMPUL_OPEN_MAX_MS, SAMPUL_REPLAY_OPEN_MAX_MS, SAMPUL_SAFETY_MS, settleWaits } from "@/lib/motion/sampul-timing";

// The cover is three scribbles (after the reference's page transition, original paths): a giant blue stroke 70% of the
// box wide that paints the whole screen, a lighter blue stroke over it, and a slim yellow ribbon that draws itself as
// the loading progress. Blue leads, yellow is the accent; there is no flat backdrop at all.
const SCRIBBLE = "M-80 170C230-30 470 250 330 430S760 90 930 350 230 660 390 840 960 760 1160 1010";
const SCRIBBLE_LIGHT = "M1160 120C860 -20 640 260 760 420S280 240 160 470 820 600 700 820 120 760 -80 1000";
const RIBBON = "M-60 300C180 140 420 420 600 300S900 160 1140 320";
const LIGHT = "color-mix(in srgb, var(--color-blue) 60%, var(--color-white))";

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
    // Slows the timeline through long frames instead of skipping ahead; Lenis turns lag smoothing off after the intro.
    gsap.ticker.lagSmoothing(500, 33);

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
    const span = (replay ? SAMPUL_REPLAY_OPEN_MAX_MS : SAMPUL_OPEN_MAX_MS) / 1000;
    // The logo springs in (reference: scale 0, rotate -64 -> 1, 0, elastic) while the yellow ribbon draws itself as the
    // loading progress; there is no number counter (owner, F-014).
    const pop = gsap.fromTo(q("[data-sampul-logo]"), { scale: 0, rotate: -64 }, { scale: 1, rotate: 0, duration: 0.85, delay: 0.1, ease: "elastic.out(1, 0.72)" });
    const counting = gsap
      .timeline()
      .fromTo(q("[data-sampul-ribbon]"), { drawSVG: "0%" }, { drawSVG: "90%", duration: span, ease: "power2.out" }, 0);

    pageSettled(replay).then(() => {
      if (cancelled) return;
      counting.kill();
      const lead = SAMPUL_LEAD_MS / 1000;
      const strokes = q("[data-sampul-brush]");
      // One continuous move: the ribbon finishes drawing, and as it does the logo eases up and away, the three layers
      // erase in a single overlapping sweep from the top layer down (yellow, light blue, blue) while each stroke narrows
      // to 8% (reference: 0% 100% -> 100% 100%), and the hero starts landing while the sweep is still passing.
      gsap
        .timeline({ onComplete: end, defaults: { ease: "power3.inOut" } })
        .to(q("[data-sampul-ribbon]"), { drawSVG: "100%", duration: lead * 0.5, ease: "power2.out" }, 0)
        .addLabel("open", lead * 0.55)
        .to(q("[data-sampul-logo]"), { yPercent: -40, scale: 0.6, rotate: 18, autoAlpha: 0, duration: 0.55, ease: "power3.in" }, "open-=0.15")
        .to(q("[data-sampul-ribbon]"), { drawSVG: "100% 100%", duration: 0.9 }, "open")
        .fromTo(strokes, { drawSVG: "0% 100%" }, { drawSVG: "100% 100%", duration: 1.3, stagger: { each: 0.09, from: "end" } }, "open+=0.08")
        .to(strokes, { keyframes: { "0%": { attr: { "stroke-width": (i: number) => (i ? "30%" : "70%") } }, "95%": { attr: { "stroke-width": "8%" } } }, duration: 1.3, ease: "circ.out", stagger: { each: 0.09, from: "end" } }, "open+=0.08")
        .call(completeIntro, [], "open+=0.45")
        .set(el, { autoAlpha: 0 }, "open+=1.5");
    });

    // Releases only what this run holds, so a remount (React Strict Mode in development) replays the sampul cleanly.
    return () => {
      cancelled = true;
      pop.kill();
      counting.kill();
      window.clearTimeout(safety);
      unlockScroll("sampul");
    };
  });

  return (
    <div ref={root} className="sampul fixed inset-0 z-[90] overflow-hidden" aria-hidden="true">
      {/* The two blue strokes are fully drawn by default, so before hydration they already cover the screen; the yellow
          ribbon starts undrawn. Later paths paint on top: blue, then light blue, then yellow. */}
      <svg viewBox="0 0 1080 1080" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <path data-sampul-brush d={SCRIBBLE} fill="none" stroke="var(--color-blue)" strokeWidth="70%" strokeLinecap="round" strokeLinejoin="round" />
        <path data-sampul-brush d={SCRIBBLE_LIGHT} fill="none" stroke={LIGHT} strokeWidth="30%" strokeLinecap="round" strokeLinejoin="round" />
        <path data-sampul-ribbon d={RIBBON} fill="none" stroke="var(--color-highlight)" strokeWidth="9%" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: "0 99999" }} />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span data-sampul-logo className="block drop-shadow-[0_18px_30px_rgb(3_4_10/0.35)]">
          <LogoMark className="w-[clamp(5.5rem,10vw,8.5rem)] text-white" />
        </span>
      </div>
    </div>
  );
}
