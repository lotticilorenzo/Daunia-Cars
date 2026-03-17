import type { Metadata } from 'next'
import { NoleggioBreveClient } from './NoleggioBreveClient'

export const metadata: Metadata = {
  title: 'Noleggio Auto Breve Termine a Parma | Daunia Cars',
  description:
    'Noleggio auto a breve termine a Parma da 1 a 30 giorni. Assicurazione inclusa, flotta aggiornata, consegna a domicilio. Prenota online in 2 minuti.',
  alternates: { canonical: 'https://daunia.cars/noleggio-breve' },
  openGraph: {
    title: 'Noleggio Auto Breve Termine a Parma | Daunia Cars',
    description:
      'Noleggio auto a breve termine a Parma da 1 a 30 giorni. Assicurazione inclusa, flotta aggiornata, consegna a domicilio. Prenota online in 2 minuti.',
    url: 'https://daunia.cars/noleggio-breve',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noleggio Auto Breve Termine a Parma | Daunia Cars',
    description:
      'Noleggio auto a breve termine a Parma da 1 a 30 giorni. Assicurazione inclusa, flotta aggiornata, consegna a domicilio. Prenota online in 2 minuti.',
  },
}

export default function NoleggioBreve() {
  return <NoleggioBreveClient />
}
