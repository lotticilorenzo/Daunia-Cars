'use client'

import { useRef, useEffect } from 'react'

export default function CarScrollSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video   = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    // Start downloading the video immediately
    video.load()

    let rafId: number

    const loop = () => {
      const rect    = section.getBoundingClientRect()
      const scrolled = -rect.top                        // px past the section top
      const total    = rect.height - window.innerHeight // total scrub distance

      if (total > 0 && video.duration > 0) {
        const progress        = Math.max(0, Math.min(1, scrolled / total))
        video.currentTime     = progress * video.duration
      }

      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '400vh' }}
      aria-label="BMW — video scomponimento"
    >
      {/* Sticky viewport — stays at top while 400vh section scrolls */}
      <div
        className="sticky top-0 w-full bg-black overflow-hidden"
        style={{ height: '100vh' }}
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
