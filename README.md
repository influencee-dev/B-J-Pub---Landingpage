# B&J Pub – Landing franchising «L’Arrotolata Originale»

Landing page per raccogliere candidature di potenziali affiliati.
Next.js 16 (App Router) + TypeScript + CSS Modules, nessuna libreria UI esterna, nessun font esterno.

> **Stato: BOZZA. Non pubblicare** finché la checklist «Blocker go-live» in fondo non è completa.

## Avvio

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # typecheck + lint + test + build
npm run build && npm start
```

Script singoli: `npm run typecheck`, `npm run lint`, `npm test` (Node test runner, senza dipendenze), `npm run build`.

## Struttura

```text
app/
  layout.tsx          metadati SEO/OG, lang="it", noindex finché non abilitato
  page.tsx            ordine delle sezioni; decide se il modulo è "live" o demo
  globals.css         design token (palette provvisoria), pulsanti, utility
  api/leads/route.ts  handler server del modulo
components/           Header, Logo, Hero, BrandStory, Product, Benefits, Formats, Economics,
                      Scenario, Support, IdealCandidate, Process, PilotLocation, FAQ,
                      LeadForm, Footer, MobileStickyCTA, CtaLink, CtaTracker
lib/
  content.ts          TUTTI i testi approvati, la scheda economica e le foto del locale
  config.ts           punti aperti: privacy, dominio, fasce investimento, consenso marketing, foto prodotto
  validation.ts       schema e validazione condivisi browser/server
  analytics.ts        eventi predisposti ma inattivi
  rateLimit.ts        rate limit in memoria
tests/                test di validazione e analytics
public/images/        5 foto autentiche degli interni di B&J Pub a Ragusa (1800×1350 WebP)
```

## Dove intervenire

| Cosa | Dove |
|---|---|
| Testi, cifre, FAQ | `lib/content.ts` (unica fonte: la tabella economica è `economicsTable`) |
| Logo | `public/brand/`: `logo-colori.png` / `marchio-colori.png` (fondi chiari) e `logo-chiaro.png` / `marchio-chiaro.png` (bordeaux → crema, per fondi bordeaux), scontornati da `assets-originali/logo-bj-originale.png`. Il «marchio» è il logo senza payoff, usato nell’intestazione dove il payoff sarebbe illeggibile. Mai su fondo giallo (il payoff giallo sparirebbe). Componente: `components/Logo.tsx`. |
| Foto prodotto | Copiare in `public/images/` i file `arrotolata-intera.webp`, `arrotolata-otto-pezzi.webp`, `arrotolata-farcitura.webp`, `arrotolata-preparazione.webp`, `arrotolata-packaging.webp`, poi in `lib/config.ts` (`productPhotos`) sostituire `src: null` con il percorso e verificare `width`/`height`. Finché tutte sono `null` compare il segnaposto «Foto autentica dell’arrotolata da inserire». |
| Palette e font | Variabili in `:root` di `app/globals.css`: bordeaux `#560F11` e giallo `#FCB117` presi dal logo. Font Fredoka (titoli), Barlow Condensed (etichette, come il payoff del logo), Nunito (testo), ospitati dal sito tramite `next/font` (scaricati al build). |
| Fasce di investimento | `investmentBands` in `lib/config.ts`. Vuoto = campo di testo libero; con valori approvati il modulo mostra una select e il server accetta solo quei valori. |
| Consenso marketing | `marketingConsent` in `lib/config.ts` (oggi `null` = checkbox nascosta, consenso sempre `false`). |

## Modulo di candidatura

Variabili d’ambiente (vedi `.env.example`):

| Variabile | Tipo | Effetto |
|---|---|---|
| `LEAD_WEBHOOK_URL` | server | Endpoint del CRM/automazione che riceve i lead in POST JSON. Non finisce mai nel browser. |
| `LEAD_WEBHOOK_SECRET` | server, facoltativa | Inviata come `Authorization: Bearer …` |
| `NEXT_PUBLIC_PRIVACY_POLICY_URL` | pubblica | URL reale dell’informativa. Mostra il link nella checkbox e nel footer. |

**Il modulo invia davvero solo se sono impostati sia `LEAD_WEBHOOK_URL` sia `NEXT_PUBLIC_PRIVACY_POLICY_URL`.**
Le variabili `NEXT_PUBLIC_*` vengono lette al momento del build: dopo averle cambiate rifare `npm run build`.

**Modalità demo (oggi):** il modulo mostra un avviso «Modulo dimostrativo», valida i campi e, all’invio,
mostra «Modulo dimostrativo: nessun dato è stato inviato.». I dati non lasciano il browser.
Anche il server, se chiamato direttamente, valida e poi risponde `503 not_configured` senza salvare né inoltrare nulla.

**Modalità configurata:** `/api/leads` valida (stesse regole del browser), limita il corpo a 10 KB,
e inoltra al webhook questo payload:

```json
{
  "source": "landing-franchising-bj-pub",
  "submittedAt": "ISO-8601",
  "lead": {
    "schemaVersion": 1,
    "firstName": "", "lastName": "", "email": "", "phone": "", "area": "",
    "investment": { "mode": "text | band", "value": "… | null" },
    "experience": null, "message": null,
    "consents": { "privacyAck": true, "marketing": false }
  }
}
```

Il messaggio di successo compare solo se il webhook risponde 2xx. Errori di rete o del CRM → messaggio di errore.
Nei log non vengono mai scritti dati personali.

