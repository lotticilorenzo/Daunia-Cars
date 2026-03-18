'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { FilterTabs } from '@/components/ui/FilterTabs'
import { VehicleCard } from '@/components/ui/VehicleCard'
import { MagneticButton } from '@/components/ui/MagneticButton'
import {
  vehicles,
  getVehiclesByAvailability,
  getVehiclesByCategory,
} from '@/data/vehicles'
import type { Vehicle } from '@/types'

const TABS = [
  { id: 'tutti', label: 'Tutti' },
  { id: 'noleggio-breve', label: 'Noleggio' },
  { id: 'vendita', label: 'Vendita' },
  { id: 'suv', label: 'SUV' },
  { id: 'berlina', label: 'Berlina' },
  { id: 'city-car', label: 'City Car' },
] as const

type TabId = (typeof TABS)[number]['id']

export function FleetPreviewSection() {
  const [activeTab, setActiveTab] = useState<TabId>('tutti')

  const filteredVehicles = useMemo((): Vehicle[] => {
    switch (activeTab) {
      case 'tutti':
        return vehicles.slice(0, 6)
      case 'noleggio-breve':
        return getVehiclesByAvailability('noleggio-breve').slice(0, 6)
      case 'vendita':
        return getVehiclesByAvailability('vendita').slice(0, 6)
      case 'suv':
      case 'berlina':
      case 'city-car':
        return getVehiclesByCategory(activeTab as Vehicle['category']).slice(0, 6)
      default:
        return vehicles.slice(0, 6)
    }
  }, [activeTab])

  return (
    <section className={cn('bg-bg py-20 md:py-[120px]')}>
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-mono text-[13px] text-text-muted mb-2">02</p>
            <h2 className="font-display font-bold text-[clamp(2.25rem,5vw,3.5rem)] text-text-primary leading-tight">
              La Nostra Flotta
            </h2>
          </div>
          <Link
            href="/flotta"
            className="font-body font-medium text-[15px] text-chrome hover:text-text-primary transition-colors"
          >
            Vedi tutti i 500+ veicoli →
          </Link>
        </div>

        {/* Filter tabs */}
        <FilterTabs
          tabs={TABS as unknown as { id: string; label: string }[]}
          activeTab={activeTab}
          onChange={(id) => setActiveTab(id as TabId)}
          layoutId="fleet-preview-pill"
        />

        {/* Animated grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          >
            {filteredVehicles.map((vehicle, index) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                priority={index < 3}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <MagneticButton variant="outline" href="/flotta" className="w-fit">
            Vedi tutta la flotta
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
