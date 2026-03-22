'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Phone, WhatsappLogo, Calendar } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

export function StickyCta() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after 300px scroll
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] md:hidden w-[calc(100%-2.5rem)] max-w-[400px]"
        >
          <div className="flex items-center gap-2 p-2 bg-surface/80 backdrop-blur-xl border border-border rounded-full shadow-2xl">
            {/* Call button */}
            <a
              href="tel:+390521000000"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-2 text-text-primary border border-border hover:bg-surface-3 transition-colors"
              aria-label="Chiamaci"
            >
              <Phone size={22} weight="fill" />
            </a>

            {/* WhatsApp button */}
            <a
              href="https://wa.me/390521000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors"
              aria-label="WhatsApp"
            >
              <WhatsappLogo size={24} weight="fill" />
            </a>

            {/* Main CTA: Booking */}
            <a
              href="/contatti"
              className="flex-1 flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-accent text-white font-body font-semibold text-sm hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20"
            >
              <Calendar size={18} weight="bold" />
              Prenota Ora
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
