import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'noleggio-breve',
    title: 'Noleggio Breve Termine',
    shortTitle: 'Noleggio Breve',
    description:
      'Massima flessibilità da 1 a 30 giorni. Assicurazione inclusa, assistenza h24, consegna a domicilio su Parma e provincia.',
    features: [
      'Flotta sempre aggiornata',
      'Zero costi nascosti',
      'Consegna inclusa su Parma',
      'Assistenza 24 ore su 24',
    ],
    cta: 'Scopri il Noleggio Breve',
    href: '/noleggio-breve',
    icon: 'CalendarBlank',
  },
  {
    id: 'noleggio-lungo',
    title: 'Noleggio Lungo Termine',
    shortTitle: 'NLT',
    description:
      'Contratti da 12 a 48 mesi per privati e aziende. Manutenzione, bollo e assicurazione già inclusi nel canone.',
    features: [
      'Canone mensile fisso e deducibile',
      'Include manutenzione ordinaria',
      'IVA detraibile per P.IVA',
      'Nessun imprevisto di spesa',
    ],
    cta: 'Scopri il Noleggio Lungo',
    href: '/noleggio-lungo',
    icon: 'CalendarCheck',
  },
  {
    id: 'vendita',
    title: 'Vendita Veicoli',
    shortTitle: 'Vendita',
    description:
      'Auto usate selezionate e revisionate, con garanzia inclusa. Valutiamo la tua auto in 24 ore. Finanziamenti su misura.',
    features: [
      'Auto certificate e garantite',
      'Valutazione permuta in 24h',
      'Finanziamento personalizzato',
      'Assistenza post-vendita',
    ],
    cta: 'Vedi Veicoli in Vendita',
    href: '/vendita',
    icon: 'Car',
  },
  {
    id: 'permuta',
    title: 'Permuta Veicoli',
    shortTitle: 'Permuta',
    description:
      'Valutiamo la tua auto gratuitamente in 24 ore. Prezzo equo, senza trattative estenuanti. Usa il valore come anticipo sul nuovo acquisto.',
    features: [
      'Valutazione gratuita in 24h',
      'Prezzo equo e trasparente',
      'Usabile come anticipo',
      'Pratiche rapide',
    ],
    cta: 'Valuta la tua Auto',
    href: '/permuta',
    icon: 'ArrowsLeftRight',
  },
  {
    id: 'finanziamento',
    title: 'Finanziamenti Personalizzati',
    shortTitle: 'Finanziamenti',
    description:
      'Tasso fisso, leasing e balloon su misura. Soluzioni per privati e aziende. Risposta in 48 ore.',
    features: [
      'Tasso fisso o variabile',
      'Leasing per P.IVA',
      'Durate da 24 a 60 mesi',
      'Risposta in 48 ore',
    ],
    cta: 'Calcola la tua Rata',
    href: '/finanziamenti',
    icon: 'CurrencyEur',
  },
]

export { blogArticles } from '@/data/blog'
