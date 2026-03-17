import type { Metadata } from 'next'
import { NoleggioLungoClient } from './NoleggioLungoClient'

export const metadata: Metadata = {
  title: 'Noleggio Auto Lungo Termine Parma — NLT Privati e Aziende | Daunia Cars',
  description:
    'Noleggio a lungo termine a Parma da 12 a 48 mesi. Canone fisso all-inclusive per privati e aziende. IVA detraibile. Scopri i vantaggi del NLT con Daunia Cars.',
  alternates: { canonical: 'https://www.dauniacars.it/noleggio-lungo' },
  openGraph: {
    title: 'Noleggio Auto Lungo Termine Parma — NLT Privati e Aziende | Daunia Cars',
    description:
      'Noleggio a lungo termine a Parma da 12 a 48 mesi. Canone fisso all-inclusive per privati e aziende. IVA detraibile. Scopri i vantaggi del NLT con Daunia Cars.',
    url: 'https://www.dauniacars.it/noleggio-lungo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noleggio Auto Lungo Termine Parma — NLT Privati e Aziende | Daunia Cars',
    description:
      'Noleggio a lungo termine a Parma da 12 a 48 mesi. Canone fisso all-inclusive per privati e aziende. IVA detraibile. Scopri i vantaggi del NLT con Daunia Cars.',
  },
}

export default function NoleggioLungo() {
  return <NoleggioLungoClient />
}
