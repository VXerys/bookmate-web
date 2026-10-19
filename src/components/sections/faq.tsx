import { faq } from "@/content/story";

// Native <details>: opens with mouse, keyboard, and without JavaScript (F-007 AC-004).
export function Faq() {
  return (
    <section id="faq" data-chapter="faq" className="flex flex-col gap-10 bg-peach-pale px-4 py-24 md:px-10">
      <h2 className="label">{faq.kicker}</h2>
      <div className="flex max-w-4xl flex-col divide-y divide-ink/15 border-y border-ink/15">
        {faq.items.map((item) => (
          <details key={item.question} className="group py-2">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-3 text-xl [&::-webkit-details-marker]:hidden">
              {item.question}
              <span className="text-2xl transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="max-w-2xl pb-4 text-lg">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
