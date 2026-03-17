import type { Metadata } from 'next'
import Script from 'next/script'
import { buildMetadata, fleetItemListJsonLd } from '@/lib/seo'
import { vehicles } from '@/data/vehicles'
import { FlottaClient } from './FlottaClient'

export const metadata: Metadata = buildMetadata({
  title: 'Flotta Veicoli a Parma | Daunia Cars',
  description:
    'Scopri la flotta Daunia Cars a Parma: auto in noleggio breve, noleggio lungo termine e vendita. Veicoli garantiti, prezzi trasparenti. Richiedi un preventivo.',
  canonicalPath: '/flotta',
})

export default function FlottaPage() {
  const jsonLd = fleetItemListJsonLd(
    vehicles.map((v) => ({ name: `${v.brand} ${v.name}`, slug: v.slug, images: v.images }))
  )

  return (
    <>
      <Script
        id="fleet-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FlottaClient />
    </>
  )
}
