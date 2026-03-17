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
    year: '2024',
    title: "Nasce l'idea",
    description: "Tutto parte da una conversazione tra due amici con la stessa passione: il mondo dell'auto. L'idea era semplice — fare le cose per bene, con onestà, in una città che meritava di meglio.",
  },
  {
    year: '2025',
    title: 'Apriamo le porte',
    description: 'Prima sede operativa a Strada Langhirano 264/1, Parma. Pochi veicoli, tanta cura. I primi clienti arrivano per passaparola e restano per la serietà.',
  },
  {
    year: '2026',
    title: 'La flotta cresce',
    description: 'Noleggio breve, noleggio lungo termine, vendita e permuta: il catalogo si allarga settimana dopo settimana. Il territorio risponde. E noi continuiamo ad ascoltare.',
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
    description: "Siamo due ragazzi di Parma. Conosciamo il territorio, ci siamo dentro ogni giorno e costruiamo relazioni vere con chi si affida a noi.",
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
            <span className="block text-text-primary">Nati dalla passione,</span>
            <span className="block italic text-accent">in crescita.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="font-body text-[18px] text-text-secondary max-w-[55ch] leading-relaxed"
          >
            Daunia Cars nasce dalla collaborazione di due ragazzi con un obiettivo preciso: portare a Parma un modo nuovo di comprare e noleggiare auto — trasparente, concreto, senza fronzoli.
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
                Siamo partiti in due, con una sede e tanta voglia di fare bene. Niente grandi strutture, niente burocrazia inutile — solo persone reali che parlano con persone reali. Selezioniamo ogni veicolo con cura e offriamo condizioni chiare, senza sorprese.
              </p>
              <p className="font-body text-[17px] text-text-secondary leading-relaxed">
                La realtà è che stiamo crescendo giorno dopo giorno, un cliente alla volta. E ogni nuovo cliente che ci sceglie ci dà la conferma che la strada che abbiamo imboccato è quella giusta.
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
