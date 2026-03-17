'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

/**
 * PageTransition
 * Curtain wipe tra le pagine: pannello accent che copre e si alza.
 * Solo clip-path + requestAnimationFrame — zero librerie extra.
 */
export function PageTransition() {
  const pathname = usePathname()
  const [animating, setAnimating] = useState(false)
  const prevPath = useRef(pathname)
  const panelRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (pathname === prevPath.current) return
    prevPath.current = pathname

    const panel = panelRef.current
    if (!panel) return

    setAnimating(true)

    // Fase 1: pannello entra dall'alto verso il basso
    panel.style.transition = 'none'
    panel.style.clipPath = 'inset(0 0 100% 0)'
    panel.style.opacity = '1'

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        panel.style.transition = 'clip-path 0.45s cubic-bezier(0.76,0,0.24,1)'
        panel.style.clipPath = 'inset(0 0 0% 0)'

        setTimeout(() => {
          // Fase 2: pannello esce verso l'alto
          panel.style.transition = 'clip-path 0.45s cubic-bezier(0.76,0,0.24,1) 0.05s'
          panel.style.clipPath = 'inset(100% 0 0% 0)'

          setTimeout(() => {
            panel.style.opacity = '0'
            setAnimating(false)
          }, 500)
        }, 480)
      })
    })

    return () => cancelAnimationFrame(rafRef.current)
  }, [pathname])

  return (
    <div
      ref={panelRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99998,
        backgroundColor: '#C41C0C',
        opacity: 0,
        pointerEvents: animating ? 'all' : 'none',
        clipPath: 'inset(0 0 100% 0)',
        willChange: 'clip-path',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.02em',
          }}
        >
          DAUNIA CARS
        </span>
      </div>
    </div>
  )
}
