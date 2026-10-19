// A bookmark ribbon hanging off the top edge of a card: BookMate's stand-in for the reference's mascot "ears"
// (F-013 Q8). Decorative; the colour is a palette token name.
export function Ribbon({ tone, className }: { tone: string; className?: string }) {
  return (
    <svg viewBox="0 0 28 70" className={className} aria-hidden="true">
      <path d="M0 0 H28 V66 L14 54 L0 66 Z" fill={`var(--color-${tone})`} />
      <path d="M0 0 H28 V6 H0 Z" fill="var(--color-ink)" opacity="0.12" />
    </svg>
  );
}
