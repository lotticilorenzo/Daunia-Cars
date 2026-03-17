'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * SmoothScrollProvider
 * Inizializza Lenis e lo sincronizza con GSAP ScrollTrigger.
 * Va montato una sola volta nel root layout (lato client).
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      lerp: 0.1,           // Lenis v1.x API — sostituisce duration+easing
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    })

    lenisRef.current = lenis

    // Sync Lenis → GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const rafCallback = (time: number) => { lenis.raf(time * 1000) }
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger dopo che tutti i componenti figli hanno montato
    // Timeout 0 → next tick, dopo mount completo del DOM
    const refreshId = setTimeout(() => ScrollTrigger.refresh(), 0)

    return () => {
      clearTimeout(refreshId)
      lenis.destroy()
      gsap.ticker.remove(rafCallback)
      ScrollTrigger.clearScrollMemory()
    }
  }, [])

  return <>{children}</>
}
