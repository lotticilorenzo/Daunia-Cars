/**
 * Compare helpers — localStorage based, max 2 veicoli.
 * Pattern identico a wishlist.ts per coerenza.
 */

const KEY = 'dc_compare'

export const COMPARE_CHANGE_EVENT = 'dc:compare-change'

const MAX_COMPARE = 2

export function getCompare(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]') as string[]
  } catch {
    return []
  }
}

export function isInCompare(id: string): boolean {
  return getCompare().includes(id)
}

/**
 * Aggiunge o rimuove un veicolo dalla lista di confronto.
 * Se la lista è piena (2 veicoli) e si cerca di aggiungere, non fa nulla e restituisce false.
 * @returns true se aggiunto, false se rimosso o lista piena
 */
export function toggleCompare(id: string): boolean {
  const current = getCompare()
  let next: string[]
  let added: boolean

  if (current.includes(id)) {
    next = current.filter((i) => i !== id)
    added = false
  } else {
    if (current.length >= MAX_COMPARE) {
      // Lista piena — dispatch evento per notificare l'UI
      window.dispatchEvent(
        new CustomEvent(COMPARE_CHANGE_EVENT, {
          detail: { id, added: false, count: current.length, full: true },
        })
      )
      return false
    }
    next = [...current, id]
    added = true
  }

  localStorage.setItem(KEY, JSON.stringify(next))
  window.dispatchEvent(
    new CustomEvent(COMPARE_CHANGE_EVENT, {
      detail: { id, added, count: next.length, full: false },
    })
  )
  return added
}

export function clearCompare(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify([]))
  window.dispatchEvent(
    new CustomEvent(COMPARE_CHANGE_EVENT, {
      detail: { id: null, added: false, count: 0, full: false },
    })
  )
}

export function getCompareCount(): number {
  return getCompare().length
}
