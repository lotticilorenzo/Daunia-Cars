import type { Metadata } from 'next'
import { VenditaClient } from './VenditaClient'

export const metadata: Metadata = {
  title: 'Vendita Auto Usate Garantite a Parma | Daunia Cars',
  description:
    'Auto usate selezionate e garantite a Parma. Ogni veicolo è revisionato e certificato. Permuta valutata in 24h. Finanziamento personalizzato disponibile.',
  alternates: { canonical: 'https://www.dauniacars.it/vendita' },
  openGraph: {
    title: 'Vendita Auto Usate Garantite a Parma | Daunia Cars',
    description:
      'Auto usate selezionate e garantite a Parma. Ogni veicolo è revisionato e certificato. Permuta valutata in 24h. Finanziamento personalizzato disponibile.',
    url: 'https://www.dauniacars.it/vendita',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vendita Auto Usate Garantite a Parma | Daunia Cars',
    description:
      'Auto usate selezionate e garantite a Parma. Ogni veicolo è revisionato e certificato. Permuta valutata in 24h. Finanziamento personalizzato disponibile.',
  },
}

export default function VenditaPage() {
  return <VenditaClient />
}
