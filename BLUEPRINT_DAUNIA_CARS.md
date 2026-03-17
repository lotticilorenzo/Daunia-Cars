# BLUEPRINT DAUNIA CARS — Architettura Completa del Sito
# Documento di riferimento per Claude Code
# Versione 1.0 — Da usare insieme a CLAUDE.md e SKILL.md

> ISTRUZIONE PER CLAUDE CODE:
> Questo documento è la fonte di verità per TUTTE le pagine.
> Ogni sezione elencata è OBBLIGATORIA. Non semplificare.
> Non omettere. Non inventare strutture diverse.
> Ogni testo tra [PARENTESI] è un placeholder da mantenere tale
> finché il cliente non fornisce i dati reali.

---

## MAPPA DEL SITO — Tutte le pagine

```
/                          → Homepage
/flotta                    → Catalogo veicoli completo
/flotta/[slug]             → Scheda singolo veicolo
/noleggio-breve            → Noleggio breve termine
/noleggio-lungo            → Noleggio lungo termine / NLT
/vendita                   → Vendita veicoli usati garantiti
/permuta                   → Permuta e valutazione
/finanziamenti             → Finanziamenti personalizzati
/contatti                  → Contatti + mappa
/chi-siamo                 → Storia e valori aziendali
/blog                      → Articoli SEO (struttura, no contenuto)
/privacy-policy            → Privacy GDPR
/cookie-policy             → Cookie policy
```

---

---
# PAGINA 1 — HOMEPAGE ( / )
---

## META SEO
```
title: "Daunia Cars — Noleggio e Vendita Auto a Parma"
description: "Noleggio auto breve e lungo termine, vendita veicoli
garantiti, permuta e finanziamenti a Parma. Qualità, trasparenza
e soluzioni su misura. Scopri la flotta Daunia Cars."
canonical: "https://daunia.cars/"
og:image: "/og/homepage.jpg"
schema: LocalBusiness + AutoDealer
```

---

## SEZIONE 1 — HERO
**Tipo:** Full viewport, contenuto basso-sinistra
**Altezza:** `min-h-[100dvh]`
**Immagine sfondo:** Highway notturna bagnata dalla pioggia,
luci bokeh in lontananza — `picsum.photos/seed/highway-night/1920/1080`
con overlay `bg-gradient-to-t from-bg via-bg/60 to-transparent`

**Contenuto (da basso a sx, padding-bottom: 12vh, padding-left: 8vw):**

Label sopra il titolo:
```
[ icona MapPin Phosphor ] PARMA, EMILIA-ROMAGNA
```
Stile: uppercase, JetBrains Mono 11px, colore text-muted,
letter-spacing 0.12em

Titolo principale (2 righe):
```
Riga 1: "LA TUA PROSSIMA AUTO"
         Barlow Condensed 800, clamp(56px,8vw,104px),
         colore text-primary, tracking -0.02em
Riga 2: "Ti Aspetta Qui."
         Barlow Condensed 800 Italic, stesso size,
         colore accent (#E8380D)
```

Sottotitolo:
```
"Auto selezionate, noleggio flessibile, trasparenza reale.
 Daunia Cars è il punto di riferimento per la mobilità a Parma."
DM Sans 400, 18px, colore text-secondary, max-w-[48ch], line-height 1.6
```

Due CTA in row:
```
[ MagneticButton primary ] "Scopri la Flotta"  → /flotta
[ MagneticButton ghost   ] "Richiedi Preventivo" → /contatti
gap: 16px, margin-top: 32px
```

Badge trust in basso a destra della hero (absolute):
```
"★ 4.8  ·  98.3% Clienti Soddisfatti  ·  +500 Veicoli gestiti"
bg surface/80, backdrop-blur, border border-color,
padding 10px 20px, border-radius 100px,
JetBrains Mono 12px, colore text-secondary
```

**Scroll indicator:** freccia CaretDoubleDown Phosphor,
animazione bounce CSS infinita, colore chrome, centrata in basso

**Animazione GSAP:**
- Label: y:30→0, opacity:0→1, delay:0.1s
- Riga 1: y:50→0, opacity:0→1, delay:0.25s
- Riga 2: y:50→0, opacity:0→1, delay:0.4s
- Sottotitolo: y:30→0, opacity:0→1, delay:0.55s
- CTA: y:20→0, opacity:0→1, delay:0.7s, stagger:0.1s
- Badge: scale:0.9→1, opacity:0→1, delay:1s
- ease: power3.out su tutti

---

## SEZIONE 2 — CAR SCROLL (Animazione Signature)
**Tipo:** Scroll-driven pinnata, ~200vh
**Sfondo:** Asfalto bagnato con riflessi, molto scuro,
overlay 85% opacità — `picsum.photos/seed/asphalt-wet/1920/600`

**SVG Auto (inline, disegnato da Claude Code):**
Profilo laterale stilizzato di berlina moderna.
Linee clean, niente dettagli troppo fini.
Larghezza SVG: 600px su desktop, 320px su mobile.
Colori: corpo `#1C1C20`, vetri `#2A3A4A`,
cerchi `#C8C8D0` (chrome), dettagli `#E8380D` (accent).
Posizione verticale: 65% altezza sezione.

**Trail luce:**
Pseudo-elemento sotto l'auto, larghezza 400px, altezza 8px,
gradient orizzontale `from-transparent via-accent/30 to-transparent`,
blur 12px, anch'esso animato in sync con l'auto.

**4 Data Chips (appaiono in sequenza):**
Struttura ogni chip:
```
[ Icona Phosphor ] LABEL UPPERCASE
                   Valore grande
```
Stile: bg surface, border 1px border-color,
padding 12px 20px, border-radius 12px,
label in JetBrains Mono 11px text-muted uppercase,
valore in Barlow Condensed 700 28px text-primary

Chip 1 (appare a scrub 0.1, posizione alto-sx):
```
[ Car ] FLOTTA DISPONIBILE
        500+ Veicoli
```
Chip 2 (appare a scrub 0.3, posizione alto-dx):
```
[ MapPin ] SEDE PRINCIPALE
           Parma, dal 2010
```
Chip 3 (appare a scrub 0.55, posizione basso-sx):
```
[ CalendarBlank ] SERVIZI ATTIVI
                  Noleggio & Vendita
```
Chip 4 (appare a scrub 0.75, posizione basso-dx):
```
[ CurrencyEur ] SOLUZIONI FINANZIARIE
                Finanziamenti Su Misura
```

**GSAP ScrollTrigger:**
```javascript
pin: true
start: 'top top'
end: '+=200%'
scrub: 1.5
anticipatePin: 1
```

**Mobile fallback (<768px):**
Auto ridotta a 65vw, chips in 2x2 grid fisso (no scroll reveal),
durata ridotta a +=120%

---

## SEZIONE 3 — STATS (Numeri che contano)
**Tipo:** Banda orizzontale, no card, separatori 1px
**Sfondo:** `bg-surface-2`
**Padding:** 80px verticale

**4 Counter con GSAP count-up al viewport:**

```
| 500+        | 98.3%          | 14            | 4.8 ★        |
| Veicoli     | Clienti        | Anni di        | Rating       |
| Gestiti     | Soddisfatti    | Esperienza     | Medio        |
```

Ogni numero: JetBrains Mono 800, clamp(40px,6vw,72px), colore accent
Label sotto: DM Sans 500 12px uppercase, letter-spacing 0.1em,
colore text-muted

Layout: `grid grid-cols-4` desktop, `grid grid-cols-2` mobile
Separatori: `divide-x divide-border` desktop, `divide-y` mobile

