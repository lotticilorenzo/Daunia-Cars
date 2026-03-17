import type { Metadata } from 'next'
import { PermutaClient } from './PermutaClient'

export const metadata: Metadata = {
  title: 'Permuta Auto a Parma — Valutazione Gratuita in 24h | Daunia Cars',
  description:
    'Valuta e permuta la tua auto a Parma con Daunia Cars. Valutazione gratuita entro 24 ore. Prezzi onesti, pratiche veloci.',
  alternates: { canonical: 'https://daunia.cars/permuta' },
  openGraph: {
    title: 'Permuta Auto a Parma — Valutazione Gratuita in 24h | Daunia Cars',
    description:
      'Valuta e permuta la tua auto a Parma con Daunia Cars. Valutazione gratuita entro 24 ore. Prezzi onesti, pratiche veloci.',
    url: 'https://daunia.cars/permuta',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Permuta Auto a Parma — Valutazione Gratuita in 24h | Daunia Cars',
    description:
      'Valuta e permuta la tua auto a Parma con Daunia Cars. Valutazione gratuita entro 24 ore. Prezzi onesti, pratiche veloci.',
  },
}

export default function PermutaPage() {
  return <PermutaClient />
}
