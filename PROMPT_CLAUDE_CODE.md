# PROMPT OPERATIVO PER CLAUDE CODE — B&J PUB FRANCHISING

Agisci contemporaneamente come **Senior UX/UI Designer**, **CRO Specialist**, **Senior Frontend Developer** e **Technical SEO / Accessibility Engineer**. Il compito è **realizzare concretamente nel repository un sito funzionante**, non limitarti a descrivere una proposta o a fornire frammenti di codice.

## 0. Missione e criterio di successo

Crea una **landing page responsive, mobile-first, professionale e pronta a essere completata per la pubblicazione** per raccogliere **candidature qualificate di potenziali affiliati franchising B&J Pub – L’Arrotolata Originale**. Le CTA devono guidare a un modulo finale e il percorso deve essere persuasivo ma trasparente. Target: persone che vogliono aprire e gestire un punto vendita, piccoli imprenditori e investitori interessati a un format food riconoscibile.

**Riferimento di sola architettura informativa:** https://franchisematch.net/proposta/macche-pasta-franchising.html. Ispirati al principio di progressione informativa (hero → differenziazione → prodotto → vantaggi → format → investimento → supporto → credibilità → FAQ → lead form), **senza copiare layout, asset, componenti grafici, animazioni, marchio, fotografie, testi o specifiche di altri brand**. Non trasferire a B&J numeri, promesse e condizioni di quel sito.

Il risultato deve sembrare il sito autentico di un marchio food/pub radicato nel territorio e curato professionalmente, **non un template SaaS o un generico sito di franchising**. Evita emoji, icone decorative, gradienti vistosi, box in eccesso, stock photography e superlativi indimostrati.

## 1. Modalità operativa obbligatoria

1. Ispeziona la struttura del repository e gli asset disponibili prima di intervenire; preserva il codice eventualmente esistente. Se il progetto è vuoto, crea una nuova applicazione **Next.js (App Router) + TypeScript + CSS Modules**; motivazione: SEO e metadati gestibili server-side, componenti riutilizzabili, immagini locali ottimizzabili, handler server per il form senza esporre webhook privati. Evita librerie pesanti non necessarie.
2. Implementa **tutta** la landing con contenuti reali riportati più avanti, inclusi dati, disclaimer, FAQ, CTA e modulo; non scrivere solo uno scheletro o pseudocodice.
3. Usa gli asset locali in `/public/images` secondo la mappatura qui sotto. Se il pacchetto foto non è ancora stato copiato, costruisci ugualmente il layout con percorsi attesi e indica cosa manca, senza sostituirli con fotografie arbitrarie.
4. Progetta e realizza componenti modulari (`Header`, `Hero`, `BrandStory`, `Product`, `Benefits`, `Formats`, `Economics`, `Scenario`, `Support`, `IdealCandidate`, `Process`, `PilotLocation`, `FAQ`, `LeadForm`, `Footer`, `MobileStickyCTA`) e dati strutturati in file separati per evitare duplicazioni. Puoi scegliere una suddivisione migliore se spiegabile.
5. Completa installazione, avvio, lint, typecheck e build quando l'ambiente lo consente. Correggi errori; non asserire che tutto funziona se non hai effettuato le verifiche. Controlla visualmente (se browser disponibile) almeno 375, 390, 768, 1024 e 1440 px; nessuno scrolling orizzontale o testo tagliato.
6. Concludi con un riepilogo concreto dei file creati, comandi di avvio, asset utilizzati, ciò che è operativo e **blocker di go-live**. Non dire che CRM, analytics o privacy policy sono attivi se non configurati.

## 2. Asset fotografici — OBBLIGATORIO

Le cinque fotografie allegate **rappresentano esclusivamente gli interni reali di B&J Pub a Ragusa**. Non raffigurano l’arrotolata: **non spacciarle per foto prodotto** e non usare immagini stock generiche di pizza o pasta.

Nel pacchetto asset trovi i file già ottimizzati in WebP; puoi usare `next/image` con `sizes` ragionati e prioritizzare solo l’immagine hero.

