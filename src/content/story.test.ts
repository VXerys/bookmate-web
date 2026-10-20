import assert from "node:assert/strict";
import { test } from "node:test";

import { demoBooks } from "./app-data.ts";
import { chapters } from "./navigation.ts";
import { textPairs } from "./palette.ts";
import { screens } from "./screens.ts";
import { aplikasi, buku, epilog, faq, fitur, kenapa, komunitas, lencana, pinjam, pita, prolog, type Tone } from "./story.ts";

const filled = (value: string) => value.trim().length > 0;
const inkOn = (tone: Tone) => textPairs.some((p) => p.text === "ink" && p.background === tone && p.size === "normal");

test("the story runs find, borrow, read, talk, celebrate, start (F-014 FR-002)", () => {
  assert.deepEqual(
    chapters.map((chapter) => chapter.id),
    ["prolog", "buku", "pinjam", "aplikasi", "fitur", "kenapa", "komunitas", "lencana", "indeks", "epilog"],
  );
  const kickers = [buku.kicker, pinjam.kicker, aplikasi.kicker, komunitas.kicker, lencana.kicker];
  kickers.forEach((kicker, index) => assert.match(kicker, new RegExp(`^Bab ${index + 1} · `), kicker));
});

test("the shelf shows ten distinct demo books, opening with the hero's three", () => {
  assert.equal(buku.featured.length, 10);
  assert.equal(new Set(buku.featured).size, 10);
  const keys = new Set(demoBooks.map((book) => book.key));
  for (const key of buku.featured) assert.ok(keys.has(key), key);
  assert.deepEqual(buku.featured.slice(0, 3), ["aCourtOfThornsAndRoses", "thePumpkinSpiceCafe", "remarkablyBrightCreatures"]);
});

test("every borrow step names one of the four step icons", () => {
  assert.deepEqual(
    pinjam.steps.map((step) => step.art),
    ["cari", "pinjam", "chat", "ulas"],
  );
});

test("hero and closing copy is filled in", () => {
  assert.equal(prolog.chips.length, 3);
  for (const value of [prolog.eyebrow, prolog.headlineLead, prolog.headlineEmphasis, prolog.body, prolog.secondary, prolog.stamp, epilog.statementLead, epilog.curve, ...prolog.chips]) {
    assert.ok(filled(value));
  }
});

test("the borrow steps follow the app's flow and read in ink", () => {
  assert.equal(pinjam.steps.length, 4);
  for (const step of pinjam.steps) {
    assert.ok(filled(step.title) && filled(step.body), step.title);
    assert.ok(inkOn(step.tone), `ink on ${step.tone}`);
  }
  assert.match(pinjam.steps[1].body, /Setujui Permintaan/);
  assert.match(pinjam.steps[3].body, /dikembalikan/);
});

test("six features with a screen, a one-line body, and an ink-readable colour", () => {
  assert.equal(fitur.items.length, 6);
  assert.equal(new Set(fitur.items.map((item) => item.id)).size, 6);
  for (const item of fitur.items) {
    assert.ok(filled(item.title) && filled(item.body), item.id);
    assert.ok(item.screen in screens, item.id);
    assert.ok(inkOn(item.tone), `ink on ${item.tone}`);
  }
});

test("no copy promotes polling, which is frozen in the app", () => {
  const copy = JSON.stringify({ prolog, buku, pinjam, aplikasi, fitur, kenapa, komunitas, pita, lencana, faq, epilog });
  assert.doesNotMatch(copy, /polling/i);
});

test("every benefit pill cites a source and reads in ink", () => {
  assert.ok(kenapa.pills.length >= 4);
  for (const pill of kenapa.pills) {
    assert.ok(filled(pill.label) && filled(pill.source), pill.label);
    assert.ok(inkOn(pill.tone), `ink on ${pill.tone}`);
  }
});

test("every FAQ answer cites a source in the app repo", () => {
  assert.ok(faq.items.length >= 3);
  for (const item of faq.items) {
    assert.ok(filled(item.question) && filled(item.answer), item.question);
    assert.match(item.source, /\.(md|dart)$/, item.question);
  }
});

test("every phone screen exists with alt text", () => {
  assert.equal(aplikasi.steps.length, 3);
  for (const id of [...aplikasi.screens, ...fitur.items.map((item) => item.screen)]) assert.ok(id in screens, id);
  for (const [id, screen] of Object.entries(screens)) assert.ok(filled(screen.alt) && screen.alt.length > 20, id);
});
