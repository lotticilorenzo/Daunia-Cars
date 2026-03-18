'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Wrench,
  FileText,
  CurrencyEur,
  ClipboardText,
  Handshake,
  ArrowRight,
} from '@phosphor-icons/react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { TradeInForm } from '@/components/forms/TradeInForm'
import { CtaSection } from '@/components/sections/CtaSection'

// ─── Data ─────────────────────────────────────────────────────────────────────

const heroBadges = [
  { icon: ShieldCheck, label: 'Garanzia 12 mesi' },
  { icon: Wrench, label: 'Revisione completa' },
  { icon: FileText, label: 'Storico verificato' },
  { icon: CurrencyEur, label: 'Finanziamento' },
] as const

const guarantees = [
  {
    icon: ShieldCheck,
    title: 'Garanzia 12 mesi',
    description:
      'Ogni veicolo venduto include 12 mesi di garanzia su motore e cambio.',
  },
  {
    icon: Wrench,
    title: 'Revisione 50 punti',
    description:
      'Check completo su meccanica, elettronica, carrozzeria e interni.',
  },
  {
    icon: ClipboardText,
    title: 'Storico documentato',
    description: 'Tagliandi, proprietari precedenti e controllo antiusura.',
  },
  {
    icon: Handshake,
    title: 'Assistenza post-vendita',
    description:
      'Rimaniamo al tuo fianco anche dopo la firma. Chiamaci quando vuoi.',
  },
] as const

const tradeInSteps = [
  'Compila il form con i dati del tuo veicolo',
  'Ricevi la valutazione entro 24 ore',
  'Usa il valore in permuta o incassalo',
] as const

const financingCards = [
  {
    title: 'Tasso Fisso',
    description:
      'Rata costante per tutta la durata. Ideale per pianificare le spese mensili.',
    durations: '24 / 36 / 48 / 60 mesi',
    highlighted: true,
  },
  {
    title: 'Leasing',
    description:
      'Ideale per aziende e titolari P.IVA. IVA detraibile, canone deducibile.',
    durations: '24 / 36 / 48 mesi',
    highlighted: false,
  },
  {
    title: 'Balloon',
    description:
      'Maxi rata finale. Rate mensili ridotte con possibilità di rinnovo o riscatto.',
    durations: '36 / 48 mesi',
    highlighted: false,
  },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

export function VenditaClient() {
  return (
    <main>
      {/* ── Sezione 1: Hero 55vh ── */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <Image
          src="https://picsum.photos/seed/showroom-night/1920/700"
          alt="Showroom Daunia Cars di notte con auto in esposizione"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/90 to-bg/40" />

        <div className="relative z-10 container-custom pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase mb-4 block">
              VENDITA VEICOLI USATI
            </span>
            <h1 className="font-display font-extrabold text-[clamp(2.5rem,7vw,5rem)] text-text-primary tracking-tight leading-none">
              Auto garantite.{' '}
              <span className="italic text-accent">Prezzi onesti.</span>
            </h1>
            <p className="font-body text-[15px] sm:text-[18px] text-text-secondary mt-4 max-w-[560px]">
              Ogni auto è stata selezionata, revisionata e testata. Nessuna
              sorpresa dopo l&apos;acquisto.
            </p>

            <div className="flex flex-row flex-wrap gap-3 mt-6">
              {heroBadges.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="border border-border rounded-full px-3 py-1.5 font-mono text-[11px] text-text-secondary flex items-center gap-1.5"
                >
                  <Icon size={14} weight="bold" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Sezione 2: Le Nostre Garanzie ── */}
      <section className="bg-surface py-[80px]">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,3rem)] text-text-primary tracking-tight mb-12">
              Compri sapendo esattamente cosa prendi
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {guarantees.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center gap-3 px-6 py-8"
              >
                <Icon
                  size={48}
                  weight="duotone"
                  className="text-accent"
                  aria-hidden="true"
                />
                <h3 className="font-display font-bold text-[1.1rem] text-text-primary">
                  {title}
                </h3>
                <p className="font-body text-[14px] text-text-secondary leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sezione 3: Veicoli in Vendita ── */}
      <section className="bg-bg py-[80px]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,3rem)] text-text-primary tracking-tight">
                I nostri veicoli in vendita
              </h2>
              <a
                href="/flotta?tipo=vendita"
                className="font-body text-accent text-[15px] mt-2 inline-block hover:underline"
              >
                Sfoglia tutta la selezione →
              </a>
            </div>
            <MagneticButton
              variant="outline"
              href="/flotta?tipo=vendita"
              className="mt-6 sm:mt-0"
            >
              Vedi la flotta
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ── Sezione 4: Permuta (Split 2 colonne) ── */}
      <section className="bg-surface-2 py-[80px]">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Colonna SX */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,3rem)] text-text-primary tracking-tight mb-4">
              Hai un&apos;auto da dare via?
            </h2>
            <p className="font-body text-[16px] text-text-secondary leading-relaxed mb-8">
              Valutiamo la tua auto gratuitamente in 24 ore. Prezzo equo, senza
              trattative estenuanti. Puoi usare il valore come anticipo sul nuovo
              acquisto.
            </p>
            <ul className="flex flex-col gap-4">
              {tradeInSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ArrowRight
                    size={20}
                    weight="bold"
                    className="text-accent mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-body text-[15px] text-text-primary">
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Colonna DX */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <TradeInForm />
          </motion.div>
        </div>
      </section>

      {/* ── Sezione 5: Finanziamenti ── */}
      <section className="bg-bg py-[80px]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,3rem)] text-text-primary tracking-tight">
              Acquista con il finanziamento su misura
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {financingCards.map(
              ({ title, description, durations, highlighted }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`rounded-2xl border p-8 flex flex-col gap-3 ${
                    highlighted
                      ? 'border-accent/50 bg-accent/5'
                      : 'border-border bg-surface'
                  }`}
                >
                  <h3 className="font-display font-bold text-[1.2rem] text-text-primary">
                    {title}
                  </h3>
                  <p className="font-body text-[14px] text-text-secondary leading-relaxed flex-1">
                    {description}
                  </p>
                  <p className="font-mono text-[12px] text-accent mt-auto">
                    Durate: {durations}
                  </p>
                </motion.div>
              )
            )}
          </div>

          <div className="flex justify-center">
            <MagneticButton variant="primary" href="/finanziamenti">
              Calcola la tua rata
            </MagneticButton>
          </div>
        </div>
      </section>

      <CtaSection />
    </main>
  )
}
