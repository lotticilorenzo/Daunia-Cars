'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '@/components/ui/SmoothScrollProvider'

// ─── SVG Auto ─────────────────────────────────────────────────────────────────
function CarSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 300"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Silhouette berlina Daunia Cars"
      role="img"
      className={className}
    >
      <ellipse cx="450" cy="272" rx="370" ry="12" fill="#000" opacity="0.35" />
      <path
        d="M90 215 L90 182 Q93 155 118 148 L230 135 Q268 85 330 68 L555 66 Q630 70 680 112 L762 130 Q810 140 820 162 L825 188 L825 215 Z"
        fill="#141416" stroke="#2A2A30" strokeWidth="1.5"
      />
      <path
        d="M238 135 Q278 83 335 68 L553 66 Q626 70 672 110 L690 132 L238 135 Z"
        fill="#1C1C22" stroke="#2A2A30" strokeWidth="1"
      />
      <path d="M345 70 L328 133 L460 133 L468 70 Z" fill="#1E3040" opacity="0.9" stroke="#2A4055" strokeWidth="0.8" />
      <path d="M475 70 L471 133 L655 132 L630 75 Z" fill="#1E3040" opacity="0.9" stroke="#2A4055" strokeWidth="0.8" />
      <path d="M345 70 L332 133" stroke="#2A4055" strokeWidth="2" opacity="0.5" />
      <line x1="465" y1="133" x2="470" y2="215" stroke="#2A2A30" strokeWidth="2" />
      <path d="M240 135 Q242 175 248 215" stroke="#252528" strokeWidth="1.5" fill="none" />
      <path d="M466 133 Q468 175 468 215" stroke="#252528" strokeWidth="1.5" fill="none" />
      <path d="M685 130 Q690 175 690 215" stroke="#252528" strokeWidth="1.5" fill="none" />
      <path d="M95 192 L820 192" stroke="#C41C0C" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <path d="M90 195 Q80 198 76 210 L82 215 L108 215 L108 195 Z" fill="#C41C0C" opacity="0.9" />
      <line x1="84" y1="200" x2="84" y2="212" stroke="#C0200A" strokeWidth="1.5" />
      <line x1="90" y1="198" x2="90" y2="214" stroke="#C0200A" strokeWidth="1.5" />
      <line x1="96" y1="197" x2="96" y2="214" stroke="#C0200A" strokeWidth="1.5" />
      <path d="M812 195 Q822 198 826 210 L820 215 L798 215 L798 195 Z" fill="#1C1C22" />
      <ellipse cx="100" cy="168" rx="16" ry="10" fill="#C0C8D8" opacity="0.9" />
      <ellipse cx="100" cy="168" rx="9" ry="6" fill="#E8F0FF" opacity="0.95" />
      <path d="M88 178 L116 178" stroke="#E8F0FF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <rect x="808" y="158" width="18" height="16" rx="3" fill="#C41C0C" opacity="0.95" />
      <rect x="810" y="160" width="14" height="12" rx="2" fill="#FF5533" opacity="0.6" />
      <path d="M128 215 Q128 170 175 170 Q222 170 222 215 Z" fill="#141416" />
      <circle cx="175" cy="228" r="44" fill="#141416" />
      <circle cx="175" cy="228" r="34" fill="#1E1E24" />
      <circle cx="175" cy="228" r="22" fill="#D0D0DC" opacity="0.9" />
      <circle cx="175" cy="228" r="9" fill="#2A2A30" />
      {[0,60,120,180,240,300].map((deg, i) => {
        const r = (deg * Math.PI) / 180
        return <line key={i} x1={175+9*Math.cos(r)} y1={228+9*Math.sin(r)} x2={175+22*Math.cos(r)} y2={228+22*Math.sin(r)} stroke="#3A3A42" strokeWidth="2.5" />
      })}
      <circle cx="175" cy="228" r="44" fill="none" stroke="#0A0A0C" strokeWidth="8" />
      <path d="M665 215 Q665 170 712 170 Q759 170 759 215 Z" fill="#141416" />
      <circle cx="712" cy="228" r="44" fill="#141416" />
      <circle cx="712" cy="228" r="34" fill="#1E1E24" />
      <circle cx="712" cy="228" r="22" fill="#D0D0DC" opacity="0.9" />
      <circle cx="712" cy="228" r="9" fill="#2A2A30" />
      {[0,60,120,180,240,300].map((deg, i) => {
        const r = (deg * Math.PI) / 180
        return <line key={i} x1={712+9*Math.cos(r)} y1={228+9*Math.sin(r)} x2={712+22*Math.cos(r)} y2={228+22*Math.sin(r)} stroke="#3A3A42" strokeWidth="2.5" />
      })}
      <circle cx="712" cy="228" r="44" fill="none" stroke="#0A0A0C" strokeWidth="8" />
      <path d="M340 67 L625 66" stroke="#3A3A42" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── Componente principale ────────────────────────────────────────────────────
