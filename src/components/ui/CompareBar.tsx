'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowsHorizontal, Trash } from '@phosphor-icons/react'
import { getCompare, clearCompare, COMPARE_CHANGE_EVENT } from '@/lib/compare'
import { vehicles } from '@/data/vehicles'
import type { Vehicle } from '@/types'

const slideUp = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 260, damping: 28 },
  },
  exit: {
    y: '110%',
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeIn' as const },
  },
}

function getVehiclesFromIds(ids: string[]): Vehicle[] {
  return ids
    .map((id) => vehicles.find((v) => v.id === id))
    .filter((v): v is Vehicle => v !== undefined)
}

export function CompareBar() {
  const [compareIds, setCompareIds] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    // Initial sync
    setCompareIds(getCompare())

    const handler = () => {
      setCompareIds(getCompare())
    }

    window.addEventListener(COMPARE_CHANGE_EVENT, handler)
    return () => window.removeEventListener(COMPARE_CHANGE_EVENT, handler)
  }, [])

  const compareVehicles = getVehiclesFromIds(compareIds)
  const canCompare = compareIds.length >= 2

  const handleClear = () => {
    clearCompare()
  }

  const handleCompare = () => {
    if (canCompare) {
      router.push('/confronto')
    }
  }

  return (
    <AnimatePresence>
      {compareIds.length > 0 && (
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="region"
          aria-label="Confronto veicoli"
          className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
        >
          <div className="pointer-events-auto mx-auto max-w-2xl mb-4 px-4 sm:px-0">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface border border-border shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-sm">
              {/* Icon */}
              <div
                aria-hidden="true"
                className="flex-none w-9 h-9 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center"
              >
                <ArrowsHorizontal size={16} weight="bold" className="text-accent" />
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {compareVehicles.map((v) => (
                  <div
                    key={v.id}
                    className="flex items-center gap-2 min-w-0"
                  >
                    <div className="relative flex-none w-14 h-10 rounded-lg overflow-hidden border border-border bg-surface-2">
                      <Image
                        src={v.images[0]}
                        alt={`${v.brand} ${v.name}`}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <span className="hidden sm:block font-body text-xs font-medium text-text-secondary truncate max-w-[100px]">
                      {v.brand} {v.name}
                    </span>
                  </div>
                ))}

                {/* Placeholder slot if only 1 vehicle */}
                {compareIds.length === 1 && (
                  <div
                    aria-hidden="true"
                    className="flex-none w-14 h-10 rounded-lg border border-dashed border-border bg-surface-2 flex items-center justify-center"
                  >
                    <span className="font-mono text-[10px] text-text-muted">+1</span>
                  </div>
                )}

                {compareIds.length === 1 && (
                  <span className="hidden sm:block font-body text-xs text-text-muted">
                    Aggiungi un secondo veicolo
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-none">
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Svuota confronto"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-body text-xs text-text-muted hover:text-text-secondary border border-transparent hover:border-border transition-colors duration-200"
                >
                  <Trash size={13} weight="regular" aria-hidden="true" />
                  <span className="hidden sm:inline">Svuota</span>
                </button>

                <button
                  type="button"
                  onClick={handleCompare}
                  disabled={!canCompare}
                  aria-label={
                    canCompare
                      ? 'Confronta i veicoli selezionati'
                      : 'Seleziona almeno 2 veicoli per confrontarli'
                  }
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-body text-xs font-semibold transition-all duration-200 ${
                    canCompare
                      ? 'bg-accent text-white hover:bg-accent-dark'
                      : 'bg-surface-2 text-text-muted border border-border cursor-not-allowed'
                  }`}
                >
                  <ArrowsHorizontal size={13} weight="bold" aria-hidden="true" />
                  Confronta ora
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
