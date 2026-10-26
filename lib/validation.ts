/**
 * Schema e validazione della candidatura, condivisi tra browser e server.
 * File senza dipendenze: è testato direttamente con `node --test` (tests/validation.test.ts).
 */

export const LEAD_SCHEMA_VERSION = 1;

/** Limite complessivo del corpo della richiesta (byte). */
export const MAX_BODY_BYTES = 10_000;

export const FIELD_LIMITS = {
  firstName: 80,
  lastName: 80,
  email: 254,
  phone: 30,
  area: 120,
  investment: 200,
  experience: 500,
  message: 2000,
} as const;

export type LeadFieldName =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "area"
  | "investment"
  | "experience"
  | "message"
  | "privacyAck";

/** Dati inviati dal browser all'endpoint /api/leads. */
export type LeadInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  area: string;
  /** "text" finché le fasce non sono approvate, poi "band". */
  investmentMode: "text" | "band";
  investment: string;
  experience: string;
  message: string;
  privacyAck: boolean;
  marketingConsent: boolean;
  /** Honeypot anti-spam: deve restare vuoto. */
  website: string;
};

/** Payload normalizzato inoltrato al CRM / webhook. */
export type LeadPayload = {
  schemaVersion: typeof LEAD_SCHEMA_VERSION;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  area: string;
  investment: { mode: "text" | "band"; value: string | null };
  experience: string | null;
  message: string | null;
  consents: { privacyAck: true; marketing: boolean };
};

export type FieldErrors = Partial<Record<LeadFieldName, string>>;

export type ValidationResult =
  | { ok: true; payload: LeadPayload }
  | { ok: false; errors: FieldErrors; spam?: boolean };

/** Ordine dei campi nel modulo: serve per portare il focus sul primo errore. */
export const FIELD_ORDER: LeadFieldName[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "area",
  "investment",
  "experience",
  "message",
  "privacyAck",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_ALLOWED_RE = /^[+()\-.\s\d/]+$/;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function collapseSpaces(v: string): string {
  return v.replace(/\s+/g, " ");
}

/** Converte un oggetto sconosciuto (es. JSON dal client) in LeadInput senza fidarsi dei tipi. */
export function coerceLeadInput(raw: unknown): LeadInput {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  return {
    firstName: str(r.firstName),
    lastName: str(r.lastName),
    email: str(r.email),
    phone: str(r.phone),
    area: str(r.area),
    investmentMode: r.investmentMode === "band" ? "band" : "text",
    investment: str(r.investment),
    experience: str(r.experience),
    message: str(r.message),
    privacyAck: r.privacyAck === true,
    marketingConsent: r.marketingConsent === true,
    website: str(r.website),
  };
}

/**
 * Valida la candidatura.
 * @param allowedBands valori delle fasce approvate (vuoto = testo libero).
 * @param marketingAvailable se false il consenso marketing viene sempre forzato a false.
 */
export function validateLead(
  input: LeadInput,
  allowedBands: ReadonlyArray<string> = [],
  marketingAvailable = false,
): ValidationResult {
  if (input.website !== "") {
    return { ok: false, errors: {}, spam: true };
  }

  const errors: FieldErrors = {};

  const required = (field: "firstName" | "lastName" | "area", label: string) => {
    const v = input[field];
    if (!v) errors[field] = `Inserisci ${label}.`;
    else if (v.length > FIELD_LIMITS[field]) errors[field] = `Massimo ${FIELD_LIMITS[field]} caratteri.`;
  };

  required("firstName", "il nome");
  required("lastName", "il cognome");

  if (!input.email) errors.email = "Inserisci l’indirizzo email.";
  else if (input.email.length > FIELD_LIMITS.email || !EMAIL_RE.test(input.email))
    errors.email = "Inserisci un indirizzo email valido, ad esempio nome@dominio.it.";

  const phoneDigits = input.phone.replace(/\D/g, "");
  if (!input.phone) errors.phone = "Inserisci il numero di telefono.";
  else if (
    input.phone.length > FIELD_LIMITS.phone ||
    !PHONE_ALLOWED_RE.test(input.phone) ||
    phoneDigits.length < 6 ||
    phoneDigits.length > 15
  )
    errors.phone = "Inserisci un numero di telefono valido (solo cifre, spazi e +).";

  required("area", "la città o provincia di interesse");

  if (input.investment.length > FIELD_LIMITS.investment)
    errors.investment = `Massimo ${FIELD_LIMITS.investment} caratteri.`;
  else if (input.investmentMode === "band" && input.investment && !allowedBands.includes(input.investment))
    errors.investment = "Seleziona una delle fasce proposte.";
  else if (input.investmentMode === "band" && allowedBands.length === 0)
    errors.investment = "Fascia non disponibile.";

  if (input.experience.length > FIELD_LIMITS.experience)
    errors.experience = `Massimo ${FIELD_LIMITS.experience} caratteri.`;
  if (input.message.length > FIELD_LIMITS.message)
    errors.message = `Massimo ${FIELD_LIMITS.message} caratteri.`;

  if (!input.privacyAck) errors.privacyAck = "Per inviare la richiesta conferma di aver preso visione dell’informativa privacy.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    payload: {
      schemaVersion: LEAD_SCHEMA_VERSION,
      firstName: collapseSpaces(input.firstName),
      lastName: collapseSpaces(input.lastName),
      email: input.email.toLowerCase(),
      phone: collapseSpaces(input.phone),
      area: collapseSpaces(input.area),
      investment: { mode: input.investmentMode, value: input.investment || null },
      experience: input.experience || null,
      message: input.message || null,
      consents: { privacyAck: true, marketing: marketingAvailable && input.marketingConsent },
    },
  };
}

/** Campi con errore, nell'ordine del modulo, senza i valori (utile per analytics senza PII). */
export function errorFieldList(errors: FieldErrors): LeadFieldName[] {
  return FIELD_ORDER.filter((f) => errors[f]);
}
