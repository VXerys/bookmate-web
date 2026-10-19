import type { SVGProps } from "react";

// Hand-drawn marks a club member leaves in the margin (docs/product/art-direction.md, F-012). Every stroke is a single
// open path so DrawSVG can draw it like a pen; data-draw marks the SVG for src/lib/motion/draw.ts. All are decorative.
type DoodleProps = SVGProps<SVGSVGElement> & { strokeWidth?: number };

const stroke = (width: number) =>
  ({
    fill: "none",
    stroke: "currentColor",
    strokeWidth: width,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  }) as const;

export function ScribbleCircle({ strokeWidth = 3, ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 220 110" preserveAspectRatio="none" aria-hidden="true" data-draw="" {...props}>
      <path
        {...stroke(strokeWidth)}
        d="M30 66 C20 38 76 14 122 14 C170 14 206 32 202 58 C198 86 146 98 98 96 C50 94 12 80 16 56 C20 34 58 22 98 18"
      />
    </svg>
  );
}

export function WavyUnderline({ strokeWidth = 4, ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true" data-draw="" {...props}>
      <path {...stroke(strokeWidth)} d="M4 14 C40 5 70 21 104 12 S170 4 204 13 S266 19 296 8" />
    </svg>
  );
}

export function CurvedArrow({ strokeWidth = 3, ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 160 130" aria-hidden="true" data-draw="" {...props}>
      <path {...stroke(strokeWidth)} d="M10 20 C52 6 112 18 130 66 C136 84 136 98 133 112" />
      <path {...stroke(strokeWidth)} d="M114 96 L133 114 L150 92" />
    </svg>
  );
}

// The four-point star with flicks from the BookMate Play Store listing art.
export function Sparkle({ strokeWidth = 3, ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" data-draw="" {...props}>
      <path {...stroke(strokeWidth)} d="M50 8 C54 36 64 46 92 50 C64 54 54 64 50 92 C46 64 36 54 8 50 C36 46 46 36 50 8" />
      <path {...stroke(strokeWidth)} d="M78 16 L88 9" />
      <path {...stroke(strokeWidth)} d="M83 27 L95 25" />
    </svg>
  );
}

export function StrikeThrough({ strokeWidth = 4, ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true" data-draw="" {...props}>
      <path {...stroke(strokeWidth)} d="M3 12 C32 6 62 15 92 9 S152 5 197 11" />
    </svg>
  );
}

export function Checkmark({ strokeWidth = 4, ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" data-draw="" {...props}>
      <path {...stroke(strokeWidth)} d="M6 22 C10 25 13 29 16 33 C21 22 28 12 35 6" />
    </svg>
  );
}

export function Burst({ strokeWidth = 3, ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 60 60" aria-hidden="true" data-draw="" {...props}>
      <path {...stroke(strokeWidth)} d="M30 4 L30 16" />
      <path {...stroke(strokeWidth)} d="M30 44 L30 56" />
      <path {...stroke(strokeWidth)} d="M4 30 L16 30" />
      <path {...stroke(strokeWidth)} d="M44 30 L56 30" />
      <path {...stroke(strokeWidth)} d="M12 12 L20 20" />
      <path {...stroke(strokeWidth)} d="M40 40 L48 48" />
      <path {...stroke(strokeWidth)} d="M48 12 L40 20" />
      <path {...stroke(strokeWidth)} d="M20 40 L12 48" />
    </svg>
  );
}

/** A highlighter swipe: a fill, swept in with scaleX rather than drawn. Sits behind text (negative z). */
export function Highlight({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true" data-highlight="" className={className} {...props}>
      <path fill="var(--color-highlight)" d="M8 16 C70 9 170 12 294 7 C296 22 293 38 290 50 C200 55 96 52 10 57 C6 44 5 29 8 16 Z" />
    </svg>
  );
}

/** Masking tape for pinned notes. */
export function Tape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 34" aria-hidden="true" className={className}>
      <path
        fill="var(--color-peach)"
        fillOpacity="0.85"
        d="M4 6 L10 3 L14 7 L20 3 L104 5 L106 11 L102 16 L107 22 L104 30 L20 31 L15 27 L9 31 L4 26 L7 19 L3 13 Z"
      />
    </svg>
  );
}
