import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Unisce classi Tailwind risolvendo conflitti con tailwind-merge.
 * Usare per tutte le classi condizionali — MAI template string raw.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Formatta un prezzo in euro con localizzazione italiana.
 * @example formatPrice(18500)    → "18.500 €"
 * @example formatPrice(89, true) → "89 €/giorno"
 */
export function formatPrice(
  amount: number,
  perDay = false,
  perMonth = false
): string {
  const formatted = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)

  if (perDay) return `${formatted}/giorno`
  if (perMonth) return `${formatted}/mese`
  return formatted
}

/**
 * Formatta i chilometri con separatore migliaia italiano.
 * @example formatKm(87300)  → "87.300 km"
 * @example formatKm(120000) → "120.000 km"
 */
export function formatKm(km: number): string {
  return `${new Intl.NumberFormat('it-IT').format(km)} km`
}

/**
 * Formatta una data in italiano (es. "15 marzo 2024").
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

/**
 * Trunca una stringa a maxLength caratteri aggiungendo "…".
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength).trimEnd()}…`
}

/**
 * Genera uno slug URL-safe da una stringa italiana.
 * @example slugify("Golf 1.5 TSI") → "golf-1-5-tsi"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
