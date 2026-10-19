import type { CSSProperties } from "react";

import { BookCover, type BookPattern, type BookTone } from "@/components/art/books";

type Book3DProps = {
  tone: BookTone;
  pattern: BookPattern;
  id: string;
  className?: string;
  // Size in em, so one font-size on the wrapper scales the whole book.
  width?: number;
  height?: number;
  depth?: number;
  // Resting pose; GSAP animates rotationX/Y/Z on the element itself, the pose sits on the inner box.
  pose?: string;
};

// A hardcover as a CSS 3D box: cover, back, spine, and the three page edges (F-012 FR-006). No WebGL: six faces in
// preserve-3d are enough for books that tumble with scroll and lean toward the pointer. Decorative only.
export function Book3D({ tone, pattern, id, className, width = 10, height = 14, depth = 2.4, pose = "rotateY(-28deg) rotateX(8deg)" }: Book3DProps) {
  const vars = { "--w": `${width}em`, "--h": `${height}em`, "--d": `${depth}em` } as CSSProperties;
  return (
    <div className={`book3d ${className ?? ""}`} style={vars} aria-hidden="true">
      <div className="book3d-box" style={{ transform: pose }}>
        <div className="book3d-face book3d-front">
          <BookCover tone={tone} pattern={pattern} id={id} className="h-full w-full" />
        </div>
        <div className="book3d-face book3d-back" style={{ background: `var(--color-${tone})` }} />
        <div className="book3d-face book3d-spine" style={{ background: `var(--color-${tone})` }} />
        <div className="book3d-face book3d-pages" />
        <div className="book3d-face book3d-top" />
        <div className="book3d-face book3d-bottom" />
      </div>
    </div>
  );
}
