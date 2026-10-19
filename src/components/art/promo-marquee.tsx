import { BLUE, mix, Swells, type Swell } from "@/components/art/swells";

type Band = {
  id: string;
  // CSS colours: the band's ground and the lighter wave pattern rolling inside it.
  ground: string;
  wave: string;
  tilt: number;
  // Seconds per loop; negative runs leftward.
  speed: number;
};

const WHITE = "var(--color-white)";
const YELLOW = "var(--color-highlight)";

const BANDS: readonly Band[] = [
  { id: "sun", ground: YELLOW, wave: mix(YELLOW, 45, WHITE), tilt: 0, speed: -46 },
  { id: "sea", ground: mix(BLUE, 55, WHITE), wave: mix(BLUE, 25, WHITE), tilt: -3.2, speed: 52 },
];

// Two broad, soft shapes per band, one hanging from the top and one rising from the bottom, so the band reads as two
// tones of the same colour that keep rolling into each other.
const pattern = (wave: string): readonly Swell[] => [
  { id: "up", base: 560, rise: 0, amplitude: 320, humps: 1.5, top: wave, bottom: wave, crest: wave, crestOpacity: 0, speed: 0 },
  { id: "down", from: "top", base: 420, rise: 0, amplitude: 280, humps: 1.25, top: wave, bottom: wave, crest: wave, crestOpacity: 0, speed: 0 },
];

// The promo interlude (F-014, after the reference's sale banners): two overlapping bands, one level and one tilted,
// each a two-tone wave pattern with a line of navy text running through it in opposite directions. Text loops through
// ambient motion (data-marquee, two identical halves) and the waves roll (data-morph). Decorative: the phrases are also
// listed once for assistive tech.
export function PromoMarquee({ phrases, className }: { phrases: readonly string[]; className?: string }) {
  const line = phrases.join("  ·  ");
  return (
    <div className={`relative ${className ?? ""}`}>
      <ul className="sr-only">
        {phrases.map((phrase) => (
          <li key={phrase}>{phrase}</li>
        ))}
      </ul>
      <div aria-hidden="true">
        {BANDS.map((band, index) => (
          <div
            key={band.id}
            className={`relative -mx-[4vw] overflow-hidden ${index ? "-mt-[clamp(1.5rem,3vw,2.75rem)]" : ""}`}
            style={{ background: band.ground, rotate: `${band.tilt}deg`, zIndex: index }}
          >
            <Swells id={`band-${band.id}`} swells={pattern(band.wave)} stretch className="absolute inset-0 h-full w-full" />
            <div data-skew className="relative py-[clamp(1rem,2.2vw,1.9rem)] font-display text-[clamp(1.8rem,3.6vw,3.4rem)] leading-none font-extrabold tracking-tight whitespace-nowrap text-navy">
              <div data-marquee={band.speed} className="flex w-max">
                {[0, 1].map((half) => (
                  <span key={half} className="shrink-0 pr-[1.2em]">
                    {line}
                    {"  ·  "}
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
