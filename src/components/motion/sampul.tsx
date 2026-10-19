"use client";

import { useRef } from "react";

import { jumpToTarget, lockScroll, unlockScroll } from "@/components/motion/smooth-scroll";
import { shell } from "@/content/shell";
import { site } from "@/content/site";
import { SAMPUL_SESSION_KEY } from "@/lib/motion/boot-script";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { finishIntro, isIntroDone } from "@/lib/motion/intro-state";
import { SAMPUL_INTRO_AFTER_OPEN_MS, SAMPUL_LEAD_MS, SAMPUL_OPEN_MAX_MS, SAMPUL_SAFETY_MS, settleWaits } from "@/lib/motion/sampul-timing";

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

// Resolves once fonts and the load event are in and the opening window has started, or when the window closes.
function pageSettled() {
  const { min, max } = settleWaits(performance.now());
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
    const counting = gsap.to(progress, { value: 90, duration: SAMPUL_OPEN_MAX_MS / 1000, ease: "power2.out", onUpdate: renderCount });

    pageSettled().then(() => {
      if (cancelled) return;
      counting.kill();
      const lead = SAMPUL_LEAD_MS / 1000;
      gsap
        .timeline({ defaults: { ease: "expo.inOut" }, onComplete: end })
        .to(progress, { value: 100, duration: lead * 0.6, ease: "power2.out", onUpdate: renderCount }, 0)
        .to(q("[data-sampul-text]"), { yPercent: -18, autoAlpha: 0, duration: lead * 0.5, ease: "power3.in" }, lead * 0.5)
        .addLabel("open", lead)
        .to(q("[data-sampul-spine]"), { scaleY: 0, duration: 0.5, ease: "power2.in" }, "open")
        .to(q("[data-sampul-left]"), { xPercent: -100, rotateY: 14, duration: 1.2 }, "open")
        .to(q("[data-sampul-right]"), { xPercent: 100, rotateY: -14, duration: 1.2 }, "open")
        .call(completeIntro, [], `open+=${SAMPUL_INTRO_AFTER_OPEN_MS / 1000}`);
    });

    // Releases only what this run holds, so a remount (React Strict Mode in development) replays the sampul cleanly.
    return () => {
      cancelled = true;
      window.clearTimeout(safety);
      unlockScroll("sampul");
    };
  });

  return (
    <div ref={root} className="sampul fixed inset-0 z-[90] [perspective:1600px]" aria-hidden="true">
      <div data-sampul-left className="absolute inset-y-0 left-0 w-1/2 origin-left bg-ink" />
      <div data-sampul-right className="absolute inset-y-0 right-0 w-1/2 origin-right bg-ink" />
      <div data-sampul-spine className="absolute inset-y-[12%] left-1/2 w-px -translate-x-1/2 bg-paper/20" />
      <div data-sampul-text className="relative flex h-full flex-col items-center justify-center gap-6 px-4 text-center text-paper">
        <p className="label sampul-rise text-peach">{shell.sampul.kicker}</p>
        <p className="display sampul-rise italic" style={{ animationDelay: "0.12s" }}>
          {site.name}
        </p>
        <p className="label sampul-rise text-peach" style={{ animationDelay: "0.24s" }}>
          <span ref={counter}>001</span> / 100 {shell.sampul.counterUnit}
        </p>
      </div>
    </div>
  );
}
