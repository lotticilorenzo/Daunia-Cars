import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(
  _req: NextRequest,
  { params }: { params: { size: string } }
) {
  const dimension = params.size === '512' ? 512 : 192
  const fontSize = params.size === '512' ? 180 : 68
  const barWidth = params.size === '512' ? 140 : 52
  const radius = params.size === '512' ? 110 : 42

  return new ImageResponse(
    (
      <div
        style={{
          width: dimension,
          height: dimension,
          background: '#0C0C0E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: radius,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'sans-serif',
              fontWeight: 900,
              fontSize,
              color: '#F0EEE8',
              letterSpacing: '-4px',
              lineHeight: 1,
            }}
          >
            DC
          </div>
          <div
            style={{
              width: barWidth,
              height: 6,
              background: '#C41C0C',
              borderRadius: 3,
              marginTop: 12,
            }}
          />
        </div>
      </div>
    ),
    { width: dimension, height: dimension }
  )
}
