import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Cookie Policy | Daunia Cars',
  description: 'Informativa sull\'utilizzo dei cookie sul sito Daunia Cars, ai sensi del Provvedimento del Garante Privacy.',
  canonicalPath: '/cookie-policy',
  noIndex: true,
})

const LAST_UPDATED = '17 marzo 2025'

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-bg pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-accent mb-4">
          Cookie Policy
        </p>
        <h1 className="font-display font-black text-h1 text-text-primary mb-2">
          Cookie Policy
        </h1>
        <p className="font-body text-sm text-text-muted mb-12">
          Ultimo aggiornamento: {LAST_UPDATED}
        </p>

        <div className="space-y-10 font-body text-text-secondary leading-relaxed">

          <section>
            <h2 className="font-display font-bold text-xl text-text-primary mb-3">Cosa sono i cookie?</h2>
            <p>
              I cookie sono piccoli file di testo che i siti web visitati dall&apos;utente inviano al
              proprio terminale (computer, tablet, smartphone), dove vengono memorizzati per essere
              poi ritrasmessi agli stessi siti alla visita successiva.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text-primary mb-3">Cookie utilizzati su questo sito</h2>

            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-body font-semibold text-sm text-text-primary">Nome</th>
                    <th className="text-left py-3 pr-4 font-body font-semibold text-sm text-text-primary">Tipo</th>
                    <th className="text-left py-3 pr-4 font-body font-semibold text-sm text-text-primary">Finalità</th>
                    <th className="text-left py-3 font-body font-semibold text-sm text-text-primary">Durata</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 text-text-primary font-mono text-[12px]">dc_loading_seen</td>
                    <td className="py-3 pr-4">Tecnico</td>
                    <td className="py-3 pr-4">Evita di mostrare la schermata di caricamento ad ogni visita</td>
                    <td className="py-3">Sessione</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 text-text-primary font-mono text-[12px]">dc_wishlist</td>
                    <td className="py-3 pr-4">Funzionale</td>
                    <td className="py-3 pr-4">Memorizza i veicoli salvati nei preferiti (localStorage)</td>
                    <td className="py-3">Persistente</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 text-text-primary font-mono text-[12px]">dc_compare</td>
                    <td className="py-3 pr-4">Funzionale</td>
                    <td className="py-3 pr-4">Memorizza i veicoli in confronto (localStorage)</td>
                    <td className="py-3">Persistente</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-text-muted">
              Questo sito <strong className="text-text-primary">non utilizza cookie di profilazione</strong> né
              trasmette dati a piattaforme pubblicitarie di terze parti.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text-primary mb-3">Cookie tecnici</h2>
            <p>
              I cookie tecnici sono necessari al corretto funzionamento del sito e non richiedono
              il consenso dell&apos;utente ai sensi dell&apos;Art. 122 del Codice Privacy e del
              Provvedimento del Garante dell&apos;8 maggio 2014.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text-primary mb-3">Come disabilitare i cookie</h2>
            <p>
              Puoi gestire o disabilitare i cookie tramite le impostazioni del tuo browser:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Apple Safari</a></li>
              <li><a href="https://support.microsoft.com/it-it/help/17442" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Microsoft Edge</a></li>
            </ul>
            <p className="mt-3">
              La disabilitazione dei cookie tecnici potrebbe compromettere il corretto funzionamento
              di alcune funzionalità del sito (es. wishlist, confronto veicoli).
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text-primary mb-3">Contatti</h2>
            <p>
              Per qualsiasi informazione relativa alla Cookie Policy, scrivi a{' '}
              <strong className="text-text-primary">info@dauniacars.it</strong> oppure consulta
              la nostra{' '}
              <a href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</a>.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}
