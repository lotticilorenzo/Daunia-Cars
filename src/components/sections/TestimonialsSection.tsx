'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { testimonials } from '@/data/testimonials'
import { formatDate } from '@/lib/utils'

// Avatar config keyed by testimonial id
const avatarConfig: Record<string, { initials: string; className: string }> = {
  t001: { initials: 'MF', className: 'bg-accent/20 text-accent' },
  t002: { initials: 'LB', className: 'bg-chrome/10 text-chrome' },
  t003: { initials: 'GT', className: 'bg-accent/15 text-accent' },
  t004: { initials: 'SR', className: 'bg-surface text-text-secondary' },
}

// Use only the first 4 testimonials
const DISPLAY_COUNT = 4
const displayTestimonials = testimonials.slice(0, DISPLAY_COUNT)

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DISPLAY_COUNT)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused])

  // On desktop (sm+), show 2 cards; on mobile 1.
  // activeIndex drives which pair is shown on desktop.
  const desktopPairStart = activeIndex % 2 === 0 ? 0 : 2
  const mobileActive = activeIndex

  return (
    <section className="bg-surface py-[100px]">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-12">
          <p className="font-mono text-[13px] text-text-muted">03</p>
          <h2 className="font-display font-bold text-[clamp(2.25rem,5vw,3.5rem)] text-text-primary leading-tight">
            Cosa dicono i nostri clienti
          </h2>
          <p className="font-body text-text-muted">
            Parma, Collecchio, Langhirano e dintorni.
          </p>
        </div>

        {/* Carousel */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Desktop: 2 columns — show pair based on activeIndex */}
          <div className="hidden sm:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={desktopPairStart}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="grid sm:grid-cols-2 gap-6"
              >
                {[desktopPairStart, desktopPairStart + 1].map((idx) => {
                  const t = displayTestimonials[idx]
                  if (!t) return null
                  const avatar = avatarConfig[t.id] ?? {
                    initials: t.name.slice(0, 2).toUpperCase(),
                    className: 'bg-surface text-text-secondary',
                  }
                  return (
                    <TestimonialCard
                      key={t.id}
                      name={t.name}
                      role={t.role}
                      text={t.text}
                      rating={t.rating}
                      date={t.date}
                      initials={avatar.initials}
                      avatarClass={avatar.className}
                    />
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile: 1 card at a time */}
          <div className="sm:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileActive}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {(() => {
                  const t = displayTestimonials[mobileActive]
                  if (!t) return null
                  const avatar = avatarConfig[t.id] ?? {
                    initials: t.name.slice(0, 2).toUpperCase(),
                    className: 'bg-surface text-text-secondary',
                  }
                  return (
                    <TestimonialCard
                      name={t.name}
                      role={t.role}
                      text={t.text}
                      rating={t.rating}
                      date={t.date}
                      initials={avatar.initials}
                      avatarClass={avatar.className}
                    />
                  )
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dots indicator */}
        <div
          className="flex justify-center gap-2 mt-8"
          role="tablist"
          aria-label="Seleziona testimonianza"
        >
          {displayTestimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Testimonianza ${i + 1}`}
              onClick={() => {
                setActiveIndex(i)
                setIsPaused(true)
              }}
              className={cn(
                'relative flex items-center justify-center w-8 h-8',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full'
              )}
            >
              <span className={cn(
                'w-2 h-2 rounded-full transition-colors duration-200',
                i === activeIndex ? 'bg-accent' : 'bg-border'
              )} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Testimonial Card sub-component
// ─────────────────────────────────────────────

interface TestimonialCardProps {
  name: string
  role?: string
  text: string
  rating: 1 | 2 | 3 | 4 | 5
  date: string
  initials: string
  avatarClass: string
}

function TestimonialCard({
  name,
  role,
  text,
  rating,
  date,
  initials,
  avatarClass,
}: TestimonialCardProps) {
  return (
    <div className="bg-surface-2 rounded-2xl p-6 border border-border flex flex-col gap-4">
      {/* Avatar + meta */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center text-base font-body font-semibold shrink-0',
            avatarClass
          )}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-body font-semibold text-[15px] text-text-primary leading-tight">
            {name}
          </span>
          {role && (
            <span className="font-body text-[13px] text-text-muted">
              {role}
            </span>
          )}
          {/* Stars */}
          <div className="flex items-center gap-0.5 mt-0.5" aria-label={`Valutazione: ${rating} su 5`}>
            {Array.from({ length: rating }).map((_, i) => (
              <Star
                key={i}
                weight="fill"
                size={13}
                className="text-gold"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quote */}
      <p className="font-body text-[16px] text-text-secondary leading-relaxed">
        &ldquo;{text}&rdquo;
      </p>

      {/* Date */}
      <p className="font-mono text-[11px] text-text-muted mt-3">
        {formatDate(date)}
      </p>
    </div>
  )
}
