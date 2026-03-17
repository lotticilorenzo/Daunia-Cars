import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { buildMetadata, carJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { getVehicleBySlug, getAllSlugs } from '@/data/vehicles'
import { VehicleDetailClient } from './VehicleDetailClient'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams(): { slug: string }[] {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const vehicle = getVehicleBySlug(params.slug)

  if (!vehicle) {
    return buildMetadata({
      title: 'Veicolo non trovato | Daunia Cars',
      description: 'Il veicolo cercato non è disponibile. Scopri la nostra flotta completa.',
      canonicalPath: '/flotta',
      noIndex: true,
    })
  }

  const title = `${vehicle.brand} ${vehicle.name} ${vehicle.year} a Parma | Daunia Cars`
  const description = vehicle.description.slice(0, 158).trimEnd() + (vehicle.description.length > 158 ? '…' : '')

  return buildMetadata({
    title,
    description,
    canonicalPath: `/flotta/${vehicle.slug}`,
    ogImage: vehicle.images[0],
  })
}

export default function VehicleDetailPage({ params }: PageProps) {
  const vehicle = getVehicleBySlug(params.slug)

  if (!vehicle) {
    notFound()
  }

  const vehicleJsonLd = carJsonLd({
    name: `${vehicle.brand} ${vehicle.name}`,
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    km: vehicle.km,
    fuel: vehicle.fuel,
    transmission: vehicle.transmission,
    description: vehicle.description,
    images: vehicle.images,
    slug: vehicle.slug,
    salePrice: vehicle.salePrice,
    pricePerDay: vehicle.pricePerDay,
  })

  const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Flotta', path: '/flotta' },
    { name: `${vehicle.brand} ${vehicle.name}`, path: `/flotta/${vehicle.slug}` },
  ])

  return (
    <>
      <Script
        id="vehicle-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd) }}
      />
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <VehicleDetailClient vehicle={vehicle} />
    </>
  )
}
