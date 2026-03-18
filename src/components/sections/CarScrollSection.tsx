'use client'

import { useRef, useEffect } from 'react'
import { useLenis } from '@/components/ui/SmoothScrollProvider'
import { prefersReducedMotion } from '@/lib/gsap-utils'

export default function CarScrollSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const lenis      = useLenis()

  // Pre-load video as soon as the component mounts
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.preload = 'auto'
    video.load()
  }, [])

  // Wire up scroll scrubbing once Lenis is ready
  useEffect(() => {
    const video   = videoRef.current
    const section = sectionRef.current
    if (!video || !section || !lenis) return

    if (prefersReducedMotion()) {
      video.currentTime = 0
      return
    }

    // Lenis fires this on every smooth-scroll frame with the real scroll position
    const onScroll = ({ scroll }: { scroll: number }) => {
      const sectionTop    = section.offsetTop
      const sectionHeight = section.offsetHeight
      const scrolled      = scroll - sectionTop                    // px past section top
      const total         = sectionHeight - window.innerHeight     // total scrub distance
      const progress      = Math.max(0, Math.min(1, scrolled / total))

      if (video.readyState >= 2 && video.duration > 0) {
        video.currentTime = progress * video.duration
      }
    }

    lenis.on('scroll', onScroll)

    return () => {
      lenis.off('scroll', onScroll)
    }
  }, [lenis])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '400vh' }}
      aria-label="BMW — video scomponimento"
    >
      {/* Sticky viewport */}
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
