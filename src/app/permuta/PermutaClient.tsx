'use client'

import { motion } from 'framer-motion'
import {
  Car,
  Envelope,
  HandCoins,
  ShieldCheck,
  Clock,
  Headset,
} from '@phosphor-icons/react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { TradeInForm } from '@/components/forms/TradeInForm'
import { CtaSection } from '@/components/sections/CtaSection'

// ─── Data ─────────────────────────────────────────────────────────────────────

const steps = [
  {
    icon: Car,
    title: 'Descrivi il tuo veicolo',
    description: 'Compila il form con marca, modello, anno e km.',
    number: '01',
  },
  {
    icon: Envelope,
    title: 'Ricevi la valutazione',
    description: 'Ti contatteremo entro 24 ore con un prezzo concreto.',
    number: '02',
  },
  {
    icon: HandCoins,
    title: 'Scegli come procedere',
    description: 'Usa il valore in permuta o incassalo direttamente.',
    number: '03',
  },
] as const

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Valutazione equa',
    description: 'Prezzo di mercato reale, non scontato.',
  },
  {
    icon: Clock,
    title: 'Risposta in 24h',
    description: 'Nessuna attesa infinita.',
  },
  {
    icon: HandCoins,
    title: 'Nessun obbligo',
    description: 'Puoi anche solo vendere senza acquistare.',
  },
  {
    icon: Headset,
    title: 'Assistenza dedicata',
    description: 'Ti seguiamo fino alla firma.',
  },
] as const

const faqs = [
  {
    question: 'Come viene calcolato il valore della mia auto?',
    answer:
      'Analisi dati di mercato, km, condizioni e storico. Utilizziamo fonti aggiornate per garantirti una valutazione allineata al mercato reale.',
  },
  {
    question: "Devo portare l'auto in sede?",
    answer:
      'No, per una prima valutazione bastano marca, modello, km e condizioni. La verifica fisica avviene prima della firma.',
  },
  {
    question: 'Posso permutare anche se sto solo vendendo?',
    answer:
      'Sì, valutiamo il tuo veicolo anche se non sei interessato ad acquistare da noi.',
  },
  {
    question: 'Quanto tempo ci vuole per la permuta?',
    answer: 'Di solito meno di 48 ore dalla valutazione alla firma.',
  },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

export function PermutaClient() {
  return (
    <main>
      {/* ── Sezione 1: Hero 45vh ── */}
      <section className="relative min-h-[45vh] flex items-center bg-gradient-to-r from-bg via-surface to-bg overflow-hidden">
        <div className="container-custom py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[640px]"
          >
            <span className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase mb-4 block">
              PERMUTA VEICOLI
            </span>
            <h1 className="font-display font-extrabold text-[clamp(2.5rem,7vw,5rem)] text-text-primary tracking-tight leading-none mb-4">
              Valuta la tua auto gratis
            </h1>
            <p className="font-body text-[18px] text-text-secondary mb-8">
              Risposta entro 24 ore. Valutazione equa e senza impegno.
            </p>
            <MagneticButton variant="primary" href="#form-permuta">
              Richiedi Valutazione
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ── Sezione 2: Come funziona (3 step) ── */}
      <section className="bg-surface py-[80px]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,3rem)] text-text-primary tracking-tight">
              Come funziona
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ icon: Icon, title, description, number }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon
                      size={32}
                      weight="duotone"
                      className="text-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="absolute -top-2 -right-2 font-mono text-[10px] text-accent/60 font-bold">
                    {number}
                  </span>
                </div>
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

      {/* ── Sezione 3: Form valutazione ── */}
      <section id="form-permuta" className="bg-bg py-[80px]">
        <div className="container-custom max-w-[700px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,3rem)] text-text-primary tracking-tight">
              Richiedi la tua valutazione gratuita
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TradeInForm />
          </motion.div>
        </div>
      </section>

      {/* ── Sezione 4: Perché Daunia Cars ── */}
      <section className="bg-surface-2 py-[60px]">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8">
          {reasons.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <Icon
                size={36}
                weight="duotone"
                className="text-accent"
                aria-hidden="true"
              />
              <h3 className="font-display font-bold text-[1rem] text-text-primary">
                {title}
              </h3>
              <p className="font-body text-[13px] text-text-secondary leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Sezione 5: FAQ ── */}
      <section className="bg-bg py-[80px]">
        <div className="container-custom max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,3rem)] text-text-primary tracking-tight">
              Domande frequenti
            </h2>
          </motion.div>

          <div className="flex flex-col gap-4">
            {faqs.map(({ question, answer }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <h3 className="font-body font-semibold text-[15px] text-text-primary mb-2">
                  {question}
                </h3>
                <p className="font-body text-[14px] text-text-secondary leading-relaxed">
                  {answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </main>
  )
}
