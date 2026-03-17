'use client'

import { useRef, useEffect } from 'react'
import { registerGSAP, prefersReducedMotion } from '@/lib/gsap-utils'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

// ─── SVG Car ──────────────────────────────────────────────────────────────────

function CarSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 300"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Silhouette berlina Daunia Cars"
      role="img"
      className={className}
    >
      {/* Ground shadow */}
      <ellipse cx="450" cy="272" rx="370" ry="12" fill="#000000" opacity="0.35" />

      {/* Body — lower shell */}
      <path
        d="M90 215
           L90 182
           Q93 155 118 148
           L230 135
           Q268 85 330 68
           L555 66
           Q630 70 680 112
           L762 130
           Q810 140 820 162
           L825 188
           L825 215
           Z"
        fill="#141416"
        stroke="#2A2A30"
        strokeWidth="1.5"
      />

      {/* Roof cabin */}
      <path
        d="M238 135
           Q278 83 335 68
           L553 66
           Q626 70 672 110
           L690 132
           L238 135
           Z"
        fill="#1C1C22"
        stroke="#2A2A30"
        strokeWidth="1"
      />

      {/* Windshield */}
      <path
        d="M345 70 L328 133 L460 133 L468 70 Z"
        fill="#1E3040"
        opacity="0.9"
        stroke="#2A4055"
        strokeWidth="0.8"
      />

      {/* Rear window */}
      <path
        d="M475 70 L471 133 L655 132 L630 75 Z"
        fill="#1E3040"
        opacity="0.9"
        stroke="#2A4055"
        strokeWidth="0.8"
      />

      {/* A-pillar highlight */}
      <path d="M345 70 L332 133" stroke="#2A4055" strokeWidth="2" opacity="0.5" />

      {/* B-pillar */}
      <line x1="465" y1="133" x2="470" y2="215" stroke="#2A2A30" strokeWidth="2" />

      {/* Side window divider */}
      <rect x="338" y="74" width="122" height="55" rx="4" fill="#1E3040" opacity="0.5" />
      <rect x="475" y="74" width="145" height="55" rx="4" fill="#1E3040" opacity="0.5" />

      {/* Door line */}
      <path d="M240 135 Q242 175 248 215" stroke="#252528" strokeWidth="1.5" fill="none" />
      <path d="M466 133 Q468 175 468 215" stroke="#252528" strokeWidth="1.5" fill="none" />
      <path d="M685 130 Q690 175 690 215" stroke="#252528" strokeWidth="1.5" fill="none" />

      {/* Accent stripe — orange line */}
      <path
        d="M95 192 L820 192"
        stroke="#C41C0C"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Front bumper / grille area */}
      <path
        d="M90 195 Q80 198 76 210 L82 215 L108 215 L108 195 Z"
        fill="#C41C0C"
        opacity="0.9"
      />
      {/* Grille lines */}
      <line x1="84" y1="200" x2="84" y2="212" stroke="#C0200A" strokeWidth="1.5" />
      <line x1="90" y1="198" x2="90" y2="214" stroke="#C0200A" strokeWidth="1.5" />
      <line x1="96" y1="197" x2="96" y2="214" stroke="#C0200A" strokeWidth="1.5" />

      {/* Rear bumper */}
      <path
        d="M812 195 Q822 198 826 210 L820 215 L798 215 L798 195 Z"
        fill="#1C1C22"
      />

      {/* Front headlight — main */}
      <ellipse cx="100" cy="168" rx="16" ry="10" fill="#C0C8D8" opacity="0.9" />
      <ellipse cx="100" cy="168" rx="9" ry="6" fill="#E8F0FF" opacity="0.95" />
      {/* DRL strip */}
      <path d="M88 178 L116 178" stroke="#E8F0FF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />

      {/* Front headlight glow */}
      <ellipse cx="70" cy="168" rx="30" ry="18" fill="#FFFFFF" opacity="0.03" />

      {/* Rear light — bar */}
      <rect x="808" y="158" width="18" height="16" rx="3" fill="#C41C0C" opacity="0.95" />
      <rect x="810" y="160" width="14" height="12" rx="2" fill="#FF5533" opacity="0.6" />

      {/* Front wheel arch */}
      <path d="M128 215 Q128 170 175 170 Q222 170 222 215 Z" fill="#141416" />
      {/* Front wheel */}
      <circle cx="175" cy="228" r="44" fill="#141416" />
      <circle cx="175" cy="228" r="34" fill="#1E1E24" />
      <circle cx="175" cy="228" r="22" fill="#D0D0DC" opacity="0.9" />
      <circle cx="175" cy="228" r="9" fill="#2A2A30" />
      {/* Spokes */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const x1 = 175 + 9 * Math.cos(rad)
        const y1 = 228 + 9 * Math.sin(rad)
        const x2 = 175 + 22 * Math.cos(rad)
        const y2 = 228 + 22 * Math.sin(rad)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3A3A42" strokeWidth="2.5" />
      })}
      {/* Tyre detail */}
      <circle cx="175" cy="228" r="44" fill="none" stroke="#0A0A0C" strokeWidth="8" />

      {/* Rear wheel arch */}
      <path d="M665 215 Q665 170 712 170 Q759 170 759 215 Z" fill="#141416" />
      {/* Rear wheel */}
      <circle cx="712" cy="228" r="44" fill="#141416" />
      <circle cx="712" cy="228" r="34" fill="#1E1E24" />
      <circle cx="712" cy="228" r="22" fill="#D0D0DC" opacity="0.9" />
      <circle cx="712" cy="228" r="9" fill="#2A2A30" />
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const x1 = 712 + 9 * Math.cos(rad)
        const y1 = 228 + 9 * Math.sin(rad)
        const x2 = 712 + 22 * Math.cos(rad)
        const y2 = 228 + 22 * Math.sin(rad)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3A3A42" strokeWidth="2.5" />
      })}
      <circle cx="712" cy="228" r="44" fill="none" stroke="#0A0A0C" strokeWidth="8" />

      {/* Roof rack / chrome trim */}
      <path
        d="M340 67 L625 66"
        stroke="#3A3A42"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// ─── Speed Lines ───────────────────────────────────────────────────────────────

function SpeedLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {/* Horizontal speed streaks */}
      {[12, 25, 38, 48, 57, 67, 75, 84].map((y, i) => (
        <line
          key={i}
          className={`speed-line speed-line-${i}`}
          x1="0"
          y1={`${y}%`}
          x2="100%"
          y2={`${y}%`}
          stroke="rgba(196,28,12,0.12)"
          strokeWidth={i % 3 === 0 ? '1.5' : '0.8'}
        />
      ))}
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CarScrollSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const carWrapRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const speedLinesRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()

    if (prefersReducedMotion()) return

    const isMobile = window.innerWidth < 768
    if (isMobile) return

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(carWrapRef.current, { x: '-28vw' })
      gsap.set(brandRef.current, { clipPath: 'inset(0 100% 0 0)', opacity: 1 })
      gsap.set(taglineRef.current, { opacity: 0, y: 16 })
      gsap.set(trailRef.current, { scaleX: 0, transformOrigin: 'right center', opacity: 0 })
      gsap.set('.speed-line', { scaleX: 0, transformOrigin: 'left center' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: 1.8,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Phase 1 (0–30%): Car enters from left, speed lines appear
      tl.to(carWrapRef.current, { x: '10vw', ease: 'power1.in' }, 0)
        .to(trailRef.current, { scaleX: 1, opacity: 1, ease: 'power2.out' }, 0)
        .to(
          '.speed-line',
          { scaleX: 1, stagger: 0.03, ease: 'power2.out' },
          0.05
        )
        .to(overlayRef.current, { opacity: 0.6, ease: 'none' }, 0)

      // Phase 2 (30–55%): Car reaches center, brand name explodes in
      tl.to(carWrapRef.current, { x: '38vw', ease: 'none' }, 0.3)
        .to(
          brandRef.current,
          { clipPath: 'inset(0 0% 0 0)', ease: 'power3.out', duration: 0.18 },
          0.3
        )
        .to(taglineRef.current, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.14 }, 0.42)

      // Phase 3 (55–80%): Brand stays, car continues
      tl.to(carWrapRef.current, { x: '65vw', ease: 'none' }, 0.55)

      // Phase 4 (80–100%): Car exits right, brand fades out
      tl.to(carWrapRef.current, { x: '125vw', ease: 'power1.out' }, 0.78)
        .to(
          brandRef.current,
          { clipPath: 'inset(0 0% 0 100%)', opacity: 0, ease: 'power2.in', duration: 0.14 },
          0.80
        )
        .to(taglineRef.current, { opacity: 0, y: -10, ease: 'power2.in', duration: 0.1 }, 0.82)
        .to(trailRef.current, { opacity: 0, ease: 'power1.in' }, 0.85)
        .to('.speed-line', { scaleX: 0, stagger: 0.02, ease: 'power1.in' }, 0.85)
        .to(overlayRef.current, { opacity: 0, ease: 'none' }, 0.88)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-bg"
      style={{ height: '100dvh' }}
    >
      {/* ── Dark vignette overlay (dims during car pass) ── */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)',
          opacity: 0,
        }}
      />

      {/* ── Road surface ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #0A0A0C 0%, transparent 100%)',
        }}
      />

      {/* ── Road center lines ── */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 pointer-events-none"
        style={{ bottom: '28%', height: '2px' }}
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-full bg-[rgba(255,255,255,0.07)] rounded-full"
            style={{ left: `${i * 6.5}%`, width: '4%' }}
          />
        ))}
      </div>

      {/* ── Speed lines layer ── */}
      <div ref={speedLinesRef} className="absolute inset-0 z-[2] pointer-events-none">
        <SpeedLines />
      </div>

      {/* ── Brand name — center reveal ── */}
      <div
        ref={brandRef}
        aria-hidden="true"
        className="absolute inset-0 flex flex-col items-center justify-center z-[3] pointer-events-none select-none"
        style={{ clipPath: 'inset(0 100% 0 0)' }}
      >
        <span
          className="font-display font-black text-white leading-none tracking-tighter"
          style={{
            fontSize: 'clamp(5rem, 14vw, 13rem)',
            textShadow: '0 0 80px rgba(196,28,12,0.3), 0 0 160px rgba(196,28,12,0.1)',
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

      {/* ── Tagline ── */}
      <p
        ref={taglineRef}
        aria-hidden="true"
        className="absolute left-0 right-0 text-center z-[4] pointer-events-none select-none font-body text-text-muted tracking-[0.25em] uppercase"
        style={{
          bottom: '20%',
          fontSize: 'clamp(0.65rem, 1.2vw, 0.875rem)',
          opacity: 0,
        }}
      >
        Noleggio &amp; Vendita Auto · Parma
      </p>

      {/* ── Car + trail wrapper ── */}
      <div
        ref={carWrapRef}
        className="absolute z-[5]"
        style={{
          bottom: '22%',
          left: 0,
          willChange: 'transform',
        }}
      >
        {/* Motion blur trail */}
        <div
          ref={trailRef}
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            right: '100%',
            top: '30%',
            width: '60vw',
            height: '40%',
            background:
              'linear-gradient(to right, transparent, rgba(196,28,12,0.06) 40%, rgba(200,200,220,0.04))',
            filter: 'blur(8px)',
            transform: 'scaleX(0)',
            transformOrigin: 'right center',
          }}
        />

        {/* Light cone from headlights */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            left: '-30%',
            top: '10%',
            width: '35%',
            height: '80%',
            background:
              'linear-gradient(to left, transparent, rgba(220,235,255,0.04))',
            filter: 'blur(12px)',
          }}
        />

        <CarSVG
          className={cn(
            'relative z-10',
            'w-[clamp(480px,55vw,820px)]',
          )}
        />
      </div>

      {/* ── Mobile fallback — static ── */}
      <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center gap-6 px-6">
        <CarSVG className="w-[80vw] max-w-[380px]" />
        <div className="text-center">
          <p className="font-display font-black text-white leading-none tracking-tighter text-[2.5rem]">
            DAUNIA
          </p>
          <p
            className="font-display font-black leading-none tracking-tighter text-[2.5rem]"
            style={{ color: '#C41C0C' }}
          >
            CARS
          </p>
          <p className="font-body text-text-muted text-xs uppercase tracking-[0.2em] mt-3">
            Noleggio &amp; Vendita Auto · Parma
          </p>
        </div>
      </div>
    </section>
  )
}
