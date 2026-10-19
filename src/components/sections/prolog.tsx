"use client";

import Image from "next/image";
import { useRef } from "react";

import { Book3D } from "@/components/art/book3d";
import { HeroBackdrop } from "@/components/art/hero-backdrop";
import { CircleText } from "@/components/art/circle-text";
import { Starburst } from "@/components/art/starburst";
import { HandNote } from "@/components/motion/hand-note";
import { PopTitle } from "@/components/motion/pop-title";
import { memojiImages } from "@/components/site/app-images";
import { ButtonAlt } from "@/components/site/button-alt";
import { LogoMark } from "@/components/site/logo";
import { PhoneFrame } from "@/components/site/phone-frame";
import { shelfBook } from "@/components/site/shelf";
import { shell } from "@/content/shell";
import { site } from "@/content/site";
import { prolog } from "@/content/story";
import { ENERGY, gsap, LAND, MOTION_OK, POINTER_MOTION, useGSAP } from "@/lib/motion/gsap";
import { whenIntroDone } from "@/lib/motion/intro-state";

// Three real covers from the demo shelf around the phone; each trails the page its own way as the hero scrolls off.
const HERO_BOOKS = [
  { book: shelfBook("aCourtOfThornsAndRoses"), spot: "top-[2%] left-[0%]", size: "text-[clamp(8px,0.95vw,13px)]", pose: "rotateX(14deg) rotateY(-32deg) rotateZ(-14deg)", depth: 1.3, drift: { x: -0.06, y: 1.1, r: -14, yaw: 16 } },
  { book: shelfBook("remarkablyBrightCreatures"), spot: "right-[-4%] bottom-[6%]", size: "text-[clamp(8px,1vw,14px)]", pose: "rotateX(-10deg) rotateY(30deg) rotateZ(16deg)", depth: 0.9, drift: { x: 0.08, y: 1.5, r: 12, yaw: -18 } },
  { book: shelfBook("thePumpkinSpiceCafe"), spot: "bottom-[0%] left-[6%]", size: "text-[clamp(6px,0.7vw,10px)]", pose: "rotateX(8deg) rotateY(-24deg) rotateZ(-22deg)", depth: 1.6, drift: { x: -0.1, y: 1.7, r: -18, yaw: 20 } },
] as const;

const FACES = [
  { id: "2", spot: "top-[30%] -left-[8%]", size: "size-[clamp(3.5rem,6vw,5.5rem)]", tone: "bg-highlight" },
  { id: "21", spot: "-top-[2%] right-[22%]", size: "size-[clamp(3rem,5vw,4.5rem)]", tone: "bg-white" },
] as const;

