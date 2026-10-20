"use client";

import { useRef } from "react";

import { jumpToTarget, lockScroll, unlockScroll } from "@/components/motion/smooth-scroll";
import { LogoMark } from "@/components/site/logo";
import { site } from "@/content/site";
import { SAMPUL_SESSION_KEY } from "@/lib/motion/boot-script";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { finishIntro, isIntroDone } from "@/lib/motion/intro-state";
import { SAMPUL_SAFETY_MS, settleWaits } from "@/lib/motion/sampul-timing";

// The cover is a wave curtain (after the "Shape Overlays" transition pattern, Codrops): three stacked layers, blue on
// top, a lighter blue and the yellow behind it. Each layer is a solid block moved with a transform (composited, cheap)
// that drags a short strip below it: the strip's top is flat against the block and its lower edge is a wave whose swell
// peaks mid-move and settles while its phase keeps flowing sideways. Only those strips are repainted per frame. The
// layers follow one another on the same wave train, so the edges read as one current that lands on the hero's swells.
const LAYERS = [
  { key: "sun", fill: "var(--color-highlight)", delay: 0.28 },
  { key: "sky", fill: "color-mix(in srgb, var(--color-blue) 55%, var(--color-white))", delay: 0.14 },
  { key: "sea", fill: "var(--color-blue)", delay: 0 },
] as const;
const r2 = (value: number) => Math.round(value * 100) / 100;

// The strip for progress t in a 100x40 box: flat top, wavy bottom. Nine samples joined with Catmull-Rom curves.
function edge(t: number) {
  const amp = 14 * Math.sin(Math.PI * t);
  const phase = t * Math.PI * 1.8;
  const pts = Array.from({ length: 11 }, (_, i) => {
    const x = (i - 1) * 12.5;
    return [x, 18 + amp * Math.sin((x / 100) * Math.PI * 2.4 + phase)] as const;
  });
  let d = `M0 0H100V${r2(pts[9][1])}`;
  for (let i = 9; i > 1; i -= 1) {
    const [p0, p1, p2, p3] = [pts[i + 1], pts[i], pts[i - 1], pts[i - 2]];
    d += ` C${r2(p1[0] + (p2[0] - p0[0]) / 6)} ${r2(p1[1] + (p2[1] - p0[1]) / 6)} ${r2(p2[0] - (p3[0] - p1[0]) / 6)} ${r2(p2[1] - (p3[1] - p1[1]) / 6)} ${r2(p2[0])} ${r2(p2[1])}`;
  }
  return `${d}Z`;
}
const FLAT = "M0 0H100V18H0Z";

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
  // Honoured once, then cleared, so a later refresh opens at the top (owner, F-014).
  if (window.location.hash) window.history.replaceState(null, "", window.location.pathname + window.location.search);
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
    const layers = gsap.utils.toArray<HTMLElement>("[data-sampul-layer]", el);
    const edges = layers.map((layer) => layer.querySelector<SVGPathElement>("path"));
    const states = layers.map(() => ({ t: 0 }));
    // Each layer travels its own height plus its strip, so the wave clears the top of the screen.
    const travel = () => -(window.innerHeight * 1.25);
    const draw = () =>
      layers.forEach((layer, i) => {
        const t = states[i].t;
        layer.style.transform = `translate3d(0, ${r2(travel() * t)}px, 0)`;
        edges[i]?.setAttribute("d", t <= 0 || t >= 1 ? FLAT : edge(t));
      });

    pageSettled(replay).then(() => {
      if (cancelled) return;
      // The exit starts on a fresh frame after loading: the mark drifts up and fades, the layers lift one after another
      // on the same flowing wave (1.7 s each, unhurried but not dragging), and the hero lands as the last one clears.
      window.requestAnimationFrame(() => {
        if (cancelled) return;
        const tl = gsap.timeline({ onComplete: end, onUpdate: draw });
        tl.to(q("[data-sampul-mark]"), { yPercent: -45, autoAlpha: 0, duration: 0.7, ease: "power2.in" }, 0);
        // DOM order is sun, sky, sea (sea paints on top); the sea leaves first.
        LAYERS.forEach((layer, i) => tl.to(states[i], { t: 1, duration: 1.7, ease: "power2.inOut" }, 0.25 + layer.delay));
        tl.call(completeIntro, [], 1.35).set(el, { autoAlpha: 0 }, 2.3);
      });
    });

    // Releases only what this run holds, so a remount (React Strict Mode in development) replays the sampul cleanly.
    return () => {
      cancelled = true;
      window.clearTimeout(safety);
      unlockScroll("sampul");
    };
  });

  return (
    <div ref={root} className="sampul fixed inset-0 z-[90] overflow-hidden" aria-hidden="true">
      {/* Every layer starts as a full cover, so before hydration the screen is already blue. */}
      {LAYERS.map((layer) => (
        <div key={layer.key} data-sampul-layer className="absolute inset-0 will-change-transform" style={{ background: layer.fill }}>
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-x-0 top-full -mt-px h-[25vh] w-full">
            <path d={FLAT} style={{ fill: layer.fill }} />
          </svg>
        </div>
      ))}
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
