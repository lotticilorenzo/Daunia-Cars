import type { Metadata } from 'next'
import { PreferitiClient } from './PreferitiClient'

export const metadata: Metadata = {
  title: 'I tuoi preferiti | Daunia Cars',
  description: 'I veicoli che hai salvato. Noleggio e vendita auto a Parma.',
  robots: { index: false },
}

export default function PreferitiPage() {
  return <PreferitiClient />
}
