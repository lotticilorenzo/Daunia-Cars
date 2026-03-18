'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CaretRight,
  Headset,
  Car,
  FileText,
  Key,
  CheckCircle,
  ShieldCheck,
  MapPin,
  CalendarBlank,
  CurrencyEur,
  Clock,
  CaretDown,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { RentalForm } from '@/components/forms/RentalForm'
import { CtaSection } from '@/components/sections/CtaSection'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Step {
  num: string
  icon: React.ReactNode
  title: string
  body: string
}

interface Vantaggio {
  icon: React.ReactNode
  title: string
  body: string
}

interface FaqItem {
  q: string
  a: string
}

interface CategoryChip {
  label: string
  slug: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const steps: Step[] = [
  {
    num: '01',
    icon: <Headset size={24} weight="bold" className="text-accent" />,
    title: 'Contattaci',
    body: 'Scrivi, chiama o compila il form. Ti risponderemo entro poche ore.',
  },
  {
    num: '02',
    icon: <Car size={24} weight="bold" className="text-accent" />,
    title: 'Scegli il veicolo',
    body: 'Ti proponiamo le auto disponibili per le tue date e il tuo budget.',
  },
  {
    num: '03',
    icon: <FileText size={24} weight="bold" className="text-accent" />,
    title: 'Firma il contratto',
    body: "Documenti chiari e veloci. Patente + carta di credito, nient'altro.",
  },
  {
    num: '04',
    icon: <Key size={24} weight="bold" className="text-accent" />,
    title: 'Parti',
    body: 'Ritiro in sede a Parma o consegna direttamente da te.',
  },
]

const vantaggi: Vantaggio[] = [
  {
    icon: <CheckCircle size={22} weight="fill" className="text-accent shrink-0 mt-0.5" />,
    title: 'Flotta sempre aggiornata',
    body: "Veicoli recenti, revisionati, pronti all'uso.",
  },
  {
    icon: <ShieldCheck size={22} weight="fill" className="text-accent shrink-0 mt-0.5" />,
    title: 'Assicurazione inclusa',
    body: 'RCA e assistenza stradale nel canone giornaliero.',
  },
  {
    icon: <MapPin size={22} weight="fill" className="text-accent shrink-0 mt-0.5" />,
    title: 'Consegna su Parma e provincia',
    body: "Ti portiamo l'auto dove vuoi, senza costi extra.",
  },
  {
    icon: <CalendarBlank size={22} weight="fill" className="text-accent shrink-0 mt-0.5" />,
    title: 'Da 1 a 30 giorni',
    body: 'Flessibilità totale. Paghi solo i giorni che usi.',
  },
  {
    icon: <CurrencyEur size={22} weight="fill" className="text-accent shrink-0 mt-0.5" />,
    title: 'Prezzi trasparenti',
    body: 'Nessun costo nascosto. Preventivo gratuito.',
  },
  {
    icon: <Clock size={22} weight="fill" className="text-accent shrink-0 mt-0.5" />,
    title: 'Assistenza h24',
    body: "Siamo raggiungibili anche fuori orario d'ufficio.",
  },
]

const categories: CategoryChip[] = [
  { label: 'City Car', slug: 'city-car' },
  { label: 'Berlina', slug: 'berlina' },
  { label: 'SUV', slug: 'suv' },
  { label: 'Furgone', slug: 'furgone' },
  { label: 'Luxury', slug: 'luxury' },
]

const faqs: FaqItem[] = [
  {
    q: 'Quali documenti servono per noleggiare?',
    a: 'Patente di guida valida e carta di credito intestata al guidatore principale. Per cittadini extra-UE è necessaria anche la patente internazionale.',
  },
  {
    q: "Posso restituire l'auto in un posto diverso?",
    a: "Sì, offriamo il servizio di riconsegna in altra sede su richiesta. Contattaci per verificare la disponibilità e l'eventuale supplemento.",
  },
  {
    q: "L'assicurazione è sempre inclusa?",
    a: 'Sì, ogni noleggio include RCA e assistenza stradale h24. È possibile aggiungere la copertura Kasko per una protezione completa.',
  },
  {
    q: 'Esiste un limite di chilometri?',
    a: 'I nostri contratti standard includono chilometraggio illimitato. Per noleggi speciali possono applicarsi condizioni differenti che ti comunicheremo in anticipo.',
  },
  {
    q: 'Posso estendere il noleggio?',
    a: 'Certamente. Basta contattarci prima della scadenza e, se il veicolo è disponibile, prolunghiamo il contratto senza costi aggiuntivi.',
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
        aria-controls={`faq-answer-breve-${index}`}
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
            id={`faq-answer-breve-${index}`}
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

export function NoleggioBreveClient() {
  return (
    <>
      {/* ── Sezione 1: Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] flex flex-col justify-end pb-16 sm:pb-20 px-5 sm:px-[8vw] overflow-hidden">
        <Image
          src="https://picsum.photos/seed/car-handover/1920/700"
          alt="Consegna chiavi auto per noleggio breve termine a Parma"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/60 to-transparent"
        />

        <div className="relative z-10 max-w-[680px]">
          <p className="font-mono text-[11px] text-accent uppercase tracking-wider mb-3">
            NOLEGGIO BREVE TERMINE
          </p>

          <nav aria-label="Breadcrumb" className="flex items-center gap-1 mb-5">
            <Link
              href="/"
              className="font-body text-[13px] text-text-secondary hover:text-text-primary transition-colors"
            >
              Home
            </Link>
            <CaretRight size={12} className="text-text-muted" />
            <span className="font-body text-[13px] text-text-secondary">Noleggio Breve</span>
          </nav>

          <h1 className="font-display font-extrabold leading-none tracking-tight mb-4">
            <span
              className="block text-text-primary"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}
            >
              Noleggia oggi.
            </span>
            <span
              className="block italic text-accent"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}
            >
              Guida domani.
            </span>
          </h1>

          <p className="font-body text-[15px] sm:text-[17px] text-text-secondary mb-8 max-w-[50ch]">
            Da 1 a 30 giorni. Assicurazione e assistenza incluse.
          </p>

          <MagneticButton variant="primary" size="lg" href="#form-richiesta">
            Richiedi Subito
          </MagneticButton>
        </div>
      </section>

      {/* ── Sezione 2: Come Funziona ─────────────────────────────────────── */}
      <section className="py-16 sm:py-[100px] bg-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-center"
          >
            <p className="font-mono text-[11px] text-accent uppercase tracking-wider mb-3">
              COME FUNZIONA
            </p>
            <h2
              className="font-display font-extrabold text-text-primary leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Quattro passi, zero complicazioni.
            </h2>
          </motion.div>

          <div className="relative flex flex-col lg:flex-row gap-10 lg:gap-0 items-start">
            {/* SVG connecting line — desktop only */}
            <svg
              aria-hidden="true"
              className="hidden lg:block absolute top-7 left-0 right-0 w-full pointer-events-none"
              height="2"
              style={{ overflow: 'visible' }}
              preserveAspectRatio="none"
            >
              <motion.line
                x1="12.5%"
                y1="1"
                x2="87.5%"
                y2="1"
                stroke="rgba(232,56,13,0.4)"
                strokeWidth="2"
                strokeDasharray="600"
                strokeDashoffset={600}
                whileInView={{ strokeDashoffset: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
              />
            </svg>

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left px-4"
              >
                <div className="relative z-10 w-14 h-14 rounded-full border-2 border-accent flex items-center justify-center bg-bg mb-4 shrink-0">
                  {step.icon}
                </div>
                <span className="font-mono text-[11px] text-accent tracking-wider mb-1">
                  {step.num}
                </span>
                <h3 className="font-display font-bold text-[20px] text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-[15px] text-text-secondary max-w-[22ch]">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sezione 3: Vantaggi ──────────────────────────────────────────── */}
      <section className="bg-bg py-[80px]">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Immagine SX */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-[3/4] relative rounded-2xl overflow-hidden w-full"
          >
            <Image
              src="https://picsum.photos/seed/highway-drive/800/700"
              alt="Auto in viaggio su autostrada italiana, noleggio Daunia Cars"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Testo DX */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display font-extrabold text-text-primary leading-tight mb-8"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              Perché scegliere il noleggio breve Daunia Cars
            </motion.h2>

            <ul className="flex flex-col gap-5">
              {vantaggi.map((v, i) => (
                <motion.li
                  key={v.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  {v.icon}
                  <div>
                    <span className="font-body font-semibold text-[15px] text-text-primary">
                      {v.title}
                    </span>
                    <span className="font-body text-[14px] text-text-secondary ml-1">
                      — {v.body}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Sezione 4: Categorie ─────────────────────────────────────────── */}
      <section className="bg-surface-2 py-[60px]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2
              className="font-display font-extrabold text-text-primary"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
            >
              Che auto cerchi?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/flotta?categoria=${cat.slug}&tipo=noleggio-breve`}
                className={cn(
                  'bg-surface border border-border px-6 py-3.5 rounded-full',
                  'font-body font-semibold text-[16px] text-text-primary',
                  'transition-all duration-200',
                  'hover:bg-accent/10 hover:border-accent/40 hover:text-accent',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
                )}
              >
                {cat.label}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Sezione 5: Form ──────────────────────────────────────────────── */}
      <section id="form-richiesta" className="bg-surface py-[80px]">
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
              Richiedi il tuo preventivo
            </h2>
            <p className="font-body text-[16px] text-text-secondary">
              Gratuito, senza impegno. Ti rispondiamo entro 24 ore.
            </p>
          </motion.div>

          <RentalForm servicePreset="noleggio-breve" />
        </div>
      </section>

      {/* ── Sezione 6: FAQ ───────────────────────────────────────────────── */}
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
              Domande frequenti
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
