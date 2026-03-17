import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { LavoraConNoiClient } from './LavoraConNoiClient'

export const metadata: Metadata = buildMetadata({
  title: 'Lavora con Noi | Daunia Cars',
  description:
    'Entra nel team Daunia Cars a Parma. Inviaci il tuo curriculum: cerchiamo persone motivate nel settore automotive. Candidatura spontanea sempre aperta.',
  canonicalPath: '/lavora-con-noi',
})

export default function LavoraConNoiPage() {
  return <LavoraConNoiClient />
}
