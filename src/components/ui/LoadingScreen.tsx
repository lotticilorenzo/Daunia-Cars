'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * LoadingScreen
 * Intro animato al primo caricamento del sito nella sessione.
 * - Logo SVG si disegna con path animation
 * - Barra di progresso sale da 0% a 100%
 * - Curtain wipe verso l'alto per rivelare la pagina
 * Salvato in sessionStorage → non si ripete nella stessa sessione.
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const seen = sessionStorage.getItem('dc_intro_seen')
    if (seen) {
      setVisible(false)
      return
    }

    setVisible(true)
    // Blocca scroll durante loading
    document.body.style.overflow = 'hidden'

    let current = 0
    timerRef.current = setInterval(() => {
      current += Math.random() * 18 + 4
      if (current >= 100) {
        current = 100
        clearInterval(timerRef.current!)
        setTimeout(() => {
          setDone(true)
          setTimeout(() => {
            setVisible(false)
            document.body.style.overflow = ''
            sessionStorage.setItem('dc_intro_seen', '1')
          }, 800)
        }, 200)
      }
      setProgress(Math.min(current, 100))
    }, 120)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      document.body.style.overflow = ''
    }
  }, [])

  if (!visible) return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-bg flex flex-col items-center justify-center"
        >
          {/* Noise overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Logo SVG animato */}
          <div className="relative flex flex-col items-center gap-10">
            <svg
              width="200"
              height="60"
              viewBox="0 0 200 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Daunia Cars"
              role="img"
            >
              {/* Linea orizzontale che si disegna */}
              <motion.line
                x1="0"
                y1="52"
                x2="200"
                y2="52"
                stroke="#C41C0C"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
              />

              {/* Testo DAUNIA */}
              <motion.text
                x="0"
                y="44"
                fontFamily="var(--font-display)"
                fontSize="38"
                fontWeight="800"
                fill="#F0EEE8"
                letterSpacing="-1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                DAUNIA
              </motion.text>

              {/* Testo CARS più piccolo */}
              <motion.text
                x="145"
                y="44"
                fontFamily="var(--font-display)"
                fontSize="38"
                fontWeight="800"
                fill="#C41C0C"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                CARS
              </motion.text>
            </svg>

            {/* Claim sotto */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="font-mono text-[11px] text-text-muted uppercase tracking-[0.3em]"
            >
              Noleggio &amp; Vendita · Parma
            </motion.p>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[200px] flex flex-col gap-3">
            <div className="h-[1px] bg-border w-full overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-accent rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-[10px] text-text-muted">Caricamento</span>
              <span className="font-mono text-[10px] text-accent tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
