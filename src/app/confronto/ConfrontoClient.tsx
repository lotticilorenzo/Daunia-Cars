'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowsHorizontal,
  ArrowRight,
  CaretLeft,
  CheckCircle,
  XCircle,
} from '@phosphor-icons/react'
import { VehicleCard } from '@/components/ui/VehicleCard'
import { getCompare, clearCompare, COMPARE_CHANGE_EVENT } from '@/lib/compare'
import { vehicles, getSimilarVehicles } from '@/data/vehicles'
import { cn, formatPrice, formatKm } from '@/lib/utils'
import type { Vehicle } from '@/types'

// ─── helpers ────────────────────────────────────────────────────────────────

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

const AVAILABILITY_LABELS: Record<Vehicle['availability'][number], string> = {
  'noleggio-breve': 'Noleggio Breve',
  'noleggio-lungo': 'Noleggio Lungo',
  vendita: 'Vendita',
}

function getVehiclesFromIds(ids: string[]): Vehicle[] {
  return ids
    .map((id) => vehicles.find((v) => v.id === id))
    .filter((v): v is Vehicle => v !== undefined)
}

// ─── comparison row ─────────────────────────────────────────────────────────

interface CompareRowProps {
  label: string
  leftValue: string
  rightValue: string
  /** true = leftValue is the "winner" (accent color), false = rightValue wins, null = tie/no comparison */
  leftWins: boolean | null
  index: number
}

function CompareRow({ label, leftValue, rightValue, leftWins, index }: CompareRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-3.5 border-b border-border/50 last:border-0"
    >
      {/* Left value */}
      <div className="flex justify-end">
        <span
          className={cn(
            'font-body text-sm font-medium text-right',
            leftWins === true
              ? 'text-accent'
              : leftWins === false
                ? 'text-text-secondary'
                : 'text-text-primary'
          )}
        >
          {leftValue}
        </span>
      </div>

      {/* Center label */}
      <div className="flex flex-col items-center gap-0.5 min-w-[90px] sm:min-w-[120px]">
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted text-center">
          {label}
        </span>
        {leftWins !== null && (
          <div className="flex items-center gap-1">
            {leftWins ? (
              <>
                <span className="font-mono text-[9px] text-accent">◀</span>
                <span className="font-mono text-[9px] text-text-muted">meglio</span>
              </>
            ) : (
              <>
                <span className="font-mono text-[9px] text-text-muted">meglio</span>
                <span className="font-mono text-[9px] text-accent">▶</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Right value */}
      <div className="flex justify-start">
        <span
          className={cn(
            'font-body text-sm font-medium text-left',
            leftWins === false
              ? 'text-accent'
              : leftWins === true
                ? 'text-text-secondary'
                : 'text-text-primary'
          )}
        >
          {rightValue}
        </span>
      </div>
    </motion.div>
  )
}

// ─── vehicle column header ───────────────────────────────────────────────────

interface VehicleColumnProps {
  vehicle: Vehicle
  side: 'left' | 'right'
}

function VehicleColumn({ vehicle, side }: VehicleColumnProps) {
  const displayPrice =
    vehicle.pricePerDay != null
      ? { label: 'da', value: formatPrice(vehicle.pricePerDay, true) }
      : vehicle.pricePerMonth != null
        ? { label: 'da', value: formatPrice(vehicle.pricePerMonth, false, true) }
        : vehicle.salePrice != null
          ? { label: '', value: formatPrice(vehicle.salePrice) }
          : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
        delay: side === 'left' ? 0 : 0.1,
      }}
      className="flex flex-col gap-4"
    >
      {/* Vehicle image */}
      <Link
        href={`/flotta/${vehicle.slug}`}
        aria-label={`Vai alla scheda ${vehicle.brand} ${vehicle.name}`}
        className="block group"
      >
        <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-surface group-hover:border-accent/40 transition-colors duration-200">
          <Image
            src={vehicle.images[0]}
            alt={`${vehicle.brand} ${vehicle.name}`}
            fill
            sizes="(max-width: 768px) 90vw, 40vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>
      </Link>

      {/* Brand + name */}
      <div className={cn('flex flex-col gap-1', side === 'right' && 'items-end sm:items-start')}>
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
          {vehicle.brand}
        </span>
        <h2 className="font-display font-extrabold text-h3 text-text-primary leading-tight">
          {vehicle.name}
        </h2>
        {displayPrice && (
          <p className="font-mono font-bold text-xl text-accent">
            {displayPrice.label && (
              <span className="font-body font-normal text-xs text-text-muted mr-1">
                {displayPrice.label}
              </span>
            )}
            {displayPrice.value}
          </p>
        )}
      </div>

      {/* CTA */}
      <Link
        href="/contatti"
        aria-label={`Richiedi info su ${vehicle.brand} ${vehicle.name}`}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white font-body font-semibold text-sm hover:bg-accent-dark transition-colors duration-200 w-fit"
      >
        Richiedi Info
        <ArrowRight size={14} weight="bold" aria-hidden="true" />
      </Link>
    </motion.div>
  )
}

