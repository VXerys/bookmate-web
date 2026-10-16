"use client";

import { useEffect } from "react";

import { ScrollTrigger } from "@/lib/motion/gsap";
import { finishIntro } from "@/lib/motion/intro-state";

// The one place that declares the intro finished: tells the boot fallback to keep html.js, re-measures triggers
// against the final fonts, and releases everything waiting on whenIntroDone. The sampul (F-002) calls this at its end.
export function completeIntro() {
  document.documentElement.dataset.intro = "done";
  ScrollTrigger.refresh();
  finishIntro();
}

// Stand-in until the sampul exists: the intro is "done" as soon as web fonts have settled.
export function IntroGate() {
  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) completeIntro();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
