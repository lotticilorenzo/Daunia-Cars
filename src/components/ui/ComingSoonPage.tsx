'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin } from '@phosphor-icons/react'

interface ComingSoonPageProps {
  service: string
  description: string
}

export function ComingSoonPage({ service, description }: ComingSoonPageProps) {
  return (
    <main className="min-h-screen bg-bg flex flex-col items-center justify-center px-5 text-center">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative flex flex-col items-center max-w-[540px]"
      >
        {/* Badge */}
        <span className="font-mono text-[10px] uppercase tracking-wider bg-accent/10 text-accent border border-accent/20 px-3 py-1 rounded-full mb-8 inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
          Prossimamente
        </span>

        {/* Heading */}
        <h1 className="font-display font-black text-[clamp(2rem,6vw,3.5rem)] leading-tight tracking-tight text-text-primary mb-4">
          {service}
        </h1>

        {/* Description */}
        <p className="font-body text-[16px] sm:text-[18px] text-text-secondary leading-relaxed mb-10">
          {description}
        </p>

        {/* Divider */}
        <div className="w-12 h-px bg-border mb-10" />

        {/* Location */}
        <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted mb-8">
          <MapPin weight="fill" size={13} aria-hidden="true" />
          Daunia Cars · Parma
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/contatti"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white font-body font-medium rounded-full hover:bg-accent-dark transition-colors"
          >
            Contattaci per informazioni
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-border text-text-secondary font-body font-medium rounded-full hover:text-text-primary hover:border-border-light transition-colors"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Torna alla home
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
