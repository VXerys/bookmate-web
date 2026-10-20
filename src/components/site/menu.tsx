"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type MouseEvent } from "react";
import { createPortal } from "react-dom";

import { navigateTo } from "@/components/motion/slice-transition";
import { lockScroll, unlockScroll } from "@/components/motion/smooth-scroll";
import { chapterNumber, navChapters } from "@/content/navigation";
import { ButtonAlt } from "@/components/site/button-alt";
import { shell } from "@/content/shell";
import { site } from "@/content/site";
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
        className="inline-flex h-11 min-w-11 items-center justify-center rounded-full bg-white px-4 text-sm font-bold shadow-[0_6px_20px_-12px_rgb(3_4_10/0.5)] md:hidden"
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
              className="fixed inset-0 z-[70] flex flex-col bg-blue px-5 pt-3 pb-10 text-white"
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => close()}
                  className="inline-flex h-11 min-w-11 items-center justify-center rounded-full bg-white px-4 text-sm font-bold text-navy"
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
                        className="group flex min-h-11 items-baseline gap-4 py-1.5 outline-none"
                      >
                        <span className="label transition-colors duration-300 group-hover:text-highlight group-focus-visible:text-highlight group-active:text-highlight">
                          {chapterNumber(chapter.id)}
                        </span>
                        <span className="relative font-display text-[clamp(2.5rem,11vw,4.5rem)] leading-[0.95] font-extrabold whitespace-nowrap transition-transform duration-500 ease-(--ease-expo) group-hover:translate-x-3 group-focus-visible:translate-x-3 group-active:translate-x-3">
                          {chapter.navLabel}
                          <span
                            className="absolute inset-x-0 -bottom-1 h-[0.1em] origin-left scale-x-0 rounded-full bg-highlight transition-transform duration-500 ease-(--ease-expo) group-hover:scale-x-100 group-focus-visible:scale-x-100 group-active:scale-x-100"
                            aria-hidden="true"
                          />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              {/* The header hides its download pill below 640px, so the menu carries it. */}
              <div className="mt-8">
                <ButtonAlt href={site.app.playStoreUrl} tone="highlight" size="lg">
                  {shell.footer.download}
                </ButtonAlt>
              </div>
            </div>,
          document.body,
        )}
    </>
  );
}
