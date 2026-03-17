Leggi questo file INTERO prima di scrivere qualsiasi riga di codice.
È la fonte di verità del progetto. Non assumere nulla che non sia scritto qui.


1. IDENTITÀ BRAND
Nome: Daunia Cars
Settore: Automotive — Noleggio e Rivendita Veicoli
Sede: Strada Langhirano 264/1, Parma (PR), Italia
Telefono: [PHONE] ← sostituire
Email: [EMAIL] ← sostituire
P.IVA: [VAT] ← sostituire
Orari: [HOURS] ← sostituire
Positioning: Nuovo punto di riferimento per chi cerca qualità,
trasparenza e soluzioni su misura nel mondo automotive parmense.
Tone of Voice:

Diretto, concreto, mai pomposo
Professionale ma caldo — parla da persona a persona
Italiano corretto. Zero anglicismi inutili. Zero frasi fatte AI.
CTA preferite: "Richiedi Preventivo", "Scopri la Flotta",
"Prenota un Appuntamento", "Valuta la tua Auto"
MAI usare: "Elevate", "Seamless", "Next-Gen", "Unleash", "Scopri di più"

Servizi core (in ordine di priorità SEO):

Noleggio breve termine
Noleggio lungo termine (NLT) — anche aziendale
Vendita veicoli usati garantiti
Permuta veicoli
Finanziamenti personalizzati


2. STACK TECNICO — VINCOLI ASSOLUTI
Next.js 14+         App Router, Server Components default
TypeScript          strict: true — ZERO uso di `any`
Tailwind CSS v3     CONTROLLA package.json prima di usare sintassi
Framer Motion       Solo per UI interactions (NON mescolare con GSAP)
GSAP + ScrollTrigger Solo per scroll-driven e animazioni canvas/svg
                    Sempre gsap.context() + cleanup ctx.revert()
@phosphor-icons/react Unica libreria icone — controlla versione installata
react-hook-form     Per TUTTI i form
zod                 Per TUTTE le validazioni
clsx / cn()         Per classi condizionali
next/image          OBBLIGATORIO — mai <img> raw
next/font           Per tutti i font Google
REGOLA CRITICA GSAP vs FRAMER:

Framer Motion → interazioni UI, hover, stagger, AnimatePresence
GSAP → scroll-driven (ScrollTrigger), animazioni canvas, sequenze cinematografiche
MAI i due nello stesso albero di componenti


3. ARCHITETTURA CARTELLE
src/
  app/
    (marketing)/
      layout.tsx          ← breadcrumb + page transition wrapper
      page.tsx            ← Homepage
      noleggio-breve/
        page.tsx
      noleggio-lungo/
        page.tsx
      vendita/
        page.tsx
      permuta/
        page.tsx
      flotta/
        page.tsx
        [slug]/
          page.tsx        ← pagina singolo veicolo
      contatti/
        page.tsx
    layout.tsx            ← root: font, metadata base, providers
    globals.css
    sitemap.ts
    robots.ts
  components/
    layout/
      Header.tsx
      Footer.tsx
      NavMobile.tsx
    sections/             ← sezioni delle pagine
      HeroSection.tsx
      CarScrollSection.tsx  ← AUTO CHE ATTRAVERSA LO SCHERMO
      StatsSection.tsx
      ServicesSection.tsx
      FleetPreviewSection.tsx
      ManifestoSection.tsx
      ProcessSection.tsx
      TestimonialsSection.tsx
      CtaSection.tsx
    ui/                   ← componenti atomici
      MagneticButton.tsx
      VehicleCard.tsx
      FilterTabs.tsx
      PageTransition.tsx
      ScrollProgress.tsx
      WhatsAppFAB.tsx
    forms/
      RentalForm.tsx
      ContactForm.tsx
      TradeInForm.tsx
  lib/
    utils.ts              ← cn(), formatPrice(), formatDate()
    animations.ts         ← varianti Framer Motion riusabili
    gsap-utils.ts         ← helper GSAP, init ScrollTrigger
    validations.ts        ← tutti gli schema Zod
    seo.ts                ← helper metadata, JSON-LD generators
  types/
    index.ts              ← IVehicle, IService, IFormData, etc.
  data/
    vehicles.ts           ← dati mock veicoli
    services.ts           ← dati servizi
    testimonials.ts       ← testimonianze

4. CONVENZIONI CODICE
Naming:

Componenti: PascalCase (es. HeroSection.tsx)
Hook custom: camelCase con prefisso use (es. useScrollProgress)
Tipi/Interfacce: PascalCase (es. Vehicle, ServiceType)
Costanti: SCREAMING_SNAKE_CASE
File CSS custom: kebab-case

Importazioni — ordine obbligatorio:
typescript// 1. React + Next
import { ... } from 'react'
import { ... } from 'next/...'
// 2. Librerie terze
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
// 3. Componenti interni
import { HeroSection } from '@/components/sections/HeroSection'
// 4. Tipi
import type { Vehicle } from '@/types'
// 5. Utils/lib
import { cn } from '@/lib/utils'
Regole assolute:

