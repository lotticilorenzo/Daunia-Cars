'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CaretRight,
  Gauge,
  Calendar,
  Drop,
  GitFork,
  CheckCircle,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr'
import { VehicleCard } from '@/components/ui/VehicleCard'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { VehicleViewer360 } from '@/components/ui/VehicleViewer360'
import { PreventivoButton } from '@/components/ui/PreventivoButton'
import { CtaSection } from '@/components/sections/CtaSection'
import { getSimilarVehicles } from '@/data/vehicles'
import { cn, formatPrice, formatKm } from '@/lib/utils'
import type { Vehicle } from '@/types'

interface VehicleDetailClientProps {
  vehicle: Vehicle
}

// ── helpers ──────────────────────────────────────────

const FUEL_LABELS: Record<Vehicle['fuel'], string> = {
  benzina: 'Benzina',
  diesel: 'Diesel',
  ibrido: 'Ibrido',
  elettrico: 'Elettrico',
  gpl: 'GPL',
}

const CATEGORY_LABELS: Record<Vehicle['category'], string> = {
  'city-car': 'City Car',
  berlina: 'Berlina',
  suv: 'SUV',
  furgone: 'Furgone',
  luxury: 'Luxury',
  monovolume: 'Monovolume',
}

const TRANSMISSION_LABELS: Record<Vehicle['transmission'], string> = {
  manuale: 'Manuale',
  automatico: 'Automatico',
}

const BADGE_COLORS: Record<NonNullable<Vehicle['badge']>, string> = {
  'Nuovo Arrivo': 'bg-accent text-white',
  Offerta: 'bg-yellow-400/90 text-[#0C0C0E]',
  'Solo Noleggio': 'bg-surface-2 text-text-secondary border border-border',
  'Garanzia+': 'bg-surface-2 text-accent border border-accent/30',
}

type TabId = 'caratteristiche' | 'documenti' | 'finanziamento'

const TABS: { id: TabId; label: string }[] = [
  { id: 'caratteristiche', label: 'Caratteristiche' },
  { id: 'documenti', label: 'Documenti' },
  { id: 'finanziamento', label: 'Finanziamento' },
]

const PLACEHOLDER_DOCS = [
  { name: 'Libretto di Circolazione', size: '1.2 MB' },
  { name: 'Certificato di Garanzia', size: '0.8 MB' },
  { name: 'Contratto Tipo', size: '0.5 MB' },
]

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

const tabContentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
}

// ── component ────────────────────────────────────────

