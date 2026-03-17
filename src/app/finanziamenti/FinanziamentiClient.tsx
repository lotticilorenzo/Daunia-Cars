'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calculator,
  Buildings,
  TrendDown,
} from '@phosphor-icons/react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ContactForm } from '@/components/forms/ContactForm'
import { CtaSection } from '@/components/sections/CtaSection'

// ─── Types ────────────────────────────────────────────────────────────────────

type Durata = 24 | 36 | 48 | 60

// ─── Data ─────────────────────────────────────────────────────────────────────

const financingTypes = [
  {
    icon: Calculator,
    title: 'Tasso Fisso',
    vantaggi: [
      'Rata costante',
      'Pianificazione facile',
      'Durate 24–60 mesi',
      'Ideale privati',
    ],
    highlighted: true,
  },
  {
    icon: Buildings,
    title: 'Leasing',
    vantaggi: [
      'IVA detraibile',
      'Costo deducibile',
      'Flessibilità alta',
      'Per P.IVA e aziende',
    ],
    highlighted: false,
  },
  {
    icon: TrendDown,
    title: 'Balloon',
    vantaggi: [
      'Rate mensili ridotte',
      'Maxi rata finale',
      'Possibilità riscatto',
      'Durate 36–48 mesi',
    ],
    highlighted: false,
  },
] as const

const DURATE: Durata[] = [24, 36, 48, 60]

const requisiti = [
  "Documento d'identità",
  'Codice fiscale',
  'Busta paga o CU',
  'Patente di guida',
] as const

const faqs = [
  {
    question: 'Quali sono i requisiti minimi per ottenere un finanziamento?',
    answer:
      'Reddito dimostrabile, busta paga o CU, documento valido e codice fiscale.',
  },
  {
    question: "Quanto tempo ci vuole per l'approvazione?",
    answer:
      'Generalmente 24–48 ore lavorative dalla ricezione dei documenti.',
  },
  {
    question: 'Posso richiedere il finanziamento per qualsiasi importo?',
    answer:
      'Lavoriamo su importi da €3.000 fino a €80.000, adattandoci alle esigenze del cliente.',
  },
  {
    question: 'Il tasso fisso è conveniente rispetto al variabile?',
    answer:
      'Con il tasso fisso sai esattamente quanto paghi ogni mese, anche se i tassi di mercato salgono. Per importi elevati può essere la scelta più sicura.',
  },
  {
    question: 'Posso estinguere anticipatamente il finanziamento?',
    answer:
      "Sì, l'estinzione anticipata è sempre possibile. Potrebbe applicarsi una penale minima, che ti comunicheremo nel contratto.",
  },
] as const

// ─── Sub-component: Calcolatore ───────────────────────────────────────────────

function RataCalculator() {
  const [importo, setImporto] = useState<number>(20000)
  const [durata, setDurata] = useState<Durata>(36)

  const rata = Math.round((importo * 1.05) / durata)

  return (
    <div className="max-w-[560px] mx-auto flex flex-col gap-8">
      {/* Importo slider */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label
            htmlFor="importo-slider"
            className="font-body text-[14px] text-text-secondary"
          >
            Importo finanziato
          </label>
          <span className="font-mono text-[15px] font-bold text-text-primary">
            €{importo.toLocaleString('it-IT')}
          </span>
        </div>
        <input
          id="importo-slider"
          type="range"
          min={5000}
          max={80000}
          step={1000}
          value={importo}
          onChange={(e) => setImporto(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-border accent-accent"
          aria-label="Seleziona l'importo del finanziamento"
        />
        <div className="flex justify-between font-mono text-[11px] text-text-secondary">
          <span>€5.000</span>
          <span>€80.000</span>
        </div>
      </div>

      {/* Durata select */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor="durata-select"
          className="font-body text-[14px] text-text-secondary"
        >
          Durata del finanziamento
        </label>
        <select
          id="durata-select"
          value={durata}
          onChange={(e) => setDurata(Number(e.target.value) as Durata)}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 font-body text-[14px] text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg cursor-pointer"
          aria-label="Seleziona la durata del finanziamento"
        >
          {DURATE.map((m) => (
            <option key={m} value={m}>
              {m} mesi
            </option>
          ))}
        </select>
      </div>

      {/* Risultato */}
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8 flex flex-col items-center gap-2 text-center">
        <span className="font-body text-[13px] text-text-secondary uppercase tracking-widest">
          Rata stimata
        </span>
        <span className="font-mono font-bold text-[32px] text-accent leading-none">
          €{rata.toLocaleString('it-IT')}/mese
        </span>
        <p className="font-body text-[12px] text-text-secondary mt-2">
          Calcolo indicativo. Contattaci per un preventivo preciso.
        </p>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FinanziamentiClient() {
  return (
    <main>
      {/* ── Sezione 1: Hero 45vh ── */}
      <section className="relative min-h-[45vh] flex items-center bg-gradient-to-br from-surface via-bg to-bg overflow-hidden">
        <div className="container-custom py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[640px]"
          >
            <span className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase mb-4 block">
              FINANZIAMENTI PERSONALIZZATI
            </span>
            <h1 className="font-display font-extrabold text-[clamp(2.5rem,7vw,5rem)] text-text-primary tracking-tight leading-none mb-4">
              Il finanziamento che si adatta a te
            </h1>
            <p className="font-body text-[18px] text-text-secondary">
              Tasso fisso, leasing e balloon. Soluzioni per privati e aziende.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Sezione 2: Tipologie finanziamento ── */}
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
              Scegli la soluzione più adatta a te
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {financingTypes.map(({ icon: Icon, title, vantaggi, highlighted }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`rounded-2xl border p-8 flex flex-col gap-5 ${
                  highlighted
                    ? 'border-accent/50 bg-accent/5'
                    : 'border-border bg-surface'
                }`}
              >
                <Icon
                  size={32}
                  weight="duotone"
                  className="text-accent"
                  aria-hidden="true"
                />
                <h3 className="font-display font-bold text-[1.2rem] text-text-primary">
                  {title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {vantaggi.map((v) => (
                    <li
                      key={v}
                      className="flex items-center gap-2 font-body text-[14px] text-text-secondary"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                        aria-hidden="true"
                      />
                      {v}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sezione 3: Calcolatore rata interattivo ── */}
      <section className="bg-surface-2 py-[80px]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,3rem)] text-text-primary tracking-tight">
              Calcola la tua rata
            </h2>
          </motion.div>
          <RataCalculator />
        </div>
      </section>

      {/* ── Sezione 4: Requisiti ── */}
      <section className="bg-surface py-[60px]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-extrabold text-[clamp(1.5rem,3vw,2.2rem)] text-text-primary tracking-tight">
              Cosa serve per richiedere un finanziamento
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {requisiti.map((req) => (
              <span
                key={req}
                className="bg-surface-2 border border-border px-4 py-2 rounded-full font-body text-[14px] text-text-primary"
              >
                {req}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Sezione 5: Form richiesta finanziamento ── */}
      <section className="bg-surface py-[80px]">
        <div className="container-custom max-w-[700px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,3rem)] text-text-primary tracking-tight">
              Richiedi il finanziamento
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* ── Sezione 6: FAQ ── */}
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

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <MagneticButton variant="primary" href="/contatti">
              Hai altre domande? Contattaci
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <CtaSection />
    </main>
  )
}
