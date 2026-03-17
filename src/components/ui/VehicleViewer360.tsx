'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowsHorizontal } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface VehicleViewer360Props {
  src: string
  alt: string
  className?: string
}

const MAX_ROTATE_DEG = 25

export function VehicleViewer360({ src, alt, className }: VehicleViewer360Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const lastX = useRef(0)
  const accumulatedDeg = useRef(0)

  const [hasInteracted, setHasInteracted] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Raw motion values
  const rotateYRaw = useMotionValue(0)
  const highlightXRaw = useMotionValue(50) // percentage 0–100

  // Smoothed springs
  const springRotateY = useSpring(rotateYRaw, { stiffness: 180, damping: 28 })
  const springHighlightX = useSpring(highlightXRaw, { stiffness: 180, damping: 28 })

  // Derive highlight background from springHighlightX
  const highlightBg = useTransform(
    springHighlightX,
    (x) =>
      `radial-gradient(ellipse 40% 80% at ${x}% 45%, rgba(255,255,255,0.11) 0%, transparent 70%)`
  )

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion) return
      isDragging.current = true
      lastX.current = e.clientX
      setHasInteracted(true)
      ;(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
    },
    [reducedMotion]
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current || reducedMotion) return

      const delta = e.clientX - lastX.current
      lastX.current = e.clientX

      // Accumulate rotation: 0.4 deg / pixel, clamped to ±MAX
      accumulatedDeg.current = Math.max(
        -MAX_ROTATE_DEG,
        Math.min(MAX_ROTATE_DEG, accumulatedDeg.current + delta * 0.4)
      )

      rotateYRaw.set(accumulatedDeg.current)

      // Map rotation [-25, +25] → highlight [20, 80]%
      const mappedHighlight = 50 + (accumulatedDeg.current / MAX_ROTATE_DEG) * 30
      highlightXRaw.set(mappedHighlight)
    },
    [reducedMotion, rotateYRaw, highlightXRaw]
  )

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false
    // Spring back to center
    rotateYRaw.set(0)
    highlightXRaw.set(50)
    accumulatedDeg.current = 0
  }, [rotateYRaw, highlightXRaw])

  return (
    <div
      className={cn('relative w-full select-none', className)}
      aria-label={`Vista 360° interattiva: ${alt}. Trascina orizzontalmente per ruotare.`}
    >
      {/* Drag hint — visible until first interaction */}
      {!hasInteracted && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-20 flex items-end justify-center pb-5 pointer-events-none"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-bg/80 backdrop-blur-sm border border-border">
            <ArrowsHorizontal size={14} weight="bold" className="text-text-secondary" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-text-secondary">
              Trascina per ruotare
            </span>
          </div>
        </div>
      )}

      {/* 360° badge */}
      <div
        aria-hidden="true"
        className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-bg/70 backdrop-blur-sm border border-border pointer-events-none"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
          360°
        </span>
      </div>

      {/* Drag cursor hint — shown after first interaction, when not dragging */}
      {hasInteracted && (
        <div
          aria-hidden="true"
          className="absolute bottom-3 right-3 z-20 pointer-events-none"
        >
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-bg/70 backdrop-blur-sm border border-border">
            <span className="font-mono text-[10px] text-text-muted">⟵ DRAG ⟶</span>
          </div>
        </div>
      )}

      {/* 3D rotating container */}
      <motion.div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        tabIndex={0}
        role="img"
        aria-label={alt}
        style={{
          rotateY: reducedMotion ? 0 : springRotateY,
          perspective: 800,
          transformStyle: 'preserve-3d' as const,
          cursor: 'grab',
        }}
        className={cn(
          'relative aspect-video w-full rounded-2xl overflow-hidden bg-surface border transition-colors duration-200',
          isFocused ? 'border-accent outline-none ring-2 ring-accent/40' : 'border-border'
        )}
      >
        {/* Vehicle image */}
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover pointer-events-none"
          priority
          draggable={false}
        />

        {/* Dynamic reflection highlight — follows drag position */}
        {!reducedMotion && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ background: highlightBg }}
          />
        )}

        {/* Edge vignette for depth illusion */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 50%, rgba(12,12,14,0.55) 100%)',
          }}
        />
      </motion.div>
    </div>
  )
}
