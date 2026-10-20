import { Starburst } from "@/components/art/starburst";
import { HandNote } from "@/components/motion/hand-note";
import { PopTitle } from "@/components/motion/pop-title";
import { faq } from "@/content/story";

// FAQ as soft blue cards (F-014, reference "common questions"), with a question-mark sticker that pops in and turns.
// Native <details>: opens with mouse, keyboard, and without JavaScript (F-007 AC-004).
export function Faq() {
  return (
    <section id="indeks" data-chapter="indeks" className="grid gap-12 bg-white px-6 py-16 lg:py-20 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:px-10">
      <div className="relative flex flex-col items-start gap-5">
        <PopTitle className="heading">{faq.title}</PopTitle>
        <HandNote decorative className="-rotate-2">
          {faq.note}
        </HandNote>
        <div data-pop className="mt-4 w-28 lg:w-36" aria-hidden="true">
          <Starburst tone="highlight" text="navy" points={10} spin={20} className="aspect-square w-full -rotate-12 font-display text-xl lg:text-2xl">
            {faq.sticker}
          </Starburst>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {faq.items.map((item, index) => (
          <details key={item.question} data-rise={index * 0.08} className="group rounded-[1.125rem] bg-sky px-6 transition-colors open:bg-highlight">
            <summary className="flex min-h-[4.5rem] cursor-pointer list-none items-center justify-between gap-6 py-4 text-[clamp(1.1rem,1.6vw,1.5rem)] font-bold tracking-tight [&::-webkit-details-marker]:hidden">
              {item.question}
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-2xl leading-none transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="max-w-2xl pb-6 text-lg font-semibold">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
