'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import {
  registerGSAP,
  initManifestoReveal,
  initParallax,
  splitIntoWords,
  prefersReducedMotion,
} from '@/lib/gsap-utils'

const MARQUEE_TEXT =
  'NOLEGGIO BREVE  ·  NOLEGGIO LUNGO  ·  VENDITA  ·  PERMUTA  ·  FINANZIAMENTI  ·  ASSISTENZA H24  ·  PARMA  ·  '

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const manifestoRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    registerGSAP()

    if (!sectionRef.current) return

    const reduced = prefersReducedMotion()
    const ctx = gsap.context(() => {}, sectionRef)

    // Parallax background
    if (bgRef.current) {
      initParallax(ctx, bgRef.current, -0.3)
    }

    // Manifesto word reveal
    if (manifestoRef.current) {
      if (reduced) {
        // No translation, just fade the whole element
        gsap.fromTo(
          manifestoRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: 'top 70%',
            },
          }
        )
      } else {
        // splitIntoWords flattens textContent — we handle the accent word
        // after splitting by adding the class to the last .reveal-word span.
        splitIntoWords(manifestoRef.current)

        const words = manifestoRef.current.querySelectorAll<HTMLSpanElement>('.reveal-word')
        const lastWord = words[words.length - 1]
        if (lastWord) {
          lastWord.classList.add('text-accent')
        }

        initManifestoReveal(ctx, manifestoRef.current)
      }
    }

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-bg min-h-[60vh] py-20 md:py-[120px] relative overflow-hidden"
      aria-labelledby="manifesto-heading"
    >
      {/* Background parallax image */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none">
        <Image
          src="https://picsum.photos/seed/road-texture/1600/900"
          alt=""
          fill
          className="object-cover opacity-[0.04]"
          aria-hidden="true"
          sizes="100vw"
          priority={false}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-[900px] mx-auto px-5 sm:px-6 text-center">
        {/* Label */}
        <p className="font-mono text-[11px] text-text-muted uppercase tracking-[0.15em] mb-10">
          LA NOSTRA FILOSOFIA
        </p>

        {/* Negative statement */}
        <p className="font-body text-[clamp(1.125rem,2.5vw,1.5rem)] text-text-secondary max-w-[60ch] mx-auto leading-[1.7]">
          La maggior parte degli autonoleggi si concentra su: quante auto
          riescono a piazzare.
        </p>

        {/* Separator */}
        <hr className="w-20 border-border mx-auto my-8" />

        {/*
          Manifesto phrase — GSAP word reveal target.
          The last word "soddisfatto." receives text-accent after splitting
          (see useEffect above). When prefersReducedMotion is true the text
          is shown as-is with the inline accent span intact.
        */}
        <p
          id="manifesto-heading"
          ref={manifestoRef}
          className="font-display font-bold italic text-[clamp(2.5rem,6vw,5rem)] text-text-primary leading-[1.1] tracking-tight"
        >
          Noi ci concentriamo su: portarti a casa{' '}
          <span className="text-accent">soddisfatto.</span>
        </p>

        {/* Subtitle */}
        <p className="font-body text-[17px] text-text-secondary max-w-[55ch] mx-auto mt-6">
          Daunia Cars nasce per essere diversa. Nessuna pressione, nessun costo
          nascosto. Solo soluzioni reali per persone reali.
        </p>
      </div>

      {/* Marquee */}
      <div className="bg-surface-2 py-4 mt-16 overflow-hidden">
        <div
          className="animate-marquee flex whitespace-nowrap hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          <span className="font-mono text-[13px] uppercase text-text-muted tracking-wider">
            {MARQUEE_TEXT}
          </span>
          <span className="font-mono text-[13px] uppercase text-text-muted tracking-wider">
            {MARQUEE_TEXT}
          </span>
        </div>
      </div>
    </section>
  )
}
