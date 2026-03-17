import type { Metadata } from 'next'

const BASE_URL = 'https://www.dauniacars.it'
const SITE_NAME = 'Daunia Cars'

// Genera OG image dinamica via API route (non richiede file statici)
function buildOgImageUrl(title: string, subtitle?: string): string {
  const params = new URLSearchParams({ title })
  if (subtitle) params.set('sub', subtitle)
  return `${BASE_URL}/api/og?${params.toString()}`
}

// ─────────────────────────────────────────────
// METADATA BASE
// ─────────────────────────────────────────────

export function buildMetadata(opts: {
  title: string
  description: string
  canonicalPath: string
  ogImage?: string
  ogSubtitle?: string
  noIndex?: boolean
}): Metadata {
  const { title, description, canonicalPath, ogImage, ogSubtitle, noIndex } = opts
  const url = `${BASE_URL}${canonicalPath}`
  // Se viene passata un'immagine esplicita (es. foto reale) usala, altrimenti genera dinamicamente
  const image = ogImage ?? buildOgImageUrl(title, ogSubtitle ?? description.slice(0, 80))

  return {
    title,
    description,
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'it_IT',
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

// ─────────────────────────────────────────────
// JSON-LD — LocalBusiness + AutoDealer
// ─────────────────────────────────────────────

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'AutoDealer'],
    name: SITE_NAME,
    url: BASE_URL,
    telephone: '[PHONE]',
    email: '[EMAIL]',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Strada Langhirano 264/1',
      addressLocality: 'Parma',
      postalCode: '43124',
      addressRegion: 'PR',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.7929,
      longitude: 10.3015,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00',
      },
    ],
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 44.7929,
        longitude: 10.3015,
      },
      geoRadius: '30000',
    },
  }
}

// ─────────────────────────────────────────────
// JSON-LD — Car (singolo veicolo)
// ─────────────────────────────────────────────

export function carJsonLd(vehicle: {
  name: string
  brand: string
  model: string
  year: number
  km: number
  fuel: string
  transmission: string
  description: string
  images: string[]
  slug: string
  salePrice?: number
  pricePerDay?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: vehicle.name,
    brand: {
      '@type': 'Brand',
      name: vehicle.brand,
    },
    model: vehicle.model,
    modelDate: vehicle.year.toString(),
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: vehicle.km,
      unitCode: 'KMT',
    },
    fuelType: vehicle.fuel,
    vehicleTransmission: vehicle.transmission,
    description: vehicle.description,
    image: vehicle.images,
    url: `${BASE_URL}/flotta/${vehicle.slug}`,
    ...(vehicle.salePrice && {
      offers: {
        '@type': 'Offer',
        price: vehicle.salePrice,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'AutoDealer',
          name: SITE_NAME,
        },
      },
    }),
  }
}

// ─────────────────────────────────────────────
// JSON-LD — RentAction
// ─────────────────────────────────────────────

export function rentActionJsonLd(serviceName: string, serviceUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RentAction',
    name: serviceName,
    url: `${BASE_URL}${serviceUrl}`,
    agent: {
      '@type': 'AutoDealer',
      name: SITE_NAME,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Strada Langhirano 264/1',
        addressLocality: 'Parma',
        postalCode: '43124',
        addressCountry: 'IT',
      },
    },
  }
}

// ─────────────────────────────────────────────
// JSON-LD — ItemList (flotta)
// ─────────────────────────────────────────────

export function fleetItemListJsonLd(
  vehicles: { name: string; slug: string; images: string[] }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Flotta Daunia Cars',
    url: `${BASE_URL}/flotta`,
    itemListElement: vehicles.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: v.name,
      url: `${BASE_URL}/flotta/${v.slug}`,
      image: v.images[0],
    })),
  }
}

// ─────────────────────────────────────────────
// JSON-LD — BreadcrumbList
// ─────────────────────────────────────────────

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  }
}