| File nel progetto | Contenuto reale | Uso consigliato |
|---|---|---|
| `/images/bj-pub-bancone-frontale.webp` | Ampia vista frontale del bancone, con insegna B&J | Sezione punto pilota / gallery locale |
| `/images/bj-pub-sala-volta-pietra.webp` | Sala tavoli con volta in pietra e arredi | Hero (colonna fotografica) o sezione storia |
| `/images/bj-pub-sala-ampia.webp` | Sala grande con tavoli e arco in pietra | Sezione format FULL / gallery ambienti |
| `/images/bj-pub-sala-fotografie.webp` | Sala raccolta con fotografie alle pareti | Storia / gallery ambienti |
| `/images/bj-pub-bancone-arco.webp` | Vista laterale del bancone con arco in pietra | Punto pilota / sezione brand |

Alt descrittivi e fedeli: per esempio «Sala interna del B&J Pub con volta in pietra»; non usare alt promozionali né parole chiave artificiali. Evita crop che falsano l’ambiente, proteggi eventuali elementi importanti con `object-position` personalizzato.

**Foto prodotto mancanti e prioritarie prima del go-live:** arrotolata intera, arrotolata tagliata in otto pezzi, dettaglio della farcitura, fase di preparazione, confezione da asporto. Predisponi file configurabili (`/images/arrotolata-intera.webp`, `/images/arrotolata-otto-pezzi.webp`, `/images/arrotolata-farcitura.webp`, `/images/arrotolata-preparazione.webp`, `/images/arrotolata-packaging.webp`) **senza crearli né caricare URL rotti**. In modalità bozza, nel modulo prodotto usa un placeholder editoriale visivamente sobrio con la dicitura esplicita «Foto autentica dell’arrotolata da inserire», riconoscibile come placeholder e non come foto esistente. Evidenzia in checklist che il sito non va pubblicato con tale placeholder.

**Logo:** manca il logo ufficiale vettoriale. Realizza temporaneamente un **wordmark tipografico «B&J Pub»** semplice, chiaramente sostituibile tramite un solo componente/asset; non presentarlo come logo registrato ufficiale. Non imitare altri brand.

## 3. Design system e direzione artistica

- Identità: **food premium contemporaneo con radici pub**, calore materico, carattere autentico e geometrie editoriali.
- Palette **provvisoria** e centralizzata in CSS custom properties (da verificare con logo e brand kit): avorio caldo `#F6F1E8`, bianco caldo `#FFFCF7`, bordeaux profondo `#571D2A`, antracite `#242322`, beige pietra `#D8C6AA`, grigio caldo `#6B635D`. Prediligi superfici chiare, contrasto nitido e uso misurato del bordeaux per CTA e dettagli.
- Tipografia: forte gerarchia editoriale, H1 memorabile ma leggibile, titoli eventualmente serif sobrio con fallback locale (Georgia/Palatino), corpo sans system-ui/Arial; non dipendere dal download di font esterni per renderizzare correttamente.
- Layout: contenitore massimo ~1200–1280 px; grid a 12 colonne per desktop dove utile; spaziature coerenti; sezioni alternate in modo naturale; angoli poco arrotondati, linee di separazione sottili, ombre quasi assenti.
- Fotografia di locale ampia e reale, con tonalità calde. Per la hero preferisci **copy su fondo avorio a sinistra e foto del locale a destra** (non sovrapporre testo alla foto se contrasta male); mobile: copy/CTA leggibili sopra, immagine subito sotto o integrata senza rallentare la lettura.
- Ingredienti visivi distintivi: tipografia, composizione fotografica e trattamenti di bordo ispirati alla pietra/legno degli interni, non cliché da pub né illustrazioni decorative.
- Pulsanti pieni, ad alto contrasto, target min 44 px, stati hover/focus/disabled. CTA secondarie outline o testuali con affordance evidente.
- Mobile sticky CTA «Richiedi informazioni» solo quando utile e senza coprire form, footer, cookie UI o contenuto; rispetta `safe-area-inset-bottom`. Su desktop navbar compatta con CTA. Niente popup invasivi o contatori di urgenza.

## 4. Architettura informativa, UI e CRO

