'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Eye, Seal, Handshake } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { CtaSection } from '@/components/sections/CtaSection'

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface TimelineItem {
  year: string
  title: string
  description: string
}

interface ValueItem {
  icon: React.ReactNode
  title: string
  description: string
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const timeline: TimelineItem[] = [
  {
    year: '2018',
    title: "Nasce l'idea",
    description: 'Prima sede operativa aperta a Parma. Un progetto nato dalla passione per il mondo automotive e dalla voglia di fare le cose diversamente.',
  },
  {
    year: '2019',
    title: 'Flotta in crescita',
    description: 'Prime 50 auto disponibili al noleggio. La risposta del territorio fu immediata: Parma aveva bisogno di un operatore locale serio.',
  },
  {
    year: '2021',
    title: 'Espansione servizi',
    description: "Aggiunta dei servizi di permuta e finanziamenti personalizzati. Un'offerta completa per ogni esigenza di mobilità.",
  },
  {
    year: '2023',
    title: 'Nuova sede',
    description: 'Trasferimento nella sede attuale di Strada Langhirano 264/1. Spazi più grandi, accoglienza migliore, stesso spirito.',
  },
  {
    year: '2024',
    title: 'Oggi',
    description: 'Oltre 500 veicoli gestiti, clienti in tutta la provincia di Parma e in Emilia-Romagna. La storia continua.',
  },
]

const values: ValueItem[] = [
  {
    icon: <Eye size={32} weight="fill" className="text-accent" aria-hidden="true" />,
    title: 'Trasparenza',
    description: 'Prezzi chiari, contratti leggibili, zero costi nascosti. Saprai sempre esattamente cosa stai pagando e perché.',
  },
  {
    icon: <Seal size={32} weight="fill" className="text-accent" aria-hidden="true" />,
    title: 'Qualità',
    description: 'Ogni veicolo è verificato e garantito prima di essere proposto. Non mettiamo in strada nulla che non faremmo guidare alla nostra famiglia.',
  },
  {
    icon: <Handshake size={32} weight="fill" className="text-accent" aria-hidden="true" />,
    title: 'Prossimità',
    description: "Siamo a Parma da anni. Conosciamo le esigenze del territorio e costruiamo relazioni vere con ogni cliente.",
  },
]

// ─────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

// ─────────────────────────────────────────────
// TIMELINE ITEM COMPONENT
// ─────────────────────────────────────────────

function TimelineEntry({ item, index }: { item: TimelineItem; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-8 pb-12 last:pb-0"
    >
      {/* Vertical line + dot */}
      <div className="relative flex flex-col items-center" aria-hidden="true">
        <div className="w-3 h-3 rounded-full bg-accent mt-1 shrink-0 ring-4 ring-accent/15" />
        <div className="flex-1 w-px bg-border mt-2 last-of-type:hidden" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 pb-0 min-w-0">
        <span className="font-mono text-[clamp(2rem,5vw,3.5rem)] font-bold text-accent leading-none">
          {item.year}
        </span>
        <h3 className="font-display font-bold text-[20px] text-text-primary mt-1">
          {item.title}
        </h3>
        <p className="font-body text-[15px] text-text-secondary leading-relaxed max-w-[55ch]">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// VALUE CARD COMPONENT
// ─────────────────────────────────────────────

function ValueCard({ item, index }: { item: ValueItem; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col gap-4 p-8 rounded-2xl border border-border bg-surface"
    >
      <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
        {item.icon}
      </div>
      <div>
        <h3 className="font-display font-bold text-[22px] text-text-primary mb-2">
          {item.title}
        </h3>
        <p className="font-body text-[15px] text-text-secondary leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

export function ChiSiamoClient() {
  const heroRef = useRef<HTMLElement>(null)

  return (
    <>
      {/* ── Sezione 1: Hero ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative bg-bg pt-24 pb-20 overflow-hidden"
      >
        {/* Decorative blob */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[160px] pointer-events-none translate-x-1/3 -translate-y-1/4"
        />

        <div className="container-custom relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-[11px] text-accent uppercase tracking-wider mb-5"
          >
            Daunia Cars — Parma
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-display font-extrabold leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.75rem, 8vw, 7rem)' }}
          >
            <span className="block text-text-primary">Il nostro impegno,</span>
            <span className="block italic text-accent">ogni giorno.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="font-body text-[18px] text-text-secondary max-w-[55ch] leading-relaxed"
          >
            Siamo il nuovo punto di riferimento per chi cerca qualità, trasparenza e soluzioni su misura nel mondo automotive parmense.
          </motion.p>
        </div>
      </section>

      {/* ── Sezione 2: Mission statement ────────────────────────────────── */}
      <section className="bg-surface-2 py-[80px]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
          >
            {/* Left: label + accent line */}
            <div className="flex flex-col gap-4">
              <p className="font-mono text-[11px] text-accent uppercase tracking-wider">
                La nostra filosofia
              </p>
              <div className="w-12 h-0.5 bg-accent" aria-hidden="true" />
              <p
                className={cn(
                  'font-display font-extrabold text-text-primary leading-tight tracking-tight',
                )}
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3.25rem)' }}
              >
                Comprare o noleggiare un&apos;auto non deve essere complicato.
              </p>
            </div>

            {/* Right: body copy */}
            <div className="flex flex-col gap-5">
              <p className="font-body text-[17px] text-text-secondary leading-relaxed">
                Selezioniamo ogni veicolo con cura, offriamo condizioni trasparenti e costruiamo relazioni vere con i nostri clienti. Non siamo un concessionario anonimo: siamo persone che abitano a Parma, conoscono il territorio e si prendono cura di chi si affida a loro.
              </p>
              <p className="font-body text-[17px] text-text-secondary leading-relaxed">
                Ogni volta che un cliente ci sceglie, ci prende a cuore. Per questo lavoriamo ogni giorno per meritare quella fiducia — con professionalità, ascolto e nessuna promessa che non siamo in grado di mantenere.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Sezione 3: Timeline ─────────────────────────────────────────── */}
      <section className="bg-bg py-[100px]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <p className="font-mono text-[11px] text-accent uppercase tracking-wider mb-3">
              La nostra storia
            </p>
            <h2
              className="font-display font-extrabold text-text-primary leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Come siamo arrivati qui.
            </h2>
          </motion.div>

          <div className="max-w-[680px]">
            {timeline.map((item, i) => (
              <TimelineEntry key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Sezione 4: Valori ───────────────────────────────────────────── */}
      <section className="bg-surface py-[100px]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="font-mono text-[11px] text-accent uppercase tracking-wider mb-3">
              I nostri valori
            </p>
            <h2
              className="font-display font-extrabold text-text-primary leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Quello in cui crediamo.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((item, i) => (
              <ValueCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Sezione 5: CTA ──────────────────────────────────────────────── */}
      <CtaSection />
    </>
  )
}
