"use client";

import { useRef } from "react";

import { jumpToTarget, lockScroll, unlockScroll } from "@/components/motion/smooth-scroll";
import { LogoMark } from "@/components/site/logo";
import { shell } from "@/content/shell";
import { site } from "@/content/site";
import { SAMPUL_SESSION_KEY } from "@/lib/motion/boot-script";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { finishIntro, isIntroDone } from "@/lib/motion/intro-state";
import { SAMPUL_INTRO_AFTER_OPEN_MS, SAMPUL_LEAD_MS, SAMPUL_OPEN_MAX_MS, SAMPUL_REPLAY_OPEN_MAX_MS, SAMPUL_SAFETY_MS, settleWaits } from "@/lib/motion/sampul-timing";

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
  const counter = useRef<HTMLSpanElement>(null);

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
    const progress = { value: 1 };
    const renderCount = () => {
      if (counter.current) counter.current.textContent = String(Math.round(progress.value)).padStart(3, "0");
    };
    const pop = gsap.fromTo(q("[data-sampul-logo]"), { scale: 0, rotate: -64 }, { scale: 1, rotate: 0, duration: 0.65, delay: 0.1, ease: "elastic.out(1, 0.72)" });
    const counting = gsap.to(progress, { value: 90, duration: (replay ? SAMPUL_REPLAY_OPEN_MAX_MS : SAMPUL_OPEN_MAX_MS) / 1000, ease: "power2.out", onUpdate: renderCount });

    pageSettled(replay).then(() => {
      if (cancelled) return;
      counting.kill();
      const lead = SAMPUL_LEAD_MS / 1000;
      gsap
        .timeline({ defaults: { ease: "expo.inOut" }, onComplete: end })
        .to(progress, { value: 100, duration: lead * 0.6, ease: "power2.out", onUpdate: renderCount }, 0)
        .to(q("[data-sampul-mark]"), { scale: 0.9, autoAlpha: 0, duration: lead * 0.5, ease: "power2.in" }, lead * 0.5)
        .addLabel("open", lead)
        // The reference's page transition: one enormous scribble covers the screen, the blue goes, and the scribble
        // erases itself from its start to reveal the page (F-013 AC-011).
        .fromTo(q("[data-sampul-brush]"), { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 0.9, ease: "power2.inOut" }, "open")
        .set(q("[data-sampul-cover]"), { autoAlpha: 0 }, "open+=0.95")
        .to(q("[data-sampul-brush]"), { drawSVG: "100% 100%", duration: 1, ease: "osmo" }, "open+=1")
        .set(el, { autoAlpha: 0 }, "open+=2")
        .call(completeIntro, [], `open+=${SAMPUL_INTRO_AFTER_OPEN_MS / 1000 + 0.75}`);
    });

    // Releases only what this run holds, so a remount (React Strict Mode in development) replays the sampul cleanly.
    return () => {
      cancelled = true;
      pop.kill();
      window.clearTimeout(safety);
      unlockScroll("sampul");
    };
  });

  return (
    <div ref={root} className="sampul fixed inset-0 z-[90] overflow-hidden text-paper" aria-hidden="true">
      <div data-sampul-cover className="absolute inset-0 bg-blue" />
      <div data-sampul-mark className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <span data-sampul-logo className="grid size-28 place-items-center rounded-full bg-paper">
          <LogoMark className="w-14 text-blue" />
        </span>
        <p className="display sampul-rise text-[clamp(3rem,9vw,6.5rem)]" style={{ animationDelay: "0.12s" }}>
          {site.name}
        </p>
        <p className="label sampul-rise" style={{ animationDelay: "0.24s" }}>
          <span ref={counter}>001</span> / 100 {shell.sampul.counterUnit}
        </p>
      </div>
      <svg viewBox="0 0 1080 1080" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <path
          data-sampul-brush
          d="M-80 170C230-30 470 250 330 430S760 90 930 350 230 660 390 840 960 760 1160 1010"
          fill="none"
          stroke="var(--color-highlight)"
          strokeWidth="70%"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: "0 99999" }}
        />
      </svg>
    </div>
  );
}
