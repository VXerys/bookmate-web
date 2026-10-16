// WCAG 2.x thresholds; "large" means at least 24px regular or 18.66px bold.
export const WCAG_AA = { normal: 4.5, large: 3 } as const;

export type TextSize = keyof typeof WCAG_AA;

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number {
  const match = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
  if (!match) throw new Error(`Expected a #rrggbb color, got "${hex}"`);
  const [r, g, b] = match.slice(1).map((part) => channel(parseInt(part, 16)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number {
  const [light, dark] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

export function meetsAA(text: string, background: string, size: TextSize): boolean {
  return contrastRatio(text, background) >= WCAG_AA[size];
}
