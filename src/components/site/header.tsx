"use client";

import { useRef, useState } from "react";

import { chapterNumber, chapters, navChapters } from "@/content/navigation";
import { ButtonAlt } from "@/components/site/button-alt";
import { LogoMark } from "@/components/site/logo";
import { Menu } from "@/components/site/menu";
import { shell } from "@/content/shell";
import { site } from "@/content/site";
import { ENERGY, gsap, MOTION_OK, useGSAP } from "@/lib/motion/gsap";
import { whenIntroDone } from "@/lib/motion/intro-state";

export function Header() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(chapters[0].id);
  const activeLabel = chapters.find((chapter) => chapter.id === active)?.label ?? chapters[0].label;

  useGSAP(
    () => {
      const header = root.current;
      if (!header) return;

      // The indicator is information, not motion, so it updates under reduced motion too (AC-007, AC-008).
      // Queried on document: the useGSAP scope limits selector strings to the header, and sections live in <main>.
      // The chapter under the viewport's centre line is read from live layout on scroll, so pinned sections count
      // while pinned; ScrollTriggers made here mounted before the pins and were measured without their spacers (F-011).
      const sections = [...document.querySelectorAll<HTMLElement>("main [data-chapter]")];
      const readChapter = () => {
        const centre = window.innerHeight / 2;
        const current = sections.find((section) => {
          const box = section.getBoundingClientRect();
          return box.top <= centre && box.bottom > centre;
        });
        if (current?.dataset.chapter) setActive(current.dataset.chapter);
      };
      readChapter();
      window.addEventListener("scroll", readChapter, { passive: true });
      window.addEventListener("resize", readChapter);

      // The header stays put while scrolling, like the reference (validated with REA); it only drops in with the intro.
      // The intro callback can fire outside this context, so its tween is killed by hand.
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        let drop: gsap.core.Tween | undefined;
        const stop = whenIntroDone(() => {
          drop = gsap.fromTo(header, { yPercent: -100 }, { yPercent: 0, duration: 0.5, ease: ENERGY, delay: 0.1 });
        });
        return () => {
          stop();
          drop?.kill();
          gsap.set(header, { clearProps: "transform" });
        };
      });

      return () => {
        window.removeEventListener("scroll", readChapter);
        window.removeEventListener("resize", readChapter);
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <header ref={root} className="pointer-events-none fixed inset-x-0 top-0 z-50 will-change-transform">
      {/* Reading progress, scrubbed by ambient motion; hidden until it has a value, so reduced motion shows nothing. */}
      <div data-progress className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-highlight" aria-hidden="true" />
      {/* Floating controls instead of a bar, so every coloured block shows through around them. */}
      <div className="flex items-center gap-2 px-3 py-3 lg:gap-3 lg:px-6">
        <a
          href="#prolog"
          className="pointer-events-auto inline-flex h-11 items-center gap-1.5 rounded-full bg-white py-1 pr-4 pl-2.5 font-display text-xl font-extrabold tracking-tight shadow-[0_6px_20px_-12px_rgb(3_4_10/0.5)]"
          aria-label={`${site.name}, ${shell.header.homeLabel}`}
        >
          {/* The white capsule keeps the blue mark visible over the blue hero, the blue chapters, and the footer. */}
          <LogoMark className="size-7 text-blue" />
          {site.name}
        </a>
        <p className="label pointer-events-auto hidden h-11 items-center rounded-full bg-white px-4 shadow-[0_6px_20px_-12px_rgb(3_4_10/0.5)] xl:inline-flex" aria-hidden="true">
          {chapterNumber(active)} · {activeLabel}
        </p>
        <nav aria-label={shell.header.navLabel} className="pointer-events-auto mx-auto hidden md:block">
          <ul className="flex items-center gap-1 rounded-full bg-white p-1 shadow-[0_6px_20px_-12px_rgb(3_4_10/0.5)]">
            {navChapters.map((chapter) => (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  aria-current={active === chapter.id ? "location" : undefined}
                  className="inline-flex h-9 min-w-11 items-center justify-center rounded-full px-3.5 text-sm font-bold transition-colors hover:bg-peach-pale aria-[current=location]:bg-navy aria-[current=location]:text-white"
                >
                  {chapter.navLabel}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Below 640px the menu carries the download link, so the bar fits a 360px phone. */}
        <div className="pointer-events-auto ml-auto hidden sm:block md:ml-0">
          <ButtonAlt href={site.app.playStoreUrl} cursorLabel={shell.header.cta} size="sm">
            {shell.header.cta}
          </ButtonAlt>
        </div>
        <div className="pointer-events-auto ml-auto sm:ml-0">
          <Menu />
        </div>
      </div>
    </header>
  );
}