export function VehicleDetailClient({ vehicle }: VehicleDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState<TabId>('caratteristiche')

  const similar = getSimilarVehicles(vehicle, 3)

  const thumbnailSeeds = [
    vehicle.slug + '-1',
    vehicle.slug + '-2',
    vehicle.slug + '-3',
  ]

  const galleryImages = [
    vehicle.images[0],
    `https://picsum.photos/seed/${thumbnailSeeds[0]}/800/600`,
    `https://picsum.photos/seed/${thumbnailSeeds[1]}/800/600`,
    `https://picsum.photos/seed/${thumbnailSeeds[2]}/800/600`,
  ]

  const displayPrice =
    vehicle.pricePerDay != null
      ? { label: 'Noleggio breve da', value: formatPrice(vehicle.pricePerDay, true) }
      : vehicle.pricePerMonth != null
        ? { label: 'Noleggio lungo da', value: formatPrice(vehicle.pricePerMonth, false, true) }
        : vehicle.salePrice != null
          ? { label: 'Prezzo di vendita', value: formatPrice(vehicle.salePrice) }
          : null

  const hasNoleggio =
    vehicle.availability.includes('noleggio-breve') ||
    vehicle.availability.includes('noleggio-lungo')

  // Estimate monthly rate for finanziamento tab (simplified: 60 months, ~6%)
  const estimatedRate =
    vehicle.salePrice != null
      ? Math.round((vehicle.salePrice * 1.06) / 60)
      : null

  return (
    <main className="bg-bg min-h-screen">
      {/* ── Breadcrumb ─────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="container-custom pt-28 pb-4"
      >
        <ol className="flex items-center gap-1.5 font-body text-sm text-text-muted flex-wrap">
          <li>
            <Link
              href="/"
              className="hover:text-text-secondary transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <CaretRight size={12} weight="bold" className="text-text-muted" />
          </li>
          <li>
            <Link
              href="/flotta"
              className="hover:text-text-secondary transition-colors duration-200"
            >
              Flotta
            </Link>
          </li>
          <li aria-hidden="true">
            <CaretRight size={12} weight="bold" className="text-text-muted" />
          </li>
          <li className="text-text-primary font-medium" aria-current="page">
            {vehicle.brand} {vehicle.name}
          </li>
        </ol>
      </nav>

      {/* ── Main layout ────────────────────────────────── */}
      <section className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT: Images */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col gap-4"
          >
            {/* Main image */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface border border-border"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={galleryImages[selectedImage]}
                    alt={`${vehicle.brand} ${vehicle.name} — immagine ${selectedImage + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
                    className="object-cover"
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxNicgaGVpZ2h0PSc5JyB2aWV3Qm94PScwIDAgMTYgOSc+PHJlY3Qgd2lkdGg9JzE2JyBoZWlnaHQ9JzknIGZpbGw9JyMzMzMnLz48L3N2Zz4="
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badge overlay */}
              {vehicle.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={cn(
                      'font-display font-bold text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full',
                      BADGE_COLORS[vehicle.badge]
                    )}
                  >
                    {vehicle.badge}
                  </span>
                </div>
              )}
            </motion.div>

            {/* 360° viewer */}
            <VehicleViewer360
              src={galleryImages[0]}
              alt={`${vehicle.brand} ${vehicle.name} — vista 360°`}
            />

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {galleryImages.map((src, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  aria-label={`Visualizza immagine ${index + 1}`}
                  className={cn(
                    'relative flex-none w-20 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200',
                    selectedImage === index
                      ? 'border-accent ring-1 ring-accent/30'
                      : 'border-border hover:border-border/80 opacity-70 hover:opacity-100'
                  )}
                >
                  <Image
                    src={src}
                    alt={`${vehicle.brand} ${vehicle.name} — anteprima ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Details */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="lg:sticky lg:top-8 flex flex-col gap-5">
              {/* Category chip */}
              <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
                {CATEGORY_LABELS[vehicle.category]}
              </span>

              {/* Vehicle name */}
              <div>
                <h1 className="font-display font-extrabold text-3xl text-text-primary leading-tight">
                  {vehicle.brand} {vehicle.name}
                </h1>
                <p className="font-mono text-sm text-text-muted mt-1">
                  {vehicle.year}
                </p>
              </div>

              {/* Price */}
              {displayPrice && (
                <div className="flex flex-col gap-0.5">
                  <span className="font-body text-xs text-text-muted uppercase tracking-wider">
                    {displayPrice.label}
                  </span>
                  <span className="font-mono font-bold text-[2rem] text-accent leading-none">
                    {displayPrice.value}
                  </span>
                </div>
              )}

              {/* Availability badge */}
              <div className="flex flex-wrap gap-2">
                {vehicle.availability.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border font-body text-xs text-text-secondary"
                  >
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"
                    />
                    {type === 'noleggio-breve'
                      ? 'Noleggio Breve'
                      : type === 'noleggio-lungo'
                        ? 'Noleggio Lungo'
                        : 'Vendita'}
                  </span>
                ))}
              </div>

              {/* Key specs 2x2 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface border border-border">
                  <Calendar
                    size={18}
                    weight="duotone"
                    className="text-accent mt-0.5 flex-none"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      Anno
                    </p>
                    <p className="font-body font-semibold text-sm text-text-primary">
                      {vehicle.year}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface border border-border">
                  <Gauge
                    size={18}
                    weight="duotone"
                    className="text-accent mt-0.5 flex-none"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      Chilometri
                    </p>
                    <p className="font-body font-semibold text-sm text-text-primary">
                      {formatKm(vehicle.km)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface border border-border">
                  <Drop
                    size={18}
                    weight="duotone"
                    className="text-accent mt-0.5 flex-none"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      Carburante
                    </p>
                    <p className="font-body font-semibold text-sm text-text-primary">
                      {FUEL_LABELS[vehicle.fuel]}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface border border-border">
                  <GitFork
                    size={18}
                    weight="duotone"
                    className="text-accent mt-0.5 flex-none"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      Cambio
                    </p>
                    <p className="font-body font-semibold text-sm text-text-primary">
                      {TRANSMISSION_LABELS[vehicle.transmission]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="font-body text-[15px] text-text-secondary leading-relaxed">
                {vehicle.description.length > 0
                  ? vehicle.description
                  : `Veicolo ${vehicle.brand} ${vehicle.name} disponibile presso Daunia Cars a Parma. Contattaci per informazioni dettagliate su disponibilità e condizioni.`}
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <MagneticButton
                  href="/contatti"
                  variant="primary"
                  size="md"
                  aria-label={`Richiedi informazioni su ${vehicle.brand} ${vehicle.name}`}
                >
                  Richiedi Info
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </MagneticButton>

                {hasNoleggio && (
                  <MagneticButton
                    href="/noleggio-breve"
                    variant="outline"
                    size="md"
                    aria-label={`Prenota il noleggio di ${vehicle.brand} ${vehicle.name}`}
                  >
                    Prenota Noleggio
                  </MagneticButton>
                )}
              </div>

              {/* PDF Preventivo */}
              <PreventivoButton vehicle={vehicle} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Tabs section ───────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="container-custom py-12"
      >
        {/* Tab bar */}
        <div
          role="tablist"
          aria-label="Dettagli veicolo"
          className="flex border-b border-border gap-6 mb-8"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative pb-3 font-body font-medium text-sm transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm',
                activeTab === tab.id
                  ? 'text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 'caratteristiche' && (
            <motion.div
              key="caratteristiche"
              role="tabpanel"
              id="tabpanel-caratteristiche"
              aria-labelledby="tab-caratteristiche"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Full specs */}
                <div className="flex flex-col gap-3">
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-text-muted">
                    Dati tecnici
                  </h3>
                  <dl className="flex flex-col gap-2.5">
                    {[
                      { label: 'Marca', value: vehicle.brand },
                      { label: 'Modello', value: vehicle.model },
                      { label: 'Anno', value: vehicle.year.toString() },
                      { label: 'Chilometri', value: formatKm(vehicle.km) },
                      { label: 'Carburante', value: FUEL_LABELS[vehicle.fuel] },
                      { label: 'Cambio', value: TRANSMISSION_LABELS[vehicle.transmission] },
                      { label: 'Categoria', value: CATEGORY_LABELS[vehicle.category] },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center py-2 border-b border-border/50 last:border-0"
                      >
                        <dt className="font-body text-xs text-text-muted">{label}</dt>
                        <dd className="font-body text-sm font-medium text-text-primary">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Pricing */}
                <div className="flex flex-col gap-3">
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-text-muted">
                    Prezzi
                  </h3>
                  <dl className="flex flex-col gap-2.5">
                    {vehicle.pricePerDay != null && (
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <dt className="font-body text-xs text-text-muted">Noleggio / giorno</dt>
                        <dd className="font-mono text-sm font-bold text-accent">
                          {formatPrice(vehicle.pricePerDay, true)}
                        </dd>
                      </div>
                    )}
                    {vehicle.pricePerMonth != null && (
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <dt className="font-body text-xs text-text-muted">Noleggio / mese</dt>
                        <dd className="font-mono text-sm font-bold text-accent">
                          {formatPrice(vehicle.pricePerMonth, false, true)}
                        </dd>
                      </div>
                    )}
                    {vehicle.salePrice != null && (
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <dt className="font-body text-xs text-text-muted">Prezzo vendita</dt>
                        <dd className="font-mono text-sm font-bold text-accent">
                          {formatPrice(vehicle.salePrice)}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Optional equipment */}
                {vehicle.features.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display font-bold text-sm uppercase tracking-wider text-text-muted">
                      Dotazioni
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {vehicle.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 font-body text-sm text-text-secondary"
                        >
                          <CheckCircle
                            size={16}
                            weight="fill"
                            className="text-accent flex-none mt-0.5"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'documenti' && (
            <motion.div
              key="documenti"
              role="tabpanel"
              id="tabpanel-documenti"
              aria-labelledby="tab-documenti"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ul className="flex flex-col gap-3 max-w-lg">
                {PLACEHOLDER_DOCS.map((doc) => (
                  <li key={doc.name}>
                    <div
                      className={cn(
                        'flex items-center justify-between gap-4 p-4 rounded-xl',
                        'bg-surface border border-border'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          aria-hidden="true"
                          className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center"
                        >
                          <span className="font-mono text-[10px] font-bold text-text-muted uppercase">
                            PDF
                          </span>
                        </div>
                        <div>
                          <p className="font-body font-medium text-sm text-text-primary">
                            {doc.name}
                          </p>
                          <p className="font-mono text-xs text-text-muted">{doc.size}</p>
                        </div>
                      </div>
                      <span className="font-body text-xs text-text-muted italic">
                        Disponibile in sede
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-body text-sm text-text-muted max-w-lg">
                Tutta la documentazione è verificabile presso la nostra sede di Parma. Contattaci per richiedere copia preventiva prima della visita.
              </p>
            </motion.div>
          )}

          {activeTab === 'finanziamento' && (
            <motion.div
              key="finanziamento"
              role="tabpanel"
              id="tabpanel-finanziamento"
              aria-labelledby="tab-finanziamento"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="max-w-xl flex flex-col gap-6">
                {estimatedRate != null ? (
                  <div className="p-5 rounded-2xl bg-surface border border-border">
                    <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-1">
                      Rata indicativa
                    </p>
                    <p className="font-display font-extrabold text-4xl text-accent leading-none">
                      {formatPrice(estimatedRate, false, true)}
                    </p>
                    <p className="font-body text-xs text-text-muted mt-2">
                      Stima su 60 mesi · TAN indicativo 6% · Salvo approvazione
                    </p>
                  </div>
                ) : (
                  <p className="font-body text-text-secondary">
                    Questo veicolo non è disponibile in vendita, ma può essere noleggiato a lungo termine con canone mensile fisso.
                  </p>
                )}

                <div className="flex flex-col gap-2.5">
                  <p className="font-body text-[15px] text-text-secondary leading-relaxed">
                    Offriamo soluzioni di finanziamento personalizzate tramite i principali istituti bancari partner. Tassi competitivi, pratiche veloci e zero sorprese.
                  </p>
                  <ul className="flex flex-col gap-2 mt-1">
                    {[
                      'Finanziamento fino a 84 mesi',
                      'Anticipo flessibile dal 10%',
                      'Pratiche in 24 ore',
                      'Assicurazione su misura inclusa',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 font-body text-sm text-text-secondary"
                      >
                        <CheckCircle
                          size={16}
                          weight="fill"
                          className="text-accent flex-none mt-0.5"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Link
                    href="/finanziamenti"
                    className="inline-flex items-center gap-2 font-body font-medium text-sm text-accent hover:text-accent-dark transition-colors duration-200"
                    aria-label="Scopri le opzioni di finanziamento"
                  >
                    Scopri tutte le opzioni di finanziamento
                    <ArrowRight size={14} weight="bold" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* ── Similar vehicles ───────────────────────────── */}
      {similar.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="container-custom py-12 border-t border-border"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-2xl text-text-primary">
              Potrebbe interessarti
            </h2>
            <Link
              href="/flotta"
              className="hidden sm:inline-flex items-center gap-1.5 font-body text-sm text-text-secondary hover:text-accent transition-colors duration-200"
              aria-label="Vedi tutta la flotta"
            >
              Vedi tutta la flotta
              <ArrowRight size={14} weight="bold" aria-hidden="true" />
            </Link>
          </div>

          {/* Scrollable on mobile, 3-col on lg */}
          <div className="flex gap-5 overflow-x-auto pb-3 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
            {similar.map((v) => (
              <div key={v.id} className="flex-none w-[280px] lg:w-auto">
                <VehicleCard vehicle={v} />
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ── CTA ────────────────────────────────────────── */}
      <CtaSection />
    </main>
  )
}
