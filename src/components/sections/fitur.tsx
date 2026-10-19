import Image from "next/image";

import { Ribbon } from "@/components/art/ribbon";
import { HandNote } from "@/components/motion/hand-note";
import { PopTitle } from "@/components/motion/pop-title";
import { CardShelf } from "@/components/site/card-shelf";
import { screenImages } from "@/components/site/screen-images";
import { screens } from "@/content/screens";
import { fitur } from "@/content/story";

// Ribbon colours chosen to stand out from each card's own tone.
const RIBBON: Record<string, string> = { coral: "blue", highlight: "coral", green: "highlight", sky: "ember", ember: "blue", gold: "coral" };
const TAG = ["bg-white", "bg-ink text-white"] as const;

// The features as a shelf of coloured cards (F-013): a hanging bookmark, the app screenshot as the "cover", tags,
// and copy, on a soft green capsule after the books shelf.
export function Fitur() {
  return (
    <div className="bg-white">
      <section id="fitur" data-chapter="fitur" className="shape-inset overflow-hidden bg-soft-green py-28">
        <CardShelf
          id="fitur-track"
          label={fitur.title}
          previous={fitur.previous}
          next={fitur.next}
          intro={
            <>
              <PopTitle className="heading">{fitur.title}</PopTitle>
              <p className="lead">{fitur.lead}</p>
              <HandNote decorative className="-rotate-2">
                {fitur.note}
              </HandNote>
            </>
          }
        >
          {fitur.items.map((item, index) => (
            <li key={item.id} data-shelf-card className="w-[min(78vw,17rem)] shrink-0 snap-start">
              <article className="relative flex h-full flex-col gap-4 rounded-3xl p-3 pb-6" style={{ background: `var(--color-${item.tone})` }}>
                <Ribbon tone={RIBBON[item.tone] ?? "blue"} className="absolute -top-3 right-6 z-10 h-16 w-6" />
                <div className="relative aspect-[240/370] overflow-hidden rounded-xl bg-paper">
                  <Image
                    src={screenImages[item.screen]}
                    alt={screens[item.screen].alt}
                    fill
                    sizes="(min-width: 768px) 260px, 75vw"
                    placeholder="blur"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 px-1">
                  {item.tags.map((tag, tagIndex) => (
                    <span key={tag} className={`rounded-full px-3 py-1 text-xs font-bold ${TAG[(tagIndex + index) % 2]}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="statement px-1">{item.title}</h3>
                <p className="px-1 text-[0.95rem] leading-snug font-semibold">{item.body}</p>
              </article>
            </li>
          ))}
        </CardShelf>
      </section>
    </div>
  );
}
