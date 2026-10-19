"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Registered once here so every client component shares the same plugin instances (ADR-0001).
// Every plugin ships inside the gsap package, so none is a new dependency. DrawSVG and MotionPath draw the Marginalia
// doodles and move the sun and the bookmark (F-012); others join only when a feature needs them, to keep the bundle lean.
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin, useGSAP);

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP_MOTION = "(prefers-reduced-motion: no-preference) and (min-width: 768px)";
export const POINTER_MOTION = "(prefers-reduced-motion: no-preference) and (pointer: fine)";
export const EASE_OUT = "expo.out";

export { DrawSVGPlugin, gsap, MotionPathPlugin, ScrollTrigger, SplitText, useGSAP };
