import { BLUE, mix, Swells, type Swell } from "@/components/art/swells";
import { Waves } from "@/components/art/waves";

// Crests climb toward the right, behind the phone, so the copy on the left sits on calm blue.
const HERO_SWELLS: readonly Swell[] = [
  { id: "far", base: 730, rise: 380, amplitude: 38, humps: 3, top: mix(BLUE, 72, "var(--color-white)"), bottom: BLUE, crest: "var(--color-white)", crestOpacity: 0.35, speed: 0.06 },
  { id: "mid", base: 845, rise: 320, amplitude: 32, humps: 4, top: mix(BLUE, 90, "var(--color-navy)"), bottom: mix(BLUE, 80, "var(--color-navy)"), crest: "var(--color-highlight)", crestOpacity: 0.95, crestWidth: 4, speed: 0.14 },
  { id: "near", base: 925, rise: 190, amplitude: 26, humps: 5, top: mix(BLUE, 70, "var(--color-navy)"), bottom: mix(BLUE, 55, "var(--color-navy)"), crest: "var(--color-white)", crestOpacity: 0.2, speed: 0.24 },
];

// The hero's backdrop (F-014 hero revamp): brand blue, a soft light behind the phone that breathes, three gradient
// swells in depth, and the white wave that seams the hero into the next section. Static under reduced motion.
export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-blue" aria-hidden="true">
      <div
        data-float
        className="absolute top-[42%] left-[50%] aspect-square w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full lg:left-[72%]"
        style={{ background: `radial-gradient(circle, ${mix("var(--color-white)", 30, "transparent")} 0%, transparent 60%)` }}
      />
      <Swells id="hero-swell" swells={HERO_SWELLS} className="absolute inset-0 h-full w-full" />
      {/* The white wave is the seam into the page below, so the hero never ends on a straight edge. */}
      <Waves className="absolute inset-x-0 -bottom-px h-[12%] min-h-16" layers={[{ tone: "white", base: 230, amplitude: 34 }]} />
    </div>
  );
}
