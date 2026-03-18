'use client'

import { useRef, useEffect, useState } from 'react'

// Walk the full offsetParent chain to get the true absolute top
// (section.offsetTop alone is relative to offsetParent, not the page)
function getAbsoluteTop(el: HTMLElement): number {
  let top = 0
  let current: HTMLElement | null = el
  while (current) {
    top += current.offsetTop
    current = current.offsetParent as HTMLElement | null
  }
  return top
}

export default function CarScrollSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded]   = useState(false)
  const [error,  setError]    = useState(false)

  useEffect(() => {
    const video   = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    let rafId: number
    let objectUrl = ''

    fetch('/videos/bmw-scomponimento.mp4')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.blob()
      })
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob)
        video.src = objectUrl
        video.load()

        video.addEventListener('loadedmetadata', () => {
          setLoaded(true)

          // Capture section geometry once after layout is stable
          const absTop     = getAbsoluteTop(section)
          const sectionH   = section.offsetHeight
          const total      = sectionH - window.innerHeight

          const scrub = () => {
            if (total > 0 && video.duration > 0) {
              const scrolled = window.scrollY - absTop
              const progress = Math.max(0, Math.min(1, scrolled / total))
              video.currentTime = progress * video.duration
            }
            rafId = requestAnimationFrame(scrub)
          }

          rafId = requestAnimationFrame(scrub)
        }, { once: true })
      })
      .catch(() => setError(true))

    return () => {
      cancelAnimationFrame(rafId)
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '500vh' }}
      aria-label="BMW — video scomponimento"
    >
      <div
        className="sticky top-0 w-full bg-black overflow-hidden"
        style={{ height: '100vh' }}
      >
        {!loaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#444]">
              Caricamento video…
            </span>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-red-500">
              Errore caricamento video
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
          style={{ objectFit: 'contain', opacity: loaded ? 1 : 0, transition: 'opacity 0.5s' }}
        />

        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: '14%', background: 'linear-gradient(to top, #09090D 0%, transparent 100%)' }}
        />
      </div>
    </section>
  )
}
