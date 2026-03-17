import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Pagina non trovata | Daunia Cars',
  description: 'La pagina che cerchi non esiste. Torna alla homepage di Daunia Cars.',
  canonicalPath: '/404',
  noIndex: true,
})

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-bg px-6 text-center">
      <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-accent mb-4">
        Errore 404
      </p>
      <h1 className="font-display font-black text-[clamp(4rem,12vw,8rem)] leading-none text-text-primary mb-4">
        404
      </h1>
      <p className="font-body text-lg text-text-secondary max-w-md mb-10">
        Questa pagina non esiste o è stata spostata. Nessun problema — torna alla home e riparti.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-white font-body font-medium rounded-card hover:bg-accent-dark transition-colors"
        >
          Torna alla Home
        </Link>
        <Link
          href="/flotta"
          className="inline-flex items-center justify-center px-8 py-3.5 border border-border text-text-primary font-body font-medium rounded-card hover:border-accent/50 transition-colors"
        >
          Scopri la Flotta
        </Link>
      </div>

      {/* Decorative number */}
      <div
        aria-hidden="true"
        className="fixed inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ zIndex: -1 }}
      >
        <span className="font-display font-black text-[40vw] text-surface leading-none opacity-30">
          404
        </span>
      </div>
    </main>
  )
}
