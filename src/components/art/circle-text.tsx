import type { ReactNode } from "react";

type CircleTextProps = {
  id: string;
  text: string;
  // Palette token names for the disc and the lettering.
  tone?: string;
  ink?: string;
  spin?: number;
  className?: string;
  children?: ReactNode;
};

// A round club stamp (F-014 FR-003): the phrase runs around a circle path and the ring turns slowly; whatever sits in
// the middle (the logo, a cover) stays still. The phrase is decorative, so the whole stamp is hidden from assistive tech.
export function CircleText({ id, text, tone = "white", ink = "ink", spin = 22, className, children }: CircleTextProps) {
  return (
    <div className={`relative grid place-items-center ${className ?? ""}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" data-spin={spin} className="absolute inset-0 h-full w-full">
        <circle cx="100" cy="100" r="99" fill={`var(--color-${tone})`} />
        <path id={id} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" fill="none" />
        <text fill={`var(--color-${ink})`} className="font-display" fontSize="17.5" fontWeight="800" letterSpacing="2.6">
          <textPath href={`#${id}`} startOffset="0">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="relative w-[46%]">{children}</div>
    </div>
  );
}
