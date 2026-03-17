'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowsHorizontal } from '@phosphor-icons/react'
import { toggleCompare, isInCompare, COMPARE_CHANGE_EVENT } from '@/lib/compare'
import { cn } from '@/lib/utils'

interface CompareButtonProps {
  vehicleId: string
  vehicleName: string
  className?: string
}

export function CompareButton({ vehicleId, vehicleName, className = '' }: CompareButtonProps) {
  const [inCompare, setInCompare] = useState(false)
  const [blocked, setBlocked] = useState(false) // lista piena

  useEffect(() => {
    setInCompare(isInCompare(vehicleId))

    const handler = () => {
      setInCompare(isInCompare(vehicleId))
    }
    window.addEventListener(COMPARE_CHANGE_EVENT, handler)
    return () => window.removeEventListener(COMPARE_CHANGE_EVENT, handler)
  }, [vehicleId])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const added = toggleCompare(vehicleId)

    if (!added && !isInCompare(vehicleId)) {
      // Lista piena — flash feedback
      setBlocked(true)
      setTimeout(() => setBlocked(false), 1200)
      return
    }

    setInCompare(isInCompare(vehicleId))
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.85 }}
      aria-label={
        inCompare
          ? `Rimuovi ${vehicleName} dal confronto`
          : `Aggiungi ${vehicleName} al confronto`
      }
      aria-pressed={inCompare}
      title={
        blocked
          ? 'Puoi confrontare al massimo 2 veicoli'
          : inCompare
            ? `Rimuovi dal confronto`
            : `Aggiungi al confronto`
      }
      className={cn(
        'relative flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200',
        inCompare
          ? 'bg-accent/15 border border-accent/40'
          : blocked
            ? 'bg-yellow-400/10 border border-yellow-400/40'
            : 'bg-surface border border-border hover:border-accent/40',
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={inCompare ? 'active' : blocked ? 'blocked' : 'idle'}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <ArrowsHorizontal
            size={16}
            weight={inCompare ? 'fill' : 'regular'}
            className={
              inCompare
                ? 'text-accent'
                : blocked
                  ? 'text-yellow-400'
                  : 'text-text-muted'
            }
            aria-hidden="true"
          />
        </motion.span>
      </AnimatePresence>

      {/* Active pulse ring */}
      {inCompare && (
        <motion.span
          aria-hidden="true"
          initial={{ scale: 0.5, opacity: 0.6 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-full bg-accent/20 pointer-events-none"
        />
      )}
    </motion.button>
  )
}
