import type { Metadata } from 'next'
import { ChiSiamoClient } from './ChiSiamoClient'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Chi Siamo | Daunia Cars',
  description:
    'Daunia Cars è il punto di riferimento per noleggio e vendita auto a Parma. Scopri la nostra storia, i valori e il team che lavora ogni giorno per te.',
  canonicalPath: '/chi-siamo',
})

export default function ChiSiamoPage() {
  return <ChiSiamoClient />
}
