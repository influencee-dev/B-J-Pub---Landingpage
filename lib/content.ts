/**
 * Copy approvato (PROMPT_CLAUDE_CODE.md, sezione 5).
 * Modificare qui i testi: i componenti li leggono da questo file.
 * Non riscrivere claim, cifre o disclaimer senza approvazione della Casa Madre.
 */

export const FORM_ANCHOR = "#candidatura";
export const FORMAT_ANCHOR = "#format";

export const brand = {
  name: "B&J Pub",
  fullName: "B&J Pub – L’Arrotolata Originale",
};

export const nav = [
  { href: "#brand", label: "Il brand" },
  { href: "#prodotto", label: "Il prodotto" },
  { href: "#format", label: "I format" },
  { href: "#investimento", label: "Investimento" },
  { href: "#faq", label: "FAQ" },
];

export const primaryCtaLabel = "Richiedi informazioni";

export const hero = {
  eyebrow: "B&J Pub • Dal 2002 a Ragusa",
  title: "Apri B&J Pub. Porta l’arrotolata nella tua città.",
  subtitle:
    "Una specialità originale, un’identità riconoscibile e un format di ristorazione progettato per il take away e il consumo sul posto. Diventa affiliato B&J Pub e costruisci la tua attività attorno al prodotto che ci distingue.",
  highlights: [
    { label: "Fee d’ingresso", value: "€ 8.000 + IVA" },
    { label: "Format da", value: "30 mq" },
    { label: "Formazione e supporto", value: "all’apertura" },
  ],
  primaryCta: "Richiedi informazioni",
  secondaryCta: "Scopri il format",
};

export const brandStory = {
  kicker: "Il brand — Una storia, un prodotto",
  title: "Da Ragusa, un’idea di ristorazione diversa.",
  paragraphs: [
    "B&J Pub nasce nel 2002 come pub a conduzione familiare. Nel tempo ha costruito la propria identità attorno all’arrotolata: una preparazione ispirata alla pizza, farcita, arrotolata, cotta e servita in pratici tocchetti. Un prodotto da condividere a tavola oppure da portare via.",
    "Oggi questa esperienza diventa la base di un progetto franchising: portare l’arrotolata originale in nuove città, mantenendo riconoscibilità, qualità e un metodo operativo comune.",
  ],
};

export const product = {
  kicker: "Il prodotto — Il cuore del format",
  title: "Non la solita pizza. L’arrotolata originale.",
  intro:
    "L’arrotolata unisce un impasto artigianale a farciture che spaziano dai gusti classici agli abbinamenti più ricercati. Viene servita tagliata in otto pezzi, in una forma pratica per il consumo, la condivisione e l’asporto.",
  menuLabel: "Dal menu",
  menu: [
    "Pistacchio e mortadella",
    "Zucca e prosciutto cotto",
    "Asparagi e gamberi",
    "Tartufo e porcini",
    "Wurstel e patatine",
    "Versione dolce alla Nutella",
  ],
  note: "Il menu può essere affiancato da fritti e patatine, in funzione del format e dell’offerta approvata dalla Casa Madre.",
  cta: "Voglio conoscere B&J Pub",
  placeholder: "Foto autentica dell’arrotolata da inserire",
};

export const benefits = {
  kicker: "Perché B&J — I vantaggi del modello",
  title: "Un prodotto distintivo. Un’attività organizzata.",
  items: [
    {
      title: "Identità",
      text: "Una specialità immediatamente riconoscibile, al centro della comunicazione e del menu.",
    },
    {
      title: "Flessibilità",
      text: "Due configurazioni di locale, dal take away al consumo rapido in sede.",
    },
    {
      title: "Operatività",
      text: "Ricette con grammature definite, processo di farcitura e cottura codificato, attrezzature individuate.",
    },
    {
      title: "Versatilità",
      text: "Un’offerta adatta a giovani, famiglie, lavoratori e turisti.",
    },
    {
      title: "Supporto",
      text: "Formazione iniziale, manualistica, affiancamento e materiali di marketing coordinati.",
    },
  ],
};

