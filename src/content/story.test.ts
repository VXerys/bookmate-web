import assert from "node:assert/strict";
import { test } from "node:test";

import { textPairs } from "./palette.ts";
import { babs, babText, buka, manifesto, prolog } from "./story.ts";

const filled = (value: string) => value.trim().length > 0;

test("prolog, manifesto, and buka copy is filled in", () => {
  for (const value of [prolog.kicker, prolog.headlineLead, prolog.headlineEmphasis, prolog.body, prolog.secondary]) {
    assert.ok(filled(value));
  }
  for (const value of Object.values(prolog.chips)) assert.ok(filled(value));
  assert.ok(manifesto.text.split(" ").length > 20, "manifesto needs enough words to fill on scroll");
  assert.ok(filled(buka.statement));
});

test("there are five chapters numbered 01 to 05 with copy", () => {
  assert.equal(babs.length, 5);
  babs.forEach((bab, index) => {
    assert.equal(bab.number, String(index + 1).padStart(2, "0"));
    assert.ok(filled(bab.title) && filled(bab.body) && filled(bab.screen), bab.title);
  });
});

test("each chapter's text colour on its background is an allowed normal-size pair", () => {
  for (const bab of babs) {
    const text = babText[bab.tone];
    const pair = textPairs.find((p) => p.text === text && p.background === bab.tone && p.size === "normal");
    assert.ok(pair, `${text} on ${bab.tone} is not an allowed normal-size pair`);
  }
});

test("every FAQ answer cites a source in the app repo", async () => {
  const { faq } = await import("./story.ts");
  assert.ok(faq.items.length >= 3);
  for (const item of faq.items) {
    assert.ok(filled(item.question) && filled(item.answer), item.question);
    assert.match(item.source, /\.(md|dart)$/, item.question);
  }
});
