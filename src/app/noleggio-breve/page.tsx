import type { Metadata } from 'next'
import { ComingSoonPage } from '@/components/ui/ComingSoonPage'

export const metadata: Metadata = {
  title: 'Noleggio Breve Termine — Prossimamente | Daunia Cars',
  description:
    'Il servizio di noleggio breve termine di Daunia Cars è in arrivo. Torna presto o contattaci per maggiori informazioni.',
  robots: { index: false, follow: false },
}

export default function NoleggioBreve() {
  return (
    <ComingSoonPage
      service="Noleggio Breve Termine"
      description="Da 1 a 30 giorni, assicurazione inclusa. Stiamo preparando tutto per offrirtelo al meglio."
    />
  )
}
