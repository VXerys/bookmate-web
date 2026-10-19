type WaveLayer = {
  // Palette token name.
  tone: string;
  // Resting height of the crest line, in viewBox units from the top (0 to 320).
  base: number;
  amplitude: number;
};

type WavesProps = {
  layers: readonly WaveLayer[];
  className?: string;
};

const r2 = (value: number) => Math.round(value * 100) / 100;

// One filled wave across the 1440-wide box: four smooth humps whose heights follow a sine of the phase, so shifting the
// phase gives another shape with the same number of points, which MorphSVG blends cleanly.
function wave({ base, amplitude }: WaveLayer, phase: number) {
  const humps = 4;
  const step = 1440 / humps;
  const y = (i: number) => r2(base + amplitude * Math.sin(phase + i * 1.7));
  let d = `M0 ${y(0)}`;
  for (let i = 0; i < humps; i += 1) {
    const x0 = i * step;
    d += ` C${r2(x0 + step * 0.35)} ${r2(y(i) - amplitude)} ${r2(x0 + step * 0.65)} ${r2(y(i + 1) + amplitude)} ${r2(x0 + step)} ${y(i + 1)}`;
  }
  return `${d} L1440 320 L0 320 Z`;
}

// Layered waves along a section's bottom edge (F-014 FR-003): each layer carries two more phases of itself in
// data-morph, and ambient motion rolls between them while the waves are on screen. Static under reduced motion.
export function Waves({ layers, className }: WavesProps) {
  return (
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className={`pointer-events-none block w-full ${className ?? ""}`} aria-hidden="true">
      {layers.map((layer, index) => (
        <path
          key={`${layer.tone}-${layer.base}`}
          d={wave(layer, index)}
          data-morph={[wave(layer, index + 2.1), wave(layer, index + 4.2)].join("|")}
          fill={`var(--color-${layer.tone})`}
        />
      ))}
    </svg>
  );
}