Realizza queste sezioni **nell’ordine**. Mantieni **esattamente** i testi editoriali della sezione 5 qui sotto: non riscrivere claim, non saltare disclaimer, non cambiare cifre. Sono consentite soltanto etichette tecniche necessarie a usabilità, accessibilità ed errori del form.

1. **Navbar:** wordmark provvisorio; link interno «Il brand», «Il prodotto», «I format», «Investimento», «FAQ» se c'è spazio; CTA «Richiedi informazioni» a `#candidatura`. Mobile menu leggero accessibile oppure navigazione minimale; nessun link vuoto.
2. **Hero:** eyebrow, H1 unico, testo, 3 dati principali (fee, metratura minima, supporto), CTA primaria `#candidatura`, secondaria `#format`; foto reale del locale, non foto di arrotolata inventata.
3. **Il brand:** storia affiancata a foto ambiente.
4. **Il prodotto:** titolo, descrizione, farciture tipografiche e area gallery riservata alle future foto autentiche, con un placeholder onesto in bozza. CTA al form.
5. **Perché B&J:** cinque benefit con microtitoli e testi forniti, senza icone ornamentali.
6. **I format:** due colonne/card comparabili STREET 30–50 mq e FULL 60–100 mq; non assegnare a ciascun format prezzi/ricavi/personale non forniti. Aggiungi nota valutazione locale e CTA.
7. **Investimento:** tabella economica leggibile e pienamente responsive con le sette righe fornite, valori da file dati centrale. Su mobile conserva la semantica della tabella (eventualmente scroll interno orizzontale dichiarato, non overflow della pagina). Riporta la nota su costi esclusi **in prossimità della tabella**, non in un footer nascosto. CTA.
8. **Modello economico:** rendi riconoscibili €12, 300 giorni e ~80 scontrini/giorno quali **ipotesi del modello**. Includi anche 18 mesi e €80.000 nel testo completo, con disclaimer ben visibile. **Non** promuovere payback/pareggio come risultati reali o garantiti, non creare grafici di ROI fittizi.
9. **Cosa offriamo:** sette ambiti di assistenza, testuali e ordinati.
10. **A chi ci rivolgiamo:** profili, qualità attese, location e bacino 50.000 abitanti; non presentarlo come requisito automatico di accettazione.
11. **Come funziona:** cinque passaggi numerati, verticali mobile e leggibili desktop, senza progress bar fittizie.
12. **Punto pilota:** foto del vero locale a Ragusa e spiegazione; non sostenere che la rete abbia già punti affiliati, non inventare indirizzo, orari o risultati commerciali.
13. **FAQ:** 5 domande/risposte fornite, accordion nativo (`details/summary`) oppure ARIA corretto con interazione da tastiera; nessuna FAQ inventata.
14. **Form finale:** `id="candidatura"`, titolo, introduzione, campi completi, validazione, messaggi onesti. CTA finale e microcopy.
15. **Footer:** brand, copyright con anno automatico, link privacy reale solo se configurato e ogni contatto verificato; non creare indirizzi email o telefonici inesistenti.

**CRO:** ogni CTA intermedia porta al form (`#candidatura`), salvo «Scopri il format» che va a `#format`. Usa `scroll-margin-top` per non nascondere l’intestazione sotto la navbar. Non inserire più form concorrenti; priorità a chiarezza, rassicurazione e qualifica del lead. Mantieni le principali condizioni economiche chiaramente visibili, senza indurre a pensare che €8.000 sia l’investimento totale. Evita fake reviews, badge, numeri gonfiati, countdown e claim come «guadagni garantiti».

## 5. Copy APPROVATO — inserire integralmente e fedelmente

### 01 | HERO — Prima schermata

**EYEBROW:** B&J Pub • Dal 2002 a Ragusa

**H1:** Apri B&J Pub. Porta l’arrotolata nella tua città.

**SOTTOTITOLO:** Una specialità originale, un’identità riconoscibile e un format di ristorazione progettato per il take away e il consumo sul posto. Diventa affiliato B&J Pub e costruisci la tua attività attorno al prodotto che ci distingue.

