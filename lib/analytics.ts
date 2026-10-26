/**
 * Tracciamento eventi predisposto ma INATTIVO finché:
 *  1. NEXT_PUBLIC_ANALYTICS_ENABLED === "true" (deciso al build), e
 *  2. il visitatore ha dato il consenso statistico (vedi setAnalyticsConsent, da collegare al banner cookie).
 * Non lancia mai eccezioni se GTM/GA4 non sono presenti e non invia mai dati personali.
 * Nessuna dipendenza: testato in tests/analytics.test.ts.
 */

export type AnalyticsEventName =
  | "cta_click"
  | "form_start"
  | "form_validation_error"
  | "form_submit_attempt"
  | "lead_submit_success"
  | "lead_submit_error";

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

/** Unici parametri ammessi: niente campi liberi in cui possano finire email o telefono. */
const ALLOWED_PARAMS = new Set(["section", "label", "fields", "error_count", "reason", "investment_mode"]);
const EMAIL_LIKE = /[^\s@]+@[^\s@]+/;
const PHONE_LIKE = /(?:\+?\d[\s\-./]?){6,}/;

/** Rimuove parametri non ammessi e valori che somigliano a email o numeri di telefono. */
export function sanitizeParams(params: AnalyticsParams = {}): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (!ALLOWED_PARAMS.has(key) || value === undefined) continue;
    if (typeof value === "string") {
      const v = value.slice(0, 100);
      if (EMAIL_LIKE.test(v) || PHONE_LIKE.test(v)) continue;
      out[key] = v;
    } else {
      out[key] = value;
    }
  }
  return out;
}

type DataLayerTarget = { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

type TrackOptions = {
  enabled: boolean;
  consent: boolean;
  target?: DataLayerTarget;
};

/**
 * Invia l'evento a GTM (dataLayer) o, in mancanza, a gtag.
 * Restituisce true solo se l'evento è stato effettivamente consegnato.
 */
export function trackWith(name: AnalyticsEventName, params: AnalyticsParams, opts: TrackOptions): boolean {
  try {
    if (!opts.enabled || !opts.consent || !opts.target) return false;
    const clean = sanitizeParams(params);
    if (Array.isArray(opts.target.dataLayer)) {
      opts.target.dataLayer.push({ event: name, ...clean });
      return true;
    }
    if (typeof opts.target.gtag === "function") {
      opts.target.gtag("event", name, clean);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

let consentGranted = false;

/** Da chiamare dal banner/CMP quando il visitatore accetta (true) o revoca (false) i cookie statistici. */
export function setAnalyticsConsent(granted: boolean): void {
  consentGranted = granted;
}

const ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";

/** Uso nei componenti: track("cta_click", { section: "hero", label: "Richiedi informazioni" }). */
export function track(name: AnalyticsEventName, params: AnalyticsParams = {}): boolean {
  const target = typeof window === "undefined" ? undefined : (window as unknown as DataLayerTarget);
  return trackWith(name, params, { enabled: ENABLED, consent: consentGranted, target });
}
