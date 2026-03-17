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
  title: 'Daunia Cars — Noleggio e Vendita Auto a Parma',
  description:
    'Noleggio auto breve e lungo termine, vendita veicoli garantiti, permuta e finanziamenti a Parma. Qualità, trasparenza e soluzioni su misura. Scopri la flotta Daunia Cars.',
  alternates: { canonical: 'https://daunia.cars/' },
  openGraph: {
    title: 'Daunia Cars — Noleggio e Vendita Auto a Parma',
    description:
      'Noleggio auto breve e lungo termine, vendita veicoli garantiti, permuta e finanziamenti a Parma.',
    url: 'https://daunia.cars/',
    images: [{ url: '/og/homepage.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daunia Cars — Noleggio e Vendita Auto a Parma',
    description:
      'Noleggio auto breve e lungo termine, vendita veicoli garantiti, permuta e finanziamenti a Parma.',
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
