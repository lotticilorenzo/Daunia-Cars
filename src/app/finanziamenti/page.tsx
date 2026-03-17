import type { Metadata } from 'next'
import { FinanziamentiClient } from './FinanziamentiClient'

export const metadata: Metadata = {
  title: 'Finanziamenti Auto Parma — Soluzioni Personalizzate | Daunia Cars',
  description:
    "Finanziamenti personalizzati per l'acquisto auto a Parma. Tasso fisso, leasing e balloon. Risposta in 48 ore.",
  alternates: { canonical: 'https://daunia.cars/finanziamenti' },
  openGraph: {
    title: 'Finanziamenti Auto Parma — Soluzioni Personalizzate | Daunia Cars',
    description:
      "Finanziamenti personalizzati per l'acquisto auto a Parma. Tasso fisso, leasing e balloon. Risposta in 48 ore.",
    url: 'https://daunia.cars/finanziamenti',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finanziamenti Auto Parma — Soluzioni Personalizzate | Daunia Cars',
    description:
      "Finanziamenti personalizzati per l'acquisto auto a Parma. Tasso fisso, leasing e balloon. Risposta in 48 ore.",
  },
}

export default function FinanziamentiPage() {
  return <FinanziamentiClient />
}
