import assert from "node:assert/strict";
import { test } from "node:test";

import { textPairs } from "./palette.ts";
import { screens } from "./screens.ts";
import { buka, epilog, faq, hari, manifesto, mulai, outsideText, papan, prolog, rak } from "./story.ts";

const filled = (value: string) => value.trim().length > 0;

test("prolog, manifesto, and buka copy is filled in", () => {
  for (const value of [prolog.kicker, prolog.headlineLead, prolog.headlineEmphasis, prolog.body, prolog.secondary]) {
    assert.ok(filled(value));
  }
  for (const value of Object.values(prolog.notes)) assert.ok(filled(value));
  const text = manifesto.segments.map((segment) => segment.text).join("");
  assert.ok(text.split(" ").length > 20, "manifesto needs enough words to fill on scroll");
  assert.ok(manifesto.segments.some((segment) => segment.mark === "strike"));
  assert.ok(manifesto.segments.some((segment) => segment.mark === "circle"));
  assert.ok(filled(buka.statementLead) && filled(buka.statementTail));
});

test("the reader's day runs through five hours in order with copy and a screen", () => {
  assert.deepEqual(
    hari.spreads.map((spread) => spread.id),
    ["pagi", "siang", "sore", "malam", "besok"],
  );
  for (const spread of hari.spreads) {
    assert.match(spread.time, /^\d{2}\.\d{2}$/, spread.id);
    assert.ok(filled(spread.title) && filled(spread.body) && filled(spread.note), spread.id);
    assert.ok(spread.points.length >= 2, spread.id);
    assert.ok(spread.screen in screens, spread.id);
  }
});

test("labels outside the book stay readable on every hour's room colour", () => {
  for (const spread of hari.spreads) {
    const text = outsideText[spread.outside];
    assert.ok(text, `no text colour for ${spread.outside}`);
    const pair = textPairs.find((p) => p.text === text && p.background === spread.outside && p.size === "normal");
    assert.ok(pair, `${text} on ${spread.outside} is not an allowed normal-size pair`);
  }
});

test("rak, papan, mulai, and epilog copy is filled in", () => {
  for (const value of [rak.statement, rak.hint, rak.criteriaLabel, papan.statement, mulai.note, epilog.statementLead]) {
    assert.ok(filled(value));
  }
  assert.equal(papan.notes.length, 4);
  assert.equal(mulai.steps.length, 3);
});

test("every FAQ answer cites a source in the app repo", () => {
  assert.ok(faq.items.length >= 3);
  for (const item of faq.items) {
    assert.ok(filled(item.question) && filled(item.answer), item.question);
    assert.match(item.source, /\.(md|dart)$/, item.question);
  }
});

test("every phone frame points at a screen with alt text", () => {
  for (const id of [prolog.screen, buka.screen, mulai.screen, ...hari.spreads.map((spread) => spread.screen)]) {
    assert.ok(id in screens, id);
  }
  for (const [id, screen] of Object.entries(screens)) {
    assert.ok(filled(screen.alt) && screen.alt.length > 20, id);
  }
});
