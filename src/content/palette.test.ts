import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { WCAG_AA, contrastRatio } from "../lib/color/contrast.ts";
import { palette, textPairs, type PaletteToken } from "./palette.ts";

const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

test("every allowed text pair meets WCAG AA for its size", () => {
  for (const { text, background, size } of textPairs) {
    const ratio = contrastRatio(palette[text], palette[background]);
    assert.ok(ratio >= WCAG_AA[size], `${text} on ${background} is ${ratio.toFixed(2)}:1, needs ${WCAG_AA[size]}:1 (${size})`);
  }
});

test("@theme in globals.css declares every palette token with the same hex", () => {
  for (const [token, hex] of Object.entries(palette) as [PaletteToken, string][]) {
    const match = new RegExp(`--color-${token}:\\s*(#[0-9a-f]{6})\\s*;`, "i").exec(css);
    assert.ok(match, `--color-${token} is missing from globals.css`);
    assert.equal(match[1].toLowerCase(), hex);
  }
});

test("@theme declares no color outside the palette", () => {
  const declared = [...css.matchAll(/--color-([a-z-]+):\s*#/gi)].map((m) => m[1]);
  assert.deepEqual(declared.filter((token) => !(token in palette)), []);
});