**PUNTI IN EVIDENZA:** Fee d’ingresso € 8.000 + IVA | Format da 30 mq | Formazione e supporto all’apertura

**CTA PRIMARIA:** Richiedi informazioni

**CTA SECONDARIA:** Scopri il format

### 02 | IL BRAND — Una storia, un prodotto

**H2:** Da Ragusa, un’idea di ristorazione diversa.

B&J Pub nasce nel 2002 come pub a conduzione familiare. Nel tempo ha costruito la propria identità attorno all’arrotolata: una preparazione ispirata alla pizza, farcita, arrotolata, cotta e servita in pratici tocchetti. Un prodotto da condividere a tavola oppure da portare via.

Oggi questa esperienza diventa la base di un progetto franchising: portare l’arrotolata originale in nuove città, mantenendo riconoscibilità, qualità e un metodo operativo comune.

### 03 | IL PRODOTTO — Il cuore del format

**H2:** Non la solita pizza. L’arrotolata originale.

L’arrotolata unisce un impasto artigianale a farciture che spaziano dai gusti classici agli abbinamenti più ricercati. Viene servita tagliata in otto pezzi, in una forma pratica per il consumo, la condivisione e l’asporto.

**DAL MENU:** Pistacchio e mortadella • Zucca e prosciutto cotto • Asparagi e gamberi • Tartufo e porcini • Wurstel e patatine • Versione dolce alla Nutella.

Il menu può essere affiancato da fritti e patatine, in funzione del format e dell’offerta approvata dalla Casa Madre.

**CTA:** Voglio conoscere B&J Pub

### 04 | PERCHÉ B&J — I vantaggi del modello

**H2:** Un prodotto distintivo. Un’attività organizzata.

**IDENTITÀ:** Una specialità immediatamente riconoscibile, al centro della comunicazione e del menu.

**FLESSIBILITÀ:** Due configurazioni di locale, dal take away al consumo rapido in sede.

**OPERATIVITÀ:** Ricette con grammature definite, processo di farcitura e cottura codificato, attrezzature individuate.

**VERSATILITÀ:** Un’offerta adatta a giovani, famiglie, lavoratori e turisti.

**SUPPORTO:** Formazione iniziale, manualistica, affiancamento e materiali di marketing coordinati.

### 05 | I FORMAT — Scegli lo spazio adatto

**H2:** Due formule. La stessa arrotolata.

**STREET | 30–50 mq**

Un punto vendita compatto, orientato al take away, ideale per aree pedonali, centri storici, università e zone turistiche.

**FULL | 60–100 mq**

Un locale con possibilità di consumo rapido sul posto e offerta più ampia, da configurare in base alla location.

La scelta definitiva del format e della metratura dipende dalla valutazione tecnica e commerciale del locale.

**CTA:** Parliamo della tua location

### 06 | NUMERI — L’investimento

**H2:** Le condizioni economiche, con chiarezza.

Il progetto B&J Pub prevede una fee d’ingresso e un investimento per l’allestimento modulato sulla superficie. Le condizioni di affiliazione sono presentate in modo trasparente, per permetterti di valutare l’opportunità con le informazioni necessarie.

**NOTA:** Il costo di allestimento non coincide con l’investimento totale: sono escluse le opere murarie e impiantistiche e possono aggiungersi altre spese di avviamento. I valori sono indicativi e soggetti a verifica.

**CTA:** Richiedi il prospetto economico

### 07 | MODELLO ECONOMICO — Le ipotesi

**H2:** Un progetto da valutare sui numeri.

Nello studio di fattibilità, il modello standard considera uno scontrino medio di € 12, 300 giorni di apertura annui e un punto di pareggio stimato di circa 80 scontrini al giorno. Il documento presenta anche un’ipotesi di payback di 18 mesi e un investimento di riferimento di € 80.000.

Sono simulazioni economiche, non risultati storici garantiti: redditività e tempi di rientro dipendono da location, costi, gestione e volumi reali. Il prospetto dettagliato viene approfondito durante il colloquio.

**CTA:** Richiedi un approfondimento

