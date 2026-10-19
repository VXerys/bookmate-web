import type { Moment } from "@/content/story";

// One still life per hour of the reader's day (F-012). The reader is told through their things (mug, book, lamp)
// rather than a generic figure. Strokes marked data-draw are drawn by the hari timeline; data-scene-* are moved.
const line = { fill: "none", stroke: "var(--color-ink)", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const outline = { stroke: "var(--color-ink)", strokeWidth: 3, strokeLinejoin: "round" } as const;

function Pagi() {
  return (
    <>
      {/* Sun behind the calendar, mug in front: morning check-in. */}
      <circle cx="250" cy="58" r="30" fill="var(--color-highlight)" {...outline} />
      <rect x="140" y="62" width="150" height="132" rx="10" fill="var(--color-paper)" {...outline} />
      <path d="M140 74 a12 12 0 0 1 12 -12 h126 a12 12 0 0 1 12 12 v18 h-150 Z" fill="var(--color-ember)" {...outline} />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={152 + (i % 4) * 34} y={102 + Math.floor(i / 4) * 30} width="26" height="22" rx="4" fill="none" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="2" />
      ))}
      <g data-draw="">
        {Array.from({ length: 7 }, (_, i) => {
          const x = 152 + (i % 4) * 34;
          const y = 102 + Math.floor(i / 4) * 30;
          return <path key={i} {...line} stroke="var(--color-blue)" d={`M${x + 5} ${y + 12} L${x + 11} ${y + 18} L${x + 22} ${y + 5}`} />;
        })}
      </g>
      <path d="M38 132 h74 v44 a26 26 0 0 1 -26 26 h-22 a26 26 0 0 1 -26 -26 Z" fill="var(--color-blue)" {...outline} />
      <path d="M112 142 c22 0 22 30 0 30" {...line} />
      <g data-draw="">
        <path {...line} d="M58 120 c-10 -12 10 -18 0 -32" />
        <path {...line} d="M76 120 c-10 -12 10 -18 0 -32" />
        <path {...line} d="M94 120 c-10 -12 10 -18 0 -32" />
      </g>
      <path d="M20 206 H300" {...line} />
    </>
  );
}

function Siang() {
  return (
    <>
      {/* An open book on the table with a pencil and the page progress filling below. */}
      <path d="M160 70 C130 56 82 56 46 66 V176 C82 166 130 166 160 180 Z" fill="var(--color-paper)" {...outline} />
      <path d="M160 70 C190 56 238 56 274 66 V176 C238 166 190 166 160 180 Z" fill="var(--color-paper)" {...outline} />
      <g data-draw="">
        <path {...line} strokeWidth="2.5" d="M66 90 C92 84 118 84 142 90" />
        <path {...line} strokeWidth="2.5" d="M66 108 C92 102 118 102 142 108" />
        <path {...line} strokeWidth="2.5" d="M66 126 C92 120 118 120 130 124" />
        <path {...line} strokeWidth="2.5" d="M178 90 C204 84 230 84 254 90" />
        <path {...line} strokeWidth="2.5" d="M178 108 C204 102 230 102 246 106" />
      </g>
      <g transform="rotate(-28 250 150)">
        <rect x="200" y="140" width="96" height="16" rx="3" fill="var(--color-highlight)" {...outline} />
        <path d="M296 140 L314 148 L296 156 Z" fill="var(--color-peach)" {...outline} />
        <rect x="190" y="140" width="12" height="16" rx="3" fill="var(--color-ember)" {...outline} />
      </g>
      <rect x="46" y="200" width="228" height="16" rx="8" fill="var(--color-paper)" {...outline} />
      <rect data-scene-progress="" x="48" y="202" width="168" height="12" rx="6" fill="var(--color-ember)" />
    </>
  );
}

