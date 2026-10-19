import assert from "node:assert/strict";
import { test } from "node:test";

import { sliceTargetId, type LinkClick } from "./in-page-link.ts";

const click = (overrides: Partial<LinkClick> = {}): LinkClick => ({
  href: "#streak",
  button: 0,
  modified: false,
  sliceOff: false,
  defaultPrevented: false,
  ...overrides,
});

test("a plain left click on an in-page link travels to that section", () => {
  assert.equal(sliceTargetId(click()), "streak");
});

test("new-tab clicks, other buttons, and handled events stay native", () => {
  assert.equal(sliceTargetId(click({ modified: true })), null);
  assert.equal(sliceTargetId(click({ button: 1 })), null);
  assert.equal(sliceTargetId(click({ defaultPrevented: true })), null);
});

test("opted-out links, bare hashes, and other pages stay native", () => {
  assert.equal(sliceTargetId(click({ sliceOff: true, href: "#konten" })), null);
  assert.equal(sliceTargetId(click({ href: "#" })), null);
  assert.equal(sliceTargetId(click({ href: "https://play.google.com/store" })), null);
  assert.equal(sliceTargetId(click({ href: null })), null);
});

test("encoded ids are decoded and malformed ones are ignored", () => {
  assert.equal(sliceTargetId(click({ href: "#bab%2001" })), "bab 01");
  assert.equal(sliceTargetId(click({ href: "#%E0%A4%A" })), null);
});
