'use client'

import { useRef, useEffect, useState } from 'react'
import { registerGSAP, prefersReducedMotion } from '@/lib/gsap-utils'
import { gsap } from 'gsap'

export default function CarScrollSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  // ── Pre-caricamento metadata ──────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onLoaded = () => setReady(true)

    if (video.readyState >= 1) {
      setReady(true)
    } else {
      video.addEventListener('loadedmetadata', onLoaded)
    }

    return () => video.removeEventListener('loadedmetadata', onLoaded)
  }, [])

  // ── GSAP ScrollTrigger — scrub currentTime ────────────────────────────────
  useEffect(() => {
    if (!ready) return

    registerGSAP()

    const video   = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    if (prefersReducedMotion()) {
      // Mostra solo il primo frame
      video.currentTime = 0
      return
    }

    const ctx = gsap.context(() => {
      // Oggetto proxy per il ticker
      const proxy = { progress: 0 }

      gsap.to(proxy, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: (self) => {
            if (video.duration) {
              video.currentTime = self.progress * video.duration
            }
          },
        },
      })
    })

    return () => ctx.revert()
  }, [ready])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '400vh' }}
      aria-label="BMW — video tecnico scomponimento"
    >
      {/* ── Sticky viewport ─────────────────────────────────────────────── */}
      <div
        className="sticky top-0 w-full overflow-hidden bg-black"
        style={{ height: '100vh' }}
        aria-hidden="true"
      >
        {/* Fade-in dopo caricamento */}
        <div
          className="w-full h-full transition-opacity duration-700"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <video
            ref={videoRef}
            src="/videos/bmw-scomponimento.mp4"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            className="w-full h-full"
            style={{ objectFit: 'contain', background: '#000' }}
          />
        </div>

        {/* Gradient bottom — sfuma nella sezione successiva */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: '12%', background: 'linear-gradient(to top, #09090D 0%, transparent 100%)' }}
        />
      </div>
    </section>
  )
}
