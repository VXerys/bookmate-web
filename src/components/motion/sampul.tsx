"use client";

import { useRef } from "react";

import { jumpToTarget, lockScroll, unlockScroll } from "@/components/motion/smooth-scroll";
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
    const counting = gsap.to(progress, { value: 90, duration: SAMPUL_OPEN_MAX_MS / 1000, ease: "power2.out", onUpdate: renderCount });

    pageSettled().then(() => {
      if (cancelled) return;
      counting.kill();
      const lead = SAMPUL_LEAD_MS / 1000;
      gsap
        .timeline({ defaults: { ease: "expo.inOut" }, onComplete: end })
        .to(progress, { value: 100, duration: lead * 0.6, ease: "power2.out", onUpdate: renderCount }, 0)
        .to(q("[data-sampul-counter]"), { autoAlpha: 0, y: -8, duration: lead * 0.4, ease: "power3.in" }, lead * 0.6)
        .addLabel("open", lead)
        // The cover swings open on its spine while the book slides right, so the open spread ends up centred.
        .to(q("[data-sampul-cover]"), { rotateY: -168, duration: 1.3, ease: "power3.inOut" }, "open")
        .to(q("[data-sampul-book]"), { xPercent: 50, duration: 1.3, ease: "power3.inOut" }, "open")
        .from(q("[data-sampul-line]"), { autoAlpha: 0, y: 12, stagger: 0.12, duration: 0.6, ease: "power3.out" }, "open+=0.55")
        // Then the reader leans into the first page: it fills the screen and fades into the hero.
        .to(q("[data-sampul-book]"), { scale: 5, duration: 0.9, ease: "power3.in" }, "open+=1.35")
        .to(el, { autoAlpha: 0, duration: 0.45, ease: "power1.in" }, "open+=1.75")
        .call(completeIntro, [], `open+=${SAMPUL_INTRO_AFTER_OPEN_MS / 1000 + 1.2}`);
    });

    // Releases only what this run holds, so a remount (React Strict Mode in development) replays the sampul cleanly.
    return () => {
      cancelled = true;
      window.clearTimeout(safety);
      unlockScroll("sampul");
    };
  });

  return (
    <div ref={root} className="sampul fixed inset-0 z-[90] bg-sky [perspective:1800px]" aria-hidden="true">
      <div className="absolute inset-0 flex items-center justify-center">
        <div data-sampul-book className="relative aspect-[3/4] w-[min(58vw,320px)] [transform-style:preserve-3d]">
          {/* The first page under the cover, written in a club member's hand. */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-r-xl border-[3px] border-ink bg-paper px-5 text-center text-ink shadow-[12px_16px_0_-2px_var(--color-ink)]">
            <p data-sampul-line className="hand text-[clamp(1.6rem,6vw,2.4rem)] -rotate-2">{shell.sampul.kicker}</p>
            <p data-sampul-line className="display mt-2 text-[clamp(2.2rem,8vw,3.4rem)]">{site.name}</p>
          </div>
          <div data-sampul-cover className="absolute inset-0 origin-left [transform-style:preserve-3d]">
            <div className="absolute inset-0 overflow-hidden rounded-r-xl border-[3px] border-ink bg-blue text-paper [backface-visibility:hidden]">
              <svg viewBox="0 0 120 160" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-25" aria-hidden="true">
                {Array.from({ length: 7 }, (_, i) => (
                  <path key={i} d={`M0 ${16 + i * 22} C30 ${6 + i * 22} 60 ${26 + i * 22} 120 ${12 + i * 22}`} fill="none" stroke="var(--color-paper)" strokeWidth="4" />
                ))}
              </svg>
              <span className="absolute inset-y-0 left-0 w-4 bg-ink/25" />
              <div className="relative flex h-full flex-col justify-between p-6 pl-8">
                <Sparkle data-draw={undefined} className="sampul-rise size-12 text-highlight" />
                <p className="display sampul-rise text-[clamp(2.6rem,9vw,4rem)] text-paper" style={{ animationDelay: "0.12s" }}>
                  {site.name}
                </p>
                <p data-sampul-counter className="label sampul-rise text-paper" style={{ animationDelay: "0.24s" }}>
                  <span ref={counter}>001</span> / 100 {shell.sampul.counterUnit}
                </p>
              </div>
            </div>
            {/* The inside of the cover: an endpaper, seen once the book is open. */}
            <div className="absolute inset-0 overflow-hidden rounded-l-xl border-[3px] border-ink bg-sky [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <svg viewBox="0 0 120 160" className="absolute inset-0 h-full w-full" aria-hidden="true">
                {Array.from({ length: 48 }, (_, i) => (
                  <circle key={i} cx={10 + (i % 6) * 20} cy={10 + Math.floor(i / 6) * 20} r="2.5" fill="var(--color-blue)" opacity="0.5" />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
