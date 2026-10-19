import type { ReactNode } from "react";

// Abstract covers and spines: colour and pattern only, never a title or artwork that could pass for a real book
// (rules.md bans commercial covers). Tones are palette tokens, so the colours stay the app's own.
export type BookTone = "blue" | "ember" | "plum" | "forest" | "peach" | "highlight" | "ink" | "sky" | "coral" | "green" | "gold";
export type BookPattern = "stripes" | "dots" | "waves" | "sun" | "arches" | "grid";

const ACCENT: Record<BookTone, string> = {
  blue: "var(--color-highlight)",
  ember: "var(--color-ink)",
  plum: "var(--color-peach)",
  forest: "var(--color-ember)",
  peach: "var(--color-blue)",
  highlight: "var(--color-blue)",
  ink: "var(--color-ember)",
  sky: "var(--color-blue)",
  coral: "var(--color-highlight)",
  green: "var(--color-highlight)",
  gold: "var(--color-blue)",
};

// Trig results can differ in the last digit between server and browser; rounding keeps hydration identical.
const r2 = (value: number) => Math.round(value * 100) / 100;

export function Pattern({ pattern, color, id }: { pattern: BookPattern; color: string; id: string }) {
  switch (pattern) {
    case "stripes":
      return (
        <g stroke={color} strokeWidth="6" opacity="0.9" clipPath={`url(#${id})`}>
          {Array.from({ length: 9 }, (_, i) => (
            <line key={i} x1={-40 + i * 24} y1="170" x2={40 + i * 24} y2="0" />
          ))}
        </g>
      );
    case "dots":
      return (
        <g fill={color} clipPath={`url(#${id})`}>
          {Array.from({ length: 30 }, (_, i) => (
            <circle key={i} cx={22 + (i % 5) * 20} cy={22 + Math.floor(i / 5) * 24} r="4.5" />
          ))}
        </g>
      );
    case "waves":
      return (
        <g fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" clipPath={`url(#${id})`}>
          {Array.from({ length: 6 }, (_, i) => (
            <path key={i} d={`M0 ${30 + i * 24} C25 ${18 + i * 24} 45 ${42 + i * 24} 70 ${30 + i * 24} S110 ${18 + i * 24} 130 ${30 + i * 24}`} />
          ))}
        </g>
      );
    case "sun":
      return (
        <g clipPath={`url(#${id})`}>
          <circle cx="66" cy="70" r="26" fill={color} />
          <g stroke={color} strokeWidth="5" strokeLinecap="round">
            {Array.from({ length: 10 }, (_, i) => {
              const a = (i / 10) * Math.PI * 2;
              return <line key={i} x1={r2(66 + Math.cos(a) * 36)} y1={r2(70 + Math.sin(a) * 36)} x2={r2(66 + Math.cos(a) * 48)} y2={r2(70 + Math.sin(a) * 48)} />;
            })}
          </g>
        </g>
      );
    case "arches":
      return (
        <g fill="none" stroke={color} strokeWidth="6" clipPath={`url(#${id})`}>
          {Array.from({ length: 4 }, (_, i) => (
            <path key={i} d={`M${30 - i * 14} 170 L${30 - i * 14} 90 A${36 + i * 14} ${36 + i * 14} 0 0 1 ${102 + i * 14} 90 L${102 + i * 14} 170`} />
          ))}
        </g>
      );
    case "grid":
      return (
        <g stroke={color} strokeWidth="3" opacity="0.85" clipPath={`url(#${id})`}>
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`v${i}`} x1={14 + i * 17} y1="0" x2={14 + i * 17} y2="170" />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={10 + i * 17} x2="120" y2={10 + i * 17} />
          ))}
        </g>
      );
  }
}

/** A closed hardcover seen from the front, 120 x 170. */
export function BookCover({ tone, pattern, className, id }: { tone: BookTone; pattern: BookPattern; className?: string; id: string }) {
  const clip = `cover-${id}`;
  return (
    <svg viewBox="0 0 120 170" aria-hidden="true" className={className}>
      <defs>
        <clipPath id={clip}>
          <rect x="10" y="0" width="110" height="170" rx="6" />
        </clipPath>
      </defs>
      <rect x="0" y="0" width="120" height="170" rx="6" fill={`var(--color-${tone})`} />
      <Pattern pattern={pattern} color={ACCENT[tone]} id={clip} />
      {/* Spine hinge and a page block peeking out, so it reads as a book rather than a card. */}
      <rect x="0" y="0" width="12" height="170" rx="4" fill="var(--color-ink)" opacity="0.25" />
      <line x1="16" y1="4" x2="16" y2="166" stroke="var(--color-ink)" strokeOpacity="0.18" strokeWidth="1.5" />
      <rect x="0" y="0" width="120" height="170" rx="6" fill="none" stroke="var(--color-ink)" strokeWidth="2.5" />
    </svg>
  );
}

/** A spine standing on a shelf; children are its printed label (copy comes from the section). */
export function BookSpine({ tone, pattern, children, id }: { tone: BookTone; pattern: BookPattern; children: ReactNode; id: string }) {
  const clip = `spine-${id}`;
  return (
    <span className="relative block h-full w-full overflow-hidden rounded-[6px] border-[2.5px] border-ink" style={{ background: `var(--color-${tone})` }}>
      <svg viewBox="0 0 120 170" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 h-full w-full opacity-55">
        <defs>
          <clipPath id={clip}>
            <rect width="120" height="170" />
          </clipPath>
        </defs>
        <Pattern pattern={pattern} color={ACCENT[tone]} id={clip} />
      </svg>
      <span className="absolute inset-x-0 top-3 mx-auto h-1.5 w-2/3 rounded-full bg-ink/25" aria-hidden="true" />
      <span className="absolute inset-x-0 bottom-3 mx-auto h-1.5 w-2/3 rounded-full bg-ink/25" aria-hidden="true" />
      {children}
    </span>
  );
}
