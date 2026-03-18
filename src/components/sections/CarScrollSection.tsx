'use client'

import { useRef, useEffect, useState } from 'react'

export default function CarScrollSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const video   = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    let rafId: number
    let objectUrl = ''

    // Download the full video into memory so every seek is instant.
    // Without this, Range requests to unbuffered positions never complete
    // because the rAF loop keeps interrupting them with new currentTime values.
    fetch('/videos/bmw-scomponimento.mp4')
      .then((res) => res.blob())
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob)
        video.src = objectUrl

        video.addEventListener('loadedmetadata', () => {
          setLoaded(true)

          const scrub = () => {
            const scrollY = window.scrollY || window.pageYOffset
            const sectionTop = section.offsetTop
            const sectionHeight = section.offsetHeight
            const scrolled = scrollY - sectionTop
            const total = sectionHeight - window.innerHeight

            if (total > 0) {
              const progress = Math.max(0, Math.min(1, scrolled / total))
              video.currentTime = progress * video.duration
              console.log('scrollY:', scrollY, '| sectionTop:', sectionTop, '| scrolled:', scrolled, '| total:', total, '| progress:', progress.toFixed(4), '| currentTime:', video.currentTime.toFixed(3), '/ duration:', video.duration.toFixed(3))
            }

            rafId = requestAnimationFrame(scrub)
          }

          rafId = requestAnimationFrame(scrub)
        }, { once: true })

        video.load()
      })

    return () => {
      cancelAnimationFrame(rafId)
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '400vh' }}
      aria-label="BMW — video scomponimento"
    >
      <div
        className="sticky top-0 w-full bg-black overflow-hidden"
        style={{ height: '100vh' }}
      >
        {/* Loading state */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#333]">
              Caricamento...
            </span>
          </div>
        )}

        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="w-full h-full"
          style={{ objectFit: 'contain', opacity: loaded ? 1 : 0, transition: 'opacity 0.4s' }}
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
