import type { Metadata } from 'next'
import Script from 'next/script'
import HeroSection from '@/components/sections/HeroSection'
import CarScrollSection from '@/components/sections/CarScrollSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { FleetPreviewSection } from '@/components/sections/FleetPreviewSection'
import { ManifestoSection } from '@/components/sections/ManifestoSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { localBusinessJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Daunia Cars — Vendita Auto a Parma',
  description:
    'Vendita veicoli usati garantiti, permuta e finanziamenti a Parma. Qualità, trasparenza e soluzioni su misura. Scopri la flotta Daunia Cars.',
  alternates: { canonical: 'https://www.dauniacars.it/' },
  openGraph: {
    title: 'Daunia Cars — Vendita Auto a Parma',
    description:
      'Vendita veicoli usati garantiti, permuta e finanziamenti a Parma. Qualità e trasparenza.',
    url: 'https://www.dauniacars.it/',
    images: [{ url: 'https://www.dauniacars.it/api/og?title=Daunia+Cars&sub=Vendita+Auto+a+Parma', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daunia Cars — Vendita Auto a Parma',
    description:
      'Vendita veicoli usati garantiti, permuta e finanziamenti a Parma.',
  },
}

export default function HomePage() {
  return (
    <>
      <Script
        id="schema-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />
      <HeroSection />
      <CarScrollSection />
      <StatsSection />
      <ServicesSection />
      <FleetPreviewSection />
      <ManifestoSection />
      <ProcessSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
