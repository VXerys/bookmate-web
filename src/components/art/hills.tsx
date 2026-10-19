type Hill = {
  // Any CSS colour; tints of the brand blue are mixed in CSS so the palette keeps its single blue token.
  fill: string;
  shapes: readonly [string, ...string[]];
  // Parallax fraction read by ambient motion (data-speed): far hills drift less than near ones.
  speed: number;
};

// A lighter range behind and a deeper ridge in front give depth without washing the brand blue out to lavender.
const LIGHT = "color-mix(in srgb, var(--color-blue) 82%, var(--color-white))";
const PALE = "color-mix(in srgb, var(--color-blue) 78%, var(--color-navy))";

// Big rolling hills behind the hero (F-014, after the reference's hero landscape): a lighter blue range across the
// back, a deeper ridge in front, and a small yellow hill. Each layer morphs between its shapes while on screen and
// drifts at its own depth while scrolling. The first shape is the static, reduced-motion state.
const HILLS: readonly Hill[] = [
  {
    fill: LIGHT,
    speed: 0.08,
    shapes: [
      "M-60 960 L-60 560 C 60 470 170 330 310 300 C 470 265 540 430 660 410 C 800 385 820 160 980 125 C 1140 92 1210 270 1300 335 C 1380 395 1430 300 1500 270 L1500 960 Z",
      "M-60 960 L-60 500 C 100 420 200 360 340 350 C 480 340 560 480 680 450 C 820 420 860 210 1000 180 C 1150 150 1200 310 1290 370 C 1370 420 1440 350 1500 320 L1500 960 Z",
      "M-60 960 L-60 600 C 50 510 150 380 280 330 C 420 280 520 390 640 370 C 770 350 790 120 950 95 C 1120 70 1230 240 1310 310 C 1390 370 1440 260 1500 230 L1500 960 Z",
    ],
  },
  {
    fill: PALE,
    speed: 0.18,
    shapes: [
      "M-60 960 L-60 720 C 110 650 250 570 390 600 C 530 630 570 770 730 750 C 890 730 910 570 1070 550 C 1230 530 1310 660 1500 620 L1500 960 Z",
      "M-60 960 L-60 680 C 130 620 260 610 400 640 C 540 670 600 720 750 700 C 900 680 940 600 1090 590 C 1240 580 1320 610 1500 580 L1500 960 Z",
      "M-60 960 L-60 750 C 90 690 230 540 380 560 C 520 580 560 800 720 790 C 880 780 890 540 1050 515 C 1210 490 1300 700 1500 660 L1500 960 Z",
    ],
  },
  {
    fill: "var(--color-highlight)",
    speed: 0.28,
    shapes: [
      "M520 960 C 570 850 650 770 740 775 C 840 780 890 870 930 960 Z",
      "M500 960 C 560 830 660 740 750 750 C 850 760 910 860 950 960 Z",
      "M540 960 C 580 870 640 800 730 800 C 830 800 880 880 910 960 Z",
    ],
  },
];

export function Hills({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 960" preserveAspectRatio="xMidYMax slice" className={`pointer-events-none block h-full w-full ${className ?? ""}`} aria-hidden="true">
      {HILLS.map((hill, index) => (
        <g key={hill.fill} data-speed={hill.speed}>
          {/* The back range sits lower so the main blue fills the top half, as the reference's base colour does. */}
          <path d={hill.shapes[0]} data-morph={hill.shapes.slice(1).join("|")} transform={index === 0 ? "translate(0 90)" : undefined} style={{ fill: hill.fill }} />
        </g>
      ))}
    </svg>
  );
}
