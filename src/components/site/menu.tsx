"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type MouseEvent } from "react";
import { createPortal } from "react-dom";

import { navigateTo } from "@/components/motion/slice-transition";
import { lockScroll, unlockScroll } from "@/components/motion/smooth-scroll";
import { chapterNumber, navChapters } from "@/content/navigation";
import { shell } from "@/content/shell";
import { EASE_OUT, gsap, MOTION_OK } from "@/lib/motion/gsap";

const DESKTOP = "(min-width: 768px)";
const FOCUSABLE = "a[href], button:not([disabled])";
// False during server render and hydration, true afterwards, without a setState-in-effect round trip.
const noSubscription = () => () => {};

export function Menu() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  // When a link sends the visitor to a chapter, focus belongs to that chapter, not back on the toggle (AC-013).
  const returnFocus = useRef(true);
  const wasOpen = useRef(false);
  // The panel is portalled to <body>: the header is transformed while it slides, which would make a fixed child
  // position against the header instead of the viewport.
  const mounted = useSyncExternalStore(noSubscription, () => true, () => false);

  const close = useCallback((restoreFocus = true) => {
    returnFocus.current = restoreFocus;
    setOpen(false);
  }, []);

  useEffect(() => {
    const el = panel.current;
    if (!el || open === wasOpen.current) return;
    wasOpen.current = open;
    if (open) {
      lockScroll("menu");
      const links = el.querySelectorAll<HTMLElement>("[data-menu-item]");
      if (window.matchMedia(MOTION_OK).matches) {
        gsap.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "expo.inOut" });
        // opacity, not autoAlpha: a visibility-hidden link cannot take the focus moved to it below.
        gsap.fromTo(links, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: EASE_OUT, stagger: 0.05, delay: 0.25 });
      }
      el.querySelector<HTMLElement>("[data-menu-item]")?.focus();
      return;
    }
    unlockScroll("menu");
    gsap.killTweensOf(el);
    gsap.set(el, { clearProps: "clipPath" });
    if (returnFocus.current) toggle.current?.focus({ preventScroll: true });
    returnFocus.current = true;
  }, [open, mounted]);

  // Crossing into the desktop layout, where the header shows the links, closes the menu (EC-005).
  useEffect(() => {
    const query = window.matchMedia(DESKTOP);
    const onChange = () => {
      if (query.matches) close(false);
    };
    // resize as well: not every engine (nor viewport emulation) fires the media query change event on a resize.
    query.addEventListener("change", onChange);
    window.addEventListener("resize", onChange);
    return () => {
      query.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
      unlockScroll("menu");
    };
  }, [close]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab" || !panel.current) return;
    // Focus trap: Tab past the last control returns to the first, Shift+Tab before the first goes to the last.
    const items = [...panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
    const first = items[0];
    const last = items.at(-1);
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const onLink = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    // The slice covers the screen first, so the menu disappears behind the strips instead of popping away.
    const travelled = navigateTo(id, { onCovered: () => close(false) });
    if (!travelled) close();
  };

  return (
    <>
      <button
        ref={toggle}
        type="button"
        aria-expanded={open}
        aria-controls="menu-panel"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-ink/20 px-4 text-sm md:hidden"
      >
        {shell.menu.open}
      </button>
      {mounted &&
        createPortal(
            <div
              ref={panel}
              id="menu-panel"
              role="dialog"
              aria-modal="true"
              aria-label={shell.menu.label}
              hidden={!open}
              onKeyDown={onKeyDown}
              className="fixed inset-0 z-[70] flex flex-col bg-ink px-4 pt-3 pb-10 text-paper"
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => close()}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-paper/30 px-4 text-sm"
                >
                  {shell.menu.close}
                </button>
              </div>
              <nav aria-label={shell.header.navLabel} className="mt-auto">
                <ul className="flex flex-col gap-2">
                  {navChapters.map((chapter) => (
                    <li key={chapter.id} className="overflow-hidden">
                      <a
                        data-menu-item
                        href={`#${chapter.id}`}
                        onClick={(event) => onLink(event, chapter.id)}
                        className="flex min-h-11 items-baseline gap-4 py-1"
                      >
                        <span className="label text-peach">{chapterNumber(chapter.id)}</span>
                        <span className="statement">{chapter.navLabel}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>,
          document.body,
        )}
    </>
  );
}
