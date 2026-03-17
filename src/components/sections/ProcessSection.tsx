'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import {
  registerGSAP,
  initProcessStack,
  prefersReducedMotion,
} from '@/lib/gsap-utils'
import { MagneticButton } from '@/components/ui/MagneticButton'
import gsap from 'gsap'

// ─────────────────────────────────────────────
// Card 1 — SVG concentric circles
// ─────────────────────────────────────────────

function CirclesSVG({ animate }: { animate: boolean }) {
  const radii = [30, 60, 90, 120, 150] as const
  const durations = ['20s', '16s', '12s', '8s', '6s'] as const
  const directions = [
    'normal',
    'alternate',
    'normal',
    'alternate',
    'normal',
  ] as const

  return (
    <svg
      width="320"
      height="320"
      viewBox="0 0 320 320"
      aria-hidden="true"
      className="shrink-0"
    >
      {radii.map((r, i) => (
        <circle
          key={r}
          cx={160}
          cy={160}
          r={r}
          stroke="#C8C8D0"
          strokeOpacity={0.3}
          strokeWidth={1}
          fill="none"
          style={
            animate
              ? {
                  transformOrigin: '160px 160px',
                  animation: `spin ${durations[i]} linear ${directions[i]} infinite`,
                }
              : undefined
          }
        />
      ))}
      {/* Car icon: render as inline SVG path centered at 160,160 */}
      {/* Phosphor Car (duotone) approximated as a simple car silhouette rect */}
      <g transform="translate(144, 148)" opacity="0.5">
        <rect x={0} y={8} width={32} height={14} rx={3} fill="none" stroke="#C8C8D0" strokeWidth={1.5} />
        <rect x={6} y={0} width={20} height={11} rx={2} fill="none" stroke="#C8C8D0" strokeWidth={1.5} />
        <circle cx={7} cy={22} r={3} fill="none" stroke="#C8C8D0" strokeWidth={1.5} />
        <circle cx={25} cy={22} r={3} fill="none" stroke="#C8C8D0" strokeWidth={1.5} />
      </g>
    </svg>
  )
}

// ─────────────────────────────────────────────
// Card 2 — dot grid SVG with scanning line
// ─────────────────────────────────────────────

function DotGridSVG({ animate }: { animate: boolean }) {
  const cols = 8
  const rows = 6
  const spacing = 24
  const dotR = 2
  const w = (cols - 1) * spacing + dotR * 2
  const h = (rows - 1) * spacing + dotR * 2
  const offsetX = dotR
  const offsetY = dotR

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden="true"
      className="shrink-0"
    >
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={offsetX + col * spacing}
            cy={offsetY + row * spacing}
            r={dotR}
            fill="#C8C8D0"
            fillOpacity={0.2}
          />
        ))
      )}
      {/* Scanning line */}
      {animate && (
        <line
          x1={0}
          x2={w}
          y1={0}
          y2={0}
          stroke="#C8C8D0"
          strokeWidth={1}
          strokeOpacity={0.5}
          style={{
            animation: 'scanLine 3s linear infinite',
            transformOrigin: `0 0`,
          }}
        />
      )}
    </svg>
  )
}

// ─────────────────────────────────────────────
// Card 3 — ECG waveform SVG
// ─────────────────────────────────────────────

function EcgSVG({ animate }: { animate: boolean }) {
  const pathD = 'M 0,50 L 30,50 L 40,10 L 50,90 L 60,50 L 200,50'

  return (
    <svg
      width="200"
      height="100"
      viewBox="0 0 200 100"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d={pathD}
        stroke="#C41C0C"
        strokeWidth={2}
        fill="none"
        className={animate ? 'ecg-draw' : undefined}
      />
    </svg>
  )
}

// ─────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────

