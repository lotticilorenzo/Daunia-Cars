'use client'

import { memo, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagneticButton } from './MagneticButton'

const STORAGE_KEY = 'daunia_cookie_consent'

export const CookieBanner = memo(function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) setVisible(true)
    } catch {
      // localStorage non disponibile
    }
  }, [])

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {
      // noop
    }
    setVisible(false)
  }

  function reject() {
    try {
      localStorage.setItem(STORAGE_KEY, 'rejected')
    } catch {
      // noop
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Banner cookie"
          aria-live="polite"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 z-[150] bg-surface/95 backdrop-blur-md border-t border-border px-6 py-4"
        >
          <div className="max-w-container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="font-body text-sm text-text-secondary max-w-[65ch]">
              Utilizziamo cookie tecnici necessari e, con il tuo consenso, cookie analitici
              per migliorare la tua esperienza.{' '}
              <a href="/cookie-policy" className="text-chrome hover:text-text-primary underline">
                Leggi la Cookie Policy
              </a>
              .
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <MagneticButton variant="ghost" size="sm" onClick={reject}>
                Rifiuta
              </MagneticButton>
              <MagneticButton variant="primary" size="sm" onClick={accept}>
                Accetta
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})