**GSAP count-up:**
```javascript
// trigger: quando entra nel viewport
// da 0 al valore finale in 2s
// ease: power2.out
// stagger: 0.15s tra ogni counter
```

---

## SEZIONE 4 — SERVIZI (Zigzag a 2 colonne)
**Tipo:** 3 blocchi alternati sinistra/destra
**Padding:** 140px verticale totale, 60px tra i blocchi

**Titolo sezione (allineato sx):**
```
"01"  ← JetBrains Mono 13px, text-muted, margin-bottom 8px
"I Nostri Servizi"  ← Barlow Condensed 700, clamp(36px,5vw,56px)
"Ogni soluzione pensata attorno alle tue esigenze di mobilità."
← DM Sans 400, 17px, text-secondary, max-w-[50ch]
```

---

**BLOCCO A — Noleggio Breve Termine**
Layout: immagine DX (55%), testo SX (45%)

Immagine:
- `picsum.photos/seed/car-keys/800/600`
- aspect-ratio 4/3, border-radius 16px
- overflow hidden, hover: scale(1.03) transition 0.6s

Testo (colonna sinistra):
```
Badge: "NOLEGGIO BREVE"  — Barlow Condensed 700 11px,
       bg accent/10, colore accent, border border-accent/20,
       padding 4px 12px, border-radius 100px, uppercase

Titolo: "Prenota per un giorno.
         O per un mese."
Barlow Condensed 700, clamp(28px,3.5vw,40px), colore text-primary

Testo: "Massima flessibilità da 1 a 30 giorni. Assicurazione inclusa,
        assistenza h24, consegna a domicilio su Parma e provincia."
DM Sans 400, 16px, text-secondary, max-w-[42ch]

Lista 4 vantaggi (con icona CheckCircle Phosphor in accent):
• Flotta sempre aggiornata
• Zero costi nascosti
• Consegna inclusa su Parma
• Assistenza 24 ore su 24

CTA: MagneticButton outline "Scopri il Noleggio Breve" → /noleggio-breve
```

---

**BLOCCO B — Noleggio Lungo Termine**
Layout: immagine SX (55%), testo DX (45%) ← invertito

Immagine:
- `picsum.photos/seed/business-car/800/600`
- aspect-ratio 4/3, border-radius 16px

Testo (colonna destra):
```
Badge: "NOLEGGIO LUNGO TERMINE"

Titolo: "L'auto giusta ogni mese,
         senza pensieri."
         
Testo: "Contratti da 12 a 48 mesi per privati e aziende.
        Manutenzione, bollo e assicurazione già inclusi nel canone."

Lista 4 vantaggi:
• Canone mensile fisso e deducibile
• Include manutenzione ordinaria
• IVA detraibile per P.IVA
• Nessun imprevisto di spesa

CTA: MagneticButton outline "Scopri il Noleggio Lungo" → /noleggio-lungo
```

---

**BLOCCO C — Vendita, Permuta & Finanziamenti**
Layout: immagine DX (55%), testo SX (45%)

Immagine:
- `picsum.photos/seed/car-showroom/800/600`
- aspect-ratio 4/3, border-radius 16px

Testo (colonna sinistra):
```
Badge: "VENDITA & PERMUTA"

Titolo: "Compra, vendi, permuta.
         Con garanzia reale."
         
Testo: "Auto usate selezionate e revisionate, con garanzia inclusa.
        Valutiamo la tua auto in 24 ore. Finanziamenti su misura."

Lista 4 vantaggi:
• Auto certificate e garantite
• Valutazione permuta in 24h
• Finanziamento personalizzato
• Assistenza post-vendita

CTA: MagneticButton outline "Vedi Veicoli in Vendita" → /vendita
```

---

## SEZIONE 5 — FLEET PREVIEW (Anteprima Flotta)
**Tipo:** Grid filtrata con AnimatePresence
**Padding:** 120px verticale

**Intestazione (2 colonne):**
```
Sinistra:
"02"  ← label monospace
"La Nostra Flotta"  ← Barlow Condensed 700, clamp(36px,5vw,56px)

Destra (allineato dx, allineato in basso):
Link "Vedi tutti i 500+ veicoli →" → /flotta
DM Sans 500, 15px, colore chrome, hover: colore text-primary
```

**FilterTabs (pill indicator animato con layoutId):**
```
[ Tutti ] [ Noleggio ] [ Vendita ] [ SUV ] [ Berlina ] [ City Car ]
```
Stile: bg surface-2, active tab: bg accent text-white,
pill indicator animato con Framer Motion spring

**Grid (6 veicoli):**
`grid grid-cols-3 gap-6` desktop
`grid grid-cols-2 gap-4` tablet
`grid grid-cols-1 gap-4` mobile

**Ogni VehicleCard:**
```
┌─────────────────────────────┐
│  [badge categoria top-left] │
│                             │
│    IMMAGINE 16/9            │
│    (next/image, cover)      │
│                             │
├─────────────────────────────┤
│  MARCA E MODELLO            │ ← Barlow Condensed 700, 20px
│  Anno  ·  Km  ·  Carb.      │ ← JetBrains Mono 12px, text-muted
│                             │
│  da €XX / giorno            │ ← JetBrains Mono 700, 18px, accent
│                             │
│  [ Dettagli → ]             │ ← DM Sans 500, 14px, chrome, hover accent
└─────────────────────────────┘
```

Hover card: translateY(-6px), shadow tonalizzata accent/8,
border diventa border-accent/40, transizione 0.4s spring

SpotlightBorder: il bordo si illumina dove si trova il cursore
(implementato con CSS custom property --mouse-x --mouse-y)

AnimatePresence: stagger 0.05s al cambio filtro,
uscita: opacity 0 scale 0.95, entrata: opacity 1 scale 1

**Paginazione:** CTA "Carica altri veicoli" con loading spinner,
carica 6 in più con stagger animation

---

## SEZIONE 6 — MANIFESTO (La nostra filosofia)
**Tipo:** Full-width, sfondo `bg` profondo, min-height 60vh
**Padding:** 120px verticale

**Texture parallax background:**
Immagine `picsum.photos/seed/road-texture/1600/900` a opacity 0.04,
parallax -0.3 velocità rispetto allo scroll

**Contenuto centrato (max-w-[900px] mx-auto):**

Label:
```
"LA NOSTRA FILOSOFIA"
JetBrains Mono 11px, text-muted, uppercase, letter-spacing 0.15em
margin-bottom: 40px
```

Affermazione piccola (frase "negativa"):
```
"La maggior parte degli autonoleggi si concentra su:
 quante auto riescono a piazzare."
DM Sans 400, clamp(18px,2.5vw,24px), text-secondary
max-w-[60ch], line-height 1.7
```

Separatore: linea 1px border-color, margin 32px auto,
larghezza 80px, centrata

Affermazione grande (frase "positiva"):
```
"Noi ci concentriamo su:
 portarti a casa soddisfatto."
Barlow Condensed 700 Italic, clamp(40px,6vw,80px),
text-primary, parola "soddisfatto" in accent
line-height 1.1, tracking -0.02em
```

Sottotitolo:
```
"Daunia Cars nasce per essere diversa. Nessuna pressione,
 nessun costo nascosto. Solo soluzioni reali per persone reali."
DM Sans 400, 17px, text-secondary, max-w-[55ch], margin-top 24px
```

**Animazione GSAP SplitText-style:**
- Ogni parola della frase grande: fade-up stagger 0.04s
- ScrollTrigger: start "top 70%"
- ease: power3.out

