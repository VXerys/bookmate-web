import { LogoMark } from "@/components/site/logo";
import { navChapters } from "@/content/navigation";
import { shell } from "@/content/shell";
import { site } from "@/content/site";

// Sticky at the bottom underneath the page layer (see layout), so the rounded last section lifts away to reveal it.
// The footer is the brand's sign-off, not a second sales pitch: the epilog above carries the one download button, so
// here Google Play is a plain link beside the chapter links (F-014 owner review). The epilog scrubs the reveal: the
// tagline, link columns, and each letter of the wordmark rise in as the footer opens and sink back when scrolling up.
// Without motion or JavaScript everything simply rests in place.
export function Footer() {
  return (
    <footer className="sticky bottom-0 z-0 overflow-hidden bg-blue text-white">
      <div data-footer-inner className="flex min-h-[70svh] flex-col justify-between gap-12 px-6 pt-32 pb-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <p className="heading max-w-3xl text-[clamp(1.9rem,3.6vw,3.5rem)] [overflow-wrap:anywhere]">
            {site.tagline.split(" ").map((word, index) => (
              <span key={`${word}-${index}`}>
                {index > 0 && " "}
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span data-footer-word className="inline-block">
                    {word}
                  </span>
                </span>
              </span>
            ))}
          </p>
          <div className="grid grid-cols-2 gap-8 font-bold">
            <div data-footer-rise className="flex flex-col gap-3">
              <p className="label text-highlight">{shell.footer.explore}</p>
              <ul className="flex flex-col gap-2">
                {navChapters.map((chapter) => (
                  <li key={chapter.id}>
                    <a href={`#${chapter.id}`} className="underline-offset-4 hover:underline">
                      {chapter.navLabel}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div data-footer-rise className="flex flex-col gap-3">
              <p className="label text-highlight">{shell.footer.app}</p>
              <a href={site.app.playStoreUrl} className="underline-offset-4 hover:underline">
                {shell.footer.download}
              </a>
              <p className="text-white/80">
                {site.app.platform} · v{site.app.version}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="flex items-end gap-[0.12em] overflow-hidden pb-[0.06em] font-display text-[clamp(3.25rem,15vw,14rem)] leading-[0.8] font-extrabold tracking-[-0.04em] text-paper" aria-hidden="true">
            <span data-footer-letter className="inline-block">
              <LogoMark className="w-[0.8em] text-paper" />
            </span>
            <span className="flex">
              {[...site.name].map((letter, index) => (
                <span key={`${letter}-${index}`} data-footer-letter className="inline-block">
                  {letter}
                </span>
              ))}
            </span>
          </p>
          <div data-footer-rise className="label flex flex-wrap items-center justify-between gap-4">
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
