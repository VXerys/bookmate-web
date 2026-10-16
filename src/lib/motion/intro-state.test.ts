import assert from "node:assert/strict";
import { test } from "node:test";

import { createIntroState } from "./intro-state.ts";

test("listeners registered before the intro run once when it finishes", () => {
  const state = createIntroState();
  let calls = 0;
  state.whenIntroDone(() => calls++);
  assert.equal(calls, 0);
  state.finishIntro();
  state.finishIntro();
  assert.equal(calls, 1);
  assert.equal(state.isIntroDone(), true);
});

test("a listener added after the intro runs immediately", () => {
  const state = createIntroState();
  state.finishIntro();
  let ran = false;
  state.whenIntroDone(() => {
    ran = true;
  });
  assert.equal(ran, true);
});

test("unsubscribing before the intro ends prevents the call", () => {
  const state = createIntroState();
  let ran = false;
  const stop = state.whenIntroDone(() => {
    ran = true;
  });
  stop();
  state.finishIntro();
  assert.equal(ran, false);
});

test("a listener that subscribes another listener does not loop or skip it", () => {
  const state = createIntroState();
  const order: string[] = [];
  state.whenIntroDone(() => {
    order.push("first");
    state.whenIntroDone(() => order.push("nested"));
  });
  state.finishIntro();
  assert.deepEqual(order, ["first", "nested"]);
});
