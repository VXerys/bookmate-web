import assert from "node:assert/strict";
import { test } from "node:test";

import { site } from "../content/site.ts";
import { mobileApplicationJsonLd } from "./structured-data.ts";

test("describes BookMate as a free Android app installed from Google Play", () => {
  const data = mobileApplicationJsonLd();
  assert.equal(data["@type"], "MobileApplication");
  assert.equal(data.name, site.name);
  assert.equal(data.operatingSystem, "ANDROID");
  assert.equal(data.offers.price, "0");
  assert.equal(data.installUrl, site.app.playStoreUrl);
});

test("claims no rating or download count", () => {
  const json = JSON.stringify(mobileApplicationJsonLd());
  assert.doesNotMatch(json, /aggregateRating|ratingValue|interactionCount|downloads/i);
});
