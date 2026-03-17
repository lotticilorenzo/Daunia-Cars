'use client'

import { memo, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarBlank,
  CalendarCheck,
  Car,
  ArrowsLeftRight,
  CurrencyEur,
  CaretDown,
  List,
  Heart,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { NavMobile } from './NavMobile'
import { getWishlistCount, WISHLIST_CHANGE_EVENT } from '@/lib/wishlist'

const NAV_LINKS = [
  { label: 'Flotta', href: '/flotta' },
  {
    label: 'Servizi',
    href: '#',
    children: [
      {
        label: 'Noleggio Breve',
        href: '/noleggio-breve',
        icon: CalendarBlank,
        desc: 'Da 1 a 30 giorni, assicurazione inclusa',
      },
      {
        label: 'Noleggio Lungo',
        href: '/noleggio-lungo',
        icon: CalendarCheck,
        desc: 'Da 12 a 48 mesi, canone all-inclusive',
      },
      {
        label: 'Vendita',
        href: '/vendita',
        icon: Car,
        desc: 'Auto usate garantite e revisionate',
      },
      {
        label: 'Permuta',
        href: '/permuta',
        icon: ArrowsLeftRight,
        desc: 'Valutazione gratuita in 24 ore',
      },
      {
        label: 'Finanziamenti',
        href: '/finanziamenti',
        icon: CurrencyEur,
        desc: 'Tasso fisso, leasing e balloon',
      },
    ],
  },
  { label: 'Chi Siamo', href: '/chi-siamo' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contatti', href: '/contatti' },
]

export const Header = memo(function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [wishlistCount, setWishlistCount] = useState(0)
  const pathname = usePathname()
  const megaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setWishlistCount(getWishlistCount())
    const onWishlistChange = () => setWishlistCount(getWishlistCount())
    window.addEventListener(WISHLIST_CHANGE_EVENT, onWishlistChange)
    return () => window.removeEventListener(WISHLIST_CHANGE_EVENT, onWishlistChange)
  }, [])

  // Chiudi mega menu al cambio pagina
  useEffect(() => {
    setMegaOpen(false)
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 pt-4">
        <motion.nav
          animate={
            scrolled
              ? {
                  backgroundColor: 'rgba(12, 12, 14, 0.85)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  borderColor: 'rgba(42, 42, 48, 0.8)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                }
              : {
                  backgroundColor: 'transparent',
                  backdropFilter: 'none',
                  borderColor: 'rgba(255,255,255,0.05)',
                  boxShadow: 'none',
                }
          }
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative flex items-center justify-between gap-8 px-6 py-3 rounded-full border w-full max-w-[1100px]"
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-extrabold text-xl tracking-tight text-text-primary hover:text-accent transition-colors duration-200 shrink-0"
            aria-label="Daunia Cars — torna alla homepage"
          >
            DAUNIA CARS
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative" ref={megaRef}>
                  <button
                    type="button"
                    onClick={() => setMegaOpen((p) => !p)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setMegaOpen((p) => !p) }
                      if (e.key === 'Escape') setMegaOpen(false)
                    }}
                    aria-haspopup="true"
                    aria-expanded={megaOpen}
                    className={cn(
                      'flex items-center gap-1 font-body font-medium text-sm',
                      'transition-colors duration-200',
                      megaOpen ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                    )}
                  >
                    {link.label}
                    <motion.span
                      animate={{ rotate: megaOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CaretDown size={14} weight="bold" aria-hidden="true" />
                    </motion.span>
                  </button>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'font-body font-medium text-sm transition-colors duration-200',
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'text-accent border-b border-accent pb-px'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA + Wishlist + Hamburger */}
          <div className="flex items-center gap-3">
            {/* Wishlist badge */}
            <Link
              href="/preferiti"
              aria-label={`Preferiti${wishlistCount > 0 ? ` (${wishlistCount})` : ''}`}
              className="relative flex items-center justify-center w-11 h-11 rounded-full border border-border text-text-secondary hover:text-accent hover:border-accent/40 transition-colors duration-200"
            >
              <Heart size={16} weight={wishlistCount > 0 ? 'fill' : 'regular'} className={wishlistCount > 0 ? 'text-accent' : ''} aria-hidden="true" />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-white font-mono text-[9px] font-bold flex items-center justify-center"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <div className="hidden md:block">
              <MagneticButton variant="primary" size="sm" href="/contatti">
                Prenota
              </MagneticButton>
            </div>

            <button
              type="button"
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-full border border-border text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Apri menu di navigazione"
            >
              <List size={20} aria-hidden="true" />
            </button>
          </div>
        </motion.nav>

        {/* Mega dropdown Servizi */}
        <AnimatePresence>
          {megaOpen && (
            <>
              {/* Overlay per chiudere */}
              <div
                className="fixed inset-0 z-[-1]"
                onClick={() => setMegaOpen(false)}
                aria-hidden="true"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -8 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[600px] bg-surface/95 backdrop-blur-xl border border-border rounded-2xl p-4 shadow-accent"
                style={{ zIndex: 50 }}
              >
                <div className="grid grid-cols-2 gap-2">
                  {NAV_LINKS.find((l) => l.label === 'Servizi')?.children?.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-2 transition-colors duration-150 group"
                      onClick={() => setMegaOpen(false)}
                    >
                      <span className="mt-0.5 p-2 rounded-lg bg-accent/10 text-accent shrink-0">
                        <item.icon size={18} weight="regular" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-body font-semibold text-sm text-text-primary group-hover:text-accent transition-colors">
                          {item.label}
                        </p>
                        <p className="font-body text-xs text-text-muted mt-0.5">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <NavMobile isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
})
