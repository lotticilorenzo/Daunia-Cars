/**
 * Wishlist helpers — localStorage based.
 * Niente stato globale: ogni componente usa questi helpers + un evento custom
 * per sincronizzarsi con l'header badge.
 */

const KEY = 'dc_wishlist'

export const WISHLIST_CHANGE_EVENT = 'dc:wishlist-change'

export function getWishlist(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]') as string[]
  } catch {
    return []
  }
}

export function isInWishlist(id: string): boolean {
  return getWishlist().includes(id)
}

export function toggleWishlist(id: string): boolean {
  const current = getWishlist()
  let next: string[]
  let added: boolean

  if (current.includes(id)) {
    next = current.filter((i) => i !== id)
    added = false
  } else {
    next = [...current, id]
    added = true
  }

  localStorage.setItem(KEY, JSON.stringify(next))
  window.dispatchEvent(new CustomEvent(WISHLIST_CHANGE_EVENT, { detail: { id, added, count: next.length } }))
  return added
}

export function getWishlistCount(): number {
  return getWishlist().length
}