**Marquee cinetico sotto (dopo il testo):**
```
"NOLEGGIO BREVE  ·  NOLEGGIO LUNGO  ·  VENDITA  ·  PERMUTA  ·
 FINANZIAMENTI  ·  ASSISTENZA H24  ·  PARMA  ·"
```
JetBrains Mono 13px, uppercase, text-muted
velocità: 30s linear infinite
hover: pausa animazione
bg: surface-2, padding: 16px 0

---

## SEZIONE 7 — PROCESS (Sticky Stack "Come lavoriamo")
**Tipo:** 3 card fullscreen impilate con GSAP pin
**Ogni card:** min-height 100vh

**GSAP Sticky Stack:**
```javascript
// card sottostante mentre la nuova entra:
scale: 0.92
blur: 16px (filter: blur)
opacity: 0.5
```

**CARD 1 — "Scegli"**
Background: `bg-surface` con texture grain
Layout: 2 colonne — testo sx (40%), SVG animato dx (60%)

Testo:
```
"01"  ← JetBrains Mono 700, 48px, text-muted
"Scegli il veicolo"  ← Barlow Condensed 700, clamp(36px,5vw,60px)
"Sfoglia la nostra flotta online o vienici a trovare.
 Ogni veicolo ha scheda completa, foto reali e prezzo trasparente."
DM Sans 400, 17px, text-secondary, max-w-[42ch]

CTA: MagneticButton ghost "Esplora la flotta" → /flotta
```

SVG animato (cerchi concentrici che ruotano):
```
5 cerchi svg concentrici, stroke colore chrome/30, stroke-width 1
Ogni cerchio ruota in direzione alternata
Velocità: 20s, 16s, 12s, 8s, 6s
Al centro: icona Car Phosphor in accent, 48px
```

**CARD 2 — "Personalizza"**
Background: `bg-surface-2`
Layout: SVG dx (50%), testo sx (50%) — invertito

Testo:
```
"02"  ← stesso stile
"Personalizza la soluzione"
"Noleggio breve, lungo termine o acquisto? Ti aiutiamo a trovare
 la formula giusta per le tue esigenze e il tuo budget."

CTA: MagneticButton ghost "Richiedi Preventivo" → /contatti
```

SVG animato (linea laser su griglia punti):
```
Griglia 8x6 di punti (circle r=2, fill chrome/20)
Linea orizzontale che scansiona da alto a basso
Ogni punto che la linea tocca: si illumina in accent, poi torna scuro
Durata ciclo: 3s, repeat infinito
```

**CARD 3 — "Guida"**
Background: `bg` con accent glow sottile in basso
Layout: testo sx (40%), SVG dx (60%)

Testo:
```
"03"
"Mettiti al volante"
"Ritiro in sede a Parma o consegna a domicilio. Documenti chiari,
 zero sorprese. Da quel momento sei tu a guidare."

CTA: MagneticButton primary "Prenota Ora" → /contatti
```

SVG animato (waveform ECG pulsante):
```
Linea SVG path che forma una forma d'onda stile ECG
stroke: accent, stroke-width: 2
Animazione: stroke-dashoffset da 100% a 0%, poi riparte
Durata: 2s ease-in-out, repeat infinito
Sfondo griglia sottile: linee 1px border-color/30
```

---

## SEZIONE 8 — TESTIMONIALS
**Tipo:** Carousel auto-scroll con pausa su hover
**Padding:** 100px verticale
**Sfondo:** `bg-surface`

**Intestazione:**
```
"03" ← label monospace
"Cosa dicono i nostri clienti"  ← Barlow Condensed 700
"Parma, Collecchio, Langhirano e dintorni."  ← DM Sans, text-muted
```

**4 Testimonianze:**

Scheda 1:
```
Avatar: cerchio 48px bg accent/20, iniziali "MF" DM Sans 600 accent
Nome: "Marco Ferretti"  DM Sans 600, text-primary
Luogo: "Parma"  JetBrains Mono 12px, text-muted
Stelle: 5 stelle (Star Phosphor fill, colore gold)
Testo: "Ho noleggiato un SUV per 3 settimane. Tutto perfetto:
        auto pulitissima, prezzo onesto, nessuna sorpresa in fattura.
        Tornerò sicuramente."
Data: "Gennaio 2025"  JetBrains Mono 11px, text-muted
```

Scheda 2:
```
Avatar: "LB"  bg chrome/10
Nome: "Laura Bianchi"
Luogo: "Collecchio (PR)"
Stelle: 5
Testo: "Ho fatto la permuta della mia vecchia auto e acquistato
        un'utilitaria. Valutazione giusta, pratiche veloci,
        personale davvero competente."
Data: "Novembre 2024"
```

Scheda 3:
```
Avatar: "GT"  bg accent/15
Nome: "Giovanni Tartari"
Luogo: "Langhirano (PR)"
Stelle: 5
Testo: "Noleggio lungo termine per la mia attività.
        Gestisco tutto in modo semplice, il canone fisso mi ha
        aiutato a pianificare le spese. Lo consiglio a ogni azienda."
Data: "Settembre 2024"
```

Scheda 4:
```
Avatar: "SR"  bg surface-2
Nome: "Silvia Rosetti"
Luogo: "Parma"
Stelle: 5
Testo: "Ero indecisa tra acquisto e noleggio lungo termine.
        Mi hanno spiegato tutto con pazienza, senza fretta.
        Alla fine ho scelto il NLT e ne sono felicissima."
Data: "Luglio 2024"
```

**Carousel:**
- Auto-scroll ogni 4s con Framer Motion
- Pausa su hover
- Indicatori dot in basso (active: accent, inactive: border)
- Su mobile: swipe gesture nativo

---

## SEZIONE 9 — CTA FINALE
**Tipo:** Banda full-width con sfondo accent
**Padding:** 80px verticale

**Background:** Tinta unita `#E8380D` con noise overlay sottile
Texture grain a opacity 0.04 per profondità

**Contenuto centrato:**
```
Titolo:
"Pronto a partire?"
Barlow Condensed 800, clamp(40px,7vw,88px), colore white
tracking -0.02em

Sottotitolo:
"Parla con noi oggi. Risposta entro 24 ore."
DM Sans 400, 18px, colore white/80

Due CTA in row (centrate):
[ MagneticButton — bg white, text accent ] "Prenota Ora"  → /contatti
[ MagneticButton — border white, text white ] "Chiama Ora" → tel:[PHONE]
gap: 20px, margin-top: 32px
```

**Micro-dettaglio:** al click su "Prenota Ora" →
particelle burst con Framer Motion (10-15 piccoli cerchi
che esplodono dal centro del bottone, colore white, durata 0.6s)

---

---
# PAGINA 2 — FLOTTA ( /flotta )
---

## META SEO
```
title: "Flotta Veicoli — Noleggio e Vendita Auto a Parma | Daunia Cars"
description: "Sfoglia la flotta Daunia Cars: city car, SUV, berline,
furgoni e luxury. Disponibili per noleggio breve, lungo termine
e vendita a Parma."
schema: ItemList + AutoDealer
```

## SEZIONE 1 — HERO COMPATTO
**Altezza:** 50vh
**Sfondo:** `picsum.photos/seed/car-fleet/1920/600`
con overlay `bg-gradient-to-r from-bg/90 via-bg/60 to-transparent`

```
Breadcrumb: Home > Flotta  ← DM Sans 13px, text-muted,
            con separatori ChevronRight Phosphor

Titolo: "La Nostra Flotta"
Barlow Condensed 700, clamp(40px,6vw,72px), text-primary

Sottotitolo: "500+ veicoli disponibili · Aggiornati ogni settimana"
JetBrains Mono 13px, text-muted, margin-top 8px
```

