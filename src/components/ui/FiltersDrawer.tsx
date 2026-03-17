'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, SlidersHorizontal, ArrowCounterClockwise } from '@phosphor-icons/react'
import type { FleetFilters } from '@/types'

interface FiltersDrawerProps {
  open: boolean
  onClose: () => void
  filters: FleetFilters
  onChange: (filters: FleetFilters) => void
  resultCount: number
}

const FUEL_OPTIONS = [
  { value: 'benzina', label: 'Benzina' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'ibrido', label: 'Ibrido' },
  { value: 'elettrico', label: 'Elettrico' },
  { value: 'gpl', label: 'GPL' },
] as const

const TRANSMISSION_OPTIONS = [
  { value: 'manuale', label: 'Manuale' },
  { value: 'automatico', label: 'Automatico' },
] as const


const DEFAULT_FILTERS: FleetFilters = {
  category: 'tutti',
  fuel: [],
  transmission: [],
  maxKm: 200000,
  minYear: 2015,
  availability: 'tutti',
}

function ChipGroup<T extends string>({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string
  options: readonly { value: T; label: string }[]
  selected: T[]
  onToggle: (v: T) => void
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map(({ value, label: optLabel }) => {
          const active = selected.includes(value)
          return (
            <button
              key={value}
              type="button"
              onClick={() => onToggle(value)}
              aria-pressed={active}
              className={`px-3 py-1.5 rounded-full font-body text-[13px] border transition-all duration-200 ${
                active
                  ? 'bg-accent/10 border-accent/40 text-accent'
                  : 'bg-transparent border-border text-text-secondary hover:border-accent/30 hover:text-text-primary'
              }`}
            >
              {optLabel}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function FiltersDrawer({
  open,
  onClose,
  filters,
  onChange,
  resultCount,
}: FiltersDrawerProps) {
  // Blocca scroll quando drawer è aperto
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const toggleFuel = (v: typeof FUEL_OPTIONS[number]['value']) => {
    const fuel = filters.fuel ?? []
    onChange({
      ...filters,
      fuel: fuel.includes(v) ? fuel.filter((f) => f !== v) : [...fuel, v],
    })
  }

  const toggleTransmission = (v: typeof TRANSMISSION_OPTIONS[number]['value']) => {
    const transmission = filters.transmission ?? []
    onChange({
      ...filters,
      transmission: transmission.includes(v)
        ? transmission.filter((t) => t !== v)
        : [...transmission, v],
    })
  }

  const reset = () => onChange({ ...DEFAULT_FILTERS })

  const hasActiveFilters =
    (filters.fuel?.length ?? 0) > 0 ||
    (filters.transmission?.length ?? 0) > 0 ||
    (filters.maxKm ?? 200000) < 200000 ||
    (filters.minYear ?? 2015) > 2015

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
            className="fixed top-0 right-0 bottom-0 z-[201] w-full max-w-[420px] bg-surface border-l border-border flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Filtri avanzati"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal size={18} weight="bold" className="text-accent" aria-hidden="true" />
                <span className="font-display font-bold text-lg text-text-primary">
                  Filtri avanzati
                </span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-accent flex-none" aria-label="Filtri attivi" />
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Chiudi filtri"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-text-secondary hover:text-text-primary hover:border-accent/40 transition-colors"
              >
                <X size={16} weight="bold" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-8">

              {/* Carburante */}
              <ChipGroup
                label="Carburante"
                options={FUEL_OPTIONS}
                selected={filters.fuel ?? []}
                onToggle={toggleFuel}
              />

              {/* Cambio */}
              <ChipGroup
                label="Cambio"
                options={TRANSMISSION_OPTIONS}
                selected={filters.transmission ?? []}
                onToggle={toggleTransmission}
              />

              {/* Km massimi */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                    Km massimi
                  </p>
                  <span className="font-mono text-[12px] text-accent">
                    {(filters.maxKm ?? 200000).toLocaleString('it-IT')} km
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200000}
                  step={5000}
                  value={filters.maxKm ?? 200000}
                  onChange={(e) => onChange({ ...filters, maxKm: Number(e.target.value) })}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-border accent-accent"
                  aria-label="Chilometri massimi"
                />
                <div className="flex justify-between font-mono text-[10px] text-text-muted">
                  <span>0 km</span>
                  <span>200.000 km</span>
                </div>
              </div>

              {/* Anno minimo */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                    Anno minimo
                  </p>
                  <span className="font-mono text-[12px] text-accent">
                    {filters.minYear ?? 2015}
                  </span>
                </div>
                <input
                  type="range"
                  min={2010}
                  max={2025}
                  step={1}
                  value={filters.minYear ?? 2015}
                  onChange={(e) => onChange({ ...filters, minYear: Number(e.target.value) })}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-border accent-accent"
                  aria-label="Anno minimo del veicolo"
                />
                <div className="flex justify-between font-mono text-[10px] text-text-muted">
                  <span>2010</span>
                  <span>2025</span>
                </div>
              </div>

              {/* Reset */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={reset}
                  className="flex items-center gap-2 font-body text-[13px] text-text-muted hover:text-accent transition-colors self-start"
                >
                  <ArrowCounterClockwise size={14} weight="bold" aria-hidden="true" />
                  Azzera filtri
                </button>
              )}
            </div>

            {/* Footer con contatore risultati */}
            <div className="px-6 py-5 border-t border-border">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3.5 bg-accent hover:bg-accent-dark text-white font-body font-semibold rounded-card transition-colors text-[15px]"
              >
                Mostra {resultCount} veicol{resultCount === 1 ? 'o' : 'i'}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