export const formats = {
  kicker: "I format — Scegli lo spazio adatto",
  title: "Due formule. La stessa arrotolata.",
  items: [
    {
      key: "street",
      name: "Street",
      size: "30–50 mq",
      text: "Un punto vendita compatto, orientato al take away, ideale per aree pedonali, centri storici, università e zone turistiche.",
    },
    {
      key: "full",
      name: "Full",
      size: "60–100 mq",
      text: "Un locale con possibilità di consumo rapido sul posto e offerta più ampia, da configurare in base alla location.",
    },
  ],
  note: "La scelta definitiva del format e della metratura dipende dalla valutazione tecnica e commerciale del locale.",
  cta: "Parliamo della tua location",
};

/** Scheda economica: unica fonte dei valori mostrati in tabella. */
export const economicsTable: ReadonlyArray<{ item: string; value: string }> = [
  { item: "Fee ingresso", value: "€ 8.000 + IVA" },
  {
    item: "Allestimento indicativo",
    value: "€ 1.100/mq + IVA, escluse opere murarie e impiantistiche",
  },
  { item: "Royalty", value: "2% del fatturato dal secondo mese; minimo € 300/mese" },
  { item: "Marketing", value: "€ 500/mese" },
  { item: "Street", value: "30–50 mq" },
  { item: "Full", value: "60–100 mq" },
  { item: "Bacino minimo consigliato", value: "50.000 abitanti" },
];

export const economics = {
  kicker: "Numeri — L’investimento",
  title: "Le condizioni economiche, con chiarezza.",
  intro:
    "Il progetto B&J Pub prevede una fee d’ingresso e un investimento per l’allestimento modulato sulla superficie. Le condizioni di affiliazione sono presentate in modo trasparente, per permetterti di valutare l’opportunità con le informazioni necessarie.",
  tableCaption: "Scheda economica",
  noteLabel: "Nota",
  note: "Il costo di allestimento non coincide con l’investimento totale: sono escluse le opere murarie e impiantistiche e possono aggiungersi altre spese di avviamento. I valori sono indicativi e soggetti a verifica.",
  cta: "Richiedi il prospetto economico",
};

export const scenario = {
  kicker: "Modello economico — Le ipotesi",
  title: "Un progetto da valutare sui numeri.",
  /** Parti del testo approvato evidenziate come ipotesi del modello (nessun testo aggiunto). */
  highlights: ["scontrino medio di € 12", "300 giorni di apertura annui", "circa 80 scontrini al giorno", "payback di 18 mesi", "€ 80.000"],
  paragraphs: [
    "Nello studio di fattibilità, il modello standard considera uno scontrino medio di € 12, 300 giorni di apertura annui e un punto di pareggio stimato di circa 80 scontrini al giorno. Il documento presenta anche un’ipotesi di payback di 18 mesi e un investimento di riferimento di € 80.000.",
  ],
  disclaimer:
    "Sono simulazioni economiche, non risultati storici garantiti: redditività e tempi di rientro dipendono da location, costi, gestione e volumi reali. Il prospetto dettagliato viene approfondito durante il colloquio.",
  cta: "Richiedi un approfondimento",
};

export const support = {
  kicker: "Cosa offriamo — Il sistema di affiliazione",
  title: "Apri la tua attività. Con un metodo alle spalle.",
  items: [
    {
      title: "Licenza e identità",
      text: "Utilizzo del marchio B&J Pub – L’Arrotolata Originale e materiali coordinati.",
    },
    { title: "Progettazione", text: "Supporto al layout e all’impostazione del punto vendita." },
    {
      title: "Formazione",
      text: "Percorso iniziale sulla preparazione, sul food cost e sulla gestione operativa.",
    },
    { title: "Manualistica", text: "Ricettari, grammature, procedure e checklist." },
    { title: "Avviamento", text: "Affiancamento operativo all’apertura e supervisione iniziale." },
    {
      title: "Forniture",
      text: "Sistema di approvvigionamento coordinato per ingredienti e materiali chiave.",
    },
    { title: "Comunicazione", text: "Materiali di lancio e piano editoriale coordinato." },
  ],
  note: "Le modalità puntuali dei servizi saranno definite nella documentazione contrattuale.",
};