## SEZIONE 2 — FILTRI STICKY
**Posizione:** sticky top-[80px] (altezza navbar)
**Sfondo:** bg/95 backdrop-blur, border-b border-color
**Z-index:** 50 (sotto navbar che è z-100)
**Padding:** 16px verticale

**Riga 1 — Categorie:**
```
[ Tutti ] [ City Car ] [ Berlina ] [ SUV ] [ Furgone ] [ Luxury ]
FilterTabs con pill indicator animato (Framer Motion layoutId)
```

**Riga 2 — Disponibilità + Ordina (su desktop in row con riga 1):**
```
Disponibilità: [ Tutti ] [ Noleggio Breve ] [ NLT ] [ Vendita ]
Ordina: select dropdown →  Prezzo ↑ | Prezzo ↓ | Anno ↓ | Km ↑
```

**Contatore risultati:**
```
"Trovati 24 veicoli"  ← JetBrains Mono 12px, text-muted
```

URL params aggiornati a ogni cambio filtro (useSearchParams)

## SEZIONE 3 — GRID VEICOLI
`grid grid-cols-3 gap-6 lg` / `grid-cols-2 md` / `grid-cols-1`

**AnimatePresence stagger:** uscita scale 0.95 opacity 0,
entrata scale 1 opacity 1, stagger 0.05s tra le card

**Ogni VehicleCard** (vedi spec in Homepage Sezione 5)
Con aggiunta: numero risultato in basso ("3 di 24")

## SEZIONE 4 — LOAD MORE
```
Bottone centrato: "Carica altri veicoli"
MagneticButton ghost, con loading spinner Phosphor
Animazione: nuove card entrano dal basso con stagger
```

---

---
# PAGINA 3 — SCHEDA VEICOLO ( /flotta/[slug] )
---

## META SEO (dinamico)
```
title: "[Marca] [Modello] [Anno] — [Tipo] | Daunia Cars Parma"
description: "[Marca] [Modello] disponibile per [servizi].
[Km] km, [carburante], [cambio]. Scopri tutti i dettagli."
schema: Car (completo) + BreadcrumbList
```

## LAYOUT PRINCIPALE (2 colonne desktop, stack mobile)

### COLONNA SX — Galleria (58% larghezza)

**Immagine principale:**
next/image, aspect-ratio 16/9, border-radius 12px, priority
AnimatePresence crossfade al cambio thumbnail

**Thumbnails (4 immagini in row sotto):**
aspect-ratio 4/3, border-radius 8px, width 22%
border 2px transparent, active: border-accent
hover: opacity 1, inactive: opacity 0.6
click: aggiorna immagine principale

**Pulsante Lightbox:**
Icona ArrowsOut Phosphor, in alto a destra sull'immagine
hover: bg black/40, click: apre lightbox fullscreen

**Lightbox fullscreen:**
bg black/95, frecce navigazione laterali,
thumbnail strip in basso, chiudi con X o Escape
AnimatePresence per entrata/uscita

### COLONNA DX — Info (42% larghezza, sticky top-[100px])

```
Breadcrumb: Home > Flotta > [Nome Auto]
DM Sans 13px, text-muted

Badge disponibilità:
Se noleggio: bg accent/10 text-accent border-accent/20 "Disponibile"
Se vendita: bg gold/10 text-gold border-gold/20 "In Vendita"
Se entrambi: due badge

Titolo: "[Marca] [Modello]"
Barlow Condensed 700, clamp(28px,4vw,44px), text-primary

Specifiche rapide (in row, separatori ·):
[Anno] · [Km] km · [Carburante] · [Cambio]
JetBrains Mono 13px, text-secondary

Divider 1px border-color margin-y 20px

PREZZO (se noleggio breve):
"da"  DM Sans 400, 14px, text-muted
"€45"  JetBrains Mono 800, 48px, accent
"/giorno"  DM Sans 400, 14px, text-muted
"o €890/mese (NLT)"  DM Sans 400, 14px, text-secondary

PREZZO (se vendita):
"€ 18.900"  JetBrains Mono 800, 48px, accent
"IVA inclusa · Finanziamento disponibile"
DM Sans 400, 13px, text-muted

Divider

TAB ANIMATI (Framer Motion AnimatePresence):
[ Descrizione ] [ Specifiche ] [ Disponibilità ]
Active: border-bottom 2px accent, text-primary
Inactive: text-muted

CONTENUTO TAB Descrizione:
Testo descrittivo, DM Sans 400, 16px, text-secondary
max 3 paragrafi

CONTENUTO TAB Specifiche:
Grid 2 col, ogni riga: icona Phosphor + label + valore
Es: Engine "Motore: 1.5 TDI 150cv"
    Gauge "Consumi: 5.2L/100km"
    Car "Categoria: SUV"
    Palette "Colore: Grigio Metropolitano"
    Users "Posti: 5"
    Briefcase "Bagagli: 400L"

CONTENUTO TAB Disponibilità:
Lista servizi disponibili con icone, date disponibilità

DUE CTA (full-width):
[ MagneticButton primary ] "Richiedi Preventivo"  → /contatti
[ MagneticButton ghost ]   "Prenota Ora"  → /contatti
margin-top: 24px, gap: 12px

Trust badge sotto:
icona ShieldCheck + "Garanzia inclusa"
icona Phone + "Risposta entro 24h"
DM Sans 500, 13px, text-secondary
```

**Mobile CTA bar (fixed bottom, solo mobile):**
```
bg bg/95 backdrop-blur, border-t border-color
padding 12px 16px
flex row: prezzo sx + "Richiedi" bottone dx
```

## SEZIONE — Caratteristiche complete
Sotto le 2 colonne, `grid grid-cols-2 md:grid-cols-4 gap-4`
Ogni cell: icona Phosphor grande (32px, accent) + label + valore
No card — solo spazio negativo e separatori sottili

## SEZIONE — Veicoli simili
```
Titolo: "Potrebbe interessarti"  Barlow Condensed 700, 28px
Sottotitolo: "Altri veicoli della stessa categoria"  DM Sans, text-muted
3 VehicleCard in row (stessa categoria, slug diverso)
```

---

---
# PAGINA 4 — NOLEGGIO BREVE ( /noleggio-breve )
---

## META SEO
```
title: "Noleggio Auto Breve Termine a Parma | Daunia Cars"
description: "Noleggio auto a breve termine a Parma da 1 a 30 giorni.
Assicurazione inclusa, flotta aggiornata, consegna a domicilio.
Prenota online in 2 minuti."
schema: RentAction + LocalBusiness
```

## SEZIONE 1 — HERO (55vh)
**Sfondo:** `picsum.photos/seed/car-handover/1920/700`
overlay `from-bg/90 to-bg/40`

```
Label: "NOLEGGIO BREVE TERMINE"  ← Barlow Condensed 700, 11px, accent uppercase
Breadcrumb: Home > Noleggio Breve

Titolo: "Noleggia oggi.
         Guida domani."
Barlow Condensed 800, clamp(44px,7vw,88px)
Riga 2 italic accent

Sottotitolo: "Da 1 a 30 giorni. Assicurazione e assistenza incluse."
DM Sans 400, 18px, text-secondary

CTA: MagneticButton primary "Richiedi Subito" → ancora al form
```

## SEZIONE 2 — COME FUNZIONA (4 step)
**Padding:** 100px verticale

**Titolo sezione:**
```
"Come Funziona"  Barlow Condensed 700, clamp(32px,4vw,48px)
"Quattro passi, zero complicazioni."  DM Sans, text-muted
```

