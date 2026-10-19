import { Magnetic } from "@/components/motion/magnetic";
import { shell } from "@/content/shell";
import { site } from "@/content/site";

// Sticky at the bottom underneath the page layer (see layout), so the last chapter lifts away to reveal it. Pure CSS:
// it reads the same with reduced motion or without JavaScript (AC-019).
export function Footer() {
  return (
    <footer className="sticky bottom-0 z-0 flex min-h-[70svh] flex-col justify-between gap-12 bg-ink px-4 pt-16 pb-8 text-paper md:px-10">
      <div className="flex flex-col gap-6">
        <p className="statement max-w-3xl text-peach">{site.tagline}</p>
        <Magnetic className="self-start">
          <a
            href={site.app.playStoreUrl}
            data-cursor-label={shell.header.cta}
            className="inline-flex min-h-11 items-center rounded-full bg-ember px-6 py-3 font-medium text-ink"
          >
            {shell.footer.download}
          </a>
        </Magnetic>
      </div>
      <div className="flex flex-col gap-6">
        <p className="display italic" aria-hidden="true">
          {site.name}
        </p>
        <div className="label flex flex-wrap items-center justify-between gap-4 text-peach">
          <p>
            {shell.footer.madeBy} {site.publisher} · © {shell.footer.copyrightYear} {site.publisher}
          </p>
          <a href="#prolog" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
            {shell.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
