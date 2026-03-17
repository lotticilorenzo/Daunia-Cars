'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from '@phosphor-icons/react'
import { toggleWishlist, isInWishlist } from '@/lib/wishlist'
import { useToast } from '@/components/ui/Toast'

interface WishlistButtonProps {
  vehicleId: string
  vehicleName: string
  className?: string
}

export function WishlistButton({ vehicleId, vehicleName, className = '' }: WishlistButtonProps) {
  const [saved, setSaved] = useState(false)
  const [burst, setBurst] = useState(false)
  const { success, info } = useToast()

  useEffect(() => {
    setSaved(isInWishlist(vehicleId))
  }, [vehicleId])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const added = toggleWishlist(vehicleId)
    setSaved(added)
    setBurst(true)
    setTimeout(() => setBurst(false), 600)

    if (added) {
      success(`${vehicleName} aggiunta ai preferiti`)
    } else {
      info(`${vehicleName} rimossa dai preferiti`)
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.85 }}
      aria-label={saved ? `Rimuovi ${vehicleName} dai preferiti` : `Aggiungi ${vehicleName} ai preferiti`}
      aria-pressed={saved}
      className={`relative flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 ${
        saved
          ? 'bg-accent/15 border border-accent/40'
          : 'bg-surface border border-border hover:border-accent/40'
      } ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={saved ? 'filled' : 'empty'}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <Heart
            size={16}
            weight={saved ? 'fill' : 'regular'}
            className={saved ? 'text-accent' : 'text-text-muted'}
            aria-hidden="true"
          />
        </motion.span>
      </AnimatePresence>

      {/* Burst particles */}
      {burst && saved && (
        <motion.span
          aria-hidden="true"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-full bg-accent/20 pointer-events-none"
        />
      )}
    </motion.button>
  )
}