**4 Step connessi da linea SVG animata:**
La linea orizzontale SVG si "disegna" con stroke-dashoffset
al viewport entry (ScrollTrigger)

```
Step 1: Cerchio accent "01" + icona Headset Phosphor
        Titolo: "Contattaci"
        Testo: "Scrivi, chiama o compila il form.
                Ti risponderemo entro poche ore."

Step 2: Cerchio accent "02" + icona Car Phosphor
        Titolo: "Scegli il veicolo"
        Testo: "Ti proponiamo le auto disponibili
                per le tue date e il tuo budget."

Step 3: Cerchio accent "03" + icona FileText Phosphor
        Titolo: "Firma il contratto"
        Testo: "Documenti chiari e veloci.
                Patente + carta di credito, nient'altro."

Step 4: Cerchio accent "04" + icona Key Phosphor
        Titolo: "Parti"
        Testo: "Ritiro in sede a Parma o consegna
                direttamente da te."
```

Layout desktop: flex row, linea SVG tra i cerchi
Layout mobile: flex column, linea verticale a sinistra

## SEZIONE 3 — VANTAGGI (2 colonne asimmetriche)
Layout: immagine SX (50%), lista DX (50%)

Immagine:
`picsum.photos/seed/highway-drive/800/700`
aspect 3/4, border-radius 16px, overflow hidden

Lista vantaggi (colonna dx):
```
Titolo: "Perché scegliere il noleggio breve Daunia Cars"
Barlow Condensed 700, clamp(24px,3vw,36px)

6 vantaggi con icone Phosphor:
[CheckCircle accent] Flotta sempre aggiornata
   "Veicoli recenti, revisionati, pronti all'uso."

[ShieldCheck accent] Assicurazione inclusa
   "RCA e assistenza stradale nel canone giornaliero."

[MapPin accent] Consegna su Parma e provincia
   "Ti portiamo l'auto dove vuoi, senza costi extra."

[CalendarBlank accent] Da 1 a 30 giorni
   "Flessibilità totale. Paghi solo i giorni che usi."

[CurrencyEur accent] Prezzi trasparenti
   "Nessun costo nascosto. Preventivo gratuito."

[Clock accent] Assistenza h24
   "Siamo raggiungibili anche fuori orario d'ufficio."
```

Animazione: stagger fade-in-left su ogni vantaggio
(ScrollTrigger, stagger 0.1s)

## SEZIONE 4 — CATEGORIE DISPONIBILI
**Sfondo:** `bg-surface-2`, padding 60px verticale

```
Titolo: "Che auto cerchi?"  Barlow Condensed 700, 32px

5 chip cliccabili in row (flex-wrap):
[ City Car ] [ Berlina ] [ SUV ] [ Furgone ] [ Luxury ]

Ogni chip: bg surface, border border-color,
padding 14px 24px, border-radius 100px,
icona Phosphor + label DM Sans 600 16px
hover: bg accent/10 border-accent/40 text-accent
click: naviga a /flotta?categoria=X&tipo=noleggio-breve
```

## SEZIONE 5 — FORM RICHIESTA NOLEGGIO BREVE
**Sfondo:** `bg-surface`, padding 80px verticale
Componente RentalForm (wizard 3 step)
Vedi spec in CLAUDE.md sezione 7

**Titolo form:**
```
"Richiedi il tuo preventivo"  Barlow Condensed 700, 32px
"Gratuito, senza impegno. Ti rispondiamo entro 24 ore."
DM Sans 400, 16px, text-secondary
```

## SEZIONE 6 — FAQ ACCORDION
**Padding:** 80px verticale

```
Titolo: "Domande frequenti"  Barlow Condensed 700, 32px

5 domande con accordion Framer Motion:

Q1: "Quali documenti servono per noleggiare?"
A1: "Patente di guida valida e carta di credito intestata
     al guidatore principale. Per cittadini extra-UE
     è necessaria anche la patente internazionale."

Q2: "Posso restituire l'auto in un posto diverso?"
A2: "Sì, offriamo il servizio di riconsegna in altra
     sede su richiesta. Contattaci per verificare
     la disponibilità e l'eventuale supplemento."

Q3: "L'assicurazione è sempre inclusa?"
A3: "Sì, ogni noleggio include RCA e assistenza
     stradale h24. È possibile aggiungere la copertura
     Kasko per una protezione completa."

Q4: "Esiste un limite di chilometri?"
A4: "I nostri contratti standard includono chilometraggio
     illimitato. Per noleggi speciali possono applicarsi
     condizioni differenti che ti comunicheremo in anticipo."

Q5: "Posso estendere il noleggio?"
A5: "Certamente. Basta contattarci prima della scadenza
     e, se il veicolo è disponibile, prolunghiamo
     il contratto senza costi aggiuntivi."
```

Ogni accordion: Framer Motion height animation + rotate chevron
Border-bottom tra le domande, no card

---

---
# PAGINA 5 — NOLEGGIO LUNGO TERMINE ( /noleggio-lungo )
---

## META SEO
```
title: "Noleggio Auto Lungo Termine Parma — NLT Privati e Aziende | Daunia Cars"
description: "Noleggio a lungo termine a Parma da 12 a 48 mesi.
Canone fisso all-inclusive per privati e aziende. IVA detraibile.
Scopri i vantaggi del NLT con Daunia Cars."
schema: RentAction + LocalBusiness
```

## SEZIONE 1 — HERO (55vh)
**Sfondo:** `picsum.photos/seed/office-parking/1920/700`
(parcheggio moderno, auto in fila, stile corporate)

```
Label: "NOLEGGIO LUNGO TERMINE · NLT"
Titolo: "Un'auto al mese,
         senza pensieri."
Riga 2 italic accent

Sottotitolo: "Per privati e aziende. Da 12 a 48 mesi.
              Tutto incluso nel canone mensile."

Due badge trust accanto al titolo (su desktop):
[ Privati ] [ Aziende P.IVA ]
pill border-color, JetBrains Mono 11px
```

## SEZIONE 2 — COS'È IL NLT (2 colonne)
Layout: testo SX (55%), immagine + bullets DX (45%)

```
Testo sinistra:
Titolo: "Noleggio Lungo Termine: cos'è e come funziona"
Barlow Condensed 700, clamp(28px,3.5vw,42px)

Paragrafo 1: "Il noleggio a lungo termine (NLT) è la formula
più intelligente per avere sempre un'auto nuova, senza
l'impegno finanziario dell'acquisto. Paghi un canone mensile
fisso e pensiamo noi a tutto il resto."

Paragrafo 2: "A differenza dell'acquisto, con il NLT non sei
vincolato per anni allo stesso veicolo. Al termine del contratto
puoi rinnovare, cambiare auto o semplicemente non rinnovare."

Immagine destra:
picsum.photos/seed/luxury-interior/600/500
aspect 5/4, border-radius 16px

3 bullet points sotto l'immagine:
[CheckFat accent] Canone mensile fisso
[CheckFat accent] Manutenzione inclusa
[CheckFat accent] Zero imprevisti
```

## SEZIONE 3 — NLT VS ACQUISTO (Tabella comparativa)
**Sfondo:** `bg-surface-2`, padding 80px verticale

