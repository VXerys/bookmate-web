const r2 = (value: number) => Math.round(value * 100) / 100;

export const BLUE = "var(--color-blue)";
export const mix = (a: string, pct: number, b: string) => `color-mix(in srgb, ${a} ${pct}%, ${b})`;

export type Swell = {
  id: string;
  // Resting height of the crest at the left edge (viewBox 1440x960), and how much it rises toward the right.
  base: number;
  rise: number;
  amplitude: number;
  humps: number;
  // Gradient from crest to trough, as CSS colours mixed from the palette; "none" draws only the crest line.
  top: string;
  bottom: string;
  // Which edge the body of the wave hangs from; top-hung waves give a section a different silhouette.
  from?: "top" | "bottom";
  // Thin line along the crest: white sheen, or the page's one yellow accent; opacity 0 hides it.
  crest: string;
  crestOpacity: number;
  crestWidth?: number;
};

// A smooth wave through evenly spaced points (Catmull-Rom turned into cubic Béziers). A negative rise mirrors the climb
// to the left. Changing only the phase keeps the point count, so MorphSVG blends one shape into the next cleanly.
function crestLine({ base, rise, amplitude, humps }: Swell, phase: number, ripple = 0.35) {
  const steps = humps * 4;
  const points = Array.from({ length: steps + 3 }, (_, i) => {
    const x = -120 + (1680 / steps) * (i - 1);
    const t = Math.max(0, Math.min(1, x / 1440));
    const climb = rise >= 0 ? rise * t * t : -rise * (1 - t) * (1 - t);
    const y = base - climb + amplitude * Math.sin((x / 1440) * humps * Math.PI * 2 + phase) + amplitude * ripple * Math.sin((x / 1440) * humps * 5 + phase * 1.7);
    return [x, y] as const;
  });
  let d = `M${r2(points[1][0])} ${r2(points[1][1])}`;
  for (let i = 1; i < points.length - 2; i += 1) {
    const [p0, p1, p2, p3] = [points[i - 1], points[i], points[i + 1], points[i + 2]];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${r2(c1[0])} ${r2(c1[1])} ${r2(c2[0])} ${r2(c2[1])} ${r2(p2[0])} ${r2(p2[1])}`;
  }
  return d;
}

const fill = (swell: Swell, phase: number, ripple?: number) => `${crestLine(swell, phase, ripple)} ${swell.from === "top" ? "L1560 -40 L-120 -40" : "L1560 1000 L-120 1000"} Z`;

// Layered swells (F-014, the owner's "keep the waves, make them better"): each is a vertical gradient with a sheen
// along its crest; every fill and its crest line share one morph duration (data-morph-time) so they roll together. The
// first shape is the resting state for reduced motion and no JS. No scroll parallax: transforms on SVG children repaint
// the whole layer every frame (F-014 performance pass).
export function Swells({ id, swells, className, stretch = false }: { id: string; swells: readonly Swell[]; className?: string; stretch?: boolean }) {
  // Stretch fills any section shape (tall chapters) instead of cropping; lines then keep their width on screen.
  return (
    <svg viewBox="0 0 1440 960" preserveAspectRatio={stretch ? "none" : "xMidYMax slice"} className={`pointer-events-none ${className ?? ""}`} aria-hidden="true">
      <defs>
        {swells.map((swell) => (
          <linearGradient key={swell.id} id={`${id}-${swell.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: swell.top }} />
            <stop offset="1" style={{ stopColor: swell.bottom }} />
          </linearGradient>
        ))}
      </defs>
      {swells.map((swell, index) => {
        const time = 5 + index * 1.3;
        // Stretched section backdrops turn the small ripple into lumps, so they keep one clean harmonic.
        const ripple = stretch ? 0 : 0.35;
        return (
          <g key={swell.id}>
            {swell.top !== "none" && (
              <path d={fill(swell, index, ripple)} data-morph={[fill(swell, index + 1.6, ripple), fill(swell, index + 3.1, ripple)].join("|")} data-morph-time={time} fill={`url(#${id}-${swell.id})`} />
            )}
            {swell.crestOpacity > 0 && (
            <path
              d={crestLine(swell, index, ripple)}
              data-morph={[crestLine(swell, index + 1.6, ripple), crestLine(swell, index + 3.1, ripple)].join("|")}
              data-morph-time={time}
              fill="none"
              stroke={swell.crest}
              strokeOpacity={swell.crestOpacity}
              strokeWidth={swell.crestWidth ?? 2.5}
              strokeLinecap="round"
              vectorEffect={stretch ? "non-scaling-stroke" : undefined}
            />
            )}
          </g>
        );
      })}
    </svg>
  );
}
