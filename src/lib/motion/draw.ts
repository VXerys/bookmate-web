import { gsap } from "./gsap.ts";

// The strokes inside a doodle that DrawSVG can draw; fills (highlighter swipes) are scaled instead.
const STROKES = "path, line, polyline, circle, ellipse";

/**
 * Puts every doodle under `root` in its undrawn state and lifts the CSS hiding rule (data-draw-ready), so the
 * first painted frame after hydration never shows a doodle that then vanishes and redraws.
 */
export function prepareDoodles(root: ParentNode) {
  const doodles = gsap.utils.toArray<SVGElement>("[data-draw]", root);
  doodles.forEach((doodle) => {
    gsap.set(doodle.querySelectorAll(STROKES), { drawSVG: "0%" });
    doodle.setAttribute("data-draw-ready", "");
  });
  const highlights = gsap.utils.toArray<SVGElement>("[data-highlight]", root);
  gsap.set(highlights, { scaleX: 0, transformOrigin: "0% 50%" });
  highlights.forEach((highlight) => highlight.setAttribute("data-draw-ready", ""));
}

/** Tween that draws one doodle stroke by stroke, like a pen that does not lift for long. */
export function drawDoodle(doodle: Element, vars: gsap.TweenVars = {}) {
  return gsap.to(doodle.querySelectorAll(STROKES), {
    drawSVG: "100%",
    duration: 0.9,
    ease: "power2.inOut",
    stagger: 0.18,
    ...vars,
  });
}

/** Tween that sweeps a highlighter fill in from the left. */
export function sweepHighlight(highlight: Element, vars: gsap.TweenVars = {}) {
  return gsap.to(highlight, { scaleX: 1, duration: 0.8, ease: "power3.inOut", ...vars });
}

/** Removes the undrawn state, for teardown and the reduced-motion branch. */
export function revealDoodles(root: ParentNode) {
  gsap.utils.toArray<SVGElement>("[data-draw]", root).forEach((doodle) => {
    gsap.set(doodle.querySelectorAll(STROKES), { clearProps: "strokeDasharray,strokeDashoffset" });
  });
  gsap.set(gsap.utils.toArray("[data-highlight]", root), { clearProps: "transform" });
}
