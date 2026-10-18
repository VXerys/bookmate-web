import assert from "node:assert/strict";
import { test } from "node:test";

import { createScrollLock } from "./scroll-lock.ts";

test("stays locked until the last owner unlocks (menu open, then slice transition)", () => {
  const lock = createScrollLock();
  lock.lock("menu");
  lock.lock("slice");
  lock.unlock("menu");
  assert.equal(lock.isLocked(), true);
  assert.deepEqual(lock.owners(), ["slice"]);
  lock.unlock("slice");
  assert.equal(lock.isLocked(), false);
});

test("locking twice by the same owner needs a single unlock", () => {
  const lock = createScrollLock();
  lock.lock("sampul");
  lock.lock("sampul");
  lock.unlock("sampul");
  assert.equal(lock.isLocked(), false);
});

test("unlocking an owner that never locked changes nothing", () => {
  const lock = createScrollLock();
  lock.lock("menu");
  lock.unlock("slice");
  assert.equal(lock.isLocked(), true);
});

test("listeners hear only the transitions between unlocked and locked", () => {
  const lock = createScrollLock();
  const heard: boolean[] = [];
  lock.subscribe((locked) => heard.push(locked));
  lock.lock("menu");
  lock.lock("slice");
  lock.unlock("menu");
  lock.unlock("slice");
  lock.unlock("slice");
  assert.deepEqual(heard, [true, false]);
});

test("an unsubscribed listener is not called again", () => {
  const lock = createScrollLock();
  let calls = 0;
  const stop = lock.subscribe(() => calls++);
  lock.lock("menu");
  stop();
  lock.unlock("menu");
  assert.equal(calls, 1);
});
