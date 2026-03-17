# SKILL.md — Design System Daunia Cars

> Questo file definisce l'estetica, le regole visive e l'arsenale creativo
> del progetto. Leggilo prima di scrivere CSS, Tailwind o animazioni.
> Le regole qui SOVRASCRIVONO qualsiasi tuo default.

---

## 1. CONFIGURAZIONE ATTIVA

```
DESIGN_VARIANCE:  8   (layout asimmetrici, grid non convenzionali)
MOTION_INTENSITY: 9   (cinematografico — GSAP scroll-driven + Framer fisica)
VISUAL_DENSITY:   4   (bilanciato — premium ma respirabile)
```

Questi valori guidano ogni decisione. Non chiedere conferma. Applica.

---

## 2. IDENTITÀ VISIVA

**Mood:** Automotive futuristico. Non una concessionaria generica —
uno showroom digitale di precisione. Buio, elegante, velocità controllata.
Ogni scroll deve sembrare che stai girando la chiave di accensione.

**Riferimenti estetici:**
- Porsche Digital / BMW Group digital experiences
- Dark automotive editorial (Motor Trend, Top Gear magazine)
- NOT: concessionarie locali italiane con sfondo bianco e Comic Sans

---

## 3. PALETTE COLORI

```css
/* ── PRIMARI ── */
--color-bg:           #0C0C0E;   /* Asfalto profondo — sfondo base */
--color-surface:      #141416;   /* Superfici card/pannelli */
--color-surface-2:    #1C1C20;   /* Livello sopra surface */
--color-border:       #2A2A30;   /* Bordi sottili */
--color-border-light: #3A3A42;   /* Bordi in hover */

/* ── ACCENTO UNICO ── */
--color-accent:       #E8380D;   /* Rosso Daunia — Racing Red desaturato */
--color-accent-dark:  #B82C0A;   /* Versione scura per hover */
--color-accent-glow:  rgba(232, 56, 13, 0.15); /* Per glow sottili */

/* ── TESTO ── */
--color-text-primary: #F0EEE8;   /* Avorio caldo — mai bianco puro */
--color-text-secondary: #8A8A96; /* Grigio medio */
--color-text-muted:   #52525C;   /* Grigio scuro — caption/label */

/* ── SPECIALI ── */
--color-chrome:       #C8C8D0;   /* Cromo — dettagli premium */
--color-gold:         #B8962E;   /* Oro brunito — badge esclusivi */
```

**Regole colore ASSOLUTE:**
- MAI `#000000` puro → usa `--color-bg`
- MAI `#FFFFFF` puro → usa `--color-text-primary`
- UN SOLO accento: `--color-accent`. Zero altri colori vivaci.
- Niente gradienti viola/blu AI. Niente neon.
- Ombre tonalizzate con accent: `rgba(232, 56, 13, 0.08)` — mai ombre nere piatte

**In Tailwind config (estendi):**
```javascript
colors: {
  bg: '#0C0C0E',
  surface: '#141416',
  'surface-2': '#1C1C20',
  border: '#2A2A30',
  accent: '#E8380D',
  'accent-dark': '#B82C0A',
  chrome: '#C8C8D0',
  gold: '#B8962E',
  'text-primary': '#F0EEE8',
  'text-secondary': '#8A8A96',
  'text-muted': '#52525C',
}
```

---

## 4. TIPOGRAFIA

**Font stack (caricare con next/font/google):**

```typescript
// Display / Titoli grandi
import { Barlow_Condensed } from 'next/font/google'
const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  style: ['normal', 'italic'],
})

// UI / Corpo / Navigazione
import { DM_Sans } from 'next/font/google'
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300','400','500','600'] })

// Dati / Numeri / Monospace
import { JetBrains_Mono } from 'next/font/google'
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400','500'] })
```

**Scale tipografica:**
```
Display Hero:  clamp(64px, 10vw, 120px) — Barlow Condensed 800 — tracking: -0.02em
H1:            clamp(40px, 6vw, 72px)   — Barlow Condensed 700
H2:            clamp(28px, 4vw, 48px)   — Barlow Condensed 700
H3:            clamp(20px, 2.5vw, 28px) — DM Sans 600
Body:          16-18px                  — DM Sans 400 — line-height: 1.65
Caption/Label: 11-13px                  — DM Sans 500 — tracking: 0.08em — UPPERCASE
Numeri/Dati:   qualsiasi dimensione     — JetBrains Mono 500
```

**Regole tipografia:**
- Titoli hero: Barlow Condensed Italic per la parola/frase di impatto
- MAI font serif per questo progetto (è automotive, non editoriale)
- Labels e categorie: sempre uppercase + letter-spacing largo
- Numeri (prezzi, km, anni, stats): sempre JetBrains Mono
- max-width per body text: `65ch`

