'use client'

import { motion } from 'framer-motion'
import {
  Phone,
  Envelope,
  MapPin,
  Clock,
  ArrowSquareOut,
  WhatsappLogo,
  CaretDown,
} from '@phosphor-icons/react'
import { useState } from 'react'
import { ContactForm } from '@/components/forms/ContactForm'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface ContactCard {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}

interface FaqItem {
  q: string
  a: string
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const contactCards: ContactCard[] = [
  {
    icon: <Phone size={22} weight="fill" className="text-accent shrink-0" />,
    label: 'Telefono',
    value: '+39 0521 000000',
    href: 'tel:+390521000000',
  },
  {
    icon: <Envelope size={22} weight="fill" className="text-accent shrink-0" />,
    label: 'Email',
    value: 'info@dauniacars.it',
    href: 'mailto:info@dauniacars.it',
  },
  {
    icon: <MapPin size={22} weight="fill" className="text-accent shrink-0" />,
    label: 'Indirizzo',
    value: 'Strada Langhirano 264/1, Parma (PR)',
  },
  {
    icon: <Clock size={22} weight="fill" className="text-accent shrink-0" />,
    label: 'Orari',
    value: 'Lun–Ven 9:00–19:00 · Sab 9:00–13:00 · Dom chiuso',
  },
]

const faqs: FaqItem[] = [
  {
    q: 'Siete aperti il sabato?',
    a: 'Sì, il sabato siamo aperti dalle 9:00 alle 13:00. La domenica restiamo chiusi, ma puoi lasciarci un messaggio e ti ricontatteremo il lunedì mattina.',
  },
  {
    q: "C'è parcheggio in sede?",
    a: 'Sì, disponiamo di ampio parcheggio privato direttamente in sede, facilmente accessibile sia in auto che in moto.',
  },
  {
    q: 'È necessario fissare un appuntamento?',
    a: 'Non è obbligatorio, puoi venire a trovarci direttamente negli orari di apertura. Se preferisci una consulenza dedicata, ti consigliamo di prenotare un appuntamento compilando il form o chiamandoci.',
  },
]

// ─────────────────────────────────────────────
// FAQ ACCORDION ITEM
// ─────────────────────────────────────────────

function FaqAccordionItem({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        aria-expanded={open}
        aria-controls={`faq-contatti-answer-${index}`}
      >
        <span className="font-body font-semibold text-[16px] text-text-primary">{item.q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="shrink-0"
        >
          <CaretDown size={20} className="text-text-secondary" aria-hidden="true" />
        </motion.div>
      </button>

      <motion.div
        id={`faq-contatti-answer-${index}`}
        initial={false}
        animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="pb-5 font-body text-[15px] text-text-secondary leading-relaxed">
          {item.a}
        </p>
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────
// CONTACT INFO CARD
// ─────────────────────────────────────────────

function InfoCard({ card, index }: { card: ContactCard; index: number }) {
  const inner = (
    <div
      className={cn(
        'flex items-start gap-4 p-5 rounded-2xl border border-border bg-surface',
        'transition-colors duration-200',
        card.href && 'hover:border-accent/40 hover:bg-surface-2',
      )}
    >
      <div className="mt-0.5">{card.icon}</div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider">
          {card.label}
        </span>
        <span className="font-body text-[15px] text-text-primary break-words">{card.value}</span>
      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      {card.href ? (
        <a
          href={card.href}
          aria-label={`${card.label}: ${card.value}`}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-2xl"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

export function ContattiClient() {
  return (
    <>
      {/* ── Sezione 1: Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-bg pt-24 pb-16 overflow-hidden">
        {/* Decorative gradient blob */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"
        />

        <div className="container-custom relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-[11px] text-accent uppercase tracking-wider mb-4"
          >
            Daunia Cars — Parma
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-display font-extrabold leading-none tracking-tight mb-5"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            <span className="block text-text-primary">Siamo</span>
            <span className="block italic text-accent">a Parma.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="font-body text-[18px] text-text-secondary max-w-[50ch] mb-10"
          >
            Vieni a trovarci o scrivici. Risponderemo entro 24 ore.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="https://maps.google.com/?q=Strada+Langhirano+264%2F1+Parma"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apri l'indirizzo di Daunia Cars in Google Maps"
              className={cn(
                'inline-flex items-center gap-2 px-7 py-3.5 rounded-full',
                'bg-accent text-white font-body font-semibold text-[15px]',
                'hover:bg-accent/90 transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
              )}
            >
              <MapPin size={18} weight="fill" aria-hidden="true" />
              Apri in Google Maps
              <ArrowSquareOut size={16} aria-hidden="true" />
            </a>

            <a
              href="https://wa.me/+39 0521 000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contatta Daunia Cars su WhatsApp"
              className={cn(
                'inline-flex items-center gap-2 px-7 py-3.5 rounded-full',
                'border border-border text-text-primary font-body font-semibold text-[15px]',
                'hover:border-[#25D366] hover:text-[#25D366] transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
              )}
            >
              <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
              Scrivici su WhatsApp
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.36 }}
            className="mt-6 font-body text-[14px] text-text-muted flex items-center gap-1.5"
          >
            <MapPin size={14} aria-hidden="true" />
            Strada Langhirano 264/1, Parma (PR)
          </motion.p>
        </div>
      </section>

      {/* ── Sezione 2: Form + Info ───────────────────────────────────────── */}
      <section className="bg-surface py-[80px]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* LEFT: Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7"
            >
              <div className="mb-8">
                <p className="font-mono text-[11px] text-accent uppercase tracking-wider mb-2">
                  Modulo di contatto
                </p>
                <h2
                  className="font-display font-extrabold text-text-primary leading-tight"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
                >
                  Scrivici un messaggio.
                </h2>
                <p className="font-body text-[15px] text-text-secondary mt-2">
                  Compila il form e ti risponderemo entro 24 ore.
                </p>
              </div>

              <ContactForm />
            </motion.div>

            {/* RIGHT: Info cards */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                <p className="font-mono text-[11px] text-accent uppercase tracking-wider mb-2">
                  Dove trovarci
                </p>
                <h2
                  className="font-display font-extrabold text-text-primary leading-tight"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
                >
                  Contatti diretti.
                </h2>
              </motion.div>

              {contactCards.map((card, i) => (
                <InfoCard key={card.label} card={card} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sezione 3: Mappa ─────────────────────────────────────────────── */}
      <section className="bg-bg py-[60px]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <p className="font-mono text-[11px] text-accent uppercase tracking-wider mb-2">
              Come raggiungerci
            </p>
            <h2
              className="font-display font-extrabold text-text-primary leading-tight"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              Strada Langhirano 264/1, Parma.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className={cn(
              'relative w-full rounded-2xl border border-border bg-surface overflow-hidden',
              'flex flex-col items-center justify-center gap-6',
            )}
            style={{ aspectRatio: '16/9', maxHeight: '400px' }}
          >
            {/* Map placeholder pattern */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M0 30h60M30 0v60' stroke='%23ffffff' strokeWidth='0.5'/%3E%3C/svg%3E\")",
                backgroundSize: '60px 60px',
              }}
            />

            <div className="relative z-10 flex flex-col items-center gap-5 text-center px-6">
              <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                <MapPin size={28} weight="fill" className="text-accent" aria-hidden="true" />
              </div>

              <div>
                <p className="font-display font-bold text-[20px] text-text-primary mb-1">
                  Daunia Cars
                </p>
                <p className="font-body text-[14px] text-text-secondary">
                  Strada Langhirano 264/1 · 43124 Parma (PR)
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=Strada+Langhirano+264%2F1+Parma"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visualizza Daunia Cars su Google Maps"
                className={cn(
                  'inline-flex items-center gap-2 px-6 py-3 rounded-full',
                  'border border-border text-text-primary font-body font-semibold text-[14px]',
                  'hover:border-accent/40 hover:text-accent transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
                )}
              >
                Visualizza su Google Maps
                <ArrowSquareOut size={15} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Sezione 4: FAQ ───────────────────────────────────────────────── */}
      <section className="bg-surface py-[80px]">
        <div className="container-custom max-w-[760px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="font-mono text-[11px] text-accent uppercase tracking-wider mb-3">
              FAQ
            </p>
            <h2
              className="font-display font-extrabold text-text-primary"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Domande frequenti.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {faqs.map((item, i) => (
              <FaqAccordionItem key={item.q} item={item} index={i} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