export function ProcessSection() {
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = prefersReducedMotion()
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return

    registerGSAP()

    const cards = [
      card1Ref.current,
      card2Ref.current,
      card3Ref.current,
    ].filter((el): el is HTMLDivElement => el !== null)

    if (cards.length !== 3) return

    const ctx = gsap.context(() => {})
    initProcessStack(ctx, cards)

    return () => ctx.revert()
  }, [])

  const shouldAnimate = !reducedMotion.current

  return (
    <>
      {/* CSS keyframes injected once */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes scanLine {
          0%   { transform: translateY(0); }
          100% { transform: translateY(${(6 - 1) * 24 + 4}px); }
        }
        .ecg-draw {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: ecgDraw 2s ease-in-out infinite;
        }
        @keyframes ecgDraw {
          0%   { stroke-dashoffset: 300; }
          60%  { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>

      <section aria-label="Come lavoriamo">
        {/* Card 1 */}
        <div
          ref={card1Ref}
          className={cn(
            'min-h-[100vh] flex items-center justify-center bg-surface',
            'px-[8vw] py-20'
          )}
        >
          <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            {/* Text */}
            <div className="flex flex-col gap-6">
              <p className="font-mono font-bold text-[48px] text-text-muted leading-none">
                01
              </p>
              <h2 className="font-display font-bold text-[clamp(2.25rem,5vw,3.75rem)] text-text-primary leading-tight">
                Scegli il veicolo
              </h2>
              <p className="font-body text-[16px] text-text-secondary leading-relaxed max-w-[45ch]">
                Esplora la nostra flotta di oltre 500 veicoli selezionati.
                Filtra per categoria, disponibilità e budget. Trova l&apos;auto
                giusta in pochi click, senza compromessi.
              </p>
              <div>
                <MagneticButton variant="ghost" href="/flotta">
                  Sfoglia la flotta
                </MagneticButton>
              </div>
            </div>
            {/* SVG */}
            <div className="flex items-center justify-center">
              <CirclesSVG animate={shouldAnimate} />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div
          ref={card2Ref}
          className={cn(
            'min-h-[100vh] flex items-center justify-center bg-surface-2',
            'px-[8vw] py-20'
          )}
        >
          <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            {/* SVG left on desktop */}
            <div className="order-2 lg:order-1 flex items-center justify-center">
              <DotGridSVG animate={shouldAnimate} />
            </div>
            {/* Text right on desktop */}
            <div className="order-1 lg:order-2 flex flex-col gap-6">
              <p className="font-mono font-bold text-[48px] text-text-muted leading-none">
                02
              </p>
              <h2 className="font-display font-bold text-[clamp(2.25rem,5vw,3.75rem)] text-text-primary leading-tight">
                Personalizza la soluzione
              </h2>
              <p className="font-body text-[16px] text-text-secondary leading-relaxed max-w-[45ch]">
                Noleggio breve, lungo termine o acquisto diretto? Ti aiutiamo a
                trovare la formula più conveniente. Configuriamo insieme durata,
                chilometraggio e servizi inclusi.
              </p>
              <div>
                <MagneticButton variant="ghost" href="/contatti">
                  Richiedi consulenza
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div
          ref={card3Ref}
          className={cn(
            'relative min-h-[100vh] flex items-center justify-center bg-bg',
            'px-[8vw] py-20 overflow-hidden'
          )}
        >
          {/* Accent glow bottom */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at bottom, rgba(196,28,12,0.12) 0%, transparent 70%)',
            }}
          />

          <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full relative z-10">
            {/* Text */}
            <div className="flex flex-col gap-6">
              <p className="font-mono font-bold text-[48px] text-text-muted leading-none">
                03
              </p>
              <h2 className="font-display font-bold text-[clamp(2.25rem,5vw,3.75rem)] text-text-primary leading-tight">
                Mettiti al volante
              </h2>
              <p className="font-body text-[16px] text-text-secondary leading-relaxed max-w-[45ch]">
                Pratiche rapide, consegna in sede o a domicilio. Nessuna
                sorpresa in fattura. Partiamo insieme: la tua prossima auto ti
                aspetta.
              </p>
              <div>
                <MagneticButton variant="primary" href="/contatti">
                  Contattaci ora
                </MagneticButton>
              </div>
            </div>
            {/* SVG */}
            <div className="flex items-center justify-center">
              <EcgSVG animate={shouldAnimate} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
