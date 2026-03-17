'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { prefersReducedMotion } from '@/lib/gsap-utils'

// ─── Odometer digit ───────────────────────────────────────────────────────────

function OdometerDigit({ digit, delay }: { digit: string; delay: number }) {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const isNumeric = /\d/.test(digit)

  if (!isNumeric) {
    return (
      <span className="inline-block font-mono font-extrabold text-accent leading-none">
        {digit}
      </span>
    )
  }

  const targetIndex = digits.indexOf(digit)

  return (
    <span
      className="inline-block overflow-hidden relative"
      style={{ height: '1em', verticalAlign: 'bottom' }}
      aria-hidden="true"
    >
      <motion.span
        className="flex flex-col"
        initial={{ y: 0 }}
        animate={{ y: `${-targetIndex * 100}%` }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {digits.map((d) => (
          <span
            key={d}
            className="block font-mono font-extrabold text-accent leading-none"
            style={{ height: '1em' }}
          >
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

function OdometerNumber({
  value,
  suffix,
  triggered,
}: {
  value: string
  suffix: string
  triggered: boolean
}) {
  const chars = value.split('')

  return (
    <p
      className="font-mono font-extrabold text-accent text-[clamp(2.5rem,6vw,4.5rem)] leading-none flex items-end"
      aria-label={`${value}${suffix}`}
    >
      {triggered
        ? chars.map((ch, i) => (
            <OdometerDigit key={i} digit={ch} delay={i * 0.06} />
          ))
        : chars.map((ch, i) => (
            <span key={i} className="font-mono font-extrabold text-accent leading-none">
              {ch}
            </span>
          ))}
      <span className="font-mono font-extrabold text-accent leading-none">{suffix}</span>
    </p>
  )
}

// ─── Stats data ───────────────────────────────────────────────────────────────

const STATS = [
  { value: '500', suffix: '+', label: 'Veicoli', label2: 'Gestiti' },
  { value: '98.3', suffix: '%', label: 'Clienti', label2: 'Soddisfatti' },
  { value: '14', suffix: '', label: 'Anni di', label2: 'Esperienza' },
  { value: '4.8', suffix: ' ★', label: 'Rating', label2: 'Medio' },
] as const

// ─── Section ──────────────────────────────────────────────────────────────────

export function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    if (inView && !prefersReducedMotion()) {
      // Piccolo delay per far partire l'animazione dopo l'entrata in viewport
      const t = setTimeout(() => setTriggered(true), 100)
      return () => clearTimeout(t)
    }
    if (inView) setTriggered(true)
  }, [inView])

  return (
    <section
      ref={ref}
      className="bg-surface-2 py-20 overflow-hidden"
      aria-label="Statistiche Daunia Cars"
    >
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center gap-2 py-8 px-4"
            >
              <OdometerNumber
                value={stat.value}
                suffix={stat.suffix}
                triggered={triggered}
              />
              <p className="font-body font-medium text-[12px] uppercase tracking-[0.1em] text-text-muted text-center">
                {stat.label}
                <br />
                {stat.label2}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
