'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '@/lib/gsap-utils'

export default function CarScrollSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video   = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    // Force browser to load the full video immediately
    video.preload = 'auto'
    video.load()

    if (prefersReducedMotion()) {
      video.currentTime = 0
      return
    }

    let lastProgress = -1

    // GSAP ticker fires every frame — Lenis is already synced to it via
    // SmoothScrollProvider, so this is in perfect lockstep with smooth scroll.
    const tick = () => {
      const rect = section.getBoundingClientRect()

      // Skip when section is completely out of view
      if (rect.top > window.innerHeight || rect.bottom < 0) return

      const scrolled  = -rect.top                        // px scrolled into section
      const total     = rect.height - window.innerHeight // total scrollable distance
      const progress  = Math.max(0, Math.min(1, scrolled / total))

      // Avoid redundant seeks when nothing changed
      if (Math.abs(progress - lastProgress) < 0.0002) return
      lastProgress = progress

      // Only seek once the browser has at least the current frame decoded
      if (video.readyState >= 2 && video.duration > 0) {
        video.currentTime = progress * video.duration
      }
    }

    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '400vh' }}
      aria-label="BMW — video scomponimento"
    >
      {/* Sticky frame — stays at top while section scrolls */}
      <div
        className="sticky top-0 w-full bg-black overflow-hidden"
        style={{ height: '100vh' }}
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          src="/videos/bmw-scomponimento.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="w-full h-full"
          style={{ objectFit: 'contain' }}
        />

        {/* Blends into the next section */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: '14%', background: 'linear-gradient(to top, #09090D 0%, transparent 100%)' }}
        />
      </div>
    </section>
  )
}
