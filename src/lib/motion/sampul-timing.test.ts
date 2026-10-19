import assert from "node:assert/strict";
import { test } from "node:test";

import { BOOT_FALLBACK_MS } from "./boot-script.ts";
import {
  SAMPUL_INTRO_AFTER_OPEN_MS,
  SAMPUL_LEAD_MS,
  SAMPUL_OPEN_MAX_MS,
  SAMPUL_OPEN_MIN_MS,
  SAMPUL_SAFETY_MS,
  settleWaits,
} from "./sampul-timing.ts";

test("opening starts no earlier than 2.0 s and no later than 4.5 s after navigation start", () => {
  for (const elapsed of [0, 300, 900, 1500, 3000, 3700, 5000]) {
    const { min, max } = settleWaits(elapsed);
    const earliestOpen = elapsed + min + SAMPUL_LEAD_MS;
    const latestOpen = elapsed + max + SAMPUL_LEAD_MS;
    assert.ok(earliestOpen >= Math.min(SAMPUL_OPEN_MIN_MS, elapsed + SAMPUL_LEAD_MS), `elapsed ${elapsed}: ${earliestOpen}`);
    assert.ok(latestOpen <= Math.max(SAMPUL_OPEN_MAX_MS, elapsed + SAMPUL_LEAD_MS), `elapsed ${elapsed}: ${latestOpen}`);
  }
});

test("waits never go negative once the page is older than the window", () => {
  assert.deepEqual(settleWaits(10_000), { min: 0, max: 0 });
});

test("the intro reports done before the boot fallback would drop html.js", () => {
  assert.ok(SAMPUL_OPEN_MAX_MS + SAMPUL_INTRO_AFTER_OPEN_MS < BOOT_FALLBACK_MS);
});

test("the safety net only fires after a normal run would have ended", () => {
  assert.ok(SAMPUL_SAFETY_MS > SAMPUL_OPEN_MAX_MS + 1500);
});
