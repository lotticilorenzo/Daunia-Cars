'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CaretRight,
  CaretDown,
  CheckFat,
  CheckCircle,
  CurrencyEur,
  FileText,
  TrendDown,
  Lightning,
  TrendUp,
  Building,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { RentalForm } from '@/components/forms/RentalForm'
import { CtaSection } from '@/components/sections/CtaSection'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FaqItem {
  q: string
  a: string
}

interface CompareRow {
  label: string
  acquisto: string
  nlt: string
  nltHighlight: boolean
}

interface DurataCard {
  months: number
  label: string
  sublabel: string
  icon: React.ReactNode
  highlighted: boolean
}

interface FiscaleCard {
  icon: React.ReactNode
  title: string
  body: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const compareRows: CompareRow[] = [
  {
    label: 'Anticipo',
    acquisto: 'Spesso richiesto',
    nlt: 'Non richiesto',
    nltHighlight: true,
  },
  {
    label: 'Rata mensile',
    acquisto: 'Variabile + interessi',
    nlt: 'Canone fisso garantito',
    nltHighlight: true,
  },
  {
    label: 'Manutenzione',
    acquisto: 'A tuo carico',
    nlt: 'Inclusa nel canone',
    nltHighlight: true,
  },
  {
    label: 'Bollo',
    acquisto: 'A tuo carico',
    nlt: 'Incluso nel canone',
    nltHighlight: true,
  },
  {
    label: 'Assicurazione',
    acquisto: 'A tuo carico',
    nlt: 'Inclusa nel canone',
    nltHighlight: true,
  },
  {
    label: 'Svalutazione',
    acquisto: 'Rischio tuo',
    nlt: 'Rischio del noleggiatore',
    nltHighlight: true,
  },
  {
    label: 'Flessibilità',
    acquisto: 'Legato al finanziamento',
    nlt: 'Rinnovi o cambi auto',
    nltHighlight: true,
  },
  {
    label: 'IVA per P.IVA',
    acquisto: 'Parzialmente detraibile',
    nlt: 'Fino al 100% detraibile',
    nltHighlight: true,
  },
]

const durateCards: DurataCard[] = [
  {
    months: 12,
    label: 'Massima flessibilità',
    sublabel: 'Ideale per chi cambia spesso',
    icon: <Lightning size={22} weight="fill" className="text-accent" />,
    highlighted: false,
  },
  {
    months: 24,
    label: 'Il più scelto',
    sublabel: 'Equilibrio perfetto',
    icon: <CheckCircle size={22} weight="fill" className="text-accent" />,
    highlighted: true,
  },
  {
    months: 36,
    label: 'Risparmio ottimale',
    sublabel: 'Canone più conveniente',
    icon: <TrendUp size={22} weight="fill" className="text-accent" />,
    highlighted: false,
  },
  {
    months: 48,
    label: 'Canone minimo',
    sublabel: 'Per chi pianifica a lungo',
    icon: <CurrencyEur size={22} weight="fill" className="text-accent" />,
    highlighted: false,
  },
]

const fiscaleCards: FiscaleCard[] = [
  {
    icon: <CurrencyEur size={28} weight="fill" className="text-accent" />,
    title: 'IVA detraibile',
    body: "Per i veicoli strumentali all'attività, l'IVA sul canone di noleggio è detraibile fino al 100%. Un risparmio immediato e certo.",
  },
  {
    icon: <FileText size={28} weight="fill" className="text-accent" />,
    title: 'Costo deducibile',
    body: "Il canone NLT è un costo d'esercizio: deducibile dal reddito d'impresa secondo le aliquote previste per la categoria del veicolo.",
  },
  {
    icon: <TrendDown size={28} weight="fill" className="text-accent" />,
    title: 'Zero immobilizzo capitale',
    body: "Nessun anticipo, nessun immobilizzo di liquidità. Il capitale rimane disponibile per investire nel tuo business.",
  },
]

const faqs: FaqItem[] = [
  {
    q: 'Posso disdire il contratto in anticipo?',
    a: 'La disdetta anticipata è possibile ma prevede un corrispettivo per i canoni residui. Ti consigliamo di scegliere la durata che meglio si adatta alle tue esigenze.',
  },
  {
    q: 'Cosa succede in caso di incidente?',
    a: "L'assicurazione inclusa copre la RCA. In caso di incidente, seguiamo insieme la procedura di sinistro. Opzionalmente è disponibile la copertura kasko.",
  },
  {
    q: 'Posso aggiungere un secondo guidatore?',
    a: 'Sì, è possibile aggiungere guidatori aggiuntivi con costo minimo. Il secondo guidatore deve essere maggiorenne e in possesso di patente valida.',
  },
  {
    q: "Al termine del contratto cosa succede all'auto?",
    a: 'Riconsegni il veicolo. Puoi poi rinnovare con un\'auto nuova, cambiare tipologia o semplicemente non rinnovare. Nessun obbligo.',
  },
  {
    q: 'Quali costi sono esclusi dal canone?',
    a: "Solitamente esclusi: carburante, pedaggi, contravvenzioni e danni non coperti dall'assicurazione. Tutto il resto è incluso.",
  },
]

// ─── FaqAccordionItem ─────────────────────────────────────────────────────────

function FaqAccordionItem({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        aria-expanded={open}
        aria-controls={`faq-answer-lungo-${index}`}
      >
        <span className="font-body font-semibold text-[16px] text-text-primary">{item.q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="shrink-0"
        >
          <CaretDown size={20} className="text-text-secondary" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-lungo-${index}`}
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 font-body text-[15px] text-text-secondary leading-relaxed">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function NoleggioLungoClient() {
  return (
    <>
      {/* ── Sezione 1: Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] flex flex-col justify-end pb-16 sm:pb-20 px-5 sm:px-[8vw] overflow-hidden">
        <Image
          src="https://picsum.photos/seed/office-parking/1920/700"
          alt="Parcheggio aziendale con auto a noleggio lungo termine Daunia Cars"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/60 to-transparent"
        />

        <div className="relative z-10 max-w-[720px]">
          <p className="font-mono text-[11px] text-accent uppercase tracking-wider mb-3">
            NOLEGGIO LUNGO TERMINE · NLT
          </p>

          <nav aria-label="Breadcrumb" className="flex items-center gap-1 mb-5">
            <Link
              href="/"
              className="font-body text-[13px] text-text-secondary hover:text-text-primary transition-colors"
            >
              Home
            </Link>
            <CaretRight size={12} className="text-text-muted" />
            <span className="font-body text-[13px] text-text-secondary">Noleggio Lungo</span>
          </nav>

          <h1 className="font-display font-extrabold leading-none tracking-tight mb-4">
            <span
              className="block text-text-primary"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}
            >
              Un&apos;auto al mese,
            </span>
            <span
              className="block italic text-accent"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}
            >
              senza pensieri.
            </span>
          </h1>

          <p className="font-body text-[15px] sm:text-[17px] text-text-secondary mb-8 max-w-[52ch]">
            Per privati e aziende. Da 12 a 48 mesi. Tutto incluso nel canone mensile.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <MagneticButton variant="primary" size="lg" href="#form-nlt">
              Richiedi Preventivo NLT
            </MagneticButton>

            <div className="hidden sm:flex items-center gap-2">
              {(['Privati', 'Aziende P.IVA'] as const).map((badge) => (
                <span
                  key={badge}
                  className="border border-border font-mono text-[11px] text-text-secondary px-3 py-1 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sezione 2: Cos'è il NLT ─────────────────────────────────────── */}
      <section className="bg-bg py-[80px]">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Testo SX */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display font-bold text-text-primary leading-tight mb-6"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.625rem)' }}
            >
              Noleggio Lungo Termine: cos&apos;è e come funziona
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-body text-[16px] text-text-secondary leading-relaxed mb-4"
            >
              Il noleggio a lungo termine (NLT) è la formula più intelligente per avere sempre
              un&apos;auto nuova, senza l&apos;impegno finanziario dell&apos;acquisto. Paghi un
              canone mensile fisso e pensiamo noi a tutto il resto.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-body text-[16px] text-text-secondary leading-relaxed"
            >
              A differenza dell&apos;acquisto, con il NLT non sei vincolato per anni allo stesso
              veicolo. Al termine del contratto puoi rinnovare, cambiare auto o semplicemente non
              rinnovare.
            </motion.p>
          </div>

          {/* Immagine + bullets DX */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-[5/4] relative rounded-2xl overflow-hidden w-full"
            >
              <Image
                src="https://picsum.photos/seed/luxury-interior/600/500"
                alt="Interno lussuoso di auto disponibile in noleggio lungo termine"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <ul className="flex flex-col gap-3">
              {[
                'Canone mensile fisso',
                'Manutenzione inclusa',
                'Zero imprevisti',
              ].map((text, i) => (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckFat size={18} weight="fill" className="text-accent shrink-0" />
                  <span className="font-body font-semibold text-[15px] text-text-primary">
                    {text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Sezione 3: NLT vs Acquisto ───────────────────────────────────── */}
      <section className="bg-surface-2 py-[80px]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2
              className="font-display font-extrabold text-text-primary leading-tight mb-2"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              NLT vs Acquisto: il confronto onesto
            </h2>
            <p className="font-body text-[16px] text-text-secondary">
              Numeri reali, senza trucchi.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="overflow-x-auto"
          >
            <table className="w-full border border-border rounded-xl overflow-hidden text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 px-6 font-mono text-[12px] text-text-muted uppercase tracking-wider w-[35%]">
                    Voce
                  </th>
                  <th className="py-4 px-6 font-mono text-[12px] text-text-muted uppercase tracking-wider">
                    Acquisto
                  </th>
                  <th className="py-4 px-6 font-mono text-[12px] text-accent uppercase tracking-wider border-l border-accent/30 bg-surface">
                    NLT Daunia Cars
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={cn(
                      'border-b border-border last:border-b-0',
                      i % 2 === 0 ? 'bg-bg/40' : ''
                    )}
                  >
                    <td className="py-4 px-6 font-body font-semibold text-[14px] text-text-primary">
                      {row.label}
                    </td>
                    <td className="py-4 px-6 font-body text-[14px] text-text-muted">
                      {row.acquisto}
                    </td>
                    <td className="py-4 px-6 border-l border-accent/30 bg-surface">
                      <span className="flex items-center gap-2">
                        <CheckCircle size={16} weight="fill" className="text-accent shrink-0" />
                        <span className="font-body font-semibold text-[14px] text-text-primary">
                          {row.nlt}
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── Sezione 4: Vantaggi Fiscali P.IVA ───────────────────────────── */}
      <section className="bg-surface py-[60px]">
        <div className="max-w-[900px] mx-auto px-6 border-l-4 border-accent/20 rounded-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <Building size={48} weight="fill" className="text-accent" />
              <span className="font-mono text-[11px] text-accent uppercase tracking-wider">
                PER TITOLARI P.IVA
              </span>
            </div>
            <h2
              className="font-display font-extrabold text-text-primary leading-tight"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              Il NLT conviene doppio se hai la partita IVA
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {fiscaleCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-surface-2 border border-border rounded-xl p-5"
              >
                <div className="mb-3">{card.icon}</div>
                <h3 className="font-body font-semibold text-[15px] text-text-primary mb-2">
                  {card.title}
                </h3>
                <p className="font-body text-[13px] text-text-secondary leading-relaxed">
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="font-body text-[13px] text-text-muted leading-relaxed">
            * Le percentuali di deducibilità e detraibilità variano in base alla tipologia di
            veicolo e all&apos;utilizzo. Consulta il tuo commercialista per una valutazione
            personalizzata. Le informazioni fornite hanno scopo illustrativo.
          </p>
        </div>
      </section>

      {/* ── Sezione 5: Durate ────────────────────────────────────────────── */}
      <section className="bg-surface-2 py-[60px]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2
              className="font-display font-extrabold text-text-primary"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
            >
              Scegli la durata giusta per te
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {durateCards.map((card, i) => (
              <motion.div
                key={card.months}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={cn(
                  'border rounded-xl p-6 flex flex-col gap-3 relative',
                  card.highlighted
                    ? 'border-accent bg-accent/5'
                    : 'border-border bg-surface'
                )}
              >
                {card.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-bg font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    PIÙ SCELTO
                  </span>
                )}
                <div>{card.icon}</div>
                <div>
                  <p className="font-display font-extrabold text-[28px] text-text-primary leading-none">
                    {card.months}
                    <span className="font-body font-normal text-[14px] text-text-secondary ml-1">
                      mesi
                    </span>
                  </p>
                  <p className="font-body font-semibold text-[14px] text-text-primary mt-1">
                    {card.label}
                  </p>
                  <p className="font-body text-[13px] text-text-secondary mt-0.5">
                    {card.sublabel}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sezione 6: Form NLT ──────────────────────────────────────────── */}
      <section id="form-nlt" className="bg-surface py-[80px]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2
              className="font-display font-extrabold text-text-primary mb-3"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Richiedi il tuo preventivo NLT
            </h2>
            <p className="font-body text-[16px] text-text-secondary">
              Gratuito, senza impegno. Ti rispondiamo entro 24 ore.
            </p>
          </motion.div>

          <RentalForm servicePreset="noleggio-lungo" />
        </div>
      </section>

      {/* ── Sezione 7: FAQ NLT ───────────────────────────────────────────── */}
      <section className="bg-bg py-[80px]">
        <div className="container-custom max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2
              className="font-display font-extrabold text-text-primary"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Domande frequenti sul NLT
            </h2>
          </motion.div>

          <div>
            {faqs.map((item, i) => (
              <FaqAccordionItem key={item.q} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
