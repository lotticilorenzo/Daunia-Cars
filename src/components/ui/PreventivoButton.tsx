'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FilePdf, CircleNotch } from '@phosphor-icons/react'
import { useToast } from '@/components/ui/Toast'
import { cn } from '@/lib/utils'
import type { Vehicle } from '@/types'

// ─── Types ────────────────────────────────────────────────────────────────────

interface PreventivoButtonProps {
  vehicle: Vehicle
  className?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveServiceLabel(vehicle: Vehicle): string {
  if (vehicle.availability.includes('vendita') && vehicle.salePrice !== undefined) {
    return 'Vendita'
  }
  if (vehicle.availability.includes('noleggio-lungo') && vehicle.pricePerMonth !== undefined) {
    return 'Noleggio Lungo Termine'
  }
  if (vehicle.availability.includes('noleggio-breve') && vehicle.pricePerDay !== undefined) {
    return 'Noleggio Breve Termine'
  }
  return vehicle.availability[0] ?? 'N/D'
}

function resolvePriceLabel(vehicle: Vehicle): string {
  if (vehicle.salePrice !== undefined) return 'Prezzo di vendita'
  if (vehicle.pricePerMonth !== undefined) return 'Canone mensile'
  if (vehicle.pricePerDay !== undefined) return 'Tariffa giornaliera'
  return 'Prezzo'
}

function resolvePriceValue(vehicle: Vehicle): string {
  const fmt = (n: number, suffix: string) =>
    `${new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(n)}${suffix}`

  if (vehicle.salePrice !== undefined) return fmt(vehicle.salePrice, '')
  if (vehicle.pricePerMonth !== undefined) return fmt(vehicle.pricePerMonth, '/mese')
  if (vehicle.pricePerDay !== undefined) return fmt(vehicle.pricePerDay, '/giorno')
  return 'Su richiesta'
}

function todayFormatted(): string {
  return new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PreventivoButton({ vehicle, className }: PreventivoButtonProps) {
  const [loading, setLoading] = useState(false)
  const { success, error } = useToast()

  async function handleDownload() {
    if (loading) return
    setLoading(true)

    try {
      const res = await fetch('/api/preventivo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleName: vehicle.name,
          brand: vehicle.brand,
          model: vehicle.model,
          year: vehicle.year,
          km: vehicle.km,
          priceLabel: resolvePriceLabel(vehicle),
          priceValue: resolvePriceValue(vehicle),
          service: resolveServiceLabel(vehicle),
          clientName: 'Cliente',
          date: todayFormatted(),
        }),
      })

      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(json.error ?? `Errore HTTP ${res.status}`)
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      const safeName = `${vehicle.brand}-${vehicle.model}-preventivo`
        .toLowerCase()
        .replace(/\s+/g, '-')
      anchor.href = url
      anchor.download = `${safeName}.pdf`
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
      URL.revokeObjectURL(url)

      success('Preventivo scaricato con successo!')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Errore sconosciuto'
      error(`Impossibile generare il preventivo: ${message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      whileHover={loading ? {} : { scale: 1.02 }}
      whileTap={loading ? {} : { scale: 0.97 }}
      aria-label={
        loading
          ? 'Generazione preventivo in corso…'
          : `Scarica preventivo PDF per ${vehicle.brand} ${vehicle.model}`
      }
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'px-4 py-2.5 rounded-xl',
        'font-body font-medium text-sm',
        'border border-border bg-surface-2 text-text-secondary',
        'hover:border-accent/50 hover:text-text-primary hover:bg-accent/5',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        className
      )}
    >
      {loading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        >
          <CircleNotch size={16} weight="bold" />
        </motion.span>
      ) : (
        <FilePdf size={16} weight="fill" aria-hidden="true" />
      )}
      {loading ? 'Generazione…' : 'Scarica Preventivo'}
    </motion.button>
  )
}