// The cover of the story (F-014): the BookMate-blue page with rolling swells sits under the opening scribbles, the
// title lands word by word, the phone and three real books from the demo shelf tumble in with the club stamp and a sale
// sticker, and the white wave seams into the page below. Scrolling away lifts the books out of the top of the screen.
export function Prolog() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const bg = section.querySelector<HTMLElement>("[data-hero-bg]");
      const visual = section.querySelector<HTMLElement>("[data-hero-visual]");
      const fades = section.querySelectorAll<HTMLElement>("[data-hero-fade]");
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        if (!document.documentElement.classList.contains("js")) return;
        gsap.set(fades, { autoAlpha: 0, y: "-0.75em" });
        if (visual) gsap.set(visual, { autoAlpha: 0, y: "5em", rotate: -30 });
        section.dataset.heroReady = "";

        // The intro callback can fire outside this context (from completeIntro), so its timeline is killed by hand.
        let intro: gsap.core.Timeline | undefined;
        const stop = whenIntroDone(() => {
          intro = gsap.timeline();
          intro.to(fades, { autoAlpha: 1, y: 0, duration: 0.35, ease: ENERGY, stagger: 0.075 }, 0.45);
          if (visual) intro.to(visual, { autoAlpha: 1, y: 0, rotate: 0, duration: 1.2, ease: LAND }, 0.3);
        });

        // Scroll hand-off: the books rise faster than the page (foreground parallax), so each one leaves through the top
        // edge of the screen while the hero is still in view; nothing fades, the reader never watches a book vanish.
        const exit = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.8, invalidateOnRefresh: true } });
        gsap.utils.toArray<HTMLElement>("[data-hero-book]", section).forEach((book, i) => {
          const drift = HERO_BOOKS[i].drift;
          const box = book.querySelector<HTMLElement>(".book3d-box");
          exit.to(book, { x: () => section.offsetWidth * drift.x, y: () => -window.innerHeight * drift.y, rotation: drift.r }, 0);
          if (box) exit.to(box, { rotationY: `+=${drift.yaw}`, rotationX: "+=8" }, 0);
        });
        exit.to("[data-hero-phone]", { yPercent: 12, rotation: 8, scale: 0.94 }, 0).to("[data-hero-copy]", { yPercent: -18, autoAlpha: 0.2 }, 0);

        return () => {
          stop();
          intro?.kill();
          gsap.set([bg, visual, ...fades].filter(Boolean), { clearProps: "clipPath,opacity,visibility,transform" });
          delete section.dataset.heroReady;
        };
      });

      // The books and the phone lean toward the pointer at different depths.
      mm.add(`${POINTER_MOTION} and (min-width: 992px)`, () => {
        const layers = gsap.utils.toArray<HTMLElement>("[data-hero-depth]", section).map((layer) => ({
          x: gsap.quickTo(layer, "x", { duration: 0.9, ease: "power3" }),
          y: gsap.quickTo(layer, "y", { duration: 0.9, ease: "power3" }),
          depth: Number(layer.dataset.heroDepth),
        }));
        const onMove = (event: PointerEvent) => {
          const nx = event.clientX / window.innerWidth - 0.5;
          const ny = event.clientY / window.innerHeight - 0.5;
          layers.forEach((layer) => {
            layer.x(nx * 60 * layer.depth);
            layer.y(ny * 40 * layer.depth);
          });
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="prolog" data-chapter="prolog" className="relative isolate z-10 min-h-[min(100svh,64rem)] overflow-hidden">
      <div data-hero-bg className="absolute inset-0 -z-10">
        <HeroBackdrop />
      </div>

      <div className="mx-auto grid min-h-[inherit] max-w-[84rem] items-center gap-12 px-6 pt-28 pb-32 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <div data-hero-copy className="flex flex-col items-start gap-6 will-change-transform">
          <p data-hero-fade className="label inline-flex items-center gap-2 rounded-full bg-white py-2 pr-4 pl-2 text-navy">
            <span className="grid size-6 place-items-center rounded-full bg-highlight">
              <span className="size-2 rounded-full bg-navy" />
            </span>
            {prolog.eyebrow}
          </p>
          <PopTitle as="h1" intro className="display max-w-[11ch] text-white">
            {prolog.headlineLead} <em>{prolog.headlineEmphasis}</em>
          </PopTitle>
          {/* 1.2rem bold is WCAG large text, so white passes AA on the brand blue. */}
          <p data-hero-fade className="max-w-[30rem] text-[1.2rem] leading-snug font-bold text-white">
            {prolog.body}
          </p>
          <div data-hero-fade className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonAlt href={site.app.playStoreUrl} cursorLabel={shell.header.cta} size="lg">
              {shell.footer.download}
            </ButtonAlt>
            <a href="#buku" className="group inline-flex h-15 items-center gap-3 text-[1.2rem] font-bold text-white">
              <span className="underline decoration-highlight decoration-2 underline-offset-[6px] transition-[text-underline-offset] group-hover:underline-offset-[10px]">{prolog.secondary}</span>
              <span className="grid size-10 place-items-center rounded-full bg-navy/40 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true">
                <svg viewBox="0 0 10 12" className="w-3">
                  <path d="M5 1v9M1.5 6.5 5 10l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
          <ul data-hero-fade className="flex flex-wrap gap-2">
            {prolog.chips.map((chip) => (
              <li key={chip} className="rounded-full bg-navy/35 px-3.5 py-1.5 text-sm font-bold text-white">
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div data-hero-visual className="relative mx-auto h-[min(66svh,34rem)] w-full max-w-[30rem]" aria-hidden="true">
          <div data-hero-depth="0.4" className="absolute inset-0 flex items-center justify-center">
            <div data-hero-phone className="w-[min(50vw,13.5rem)] rotate-[5deg] will-change-transform">
              <PhoneFrame screen="onboarding" eager decorative sizes="(min-width: 992px) 240px, 52vw" />
            </div>
          </div>
          {HERO_BOOKS.map(({ book, spot, size, pose, depth }) => (
            <div key={book.key} data-hero-depth={depth} className={`absolute ${spot} ${size}`}>
              <div data-hero-book className="will-change-transform">
                <Book3D cover={book.cover} color={book.color} pose={pose} eager />
              </div>
            </div>
          ))}
          {FACES.map((face) => (
            <div key={face.id} data-hero-depth="1.1" className={`absolute ${face.spot}`}>
              <div data-pop="intro">
                <div data-float className={`${face.size} overflow-hidden rounded-full ${face.tone} ring-4 ring-white`}>
                  <Image src={memojiImages[face.id]} alt="" sizes="88px" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          ))}
          <div className="absolute -top-6 -left-4 w-[clamp(6.5rem,10vw,9rem)] lg:-left-14">
            <div data-pop="intro">
              <CircleText id="hero-stamp" text={prolog.stamp} tone="white" ink="blue" className="aspect-square w-full">
                <LogoMark className="w-full text-blue" />
              </CircleText>
            </div>
          </div>
          <div className="absolute -right-2 top-[18%] w-[clamp(5.5rem,8vw,7.5rem)]">
            <div data-pop="intro">
              <Starburst tone="highlight" text="navy" className="aspect-square w-full -rotate-12 font-display text-[clamp(1rem,1.5vw,1.35rem)]">
                {prolog.sticker}
              </Starburst>
            </div>
          </div>
          <HandNote intro decorative delay={0.6} className="absolute right-[4%] -bottom-10 rotate-[-5deg] !text-white text-[clamp(1.3rem,1.8vw,1.7rem)]">
            {prolog.note}
          </HandNote>
        </div>
      </div>
    </section>
  );
}
