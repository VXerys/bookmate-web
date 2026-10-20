"use client";

import { useEffect, useRef } from "react";

import { jumpToTarget, lockScroll, unlockScroll } from "@/components/motion/smooth-scroll";
import { chapterNumber, chapters } from "@/content/navigation";
import { sliceTargetId } from "@/lib/motion/in-page-link";
import { LogoMark } from "@/components/site/logo";
import { gsap, LAND, MOTION_OK, ScrollTrigger } from "@/lib/motion/gsap";

// Curtain shapes in a 100x100 box stretched over the viewport: a sheet rises from the bottom with a bulging top edge,
// covers the screen, then leaves upward with its bottom edge sagging. Every shape has the same commands, so MorphSVG
// blends them point for point.
const RISE_START = "M0 100 V100 Q50 100 100 100 V100 Z";
const RISE_MID = "M0 100 V55 Q50 5 100 55 V100 Z";
const COVER_FROM_BOTTOM = "M0 100 V0 Q50 0 100 0 V100 Z";
const COVER_FROM_TOP = "M0 0 V100 Q50 100 100 100 V0 Z";
const LEAVE_MID = "M0 0 V45 Q50 95 100 45 V0 Z";
const LEAVE_END = "M0 0 V0 Q50 0 100 0 V0 Z";
// setTimeout, not the ticker: if the ticker stalls (hidden tab) the visitor still lands on the target.
const SLICE_SAFETY_MS = 4000;

let overlay: HTMLDivElement | null = null;
let busy = false;

type NavigateOptions = {
  // Runs while the screen is covered, so the menu (T-006) can close behind the strips.
  onCovered?: () => void;
};

// Focus follows the jump so keyboard and screen reader users continue from the new chapter (AC-010).
function focusSection(section: HTMLElement) {
  const heading = section.querySelector<HTMLElement>("h1, h2") ?? section;
  if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
  heading.focus({ preventScroll: true });
}

function land(section: HTMLElement) {
  jumpToTarget(section);
  ScrollTrigger.update();
  // The URL keeps no hash (owner, F-014): a refresh after a jump should start at the top, not at the last chapter.
  if (window.location.hash) window.history.replaceState(null, "", window.location.pathname + window.location.search);
  focusSection(section);
}

