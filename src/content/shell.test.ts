import assert from "node:assert/strict";
import { test } from "node:test";

import { shell } from "./shell.ts";

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

test("every shell string is filled in", () => {
  const all = strings(shell);
  assert.ok(all.length > 0);
  for (const text of all) assert.ok(text.trim().length > 0);
});