```
Titolo: "NLT vs Acquisto: il confronto onesto"
Barlow Condensed 700, clamp(28px,4vw,44px)
Sottotitolo: "Numeri reali, senza trucchi."  DM Sans, text-muted

TABELLA (no card — bordi 1px border-color):
header row: vuoto | "Acquisto" | "NLT Daunia Cars" ← evidenziato
                                                       bg surface, border-accent/30

Righe:
Anticipo:         Alto (15-30%)    | Zero o minimo
Rata mensile:     Variabile        | Fissa e pianificabile
Manutenzione:     A tuo carico     | Inclusa nel canone
Bollo:            A tuo carico     | Incluso nel canone
Assicurazione:    A tuo carico     | Inclusa nel canone
Svalutazione:     Rischio tuo      | Rischio zero
Flessibilità:     Bassa            | Alta (cambi auto)
IVA per P.IVA:    Non recuperabile | Detraibile fino al 40%

Colonna NLT: ogni cella ha CheckCircle accent
Colonna Acquisto: X rosso o testo neutro
```

## SEZIONE 4 — VANTAGGI FISCALI P.IVA
**Sfondo:** `bg-surface` con bordo accent/20 left (4px solid)
**Padding:** 60px, border-radius 16px, max-w-[900px] mx-auto

```
Icona Building Phosphor (48px, accent) + label "PER TITOLARI P.IVA"

Titolo: "Il NLT conviene doppio se hai la partita IVA"
Barlow Condensed 700, 28px

3 card vantaggi (grid 3 col):
[CurrencyEur] "IVA detraibile"
  "Recupera fino al 40% dell'IVA sul canone mensile.
   Per uso esclusivamente aziendale, detraibilità al 100%."

[FileText] "Costo deducibile"
  "Il canone NLT è un costo deducibile dal reddito d'impresa.
   Meno tasse da pagare ogni anno."

[TrendDown] "Zero immobilizzo capitale"
  "Non immobilizzi capitale nell'acquisto del veicolo.
   Mantieni liquidità per il tuo business."

Disclaimer: "Le agevolazioni fiscali dipendono dalla situazione
             specifica. Consulta il tuo commercialista."
DM Sans 400, 13px, text-muted, margin-top 24px
```

## SEZIONE 5 — DURATE DISPONIBILI
**Sfondo:** `bg-surface-2`, padding 60px

```
Titolo: "Scegli la durata giusta per te"

4 opzioni in grid 2x2:
[12 mesi] "Massima flessibilità"  → icona Lightning
[24 mesi] "Il più scelto"  → icona Star (highlighted)
[36 mesi] "Risparmio ottimale"  → icona TrendUp
[48 mesi] "Canone minimo"  → icona CurrencyEur

Card "24 mesi" highlighted:
border-accent, bg accent/5, badge "PIÙ SCELTO" in gold
```

## SEZIONE 6 — FORM NLT
RentalForm con campi aggiuntivi:
- Durata contratto (select: 12/24/36/48 mesi)
- Tipo utilizzo (radio: Privato / Aziendale)
- Se aziendale: campo P.IVA e Ragione Sociale
- Km annui previsti (select: <15.000 / 15-25.000 / >25.000)

## SEZIONE 7 — FAQ NLT (5 domande)
```
Q1: "Posso disdire il contratto in anticipo?"
Q2: "Cosa succede in caso di incidente?"
Q3: "Posso aggiungere un secondo guidatore?"
Q4: "Al termine del contratto cosa succede all'auto?"
Q5: "Quali costi sono esclusi dal canone?"
```

---

---
# PAGINA 6 — VENDITA ( /vendita )
---

## META SEO
```
title: "Vendita Auto Usate Garantite a Parma | Daunia Cars"
description: "Auto usate selezionate e garantite a Parma. Ogni veicolo
è revisionato e certificato. Permuta valutata in 24h.
Finanziamento personalizzato disponibile."
schema: BuyAction + AutoDealer + ItemList
```

## SEZIONE 1 — HERO (55vh)
**Sfondo:** `picsum.photos/seed/showroom-night/1920/700`
(showroom notturno, vetrina illuminata, 3-4 auto)

```
Label: "VENDITA VEICOLI USATI"
Titolo: "Auto garantite.
         Prezzi onesti."
Riga 2 italic accent

Sottotitolo: "Ogni auto è stata selezionata, revisionata e testata.
              Nessuna sorpresa dopo l'acquisto."

4 badge garanzia in row sotto il testo:
[ ShieldCheck ] Garanzia 12 mesi
[ Wrench ] Revisione completa
[ FileText ] Storico verificato
[ CurrencyEur ] Finanziamento
```

## SEZIONE 2 — LE NOSTRE GARANZIE (4 colonne)
**Sfondo:** `bg-surface`, padding 80px verticale

```
Titolo: "Compri sapendo esattamente cosa prendi"
Barlow Condensed 700, clamp(28px,4vw,44px), centrato

4 colonne (no card — divide-x):

[ShieldCheck 48px accent]
"Garanzia 12 mesi"
"Ogni veicolo venduto include 12 mesi di garanzia
 su motore e cambio."

[Wrench 48px accent]
"Revisione 50 punti"
"Check completo su meccanica, elettronica,
 carrozzeria e interni."

[ClipboardText 48px accent]
"Storico documentato"
"Tagliandi, proprietari precedenti e
 controllo antiusura."

[Handshake 48px accent]
"Assistenza post-vendita"
"Rimaniamo al tuo fianco anche dopo la firma.
 Chiamaci quando vuoi."
```

## SEZIONE 3 — VEICOLI IN VENDITA
Stessa struttura della pagina /flotta
ma filtrata su `availability: ['vendita']`

Filtri: Categoria | Carburante | Prezzo (range slider) | Anno (range)

Ogni card VehicleCard con badge "IN VENDITA" in gold

## SEZIONE 4 — PERMUTA (Split 2 colonne)
**Sfondo:** `bg-surface-2`, padding 80px verticale

```
Colonna SX (55%):
Titolo: "Hai un'auto da dare via?"
Barlow Condensed 700, clamp(28px,3.5vw,40px)

Testo: "Valutiamo la tua auto gratuitamente in 24 ore.
        Prezzo equo, senza trattative estenuanti.
        Puoi usare il valore come anticipo sul nuovo acquisto."

3 step veloci:
[ ArrowRight ] "Compila il form con i dati del tuo veicolo"
[ ArrowRight ] "Ricevi la valutazione entro 24 ore"
[ ArrowRight ] "Usa il valore in permuta o incassalo"

Colonna DX (45%):
Form valutazione permuta (TradeInForm):
- Marca (select)
- Modello (text)
- Anno (select)
- Km (number)
- Condizioni (radio: Ottime / Buone / Da revisionare)
- Email + Telefono
- Submit: "Richiedi Valutazione Gratuita"
```

## SEZIONE 5 — FINANZIAMENTI
**Sfondo:** `bg`, padding 80px verticale

```
Titolo: "Acquista con il finanziamento su misura"
Barlow Condensed 700, clamp(28px,4vw,44px)

3 opzioni:

[Card con bordo 1px — NO card elevation]
"Tasso Fisso"
"Rata costante per tutta la durata.
 Ideale per pianificare le spese mensili."
Durate: 24 / 36 / 48 / 60 mesi

"Leasing"
"Ideale per aziende e titolari P.IVA.
 IVA detraibile, canone deducibile."
Durate: 24 / 36 / 48 mesi

"Balloon"
"Maxi rata finale. Rate mensili ridotte
 con possibilità di rinnovo o riscatto."
Durate: 36 / 48 mesi

Card centrale "Tasso Fisso" → evidenziata con border-accent

CTA centrata: MagneticButton primary
"Calcola la tua rata" → apre modal con form semplice
```

## SEZIONE 6 — TESTIMONIANZE ACQUIRENTI (3 card)
3 recensioni specifiche sull'acquisto
(clienti realistici con nome, città, veicolo acquistato)

---

---
# PAGINA 7 — PERMUTA ( /permuta )
---

