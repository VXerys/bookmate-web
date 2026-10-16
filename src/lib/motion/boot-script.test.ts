import assert from "node:assert/strict";
import { test } from "node:test";

import { BOOT_FALLBACK_MS, bootScript } from "./boot-script.ts";

// Runs the exact string shipped in <head> against a minimal fake document, history, and timer.
function boot(introAtTimeout?: string) {
  const classes = new Set<string>();
  const root = {
    classList: { add: (c: string) => classes.add(c), remove: (c: string) => classes.delete(c) },
    dataset: {} as Record<string, string | undefined>,
  };
  const history = { scrollRestoration: "auto" };
  let timer: { fn: () => void; ms: number } | undefined;
  const setTimeout = (fn: () => void, ms: number) => {
    timer = { fn, ms };
  };

  new Function("document", "history", "setTimeout", bootScript)({ documentElement: root }, history, setTimeout);
  const before = { hasJs: classes.has("js"), restoration: history.scrollRestoration, timeout: timer?.ms };
  root.dataset.intro = introAtTimeout;
  timer?.fn();
  return { before, hasJsAfter: classes.has("js") };
}

test("marks JavaScript as present and takes over scroll restoration before paint", () => {
  const { before } = boot("done");
  assert.equal(before.hasJs, true);
  assert.equal(before.restoration, "manual");
  assert.equal(before.timeout, BOOT_FALLBACK_MS);
});

test("keeps html.js when the intro reported done in time", () => {
  assert.equal(boot("done").hasJsAfter, true);
});

test("removes html.js when the intro never reported done, so content shows", () => {
  assert.equal(boot(undefined).hasJsAfter, false);
  assert.equal(boot("started").hasJsAfter, false);
});
