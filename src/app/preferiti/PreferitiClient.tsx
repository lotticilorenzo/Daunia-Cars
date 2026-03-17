'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ArrowLeft } from '@phosphor-icons/react'
import { VehicleCard } from '@/components/ui/VehicleCard'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { getWishlist, WISHLIST_CHANGE_EVENT } from '@/lib/wishlist'
import { vehicles } from '@/data/vehicles'
import type { Vehicle } from '@/types'

export function PreferitiClient() {
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSavedIds(getWishlist())

    const onWishlistChange = () => setSavedIds(getWishlist())
    window.addEventListener(WISHLIST_CHANGE_EVENT, onWishlistChange)
    return () => window.removeEventListener(WISHLIST_CHANGE_EVENT, onWishlistChange)
  }, [])

  const savedVehicles: Vehicle[] = vehicles.filter((v) => savedIds.includes(v.id))

  return (
    <main className="bg-bg min-h-screen">
      {/* Header */}
      <section className="container-custom pt-32 pb-12">
        <Link
          href="/flotta"
          className="inline-flex items-center gap-2 font-body text-sm text-text-muted hover:text-accent transition-colors mb-8"
          aria-label="Torna alla flotta"
        >
          <ArrowLeft size={14} weight="bold" aria-hidden="true" />
          Torna alla flotta
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <Heart size={22} weight="fill" className="text-accent" aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] text-text-primary leading-none">
              I tuoi preferiti
            </h1>
            {mounted && (
              <p className="font-mono text-[13px] text-text-muted mt-1">
                {savedVehicles.length === 0
                  ? 'Nessun veicolo salvato'
                  : `${savedVehicles.length} veicol${savedVehicles.length === 1 ? 'o' : 'i'} salvat${savedVehicles.length === 1 ? 'o' : 'i'}`}
              </p>
            )}
          </div>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="container-custom pb-24">
        <AnimatePresence mode="popLayout">
          {!mounted ? null : savedVehicles.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-6 py-24 text-center"
            >
              <div
                aria-hidden="true"
                className="w-20 h-20 rounded-full bg-surface border border-border flex items-center justify-center"
              >
                <Heart size={32} weight="thin" className="text-text-muted" />
              </div>
              <div>
                <p className="font-display font-bold text-2xl text-text-primary mb-2">
                  Nessun preferito ancora
                </p>
                <p className="font-body text-text-secondary max-w-sm">
                  Esplora la flotta e salva i veicoli che ti interessano toccando il cuore sulla card.
                </p>
              </div>
              <MagneticButton href="/flotta" variant="primary">
                Esplora la flotta
              </MagneticButton>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {savedVehicles.map((vehicle, i) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                  >
                    <VehicleCard vehicle={vehicle} priority={i < 3} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  )
}