// ─── empty / instruction state ───────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center gap-6 py-24 text-center"
    >
      <div
        aria-hidden="true"
        className="w-20 h-20 rounded-full bg-surface-2 border border-border flex items-center justify-center"
      >
        <ArrowsHorizontal size={32} weight="thin" className="text-text-muted" />
      </div>
      <div className="flex flex-col gap-2 max-w-md">
        <h2 className="font-display font-bold text-h2 text-text-primary">
          Nessun veicolo da confrontare
        </h2>
        <p className="font-body text-text-secondary leading-relaxed">
          Aggiungi almeno 2 veicoli dalla flotta per confrontarli fianco a fianco. Usa il
          pulsante{' '}
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface border border-border text-xs font-mono">
            <ArrowsHorizontal size={10} aria-hidden="true" />
            Confronta
          </span>{' '}
          su ogni scheda.
        </p>
      </div>
      <Link
        href="/flotta"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-body font-semibold text-sm hover:bg-accent-dark transition-colors duration-200"
        aria-label="Vai alla flotta per selezionare i veicoli da confrontare"
      >
        <CaretLeft size={14} weight="bold" aria-hidden="true" />
        Vai alla Flotta
      </Link>
    </motion.div>
  )
}

// ─── main component ──────────────────────────────────────────────────────────