---

## 5. LAYOUT E SPAZIATURA

**Container:**
```css
max-width: 1400px;
margin: 0 auto;
padding: 0 clamp(16px, 5vw, 80px);
```

**Sezioni — padding verticale:**
```
xs (mobile):  64px  top/bottom
sm:           80px
md:           112px
lg:           140px
xl:           160px
```

**Grid system:**
- Desktop: `grid-template-columns: 2fr 1fr` o `3fr 1fr` o masonry
- MAI layout a 3 colonne uguali per le feature — usa zigzag 2 col o bento
- Mobile: sempre singola colonna, mai scroll orizzontale indesiderato

**BIAS ANTI-CENTRATURA (MOTION 8):**
- Hero content → allineato in basso a sinistra (flex + padding-bottom)
- Sezioni alternate: testo sx/immagine dx — poi testo dx/immagine sx
- Titoli di sezione: allineati a sinistra, con numero sezione in monospace come decorazione

---

## 6. NAVBAR — "Floating Island"

Pillola `fixed` centrata orizzontalmente, `z-[100]`.

**Stato iniziale (top pagina):**
```css
background: transparent;
backdrop-filter: none;
border: 1px solid rgba(255,255,255,0.05);
```

**Stato scrolled (dopo 80px):**
```css
background: rgba(12, 12, 14, 0.85);
backdrop-filter: blur(20px) saturate(180%);
border: 1px solid rgba(42, 42, 48, 0.8);
```

**Struttura:** Logo (sx) | Links (centro) | "Prenota" CTA accent (dx)
**Mobile:** hamburger → fullscreen drawer con stagger Framer Motion
**Transizione stato:** Framer Motion `animate` su layout changes

---

## 7. ANIMAZIONE SIGNATURE — HERO CON AUTO

Questa è la feature più distintiva. Implementarla esattamente così:

### CarScrollSection — Comportamento

```
1. Sezione pinnata (GSAP pin: true) per durata scroll ~200vh
2. Sfondo: highway/asfalto notturno — immagine full-bleed con overlay scuro
3. L'auto (PNG trasparente o SVG stilizzato) parte da x: -20vw
4. Scrub 1.5 — movimento fluido legato allo scroll
5. Durante il passaggio appaiono 4 "data chips" in sequenza:
   - "500+ Veicoli"
   - "Parma, dal 20XX"
   - "Noleggio & Vendita"
   - "Finanziamenti Personalizzati"
   Ogni chip: background surface + bordo accent + testo monospace
6. Trail di luce sotto l'auto (pseudo-elemento gradient orizzontale)
7. Fine animazione: auto esce da dx, sezione si unpinna, continua scroll normale
```

**Dettaglio implementativo:**
```typescript
// Nel useEffect con gsap.context():
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top top',
    end: '+=200%',
    scrub: 1.5,
    pin: true,
    anticipatePin: 1,
  }
})

tl.to(carRef.current, { x: '140vw', ease: 'none' })
  .from(chip1Ref.current, { opacity: 0, y: 20 }, 0.1)
  .from(chip2Ref.current, { opacity: 0, y: 20 }, 0.3)
  .from(chip3Ref.current, { opacity: 0, y: 20 }, 0.55)
  .from(chip4Ref.current, { opacity: 0, y: 20 }, 0.75)
```

**Mobile fallback:**
- Auto in versione ridotta (60vw)
- Chip appaiono in stack verticale con fade-in
- Scrub mantenuto ma durata ridotta a 100vh

---

## 8. COMPONENTI UI — SPECIFICHE

### MagneticButton
```typescript
// Usa useMotionValue + useTransform — MAI useState per hover magnetico
// Attrazione massima: ±8px x, ±5px y
// Spring: stiffness: 150, damping: 15
// Varianti: 'primary' (bg accent), 'ghost' (border chrome), 'outline' (border accent)
```

### VehicleCard
```
Aspect ratio immagine: 16/9
Background card: --color-surface
Hover: translateY(-4px) + shadow tonalizzata accent + bordo accent visible
Info layout: categoria (label uppercase monospace) | nome | prezzo | CTA
Badge: assoluto top-left — Barlow Condensed 700, background accent o gold
Animazione: Framer Motion whileHover con spring physics
```

### SpotlightBorderCard
```
Su hover, un gradiente radiale segue il cursore lungo il bordo della card.
Implementazione via CSS custom property --mouse-x --mouse-y aggiornate in JS.
Bordo: background gradient conic che usa le coordinate mouse.
```

