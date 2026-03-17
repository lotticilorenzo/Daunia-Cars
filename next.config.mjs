/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Placeholder images durante sviluppo (picsum.photos)
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
      },
      // Aggiungere qui i domini dei CDN reali quando disponibili
      // es: { protocol: 'https', hostname: 'cdn.dauniacars.it' }
    ],
  },
}

export default nextConfig
