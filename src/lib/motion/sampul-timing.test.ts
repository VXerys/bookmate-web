import assert from "node:assert/strict";
import { test } from "node:test";

import { BOOT_FALLBACK_MS } from "./boot-script.ts";
import {
  SAMPUL_INTRO_AFTER_OPEN_MS,
  SAMPUL_OPEN_MAX_MS,
  SAMPUL_OPEN_MIN_MS,
  SAMPUL_REPLAY_OPEN_MAX_MS,
  SAMPUL_REPLAY_OPEN_MIN_MS,
  SAMPUL_SAFETY_MS,
  settleWaits,
} from "./sampul-timing.ts";

test("the logo holds the centre for two to three seconds before the exit starts", () => {
  assert.ok(SAMPUL_OPEN_MIN_MS >= 2000 && SAMPUL_OPEN_MIN_MS <= 3000);
  assert.ok(SAMPUL_REPLAY_OPEN_MIN_MS >= 2000 && SAMPUL_REPLAY_OPEN_MIN_MS <= 3000);
});

test("the exit starts inside its window, whatever the page's age", () => {
  for (const replay of [false, true]) {
    const [open, close] = replay ? [SAMPUL_REPLAY_OPEN_MIN_MS, SAMPUL_REPLAY_OPEN_MAX_MS] : [SAMPUL_OPEN_MIN_MS, SAMPUL_OPEN_MAX_MS];
    for (const elapsed of [0, 300, 900, 1500, 3000, 4500, 6000]) {
      const { min, max } = settleWaits(elapsed, replay);
      assert.ok(elapsed + min >= Math.min(open, elapsed), `${replay} ${elapsed}: earliest`);
      assert.ok(elapsed + max <= Math.max(close, elapsed), `${replay} ${elapsed}: latest`);
      assert.ok(max >= min);
    }
  }
});

test("waits never go negative once the page is older than the window", () => {
  assert.deepEqual(settleWaits(10_000), { min: 0, max: 0 });
});

test("the intro reports done before the boot fallback would drop html.js", () => {
  assert.ok(SAMPUL_OPEN_MAX_MS + SAMPUL_INTRO_AFTER_OPEN_MS < BOOT_FALLBACK_MS);
});

test("the safety timer outlasts the latest possible exit", () => {
  assert.ok(SAMPUL_SAFETY_MS > SAMPUL_OPEN_MAX_MS);
});
