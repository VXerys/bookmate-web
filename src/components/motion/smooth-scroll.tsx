"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { gsap, MOTION_OK, ScrollTrigger } from "@/lib/motion/gsap";
import { whenIntroDone } from "@/lib/motion/intro-state";

let instance: Lenis | null = null;
let lockedBeforeStart = false;

// The sampul (F-002) can ask for a lock before Lenis exists, so the request is remembered and applied on start.
// overflow: hidden also blocks keyboard and native scrolling when Lenis never starts (reduced motion).
export function setScrollLocked(locked: boolean) {
  lockedBeforeStart = locked;
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (!instance) return;
  if (locked) instance.stop();
  else instance.start();
}

export function scrollToTarget(target: string | HTMLElement | number) {
  if (instance) {
    instance.scrollTo(target, { duration: 1.4 });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target });
  else (typeof target === "string" ? document.querySelector(target) : target)?.scrollIntoView();
}

// Instant jump, used behind the slice transition so the visitor never watches a long scroll.
export function jumpToTarget(target: string | HTMLElement | number) {
  if (instance) {
    instance.scrollTo(target, { immediate: true, force: true });
    return;
  }
  if (typeof target === "number") window.scrollTo(0, target);
  else (typeof target === "string" ? document.querySelector(target) : target)?.scrollIntoView();
}

export function SmoothScroll() {
  useEffect(() => {
    // Under reduced motion the browser's native scroll is the final state; Lenis never starts.
    if (!window.matchMedia(MOTION_OK).matches) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    instance = lenis;
    if (lockedBeforeStart) lenis.stop();
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    // Lag smoothing stays on during the intro so its timeline does not skip frames, then goes off so Lenis and
    // ScrollTrigger read the same frame.
    const stopWaiting = whenIntroDone(() => gsap.ticker.lagSmoothing(0));

    // Dev-only handle so the Browser pane can verify scroll lock and trigger sync (F-001 AC-006, AC-008).
    // The NODE_ENV check is replaced at build time, so production bundles drop this branch.
    if (process.env.NODE_ENV === "development") {
      Object.assign(window, { __bookmateMotion: { lenis, setScrollLocked, ScrollTrigger } });
    }

    return () => {
      stopWaiting();
      gsap.ticker.remove(tick);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}
