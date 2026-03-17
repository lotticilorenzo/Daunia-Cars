'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal } from '@phosphor-icons/react'
import { VehicleCard } from '@/components/ui/VehicleCard'
import { FilterTabs } from '@/components/ui/FilterTabs'
import { FiltersDrawer } from '@/components/ui/FiltersDrawer'
import { CtaSection } from '@/components/sections/CtaSection'
import { vehicles } from '@/data/vehicles'
import { cn } from '@/lib/utils'
import type { Vehicle, FleetFilters } from '@/types'

type FilterId = 'tutti' | 'noleggio-breve' | 'noleggio-lungo' | 'vendita'

const FILTER_TABS: { id: FilterId; label: string }[] = [
  { id: 'tutti', label: 'Tutti' },
  { id: 'noleggio-breve', label: 'Noleggio Breve' },
  { id: 'noleggio-lungo', label: 'Noleggio Lungo' },
  { id: 'vendita', label: 'Vendita' },
]

const DEFAULT_ADVANCED: FleetFilters = {
  category: 'tutti',
  fuel: [],
  transmission: [],
  maxKm: 200000,
  minYear: 2015,
  availability: 'tutti',
}

const TOTAL = vehicles.length

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

function applyAdvancedFilters(list: Vehicle[], filters: FleetFilters): Vehicle[] {
  return list.filter((v) => {
    if (filters.fuel && filters.fuel.length > 0 && !filters.fuel.includes(v.fuel)) return false
    if (filters.transmission && filters.transmission.length > 0 && !filters.transmission.includes(v.transmission)) return false
    if (filters.maxKm !== undefined && v.km > filters.maxKm) return false
    if (filters.minYear !== undefined && v.year < filters.minYear) return false
    return true
  })
}

export function FlottaClient() {
  const [activeFilter, setActiveFilter] = useState<FilterId>('tutti')
  const [advancedFilters, setAdvancedFilters] = useState<FleetFilters>(DEFAULT_ADVANCED)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const hasAdvancedFilters =
    (advancedFilters.fuel?.length ?? 0) > 0 ||
    (advancedFilters.transmission?.length ?? 0) > 0 ||
    (advancedFilters.maxKm ?? 200000) < 200000 ||
    (advancedFilters.minYear ?? 2015) > 2015

  const filtered = useMemo(() => {
    const byAvailability =
      activeFilter === 'tutti'
        ? vehicles
        : vehicles.filter((v) => v.availability.includes(activeFilter))
    return applyAdvancedFilters(byAvailability, advancedFilters)
  }, [activeFilter, advancedFilters])

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative bg-bg pt-32 pb-16 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start gap-4 max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2 border border-border font-mono text-[12px] text-text-secondary uppercase tracking-widest">
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
              {TOTAL} veicoli disponibili
            </span>

            <h1 className="font-display font-extrabold text-[clamp(2.5rem,7vw,5rem)] text-text-primary leading-none tracking-tight">
              La nostra flotta
            </h1>

            <p className="font-body text-[18px] text-text-secondary leading-relaxed">
              Noleggio breve, noleggio lungo termine e vendita garantita.
              Trova il veicolo su misura per le tue esigenze a Parma.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Filters + Grid ───────────────────────────────── */}
      <section className="bg-bg pb-24">
        <div className="container-custom">
          {/* Toolbar: tabs + filtri avanzati + count */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
          >
            <FilterTabs
              tabs={FILTER_TABS}
              activeTab={activeFilter}
              onChange={(id) => setActiveFilter(id as FilterId)}
              layoutId="flotta-filter-pill"
            />

            <div className="flex items-center gap-3">
              {/* Contatore risultati */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={filtered.length}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="font-mono text-[13px] text-text-muted tabular-nums"
                >
                  {filtered.length} {filtered.length === 1 ? 'veicolo' : 'veicoli'}
                </motion.span>
              </AnimatePresence>

              {/* Bottone filtri avanzati */}
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Apri filtri avanzati"
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-full border font-body text-[13px] transition-all duration-200',
                  hasAdvancedFilters
                    ? 'border-accent/40 bg-accent/10 text-accent'
                    : 'border-border text-text-secondary hover:border-accent/30 hover:text-text-primary'
                )}
              >
                <SlidersHorizontal size={14} weight="bold" aria-hidden="true" />
                Filtri
                {hasAdvancedFilters && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-none" aria-hidden="true" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={`${activeFilter}-${JSON.stringify(advancedFilters)}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    variants={itemVariants}
                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                  >
                    <VehicleCard vehicle={vehicle} priority={index < 3} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-32 gap-4 text-center"
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    'w-16 h-16 rounded-full bg-surface-2 border border-border',
                    'flex items-center justify-center text-3xl'
                  )}
                >
                  🚗
                </div>
                <p className="font-display font-bold text-2xl text-text-primary">
                  Nessun veicolo trovato
                </p>
                <p className="font-body text-text-secondary max-w-xs">
                  Prova a modificare i filtri o contattaci per disponibilità personalizzate.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter('tutti')
                    setAdvancedFilters(DEFAULT_ADVANCED)
                  }}
                  className="mt-2 font-body font-medium text-sm text-accent hover:text-accent-dark transition-colors duration-200 underline underline-offset-4"
                >
                  Azzera tutti i filtri
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Filtri avanzati drawer */}
      <FiltersDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={advancedFilters}
        onChange={setAdvancedFilters}
        resultCount={filtered.length}
      />

      <CtaSection />
    </main>
  )
}
