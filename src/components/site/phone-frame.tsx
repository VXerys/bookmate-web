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
};

// A CSS device frame around a real app screenshot. The inner wrapper (data-phone-screen) is the hook for motion that
// moves the screenshot inside the glass without touching the frame's own transform.
export function PhoneFrame({ screen, className, eager, decorative, sizes = "(min-width: 1024px) 320px, 70vw" }: PhoneFrameProps) {
  return (
    <div
      className={`relative aspect-[9/20] w-full rounded-[2.4rem] border-[6px] border-ink bg-ink shadow-[0_30px_80px_-30px_rgb(3_4_10/0.45)] ${className ?? ""}`}
    >
      <div className="absolute top-2 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" aria-hidden="true" />
      <div className="relative h-full overflow-hidden rounded-[1.9rem] bg-peach-pale">
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
      </div>
    </div>
  );
}
