export interface BlogArticle {
  id: string
  slug: string
  title: string
  category: string
  excerpt: string
  image: string
  date: string
  readTime: number
  body: BlogSection[]
}

export type BlogSection =
  | { type: 'intro'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'callout'; text: string }
  | { type: 'cta'; text: string; label: string; href: string }

export const blogArticles: BlogArticle[] = [
  {
    id: 'a001',
    slug: 'nlt-o-acquisto-quale-conviene-2025',
    title: 'NLT o Acquisto: quale conviene davvero nel 2025?',
    category: 'Noleggio Lungo Termine',
    excerpt:
      'Un confronto onesto tra noleggio a lungo termine e acquisto auto. Numeri alla mano, senza trucchi.',
    image: 'https://picsum.photos/seed/article-1/1200/630',
    date: '2025-02-14',
    readTime: 7,
    body: [
      {
        type: 'intro',
        text: 'La domanda che ci fanno più spesso: "Conviene di più comprare o noleggiare a lungo termine?" Non esiste una risposta universale, ma ci sono numeri concreti che possono aiutarti a scegliere.',
      },
      {
        type: 'h2',
        text: "Cosa include davvero il canone NLT",
      },
      {
        type: 'p',
        text: 'Un canone di noleggio lungo termine comprende molto più del semplice utilizzo del veicolo. Nel prezzo mensile sono tipicamente inclusi: bollo auto, assicurazione RC e Kasko, manutenzione ordinaria e straordinaria, assistenza stradale h24 e, spesso, la sostituzione degli pneumatici.',
      },
      {
        type: 'ul',
        items: [
          'Bollo auto incluso nel canone',
          'Assicurazione RC + Kasko',
          'Manutenzione ordinaria (tagliandi)',
          'Assistenza stradale 24 ore su 24',
          'Nessun anticipo elevato richiesto',
        ],
      },
      {
        type: 'h2',
        text: 'I costi nascosti dell\'acquisto tradizionale',
      },
      {
        type: 'p',
        text: 'Comprare un\'auto sembra più semplice, ma spesso ci si dimentica di sommare tutte le voci: svalutazione (mediamente il 15–20% nel primo anno), assicurazione, bollo, tagliandi, pneumatici, riparazioni impreviste. In media, un\'auto di fascia media costa tra 350€ e 500€ al mese in costi totali, anche se "è già pagata".',
      },
      {
        type: 'callout',
        text: 'Esempio pratico: un\'auto da 25.000€ acquistata oggi vale mediamente 18.000–19.000€ dopo soli 24 mesi. Hai perso oltre 6.000€ in svalutazione, escluse assicurazione e bollo.',
      },
      {
        type: 'h2',
        text: 'Quando conviene il noleggio lungo termine',
      },
      {
        type: 'p',
        text: 'Il NLT è la scelta migliore se: percorri tra 15.000 e 35.000 km l\'anno, non vuoi pensieri di manutenzione, sei una P.IVA (l\'IVA è detraibile e i costi sono deducibili), oppure vuoi cambiare auto ogni 3–4 anni senza rischi di svalutazione.',
      },
      {
        type: 'h2',
        text: 'Quando conviene acquistare',
      },
      {
        type: 'p',
        text: 'L\'acquisto torna conveniente se percorri meno di 10.000 km l\'anno, tieni l\'auto per più di 8–10 anni, hai liquidità disponibile e preferisci avere un bene in proprietà.',
      },
      {
        type: 'cta',
        text: 'Vuoi un preventivo NLT su misura per le tue esigenze?',
        label: 'Richiedi Preventivo Gratuito',
        href: '/noleggio-lungo',
      },
    ],
  },
  {
    id: 'a002',
    slug: 'come-scegliere-auto-per-azienda',
    title: "Come scegliere l'auto giusta per la tua azienda",
    category: 'Aziende',
    excerpt:
      'Guida pratica per titolari di P.IVA e imprenditori. Parametri da valutare, detrazioni fiscali e opzioni di finanziamento.',
    image: 'https://picsum.photos/seed/article-2/1200/630',
    date: '2025-01-28',
    readTime: 9,
    body: [
      {
        type: 'intro',
        text: 'Scegliere l\'auto aziendale è una decisione che incide sul bilancio dell\'impresa per anni. Ecco i criteri concreti che usiamo noi per consigliare i nostri clienti business.',
      },
      {
        type: 'h2',
        text: 'Il punto di partenza: quanti km fai all\'anno?',
      },
      {
        type: 'p',
        text: 'Prima di tutto, stima il tuo utilizzo annuo. Sotto i 15.000 km l\'anno un\'auto usata in proprietà può andare bene. Tra 15.000 e 40.000 km il NLT diventa quasi sempre la scelta più razionale. Sopra i 40.000 km valuta veicoli ibridi o elettrici per abbattere i costi del carburante.',
      },
      {
        type: 'h2',
        text: 'Le detrazioni fiscali che devi conoscere',
      },
      {
        type: 'ul',
        items: [
          'IVA al 40% detraibile per uso promiscuo (privati con P.IVA)',
          'IVA al 100% detraibile se l\'auto è utilizzata esclusivamente per l\'attività',
          'Costi deducibili al 20% per lavoratori autonomi (limite 18.075,99€)',
          'Costi deducibili al 70% per auto assegnate a dipendenti',
          'Canone NLT interamente deducibile entro i massimali di legge',
        ],
      },
      {
        type: 'callout',
        text: 'Attenzione: le regole cambiano a seconda della forma societaria (SRL, SNC, ditta individuale). Verifica sempre con il tuo commercialista prima di firmare.',
      },
      {
        type: 'h2',
        text: 'NLT vs leasing vs acquisto: il confronto per le aziende',
      },
      {
        type: 'p',
        text: 'Il noleggio lungo termine è in genere la soluzione più vantaggiosa per le PMI: nessun capitale immobilizzato, gestione extracontabile, deducibilità del canone. Il leasing è preferibile se vuoi riscattare il veicolo a fine contratto. L\'acquisto diretto ha senso solo per flotte numerose con gestione interna della manutenzione.',
      },
      {
        type: 'h2',
        text: 'Quali categorie di veicoli scegliere',
      },
      {
        type: 'p',
        text: 'Per uso commerciale in città: city car o berlina compatta, idealmente ibrida. Per rappresentanza: berlina premium o SUV di fascia media. Per agenti di commercio con molti km: berlina ibrida o SUV ibrido con consumi contenuti. Per trasporto materiali: furgone o SUV con capiente bagagliaio.',
      },
      {
        type: 'cta',
        text: 'Gestisci una flotta aziendale o hai bisogno di un\'auto per il lavoro?',
        label: 'Parla con un Consulente',
        href: '/contatti',
      },
    ],
  },
  {
    id: 'a003',
    slug: 'permuta-5-cose-da-sapere',
    title: 'Permuta auto: 5 cose da sapere prima di andare in concessionaria',
    category: 'Acquisto e Vendita',
    excerpt:
      'Come ottenere il massimo dalla tua permuta. Errori da evitare e strategie per non rimetterci.',
    image: 'https://picsum.photos/seed/article-3/1200/630',
    date: '2025-01-10',
    readTime: 6,
    body: [
      {
        type: 'intro',
        text: 'La permuta è uno degli strumenti più usati per cambiare auto — e uno dei più fraintesi. Prima di presentarti con le chiavi in mano, leggi queste 5 cose.',
      },
      {
        type: 'h2',
        text: '1. Conosci il valore reale della tua auto',
      },
      {
        type: 'p',
        text: 'Prima di qualsiasi trattativa, consulta le quotazioni ufficiali (Eurotax, Quattroruote) e cerca annunci simili sui principali portali. Sapere il range di mercato ti mette in una posizione di forza e ti permette di capire se l\'offerta che ti viene fatta è equa.',
      },
      {
        type: 'h2',
        text: '2. Lo stato dell\'auto conta, ma non quanto pensi',
      },
      {
        type: 'p',
        text: 'Un concessionario serio valuta l\'auto per quello che è, non per come la presenti. Un lavaggio e una lucidatura possono fare la differenza estetica, ma non cambiano il valore meccanico. Sii onesto sulle condizioni: piccoli difetti tenuti nascosti emergono sempre e rovinano la trattativa.',
      },
      {
        type: 'h2',
        text: '3. Non confondere il valore della permuta con il prezzo di vendita',
      },
      {
        type: 'p',
        text: 'Il valore che ti offrono per la tua auto è il prezzo che il concessionario stima di ricavare dalla rivendita, al netto dei costi di preparazione e del margine. Non è lo stesso che troveresti vendendo privatamente — ma evita la complessità di gestire l\'annuncio, le trattative e le pratiche burocratiche.',
      },
      {
        type: 'callout',
        text: 'Suggerimento: usa il valore della permuta come anticipo sul nuovo acquisto o noleggio. Spesso è più vantaggioso che gestire la vendita privata.',
      },
      {
        type: 'h2',
        text: '4. Controlla la storia del veicolo',
      },
      {
        type: 'p',
        text: 'Prima di offrire la tua auto in permuta, verifica che non ci siano fermi amministrativi, ipoteche o pratiche pendenti. Un\'auto con gravami non può essere trasferita e blocca l\'intera operazione. Puoi verificare tutto al PRA (Pubblico Registro Automobilistico).',
      },
      {
        type: 'h2',
        text: '5. Valuta l\'operazione nel suo insieme',
      },
      {
        type: 'p',
        text: 'Non guardare solo il valore della permuta: considera il prezzo del veicolo che acquisti, eventuali finanziamenti, garanzie incluse e assistenza post-vendita. Un concessionario che offre meno sulla permuta ma garantisce il nuovo veicolo e include l\'assistenza può comunque essere la scelta migliore.',
      },
      {
        type: 'cta',
        text: 'Vuoi una valutazione gratuita e senza impegno per la tua auto?',
        label: 'Valuta la tua Auto',
        href: '/permuta',
      },
    ],
  },
  {
    id: 'a004',
    slug: 'noleggio-breve-parma-guida-turisti',
    title: 'Noleggio breve a Parma: guida completa per i turisti',
    category: 'Noleggio Breve',
    excerpt:
      "Cosa sapere prima di noleggiare un'auto a Parma. Documenti necessari, tariffe medie e consigli pratici.",
    image: 'https://picsum.photos/seed/article-4/1200/630',
    date: '2024-12-05',
    readTime: 5,
    body: [
      {
        type: 'intro',
        text: 'Parma è una città che si visita volentieri, ma per esplorare la Food Valley, i castelli del Ducato o i borghi dell\'Appennino, l\'auto è quasi indispensabile. Ecco tutto quello che devi sapere per noleggiare senza sorprese.',
      },
      {
        type: 'h2',
        text: 'Documenti necessari',
      },
      {
        type: 'ul',
        items: [
          'Patente di guida valida (da almeno 1 anno)',
          'Carta d\'identità o passaporto',
          'Carta di credito intestata al guidatore (non prepagata)',
          'Per patenti extra-UE: patente internazionale',
        ],
      },
      {
        type: 'h2',
        text: 'Cosa è incluso nel noleggio',
      },
      {
        type: 'p',
        text: 'Il prezzo giornaliero include sempre: assicurazione RC obbligatoria, assistenza stradale, chilometraggio illimitato (verificare in offerta). Kasko e furto possono essere inclusi o aggiunti come optional.',
      },
      {
        type: 'h2',
        text: 'Cosa visitare in auto attorno a Parma',
      },
      {
        type: 'ul',
        items: [
          'Fontanellato e la Rocca Sanvitale (20 km)',
          'Soragna e il castello (30 km)',
          'Busseto, la città di Verdi (35 km)',
          'Castell\'Arquato — uno dei borghi più belli d\'Italia (45 km)',
          'Riserva naturale del Lago di Misto e i laghi dell\'Appennino',
        ],
      },
      {
        type: 'callout',
        text: 'Consiglio: prenota l\'auto almeno 48 ore prima, specialmente nei weekend estivi. La disponibilità si esaurisce rapidamente nelle stagioni di punta.',
      },
      {
        type: 'h2',
        text: 'Consegna a domicilio',
      },
      {
        type: 'p',
        text: 'Da Daunia Cars offriamo la consegna dell\'auto direttamente in hotel, bed & breakfast o stazione FS su Parma e provincia. Un risparmio di tempo prezioso per chi è in visita.',
      },
      {
        type: 'cta',
        text: 'Pianifica il tuo soggiorno in Food Valley con un\'auto affidabile.',
        label: 'Scopri il Noleggio Breve',
        href: '/noleggio-breve',
      },
    ],
  },
  {
    id: 'a005',
    slug: 'auto-usata-garantita-cosa-verificare',
    title: 'Auto usata garantita: cosa verificare prima di firmare',
    category: 'Acquisto e Vendita',
    excerpt:
      "Checklist completa per l'acquisto di un'auto usata. Documenti, storia, condizioni meccaniche e garanzie.",
    image: 'https://picsum.photos/seed/article-5/1200/630',
    date: '2024-11-18',
    readTime: 8,
    body: [
      {
        type: 'intro',
        text: "Acquistare un'auto usata è un atto di fiducia. Per ridurre il rischio al minimo, ecco la checklist che usiamo internamente prima di mettere in vendita ogni veicolo.",
      },
      {
        type: 'h2',
        text: 'Documenti da verificare',
      },
      {
        type: 'ul',
        items: [
          'Libretto di circolazione: verifica che il numero di telaio corrisponda',
          'Certificato di proprietà o atto di vendita del proprietario precedente',
          'Revisione in corso di validità (dura 2 anni)',
          'Estratto storico PRA: verifica proprietari precedenti e ipoteche',
          'Tagliandi: richiedi il libretto service con timbri officina',
        ],
      },
      {
        type: 'h2',
        text: 'Ispezione meccanica: cosa guardare',
      },
      {
        type: 'p',
        text: "Anche senza essere meccanici, ci sono segnali evidenti da non ignorare: fumo dal motore o dallo scarico, rumori anomali durante l'accelerazione o la frenata, usura irregolare degli pneumatici (segnale di problemi all'assetto), gioco nel volante, luci spia accese sul cruscotto.",
      },
      {
        type: 'callout',
        text: "Prima di acquistare un'auto usata da un privato, fai sempre fare una perizia da un meccanico di fiducia. Costa tra 50€ e 100€ e può farti risparmiare migliaia di euro.",
      },
      {
        type: 'h2',
        text: 'Cosa significa "garanzia inclusa"',
      },
      {
        type: 'p',
        text: "In Europa, il Codice del Consumo prevede una garanzia minima di 12 mesi sull'auto usata acquistata da un rivenditore professionale. Noi offriamo garanzia minima di 12 mesi su tutti i veicoli in vendita, con possibilità di estenderla a 24 mesi. La garanzia copre difetti meccanici non evidenti al momento dell'acquisto.",
      },
      {
        type: 'h2',
        text: 'I controlli che facciamo noi',
      },
      {
        type: 'ul',
        items: [
          'Verifica chilometri reali tramite software diagnostico',
          'Controllo carrozzeria con spessimetro (verifica riparazioni non dichiarate)',
          'Test drive completo su strada',
          'Controllo impianto frenante e pneumatici',
          'Verifica elettronica (codici errore, centraline)',
          'Revisione motoristica completa',
        ],
      },
      {
        type: 'cta',
        text: 'Scopri i veicoli usati garantiti disponibili in flotta.',
        label: 'Vedi Veicoli in Vendita',
        href: '/vendita',
      },
    ],
  },
  {
    id: 'a006',
    slug: 'detrazioni-fiscali-noleggio-aziendale',
    title: 'Detrazioni fiscali per il noleggio aziendale: tutto quello che devi sapere',
    category: 'Aziende',
    excerpt:
      'IVA detraibile, costi deducibili e vantaggi fiscali del NLT per le partite IVA. Aggiornato al 2025.',
    image: 'https://picsum.photos/seed/article-6/1200/630',
    date: '2024-10-30',
    readTime: 10,
    body: [
      {
        type: 'intro',
        text: 'Il noleggio lungo termine ha vantaggi fiscali significativi rispetto all\'acquisto, spesso sottovalutati. Ecco un riepilogo aggiornato al 2025 delle regole principali.',
      },
      {
        type: 'h2',
        text: 'IVA: quando si detrae e quanto',
      },
      {
        type: 'ul',
        items: [
          'Uso esclusivo aziendale (raro da dimostrare): IVA detraibile al 100%',
          'Uso promiscuo (la maggior parte dei casi): IVA detraibile al 40%',
          'Auto assegnate in uso ai dipendenti: IVA detraibile al 40%',
          'Agenti di commercio con auto strumentale: IVA detraibile al 100%',
        ],
      },
      {
        type: 'h2',
        text: 'Deducibilità dei costi: le regole per categoria',
      },
      {
        type: 'p',
        text: 'La deducibilità del canone NLT segue le stesse regole delle spese auto in generale: 20% per lavoratori autonomi e professionisti (con limite di 18.075,99€ sul valore del veicolo), 70% per auto assegnate a dipendenti come benefit, 80% per agenti di commercio.',
      },
      {
        type: 'callout',
        text: 'Importante: il limite di deducibilità si applica al valore del veicolo, non al canone annuo. Per un\'auto da 40.000€ in NLT, la base deducibile è limitata a 18.075,99€ — quindi solo quella quota del canone è fiscalmente rilevante.',
      },
      {
        type: 'h2',
        text: 'Vantaggi del NLT rispetto al leasing',
      },
      {
        type: 'p',
        text: 'A differenza del leasing, il canone NLT è trattato come spesa operativa (non come acquisto rateizzato): nessun bene iscritto in bilancio, nessun ammortamento da gestire. Per le PMI è una semplificazione contabile significativa, oltre che un vantaggio di liquidità.',
      },
      {
        type: 'h2',
        text: 'Fringe benefit: auto ai dipendenti',
      },
      {
        type: 'p',
        text: 'Assegnare un\'auto aziendale a un dipendente genera un fringe benefit tassabile in busta paga, calcolato sulla base del percorso convenzionale di 15.000 km annui e delle tabelle ACI. Dal 2025, le auto elettriche e ibride plug-in godono di percentuali di tassazione ridotte, incentivando l\'adozione di veicoli a basse emissioni.',
      },
      {
        type: 'cta',
        text: 'Vuoi un\'analisi personalizzata per ottimizzare la fiscalità della tua flotta?',
        label: 'Contatta un Consulente',
        href: '/contatti',
      },
    ],
  },
]
