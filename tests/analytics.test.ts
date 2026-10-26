import assert from "node:assert/strict";
import { test } from "node:test";
import { sanitizeParams, trackWith } from "../lib/analytics.ts";

test("non invia nulla se analytics è spento o senza consenso", () => {
  const target = { dataLayer: [] as unknown[] };
  assert.equal(trackWith("cta_click", { section: "hero" }, { enabled: false, consent: true, target }), false);
  assert.equal(trackWith("cta_click", { section: "hero" }, { enabled: true, consent: false, target }), false);
  assert.equal(target.dataLayer.length, 0);
});

test("non lancia eccezioni se GTM/GA4 non ci sono", () => {
  assert.equal(trackWith("form_start", {}, { enabled: true, consent: true, target: {} }), false);
  assert.equal(trackWith("form_start", {}, { enabled: true, consent: true }), false);
});

test("con consenso invia a dataLayer", () => {
  const target = { dataLayer: [] as unknown[] };
  assert.equal(trackWith("cta_click", { section: "hero", label: "Richiedi informazioni" }, { enabled: true, consent: true, target }), true);
  assert.deepEqual(target.dataLayer[0], { event: "cta_click", section: "hero", label: "Richiedi informazioni" });
});

test("rimuove parametri non ammessi ed eventuali email o telefoni", () => {
  const clean = sanitizeParams({
    section: "candidatura",
    email: "a@b.it",
    label: "mario@example.com",
    reason: "+39 333 1234567",
    fields: "email,phone",
  });
  assert.deepEqual(clean, { section: "candidatura", fields: "email,phone" });
});
