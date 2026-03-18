import type { Metadata } from 'next'
import { ComingSoonPage } from '@/components/ui/ComingSoonPage'

export const metadata: Metadata = {
  title: 'Noleggio Lungo Termine — Prossimamente | Daunia Cars',
  description:
    'Il servizio di noleggio lungo termine (NLT) di Daunia Cars è in arrivo. Canone fisso all-inclusive per privati e aziende.',
  robots: { index: false, follow: false },
}

export default function NoleggioLungo() {
  return (
    <ComingSoonPage
      service="Noleggio Lungo Termine"
      description="Canone fisso all-inclusive da 12 a 48 mesi, per privati e aziende. Presto disponibile."
    />
  )
}
