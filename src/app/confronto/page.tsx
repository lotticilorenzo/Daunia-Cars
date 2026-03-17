import type { Metadata } from 'next'
import { ConfrontoClient } from './ConfrontoClient'

export const metadata: Metadata = {
  title: 'Confronto Veicoli a Parma | Daunia Cars',
  description:
    'Confronta fianco a fianco due veicoli della flotta Daunia Cars. Prezzi, km, alimentazione e dotazioni in un colpo d\'occhio. Noleggio e vendita a Parma.',
  openGraph: {
    title: 'Confronto Veicoli | Daunia Cars Parma',
    description:
      'Confronta fianco a fianco due veicoli della flotta Daunia Cars a Parma.',
    url: 'https://www.dauniacars.it/confronto',
  },
  alternates: {
    canonical: '/confronto',
  },
  robots: {
    index: false, // pagina dinamica/personale, non indicizzare
  },
}

export default function ConfrontoPage() {
  return <ConfrontoClient />
}
