"use client";

import { useRef } from "react";

import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";

export type Blob = { d: string; color: string };

type BlobsProps = {
  blobs: readonly Blob[];
  className?: string;
  viewBox?: string;
  // Small blobs breathe less, like the reference's data-background-animation-small.
  small?: boolean;
};

// Soft shapes behind a section that "breathe": fill and stroke share a colour, and the stroke swells and shrinks with a
// slight turn every three seconds, only while the section is on screen (reference-aardvark.md, background animation).
export function Blobs({ blobs, className, viewBox = "0 0 1440 900", small = false }: BlobsProps) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = ref.current;
      if (!svg) return;
      const paths = svg.querySelectorAll("path");
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set(paths, { attr: { "stroke-width": 0 }, rotate: 0, transformOrigin: "50% 50%", transformBox: "fill-box" });
        const breathe = gsap
          .timeline({ paused: true, repeat: -1 })
          .to(paths, { attr: { "stroke-width": small ? 35 : 60 }, rotate: 2, duration: 3, ease: "sine.inOut" })
          .to(paths, { attr: { "stroke-width": 0 }, rotate: 0, duration: 3, ease: "sine.inOut" });
        const visible = ScrollTrigger.create({
          trigger: svg,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? breathe.play() : breathe.pause()),
        });
        return () => {
          visible.kill();
          breathe.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [small] },
  );

  return (
    <svg ref={ref} viewBox={viewBox} preserveAspectRatio="xMidYMid slice" className={`pointer-events-none ${className ?? ""}`} aria-hidden="true">
      {blobs.map((blob) => (
        <path key={blob.d} d={blob.d} fill={blob.color} stroke={blob.color} strokeWidth="0" strokeLinejoin="round" />
      ))}
    </svg>
  );
}
