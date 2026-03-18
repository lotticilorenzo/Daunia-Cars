import type { Metadata } from 'next'
import { ComingSoonPage } from '@/components/ui/ComingSoonPage'

export const metadata: Metadata = {
  title: 'Lavora con Noi — Prossimamente | Daunia Cars',
  description:
    'La sezione "Lavora con noi" di Daunia Cars è in arrivo. Siamo in crescita e presto apriremo le candidature.',
  robots: { index: false, follow: false },
}

export default function LavoraConNoiPage() {
  return (
    <ComingSoonPage
      service="Lavora con Noi"
      description="Siamo in crescita e stiamo costruendo il team. Presto potrai inviarci la tua candidatura."
    />
  )
}