### 08 | COSA OFFRIAMO — Il sistema di affiliazione

**H2:** Apri la tua attività. Con un metodo alle spalle.

**LICENZA E IDENTITÀ:** Utilizzo del marchio B&J Pub – L’Arrotolata Originale e materiali coordinati.

**PROGETTAZIONE:** Supporto al layout e all’impostazione del punto vendita.

**FORMAZIONE:** Percorso iniziale sulla preparazione, sul food cost e sulla gestione operativa.

**MANUALISTICA:** Ricettari, grammature, procedure e checklist.

**AVVIAMENTO:** Affiancamento operativo all’apertura e supervisione iniziale.

**FORNITURE:** Sistema di approvvigionamento coordinato per ingredienti e materiali chiave.

**COMUNICAZIONE:** Materiali di lancio e piano editoriale coordinato.

Le modalità puntuali dei servizi saranno definite nella documentazione contrattuale.

### 09 | A CHI CI RIVOLGIAMO

**H2:** Cerchiamo persone che vogliano costruire un’attività.

B&J Pub si rivolge sia a chi desidera creare il proprio lavoro attraverso la gestione diretta di un punto vendita, sia a imprenditori interessati a un format food dall’identità chiara. Cerchiamo attenzione al prodotto, capacità organizzativa, disponibilità a seguire procedure condivise e orientamento al cliente.

Le location preferenziali comprendono centri storici, zone universitarie, aree turistiche e luoghi ad alta frequentazione. Bacino d’utenza minimo consigliato: 50.000 abitanti.

### 10 | COME FUNZIONA — Il percorso

**H2:** Dalla richiesta di informazioni all’apertura.

01. Invia la tua candidatura e raccontaci dove vorresti aprire.

02. Conosci il format e approfondisci investimento, condizioni e modello operativo.

03. Valutiamo insieme il profilo e la possibile location.

04. Definiamo progetto, formazione e percorso di avviamento.

05. Prepariamo il punto vendita e organizziamo l’apertura.

**CTA:** Candidati come affiliato

### 11 | PUNTO PILOTA — La prova del prodotto

**H2:** Vieni a conoscere l’arrotolata da vicino.

Il progetto nasce da un’attività reale, avviata a Ragusa nel 2002. Prima di scegliere, puoi chiedere un confronto con il team e approfondire il prodotto, il processo di preparazione e l’esperienza del punto vendita.

**CTA:** Organizza un primo colloquio

### 12 | FAQ

**D:** Serve esperienza nella ristorazione?

**R:** Il percorso comprende formazione iniziale e affiancamento; l’idoneità del candidato viene valutata dalla Casa Madre.

**D:** Quanto spazio serve?

**R:** La configurazione Street è prevista da 30 a 50 mq; la Full da 60 a 100 mq.

**D:** Quanto costa aprire?

**R:** La fee è di € 8.000 + IVA e l’allestimento è stimato in € 1.100/mq + IVA, esclusi lavori murari e impiantistici. Il budget complessivo viene definito sul progetto.

**D:** È previsto supporto all’apertura?

**R:** Sì, il progetto prevede formazione, manualistica e affiancamento operativo.

**D:** Posso proporre ingredienti locali?

**R:** Il modello contempla la possibilità di inserire 2–3 ingredienti locali, previa approvazione.

### 13 | FORM CONTATTI — Chiusura

**H2:** La prossima arrotolata potrebbe nascere nella tua città.

Compila il modulo per ricevere informazioni sul progetto franchising B&J Pub. Ti ricontatteremo per un primo confronto sul tuo profilo e sulla zona di interesse.

**CAMPI:** Nome • Cognome • Email • Telefono • Città/provincia di interesse • Disponibilità indicativa di investimento (fasce da definire) • Esperienza nel settore (opzionale) • Messaggio (opzionale).

**CONSENSO:** Checkbox obbligatoria per presa visione dell’informativa privacy; consenso marketing separato e facoltativo, se previsto.

**CTA FORM:** Richiedi informazioni sul franchising

**MICROCOPY:** Nessun impegno: la richiesta serve ad avviare un primo contatto.

