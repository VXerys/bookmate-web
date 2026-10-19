type Band = {
  // Palette token names.
  tone: string;
  ink: string;
  // Degrees the band is tilted; the sign also sets which way it runs.
  tilt: number;
  // Seconds per loop; negative runs right to left.
  speed: number;
};

type RibbonsProps = {
  phrases: readonly string[];
  bands?: readonly Band[];
  className?: string;
};

const DEFAULT_BANDS: readonly Band[] = [
  { tone: "highlight", ink: "navy", tilt: -4, speed: -36 },
  { tone: "blue", ink: "white", tilt: 3, speed: 42 },
];

function Star() {
  return (
    <svg viewBox="0 0 20 20" className="mx-[0.5em] inline-block w-[0.7em] shrink-0" data-spin="6" aria-hidden="true">
      <path d="M10 0 12.6 7.4 20 10 12.6 12.6 10 20 7.4 12.6 0 10 7.4 7.4Z" fill="currentColor" />
    </svg>
  );
}

// Crossing promo bands (F-014 FR-003, the reference's running ticker): two tilted strips whose phrases loop in
// opposite directions and speed up with the scroll. Each strip repeats its phrases twice so the loop is seamless; the
// phrase list is also rendered once as a plain list for assistive tech.
export function Ribbons({ phrases, bands = DEFAULT_BANDS, className }: RibbonsProps) {
  return (
    <div className={`relative isolate grid ${className ?? ""}`}>
      <ul className="sr-only">
        {phrases.map((phrase) => (
          <li key={phrase}>{phrase}</li>
        ))}
      </ul>
      {bands.map((band, index) => (
        <div
          key={`${band.tone}-${band.tilt}`}
          className="col-start-1 row-start-1 -mx-[5vw] self-center overflow-hidden py-[0.35em] font-display text-[clamp(1.6rem,3.6vw,3.25rem)] leading-none font-extrabold whitespace-nowrap uppercase"
          style={{ background: `var(--color-${band.tone})`, color: `var(--color-${band.ink})`, rotate: `${band.tilt}deg`, zIndex: index }}
          aria-hidden="true"
        >
          <div data-marquee={band.speed} className="flex w-max">
            {[0, 1].map((half) => (
              <span key={half} className="flex shrink-0 items-center">
                {[...phrases, ...phrases].map((phrase, i) => (
                  <span key={`${phrase}-${i}`} className="flex items-center">
                    {phrase}
                    <Star />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
