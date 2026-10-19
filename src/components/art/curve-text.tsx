type CurveTextProps = {
  id: string;
  text: string;
  // Palette token names for the band and its lettering.
  tone: string;
  ink?: string;
  // startOffset at the moment the band enters and leaves the viewport; ambient motion scrubs between them.
  from?: string;
  to?: string;
  // Alternative curve shapes the band morphs through while it is on screen.
  morph?: readonly string[];
  className?: string;
};

const PATH = "M-80 190 C 220 40 420 40 720 170 S 1220 300 1520 120";

// A ribbon of text that bends across the section (F-014 FR-003): a thick rounded stroke carries the phrase on the same
// path; scrolling slides the words along the curve and the curve itself sways. Decorative only.
export function CurveText({ id, text, tone, ink = "ink", from = "0%", to = "-40%", morph, className }: CurveTextProps) {
  return (
    <svg viewBox="0 0 1440 320" preserveAspectRatio="xMidYMid slice" className={`pointer-events-none block w-full overflow-visible ${className ?? ""}`} aria-hidden="true">
      <path
        id={id}
        d={PATH}
        data-morph={morph ? morph.join("|") : undefined}
        fill="none"
        stroke={`var(--color-${tone})`}
        strokeWidth="78"
        strokeLinecap="round"
      />
      <text fill={`var(--color-${ink})`} className="font-display" fontSize="40" fontWeight="800" letterSpacing="1" dominantBaseline="central">
        <textPath href={`#${id}`} startOffset={from} data-curve={`${from}|${to}`}>
          {`${text} `.repeat(6)}
        </textPath>
      </text>
    </svg>
  );
}