### SCHEDA ECONOMICA — rendere come tabella semantica nella sezione 06

| Voce | Valore / condizione |
|---|---|
| Fee ingresso | € 8.000 + IVA |
| Allestimento indicativo | € 1.100/mq + IVA, escluse opere murarie e impiantistiche |
| Royalty | 2% del fatturato dal secondo mese; minimo € 300/mese |
| Marketing | € 500/mese |
| Street | 30–50 mq |
| Full | 60–100 mq |
| Bacino minimo consigliato | 50.000 abitanti |

## 6. Requisiti dettagliati del form e trattamento lead

- Campi obbligatori: nome, cognome, email, telefono, città/provincia di interesse, **presa visione privacy**. I campi esperienza, messaggio sono opzionali.
- **Disponibilità indicativa di investimento:** la Casa Madre non ha ancora approvato le fasce. NON inventare soglie in euro. Definisci un elenco configurabile `investmentBands` inizialmente vuoto; quando vuoto, mostra un campo di testo libero etichettato «Disponibilità indicativa di investimento» con spiegazione neutra; quando la lista verrà approvata, mostra una select con le vere fasce. In entrambi i casi mantieni il dato nel payload con uno schema definito. È un punto aperto prima del go-live.
- Etichette sempre visibili e associate (`label` + `id`), `autocomplete` adeguato, `type=email`, `type=tel`, validazioni sia client che server, errori inline vicino al campo, focus del primo errore, stato loading, prevenzione doppio click, `aria-live` per esito. Non chiedere più dati del necessario e non registrare email/telefono nelle analytics.
- Checkbox presa visione **non preselezionata**, distinta dalla checkbox facoltativa marketing **non preselezionata**; non fondere i consensi. Mostra il marketing solo se finalità, testo e gestione consenso sono definiti. La privacy policy deve avere URL configurabile, NON `href="#"`. Il modulo non può essere considerato pubblicabile finché policy/titolare/base giuridica non sono confermati.
- Non promettere risposta in 24 ore o altre tempistiche non fornite.
- **Backend:** realizza handler server `/api/leads` con validazione server, limite dimensione input e predisposizione semplice per CRM/webhook via secret server-side (`LEAD_WEBHOOK_URL`), mai inserire secret nel bundle client, non inventare un endpoint. Se non configurato, non trasmettere né memorizzare PII: restituisci un errore esplicito di configurazione; in modalità demo usa un messaggio inequivocabile «Modulo dimostrativo: nessun dato è stato inviato» **e non simulare un lead acquisito**. Non scrivere dati personali nei log.
- Predisponi protezione anti-spam sobria (honeypot server validated e semplice rate limit documentato, chiarendo se la strategia in-memory non è adatta a serverless multi-instance). Gestisci network errors e accessibilità.
- Eventi analytics predisposti ma inattivi fino a integrazione: `cta_click` con `section`/`label`, `form_start`, `form_validation_error` senza PII, `form_submit_attempt`, `lead_submit_success` **solo dopo successo server reale**, `lead_submit_error`. La funzione di tracking deve essere testabile, non generare eccezioni se GA/GTM assenti, rispettare il consenso applicabile.

## 7. SEO, accessibilità, performance, qualità

- Lingua italiana `lang="it"`; page title suggerito: «Franchising B&J Pub | Apri L’Arrotolata Originale»; meta description fedele alla proposta, senza numeri inventati. Un solo `h1`, gerarchia `h2/h3` coerente, `main`, `section` con `aria-labelledby`, `header`, `footer` semantici. URL canonical soltanto quando il dominio definitivo sarà confermato, niente URL fittizi; stesso criterio per `og:url`, `og:image`, sitemap e JSON-LD.
- Open Graph con testo e immagine reale locale disponibile; se dominio non definito, non pubblicare riferimenti inventati. Dati strutturati solo se i dettagli verificati li rendono appropriati, **mai inventare informazioni aziendali**.
- WCAG AA come obiettivo: contrasto verificato, focus visibile, corretta lettura da screen reader, CTA distinte, aria per accordion se custom, `prefers-reduced-motion`, tap targets, navigazione tastiera completa, zero motion obbligatorio.
- Core Web Vitals: dimensioni immagini dichiarate, `next/image`, `sizes`, `priority`/`fetchPriority` soltanto per la hero, lazy load per altre foto; evitare layout shift, niente autoplay/video, niente animazioni pesanti o JS inutili. Usa WebP esistenti. Per il prodotto mancante evita richieste HTTP 404.
- Responsive: composizioni curate a 360–430, 768, 1024, 1440 px, griglie che si impilano senza compromessi, tabelle utilizzabili, FAQ senza tagli, font `clamp()` con minimi ragionevoli, navbar usabile, sticky CTA non sovrapposta al modulo.
- Documenta un controllo funzionale di tutti i link interni (ancore esistenti), bottoni, FAQ, form, consensi, responsive e stato backend demo/configurato.

