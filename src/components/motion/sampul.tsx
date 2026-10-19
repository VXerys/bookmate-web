"use client";

import { useRef } from "react";

import { jumpToTarget, lockScroll, unlockScroll } from "@/components/motion/smooth-scroll";
import { Book3D } from "@/components/art/book3d";
import { Sparkle } from "@/components/art/doodles";
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
    const spin = gsap.to(q("[data-sampul-book] .book3d-box"), { rotationY: "+=360", duration: 5, ease: "none", repeat: -1 });
    const counting = gsap.to(progress, { value: 90, duration: SAMPUL_OPEN_MAX_MS / 1000, ease: "power2.out", onUpdate: renderCount });

    pageSettled().then(() => {
      if (cancelled) return;
      counting.kill();
      const lead = SAMPUL_LEAD_MS / 1000;
      gsap
        .timeline({ defaults: { ease: "expo.inOut" }, onComplete: end })
        .to(progress, { value: 100, duration: lead * 0.6, ease: "power2.out", onUpdate: renderCount }, 0)
        .to(q("[data-sampul-mark]"), { y: -24, autoAlpha: 0, duration: lead * 0.5, ease: "power3.in" }, lead * 0.5)
        .addLabel("open", lead)
        // One fat highlighter stroke sweeps the screen yellow; the hero underneath is the same yellow, so lifting
        // the cover afterwards is seamless (F-012 AC-011).
        .fromTo(q("[data-sampul-brush]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.15, ease: "power2.inOut" }, "open")
        .set(el, { autoAlpha: 0 }, "open+=1.2")
        .call(completeIntro, [], `open+=${SAMPUL_INTRO_AFTER_OPEN_MS / 1000 + 0.7}`);
    });

    // Releases only what this run holds, so a remount (React Strict Mode in development) replays the sampul cleanly.
    return () => {
      cancelled = true;
      spin.kill();
      window.clearTimeout(safety);
      unlockScroll("sampul");
    };
  });

  return (
    <div ref={root} className="sampul fixed inset-0 z-[90] overflow-hidden bg-blue text-paper" aria-hidden="true">
      <div data-sampul-mark className="absolute inset-0 flex flex-col items-center justify-center gap-8">
        <div data-sampul-book className="sampul-rise text-[clamp(9px,1.6vw,14px)]">
          <Book3D tone="highlight" pattern="waves" id="sampul" pose="rotateX(10deg) rotateY(-24deg)" />
        </div>
        <p className="display sampul-rise text-[clamp(3rem,9vw,7rem)]" style={{ animationDelay: "0.12s" }}>
          {site.name}
        </p>
        <p className="label sampul-rise flex items-center gap-3" style={{ animationDelay: "0.24s" }}>
          <Sparkle data-draw={undefined} className="size-6 text-highlight" />
          <span>
            <span ref={counter}>001</span> / 100 {shell.sampul.counterUnit}
          </span>
        </p>
      </div>
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <path
          data-sampul-brush
          d="M-220 80 C260 -60 700 260 1220 120 C700 300 260 360 -220 520 C300 560 760 620 1220 640 C700 760 300 860 -220 1080"
          fill="none"
          stroke="var(--color-highlight)"
          strokeWidth="420"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: "0 99999" }}
        />
      </svg>
    </div>
  );
}
