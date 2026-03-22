import Link from 'next/link'
import { MapPin, Phone, Envelope, Clock, FacebookLogo, InstagramLogo, WhatsappLogo } from '@phosphor-icons/react/dist/ssr'

const SERVICES_LINKS: { label: string; href: string | null; soon?: boolean }[] = [
  { label: 'Noleggio Breve', href: null, soon: true },
  { label: 'Noleggio Lungo Termine', href: null, soon: true },
  { label: 'Vendita Auto', href: '/vendita' },
  { label: 'Permuta', href: '/permuta' },
  { label: 'Finanziamenti', href: '/finanziamenti' },
]

const COMPANY_LINKS = [
  { label: 'Chi Siamo', href: '/chi-siamo' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contatti', href: '/contatti' },
]

export function Footer() {
  return (
    <footer className="bg-bg border-t border-border">
      <div className="container-custom">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="font-display font-extrabold text-2xl text-text-primary hover:text-accent transition-colors"
              aria-label="Daunia Cars homepage"
            >
              DAUNIA CARS
            </Link>
            <p className="font-body text-sm text-text-secondary leading-relaxed">
              Vendita auto a Parma. Nati dalla passione di due ragazzi, in crescita ogni giorno.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Daunia Cars su Facebook"
                className="flex items-center justify-center w-11 h-11 rounded-full text-text-muted hover:text-text-primary hover:bg-surface-2 transition-all"
              >
                <FacebookLogo size={22} weight="fill" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Daunia Cars su Instagram"
                className="flex items-center justify-center w-11 h-11 rounded-full text-text-muted hover:text-text-primary hover:bg-surface-2 transition-all"
              >
                <InstagramLogo size={22} weight="fill" aria-hidden="true" />
              </a>
              <a
                href="https://wa.me/390521000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Daunia Cars su WhatsApp"
                className="flex items-center justify-center w-11 h-11 rounded-full text-text-muted hover:text-text-primary hover:bg-surface-2 transition-all"
              >
                <WhatsappLogo size={22} weight="fill" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Col 2 — Servizi */}
          <div className="flex flex-col gap-4">
            <h3 className="font-body font-semibold text-xs uppercase tracking-[0.1em] text-text-muted">
              Servizi
            </h3>
            <ul className="flex flex-col gap-2.5">
              {SERVICES_LINKS.map((link) => (
                <li key={link.label} className="flex items-center gap-2">
                  {link.soon ? (
                    <span className="font-body text-sm text-text-muted opacity-50">
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      href={link.href!}
                      className="font-body text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  )}
                  {link.soon && (
                    <span className="font-mono text-[9px] uppercase tracking-wider bg-accent/10 text-accent border border-accent/20 px-1.5 py-0.5 rounded-full leading-none">
                      Presto
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Azienda */}
          <div className="flex flex-col gap-4">
            <h3 className="font-body font-semibold text-xs uppercase tracking-[0.1em] text-text-muted">
              Azienda
            </h3>
            <ul className="flex flex-col gap-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contatti */}
          <div className="flex flex-col gap-4">
            <h3 className="font-body font-semibold text-xs uppercase tracking-[0.1em] text-text-muted">
              Contatti
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} weight="regular" className="text-accent mt-0.5 shrink-0" aria-hidden="true" />
                <span className="font-body text-sm text-text-secondary">
                  Strada Langhirano 264/1, Parma
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} weight="regular" className="text-accent shrink-0" aria-hidden="true" />
                <a
                  href="tel:+390521000000"
                  className="font-mono text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  +39 0521 000000
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Envelope size={16} weight="regular" className="text-accent shrink-0" aria-hidden="true" />
                <a
                  href="mailto:info@dauniacars.it"
                  className="font-body text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  info@dauniacars.it
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={16} weight="regular" className="text-accent mt-0.5 shrink-0" aria-hidden="true" />
                <span className="font-body text-sm text-text-secondary">Lun–Sab 9:00–19:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          {/* Sistema operativo */}
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="w-2 h-2 rounded-full bg-green-500 animate-pulse"
            />
            <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider">
              Sistema Operativo
            </span>
          </div>

          <p className="font-mono text-[11px] text-text-muted order-last sm:order-none">
            &copy; {new Date().getFullYear()} Daunia Cars S.r.l. &middot; P.IVA IT00000000000
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="font-body text-xs text-text-muted hover:text-text-secondary transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-border">&middot;</span>
            <Link
              href="/cookie-policy"
              className="font-body text-xs text-text-muted hover:text-text-secondary transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
