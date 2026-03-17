import type { Vehicle } from '@/types'

export const vehicles: Vehicle[] = [
  {
    id: 'v001',
    slug: 'volkswagen-golf-15-tsi-2022',
    name: 'Golf 1.5 TSI',
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2022,
    km: 28400,
    fuel: 'benzina',
    transmission: 'automatico',
    category: 'berlina',
    availability: ['noleggio-breve', 'noleggio-lungo'],
    pricePerDay: 49,
    pricePerMonth: 420,
    images: [
      'https://picsum.photos/seed/golf-1/800/450',
      'https://picsum.photos/seed/golf-2/800/450',
      'https://picsum.photos/seed/golf-3/800/450',
      'https://picsum.photos/seed/golf-4/800/450',
    ],
    features: ['Navigatore', 'Cruise Control Adattivo', 'Telecamera Posteriore', 'Climatizzatore Bizona'],
    description:
      'La Volkswagen Golf 1.5 TSI in versione automatica è l\'auto ideale per chi cerca comfort e dinamismo quotidiano. Perfetta per uso misto città-autostrada, offre bassi consumi e un\'abitabilità generosa. Disponibile per noleggio breve o lungo termine.',
    badge: 'Nuovo Arrivo',
  },
  {
    id: 'v002',
    slug: 'toyota-rav4-hybrid-2021',
    name: 'RAV4 Hybrid',
    brand: 'Toyota',
    model: 'RAV4',
    year: 2021,
    km: 41200,
    fuel: 'ibrido',
    transmission: 'automatico',
    category: 'suv',
    availability: ['noleggio-breve', 'noleggio-lungo', 'vendita'],
    pricePerDay: 69,
    pricePerMonth: 580,
    salePrice: 31900,
    images: [
      'https://picsum.photos/seed/rav4-1/800/450',
      'https://picsum.photos/seed/rav4-2/800/450',
      'https://picsum.photos/seed/rav4-3/800/450',
      'https://picsum.photos/seed/rav4-4/800/450',
    ],
    features: ['Trazione AWD-i', 'Toyota Safety Sense', 'Display 9"', 'Portellone Elettrico'],
    description:
      'Il Toyota RAV4 Hybrid combina l\'affidabilità Toyota con la tecnologia ibrida di ultima generazione. Trazione integrale su richiesta, ampio bagagliaio e consumi ridotti. Garanzia inclusa nella versione vendita.',
    badge: 'Offerta',
  },
  {
    id: 'v003',
    slug: 'bmw-serie3-320d-2021',
    name: 'Serie 3 320d',
    brand: 'BMW',
    model: 'Serie 3',
    year: 2021,
    km: 52800,
    fuel: 'diesel',
    transmission: 'automatico',
    category: 'berlina',
    availability: ['noleggio-lungo', 'vendita'],
    pricePerMonth: 650,
    salePrice: 34500,
    images: [
      'https://picsum.photos/seed/bmw3-1/800/450',
      'https://picsum.photos/seed/bmw3-2/800/450',
      'https://picsum.photos/seed/bmw3-3/800/450',
      'https://picsum.photos/seed/bmw3-4/800/450',
    ],
    features: ['BMW Live Cockpit Professional', 'Sedili Riscaldati', 'Parcheggio Automatico', 'Head-Up Display'],
    description:
      'La BMW Serie 3 320d incarna il concetto di berlina premium con piacere di guida. Cambio automatico Steptronic 8 rapporti, consumi nel ciclo combinato di 5.1L/100km. Ideale per chi non vuole rinunciare al dinamismo nel noleggio lungo termine.',
  },
  {
    id: 'v004',
    slug: 'fiat-500-hybrid-2023',
    name: '500 1.0 Hybrid',
    brand: 'Fiat',
    model: '500',
    year: 2023,
    km: 12100,
    fuel: 'ibrido',
    transmission: 'manuale',
    category: 'city-car',
    availability: ['noleggio-breve', 'vendita'],
    pricePerDay: 35,
    salePrice: 14900,
    images: [
      'https://picsum.photos/seed/fiat500-1/800/450',
      'https://picsum.photos/seed/fiat500-2/800/450',
      'https://picsum.photos/seed/fiat500-3/800/450',
      'https://picsum.photos/seed/fiat500-4/800/450',
    ],
    features: ['Apple CarPlay', 'Sensori Parcheggio', 'Frenata Automatica', 'LED Diurni'],
    description:
      'La nuova Fiat 500 Hybrid è la city car per eccellenza. Tecnologia mild-hybrid BSG da 70cv per consumi ridotti in città. Perfetta per il centro storico di Parma, con cerchi in lega e vernice metallizzata.',
    badge: 'Nuovo Arrivo',
  },
  {
    id: 'v005',
    slug: 'mercedes-glc-220d-2022',
    name: 'GLC 220 d',
    brand: 'Mercedes-Benz',
    model: 'GLC',
    year: 2022,
    km: 38700,
    fuel: 'diesel',
    transmission: 'automatico',
    category: 'suv',
    availability: ['noleggio-lungo', 'vendita'],
    pricePerMonth: 890,
    salePrice: 48500,
    images: [
      'https://picsum.photos/seed/glc-1/800/450',
      'https://picsum.photos/seed/glc-2/800/450',
      'https://picsum.photos/seed/glc-3/800/450',
      'https://picsum.photos/seed/glc-4/800/450',
    ],
    features: ['MBUX Multimediale', 'Tetto Panoramico', '4MATIC AWD', 'Sedili Massaggianti'],
    description:
      'Il Mercedes GLC 220d rappresenta il vertice del segmento SUV premium. Interni raffinati con sistema MBUX di ultima generazione, sospensioni a controllo elettronico AIRMATIC e trazione integrale 4MATIC. Per chi vuole il meglio.',
  },
  {
    id: 'v006',
    slug: 'ford-transit-custom-2022',
    name: 'Transit Custom L2',
    brand: 'Ford',
    model: 'Transit Custom',
    year: 2022,
    km: 67200,
    fuel: 'diesel',
    transmission: 'manuale',
    category: 'furgone',
    availability: ['noleggio-breve', 'noleggio-lungo'],
    pricePerDay: 79,
    pricePerMonth: 480,
    images: [
      'https://picsum.photos/seed/transit-1/800/450',
      'https://picsum.photos/seed/transit-2/800/450',
      'https://picsum.photos/seed/transit-3/800/450',
      'https://picsum.photos/seed/transit-4/800/450',
    ],
    features: ['Carico 1.5 Tonn.', 'Volume 8.3 m³', 'SYNC3 Connettivit\u00e0', 'Telecamera 360°'],
    description:
      'Il Ford Transit Custom L2 è il furgone ideale per il trasporto professionale. Volume di carico di 8.3 m³, portata 1.500 kg, motore EcoBlue 2.0L da 130cv. Disponibile per noleggi brevi e mensili con assicurazione inclusa.',
    badge: 'Solo Noleggio',
  },
  {
    id: 'v007',
    slug: 'audi-a3-sportback-2021',
    name: 'A3 Sportback 35 TDI',
    brand: 'Audi',
    model: 'A3 Sportback',
    year: 2021,
    km: 44100,
    fuel: 'diesel',
    transmission: 'automatico',
    category: 'berlina',
    availability: ['noleggio-breve', 'vendita'],
    pricePerDay: 59,
    salePrice: 27800,
    images: [
      'https://picsum.photos/seed/a3-1/800/450',
      'https://picsum.photos/seed/a3-2/800/450',
      'https://picsum.photos/seed/a3-3/800/450',
      'https://picsum.photos/seed/a3-4/800/450',
    ],
    features: ['Virtual Cockpit Plus', 'Matrix LED', 'Lane Assist', 'Adaptive Cruise Control'],
    description:
      'L\'Audi A3 Sportback 35 TDI combina eleganza compatta e dinamismo. Cambio S-tronic 7 rapporti, digital cockpit 12.3", consumi 4.8L/100km nel ciclo combinato. Ideale per chi cerca premium senza eccedere nelle dimensioni.',
    badge: 'Offerta',
  },
  {
    id: 'v008',
    slug: 'jeep-renegade-4xe-2022',
    name: 'Renegade 4xe',
    brand: 'Jeep',
    model: 'Renegade',
    year: 2022,
    km: 23500,
    fuel: 'ibrido',
    transmission: 'automatico',
    category: 'suv',
    availability: ['noleggio-breve', 'noleggio-lungo', 'vendita'],
    pricePerDay: 55,
    pricePerMonth: 490,
    salePrice: 29400,
    images: [
      'https://picsum.photos/seed/renegade-1/800/450',
      'https://picsum.photos/seed/renegade-2/800/450',
      'https://picsum.photos/seed/renegade-3/800/450',
      'https://picsum.photos/seed/renegade-4/800/450',
    ],
    features: ['Plug-in Hybrid', 'Modalit\u00e0 E-AWD', 'Uconnect 10.1"', 'Ricarica in 2h'],
    description:
      'Il Jeep Renegade 4xe è il primo Jeep plug-in hybrid. Motore da 240cv con trazione integrale elettrica. Autonomia full-electric fino a 50km per la città. Incentivi statali applicabili. Disponibile in tutte le modalità.',
  },
  {
    id: 'v009',
    slug: 'renault-clio-15-dci-2023',
    name: 'Clio 1.5 dCi',
    brand: 'Renault',
    model: 'Clio',
    year: 2023,
    km: 8700,
    fuel: 'diesel',
    transmission: 'manuale',
    category: 'city-car',
    availability: ['noleggio-breve'],
    pricePerDay: 32,
    images: [
      'https://picsum.photos/seed/clio-1/800/450',
      'https://picsum.photos/seed/clio-2/800/450',
      'https://picsum.photos/seed/clio-3/800/450',
      'https://picsum.photos/seed/clio-4/800/450',
    ],
    features: ['Android Auto', 'Clima Automatico', 'Frenata Emergenza', 'Allerta Angolo Cieco'],
    description:
      'La Renault Clio 1.5 dCi è la scelta intelligente per chi cerca efficienza senza rinunce. Consumi 4.4L/100km, piccola esternamente ma spaziosa all\'interno. Ideale per chi visita Parma o ha bisogno di un\'auto snella in città.',
    badge: 'Nuovo Arrivo',
  },
  {
    id: 'v010',
    slug: 'skoda-octavia-combi-2020',
    name: 'Octavia Combi 2.0 TDI',
    brand: 'Skoda',
    model: 'Octavia Combi',
    year: 2020,
    km: 71300,
    fuel: 'diesel',
    transmission: 'automatico',
    category: 'berlina',
    availability: ['noleggio-lungo', 'vendita'],
    pricePerMonth: 380,
    salePrice: 19500,
    images: [
      'https://picsum.photos/seed/octavia-1/800/450',
      'https://picsum.photos/seed/octavia-2/800/450',
      'https://picsum.photos/seed/octavia-3/800/450',
      'https://picsum.photos/seed/octavia-4/800/450',
    ],
    features: ['Bagagliaio 640L', 'Virtual Cockpit', 'Sensori Pioggia', 'Fendinebbia LED'],
    description:
      'La Skoda Octavia Combi 2.0 TDI è il riferimento per chi ha bisogno di spazio reale. Bagagliaio da 640L ampliabile a 1.700L, consumi 5.2L/100km. Pratica, affidabile, senza pretese ma senza compromessi. Storico completo disponibile.',
    badge: 'Garanzia+',
  },
  {
    id: 'v011',
    slug: 'tesla-model3-long-range-2022',
    name: 'Model 3 Long Range',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2022,
    km: 31600,
    fuel: 'elettrico',
    transmission: 'automatico',
    category: 'berlina',
    availability: ['noleggio-lungo'],
    pricePerMonth: 780,
    images: [
      'https://picsum.photos/seed/tesla3-1/800/450',
      'https://picsum.photos/seed/tesla3-2/800/450',
      'https://picsum.photos/seed/tesla3-3/800/450',
      'https://picsum.photos/seed/tesla3-4/800/450',
    ],
    features: ['Autonomia 580km', 'Supercharger Network', 'Autopilot', 'Display 15.4"'],
    description:
      'La Tesla Model 3 Long Range ridefinisce il concetto di berlina elettrica. Autonomia reale di 500+ km, ricarica rapida in rete Supercharger, accelerazione 0-100 in 4.4s. Perfetta per chi viaggia spesso o ha esigenze aziendali con rimborso spese.',
    badge: 'Offerta',
  },
  {
    id: 'v012',
    slug: 'volkswagen-t-roc-2021',
    name: 'T-Roc 1.5 TSI',
    brand: 'Volkswagen',
    model: 'T-Roc',
    year: 2021,
    km: 47800,
    fuel: 'benzina',
    transmission: 'automatico',
    category: 'suv',
    availability: ['noleggio-breve', 'vendita'],
    pricePerDay: 58,
    salePrice: 24900,
    images: [
      'https://picsum.photos/seed/troc-1/800/450',
      'https://picsum.photos/seed/troc-2/800/450',
      'https://picsum.photos/seed/troc-3/800/450',
      'https://picsum.photos/seed/troc-4/800/450',
    ],
    features: ['Digital Cockpit', 'App-Connect', 'Lane Assist', 'ACC'],
    description:
      'Il Volkswagen T-Roc 1.5 TSI è il SUV compatto per chi vuole stile e praticità. Cambio DSG 7 rapporti, consumi 6.4L/100km, interni premium con digital cockpit 10.25". Disponibile in versione argento con interni in tessuto bicolore.',
    badge: 'Garanzia+',
  },
]

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug)
}

export function getVehiclesByCategory(category: Vehicle['category']): Vehicle[] {
  return vehicles.filter((v) => v.category === category)
}

export function getVehiclesByAvailability(
  type: Vehicle['availability'][number]
): Vehicle[] {
  return vehicles.filter((v) => v.availability.includes(type))
}

export function getSimilarVehicles(vehicle: Vehicle, limit = 3): Vehicle[] {
  return vehicles
    .filter((v) => v.id !== vehicle.id && v.category === vehicle.category)
    .slice(0, limit)
}

export function getAllSlugs(): string[] {
  return vehicles.map((v) => v.slug)
}
