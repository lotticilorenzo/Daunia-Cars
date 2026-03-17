'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '@/lib/gsap-utils'
import { useLenis } from '@/components/ui/SmoothScrollProvider'

// ─── Calcola la distanza di un elemento dalla cima del documento ───────────────
function getDocumentTop(el: HTMLElement): number {
  let top = 0
  let node: HTMLElement | null = el
  while (node) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return top
}

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
      {/* Ruota anteriore */}
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
      {/* Ruota posteriore */}
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
  // Sezione spacer: occupa 300vh nel flusso della pagina
  const spacerRef = useRef<HTMLElement>(null)
  // Overlay fixed: sempre nel viewport, mostrato solo quando siamo nella sezione
  const overlayRef = useRef<HTMLDivElement>(null)
  const carWrapRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)

  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    if (prefersReducedMotion()) return
    if (window.innerWidth < 768) return

    const spacer = spacerRef.current
    const overlay = overlayRef.current
    const carWrap = carWrapRef.current
    const trail = trailRef.current
    const brand = brandRef.current
    const tagline = taglineRef.current

    if (!spacer || !overlay || !carWrap || !trail || !brand || !tagline) return

    // Stato iniziale: overlay nascosto
    overlay.style.opacity = '0'
    gsap.set(carWrap, { x: '-25vw' })
    gsap.set(brand, { clipPath: 'inset(0 100% 0 0)', opacity: 1 })
    gsap.set(tagline, { opacity: 0, y: 16 })
    gsap.set(trail, { scaleX: 0, opacity: 0 })

    const handler = () => {
      // Posizione della sezione spacer nel documento (non dipende dallo scroll)
      const sectionTop = getDocumentTop(spacer)
      const sectionHeight = spacer.offsetHeight
      const scrollable = sectionHeight - window.innerHeight

      // lenis.scroll = posizione scroll reale/virtuale di Lenis
      const scroll = lenis.scroll

      // Mostra overlay solo mentre siamo nella sezione spacer
      const active = scroll >= sectionTop && scroll <= sectionTop + scrollable
      overlay.style.opacity = active ? '1' : '0'

      if (!active) return

      // Progress 0→1 attraverso la sezione
      const p = Math.max(0, Math.min(1, (scroll - sectionTop) / scrollable))

      // Auto: da -25vw a 130vw
      gsap.set(carWrap, { x: `${-25 + p * 155}vw` })

      // Scia
      const trailScale = Math.min(1, p * 5)
      const trailOpacity = p < 0.85 ? Math.min(0.85, p * 5) : Math.max(0, (1 - p) * 6.7)
      gsap.set(trail, { scaleX: trailScale, opacity: trailOpacity })

      // Brand name: appare al 25%, scompare al 75%
      if (p < 0.25) {
        gsap.set(brand, { clipPath: 'inset(0 100% 0 0)', opacity: 1 })
        gsap.set(tagline, { opacity: 0, y: 16 })
      } else if (p < 0.55) {
        const bp = (p - 0.25) / 0.3
        gsap.set(brand, { clipPath: `inset(0 ${Math.round((1 - bp) * 100)}% 0 0)`, opacity: 1 })
        gsap.set(tagline, { opacity: Math.min(1, bp * 2), y: Math.max(0, 16 * (1 - bp * 2)) })
      } else if (p < 0.75) {
        gsap.set(brand, { clipPath: 'inset(0 0% 0 0)', opacity: 1 })
        gsap.set(tagline, { opacity: 1, y: 0 })
      } else {
        const bp = (p - 0.75) / 0.25
        gsap.set(brand, {
          clipPath: `inset(0 0% 0 ${Math.round(bp * 100)}%)`,
          opacity: Math.max(0, 1 - bp),
        })
        gsap.set(tagline, { opacity: Math.max(0, 1 - bp * 3) })
      }
    }

    // Usa il return value di lenis.on() come cleanup (pattern ufficiale Lenis v1.x)
    const cleanup = lenis.on('scroll', handler) as unknown as (() => void) | undefined
    handler() // stato iniziale

    return () => {
      if (typeof cleanup === 'function') {
        cleanup()
      } else {
        // Fallback per versioni che non restituiscono cleanup
        ;(lenis as unknown as { off: (e: string, h: () => void) => void }).off('scroll', handler)
      }
      // Nascondi overlay al cleanup
      if (overlay) overlay.style.opacity = '0'
    }
  }, [lenis])

  return (
    <>
      {/* ── SPACER: 300vh nel flusso della pagina, crea lo spazio scroll ── */}
      <section
        ref={spacerRef}
        className="relative w-full bg-bg"
        style={{ height: '300vh' }}
        aria-label="Daunia Cars — in movimento"
      />

      {/* ── OVERLAY FIXED: sempre nel viewport, z sopra il contenuto ma sotto l'header ── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-bg pointer-events-none"
        style={{ zIndex: 40, opacity: 0 }}
        aria-hidden="true"
      >
        {/* Griglia */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Strada */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '38%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
          }}
        />

        {/* Segni stradali */}
        <div className="absolute left-0 right-0" style={{ bottom: '27%', height: '2px' }}>
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
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
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
          className="absolute inset-0 flex flex-col items-center justify-center select-none"
          style={{ clipPath: 'inset(0 100% 0 0)' }}
        >
          <span
            className="font-display font-black text-white leading-none tracking-tighter"
            style={{
              fontSize: 'clamp(5rem, 14vw, 13rem)',
              textShadow: '0 0 80px rgba(196,28,12,0.3)',
            }}
          >
            DAUNIA
          </span>
          <span
            className="font-display font-black leading-none tracking-tighter"
            style={{
              fontSize: 'clamp(5rem, 14vw, 13rem)',
              color: '#C41C0C',
              textShadow: '0 0 80px rgba(196,28,12,0.6)',
            }}
          >
            CARS
          </span>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="absolute left-0 right-0 text-center select-none font-body text-text-muted tracking-[0.25em] uppercase"
          style={{
            bottom: '20%',
            fontSize: 'clamp(0.65rem, 1.2vw, 0.875rem)',
            opacity: 0,
          }}
        >
          Noleggio &amp; Vendita Auto · Parma
        </p>

        {/* Auto + scia */}
        <div
          ref={carWrapRef}
          className="absolute"
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
              background:
                'linear-gradient(to right, transparent, rgba(196,28,12,0.05) 40%, rgba(200,200,220,0.03))',
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

      {/* ── Mobile: layout statico (< 768px) ── */}
      <div className="md:hidden w-full bg-bg py-16 px-6 flex flex-col items-center gap-6">
        <CarSVG className="w-[80vw] max-w-[360px]" />
        <div className="text-center">
          <p className="font-display font-black text-white leading-none tracking-tighter text-[2.5rem]">
            DAUNIA
          </p>
          <p className="font-display font-black leading-none tracking-tighter text-[2.5rem] text-accent">
            CARS
          </p>
          <p className="font-body text-text-muted text-xs uppercase tracking-[0.2em] mt-3">
            Noleggio &amp; Vendita Auto · Parma
          </p>
        </div>
      </div>
    </>
  )
}
