import assert from "node:assert/strict";
import { test } from "node:test";

import { accessibleCopyFor, INTERACTIVE_SELECTOR } from "./reveal-strategy.ts";

test("headings keep their own accessible name through aria-label", () => {
  for (const tag of ["h1", "h2", "H3", "h6"]) assert.equal(accessibleCopyFor(tag), "label");
});

test("non-heading text gets a visually hidden duplicate", () => {
  for (const tag of ["p", "div", "span", "li", "blockquote", "h7", "header"]) assert.equal(accessibleCopyFor(tag), "duplicate");
});

test("interactive selector covers links, buttons, form fields, and focusable elements", () => {
  for (const part of ["a", "button", "input", "select", "textarea", "[tabindex]"]) {
    assert.ok(INTERACTIVE_SELECTOR.split(", ").includes(part), `${part} missing`);
  }
});
