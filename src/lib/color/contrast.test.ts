import assert from "node:assert/strict";
import { test } from "node:test";

import { contrastRatio, meetsAA, relativeLuminance } from "./contrast.ts";

test("luminance spans 0 for black to 1 for white", () => {
  assert.equal(relativeLuminance("#000000"), 0);
  assert.equal(relativeLuminance("#ffffff"), 1);
});

test("black on white is 21:1 and order does not matter", () => {
  assert.equal(contrastRatio("#000000", "#ffffff"), 21);
  assert.equal(contrastRatio("#ffffff", "#000000"), 21);
});

test("matches the WCAG reference value for #777777 on white", () => {
  assert.equal(contrastRatio("#777777", "#ffffff").toFixed(2), "4.48");
});

test("applies the normal and large thresholds", () => {
  assert.equal(meetsAA("#777777", "#ffffff", "normal"), false);
  assert.equal(meetsAA("#777777", "#ffffff", "large"), true);
});

test("rejects colors that are not #rrggbb", () => {
  assert.throws(() => relativeLuminance("#fff"));
  assert.throws(() => relativeLuminance("tomato"));
});
