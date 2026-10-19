"use client";

import Image from "next/image";
import { useRef } from "react";

import { Book3D } from "@/components/art/book3d";
import { Hills } from "@/components/art/hills";
import { CircleText } from "@/components/art/circle-text";
import { Starburst } from "@/components/art/starburst";
import { Waves } from "@/components/art/waves";
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

// Three real covers from the demo shelf around the phone; each flies outward its own way as the hero scrolls off.
const HERO_BOOKS = [
  { book: shelfBook("aCourtOfThornsAndRoses"), spot: "top-[2%] left-[0%]", size: "text-[clamp(8px,0.95vw,13px)]", pose: "rotateX(14deg) rotateY(-32deg) rotateZ(-14deg)", depth: 1.3, out: { x: -260, y: -120, r: -40 } },
  { book: shelfBook("remarkablyBrightCreatures"), spot: "right-[-4%] bottom-[6%]", size: "text-[clamp(8px,1vw,14px)]", pose: "rotateX(-10deg) rotateY(30deg) rotateZ(16deg)", depth: 0.9, out: { x: 280, y: 160, r: 36 } },
  { book: shelfBook("thePumpkinSpiceCafe"), spot: "bottom-[0%] left-[6%]", size: "text-[clamp(6px,0.7vw,10px)]", pose: "rotateX(8deg) rotateY(-24deg) rotateZ(-22deg)", depth: 1.6, out: { x: -220, y: 220, r: -60 } },
] as const;

const FACES = [
  { id: "2", spot: "top-[30%] -left-[8%]", size: "size-[clamp(3.5rem,6vw,5.5rem)]", tone: "bg-highlight" },
  { id: "21", spot: "-top-[2%] right-[22%]", size: "size-[clamp(3rem,5vw,4.5rem)]", tone: "bg-white" },
] as const;

// The cover of the story (F-014): the BookMate-blue page with rolling hills opens from a corner, the title lands word by word, the phone and
// three real books from the demo shelf tumble in with the club stamp and a sale sticker, and the waves along the bottom
// roll into the white page below. Scrolling away sends the books flying and the phone sinking (cinematic hand-off).
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
        const wide = window.matchMedia("(min-width: 992px)").matches;
        if (bg && wide) gsap.set(bg, { clipPath: "ellipse(20% 0% at 100% 100%)" });
        gsap.set(fades, { autoAlpha: 0, y: "-0.75em" });
        if (visual) gsap.set(visual, { autoAlpha: 0, y: "5em", rotate: -30 });
        section.dataset.heroReady = "";

        // The intro callback can fire outside this context (from completeIntro), so its timeline is killed by hand.
        let intro: gsap.core.Timeline | undefined;
        const stop = whenIntroDone(() => {
          intro = gsap.timeline();
          if (bg && wide) intro.to(bg, { clipPath: "ellipse(150% 130% at 100% 100%)", duration: 1.1, ease: "circ.out" }, 0);
          intro.to(fades, { autoAlpha: 1, y: 0, duration: 0.35, ease: ENERGY, stagger: 0.075 }, 0.45);
          if (visual) intro.to(visual, { autoAlpha: 1, y: 0, rotate: 0, duration: 1.2, ease: LAND }, 0.3);
        });

        // Scroll hand-off: books scatter, the phone sinks and turns, the copy lifts away a little faster than the page.
        const exit = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.8 } });
        gsap.utils.toArray<HTMLElement>("[data-hero-book]", section).forEach((book, i) => {
          const out = HERO_BOOKS[i].out;
          exit.to(book, { x: out.x, y: out.y, rotation: out.r, scale: 1.15 }, 0);
        });
        exit.to("[data-hero-phone]", { yPercent: 22, rotation: 10, scale: 0.9 }, 0).to("[data-hero-copy]", { yPercent: -18, autoAlpha: 0.2 }, 0);

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
    <section ref={root} id="prolog" data-chapter="prolog" className="relative isolate min-h-[min(100svh,68rem)] overflow-hidden">
      <div data-hero-bg className="absolute inset-0 -z-10 bg-blue">
        <Hills className="absolute inset-0" />
        {/* The white wave is the seam into the page below, so the hero never ends on a straight edge. */}
        <Waves className="absolute inset-x-0 -bottom-px h-[14%] min-h-20" layers={[{ tone: "white", base: 230, amplitude: 34 }]} />
      </div>

      <div className="mx-auto grid min-h-[inherit] max-w-[84rem] items-center gap-12 px-6 pt-28 pb-36 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div data-hero-copy className="flex flex-col items-start gap-7">
          <PopTitle as="h1" intro className="display text-white">
            {prolog.headlineLead} <em className="text-highlight">{prolog.headlineEmphasis}</em>
          </PopTitle>
          <p data-hero-fade className="max-w-md text-[1.2rem] leading-snug font-bold text-white lg:text-[1.3rem]">
            {prolog.body}
          </p>
          <div data-hero-fade className="flex flex-wrap items-center gap-3">
            <ButtonAlt href={site.app.playStoreUrl} cursorLabel={shell.header.cta} size="lg">
              {shell.footer.download}
            </ButtonAlt>
            <a href="#buku" className="inline-flex h-15 items-center rounded-full px-7 text-[1.2rem] font-bold text-white ring-2 ring-white/80 ring-inset transition-colors duration-300 hover:bg-white hover:text-navy">
              {prolog.secondary}
            </a>
          </div>
        </div>

        <div data-hero-visual className="relative mx-auto h-[min(66svh,34rem)] w-full max-w-[30rem]" aria-hidden="true">
          <div data-hero-depth="0.4" className="absolute inset-0 flex items-center justify-center">
            <div data-hero-phone className="w-[min(50vw,13.5rem)] rotate-[5deg]">
              <PhoneFrame screen="onboarding" eager decorative sizes="(min-width: 992px) 240px, 52vw" />
            </div>
          </div>
          {HERO_BOOKS.map(({ book, spot, size, pose, depth }) => (
            <div key={book.key} data-hero-depth={depth} className={`absolute ${spot} ${size}`}>
              <div data-hero-book>
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
