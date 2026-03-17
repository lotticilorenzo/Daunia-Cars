'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle } from '@phosphor-icons/react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { staggerContainer, fadeInLeft } from '@/lib/animations'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceBlock {
  badge: string
  title: string
  description: string
  advantages: string[]
  imageSrc: string
  imageSeed: string
  imageAlt: string
  href: string
  imageRight: boolean
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const services: ServiceBlock[] = [
  {
    badge: 'NOLEGGIO BREVE',
    title: 'Prenota per un giorno.\nO per un mese.',
    description:
      'La flessibilità che ti serve, senza vincoli. Scegli il veicolo giusto per ogni occasione con tariffe chiare e tutto incluso.',
    advantages: [
      'Flotta sempre aggiornata',
      'Zero costi nascosti',
      'Consegna inclusa su Parma',
      'Assistenza 24 ore su 24',
    ],
    imageSrc: 'https://picsum.photos/seed/car-keys/800/600',
    imageSeed: 'car-keys',
    imageAlt: 'Chiavi auto noleggio breve',
    href: '/noleggio-breve',
    imageRight: true,
  },
  {
    badge: 'NOLEGGIO LUNGO TERMINE',
    title: "L'auto giusta ogni mese,\nsenza pensieri.",
    description:
      'Contratti da 12 a 48 mesi per privati e aziende. Manutenzione, bollo e assicurazione già inclusi nel canone.',
    advantages: [
      'Canone mensile fisso e deducibile',
      'Include manutenzione ordinaria',
      'IVA detraibile per P.IVA',
      'Nessun imprevisto di spesa',
    ],
    imageSrc: 'https://picsum.photos/seed/business-car/800/600',
    imageSeed: 'business-car',
    imageAlt: 'Auto aziendale noleggio lungo termine',
    href: '/noleggio-lungo',
    imageRight: false,
  },
  {
    badge: 'VENDITA & PERMUTA',
    title: 'Compra, vendi, permuta.\nCon garanzia reale.',
    description:
      'Auto usate selezionate e revisionate, con garanzia inclusa. Valutiamo la tua auto in 24 ore. Finanziamenti su misura.',
    advantages: [
      'Auto certificate e garantite',
      'Valutazione permuta in 24h',
      'Finanziamento personalizzato',
      'Assistenza post-vendita',
    ],
    imageSrc: 'https://picsum.photos/seed/car-showroom/800/600',
    imageSeed: 'car-showroom',
    imageAlt: 'Showroom vendita auto usate',
    href: '/vendita',
    imageRight: true,
  },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function ServiceBlockItem({ service }: { service: ServiceBlock }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
    >
      {/* Text content */}
      <div className={service.imageRight ? '' : 'lg:order-last'}>
        <span className="bg-accent/10 text-accent border border-accent/20 font-display font-bold text-[11px] uppercase px-3 py-1 rounded-full w-fit inline-block">
          {service.badge}
        </span>

        <h3 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight mt-4 whitespace-pre-line">
          {service.title}
        </h3>

        <p className="font-body text-[16px] text-text-secondary max-w-[42ch] mt-3">
          {service.description}
        </p>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-5 flex flex-col gap-3"
        >
          {service.advantages.map((adv) => (
            <motion.li
              key={adv}
              variants={fadeInLeft}
              className="flex items-center gap-2 font-body text-[15px] text-text-secondary"
            >
              <CheckCircle
                size={16}
                weight="fill"
                className="text-accent flex-shrink-0"
                aria-hidden="true"
              />
              {adv}
            </motion.li>
          ))}
        </motion.ul>

        <MagneticButton variant="outline" href={service.href} className="mt-6">
          Scopri di più
        </MagneticButton>
      </div>

      {/* Image */}
      <div
        className={
          service.imageRight
            ? 'lg:order-last'
            : ''
        }
      >
        <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden hover:scale-[1.03] transition-transform duration-500">
          <Image
            src={service.imageSrc}
            alt={service.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function ServicesSection() {
  return (
    <section className="bg-bg py-[140px]" aria-labelledby="services-heading">
      <div className="container-custom">
        {/* Header */}
        <div>
          <p className="font-mono text-[13px] text-text-muted mb-2">01</p>
          <h2
            id="services-heading"
            className="font-display font-bold text-[clamp(2.25rem,5vw,3.5rem)] leading-tight"
          >
            I Nostri Servizi
          </h2>
          <p className="font-body text-[17px] text-text-secondary max-w-[50ch] mt-3">
            Ogni soluzione pensata attorno alle tue esigenze di mobilità.
          </p>
        </div>

        {/* Service blocks */}
        <div className="flex flex-col gap-[60px] mt-20">
          {services.map((service) => (
            <ServiceBlockItem key={service.badge} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
