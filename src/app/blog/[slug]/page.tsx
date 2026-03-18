import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { blogArticles, type BlogSection } from '@/data/blog'
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo'
import { formatDate } from '@/lib/utils'
import { Clock, ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr'

// ─────────────────────────────────────────────
// STATIC PARAMS
// ─────────────────────────────────────────────

export function generateStaticParams() {
  return blogArticles.map((a) => ({ slug: a.slug }))
}

// ─────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = blogArticles.find((a) => a.slug === slug)
  if (!article) return {}

  return buildMetadata({
    title: `${article.title} | Daunia Cars Blog`,
    description: article.excerpt,
    canonicalPath: `/blog/${article.slug}`,
    ogImage: article.image,
  })
}

// ─────────────────────────────────────────────
// BODY RENDERER
// ─────────────────────────────────────────────

function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case 'intro':
      return (
        <p className="font-body text-[16px] sm:text-[18px] text-text-secondary leading-relaxed border-l-2 border-accent pl-4 sm:pl-5 py-1">
          {section.text}
        </p>
      )
    case 'h2':
      return (
        <h2 className="font-display font-bold text-[1.5rem] text-text-primary mt-10 mb-2">
          {section.text}
        </h2>
      )
    case 'p':
      return (
        <p className="font-body text-[16px] text-text-secondary leading-relaxed">
          {section.text}
        </p>
      )
    case 'ul':
      return (
        <ul className="space-y-2 my-1">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 font-body text-[15px] text-text-secondary">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'callout':
      return (
        <div className="bg-accent/5 border border-accent/20 rounded-xl px-6 py-4 my-2">
          <p className="font-body text-[15px] text-text-secondary leading-relaxed">
            {section.text}
          </p>
        </div>
      )
    case 'cta':
      return (
        <div className="bg-surface border border-border rounded-2xl px-6 py-8 text-center my-4">
          <p className="font-body text-[16px] text-text-secondary mb-5">{section.text}</p>
          <Link
            href={section.href}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white font-body font-medium rounded-card hover:bg-accent-dark transition-colors"
          >
            {section.label}
            <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      )
    default:
      return null
  }
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = blogArticles.find((a) => a.slug === slug)
  if (!article) notFound()

  const currentIndex = blogArticles.findIndex((a) => a.slug === slug)
  const prevArticle = currentIndex > 0 ? blogArticles[currentIndex - 1] : null
  const nextArticle = currentIndex < blogArticles.length - 1 ? blogArticles[currentIndex + 1] : null

  const jsonLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: article.title, path: `/blog/${article.slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-bg">

        {/* ── Hero immagine ── */}
        <div className="relative h-[50vh] min-h-[320px] max-h-[520px] overflow-hidden">
          <Image
            src={article.image}
            alt={`Immagine di copertina: ${article.title}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        </div>

        {/* ── Contenuto ── */}
        <div className="container-custom max-w-[780px] -mt-20 relative z-10 pb-24">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-[12px] text-text-muted hover:text-accent transition-colors uppercase tracking-wider"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Tutti gli articoli
            </Link>
          </nav>

          {/* Meta */}
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full">
              {article.category}
            </span>
            <span className="font-mono text-[12px] text-text-muted">{formatDate(article.date)}</span>
            <span className="flex items-center gap-1.5 font-mono text-[12px] text-text-muted">
              <Clock size={13} weight="regular" aria-hidden="true" />
              {article.readTime} min di lettura
            </span>
          </div>

          {/* Titolo */}
          <h1
            className="font-display font-black text-text-primary leading-tight tracking-tight mb-10"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            {article.title}
          </h1>

          {/* Body */}
          <div className="space-y-6">
            {article.body.map((section, i) => (
              <RenderSection key={i} section={section} />
            ))}
          </div>

          {/* ── Divider ── */}
          <div className="border-t border-border mt-16 pt-12">
            <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted mb-8">
              Continua a leggere
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevArticle && (
                <Link
                  href={`/blog/${prevArticle.slug}`}
                  className="flex flex-col gap-2 p-5 bg-surface border border-border rounded-xl hover:border-accent/30 transition-colors group"
                >
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted uppercase tracking-wider">
                    <ArrowLeft size={12} aria-hidden="true" />
                    Precedente
                  </span>
                  <p className="font-body font-semibold text-[14px] text-text-primary group-hover:text-accent transition-colors leading-snug">
                    {prevArticle.title}
                  </p>
                </Link>
              )}
              {nextArticle && (
                <Link
                  href={`/blog/${nextArticle.slug}`}
                  className="flex flex-col gap-2 p-5 bg-surface border border-border rounded-xl hover:border-accent/30 transition-colors group sm:text-right sm:items-end"
                >
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted uppercase tracking-wider">
                    Successivo
                    <ArrowRight size={12} aria-hidden="true" />
                  </span>
                  <p className="font-body font-semibold text-[14px] text-text-primary group-hover:text-accent transition-colors leading-snug">
                    {nextArticle.title}
                  </p>
                </Link>
              )}
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
