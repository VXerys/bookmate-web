"use client";

import { useRef, useState } from "react";

import { chapterNumber, chapters, navChapters } from "@/content/navigation";
import { shell } from "@/content/shell";
import { site } from "@/content/site";
import { EASE_OUT, gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";

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
      const sections = [...document.querySelectorAll<HTMLElement>("main [data-chapter]")];
      const indicators = sections.map((section) =>
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive && section.dataset.chapter) setActive(section.dataset.chapter);
          },
        }),
      );

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
        const trigger = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => slide(self.scroll() > HIDE_AFTER_PX && self.direction === 1),
        });
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
          trigger.kill();
          header.removeEventListener("focusin", onFocusIn);
          header.removeEventListener("focusout", onFocusOut);
          gsap.set(header, { yPercent: 0 });
        };
      });

      return () => {
        indicators.forEach((indicator) => indicator.kill());
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <header
      ref={root}
      className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur-sm will-change-transform"
    >
      <div className="flex items-center gap-6 px-4 py-3 md:px-10">
        <a href="#prolog" className="inline-flex min-h-11 items-center font-serif text-2xl italic" aria-label={`${site.name}, ${shell.header.homeLabel}`}>
          {site.name}
        </a>
        <p className="label hidden text-slate sm:block" aria-hidden="true">
          {chapterNumber(active)} — {activeLabel}
        </p>
        <nav aria-label={shell.header.navLabel} className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {navChapters.map((chapter) => (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  aria-current={active === chapter.id ? "location" : undefined}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center px-3 text-sm aria-[current=location]:underline aria-[current=location]:underline-offset-4"
                >
                  {chapter.navLabel}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={site.app.playStoreUrl}
          className="ml-auto inline-flex min-h-11 items-center rounded-full bg-ember px-5 text-sm font-medium text-ink md:ml-0"
        >
          {shell.header.cta}
        </a>
      </div>
    </header>
  );
}
