import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') ?? 'Daunia Cars'
  const subtitle = searchParams.get('sub') ?? 'Noleggio e Vendita Auto a Parma'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          background: '#0C0C0E',
          padding: '64px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(ellipse 60% 60% at 80% 20%, rgba(196,28,12,0.15) 0%, transparent 60%)',
          }}
        />

        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#C41C0C',
          }}
        />

        {/* Brand */}
        <div
          style={{
            position: 'absolute',
            top: '48px',
            left: '80px',
            fontWeight: 900,
            fontSize: '18px',
            color: 'rgba(240,238,232,0.5)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          DAUNIA CARS
        </div>

        {/* Accent dot */}
        <div
          style={{
            width: '48px',
            height: '4px',
            background: '#C41C0C',
            borderRadius: '2px',
            marginBottom: '20px',
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 30 ? '52px' : '68px',
            fontWeight: 900,
            color: '#F0EEE8',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            maxWidth: '880px',
            marginBottom: '20px',
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '22px',
            color: 'rgba(240,238,232,0.55)',
            fontWeight: 400,
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
