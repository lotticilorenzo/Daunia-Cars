import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#0C0C0E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 40,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
          }}
        >
          <div
            style={{
              fontFamily: 'sans-serif',
              fontWeight: 900,
              fontSize: 64,
              color: '#F0EEE8',
              letterSpacing: '-2px',
              lineHeight: 1,
            }}
          >
            DC
          </div>
          <div
            style={{
              width: 48,
              height: 3,
              background: '#C41C0C',
              borderRadius: 2,
              marginTop: 8,
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  )
}
