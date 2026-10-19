import { Ribbons } from "@/components/art/ribbons";
import { pita } from "@/content/story";

// The promo interlude (F-014, the reference's running ticker): two crossing bands between the club chapter and the
// badge chapter. Not a chapter of its own, so it has no anchor and no indicator label.
export function Pita() {
  return (
    <div className="overflow-hidden bg-white py-20 lg:py-28">
      <Ribbons phrases={pita.phrases} />
    </div>
  );
}