## META SEO
```
title: "Permuta Auto a Parma — Valutazione Gratuita in 24h | Daunia Cars"
description: "Valuta e permuta la tua auto a Parma con Daunia Cars.
Valutazione gratuita entro 24 ore. Prezzi onesti, pratiche veloci."
```

**Struttura semplificata (pagina secondaria):**

1. Hero 45vh — "Valuta la tua auto gratis"
2. Come funziona (3 step orizzontali)
3. Form valutazione grande e centrato (TradeInForm completo)
4. Perché Daunia Cars (4 punti con icone)
5. FAQ 4 domande sulla permuta
6. CTA finale

---

---
# PAGINA 8 — FINANZIAMENTI ( /finanziamenti )
---

## META SEO
```
title: "Finanziamenti Auto Parma — Soluzioni Personalizzate | Daunia Cars"
description: "Finanziamenti personalizzati per l'acquisto auto a Parma.
Tasso fisso, leasing e balloon. Risposta in 48 ore."
```

**Struttura:**

1. Hero 45vh — "Il finanziamento che si adatta a te"
2. 3 tipologie con dettaglio (Tasso Fisso / Leasing / Balloon)
3. Calcolatore rata interattivo (slider importo + durata → rata stimata)
   Implementato con useState, calcolo semplificato
4. Requisiti per richiedere
5. Form richiesta finanziamento
6. FAQ 5 domande

---

---
# PAGINA 9 — CONTATTI ( /contatti )
---

## META SEO
```
title: "Contatti Daunia Cars — Parma | Noleggio e Vendita Auto"
description: "Contatta Daunia Cars a Parma. Strada Langhirano 264/1.
Telefono, email, WhatsApp. Risposta entro 24 ore."
schema: LocalBusiness + AutoDealer (completo)
```

## SEZIONE 1 — HERO MINIMAL (40vh)
Gradiente puro, nessuna immagine.
`bg-gradient-to-br from-surface via-bg to-bg`

```
Label: "SIAMO A PARMA"  JetBrains Mono, accent uppercase
Titolo: "Parla con noi"
Barlow Condensed 700, clamp(40px,6vw,72px)
Sottotitolo: "Ti rispondiamo entro 24 ore. Sempre."
```

## SEZIONE 2 — LAYOUT 2 COLONNE
`grid grid-cols-[1.2fr_0.8fr] gap-16` desktop
`grid grid-cols-1 gap-12` mobile

### Colonna SX — Form contatto (60%)

```
"Scrivici" — Barlow Condensed 700, 28px

ContactForm wizard 2 step:
Step 1: Nome + Cognome (2 col) | Email | Telefono
        Servizio di interesse (select):
        → Noleggio breve / Noleggio lungo / Vendita
          Permuta / Finanziamento / Altro

Step 2: Messaggio (textarea, min 4 righe)
        Checkbox privacy (obbligatorio)
        Checkbox newsletter (opzionale)
        Submit: "Invia il messaggio"

Feedback success:
grande checkmark animato (Framer Motion pathLength)
"Messaggio inviato! Ti risponderemo entro 24 ore."
Barlow Condensed 700, 24px
```

### Colonna DX — Info (40%)

```
Card 1 — Indirizzo:
[ MapPin 24px accent ]
"Dove siamo"  DM Sans 600, 14px uppercase
"Strada Langhirano 264/1"  DM Sans 600, 18px, text-primary
"43124 Parma (PR)"  DM Sans 400, 16px, text-secondary
→ link "Apri su Google Maps" in accent, target _blank

Card 2 — Telefono:
[ Phone 24px accent ]
"Chiamaci"
"[PHONE]"  JetBrains Mono 700, 22px
→ link tel: cliccabile
"Lun–Sab 9:00–19:00"  DM Sans 400, 14px, text-muted

Card 3 — Email:
[ Envelope 24px accent ]
"Scrivici via email"
"[EMAIL]"  DM Sans 500, 16px
→ link mailto: cliccabile

Card 4 — WhatsApp:
[ WhatsappLogo 24px #25D366 ]
"WhatsApp"
"Risposta rapida"  DM Sans 400, 14px, text-muted
→ MagneticButton ghost piccolo "Avvia chat" → wa.me/[PHONE]

Card 5 — Orari:
[ Clock 24px accent ]
"Orari di apertura"
Tabella:
Lun – Ven: 09:00 – 13:00 / 15:00 – 19:00
Sabato:     09:00 – 13:00
Domenica:   Chiuso
JetBrains Mono 13px per gli orari
```

No card con elevazione — solo spazio e separatori 1px

## SEZIONE 3 — MAPPA
Google Maps embed iframe full-width
Aspect ratio 16/5 su desktop, 16/9 su mobile
Border-radius 16px, overflow hidden
**Filtro CSS dark:**
`filter: invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.9)`
Così la mappa si integra nel tema scuro

---

---
# PAGINA 10 — CHI SIAMO ( /chi-siamo )
---

## META SEO
```
title: "Chi Siamo — Daunia Cars Parma | Storia e Valori"
description: "Daunia Cars nasce a Parma per offrire noleggio e vendita
auto con trasparenza e attenzione al cliente. Scopri la nostra storia."
schema: LocalBusiness + AboutPage
```

## SEZIONE 1 — HERO (60vh)
**Sfondo:** immagine showroom con team (blur lieve)
`picsum.photos/seed/team-automotive/1920/800`

```
Label: "LA NOSTRA STORIA"
Titolo: "Daunia Cars.
         Nati a Parma,
         pensati per te."
3 righe, Barlow Condensed 800, grande
```

## SEZIONE 2 — LA STORIA (Narrative scrolltelling)

**Timeline verticale:**
Linea SVG verticale centrale, con punti milestone

```
2010  "Nasce Daunia Cars"
      "Apriamo in Strada Langhirano con una piccola flotta
       di 15 veicoli e una grande ambizione: fare le cose
       per bene, sempre."
      picsum.photos/seed/car-2010/600/400

2015  "Il noleggio lungo termine"
      "Ascoltiamo le aziende del territorio e introduciamo
       il servizio NLT. In un anno diventiamo il punto
       di riferimento per la mobilità aziendale parmense."

2018  "500 veicoli gestiti"
      "Superiamo il traguardo dei 500 veicoli e ampliamo
       la struttura. Nuovi spazi, stesso approccio."

2022  "Digitalizzazione"
      "Rilanciamo il sito e i servizi digitali per essere
       sempre più vicini ai clienti, anche online."

[ANNO] "Oggi"
      "Più di [X] clienti soddisfatti, una flotta in
       continuo aggiornamento e la stessa passione del
       primo giorno."
```

Ogni milestone: il punto sulla linea si illumina in accent
al viewport entry (ScrollTrigger)

## SEZIONE 3 — I NOSTRI VALORI (3 colonne zigzag)

```
[Eye accent 40px]
"Trasparenza"
"Nessun costo nascosto, nessuna pressione commerciale.
 Ti diciamo sempre la verità, anche se non fa comodo a noi."

[Users accent 40px]
"Attenzione al cliente"
"Ogni cliente è una persona, non un numero di pratica.
 Ascoltiamo, consigliamo, rimaniamo disponibili."

[Medal accent 40px]
"Qualità certificata"
"Solo veicoli selezionati, revisionati e garantiti.
 La nostra reputazione vale più di una vendita in più."
```

## SEZIONE 4 — IL TEAM (opzionale)
Se disponibili foto reali → 3-4 card team
Se no → rimanda a contatti

## SEZIONE 5 — CTA
"Vieni a trovarci a Parma"
MagneticButton primary "Contattaci" + MagneticButton ghost "Esplora la flotta"

---

