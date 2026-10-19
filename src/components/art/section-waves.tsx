import { BLUE, mix, Swells, type Swell } from "@/components/art/swells";

const WHITE = "var(--color-white)";
const NAVY = "var(--color-navy)";
const PEACH = "var(--color-peach)";
const PALE = "var(--color-peach-pale)";
const SKY = "var(--color-sky)";
const YELLOW = "var(--color-highlight)";

type Variant = "pinjam" | "aplikasi" | "fitur" | "kenapa" | "komunitas" | "lencana";

// Each chapter card gets its own sea (owner: animated waves everywhere, never the same twice): a soft gradient ground
// and swells with a different silhouette, colour, and rhythm. All of them roll through ambient motion (data-morph) and
// drift at their own depth (data-speed); reduced motion leaves the first shape in place.
const VARIANTS: Record<Variant, { ground: string; swells: readonly Swell[] }> = {
  // Warm and soft, after the reference's "how it works": a pale wave hanging from the top, two broad warm swells below.
  pinjam: {
    ground: `linear-gradient(180deg, ${PALE} 0%, ${mix(PEACH, 35, PALE)} 100%)`,
    swells: [
      { id: "veil", from: "top", base: 220, rise: -80, amplitude: 70, humps: 2, top: mix(WHITE, 75, "transparent"), bottom: mix(WHITE, 40, "transparent"), crest: WHITE, crestOpacity: 0, speed: 0.05 },
      { id: "dune", base: 620, rise: -120, amplitude: 70, humps: 1.25, top: mix(PEACH, 55, PALE), bottom: mix(PEACH, 25, PALE), crest: WHITE, crestOpacity: 0, speed: 0.1 },
      { id: "sun", base: 810, rise: 110, amplitude: 40, humps: 1.5, top: mix(YELLOW, 30, PALE), bottom: mix(YELLOW, 14, PALE), crest: YELLOW, crestOpacity: 0.55, crestWidth: 2, speed: 0.16 },
    ],
  },
  // Cool and airy: a white veil above, three blue gradient swells climbing toward the phone.
  aplikasi: {
    ground: `linear-gradient(180deg, ${SKY} 0%, ${mix(BLUE, 20, WHITE)} 100%)`,
    swells: [
      { id: "veil", from: "top", base: 300, rise: 90, amplitude: 80, humps: 2, top: mix(WHITE, 70, "transparent"), bottom: mix(WHITE, 30, "transparent"), crest: WHITE, crestOpacity: 0, speed: 0.04 },
      { id: "far", base: 620, rise: 160, amplitude: 64, humps: 2, top: mix(BLUE, 22, WHITE), bottom: mix(BLUE, 34, WHITE), crest: WHITE, crestOpacity: 0.7, crestWidth: 2, speed: 0.08 },
      { id: "near", base: 820, rise: -110, amplitude: 36, humps: 3, top: mix(BLUE, 48, WHITE), bottom: mix(BLUE, 62, WHITE), crest: WHITE, crestOpacity: 0.5, crestWidth: 2, speed: 0.14 },
    ],
  },
  // Line work on the blue capsule: thin white currents flowing across the giant words, no fills.
  fitur: {
    ground: `linear-gradient(180deg, ${mix(BLUE, 90, WHITE)} 0%, ${BLUE} 40%, ${mix(BLUE, 85, NAVY)} 100%)`,
    swells: [180, 330, 480, 630, 780].map((base, i) => ({
      id: `current-${i}`,
      base,
      rise: i % 2 ? 90 : -90,
      amplitude: 40 + i * 8,
      humps: 2 + (i % 2),
      top: "none",
      bottom: "none",
      crest: i === 2 ? YELLOW : WHITE,
      crestOpacity: i === 2 ? 0.5 : 0.16,
      crestWidth: i === 2 ? 2 : 1.5,
      speed: 0.04 + i * 0.03,
    })),
  },
  // Sunny swells rising from the bottom with a blue current across the top.
  kenapa: {
    ground: `linear-gradient(180deg, ${WHITE} 0%, ${PALE} 55%, ${mix(YELLOW, 18, PALE)} 100%)`,
    swells: [
      { id: "current", base: 170, rise: 60, amplitude: 50, humps: 2, top: "none", bottom: "none", crest: BLUE, crestOpacity: 0.22, crestWidth: 2, speed: 0.06 },
      { id: "glow", base: 700, rise: 160, amplitude: 56, humps: 2, top: mix(YELLOW, 32, PALE), bottom: mix(YELLOW, 16, PALE), crest: WHITE, crestOpacity: 0, speed: 0.08 },
      { id: "foam", base: 840, rise: -100, amplitude: 34, humps: 4, top: mix(WHITE, 85, "transparent"), bottom: WHITE, crest: WHITE, crestOpacity: 0, speed: 0.14 },
    ],
  },
  // Two top-hung tides meeting a low swell: the club chapter feels like a harbour.
  komunitas: {
    ground: `linear-gradient(135deg, ${SKY} 0%, ${mix(BLUE, 14, WHITE)} 100%)`,
    swells: [
      { id: "tide", from: "top", base: 260, rise: -160, amplitude: 60, humps: 3, top: mix(WHITE, 80, "transparent"), bottom: mix(WHITE, 40, "transparent"), crest: WHITE, crestOpacity: 0, speed: 0.05 },
      { id: "line-a", base: 520, rise: 120, amplitude: 44, humps: 3, top: "none", bottom: "none", crest: BLUE, crestOpacity: 0.22, crestWidth: 1.5, speed: 0.08 },
      { id: "floor", base: 790, rise: 140, amplitude: 40, humps: 3, top: mix(BLUE, 18, WHITE), bottom: mix(BLUE, 30, WHITE), crest: BLUE, crestOpacity: 0.35, crestWidth: 2, speed: 0.12 },
    ],
  },
  // Night sea under the tarot cards: deep gradient swells with a thin yellow crest.
  lencana: {
    ground: `radial-gradient(120% 80% at 50% 0%, ${mix(BLUE, 30, NAVY)} 0%, ${NAVY} 60%)`,
    swells: [
      { id: "mist", from: "top", base: 200, rise: 80, amplitude: 40, humps: 2, top: "none", bottom: "none", crest: WHITE, crestOpacity: 0.08, crestWidth: 1.5, speed: 0.04 },
      { id: "swell", base: 660, rise: 200, amplitude: 52, humps: 3, top: mix(BLUE, 34, NAVY), bottom: mix(BLUE, 12, NAVY), crest: YELLOW, crestOpacity: 0.65, crestWidth: 2, speed: 0.08 },
      { id: "deep", base: 820, rise: -120, amplitude: 30, humps: 4, top: mix(BLUE, 20, NAVY), bottom: NAVY, crest: WHITE, crestOpacity: 0.12, crestWidth: 1.5, speed: 0.14 },
    ],
  },
};

export function SectionWaves({ variant, className }: { variant: Variant; className?: string }) {
  const look = VARIANTS[variant];
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className ?? ""}`} style={{ background: look.ground }} aria-hidden="true">
      <Swells id={`waves-${variant}`} swells={look.swells} stretch className="absolute inset-0 h-full w-full" />
    </div>
  );
}