export const idealCandidate = {
  kicker: "A chi ci rivolgiamo",
  title: "Cerchiamo persone che vogliano costruire un’attività.",
  profile:
    "B&J Pub si rivolge sia a chi desidera creare il proprio lavoro attraverso la gestione diretta di un punto vendita, sia a imprenditori interessati a un format food dall’identità chiara. Cerchiamo attenzione al prodotto, capacità organizzativa, disponibilità a seguire procedure condivise e orientamento al cliente.",
  locations:
    "Le location preferenziali comprendono centri storici, zone universitarie, aree turistiche e luoghi ad alta frequentazione.",
  catchment: "Bacino d’utenza minimo consigliato: 50.000 abitanti.",
};

export const process = {
  kicker: "Come funziona — Il percorso",
  title: "Dalla richiesta di informazioni all’apertura.",
  steps: [
    "Invia la tua candidatura e raccontaci dove vorresti aprire.",
    "Conosci il format e approfondisci investimento, condizioni e modello operativo.",
    "Valutiamo insieme il profilo e la possibile location.",
    "Definiamo progetto, formazione e percorso di avviamento.",
    "Prepariamo il punto vendita e organizziamo l’apertura.",
  ],
  cta: "Candidati come affiliato",
};

export const pilot = {
  kicker: "Punto pilota — La prova del prodotto",
  title: "Vieni a conoscere l’arrotolata da vicino.",
  text: "Il progetto nasce da un’attività reale, avviata a Ragusa nel 2002. Prima di scegliere, puoi chiedere un confronto con il team e approfondire il prodotto, il processo di preparazione e l’esperienza del punto vendita.",
  cta: "Organizza un primo colloquio",
};

export const faq = {
  title: "FAQ",
  items: [
    {
      q: "Serve esperienza nella ristorazione?",
      a: "Il percorso comprende formazione iniziale e affiancamento; l’idoneità del candidato viene valutata dalla Casa Madre.",
    },
    {
      q: "Quanto spazio serve?",
      a: "La configurazione Street è prevista da 30 a 50 mq; la Full da 60 a 100 mq.",
    },
    {
      q: "Quanto costa aprire?",
      a: "La fee è di € 8.000 + IVA e l’allestimento è stimato in € 1.100/mq + IVA, esclusi lavori murari e impiantistici. Il budget complessivo viene definito sul progetto.",
    },
    {
      q: "È previsto supporto all’apertura?",
      a: "Sì, il progetto prevede formazione, manualistica e affiancamento operativo.",
    },
    {
      q: "Posso proporre ingredienti locali?",
      a: "Il modello contempla la possibilità di inserire 2–3 ingredienti locali, previa approvazione.",
    },
  ],
};

export const leadForm = {
  title: "La prossima arrotolata potrebbe nascere nella tua città.",
  intro:
    "Compila il modulo per ricevere informazioni sul progetto franchising B&J Pub. Ti ricontatteremo per un primo confronto sul tuo profilo e sulla zona di interesse.",
  submit: "Richiedi informazioni sul franchising",
  microcopy: "Nessun impegno: la richiesta serve ad avviare un primo contatto.",
};

/** Fotografie autentiche del locale di Ragusa (1800×1350). Non sono foto del prodotto. */
export const venuePhotos = {
  salaVoltaPietra: {
    src: "/images/bj-pub-sala-volta-pietra.webp",
    alt: "Sala interna del B&J Pub con volta in pietra e tavoli in legno scuro",
  },
  salaFotografie: {
    src: "/images/bj-pub-sala-fotografie.webp",
    alt: "Sala del B&J Pub con fotografie in bianco e nero alle pareti e volta in pietra",
  },
  salaAmpia: {
    src: "/images/bj-pub-sala-ampia.webp",
    alt: "Sala grande del B&J Pub con tavoli apparecchiati e porta ad arco in pietra",
  },
  banconeFrontale: {
    src: "/images/bj-pub-bancone-frontale.webp",
    alt: "Bancone del B&J Pub visto di fronte, con le iniziali B&J sul pannello",
  },
  banconeArco: {
    src: "/images/bj-pub-bancone-arco.webp",
    alt: "Bancone del B&J Pub visto di lato, con l’arco in pietra che porta alla sala",
  },
} as const;

export const PHOTO_WIDTH = 1800;
export const PHOTO_HEIGHT = 1350;