## 8. File, configurazione e consegna

Organizza progetto in modo semplice, per esempio:

```text
app/
  page.tsx
  layout.tsx
  globals.css
  api/leads/route.ts
components/
  Header.tsx
  Hero.tsx
  ...
  LeadForm.tsx
lib/
  content.ts
  config.ts
  analytics.ts
  validation.ts
public/images/
  bj-pub-bancone-frontale.webp
  bj-pub-sala-volta-pietra.webp
  bj-pub-sala-ampia.webp
  bj-pub-sala-fotografie.webp
  bj-pub-bancone-arco.webp
.env.example
README.md
```

La struttura è indicativa, non un vincolo rigido. Centralizza numeri e copy per evitare errori e aggiornarli senza modificare decine di componenti. Prevedi immagini prodotto mancanti in configurazione come `null` o array vuoti, **non** come `src` obbligatori inesistenti. Non rendere falsi i dati economici con un calcolatore di guadagni o costi totali basato su ipotesi non fornite.

Nel `README.md` documenta: come avviare il progetto; dove mettere logo e fotografie prodotto; come sostituire la palette provvisoria; dove modificare fasce di investimento; come configurare lato server il form con CRM/webhook e policy privacy; quale comportamento ha la demo; come collegare analytics nel rispetto del consenso; come testare la build.

**Checklist blocker prima del go-live:**

- Logo ufficiale B&J e palette verificata.
- Fotografie vere dell’arrotolata (intera, otto pezzi, farcitura, preparazione, packaging), con diritti d'uso.
- Conferma denominazioni e metrature STREET/FULL.
- Conferma per iscritto fee, allestimento, royalty minima e contributo marketing, e chiarimento voci escluse e investimento complessivo.
- Validazione delle simulazioni economiche (€12, 300 giorni, ~80 scontrini, payback 18 mesi, €80.000) e nota metodologica.
- Nessun uso di claim su brevetti senza documentazione giuridica verificata.
- Titolare, informativa privacy, trattamenti e checkbox approvati; URL privacy reale.
- Fasce di investimento approvate, integrazione CRM/webhook reale, test invio e conservazione dati, sicurezza/anti-spam.
- Eventuale contatto del brand, dominio e DNS, social/OG, cookie e analytics verificati.
- Nessuna promessa di tempi di risposta non validati.

## 9. Criteri di accettazione e risultato finale

Consegnami un'implementazione **visivamente curata e realmente navigabile**, non wireframe, con:

- Tutti i 13 blocchi di copy, le 7 righe della tabella e le 5 FAQ presenti senza errori.
- Le 5 foto del locale effettivamente visibili in sezioni pertinenti, distribuite con criterio senza allungare artificialmente la pagina, e nessuna fotografia inventata di arrotolata.
- Mobile first, forte gerarchia visiva, CTA consistenti e funzionanti, form predisposto e trasparente sullo stato demo.
- SEO, accessibilità, caricamento immagini e testing adeguati, errori di build corretti se eseguibili.
- Riepilogo onesto dei TODO e blocker di pubblicazione.

**Ora inizia leggendo il repository e gli asset e procedi direttamente con l'implementazione completa. Non fermarti a un concept, non chiedermi di riscrivere i testi, e non inventare i materiali mancanti.**
