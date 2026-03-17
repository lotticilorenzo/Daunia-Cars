import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds — micro tinta blu (crea profondità, rosso pop di più per contrasto)
        bg:          '#09090D',
        surface:     '#111118',
        'surface-2': '#1A1A26',
        border:      '#252538',

        // Accent principale — Rosso Italiano
        // #C41C0C: tra Alfa Romeo Rosso e Ferrari Rosso Corsa
        // Legge come "rosso" non "arancio" — DNA Emilia-Romagna motorsport
        accent:        '#C41C0C',
        'accent-dark': '#961408',

        // Accent secondario — Oro Emiliano
        // Solo per badge premium, stelle, highlight di lusso
        gold: '#C4963A',

        // Silver — freddo-blu, coerente col system
        chrome: '#A8B2C2',

        // Testo
        'text-primary':   '#F2EEE6',
        'text-secondary': '#888898',
        'text-muted':     '#4A4A5C',
      },
      fontFamily: {
        display: ['var(--font-barlow-condensed)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      fontSize: {
        'display-hero': ['clamp(4rem, 10vw, 7.5rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'h1': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1' }],
        'h2': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.05' }],
        'h3': ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.2' }],
      },
      maxWidth: {
        container: '1400px',
        prose: '65ch',
      },
      spacing: {
        section: 'clamp(4rem, 10vw, 10rem)',
      },
      backgroundImage: {
        'accent-glow': 'radial-gradient(ellipse at center, rgba(196, 28, 12, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        accent:      '0 4px 24px rgba(196, 28, 12, 0.14)',
        'accent-lg': '0 8px 40px rgba(196, 28, 12, 0.22)',
        card:        '0 1px 3px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.35)',
        gold:        '0 4px 20px rgba(196, 150, 58, 0.18)',
      },
      borderRadius: {
        card: '10px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'fade-up': 'fade-up 0.5s ease forwards',
        shimmer: 'shimmer 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
