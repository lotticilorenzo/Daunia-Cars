// ─────────────────────────────────────────────
// VEICOLO
// ─────────────────────────────────────────────

export interface Vehicle {
  id: string
  slug: string
  name: string           // es: "Golf 1.5 TSI"
  brand: string          // es: "Volkswagen"
  model: string
  year: number
  km: number
  fuel: 'benzina' | 'diesel' | 'ibrido' | 'elettrico' | 'gpl'
  transmission: 'manuale' | 'automatico'
  category: 'city-car' | 'berlina' | 'suv' | 'furgone' | 'luxury' | 'monovolume'
  availability: ('noleggio-breve' | 'noleggio-lungo' | 'vendita')[]
  pricePerDay?: number   // noleggio breve
  pricePerMonth?: number // noleggio lungo
  salePrice?: number     // vendita
  images: string[]       // array URL
  features: string[]
  description: string
  badge?: 'Nuovo Arrivo' | 'Offerta' | 'Solo Noleggio' | 'Garanzia+'
}

// ─────────────────────────────────────────────
// FORM NOLEGGIO / CONTATTO
// ─────────────────────────────────────────────

export interface RentalFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  service: ServiceType
  startDate?: string
  endDate?: string
  vehiclePreference?: string
  notes?: string
  privacyConsent: boolean
}

// ─────────────────────────────────────────────
// SERVIZI
// ─────────────────────────────────────────────

export type ServiceType =
  | 'noleggio-breve'
  | 'noleggio-lungo'
  | 'vendita'
  | 'permuta'
  | 'finanziamento'

export interface Service {
  id: ServiceType
  title: string
  shortTitle: string
  description: string
  features: string[]
  cta: string
  href: string
  icon: string // nome icona Phosphor
}

// ─────────────────────────────────────────────
// TESTIMONIANZA
// ─────────────────────────────────────────────

export interface Testimonial {
  id: string
  name: string
  role?: string          // es: "Libero professionista", "Titolare PMI"
  avatarUrl?: string
  rating: 1 | 2 | 3 | 4 | 5
  text: string
  service: ServiceType   // quale servizio ha utilizzato
  date: string           // ISO date string
  verified: boolean      // recensione verificata
}

// ─────────────────────────────────────────────
// STATISTICHE (usate in StatsSection)
// ─────────────────────────────────────────────

export interface StatItem {
  value: number
  suffix: string         // es: "+", "%", " km"
  label: string
  description?: string
}

// ─────────────────────────────────────────────
// NAVIGAZIONE
// ─────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

// ─────────────────────────────────────────────
// FILTRI FLOTTA
// ─────────────────────────────────────────────

export interface FleetFilters {
  availability?: Vehicle['availability'][number] | 'tutti'
  category?: Vehicle['category'] | 'tutti'
  fuel?: Vehicle['fuel'][]
  transmission?: Vehicle['transmission'][]
  maxKm?: number
  minYear?: number
  priceMax?: number
  search?: string
}

// ─────────────────────────────────────────────
// SEO / METADATA
// ─────────────────────────────────────────────

export interface PageSeoProps {
  title: string
  description: string
  canonicalPath: string
  ogImage?: string
}
