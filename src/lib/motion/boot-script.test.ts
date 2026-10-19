import assert from "node:assert/strict";
import { test } from "node:test";

import { BOOT_FALLBACK_MS, bootScript, SAMPUL_SESSION_KEY } from "./boot-script.ts";

type Storage = { getItem: (key: string) => string | null };

// Runs the exact string shipped in <head> against a minimal fake document, history, timer, and sessionStorage.
function boot(options: { introAtTimeout?: string; storage?: Storage } = {}) {
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
  const storage = options.storage ?? { getItem: () => null };

  new Function("document", "history", "setTimeout", "sessionStorage", bootScript)(
    { documentElement: root },
    history,
    setTimeout,
    storage,
  );
  const before = {
    hasJs: classes.has("js"),
    restoration: history.scrollRestoration,
    timeout: timer?.ms,
    sampul: root.dataset.sampul,
  };
  root.dataset.intro = options.introAtTimeout;
  timer?.fn();
  return { before, hasJsAfter: classes.has("js") };
}

test("marks JavaScript as present and takes over scroll restoration before paint", () => {
  const { before } = boot({ introAtTimeout: "done" });
  assert.equal(before.hasJs, true);
  assert.equal(before.restoration, "manual");
  assert.equal(before.timeout, BOOT_FALLBACK_MS);
});

test("keeps html.js when the intro reported done in time", () => {
  assert.equal(boot({ introAtTimeout: "done" }).hasJsAfter, true);
});

test("removes html.js when the intro never reported done, so content shows", () => {
  assert.equal(boot().hasJsAfter, false);
  assert.equal(boot({ introAtTimeout: "started" }).hasJsAfter, false);
});

test("plays the sampul on the first load in a tab", () => {
  assert.equal(boot().before.sampul, "play");
});

test("skips the sampul once this tab has seen it", () => {
  const storage = { getItem: (key: string) => (key === SAMPUL_SESSION_KEY ? "1" : null) };
  assert.equal(boot({ storage }).before.sampul, "skip");
});

test("blocked sessionStorage still boots and plays the sampul", () => {
  const storage = {
    getItem: () => {
      throw new Error("SecurityError");
    },
  };
  const { before } = boot({ storage });
  assert.equal(before.hasJs, true);
  assert.equal(before.sampul, "play");
});
