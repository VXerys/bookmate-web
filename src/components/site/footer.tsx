import { LogoMark } from "@/components/site/logo";
import { ButtonAlt } from "@/components/site/button-alt";
import { shell } from "@/content/shell";
import { site } from "@/content/site";

// Sticky at the bottom underneath the page layer (see layout), so the rounded last section lifts away to reveal it.
// Pure CSS for the reveal: it reads the same with reduced motion or without JavaScript (AC-019); the epilog adds a
// gentle parallax on [data-footer-inner] when motion is allowed.
export function Footer() {
  return (
    <footer className="sticky bottom-0 z-0 overflow-hidden bg-blue text-ink">
      <div data-footer-inner className="flex min-h-[70svh] flex-col justify-between gap-12 px-6 pt-40 pb-8 lg:px-10">
        <div className="flex flex-col items-start gap-6">
          <p className="heading max-w-4xl text-[clamp(1.9rem,4.1vw,4.25rem)] text-paper [overflow-wrap:anywhere]">{site.tagline}</p>
          <ButtonAlt href={site.app.playStoreUrl} cursorLabel={shell.header.cta} tone="highlight" size="lg">
            {shell.footer.download}
          </ButtonAlt>
        </div>
        <div className="flex flex-col gap-6">
          <p className="flex items-center gap-[0.15em] font-display text-[clamp(3.25rem,15vw,14rem)] leading-[0.8] font-extrabold tracking-tight text-paper" aria-hidden="true">
            <LogoMark className="w-[0.8em] text-paper" />
            {site.name}
          </p>
          <div className="label flex flex-wrap items-center justify-between gap-4">
            <p>
              {shell.footer.madeBy} {site.publisher} · © {shell.footer.copyrightYear} {site.publisher}
            </p>
            <a href="#prolog" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
              {shell.footer.backToTop}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
