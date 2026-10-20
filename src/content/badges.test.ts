import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { badges } from "./badges.ts";

test("the app's 30 badges in 6 groups, each with title, philosophy, and criteria", () => {
  assert.equal(badges.length, 30);
  assert.equal(new Set(badges.map((badge) => badge.group)).size, 6);
  assert.equal(new Set(badges.map((badge) => badge.code)).size, 30);
  for (const badge of badges) {
    for (const value of [badge.title, badge.philosophy, badge.criteria, badge.tier]) assert.ok(value.trim().length > 0, badge.code);
  }
});

test("every group has a tier I badge to open the deck with", () => {
  for (const group of new Set(badges.map((badge) => badge.group))) {
    assert.ok(badges.some((badge) => badge.group === group && badge.tier === "I"), group);
  }
});

test("every badge code has its tarot card imported from the app", () => {
  const images = readFileSync(new URL("../components/site/app-images.ts", import.meta.url), "utf8");
  for (const badge of badges) assert.match(images, new RegExp(`^  "${badge.code}": tarot\\w+,$`, "m"), badge.code);
});

test("the badge chapter deals the six top-tier cards (IV and V), which the owner picked for their art", () => {
  const top = badges.filter((badge) => badge.tier === "IV" || badge.tier === "V");
  assert.equal(top.length, 6);
  assert.equal(new Set(top.map((badge) => badge.group)).size, 3);
});