---
# PAGINA 11 — BLOG ( /blog )
---

## META SEO
```
title: "Blog — Consigli su Auto, Noleggio e Mobilità | Daunia Cars"
description: "Articoli e guide su noleggio auto, acquisto veicoli
usati e mobilità a Parma. Consigli pratici dal team Daunia Cars."
```

**Struttura (archivio articoli, no contenuto reale):**

1. Hero compatto 40vh — "Il nostro Blog"
2. Grid articoli: `grid-cols-3 md:grid-cols-2 sm:grid-cols-1`
   Ogni ArticleCard: immagine 16/9 + categoria badge + titolo + data + CTA "Leggi"

**Articoli mock (titoli realistici per SEO):**
```
1. "NLT o Acquisto: quale conviene davvero nel 2025?"
   Categoria: Noleggio Lungo Termine
   picsum.photos/seed/article-1/800/500

2. "Come scegliere l'auto giusta per la tua azienda"
   Categoria: Aziende
   picsum.photos/seed/article-2/800/500

3. "Permuta auto: 5 cose da sapere prima di andare in concessionaria"
   Categoria: Acquisto e Vendita
   picsum.photos/seed/article-3/800/500

4. "Noleggio breve a Parma: guida completa per i turisti"
   Categoria: Noleggio Breve
   picsum.photos/seed/article-4/800/500

5. "Auto usata garantita: cosa verificare prima di firmare"
   Categoria: Acquisto e Vendita
   picsum.photos/seed/article-5/800/500

6. "Detrazioni fiscali per il noleggio aziendale: tutto quello che devi sapere"
   Categoria: Aziende
   picsum.photos/seed/article-6/800/500
```

---

---
# COMPONENTI GLOBALI
---

## HEADER / NAVBAR
Vedi SKILL.md sezione 6 per spec complete.
Aggiunta per questa pagina:
- Link attivo: colore accent, border-bottom 2px accent
- Mega dropdown su "Servizi": mostra Noleggio Breve | NLT | Vendita | Permuta | Finanziamenti
  con descrizione breve e icona Phosphor per ognuno
  Animazione: fade-in + scale da 0.97 a 1 (Framer Motion)

## FOOTER
```
Layout: `grid grid-cols-4` desktop → `grid-cols-2` tablet → `grid-cols-1` mobile
Sfondo: bg, rounded-t-[3rem], padding-top: 60px

Colonna 1 — Brand:
Logo "DAUNIA CARS" Barlow Condensed 800 text-primary
Tagline: "Noleggio e vendita auto a Parma
          dal 2010."
DM Sans 400, 14px, text-secondary
Icone social: FacebookLogo, InstagramLogo, WhatsappLogo Phosphor
(fill, 20px, text-muted, hover text-primary)

Colonna 2 — Servizi:
"Servizi"  DM Sans 600, 12px, uppercase, letter-spacing 0.1em
→ Noleggio Breve
→ Noleggio Lungo Termine
→ Vendita Auto
→ Permuta
→ Finanziamenti
DM Sans 400, 14px, text-secondary, hover text-primary

Colonna 3 — Azienda:
"Azienda"
→ Chi Siamo
→ Blog
→ Contatti
→ Lavora con noi (placeholder)

Colonna 4 — Contatti rapidi:
"Contatti"
[ MapPin ] Strada Langhirano 264/1, Parma
[ Phone ]  [PHONE]
[ Envelope ] [EMAIL]
[ Clock ] Lun-Sab 9:00-19:00

Divider 1px border-color

Bottom bar (flex row space-between):
SX: "© 2025 Daunia Cars S.r.l. · P.IVA [VAT]"
    JetBrains Mono 11px, text-muted
DX: "Privacy Policy · Cookie Policy · Note Legali"
    DM Sans 400, 13px, text-muted

System status (centrato):
[ Dot verde pulsante animato ]
"SISTEMA OPERATIVO"  JetBrains Mono 11px, text-muted
```

## WHATSAPP FAB
```
Posizione: fixed bottom-6 right-6, z-[90]
Dimensioni: 56px × 56px, border-radius 50%
Background: #25D366
Icona: WhatsappLogo Phosphor, 28px, white
Shadow: 0 4px 16px rgba(37,211,102,0.4)
Hover: scale(1.1), shadow più intensa
Pulse ring: pseudo-elemento che si espande e svanisce ogni 2s
Tooltip: "Scrivici su WhatsApp" appare su hover
Link: wa.me/[PHONE]?text=Ciao, vorrei informazioni su...
```

## SCROLL PROGRESS BAR
```
Linea 3px in accent color, fixed top-0, full-width
z-[200] (sopra tutto)
scaleX da 0 a 1 in base allo scroll
Framer Motion: useScroll + useSpring(scrollYProgress, {stiffness:100,damping:30})
transform-origin: left
```

## COOKIE BANNER
```
Posizione: fixed bottom, full-width, z-[150]
Sfondo: bg-surface/95 backdrop-blur
Padding: 16px 24px
Testo breve + 2 bottoni: "Accetta" (accent) | "Rifiuta" (ghost)
Animazione entrata: slide-up da bottom con Framer Motion
Sparisce con slide-down dopo click
```

## PAGE TRANSITION
```
Framer Motion AnimatePresence
Ogni cambio route: fade out 0.15s → fade in 0.15s
opacity: 0 → 1, duration breve per non rallentare la navigazione
```

---

---
# SPECIFICHE TECNICHE FINALI
---

## Immagini — Tutti i seed picsum da usare
```
highway-night      → Hero homepage, background scuro
asphalt-wet        → CarScrollSection background
car-keys           → Servizi, noleggio breve
business-car       → Servizi, noleggio lungo
car-showroom       → Servizi, vendita
car-fleet          → Hero flotta
luxury-interior    → NLT pagina
office-parking     → Hero NLT
showroom-night     → Hero vendita
highway-drive      → Vantaggi noleggio breve
car-handover       → Hero noleggio breve
road-texture       → Manifesto parallax background
team-automotive    → Hero chi siamo
car-2010           → Timeline storia
article-1..6       → Card blog
```

Formato URL sempre: `https://picsum.photos/seed/[nome]/[w]/[h]`

## Schema.org JSON-LD — Homepage e Contatti
```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "AutoDealer"],
  "name": "Daunia Cars",
  "url": "https://daunia.cars",
  "telephone": "[PHONE]",
  "email": "[EMAIL]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Strada Langhirano 264/1",
    "addressLocality": "Parma",
    "postalCode": "43124",
    "addressRegion": "PR",
    "addressCountry": "IT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 44.7929,
    "longitude": 10.3015
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "13:00"
    }
  ],
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, Credit Card",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 44.7929,
      "longitude": 10.3015
    },
    "geoRadius": "30000"
  }
}
```

## Ordine di build consigliato per Claude Code
```
1. Setup + config (tailwind, font, globals, types, utils)
2. Dati mock (vehicles.ts, testimonials.ts, services.ts)
3. Componenti UI atomici (MagneticButton, VehicleCard, FilterTabs)
4. Layout (Header con mega menu, Footer, WhatsAppFAB)
5. Homepage completa (tutte le sezioni in ordine)
6. Pagina Flotta + Singolo veicolo
7. Noleggio Breve + Noleggio Lungo
8. Vendita + Permuta + Finanziamenti
9. Contatti + Chi Siamo
10. Blog (struttura)
11. Form components (RentalForm wizard, ContactForm, TradeInForm)
12. SEO tecnico (sitemap, robots, metadata tutte le pagine)
13. Polish: transizioni, scroll progress, cookie banner
14. npm run build + fix errori
```