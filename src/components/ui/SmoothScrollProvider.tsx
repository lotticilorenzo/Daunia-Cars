'use client'

import { useEffect, useState, createContext, useContext } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type LenisInstance = InstanceType<typeof Lenis>

// Context esposto ai componenti figli che necessitano di accedere a Lenis
export const LenisContext = createContext<LenisInstance | null>(null)
export function useLenis() { return useContext(LenisContext) }

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<LenisInstance | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const l = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    })

    setLenis(l)

    l.on('scroll', ScrollTrigger.update)

    const rafCallback = (time: number) => { l.raf(time * 1000) }
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    const refreshId = setTimeout(() => ScrollTrigger.refresh(), 0)

    return () => {
      clearTimeout(refreshId)
      l.destroy()
      setLenis(null)
      gsap.ticker.remove(rafCallback)
      ScrollTrigger.clearScrollMemory()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}
