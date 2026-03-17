'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[ErrorBoundary]', error)
  }, [error])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-bg px-6 text-center">
      <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-accent mb-4">
        Errore imprevisto
      </p>
      <h1 className="font-display font-black text-[clamp(2rem,8vw,4rem)] leading-tight text-text-primary mb-4">
        Qualcosa è andato storto
      </h1>
      <p className="font-body text-lg text-text-secondary max-w-md mb-10">
        Si è verificato un errore inaspettato. Puoi riprovare o tornare alla homepage.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-white font-body font-medium rounded-card hover:bg-accent-dark transition-colors"
        >
          Riprova
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3.5 border border-border text-text-primary font-body font-medium rounded-card hover:border-accent/50 transition-colors"
        >
          Torna alla Home
        </Link>
      </div>
    </main>
  )
}
