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
  // Saturated and soft pairs for the F-013 colour blocks (white, paleOrange, green, softGreen, red2, softRed, streakGold).
  white: "#ffffff",
  "pale-orange": "#ffecd8",
  green: "#4caf50",
  "soft-green": "#e5f6e5",
  coral: "#ff4d4d",
  "soft-red": "#ffd8d8",
  gold: "#ffb300",
  // Deep navy for text (F-014 palette pass): softer than ink on light blocks, and the night stage behind the tarot cards.
  navy: "#0b1638",
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
  { text: "ink", background: "white", size: "normal" },
  { text: "slate", background: "white", size: "normal" },
  { text: "ink", background: "pale-orange", size: "normal" },
  { text: "ink", background: "green", size: "normal" },
  { text: "ink", background: "soft-green", size: "normal" },
  { text: "ink", background: "coral", size: "normal" },
  { text: "ink", background: "soft-red", size: "normal" },
  { text: "ink", background: "gold", size: "normal" },
  { text: "blue", background: "sky", size: "large" },
  { text: "blue", background: "white", size: "large" },
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
  { text: "navy", background: "white", size: "normal" },
  { text: "navy", background: "paper", size: "normal" },
  { text: "navy", background: "sky", size: "normal" },
  { text: "navy", background: "highlight", size: "normal" },
  { text: "navy", background: "peach", size: "normal" },
  { text: "navy", background: "peach-pale", size: "normal" },
  { text: "navy", background: "gold", size: "normal" },
  { text: "navy", background: "blue", size: "large" },
  { text: "white", background: "blue", size: "large" },
  { text: "highlight", background: "blue", size: "large" },
  { text: "white", background: "navy", size: "normal" },
  { text: "paper", background: "navy", size: "normal" },
  { text: "peach", background: "navy", size: "normal" },
  { text: "highlight", background: "navy", size: "normal" },
  { text: "white", background: "ink", size: "normal" },
  { text: "peach", background: "forest", size: "normal" },
  { text: "ember", background: "forest", size: "normal" },
];
