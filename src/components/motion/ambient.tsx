"use client";

import { useGSAP } from "@gsap/react";

import { gsap, LAND, MOTION_OK, ScrollTrigger } from "@/lib/motion/gsap";
import { whenIntroDone } from "@/lib/motion/intro-state";

// Ambient life for the server-rendered art (F-014 FR-003), driven by data attributes so art components stay markup:
//   data-spin="18"        turns forever, seconds per turn (negative reverses)
//   data-marquee="-36"    loops a track of two identical halves, seconds per loop (negative runs leftward)
//   data-morph="d1|d2"    a path rolls through alternative shapes and back
//   data-curve="0%|-40%"  a textPath slides along its curve as the page scrolls past
//   data-pop / ="intro"   springs in from nothing when it enters the viewport, or once the intro is done
//   data-float            bobs gently
//   data-speed="0.3"      parallax: drifts against the scroll by that fraction
// Spins and marquees speed up with the scroll velocity and settle back, like the reference's ticker. Every loop pauses
// while its element is off screen. Under reduced motion nothing runs and everything rests in its final, readable state.
export function Ambient() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const loops: gsap.core.Animation[] = [];
      const onScreen = (el: Element, animation: gsap.core.Animation) => {
        loops.push(animation);
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? animation.play() : animation.pause()),
        });
      };

      gsap.utils.toArray<SVGElement | HTMLElement>("[data-spin]").forEach((el) => {
        const seconds = Number(el.dataset.spin) || 20;
        onScreen(el, gsap.to(el, { rotation: seconds < 0 ? -360 : 360, duration: Math.abs(seconds), ease: "none", repeat: -1, paused: true, transformOrigin: "50% 50%" }));
      });

      gsap.utils.toArray<HTMLElement>("[data-marquee]").forEach((el) => {
        const seconds = Number(el.dataset.marquee) || 30;
        const [from, to] = seconds < 0 ? [0, -50] : [-50, 0];
        onScreen(el, gsap.fromTo(el, { xPercent: from }, { xPercent: to, duration: Math.abs(seconds), ease: "none", repeat: -1, paused: true }));
      });

      gsap.utils.toArray<SVGPathElement>("[data-morph]").forEach((el, index) => {
        const shapes = (el.dataset.morph ?? el.getAttribute("data-morph") ?? "").split("|").filter(Boolean);
        if (!shapes.length) return;
        const original = el.getAttribute("d") ?? "";
        const roll = gsap.timeline({ repeat: -1, paused: true, defaults: { duration: 3.2 + (index % 3) * 0.6, ease: "sine.inOut" } });
        [...shapes, original].forEach((shape) => roll.to(el, { morphSVG: shape }));
        onScreen(el, roll);
      });

      gsap.utils.toArray<SVGTextPathElement>("[data-curve]").forEach((el) => {
        const [from, to] = (el.getAttribute("data-curve") ?? "0%|-40%").split("|");
        const svg = el.ownerSVGElement ?? el;
        gsap.fromTo(el, { attr: { startOffset: from } }, { attr: { startOffset: to }, ease: "none", scrollTrigger: { trigger: svg, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      });

      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, index) => {
        onScreen(el, gsap.to(el, { y: index % 2 ? -14 : 14, rotation: index % 2 ? 3 : -3, duration: 2.6 + (index % 4) * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1, paused: true }));
      });

      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = Number(el.dataset.speed) || 0;
        gsap.fromTo(el, { y: () => speed * 160 }, { y: () => speed * -160, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.4, invalidateOnRefresh: true } });
      });

      // Shaped sections open up as they arrive: they start narrower with rounder corners and settle into their CSS shape
      // (shape-inset, shape-capsule), so each seam between chapters reads as one block easing into place. Both ends use
      // the same inset() form so GSAP can blend them; the end values repeat the CSS ones, so nothing jumps afterwards.
      const shapeVars = () => {
        const style = getComputedStyle(document.documentElement);
        const rem = parseFloat(style.fontSize);
        return { i: parseFloat(style.getPropertyValue("--shape-i")) * rem, r: parseFloat(style.getPropertyValue("--shape-r")) * rem };
      };
      gsap.utils.toArray<HTMLElement>(".shape-inset, .shape-capsule").forEach((el) => {
        const inset = el.classList.contains("shape-inset");
        const clip = (open: boolean) => () => {
          const { i, r } = shapeVars();
          const edge = inset ? i : 0;
          const side = open ? edge : Math.max(edge, window.innerWidth * 0.06);
          return `inset(${edge}px ${side}px ${edge}px ${side}px round ${open ? r : r * 1.35}px)`;
        };
        gsap.fromTo(el, { clipPath: clip(false) }, { clipPath: clip(true), ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 30%", scrub: 0.5, invalidateOnRefresh: true } });
      });

      // Reading order inside a chapter: kicker, lead, and supporting items rise out of a light blur once, in sequence
      // (data-rise holds an optional delay), after the elastic title has landed.
      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 32, autoAlpha: 0, filter: "blur(8px)" },
          { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.95, ease: "power4.out", delay: Number(el.dataset.rise) || 0, scrollTrigger: { trigger: el, start: "top 86%", once: true } },
        );
      });

      // Depth between chapters: a shaped block recedes a little as it scrolls away, so the next one reads as sliding
      // over it. Pinned scenes opt out (data-depth="off"), their pin owns the transform.
      gsap.utils.toArray<HTMLElement>(".shape-inset, .shape-capsule").forEach((el) => {
        if (el.dataset.depth === "off") return;
        gsap.to(el, { scale: 0.94, yPercent: 4, ease: "none", scrollTrigger: { trigger: el, start: "bottom 80%", end: "bottom 10%", scrub: 1 } });
      });

      // Reading progress: a thin yellow line along the top edge.
      const progress = document.querySelector<HTMLElement>("[data-progress]");
      if (progress) gsap.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

      const pops = gsap.utils.toArray<HTMLElement>("[data-pop]");
      const introPops = pops.filter((el) => el.dataset.pop === "intro");
      gsap.set(pops, { scale: 0, rotation: (i: number) => (i % 2 ? 40 : -40) });
      pops
        .filter((el) => el.dataset.pop !== "intro")
        .forEach((el) => {
          gsap.to(el, { scale: 1, rotation: 0, duration: 1.1, ease: LAND, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        });
      // whenIntroDone may call back outside this context, so its tween is killed by hand.
      let intro: gsap.core.Tween | undefined;
      const stop = whenIntroDone(() => {
        intro = gsap.to(introPops, { scale: 1, rotation: 0, duration: 1.2, ease: LAND, stagger: 0.12, delay: 0.7 });
      });

      // Scroll velocity becomes a brief boost on every loop's timeScale, then eases back to normal speed.
      const pace = { value: 1 };
      const apply = () => loops.forEach((loop) => loop.timeScale(pace.value));
      const velocity = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(1, 5, 1 + Math.abs(self.getVelocity()) / 700);
          if (boost <= pace.value) return;
          pace.value = boost;
          gsap.to(pace, { value: 1, duration: 1.2, ease: "power2.out", overwrite: true, onUpdate: apply });
          apply();
        },
      });

      return () => {
        stop();
        intro?.kill();
        velocity.kill();
        gsap.set(pops, { clearProps: "transform" });
      };
    });
    return () => mm.revert();
  });

  return null;
}
