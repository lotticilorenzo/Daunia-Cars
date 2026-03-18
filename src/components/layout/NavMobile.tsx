'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CalendarBlank, CalendarCheck, Car, ArrowsLeftRight, CurrencyEur } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { MagneticButton } from '@/components/ui/MagneticButton'

interface NavMobileProps {
  isOpen: boolean
  onClose: () => void
}

const NAV_ITEMS = [
  { label: 'Flotta', href: '/flotta' },
  { label: 'Noleggio Breve', href: '/noleggio-breve', icon: CalendarBlank },
  { label: 'Noleggio Lungo', href: '/noleggio-lungo', icon: CalendarCheck },
  { label: 'Vendita', href: '/vendita', icon: Car },
  { label: 'Permuta', href: '/permuta', icon: ArrowsLeftRight },
  { label: 'Finanziamenti', href: '/finanziamenti', icon: CurrencyEur },
  { label: 'Chi Siamo', href: '/chi-siamo' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contatti', href: '/contatti' },
  { label: 'Lavora con Noi', href: '/lavora-con-noi' },
]

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const itemVariant = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
}

export function NavMobile({ isOpen, onClose }: NavMobileProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] bg-bg/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu di navigazione"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-[120] w-[320px] max-w-full bg-surface border-l border-border flex flex-col"
          >
            {/* Header drawer */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <span className="font-display font-extrabold text-lg text-text-primary">
                DAUNIA CARS
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Chiudi menu"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-text-secondary hover:text-text-primary transition-colors"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Links */}
            <motion.nav
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1"
            >
              {NAV_ITEMS.map((item) => (
                <motion.div key={item.href} variants={itemVariant}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl',
                      'font-body font-medium text-base text-text-secondary',
                      'hover:bg-surface-2 hover:text-text-primary transition-colors duration-150'
                    )}
                  >
                    {item.icon && (
                      <span className="text-accent shrink-0">
                        <item.icon size={18} weight="regular" aria-hidden="true" />
                      </span>
                    )}
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* CTA bottom */}
            <div className="px-4 py-4 border-t border-border">
              <MagneticButton
                variant="primary"
                size="lg"
                href="/contatti"
                className="w-full justify-center"
              >
                Prenota un Appuntamento
              </MagneticButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
