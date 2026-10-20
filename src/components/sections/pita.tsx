import { PromoMarquee } from "@/components/art/promo-marquee";
import { pita } from "@/content/story";

// The promo interlude between the club chapter and the badge chapter. Not a chapter of its own, so it has no anchor
// and no indicator label.
export function Pita() {
  return (
    <div className="overflow-x-clip bg-white py-12 lg:py-16">
      <PromoMarquee phrases={pita.phrases} />
    </div>
  );
}
