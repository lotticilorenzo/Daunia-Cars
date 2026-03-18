import type { Metadata, Viewport } from 'next'
import { Barlow_Condensed, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { WhatsAppFAB } from '@/components/ui/WhatsAppFAB'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { PageTransition } from '@/components/ui/PageTransition'
import { ToastProvider } from '@/components/ui/Toast'
import { CompareBar } from '@/components/ui/CompareBar'
import { ChatbotWidget } from '@/components/ui/ChatbotWidget'
import './globals.css'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-barlow-condensed',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-dm-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const viewport: Viewport = {
  themeColor: '#C41C0C',
  colorScheme: 'dark',
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: {
    template: '%s | Daunia Cars',
    default: 'Daunia Cars — Noleggio e Vendita Auto a Parma',
  },
  description:
    'Daunia Cars: noleggio breve e lungo termine, vendita veicoli usati garantiti e permuta a Parma. Soluzioni su misura per privati e aziende.',
  metadataBase: new URL('https://www.dauniacars.it'),
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Daunia Cars',
  },
  openGraph: {
    siteName: 'Daunia Cars',
    locale: 'it_IT',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="it"
      className={`${barlowCondensed.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body bg-bg text-text-primary antialiased">
        {/* Loading screen — prima di tutto */}
        <LoadingScreen />

        {/* Smooth scroll (Lenis + GSAP ScrollTrigger sync) */}
        <SmoothScrollProvider>
          {/* Toast notifications */}
          <ToastProvider>
            {/* Custom cursor desktop */}
            <CustomCursor />

            {/* Page transition curtain */}
            <PageTransition />

            {/* Global UI */}
            <ScrollProgress />
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppFAB />
            <CookieBanner />
            <CompareBar />
            <ChatbotWidget />
          </ToastProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
