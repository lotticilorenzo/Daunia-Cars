'use client'

import { memo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WhatsappLogo } from '@phosphor-icons/react'

const WA_NUMBER = '+39 0521 000000'
const WA_MESSAGE = encodeURIComponent('Ciao, vorrei informazioni su...')
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`

export const WhatsAppFAB = memo(function WhatsAppFAB() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div
      className="fixed right-4 sm:right-6 z-[90] flex flex-col items-end gap-2"
      style={{ bottom: 'max(1.25rem, calc(env(safe-area-inset-bottom) + 0.75rem))' }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="bg-surface border border-border rounded-full px-3 py-1.5 text-sm font-body text-text-secondary whitespace-nowrap shadow-card"
          >
            Scrivici su WhatsApp
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <div className="relative">
        {/* Pulse ring */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{ scale: [1, 1.5, 1.5], opacity: [0.4, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />

        <motion.a
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Scrivici su WhatsApp"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white"
          style={{ boxShadow: '0 4px 16px rgba(37,211,102,0.4)' }}
        >
          <WhatsappLogo size={28} weight="fill" aria-hidden="true" />
        </motion.a>
      </div>
    </div>
  )
})