export function ConfrontoClient() {
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCompareIds(getCompare())

    const handler = () => setCompareIds(getCompare())
    window.addEventListener(COMPARE_CHANGE_EVENT, handler)
    return () => window.removeEventListener(COMPARE_CHANGE_EVENT, handler)
  }, [])

  const compareVehicles = getVehiclesFromIds(compareIds)
  const [left, right] = compareVehicles
  const hasTwo = compareVehicles.length >= 2

  // Suggestions: similar to left vehicle (if available)
  const suggestions =
    left != null ? getSimilarVehicles(left, 3).filter((v) => v.id !== right?.id) : []

  // ── comparison data ──────────────────────────────────────────────────────
  type CompareRowDef = {
    label: string
    leftRaw: string
    rightRaw: string
    leftWins: boolean | null
  }

  const rows: CompareRowDef[] = hasTwo
    ? [
        {
          label: 'Prezzo',
          leftRaw:
            left.salePrice != null
              ? formatPrice(left.salePrice)
              : left.pricePerDay != null
                ? formatPrice(left.pricePerDay, true)
                : left.pricePerMonth != null
                  ? formatPrice(left.pricePerMonth, false, true)
                  : '—',
          rightRaw:
            right.salePrice != null
              ? formatPrice(right.salePrice)
              : right.pricePerDay != null
                ? formatPrice(right.pricePerDay, true)
                : right.pricePerMonth != null
                  ? formatPrice(right.pricePerMonth, false, true)
                  : '—',
          leftWins: (() => {
            const lp = left.salePrice ?? left.pricePerMonth ?? left.pricePerDay ?? null
            const rp = right.salePrice ?? right.pricePerMonth ?? right.pricePerDay ?? null
            if (lp == null || rp == null) return null
            if (lp === rp) return null
            return lp < rp // lower price = winner
          })(),
        },
        {
          label: 'Anno',
          leftRaw: left.year.toString(),
          rightRaw: right.year.toString(),
          leftWins:
            left.year === right.year ? null : left.year > right.year,
        },
        {
          label: 'Chilometri',
          leftRaw: formatKm(left.km),
          rightRaw: formatKm(right.km),
          leftWins: left.km === right.km ? null : left.km < right.km,
        },
        {
          label: 'Carburante',
          leftRaw: FUEL_LABELS[left.fuel],
          rightRaw: FUEL_LABELS[right.fuel],
          leftWins: null,
        },
        {
          label: 'Cambio',
          leftRaw: TRANSMISSION_LABELS[left.transmission],
          rightRaw: TRANSMISSION_LABELS[right.transmission],
          leftWins: null,
        },
        {
          label: 'Categoria',
          leftRaw: CATEGORY_LABELS[left.category],
          rightRaw: CATEGORY_LABELS[right.category],
          leftWins: null,
        },
        {
          label: 'Disponibile per',
          leftRaw: left.availability.map((a) => AVAILABILITY_LABELS[a]).join(', '),
          rightRaw: right.availability.map((a) => AVAILABILITY_LABELS[a]).join(', '),
          leftWins: (() => {
            if (left.availability.length === right.availability.length) return null
            return left.availability.length > right.availability.length
          })(),
        },
      ]
    : []

  // Don't render anything on server to avoid hydration mismatch with localStorage
  if (!mounted) {
    return (
      <main className="bg-bg min-h-screen">
        <div className="container-custom pt-28 pb-20">
          <div className="h-96 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-bg min-h-screen">
      {/* ── Header ─────────────────────────────────────── */}
      <div className="container-custom pt-28 pb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <Link
              href="/flotta"
              className="inline-flex items-center gap-1.5 font-body text-sm text-text-muted hover:text-text-secondary transition-colors duration-200 mb-3"
              aria-label="Torna alla flotta"
            >
              <CaretLeft size={13} weight="bold" aria-hidden="true" />
              Flotta
            </Link>
            <h1 className="font-display font-extrabold text-h1 text-text-primary">
              Confronto Veicoli
            </h1>
          </div>

          {hasTwo && (
            <button
              type="button"
              onClick={clearCompare}
              aria-label="Svuota confronto e ricomincia"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border font-body text-sm text-text-muted hover:text-text-secondary hover:border-border/80 transition-colors duration-200"
            >
              <XCircle size={14} weight="regular" aria-hidden="true" />
              Svuota
            </button>
          )}
        </div>
      </div>

      <div className="container-custom pb-20">
        {/* ── Empty state ────────────────────────────────── */}
        {!hasTwo && <EmptyState />}

        {/* ── Comparison layout ──────────────────────────── */}
        {hasTwo && (
          <>
            {/* Vehicle headers — 2 cols with divider */}
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-2">
            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 sm:gap-6 items-start mb-10 min-w-[480px]">
              <VehicleColumn vehicle={left} side="left" />

              {/* Center "vs" divider */}
              <div
                aria-hidden="true"
                className="flex flex-col items-center gap-3 pt-6 self-stretch"
              >
                <div className="w-px flex-1 bg-border" />
                <div className="flex-none w-10 h-10 rounded-full bg-surface-2 border border-border flex items-center justify-center">
                  <span className="font-display font-extrabold text-sm text-text-muted">
                    VS
                  </span>
                </div>
                <div className="w-px flex-1 bg-border" />
              </div>

              <VehicleColumn vehicle={right} side="right" />
            </div>
            </div>

            {/* Comparison rows */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              aria-label="Tabella confronto caratteristiche"
              className="rounded-2xl bg-surface border border-border p-6 mb-14"
            >
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-text-muted mb-4">
                Confronto caratteristiche
              </h3>

              {/* Column labels */}
              <div className="grid grid-cols-[1fr_auto_1fr] gap-4 mb-2 pb-2 border-b border-border">
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent text-right">
                  {left.brand} {left.name}
                </p>
                <p className="min-w-[90px] sm:min-w-[120px]" />
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent text-left">
                  {right.brand} {right.name}
                </p>
              </div>

              {rows.map((row, i) => (
                <CompareRow
                  key={row.label}
                  label={row.label}
                  leftValue={row.leftRaw}
                  rightValue={row.rightRaw}
                  leftWins={row.leftWins}
                  index={i}
                />
              ))}

              {/* Features comparison */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: rows.length * 0.05, ease: 'easeOut' }}
                className="mt-6 pt-5 border-t border-border"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-4 text-center">
                  Dotazioni incluse
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {/* Left features */}
                  <ul className="flex flex-col gap-2">
                    {left.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 justify-end">
                        <span className="font-body text-xs text-text-secondary text-right">
                          {f}
                        </span>
                        <CheckCircle
                          size={14}
                          weight="fill"
                          className="text-accent flex-none mt-0.5"
                          aria-hidden="true"
                        />
                      </li>
                    ))}
                  </ul>

                  {/* Right features */}
                  <ul className="flex flex-col gap-2">
                    {right.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle
                          size={14}
                          weight="fill"
                          className="text-accent flex-none mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="font-body text-xs text-text-secondary">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.section>

            {/* Similar vehicles suggestions */}
            {suggestions.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                aria-label="Veicoli simili suggeriti"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-bold text-h3 text-text-primary">
                    Potrebbe interessarti anche
                  </h3>
                  <Link
                    href="/flotta"
                    className="hidden sm:inline-flex items-center gap-1.5 font-body text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                    aria-label="Vedi tutta la flotta"
                  >
                    Vedi tutta la flotta
                    <ArrowRight size={14} weight="bold" aria-hidden="true" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {suggestions.map((v) => (
                    <VehicleCard key={v.id} vehicle={v} />
                  ))}
                </div>
              </motion.section>
            )}
          </>
        )}
      </div>
    </main>
  )
}
