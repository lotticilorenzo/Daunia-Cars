import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { BlogClient } from './BlogClient'

export const metadata: Metadata = buildMetadata({
  title: 'Blog & Consigli Auto | Daunia Cars',
  description:
    'Consigli pratici su noleggio auto, finanziamenti e acquisto veicoli usati a Parma. Aggiornamenti dal mondo automotive.',
  canonicalPath: '/blog',
})

export default function BlogPage() {
  return <BlogClient />
}
