"use client";

import { useRef, useState } from "react";

import { chapterNumber, chapters, navChapters } from "@/content/navigation";
import { Magnetic } from "@/components/motion/magnetic";
import { CtaLink } from "@/components/site/cta-link";
import { Menu } from "@/components/site/menu";
import { shell } from "@/content/shell";
import { site } from "@/content/site";
import { EASE_OUT, gsap, MOTION_OK, useGSAP } from "@/lib/motion/gsap";

// Past this scroll depth the header may slide away on downward scroll (AC-006).
const HIDE_AFTER_PX = 120;

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

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        let hidden = false;
        let focused = false;
        const slide = (hide: boolean) => {
          const next = hide && !focused;
          if (next === hidden) return;
          hidden = next;
          gsap.to(header, { yPercent: next ? -110 : 0, duration: 0.6, ease: EASE_OUT, overwrite: true });
        };
        // A plain scroll listener: Lenis drives native scroll, and no trigger range can go stale as pins resize the page.
        let lastY = window.scrollY;
        const onScroll = () => {
          const y = window.scrollY;
          if (y !== lastY) slide(y > HIDE_AFTER_PX && y > lastY);
          lastY = y;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        // A keyboard user tabbing into a hidden header must see where focus is (AC-006).
        const onFocusIn = () => {
          focused = true;
          slide(false);
        };
        const onFocusOut = (event: FocusEvent) => {
          if (!header.contains(event.relatedTarget as Node | null)) focused = false;
        };
        header.addEventListener("focusin", onFocusIn);
        header.addEventListener("focusout", onFocusOut);
        return () => {
          window.removeEventListener("scroll", onScroll);
          header.removeEventListener("focusin", onFocusIn);
          header.removeEventListener("focusout", onFocusOut);
          gsap.set(header, { yPercent: 0 });
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
    <header
      ref={root}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 will-change-transform"
    >
      {/* Floating pills instead of a bar, so every coloured section shows through around them. */}
      <div className="flex items-center gap-3 px-3 py-3 md:px-6">
        <a
          href="#prolog"
          className="pointer-events-auto inline-flex min-h-11 items-center gap-2 rounded-full border-[2.5px] border-ink bg-paper px-4 font-display text-xl font-extrabold tracking-tight"
          aria-label={`${site.name}, ${shell.header.homeLabel}`}
        >
          <svg viewBox="0 0 24 24" className="size-6 text-blue" aria-hidden="true">
            <path d="M5 4 h10 a3 3 0 0 1 3 3 v13 h-11 a2 2 0 0 1 -2 -2 Z" fill="currentColor" stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" />
            <path d="M8 4 v12 M18 16 h-11 a2 2 0 0 0 0 4" fill="none" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {site.name}
        </a>
        <p className="label pointer-events-auto hidden rounded-full border-[2.5px] border-ink bg-paper px-3 py-2 lg:block" aria-hidden="true">
          {chapterNumber(active)} — {activeLabel}
        </p>
        <nav aria-label={shell.header.navLabel} className="pointer-events-auto mx-auto hidden md:block">
          <ul className="flex items-center gap-1.5">
            {navChapters.map((chapter) => (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  aria-current={active === chapter.id ? "location" : undefined}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border-[2.5px] border-ink bg-paper px-4 text-sm font-semibold transition-colors hover:bg-sky aria-[current=location]:bg-ink aria-[current=location]:text-paper"
                >
                  {chapter.navLabel}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Below 640px the menu carries the download link, so the bar fits a 360px phone. */}
        <div className="pointer-events-auto ml-auto hidden sm:block md:ml-0">
          <Magnetic>
            <CtaLink href={site.app.playStoreUrl} cursorLabel={shell.header.cta} size="sm">
              {shell.header.cta}
            </CtaLink>
          </Magnetic>
        </div>
        <div className="pointer-events-auto ml-auto sm:ml-0">
          <Menu />
        </div>
      </div>
    </header>
  );
}
