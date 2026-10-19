import assert from "node:assert/strict";
import { test } from "node:test";

import { chapterNumber, chapters, navChapters } from "./navigation.ts";

test("chapter ids are unique, lowercase anchors", () => {
  const ids = chapters.map((chapter) => chapter.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^[a-z-]+$/);
});

test("the story opens with the prolog and closes with the epilog", () => {
  assert.equal(chapters[0].id, "prolog");
  assert.equal(chapters.at(-1)?.id, "epilog");
});

test("every chapter has a label, and the header stays short", () => {
  for (const chapter of chapters) assert.ok(chapter.label.trim().length > 0, chapter.id);
  assert.ok(navChapters.length > 0 && navChapters.length <= 5, `${navChapters.length} header links`);
  for (const chapter of navChapters) assert.ok(chapter.navLabel.trim().length > 0, chapter.id);
});

test("chapter numbers follow the story order", () => {
  assert.equal(chapterNumber("prolog"), "01");
  assert.equal(chapterNumber("epilog"), String(chapters.length).padStart(2, "0"));
  assert.throws(() => chapterNumber("missing"));
});
