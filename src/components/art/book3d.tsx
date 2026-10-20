import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";

type Book3DProps = {
  cover: StaticImageData;
  // The spine and back take the cover's own colour (computed at import, src/content/app-data.ts).
  color: string;
  className?: string;
  // Size in em, so one font-size on the wrapper scales the whole book.
  width?: number;
  height?: number;
  depth?: number;
  // Resting pose; GSAP animates the element itself, the pose sits on the inner box.
  pose?: string;
  eager?: boolean;
};

// A hardcover as a CSS 3D box around a real cover from the app's demo shelf (F-014 FR-001): cover, back, spine, and
// three page edges in preserve-3d. Decorative only; the same books are listed with text in the shelf section.
export function Book3D({ cover, color, className, width = 10, height = 15, depth = 2.2, pose = "rotateY(-28deg) rotateX(8deg)", eager }: Book3DProps) {
  const vars = { "--w": `${width}em`, "--h": `${height}em`, "--d": `${depth}em` } as CSSProperties;
  return (
    <div className={`book3d ${className ?? ""}`} style={vars} aria-hidden="true">
      <div className="book3d-box" style={{ transform: pose }}>
        <div className="book3d-face book3d-front overflow-hidden rounded-r-[0.35em] rounded-l-[0.12em]">
          <Image src={cover} alt="" fill sizes="240px" loading={eager ? "eager" : undefined} className="object-cover" />
          {/* The hinge shadow sells the board's thickness; inline because the palette has no black token. */}
          <span className="absolute inset-y-0 left-0 w-[7%]" style={{ background: "linear-gradient(90deg, rgb(3 4 10 / 0.28), transparent)" }} />
        </div>
        <div className="book3d-face book3d-back" style={{ background: color }} />
        <div className="book3d-face book3d-spine" style={{ background: color }} />
        <div className="book3d-face book3d-pages" />
        <div className="book3d-face book3d-top" />
        <div className="book3d-face book3d-bottom" />
      </div>
    </div>
  );
}