function Sore() {
  return (
    <>
      {/* Review time: a star rating being drawn, a big quote mark, and a video tile. */}
      <rect x="30" y="40" width="160" height="104" rx="14" fill="var(--color-forest)" {...outline} />
      <path d="M96 72 L132 92 L96 112 Z" fill="var(--color-ember)" {...outline} />
      <path d="M220 52 c-20 6 -28 22 -24 40 c4 14 22 16 28 4 c6 -12 -6 -22 -16 -18 c0 -10 6 -18 16 -22 Z" fill="var(--color-ember)" {...outline} />
      <path d="M268 52 c-20 6 -28 22 -24 40 c4 14 22 16 28 4 c6 -12 -6 -22 -16 -18 c0 -10 6 -18 16 -22 Z" fill="var(--color-ember)" {...outline} />
      <g data-draw="">
        {Array.from({ length: 5 }, (_, i) => {
          const cx = 52 + i * 54;
          const cy = 186;
          const points = Array.from({ length: 10 }, (_, k) => {
            const r = k % 2 ? 9 : 22;
            const a = -Math.PI / 2 + (k * Math.PI) / 5;
            return `${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`;
          });
          return <path key={i} {...line} stroke={i < 4 ? "var(--color-ember)" : "var(--color-ink)"} d={`M${points.join(" L")} Z`} />;
        })}
      </g>
    </>
  );
}

function Malam() {
  return (
    <>
      {/* Night: the desk lamp's cone, the moon, and the club talking in bubbles. */}
      <path d="M262 34 a28 28 0 1 0 22 46 a22 22 0 1 1 -22 -46 Z" fill="var(--color-highlight)" {...outline} />
      <path d="M40 92 L96 92 L120 198 L16 198 Z" fill="var(--color-highlight)" opacity="0.35" />
      <path d="M44 60 h48 l14 32 h-76 Z" fill="var(--color-plum)" {...outline} />
      <path d="M68 60 V36 M68 36 H40" {...line} />
      <g data-draw="">
        <path {...line} d="M150 64 h96 a12 12 0 0 1 12 12 v30 a12 12 0 0 1 -12 12 h-70 l-18 14 v-14 h-8 a12 12 0 0 1 -12 -12 v-30 a12 12 0 0 1 12 -12" />
        <path {...line} d="M170 140 h86 a12 12 0 0 1 12 12 v26 a12 12 0 0 1 -12 12 h-8 v14 l-18 -14 h-60 a12 12 0 0 1 -12 -12 v-26 a12 12 0 0 1 12 -12" />
      </g>
      <rect data-scene-bar="" x="166" y="80" width="64" height="10" rx="5" fill="var(--color-blue)" />
      <rect data-scene-bar="" x="166" y="96" width="38" height="10" rx="5" fill="var(--color-ember)" />
      <circle cx="194" cy="166" r="9" fill="var(--color-highlight)" {...outline} strokeWidth="2.5" />
      <circle cx="222" cy="166" r="9" fill="var(--color-ember)" {...outline} strokeWidth="2.5" />
      <path d="M20 206 H300" {...line} />
    </>
  );
}

function Besok() {
  return (
    <>
      {/* Next morning: a book travels along a dotted path from one reader's home to another's. */}
      <path d="M26 196 V140 L64 110 L102 140 V196 Z" fill="var(--color-peach)" {...outline} />
      <path d="M218 196 V140 L256 110 L294 140 V196 Z" fill="var(--color-sky)" {...outline} />
      <rect x="54" y="160" width="20" height="36" fill="var(--color-ink)" />
      <rect x="246" y="160" width="20" height="36" fill="var(--color-ink)" />
      {/* Static dotted route: DrawSVG would overwrite the dash pattern, so only the book moves along it. */}
      <path data-scene-path="" {...line} strokeDasharray="2 12" d="M80 104 C120 20 200 20 240 104" />
      <g data-scene-traveler="" transform="translate(160 42)">
        <rect x="-16" y="-20" width="32" height="40" rx="3" fill="var(--color-blue)" {...outline} strokeWidth="2.5" />
        <rect x="-16" y="-20" width="6" height="40" fill="var(--color-ink)" opacity="0.3" />
      </g>
      <path d="M10 196 H310" {...line} />
    </>
  );
}

const SCENES: Record<Moment, () => React.JSX.Element> = { pagi: Pagi, siang: Siang, sore: Sore, malam: Malam, besok: Besok };

export function Scene({ moment, className }: { moment: Moment; className?: string }) {
  const Body = SCENES[moment];
  return (
    <svg viewBox="0 0 320 230" aria-hidden="true" className={className} data-scene={moment}>
      <Body />
    </svg>
  );
}
