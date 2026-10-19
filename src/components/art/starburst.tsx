import type { ReactNode } from "react";

type StarburstProps = {
  // Palette token names, so the sticker follows the theme.
  tone: string;
  text?: string;
  points?: number;
  // Seconds per turn; negative turns the other way. Ambient motion reads it from data-spin.
  spin?: number;
  className?: string;
  children?: ReactNode;
};

const r2 = (value: number) => Math.round(value * 100) / 100;

// A sale-sticker seal (F-014 FR-003): a many-pointed star whose round stroke softens the tips. Only the shape turns;
// the label stays upright on top of it. Pure markup, so it renders the same on the server and with reduced motion.
export function Starburst({ tone, text = "ink", points = 14, spin = 18, className, children }: StarburstProps) {
  const outer = 96;
  const inner = 80;
  const vertices = Array.from({ length: points * 2 }, (_, i) => {
    const radius = i % 2 ? inner : outer;
    const angle = (Math.PI * i) / points - Math.PI / 2;
    return `${r2(100 + radius * Math.cos(angle))},${r2(100 + radius * Math.sin(angle))}`;
  }).join(" ");

  return (
    <div className={`relative grid place-items-center ${className ?? ""}`}>
      <svg viewBox="0 0 200 200" data-spin={spin} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <polygon points={vertices} fill={`var(--color-${tone})`} stroke={`var(--color-${tone})`} strokeWidth="10" strokeLinejoin="round" />
      </svg>
      <div className="relative text-center leading-none font-extrabold" style={{ color: `var(--color-${text})` }}>
        {children}
      </div>
    </div>
  );
}