"use client" SOLO sui componenti foglia interattivi — mai sui layout
Server Components per tutto ciò che non ha stato/eventi
try/catch su tutte le operazioni async
aria-label su tutti gli elementi interattivi senza testo visibile
alt descrittivo su tutte le immagini (mai stringa vuota per immagini content)
Zero console.log in commit — usa console.error solo per errori reali


5. SEO — PRIORITÀ ALTA
Keyword principale: noleggio auto Parma
Keyword secondarie:

noleggio auto lungo termine Parma
noleggio auto breve termine Parma
vendita auto usate Parma
permuta auto Parma
noleggio aziendale Parma
autonoleggio Emilia-Romagna

Formato title tag: [Servizio] a Parma | Daunia Cars
Ogni pagina DEVE avere:
typescriptexport const metadata: Metadata = {
  title: '...',
  description: '...', // 150-160 caratteri
  openGraph: { title, description, images, url },
  twitter: { card: 'summary_large_image', ... },
  alternates: { canonical: '...' }
}
Schema.org JSON-LD obbligatori:

Homepage + Contatti → LocalBusiness + AutoDealer
Noleggio → RentAction
Vendita → BuyAction + Car
Flotta → ItemList
Singolo veicolo → Car con tutte le props


6. ANIMAZIONE SIGNATURE — AUTO CHE ATTRAVERSA LO SCHERMO
Questa è l'animazione più importante del sito. Va implementata nel componente
CarScrollSection.tsx e posizionata subito dopo la Hero nella homepage.
Comportamento:

L'utente scrolla verticalmente
GSAP ScrollTrigger converte lo scroll in movimento orizzontale dell'auto
L'auto (SVG o immagine PNG con sfondo trasparente) parte da x: -20vw
fuori dal bordo sinistro e arriva a x: 120vw fuori dal bordo destro
Durante il passaggio, appaiono in sequenza elementi di testo/dati
(es: "500+ veicoli", "Parma dal 20XX") che si rivelano con fade-up
La sezione è pinnata (pin: true) per la durata dell'animazione
Su mobile: animazione semplificata (scale ridotto, testo più compatto)
Implementazione GSAP:

javascript  gsap.to(carRef.current, {
    x: '140vw',
    ease: 'none',
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
      pin: true,
    }
  })

7. DATI — STRUTTURA TIPI
typescript// Tipo veicolo
interface Vehicle {
  id: string
  slug: string
  name: string           // es: "Golf 1.5 TSI"
  brand: string          // es: "Volkswagen"
  model: string
  year: number
  km: number
  fuel: 'benzina' | 'diesel' | 'ibrido' | 'elettrico' | 'gpl'
  transmission: 'manuale' | 'automatico'
  category: 'city-car' | 'berlina' | 'suv' | 'furgone' | 'luxury' | 'monovolume'
  availability: ('noleggio-breve' | 'noleggio-lungo' | 'vendita')[]
  pricePerDay?: number   // noleggio breve
  pricePerMonth?: number // noleggio lungo
  salePrice?: number     // vendita
  images: string[]       // array URL
  features: string[]
  description: string
  badge?: 'Nuovo Arrivo' | 'Offerta' | 'Solo Noleggio' | 'Garanzia+'
}

// Tipo form noleggio
interface RentalFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  service: 'noleggio-breve' | 'noleggio-lungo' | 'vendita' | 'permuta' | 'finanziamento'
  startDate?: string
  endDate?: string
  vehiclePreference?: string
  notes?: string
  privacyConsent: boolean
}

8. GESTIONE ERRORI E STATI UI
Ogni componente interattivo DEVE implementare:

Loading state: skeleton shimmer (dimensioni coerenti col layout reale)
Error state: messaggio inline, mai alert browser
Empty state: illustrazione + testo guida
Success state: feedback visivo (mai solo console.log)

Form specifico:

Validazione real-time onBlur
Errori sotto il campo con icona Warning di Phosphor
Submit: stato loading con spinner nel bottone (non disabilitare il form intero)
Success: messaggio inline + reset form dopo 3s


9. PERFORMANCE — GUARDRAIL

Immagini above-the-fold → priority su next/image
Font → display: 'swap' sempre
Animazioni GSAP → cleanup obbligatorio in useEffect return
Animazioni perpetue → React.memo + isolate in Client Component foglia
MAI animare top, left, width, height → solo transform e opacity
will-change: transform con parsimonia (max 3-4 elementi per pagina)
Noise/grain overlay → solo su pseudo-elementi fixed con pointer-events-none
prefers-reduced-motion → sempre rispettato:

typescript  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!prefersReduced) { /* avvia animazione */ }

10. CHECKLIST PRE-COMMIT
Prima di considerare un componente "done":

 TypeScript strict — zero errori, zero any
 npm run build passa senza errori
 Mobile layout testato (320px, 375px, 768px)
 Tutti i link interni funzionanti
 Metadata export presente sulla pagina
 prefers-reduced-motion gestito
 GSAP cleanup ctx.revert() presente
 Immagini con next/image e alt descrittivo
 Form con validazione Zod + feedback stati
 Accessibility: focus visible, aria-label, tab order logico