**Anti-spam:** honeypot (campo `website` nascosto, verificato sul server) + rate limit di 5 invii ogni 10 minuti per IP.
Il rate limit è **in memoria**: su hosting serverless o con più istanze ogni istanza ha il suo contatore,
quindi la protezione è parziale. In produzione sostituirlo con uno store condiviso (Redis/Upstash) o col WAF dell’hosting.

## Contenuti

Il sito usa **solo** i testi approvati (PROMPT_CLAUDE_CODE.md, sezione 5), centralizzati in `lib/content.ts`.
Non ci sono testi aggiunti: niente didascalie, riepiloghi, schede tecniche o campi extra.
Le uniche scritte non presenti nel documento sono quelle tecniche consentite: etichette e messaggi del modulo
(errori, invio in corso, avviso di modalità dimostrativa, spiegazione neutra del campo investimento),
«Menu/Chiudi», «Vai al contenuto» e i testi alternativi delle foto per l’accessibilità.

Architettura informativa: la progressione hero → brand → prodotto → vantaggi → format → investimento → modello
economico → supporto → profilo → percorso → punto pilota → FAQ → modulo segue quella indicata nel documento
(riferimento di sola struttura: franchisematch.net, nessun asset, testo o design copiato).

## Analytics

`lib/analytics.ts` definisce gli eventi `cta_click` (section, label), `form_start`, `form_validation_error`
(solo nomi dei campi, nessun valore), `form_submit_attempt`, `lead_submit_success` (solo dopo risposta positiva del server),
`lead_submit_error` (reason). Sono **inattivi** finché:

1. `NEXT_PUBLIC_ANALYTICS_ENABLED=true` al build;
2. il banner cookie/CMP chiama `setAnalyticsConsent(true)` dopo il consenso del visitatore;
3. GTM (`window.dataLayer`) o GA4 (`window.gtag`) sono caricati — non sono inclusi nel progetto.

I parametri sono filtrati: solo chiavi ammesse, e valori che somigliano a email o telefoni vengono scartati.
Se GTM/GA4 mancano, `track()` non fa nulla e non lancia eccezioni.

## SEO

- Titolo «Franchising B&J Pub | Apri L’Arrotolata Originale», `lang="it"`, un solo `h1`, sezioni con `aria-labelledby`.
- **noindex** finché `NEXT_PUBLIC_ALLOW_INDEXING=true`.
- `canonical`, `og:url`, `og:image` (foto del bancone) solo quando `NEXT_PUBLIC_SITE_URL` è il dominio definitivo.
- Niente JSON-LD, sitemap o dati aziendali: vanno aggiunti solo con informazioni verificate.

## Controlli eseguiti (26/10/2026)

- `tsc`, `eslint`, 11 test (`node --test`), `next build`: senza errori.
- Larghezze 375, 390, 768, 1024, 1440 px: nessuno scroll orizzontale, tutte le immagini caricate.
- Tutti i link interni puntano ad ancore esistenti; 10 CTA: 9 verso `#candidatura`, «Scopri il format» verso `#format`.
- FAQ (details/summary), menu mobile (apertura, focus sul primo link, Esc che riporta il focus al pulsante).
- Modulo: invio vuoto → 6 errori inline, focus sul primo campo, annuncio `aria-live`; invio valido in demo → messaggio demo, nessuna richiesta di rete.
- API: 422 con campi vuoti, 400 honeypot e JSON rotto, 413 oltre 10 KB, 429 dopo 5 invii, 503 in demo.
- Con webhook di prova locale: lead inoltrato con `Authorization: Bearer`, consenso marketing forzato a false, 502 con webhook irraggiungibile.

## Blocker go-live

- [x] Logo ufficiale applicato (PNG 688×732 scontornato). Un SVG renderebbe il logo più nitido sugli schermi ad alta risoluzione.
- [x] Palette e stile grafico allineati al logo.
- [x] Foto dell’arrotolata in otto pezzi inserita (`public/images/arrotolata-otto-pezzi.webp`, ritoccata solo in luce, colore e nitidezza; originale intatto in `assets-originali/`).
- [ ] Diritti d’uso della foto confermati. Altre foto (intera, farcitura, preparazione, packaging) facoltative: si aggiungono in `lib/config.ts`.
- [ ] Conferma denominazioni e metrature STREET/FULL.
- [ ] Conferma scritta di fee, allestimento, royalty minima e contributo marketing; chiarimento voci escluse e investimento complessivo.
- [ ] Validazione delle simulazioni (€ 12, 300 giorni, ~80 scontrini, payback 18 mesi, € 80.000) e nota metodologica.
- [ ] Nessun claim su brevetti senza documentazione giuridica verificata.
- [ ] Titolare, informativa privacy, trattamenti e testo checkbox approvati; `NEXT_PUBLIC_PRIVACY_POLICY_URL` reale.
- [ ] Fasce di investimento approvate (`investmentBands`).
- [ ] Integrazione CRM/webhook reale (`LEAD_WEBHOOK_URL`), test di invio e conservazione dati, rate limit condiviso.
- [ ] Eventuale contatto del brand, dominio e DNS (`NEXT_PUBLIC_SITE_URL`), social/OG, cookie banner e analytics verificati; poi `NEXT_PUBLIC_ALLOW_INDEXING=true`.
- [ ] Nessuna promessa di tempi di risposta non validati.
