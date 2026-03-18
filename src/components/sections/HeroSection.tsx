'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { MapPin, CaretDoubleDown } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { registerGSAP, prefersReducedMotion } from '@/lib/gsap-utils'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { gsap } from 'gsap'

export default function HeroSection() {
  const labelRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLHeadingElement>(null)
  const line2Ref = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      if (labelRef.current)
        tl.fromTo(labelRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.1)
      if (line1Ref.current)
        tl.fromTo(line1Ref.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.25)
      if (line2Ref.current)
        tl.fromTo(line2Ref.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.4)
      if (subtitleRef.current)
        tl.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.55)
      if (ctasRef.current)
        tl.fromTo(
          Array.from(ctasRef.current.children),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          0.7
        )
      if (badgeRef.current)
        tl.fromTo(badgeRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 }, 1.0)
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      className={cn(
        'relative min-h-[100dvh] flex flex-col justify-end',
        'pb-[10vh] px-5 sm:px-[8vw]',
        'overflow-hidden'
      )}
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://picsum.photos/seed/highway-night/1920/1080"
          alt="Autostrada notturna — sfondo sezione hero Daunia Cars"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col max-w-[820px]">
        {/* Location label */}
        <div
          ref={labelRef}
          className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted mb-4"
        >
          <MapPin weight="fill" size={13} />
          PARMA, EMILIA-ROMAGNA
        </div>

        {/* Headline */}
        <h1 className="font-display font-extrabold tracking-tight leading-none">
          <span
            ref={line1Ref}
            className={cn(
              'block',
              'text-[clamp(2.75rem,8vw,6.5rem)] text-text-primary'
            )}
          >
            LA TUA PROSSIMA AUTO
          </span>
          <span
            ref={line2Ref}
            className={cn(
              'block italic',
              'text-[clamp(2.75rem,8vw,6.5rem)] text-accent'
            )}
          >
            Ti Aspetta Qui.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-[16px] sm:text-[18px] text-text-secondary max-w-[48ch] leading-relaxed mt-4"
        >
          Auto selezionate, vendita trasparente, permuta e finanziamento su misura. Daunia Cars
          è il punto di riferimento per la mobilità a Parma.
        </p>

        {/* CTAs */}
        <div ref={ctasRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
          <MagneticButton variant="primary" href="/flotta">
            Scopri la Flotta
          </MagneticButton>
          <MagneticButton variant="ghost" href="/contatti">
            Richiedi Preventivo
          </MagneticButton>
        </div>
      </div>

      {/* Trust badge — hidden on mobile */}
      <div
        ref={badgeRef}
        className={cn(
          'absolute bottom-8 right-8',
          'hidden sm:flex items-center',
          'bg-surface/80 backdrop-blur border border-border',
          'px-5 py-2.5 rounded-full',
          'font-mono text-[12px] text-text-secondary'
        )}
      >
        ★ 4.8&nbsp;&nbsp;·&nbsp;&nbsp;98.3% Clienti Soddisfatti&nbsp;&nbsp;·&nbsp;&nbsp;+500 Veicoli gestiti
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-chrome">
        <CaretDoubleDown size={22} weight="bold" aria-hidden="true" />
      </div>
    </section>
  )
}
