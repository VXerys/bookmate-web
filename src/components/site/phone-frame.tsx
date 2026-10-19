import Image from "next/image";

import { screenImages } from "@/components/site/screen-images";
import { screens, type ScreenId } from "@/content/screens";

type PhoneFrameProps = {
  screen: ScreenId;
  className?: string;
  // Above-the-fold frames load eagerly so the hero phone is not an empty shell at first paint.
  eager?: boolean;
  // Purely decorative copies (the prolog collage) are hidden from assistive tech by their container.
  decorative?: boolean;
  sizes?: string;
  // Further screens stacked above the first, hidden until a pinned scene fades them in (data-phone-extra).
  more?: readonly ScreenId[];
};

// Frame colours are mixed from the palette: a titanium edge that catches light on one corner.
const EDGE = "linear-gradient(145deg, color-mix(in srgb, var(--color-navy) 55%, var(--color-white)) 0%, var(--color-navy) 22%, var(--color-navy) 70%, color-mix(in srgb, var(--color-navy) 70%, var(--color-blue)) 100%)";
const BUTTON = "linear-gradient(90deg, color-mix(in srgb, var(--color-navy) 60%, var(--color-white)), var(--color-navy))";

// A CSS device around a real app screenshot (F-014 device pass): a thin titanium edge with side buttons, a dynamic island
// over the screenshot's own status bar, a faint glass glare, and a layered shadow. Every size is a share of the width,
// so the device keeps its proportions from the hero to the feature cards. The inner wrapper (data-phone-screen) is the
// hook for motion that moves the screenshot inside the glass without touching the frame's own transform.
export function PhoneFrame({ screen, className, eager, decorative, sizes = "(min-width: 1024px) 320px, 70vw", more = [] }: PhoneFrameProps) {
  return (
    <div
      className={`relative aspect-[9/19.5] w-full rounded-[16%/7.4%] p-[2.6%] shadow-[inset_0_1px_0_0_rgb(255_255_255/0.25),0_40px_80px_-30px_rgb(3_4_10/0.55),0_16px_28px_-18px_rgb(3_4_10/0.4)] ${className ?? ""}`}
      style={{ background: EDGE }}
    >
      <span className="absolute top-[18%] -left-[1.6%] h-[6%] w-[1.8%] rounded-l-full" style={{ background: BUTTON }} aria-hidden="true" />
      <span className="absolute top-[27%] -left-[1.6%] h-[10%] w-[1.8%] rounded-l-full" style={{ background: BUTTON }} aria-hidden="true" />
      <span className="absolute top-[24%] -right-[1.6%] h-[13%] w-[1.8%] rounded-r-full" style={{ background: BUTTON }} aria-hidden="true" />
      <div className="relative h-full overflow-hidden rounded-[13.5%/6.3%] bg-white ring-1 ring-navy/40">
        <div data-phone-screen className="absolute inset-0">
          <Image
            src={screenImages[screen]}
            alt={decorative ? "" : screens[screen].alt}
            fill
            sizes={sizes}
            loading={eager ? "eager" : undefined}
            fetchPriority={eager ? "high" : undefined}
            placeholder="blur"
            className="object-cover object-top"
          />
        </div>
        {more.map((id) => (
          <div key={id} data-phone-extra className="invisible absolute inset-0 opacity-0">
            <Image src={screenImages[id]} alt={screens[id].alt} fill sizes={sizes} placeholder="blur" className="object-cover object-top" />
          </div>
        ))}
        <span className="absolute top-[1.8%] left-1/2 z-10 h-[3.6%] w-[30%] -translate-x-1/2 rounded-full bg-navy" aria-hidden="true" />
        {/* Glass glare: a soft diagonal sheen that makes the screen read as glass, not a flat picture. */}
        <span className="pointer-events-none absolute inset-0 z-10" style={{ background: "linear-gradient(118deg, rgb(255 255 255 / 0.16) 0%, rgb(255 255 255 / 0.04) 28%, transparent 42%)" }} aria-hidden="true" />
      </div>
    </div>
  );
}
