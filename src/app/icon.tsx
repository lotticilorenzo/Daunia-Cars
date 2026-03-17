import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#0C0C0E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
        }}
      >
        <div
          style={{
            fontFamily: 'sans-serif',
            fontWeight: 900,
            fontSize: 14,
            color: '#C41C0C',
            letterSpacing: '-0.5px',
          }}
        >
          DC
        </div>
      </div>
    ),
    { ...size }
  )
}
