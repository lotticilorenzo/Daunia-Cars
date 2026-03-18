'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, EnvelopeSimple } from '@phosphor-icons/react'
import { blogArticles, type BlogArticle } from '@/data/blog'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'

// ─────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

// ─────────────────────────────────────────────
// ARTICLE CARD COMPONENT
// ─────────────────────────────────────────────

function ArticleCard({
  article,
  index,
}: {
  article: BlogArticle
  index: number
}) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        'group flex flex-col bg-surface rounded-2xl border border-border overflow-hidden',
        'transition-colors duration-300 hover:border-accent/30'
      )}
    >
      {/* Cover image */}
      <div className="relative aspect-video overflow-hidden rounded-xl m-3 mb-0 shrink-0">
        <Image
          src={`https://picsum.photos/seed/${article.slug}/800/450`}
          alt={`Immagine di copertina per l'articolo: ${article.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Category + date row */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full">
            {article.category}
          </span>
          <span className="font-mono text-[11px] text-text-muted">
            {formatDate(article.date)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xl text-text-primary leading-snug tracking-tight">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="font-body text-[14px] text-text-secondary leading-relaxed line-clamp-2 flex-1">
          {article.excerpt}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-2 pt-4 border-t border-border">
          <div className="flex items-center gap-1.5 text-text-muted">
            <Clock size={13} weight="regular" aria-hidden="true" />
            <span className="font-mono text-[11px]">{article.readTime} min</span>
          </div>
          <Link
            href={`/blog/${article.slug}`}
            className={cn(
              'inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider',
              'text-accent transition-colors duration-200 hover:text-accent/80',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded'
            )}
            aria-label={`Leggi l'articolo: ${article.title}`}
          >
            Leggi
            <ArrowRight size={13} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

// ─────────────────────────────────────────────
// NEWSLETTER CTA
// ─────────────────────────────────────────────

function NewsletterCta() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className="bg-surface-2 py-[80px]">
      <div className="container-custom">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className={cn(
            'max-w-[680px] mx-auto text-center',
            'bg-surface rounded-2xl border border-accent/20 px-8 py-12',
            'shadow-accent'
          )}
        >
          {/* Icon */}
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 mb-6"
            aria-hidden="true"
          >
            <EnvelopeSimple size={28} weight="fill" className="text-accent" />
          </div>

          {/* Text */}
          <h2
            className="font-display font-extrabold text-text-primary leading-tight tracking-tight mb-3"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            Rimani aggiornato
          </h2>
          <p className="font-body text-[16px] text-text-secondary leading-relaxed mb-8 max-w-[42ch] mx-auto">
            Ricevi consigli e offerte direttamente nella tua casella email.
          </p>

          {/* Form or success */}
          {submitted ? (
            <motion.p
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.4 }}
              className="font-body text-[15px] text-accent font-medium"
              role="status"
              aria-live="polite"
            >
              Grazie! Ti contatteremo presto.
            </motion.p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-[420px] mx-auto"
              noValidate
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Il tuo indirizzo email
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="la.tua@email.it"
                required
                className={cn(
                  'flex-1 bg-surface-2 border border-border rounded-xl px-4 py-3',
                  'font-body text-[15px] text-text-primary placeholder:text-text-muted',
                  'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
                  'transition-colors duration-200'
                )}
                aria-label="Il tuo indirizzo email"
              />
              <button
                type="submit"
                className={cn(
                  'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl',
                  'bg-accent text-white font-display font-bold text-[15px] tracking-wide',
                  'transition-colors duration-200 hover:bg-accent-dark',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
                  'whitespace-nowrap'
                )}
              >
                Iscriviti
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

export function BlogClient() {
  const articles: BlogArticle[] = blogArticles
  const featuredArticle = articles[0]
  const gridArticles = articles.slice(1)

  return (
    <>
      {/* ── Sezione 1: Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-bg pt-24 pb-20 overflow-hidden">
        {/* Decorative blob */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 w-[700px] h-[400px] rounded-full bg-accent/5 blur-[180px] pointer-events-none -translate-x-1/2 -translate-y-1/3"
        />

        <div className="container-custom relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-[11px] text-accent uppercase tracking-wider mb-5"
          >
            Blog &amp; Consigli
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-display font-extrabold leading-none tracking-tight mb-6 text-text-primary"
            style={{ fontSize: 'clamp(2.75rem, 8vw, 7rem)' }}
          >
            Il nostro blog
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="font-body text-[15px] sm:text-[18px] text-text-secondary max-w-[55ch] leading-relaxed"
          >
            Approfondimenti, consigli pratici e novità dal mondo automotive parmense.
          </motion.p>
        </div>
      </section>

      {/* ── Sezione 2: Articolo in evidenza ─────────────────────────────── */}
      <section className="bg-surface-2 py-[80px]">
        <div className="container-custom">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-mono text-[11px] text-accent uppercase tracking-wider mb-8"
          >
            In evidenza
          </motion.p>

          <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className={cn(
              'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center',
              'bg-surface rounded-2xl border border-border overflow-hidden p-6 lg:p-0',
              'transition-colors duration-300 hover:border-accent/30'
            )}
          >
            {/* Left: Cover image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden lg:rounded-none lg:aspect-auto lg:self-stretch">
              <Image
                src={`https://picsum.photos/seed/${featuredArticle.slug}/800/450`}
                alt={`Immagine di copertina per l'articolo in evidenza: ${featuredArticle.title}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Right: Content */}
            <div className="flex flex-col gap-5 lg:pr-10 lg:py-10">
              {/* Category + date */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full">
                  {featuredArticle.category}
                </span>
                <span className="font-mono text-[12px] text-text-muted">
                  {formatDate(featuredArticle.date)}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[12px] text-text-muted">
                  <Clock size={13} weight="regular" aria-hidden="true" />
                  {featuredArticle.readTime} min
                </span>
              </div>

              {/* Title */}
              <h2
                className="font-display font-extrabold text-text-primary leading-tight tracking-tight"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
              >
                {featuredArticle.title}
              </h2>

              {/* Excerpt */}
              <p className="font-body text-[16px] text-text-secondary leading-relaxed">
                {featuredArticle.excerpt}
              </p>

              {/* CTA */}
              <Link
                href={`/blog/${featuredArticle.slug}`}
                className={cn(
                  'inline-flex items-center gap-2 self-start',
                  'font-display font-bold text-[16px] text-accent',
                  'border-b border-accent/40 pb-0.5',
                  'transition-colors duration-200 hover:text-accent/80 hover:border-accent/60',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded'
                )}
                aria-label={`Leggi l'articolo completo: ${featuredArticle.title}`}
              >
                Leggi l&apos;articolo
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </Link>
            </div>
          </motion.article>
        </div>
      </section>

      {/* ── Sezione 3: Griglia articoli ─────────────────────────────────── */}
      <section className="bg-bg py-[100px]">
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="font-mono text-[11px] text-accent uppercase tracking-wider mb-3">
              Tutti gli articoli
            </p>
            <h2
              className="font-display font-extrabold text-text-primary leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Leggi, impara, scegli meglio.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridArticles.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Sezione 4: Newsletter CTA ────────────────────────────────────── */}
      <NewsletterCta />
    </>
  )
}