### FilterTabs
```
Tabs animate con layoutId Framer Motion per pill indicator
Transizione: spring stiffness:300 damping:30
Active: background accent con testo bg
Inactive: testo secondary, hover testo primary
```

### Form Inputs
```
Stile: border-bottom only (1px solid --color-border)
Focus: border-bottom --color-accent + label sale in alto (floating label)
Label: DM Sans 500, transition transform+color
Error: sotto l'input, DM Sans 400, colore #E05252, icona Warning Phosphor
Loading submit: spinner nel bottone, testo "Invio in corso..."
Success: check icon + "Richiesta inviata! Ti contatteremo entro 24h"
```

---

## 9. EFFETTI VISIVI — ARSENALE

### Noise Overlay (globale, obbligatorio)
```css
/* In globals.css — su body::after */
.noise-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,..."); /* feTurbulence SVG */
}
```

### Liquid Glass (per navbar scrolled e modali)
```css
background: rgba(12, 12, 14, 0.7);
backdrop-filter: blur(20px) saturate(180%);
border: 1px solid rgba(255,255,255,0.06);
box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
/* Il box-shadow inset simula la rifrazione del bordo — MAI senza questo */
```

### Mesh Gradient Animato (per hero background alternativo)
```css
/* Sfondo animato con 3 radial gradient che si muovono lentamente */
/* Colori: accent glow + surface-2 + bg */
/* Velocità: 8-12s — impercettibile ma vivo */
```

### Marquee Cinetico
```
Banda orizzontale infinita con testo uppercase monospace
Contenuto: "NOLEGGIO BREVE · NOLEGGIO LUNGO · VENDITA · PERMUTA · FINANZIAMENTO ·"
Velocità: 25s linear infinite
Su hover: pausa animazione
Colore: testo muted su sfondo surface-2
```

### Scroll Progress Bar
```
Linea sottile (2px) in accent color — top della pagina
width va da 0% a 100% in base allo scroll
Implementazione: Framer Motion useScroll + useSpring + scaleX
```

---

## 10. SEZIONI — ORDINE HOMEPAGE

```
1. HeroSection          → full-dvh, contenuto basso-sx, GSAP fade-up testo
2. CarScrollSection     → AUTO CHE ATTRAVERSA (pinnata, scroll-driven)
3. StatsSection         → 4 counter GSAP count-up al viewport
4. ServicesSection      → 3 servizi in zigzag 2 colonne
5. FleetPreviewSection  → filtri + grid veicoli con stagger
6. ManifestoSection     → dark full-width, SplitText GSAP reveal
7. ProcessSection       → sticky stack 3 card (come PROTOCOL nel GEMINI.md)
8. TestimonialsSection  → carousel auto-scroll
9. CtaSection           → banda accent full-width, CTA finale
[Footer]
```

---

## 11. PATTERN PROIBITI (Anti-AI-Slop)

Questi pattern NON devono mai apparire nel progetto:

**Visual:**
- Sfondi bianchi o grigi chiari (il sito è dark-first)
- Gradienti viola/indaco/teal AI
- Box-shadow neon esterne luminose
- Bordi radius troppo piccoli (< 6px per card) o troppo grandi (> 24px per elementi small)

**Tipografia:**
- Font Inter, Roboto, Lato, Open Sans
- Titoli in gradient clip-text colorati
- H1 centrato su sfondo scuro (sempre allineato a sx)
- Punto esclamativo nei titoli di sezione

**Layout:**
- 3 card uguali in riga per le feature principali
- Grid perfettamente simmetrico a 2 colonne uguali
- Hero con testo centrato verticalmente e orizzontalmente

**Contenuto:**
- Numeri puliti: "500", "100%", "24/7" → usa organici: "500+", "98.3%", "ogni giorno"
- Testi placeholder "Lorem ipsum" — mai
- Icone generiche "auto" come emoji
- CTA "Scopri di più" o "Clicca qui"

**Tecnico:**
- `h-screen` → sempre `min-h-[100dvh]`
- Animare `top/left/width/height` → solo `transform/opacity`
- `z-50` random → sistema z-index strutturato
- `window.addEventListener('scroll')` → sempre ScrollTrigger o useScroll Framer

---

## 12. ACCESSIBILITÀ — NON NEGOZIABILE

- Contrasto testo/sfondo: min 4.5:1 per body, min 3:1 per large text
- Focus visible su tutti gli elementi interattivi (outline 2px accent)
- `prefers-reduced-motion`: disabilita TUTTE le animazioni, mantieni transizioni opacity brevi
- `aria-label` su: hamburger menu, CTA senza testo descrittivo, icone standalone
- Form: label associata, error annunciato con `role="alert"`
- Immagini decorative: `alt=""` — immagini content: alt descrittivo in italiano