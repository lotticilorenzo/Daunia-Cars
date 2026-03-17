import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Privacy Policy | Daunia Cars',
  description: 'Informativa sul trattamento dei dati personali di Daunia Cars, ai sensi del Regolamento UE 2016/679 (GDPR).',
  canonicalPath: '/privacy-policy',
  noIndex: true,
})

const LAST_UPDATED = '17 marzo 2025'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-bg pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-accent mb-4">
          Informativa Privacy
        </p>
        <h1 className="font-display font-black text-h1 text-text-primary mb-2">
          Privacy Policy
        </h1>
        <p className="font-body text-sm text-text-muted mb-12">
          Ultimo aggiornamento: {LAST_UPDATED}
        </p>

        <div className="prose-custom space-y-10 font-body text-text-secondary leading-relaxed">

          <section>
            <h2 className="font-display font-bold text-xl text-text-primary mb-3">1. Titolare del trattamento</h2>
            <p>
              Il Titolare del trattamento dei dati personali è <strong className="text-text-primary">Daunia Cars</strong>,
              con sede in Strada Langhirano 264/1, 43124 Parma (PR), Italia.
            </p>
            <p className="mt-2">
              Per esercitare i tuoi diritti o per qualsiasi richiesta relativa al trattamento dei tuoi dati,
              puoi contattarci all&apos;indirizzo email: <strong className="text-text-primary">info@dauniacars.it</strong>
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text-primary mb-3">2. Dati raccolti</h2>
            <p>Raccogliamo i seguenti dati personali:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Nome e cognome</li>
              <li>Indirizzo email</li>
              <li>Numero di telefono</li>
              <li>Dati relativi al veicolo in permuta (marca, modello, anno, chilometraggio)</li>
              <li>Messaggi e comunicazioni inviate tramite il modulo di contatto</li>
              <li>Dati di navigazione (indirizzo IP, browser, pagine visitate) tramite cookie tecnici</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text-primary mb-3">3. Finalità del trattamento</h2>
            <p>I tuoi dati vengono trattati per le seguenti finalità:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong className="text-text-primary">Gestione delle richieste:</strong> rispondere alle tue richieste di informazioni, preventivi e prenotazioni</li>
              <li><strong className="text-text-primary">Valutazione permuta:</strong> elaborare la tua richiesta di valutazione del veicolo</li>
              <li><strong className="text-text-primary">Adempimenti contrattuali:</strong> esecuzione del contratto di noleggio o vendita</li>
              <li><strong className="text-text-primary">Obblighi di legge:</strong> adempimento degli obblighi fiscali e normativi</li>
              <li><strong className="text-text-primary">Newsletter (solo con consenso):</strong> invio di comunicazioni commerciali e offerte</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text-primary mb-3">4. Base giuridica</h2>
            <p>Il trattamento si fonda su:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Consenso esplicito dell&apos;interessato (Art. 6, par. 1, lett. a GDPR)</li>
              <li>Esecuzione di un contratto o misure precontrattuali (Art. 6, par. 1, lett. b GDPR)</li>
              <li>Obbligo di legge (Art. 6, par. 1, lett. c GDPR)</li>
              <li>Legittimo interesse del Titolare (Art. 6, par. 1, lett. f GDPR)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text-primary mb-3">5. Conservazione dei dati</h2>
            <p>
              I dati raccolti tramite i moduli di contatto sono conservati per il tempo necessario
              a soddisfare la tua richiesta e, successivamente, per un periodo non superiore a
              <strong className="text-text-primary"> 24 mesi</strong> per finalità di archivio.
              I dati relativi a contratti stipulati sono conservati per <strong className="text-text-primary">10 anni</strong> in
              ottemperanza agli obblighi fiscali.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text-primary mb-3">6. Comunicazione a terzi</h2>
            <p>
              I tuoi dati non vengono venduti a terzi. Possono essere comunicati esclusivamente a:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Fornitori di servizi tecnici (hosting, email) che agiscono come responsabili del trattamento</li>
              <li>Istituti di credito e finanziatori per la gestione dei finanziamenti (previo consenso)</li>
              <li>Autorità competenti ove richiesto dalla legge</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text-primary mb-3">7. I tuoi diritti</h2>
            <p>Ai sensi del GDPR, hai il diritto di:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Accedere ai tuoi dati personali</li>
              <li>Rettificare dati inesatti o incompleti</li>
              <li>Richiedere la cancellazione (&ldquo;diritto all&apos;oblio&rdquo;)</li>
              <li>Limitare il trattamento</li>
              <li>Portabilità dei dati</li>
              <li>Opporsi al trattamento per finalità di marketing</li>
              <li>Revocare il consenso in qualsiasi momento</li>
            </ul>
            <p className="mt-3">
              Per esercitare questi diritti scrivi a{' '}
              <strong className="text-text-primary">info@dauniacars.it</strong>.
              Hai inoltre il diritto di proporre reclamo all&apos;Autorità Garante per la protezione
              dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.garanteprivacy.it</a>).
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text-primary mb-3">8. Cookie</h2>
            <p>
              Per informazioni sull&apos;utilizzo dei cookie, consulta la nostra{' '}
              <a href="/cookie-policy" className="text-accent hover:underline">Cookie Policy</a>.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}
