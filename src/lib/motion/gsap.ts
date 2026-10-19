"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Registered once here so every client component shares the same plugin instances (ADR-0001).
// ScrambleText and Flip join this list when a feature needs them, to keep the bundle lean until then (the kartu deal
// dropped Flip in F-011).
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP_MOTION = "(prefers-reduced-motion: no-preference) and (min-width: 768px)";
export const POINTER_MOTION = "(prefers-reduced-motion: no-preference) and (pointer: fine)";
export const EASE_OUT = "expo.out";

export { gsap, ScrollTrigger, SplitText, useGSAP };
