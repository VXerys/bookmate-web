import { Magnetic } from "@/components/motion/magnetic";
import { PrologLayers } from "@/components/motion/prolog-layers";
import { Reveal } from "@/components/motion/reveal";
import { shell } from "@/content/shell";
import { site } from "@/content/site";
import { prolog } from "@/content/story";

export function Prolog() {
  return (
    <section
      id="prolog"
      data-chapter="prolog"
      className="relative grid min-h-svh items-center gap-10 overflow-hidden px-4 pt-24 pb-12 md:grid-cols-[1.15fr_0.85fr] md:px-10"
    >
      <div className="relative z-10 flex flex-col gap-7">
        <p className="label text-slate">{prolog.kicker}</p>
        <Reveal as="h1" className="display text-[clamp(3rem,7.4vw,8.5rem)]" mode="words">
          {prolog.headlineLead} <em>{prolog.headlineEmphasis}</em>
        </Reveal>
        <p className="max-w-md text-lg text-slate">{prolog.body}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Magnetic>
            <a
              href={site.app.playStoreUrl}
              data-cursor-label={shell.header.cta}
              className="inline-flex min-h-11 items-center rounded-full bg-ember px-6 py-3 font-medium text-ink"
            >
              {shell.footer.download}
            </a>
          </Magnetic>
          <a href="#bab" className="inline-flex min-h-11 items-center underline underline-offset-4">
            {prolog.secondary}
          </a>
        </div>
      </div>
      <PrologLayers />
    </section>
  );
}
