import { type BookPattern, type BookTone } from "@/components/art/books";
import { Ribbon } from "@/components/art/ribbon";
import { TypoCover } from "@/components/art/typo-cover";
import { HandNote } from "@/components/motion/hand-note";
import { PopTitle } from "@/components/motion/pop-title";
import { CardShelf } from "@/components/site/card-shelf";
import { conditionLabel, mockBooks, statusLabel } from "@/content/books";
import { buku } from "@/content/story";

// Card and cover colours cycle so neighbours never match; every card tone carries ink text.
const CARD: readonly BookTone[] = ["coral", "highlight", "green", "sky", "ember", "gold"];
const COVER: readonly BookTone[] = ["peach", "sky", "highlight", "ember", "blue", "coral", "green", "gold"];
const PATTERN: readonly BookPattern[] = ["waves", "dots", "stripes", "sun", "arches", "grid"];

// Books on members' shelves, from the app's demo data (F-013, the reference's "books of the month" slider). Each card
// shows a typographic cover, genre and condition tags, availability, and the app's own blurb.
export function Buku() {
  return (
    <section id="buku" data-chapter="buku" className="bg-white py-28">
      <CardShelf
        id="buku-track"
        label={buku.title}
        previous={buku.previous}
        next={buku.next}
        intro={
          <>
            <PopTitle className="heading">{buku.title}</PopTitle>
            <p className="lead">{buku.lead}</p>
            <HandNote className="-rotate-2">{buku.note}</HandNote>
          </>
        }
      >
        {mockBooks.map((book, index) => {
          const available = book.status === "AVAILABLE";
          return (
            <li key={book.id} data-shelf-card className="w-[min(78vw,16.5rem)] shrink-0 snap-start">
              <article className="relative flex h-full flex-col gap-3 rounded-3xl p-3 pb-5" style={{ background: `var(--color-${CARD[index % CARD.length]})` }}>
                <Ribbon tone={index % 2 ? "blue" : "ink"} className="absolute -top-3 right-6 z-10 h-14 w-5" />
                <TypoCover title={book.title} author={book.author} tone={COVER[index % COVER.length]} pattern={PATTERN[index % PATTERN.length]} id={book.id} />
                <div className="flex flex-wrap gap-1.5 px-1">
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold">{book.genre[0]}</span>
                  <span className="rounded-full bg-ink px-2.5 py-1 text-xs font-bold text-white">{conditionLabel[book.condition]}</span>
                </div>
                <h3 className="statement px-1 text-[1.6rem]">{book.title}</h3>
                <p className="px-1 text-sm font-bold">{book.author}</p>
                <p className="line-clamp-3 px-1 text-[0.9rem] leading-snug font-semibold">{book.description}</p>
                <p className="mt-auto flex items-center gap-2 px-1 text-sm font-bold">
                  <span className={`size-2.5 rounded-full ${available ? "bg-ink" : "bg-white"}`} aria-hidden="true" />
                  {statusLabel[book.status]}
                  <span className="ml-auto rounded-full bg-white/70 px-2 py-0.5 text-[0.65rem] tracking-wider uppercase">{buku.demoLabel}</span>
                </p>
              </article>
            </li>
          );
        })}
      </CardShelf>
    </section>
  );
}