// Holds the cover until the page is quiet again. Measured: after a long jump the destination is rastered for the first
// time and its lazy images load, giving a run of 100 to 350 ms frames for up to a second; those used to fall inside the
// leaving curtain and made it stutter (F-014 smoothness pass). So the curtain watches frame times and leaves once it
// sees QUIET_FRAMES normal frames in a row, never before SETTLE_MIN_MS and never later than SETTLE_MAX_MS: quick for a
// near chapter, a little longer for a far one, and always moving on smooth frames.
const SETTLE_MIN_MS = 300;
const SETTLE_MAX_MS = 1300;
const QUIET_FRAMES = 6;
function settled() {
  return new Promise<void>((resolve) => {
    const start = performance.now();
    let last = start;
    let calm = 0;
    const tick = (now: number) => {
      calm = now - last < 24 ? calm + 1 : 0;
      last = now;
      const waited = now - start;
      if ((waited >= SETTLE_MIN_MS && calm >= QUIET_FRAMES) || waited >= SETTLE_MAX_MS) resolve();
      else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

function labelFor(id: string) {
  const chapter = chapters.find((item) => item.id === id);
  return chapter ? { number: chapterNumber(id), label: chapter.label } : { number: "", label: "" };
}

// Single entry point for travelling between chapters; returns false when there is no such section or a transition
// is already running (AC-011), so callers can leave the click to the browser.
export function navigateTo(id: string, options: NavigateOptions = {}): boolean {
  const section = document.getElementById(id);
  if (!section) return false;
  if (busy) return true;
  busy = true;

  if (!overlay || !window.matchMedia(MOTION_OK).matches) {
    options.onCovered?.();
    land(section);
    busy = false;
    return true;
  }

  const [back, front] = overlay.querySelectorAll<SVGPathElement>("[data-curtain]");
  const number = overlay.querySelector<HTMLElement>("[data-slice-number]");
  const label = overlay.querySelector<HTMLElement>("[data-slice-label]");
  const parts = overlay.querySelectorAll<HTMLElement>("[data-slice-part]");
  const text = labelFor(id);
  if (number) number.textContent = text.number;
  if (label) label.textContent = text.label;
  lockScroll("slice");

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    window.clearTimeout(safety);
    gsap.set(overlay, { autoAlpha: 0 });
    unlockScroll("slice");
    busy = false;
  };
  let landed = false;
  const cover = () => {
    if (landed) return;
    landed = true;
    options.onCovered?.();
    land(section);
  };
  const safety = window.setTimeout(() => {
    cover();
    finish();
  }, SLICE_SAFETY_MS);

  // Yellow leads in and trails out, the blue sheet in front carries the chapter name: the page's two brand colours. The
  // way out waits until the destination has settled under the cover.
  gsap
    .timeline()
    .set(overlay, { autoAlpha: 1 })
    .set([back, front], { morphSVG: RISE_START })
    .to(back, { morphSVG: RISE_MID, duration: 0.28, ease: "power2.in" }, 0)
    .to(back, { morphSVG: COVER_FROM_BOTTOM, duration: 0.3, ease: "power2.out" }, 0.28)
    .to(front, { morphSVG: RISE_MID, duration: 0.28, ease: "power2.in" }, 0.1)
    .to(front, { morphSVG: COVER_FROM_BOTTOM, duration: 0.3, ease: "power2.out" }, 0.38)
    .fromTo(parts, { yPercent: 120, rotate: 6, autoAlpha: 0 }, { yPercent: 0, rotate: 0, autoAlpha: 1, duration: 0.6, ease: LAND, stagger: 0.06 }, 0.45)
    .call(() => {
      cover();
      settled().then(() => {
        gsap
          .timeline({ onComplete: finish })
          .to(parts, { yPercent: -80, autoAlpha: 0, duration: 0.25, ease: "power2.in", stagger: 0.03 }, 0)
          .set([back, front], { morphSVG: COVER_FROM_TOP }, 0.15)
          .to(front, { morphSVG: LEAVE_MID, duration: 0.28, ease: "power2.in" }, 0.15)
          .to(front, { morphSVG: LEAVE_END, duration: 0.3, ease: "power2.out" }, 0.43)
          .to(back, { morphSVG: LEAVE_MID, duration: 0.28, ease: "power2.in" }, 0.25)
          .to(back, { morphSVG: LEAVE_END, duration: 0.3, ease: "power2.out" }, 0.53);
      });
    }, [], 1.05);
  return true;
}

export function SliceTransition() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    overlay = root.current;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a");
      if (!link) return;
      const id = sliceTargetId({
        href: link.getAttribute("href"),
        button: event.button,
        modified: event.metaKey || event.ctrlKey || event.shiftKey || event.altKey,
        sliceOff: link.dataset.slice === "off",
        defaultPrevented: event.defaultPrevented,
      });
      if (id && navigateTo(id)) event.preventDefault();
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      overlay = null;
    };
  }, []);

  return (
    <div ref={root} className="invisible fixed inset-0 z-[80] opacity-0" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path data-curtain d={RISE_START} fill="var(--color-highlight)" />
        <path data-curtain d={RISE_START} fill="var(--color-blue)" />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
        <span data-slice-part className="block">
          <LogoMark className="w-14 text-white" />
        </span>
        <span data-slice-part data-slice-number className="label rounded-full bg-highlight px-4 py-1.5 text-navy" />
        <p data-slice-part data-slice-label className="display text-white" />
      </div>
    </div>
  );
}
