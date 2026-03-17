import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Daunia Cars',
    short_name: 'Daunia Cars',
    description: 'Noleggio e vendita auto a Parma',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090D',
    theme_color: '#C41C0C',
    orientation: 'portrait',
    icons: [
      {
        src: '/api/icon/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/api/icon/512',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/api/icon/512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
