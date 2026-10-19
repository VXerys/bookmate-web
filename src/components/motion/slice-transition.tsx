"use client";

import { useEffect, useRef } from "react";

import { jumpToTarget, lockScroll, unlockScroll } from "@/components/motion/smooth-scroll";
import { chapterNumber, chapters } from "@/content/navigation";
import { sliceTargetId } from "@/lib/motion/in-page-link";
import { gsap, MOTION_OK, ScrollTrigger } from "@/lib/motion/gsap";

const STRIPS = 5;
// setTimeout, not the ticker: if the ticker stalls (hidden tab) the visitor still lands on the target.
const SLICE_SAFETY_MS = 3000;

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
  // pushState instead of location.hash, so the browser does not run its own second jump (AC-010).
  if (window.location.hash !== `#${section.id}`) window.history.pushState(null, "", `#${section.id}`);
  focusSection(section);
}

function labelFor(id: string) {
  const chapter = chapters.find((item) => item.id === id);
  return chapter ? `${chapterNumber(id)} — ${chapter.label}` : "";
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

  const strips = overlay.querySelectorAll<HTMLElement>("[data-slice-strip]");
  const label = overlay.querySelector<HTMLElement>("[data-slice-label]");
  if (label) label.textContent = labelFor(id);
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

  gsap
    .timeline({ defaults: { ease: "expo.inOut" }, onComplete: finish })
    .set(overlay, { autoAlpha: 1 })
    .fromTo(strips, { yPercent: 100 }, { yPercent: 0, duration: 0.55, stagger: 0.05 })
    .fromTo(label, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.25")
    .call(cover)
    .to(label, { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, "+=0.15")
    .to(strips, { yPercent: -100, duration: 0.55, stagger: 0.05 }, "<");
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
    <div ref={root} className="invisible fixed inset-0 z-[80] flex opacity-0" aria-hidden="true">
      {Array.from({ length: STRIPS }, (_, index) => (
        <div key={index} data-slice-strip className="h-full flex-1 translate-y-full bg-ink" />
      ))}
      <p
        data-slice-label
        className="statement pointer-events-none absolute inset-x-4 top-1/2 -translate-y-1/2 text-center text-paper opacity-0"
      />
    </div>
  );
}
