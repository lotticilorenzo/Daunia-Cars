export function CtaSection() {
  return (
    <section className="relative bg-accent py-20 overflow-hidden">
      {/* Texture grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="container-custom relative z-10 flex flex-col items-center text-center gap-4">
        <h2 className="font-display font-extrabold text-[clamp(2.5rem,7vw,5.5rem)] text-white tracking-tight leading-none">
          Pronto a partire?
        </h2>
        <p className="font-body text-[18px] text-white/80 mt-2">
          Parla con noi oggi. Risposta entro 24 ore.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-5 mt-8">
          <a
            href="/contatti"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-accent font-body font-semibold text-base hover:bg-white/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Prenota un appuntamento"
          >
            Prenota Ora
          </a>
          <a
            href="tel:[PHONE]"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white text-white font-body font-semibold text-base hover:bg-white/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Chiama Daunia Cars"
          >
            Chiama Ora
          </a>
        </div>
      </div>
    </section>
  )
}
