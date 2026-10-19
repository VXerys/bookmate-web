"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { CustomEase } from "gsap/CustomEase";
import { InertiaPlugin } from "gsap/InertiaPlugin";

// Registered once here so every client component shares the same plugin instances (ADR-0001).
// Every plugin ships inside the gsap package, so none is a new dependency: DrawSVG for doodles and the loader stroke,
// MotionPath for the travelling book, CustomEase for the motion tokens, Inertia for the momentum push on benefit pills.
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin, CustomEase, InertiaPlugin, useGSAP);

// The reference's motion vocabulary (docs/product/reference-aardvark.md): "osmo" for general moves, "energy" for copy
// and buttons, and an elastic landing for headings, cards, and labels (F-013 Q5).
CustomEase.create("osmo", "0.625, 0.05, 0, 1");
CustomEase.create("energy", "M0,0 C0.32,0.72 0,1 1,1");
gsap.defaults({ ease: "osmo", duration: 0.6 });
export const ENERGY = "energy";
export const LAND = "elastic.out(1, 0.72)";

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP_MOTION = "(prefers-reduced-motion: no-preference) and (min-width: 768px)";
export const POINTER_MOTION = "(prefers-reduced-motion: no-preference) and (pointer: fine)";
export const EASE_OUT = "osmo";
export const HOVER_MOTION = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export { CustomEase, DrawSVGPlugin, gsap, InertiaPlugin, MotionPathPlugin, ScrollTrigger, SplitText, useGSAP };
