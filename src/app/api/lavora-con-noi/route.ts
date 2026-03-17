import { NextRequest, NextResponse } from 'next/server'
import { jobApplicationSchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const fields = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      position: (formData.get('position') as string) || undefined,
      coverLetter: formData.get('coverLetter') as string,
      privacyConsent: formData.get('privacyConsent') === 'true',
    }

    const parsed = jobApplicationSchema.safeParse(fields)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dati non validi', details: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const cv = formData.get('cv') as File | null
    if (cv && cv.size > 0) {
      const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowed.includes(cv.type)) {
        return NextResponse.json(
          { error: 'Formato curriculum non supportato. Usa PDF, DOC o DOCX.' },
          { status: 400 },
        )
      }
      if (cv.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Il curriculum non può superare 5 MB.' },
          { status: 400 },
        )
      }
    }

    // TODO: configurare invio email con allegato CV
    // await sendJobApplicationEmail({ ...parsed.data, cv })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Errore del server' }, { status: 500 })
  }
}
