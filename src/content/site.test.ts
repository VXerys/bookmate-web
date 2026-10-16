import assert from "node:assert/strict";
import { test } from "node:test";

import { site } from "./site.ts";

test("Play Store link targets the production package id", () => {
  const url = new URL(site.app.playStoreUrl);
  assert.equal(url.hostname, "play.google.com");
  assert.equal(url.searchParams.get("id"), site.app.packageId);
});

test("brand copy is filled in", () => {
  for (const value of [site.name, site.tagline, site.description, site.publisher]) {
    assert.ok(value.trim().length > 0);
  }
});
