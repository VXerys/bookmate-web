import assert from "node:assert/strict";
import { test } from "node:test";

import { textPairs } from "./palette.ts";
import { screens } from "./screens.ts";
import { buka, epilog, faq, fitur, hari, manfaat, prolog, rak, type Tone } from "./story.ts";

const filled = (value: string) => value.trim().length > 0;
const inkOn = (tone: Tone) => textPairs.some((p) => p.text === "ink" && p.background === tone && p.size === "normal");

test("hero copy is filled in", () => {
  for (const value of [prolog.headlineLead, prolog.headlineEmphasis, prolog.body, prolog.secondary, prolog.note]) {
    assert.ok(filled(value));
  }
});

test("six feature cards with a screen, tags, and an ink-readable colour", () => {
  assert.equal(fitur.items.length, 6);
  assert.equal(new Set(fitur.items.map((item) => item.id)).size, 6);
  for (const item of fitur.items) {
    assert.ok(filled(item.title) && filled(item.body), item.id);
    assert.ok(item.tags.length >= 1, item.id);
    assert.ok(item.screen in screens, item.id);
    assert.ok(inkOn(item.tone), `ink on ${item.tone}`);
  }
});

test("the reader's day runs through five hours in order", () => {
  assert.deepEqual(
    hari.hours.map((hour) => hour.id),
    ["pagi", "siang", "sore", "malam", "besok"],
  );
  for (const hour of hari.hours) {
    assert.match(hour.time, /^\d{2}\.\d{2}$/, hour.id);
    assert.ok(filled(hour.title) && filled(hour.body), hour.id);
    assert.ok(inkOn(hour.tone), `ink on ${hour.tone}`);
  }
});

test("every benefit pill cites a source and reads in ink", () => {
  assert.ok(manfaat.pills.length >= 4);
  for (const pill of manfaat.pills) {
    assert.ok(filled(pill.label) && filled(pill.source), pill.label);
    assert.ok(inkOn(pill.tone), `ink on ${pill.tone}`);
  }
});

test("buka, rak, and epilog copy is filled in", () => {
  assert.equal(buka.steps.length, 3);
  for (const value of [buka.statementLead, buka.statementTail, rak.title, rak.criteriaLabel, epilog.statementLead]) {
    assert.ok(filled(value));
  }
});

test("every FAQ answer cites a source in the app repo", () => {
  assert.ok(faq.items.length >= 3);
  for (const item of faq.items) {
    assert.ok(filled(item.question) && filled(item.answer), item.question);
    assert.match(item.source, /\.(md|dart)$/, item.question);
  }
});

test("every phone frame points at a screen with alt text", () => {
  for (const id of [prolog.screen, buka.screen, ...fitur.items.map((item) => item.screen)]) {
    assert.ok(id in screens, id);
  }
  for (const [id, screen] of Object.entries(screens)) {
    assert.ok(filled(screen.alt) && screen.alt.length > 20, id);
  }
});