export default function CarScrollSection() {
  // spacerRef = sezione esterna 300vh che crea lo spazio di scroll
  const spacerRef = useRef<HTMLElement>(null)
  // stickyRef = contenitore sticky 100vh che resta nel viewport
  const stickyRef = useRef<HTMLDivElement>(null)
  const carWrapRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)

  // Lenis è già sincronizzato con ScrollTrigger in SmoothScrollProvider
  const lenis = useLenis()

  useEffect(() => {
    // Aspetta che Lenis sia pronto (garantisce che lenis.on('scroll', ScrollTrigger.update) sia attivo)
    if (!lenis) return

    const spacer = spacerRef.current
    const carWrap = carWrapRef.current
    const trail = trailRef.current
    const brand = brandRef.current
    const tagline = taglineRef.current
    if (!spacer || !carWrap || !trail || !brand || !tagline) return

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Stato iniziale
      gsap.set(carWrap, { x: '-30vw' })
      gsap.set(brand, { clipPath: 'inset(0 100% 0 0)' })
      gsap.set(tagline, { opacity: 0, y: 16 })
      gsap.set(trail, { scaleX: 0, opacity: 0, transformOrigin: 'right center' })

      // ── Auto: da -30vw a +130vw lungo tutto lo scroll della sezione ──
      gsap.to(carWrap, {
        x: '130vw',
        ease: 'none',
        scrollTrigger: {
          trigger: spacer,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      })

      // ── Scia: appare (0→35%) e scompare (75→100%) ──
      gsap.to(trail, {
        scaleX: 1,
        opacity: 0.85,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: spacer,
          start: 'top top',
          end: '35% top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      gsap.to(trail, {
        opacity: 0,
        ease: 'power1.in',
        scrollTrigger: {
          trigger: spacer,
          start: '75% top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // ── Brand: wipe-in (20→50%), stabile, wipe-out (70→90%) ──
      gsap.to(brand, {
        clipPath: 'inset(0 0% 0 0)',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: spacer,
          start: '20% top',
          end: '50% top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      gsap.to(brand, {
        clipPath: 'inset(0 0% 0 100%)',
        ease: 'power2.in',
        scrollTrigger: {
          trigger: spacer,
          start: '70% top',
          end: '90% top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // ── Tagline: fade-up (25→50%), fade-out (72→88%) ──
      gsap.to(tagline, {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: spacer,
          start: '25% top',
          end: '50% top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      gsap.to(tagline, {
        opacity: 0,
        y: -8,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: spacer,
          start: '72% top',
          end: '88% top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // Refresh per misure corrette dopo mount
      setTimeout(() => ScrollTrigger.refresh(), 150)
    })

    return () => {
      ctx.revert()
    }
  }, [lenis])

  return (
    <>
      {/* ── Desktop: spacer 300vh + sticky 100vh ── */}
      <section
        ref={spacerRef}
        className="hidden md:block relative"
        style={{ height: '300vh' }}
        aria-label="Daunia Cars — in movimento"
      >
        {/* Il div sticky resta nel viewport mentre si scrolla il spacer */}
        <div
          ref={stickyRef}
          className="sticky top-0 w-full bg-bg overflow-hidden"
          style={{ height: '100vh' }}
          aria-hidden="true"
        >
          {/* Griglia */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />

          {/* Gradiente strada */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: '38%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
            }}
          />

          {/* Segni stradali */}
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{ bottom: '27%', height: '2px' }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-full rounded-full"
                style={{ left: `${i * 5.5}%`, width: '3%', background: 'rgba(255,255,255,0.06)' }}
              />
            ))}
          </div>

          {/* Speed lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            {[12, 25, 38, 48, 57, 67, 75, 84].map((y, i) => (
              <line
                key={i}
                x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`}
                stroke="rgba(196,28,12,0.1)"
                strokeWidth={i % 3 === 0 ? '1.5' : '0.8'}
              />
            ))}
          </svg>

          {/* Brand name */}
          <div
            ref={brandRef}
            className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none"
            style={{ clipPath: 'inset(0 100% 0 0)' }}
          >
            <span
              className="font-display font-black text-white leading-none tracking-tighter"
              style={{ fontSize: 'clamp(5rem, 14vw, 13rem)', textShadow: '0 0 80px rgba(196,28,12,0.3)' }}
            >
              DAUNIA
            </span>
            <span
              className="font-display font-black leading-none tracking-tighter"
              style={{ fontSize: 'clamp(5rem, 14vw, 13rem)', color: '#C41C0C', textShadow: '0 0 80px rgba(196,28,12,0.6)' }}
            >
              CARS
            </span>
          </div>

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="absolute left-0 right-0 text-center select-none font-body text-text-muted tracking-[0.25em] uppercase pointer-events-none"
            style={{ bottom: '20%', fontSize: 'clamp(0.65rem, 1.2vw, 0.875rem)', opacity: 0 }}
          >
            Noleggio &amp; Vendita Auto · Parma
          </p>

          {/* Auto + scia */}
          <div
            ref={carWrapRef}
            className="absolute pointer-events-none"
            style={{ bottom: '22%', left: 0, willChange: 'transform' }}
          >
            {/* Scia */}
            <div
              ref={trailRef}
              className="absolute"
              style={{
                right: '100%',
                top: '25%',
                width: '55vw',
                height: '50%',
                background: 'linear-gradient(to right, transparent, rgba(196,28,12,0.05) 40%, rgba(200,200,220,0.03))',
                filter: 'blur(10px)',
                transformOrigin: 'right center',
              }}
            />
            {/* Cono luci */}
            <div
              className="absolute"
              style={{
                left: '-25%',
                top: '15%',
                width: '30%',
                height: '70%',
                background: 'linear-gradient(to left, transparent, rgba(220,235,255,0.03))',
                filter: 'blur(14px)',
              }}
            />
            <CarSVG className="relative z-10 w-[clamp(420px,52vw,780px)]" />
          </div>
        </div>
      </section>

      {/* ── Mobile: layout statico ── */}
      <div className="md:hidden w-full bg-bg py-16 px-6 flex flex-col items-center gap-6">
        <CarSVG className="w-[80vw] max-w-[360px]" />
        <div className="text-center">
          <p className="font-display font-black text-white leading-none tracking-tighter text-[2.5rem]">DAUNIA</p>
          <p className="font-display font-black leading-none tracking-tighter text-[2.5rem] text-accent">CARS</p>
          <p className="font-body text-text-muted text-xs uppercase tracking-[0.2em] mt-3">
            Noleggio &amp; Vendita Auto · Parma
          </p>
        </div>
      </div>
    </>
  )
}
