"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Registered once here so every client component shares the same plugin instances (ADR-0001).
// Flip and ScrambleText join this list when the feature that uses them lands, to keep the bundle lean until then.
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP_MOTION = "(prefers-reduced-motion: no-preference) and (min-width: 768px)";
export const POINTER_MOTION = "(prefers-reduced-motion: no-preference) and (pointer: fine)";
export const EASE_OUT = "expo.out";

export { gsap, ScrollTrigger, SplitText, useGSAP };
