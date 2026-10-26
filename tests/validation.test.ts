import assert from "node:assert/strict";
import { test } from "node:test";
import { coerceLeadInput, errorFieldList, validateLead } from "../lib/validation.ts";

const valid = {
  firstName: " Maria ",
  lastName: "Rossi",
  email: "Maria.Rossi@Example.it",
  phone: "+39 333 123 4567",
  area: "Catania",
  investment: "",
  experience: "",
  message: "",
  privacyAck: true,
  marketingConsent: true,
  website: "",
};

test("candidatura valida produce il payload normalizzato", () => {
  const r = validateLead(coerceLeadInput(valid));
  assert.equal(r.ok, true);
  if (!r.ok) return;
  assert.equal(r.payload.firstName, "Maria");
  assert.equal(r.payload.email, "maria.rossi@example.it");
  assert.deepEqual(r.payload.investment, { mode: "text", value: null });
  // Consenso marketing non previsto: deve restare false anche se il client manda true.
  assert.equal(r.payload.consents.marketing, false);
});

test("campi obbligatori mancanti e privacy non spuntata", () => {
  const r = validateLead(coerceLeadInput({}));
  assert.equal(r.ok, false);
  if (r.ok) return;
  assert.deepEqual(errorFieldList(r.errors), ["firstName", "lastName", "email", "phone", "area", "privacyAck"]);
});

test("email e telefono non validi", () => {
  const r = validateLead(coerceLeadInput({ ...valid, email: "maria@", phone: "abc" }));
  assert.equal(r.ok, false);
  if (r.ok) return;
  assert.ok(r.errors.email);
  assert.ok(r.errors.phone);
});

test("privacyAck accetta solo il booleano true", () => {
  const r = validateLead(coerceLeadInput({ ...valid, privacyAck: "true" }));
  assert.equal(r.ok, false);
});

test("honeypot compilato = spam", () => {
  const r = validateLead(coerceLeadInput({ ...valid, website: "http://spam" }));
  assert.equal(r.ok, false);
  if (r.ok) return;
  assert.equal(r.spam, true);
});

test("fasce: valore fuori elenco rifiutato, valore ammesso accettato", () => {
  const bad = validateLead(coerceLeadInput({ ...valid, investmentMode: "band", investment: "x" }), ["a", "b"]);
  assert.equal(bad.ok, false);
  const good = validateLead(coerceLeadInput({ ...valid, investmentMode: "band", investment: "a" }), ["a", "b"]);
  assert.equal(good.ok, true);
});

test("testi troppo lunghi rifiutati", () => {
  const r = validateLead(coerceLeadInput({ ...valid, message: "x".repeat(2001) }));
  assert.equal(r.ok, false);
});
