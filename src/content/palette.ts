// Hex values come from the BookMate app (lib/core/constants/app_colors.dart, app_gradients.dart).
// src/app/globals.css repeats them in @theme; palette.test.ts keeps the two in sync.
export const palette = {
  paper: "#fcf9f4",
  ink: "#03040a",
  peach: "#f6d7ab",
  "peach-pale": "#fff4e6",
  ember: "#ff7f14",
  blue: "#3b6ff5",
  // lightBlue and yellow in app_colors.dart: the morning sky and the highlighter (F-012).
  sky: "#e8eefe",
  highlight: "#ffd700",
  plum: "#52405a",
  forest: "#19382b",
  slate: "#64748b",
} as const;

export type PaletteToken = keyof typeof palette;

// "large" means at least 24px regular or 18.66px bold (WCAG); content stays free of lib imports.
export type TextPair = { text: PaletteToken; background: PaletteToken; size: "normal" | "large" };

// The only text-on-background combinations the UI may use. Ember is a fill, never text on paper
// (2.4:1), and paper text on ember fails too, so ember buttons carry ink text.
export const textPairs: readonly TextPair[] = [
  { text: "ink", background: "paper", size: "normal" },
  { text: "slate", background: "paper", size: "normal" },
  { text: "blue", background: "paper", size: "large" },
  { text: "ink", background: "peach", size: "normal" },
  { text: "ink", background: "peach-pale", size: "normal" },
  { text: "slate", background: "peach-pale", size: "large" },
  { text: "ink", background: "ember", size: "normal" },
  { text: "ink", background: "blue", size: "normal" },
  { text: "ink", background: "sky", size: "normal" },
  { text: "slate", background: "sky", size: "large" },
  { text: "ink", background: "highlight", size: "normal" },
  { text: "paper", background: "blue", size: "large" },
  { text: "paper", background: "ink", size: "normal" },
  { text: "peach", background: "ink", size: "normal" },
  { text: "ember", background: "ink", size: "normal" },
  { text: "blue", background: "ink", size: "normal" },
  { text: "slate", background: "ink", size: "large" },
  { text: "paper", background: "plum", size: "normal" },
  { text: "peach", background: "plum", size: "normal" },
  { text: "ember", background: "plum", size: "large" },
  { text: "paper", background: "forest", size: "normal" },
  { text: "peach", background: "forest", size: "normal" },
  { text: "ember", background: "forest", size: "normal" },
];
