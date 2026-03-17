import type { Metadata } from 'next'
import Script from 'next/script'
import { ContattiClient } from './ContattiClient'
import { buildMetadata, localBusinessJsonLd } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Contatti | Daunia Cars',
  description:
    'Contatta Daunia Cars a Parma: siamo in Strada Langhirano 264/1. Risposta garantita entro 24 ore. Chiamaci, scrivici o vieni a trovarci in sede.',
  canonicalPath: '/contatti',
})

export default function ContattiPage() {
  const jsonLd = localBusinessJsonLd()

  return (
    <>
      <Script
        id="ld-contatti"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContattiClient />
    </>
  )
}
