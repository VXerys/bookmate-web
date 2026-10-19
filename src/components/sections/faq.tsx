import { WavyUnderline } from "@/components/art/doodles";
import { faq } from "@/content/story";

// The FAQ as the book's index. Native <details>: opens with mouse, keyboard, and without JavaScript (F-007 AC-004).
// The underline is static (no data-draw), so it never waits on a timeline.
export function Faq() {
  return (
    <section id="indeks" data-chapter="indeks" className="slab grid gap-12 bg-peach-pale px-4 py-24 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:px-10">
      <div className="flex flex-col gap-4">
        <h2 className="label">{faq.kicker}</h2>
        <p className="statement">{faq.title}</p>
        <p className="hand mt-4 flex max-w-xs -rotate-2 flex-col text-3xl text-blue" aria-hidden="true">
          {faq.note}
          <WavyUnderline data-draw={undefined} className="mt-1 h-3 w-48 text-ember" />
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {faq.items.map((item, index) => (
          <details key={item.question} className="group rounded-3xl border-[2.5px] border-ink bg-paper px-5 py-1 shadow-[4px_4px_0_var(--color-ink)] transition-[translate,box-shadow] open:translate-x-[2px] open:translate-y-[2px] open:shadow-[2px_2px_0_var(--color-ink)]">
            <summary className="flex min-h-14 cursor-pointer list-none items-baseline gap-3 py-4 text-xl font-medium [&::-webkit-details-marker]:hidden">
              <span className="label w-6 shrink-0 text-slate" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item.question}</span>
              <span className="mx-2 flex-1 translate-y-[-0.2em] border-b-2 border-dotted border-ink/40" aria-hidden="true" />
              <span className="font-display text-3xl leading-none transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="max-w-2xl pb-5 pl-9 text-lg">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
