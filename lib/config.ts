/**
 * Configurazione del sito. Tutti i punti aperti prima del go-live sono qui.
 * Nessun valore è inventato: ciò che non è stato fornito resta vuoto o null.
 */

/** URL reale dell'informativa privacy. Finché è null il link non viene mostrato e il modulo non invia. */
export const privacyPolicyUrl: string | null = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL?.trim() || null;

/** Dominio definitivo (https://...). Finché è null niente canonical, og:url, og:image, sitemap. */
export const siteUrl: string | null = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || null;

/** Indicizzazione: resta disattivata (noindex) finché non viene abilitata esplicitamente al go-live. */
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

/**
 * Fasce di investimento approvate dalla Casa Madre.
 * Vuoto = campo di testo libero. Quando le fasce saranno approvate, inserirle qui
 * (es. { value: "fascia-1", label: "..." }) e il modulo mostrerà automaticamente una select.
 */
export type InvestmentBand = { value: string; label: string };
export const investmentBands: ReadonlyArray<InvestmentBand> = [];

/**
 * Consenso marketing facoltativo. null = non previsto, la checkbox non compare.
 * Attivarlo solo quando finalità, testo e gestione del consenso sono definiti dal titolare.
 */
export const marketingConsent: { label: string } | null = null;

/**
 * Foto prodotto previste. src null = non ancora disponibile (nessuna richiesta HTTP, nessun 404).
 * Quando le foto autentiche saranno pronte: copiarle in /public/images con questi nomi e sostituire null col percorso.
 */
export type ProductPhoto = { key: string; src: string | null; alt: string; width: number; height: number };
export const productPhotos: ReadonlyArray<ProductPhoto> = [
  { key: "intera", src: null, alt: "Arrotolata intera", width: 1600, height: 1200 },
  { key: "otto-pezzi", src: "/images/arrotolata-otto-pezzi.webp", alt: "Arrotolata tagliata in otto pezzi", width: 1500, height: 1125 },
  { key: "farcitura", src: null, alt: "Dettaglio della farcitura dell’arrotolata", width: 1600, height: 1200 },
  { key: "preparazione", src: null, alt: "Preparazione dell’arrotolata", width: 1600, height: 1200 },
  { key: "packaging", src: null, alt: "Confezione da asporto dell’arrotolata", width: 1600, height: 1200 },
];
// Percorsi attesi: /images/arrotolata-intera.webp, /images/arrotolata-otto-pezzi.webp,
// /images/arrotolata-farcitura.webp, /images/arrotolata-preparazione.webp, /images/arrotolata-packaging.webp

/** Analytics predisposti ma spenti. Vedi lib/analytics.ts e README. */
export const analyticsEnabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
