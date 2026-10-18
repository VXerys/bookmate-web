"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { gsap, MOTION_OK, ScrollTrigger } from "@/lib/motion/gsap";
import { whenIntroDone } from "@/lib/motion/intro-state";
import { createScrollLock } from "@/lib/motion/scroll-lock";

export type ScrollLockOwner = "sampul" | "menu" | "slice";

let instance: Lenis | null = null;
const scrollLock = createScrollLock();

// overflow: hidden also blocks keyboard and native scrolling when Lenis never starts (reduced motion).
// A lock taken before Lenis exists (the sampul mounts first) is applied when Lenis starts, via isLocked().
scrollLock.subscribe((locked) => {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (!instance) return;
  if (locked) instance.stop();
  else instance.start();
});

export function lockScroll(owner: ScrollLockOwner) {
  scrollLock.lock(owner);
}

export function unlockScroll(owner: ScrollLockOwner) {
  scrollLock.unlock(owner);
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
    if (scrollLock.isLocked()) lenis.stop();
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    // Lag smoothing stays on during the intro so its timeline does not skip frames, then goes off so Lenis and
    // ScrollTrigger read the same frame.
    const stopWaiting = whenIntroDone(() => gsap.ticker.lagSmoothing(0));

    // Dev-only handle so the Browser pane can verify scroll lock and trigger sync (F-001 AC-006, AC-008), and drive
    // gsap.ticker by hand when the pane is hidden and requestAnimationFrame is paused.
    // The NODE_ENV check is replaced at build time, so production bundles drop this branch.
    if (process.env.NODE_ENV === "development") {
      Object.assign(window, { __bookmateMotion: { gsap, lenis, lockScroll, unlockScroll, scrollLock, ScrollTrigger } });
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
