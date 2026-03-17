import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

// ─── Schema validazione ───────────────────────────────────────────────────────

const ContactPayloadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  service: z.string().min(1),
  message: z.string().optional(),
  vehiclePreference: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  notes: z.string().optional(),
  privacyConsent: z.boolean(),
  formType: z.enum(['contact', 'rental', 'tradeIn']).default('contact'),
})

type ContactPayload = z.infer<typeof ContactPayloadSchema>

// ─── Email transport ──────────────────────────────────────────────────────────

function createTransport() {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  // Se le variabili SMTP non sono configurate, usa un transport di test
  // che logga l'email senza inviarla (utile in sviluppo)
  if (!host || !user || !pass) {
    return nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      ignoreTLS: true,
    })
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

// ─── XSS sanitization ─────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// ─── Email template ───────────────────────────────────────────────────────────

function buildEmailHtml(data: ContactPayload): string {
  const SERVICE_LABELS: Record<string, string> = {
    'noleggio-breve': 'Noleggio Breve',
    'noleggio-lungo': 'Noleggio Lungo Termine',
    vendita: 'Acquisto Veicolo',
    permuta: 'Permuta',
    finanziamento: 'Finanziamento',
    generale: 'Informazioni Generali',
  }

  const rows = [
    ['Nome', escapeHtml(`${data.firstName} ${data.lastName}`)],
    ['Email', escapeHtml(data.email)],
    ['Telefono', escapeHtml(data.phone)],
    ['Servizio', escapeHtml(SERVICE_LABELS[data.service] ?? data.service)],
    data.vehiclePreference ? ['Veicolo preferito', escapeHtml(data.vehiclePreference)] : null,
    data.startDate ? ['Data inizio', escapeHtml(data.startDate)] : null,
    data.endDate ? ['Data fine', escapeHtml(data.endDate)] : null,
    data.message ? ['Messaggio', escapeHtml(data.message)] : null,
    data.notes ? ['Note', escapeHtml(data.notes)] : null,
  ].filter(Boolean) as [string, string][]

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;background:#1C1C20;color:#8A8A96;font-size:12px;width:140px;border-bottom:1px solid #2A2A30">${label}</td>
        <td style="padding:8px 12px;background:#141416;color:#F0EEE8;font-size:13px;border-bottom:1px solid #2A2A30">${value}</td>
      </tr>`
    )
    .join('')

  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><title>Nuova Richiesta — Daunia Cars</title></head>
<body style="margin:0;padding:0;background:#0C0C0E;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:32px 16px">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#141416;border-radius:12px;overflow:hidden;border:1px solid #2A2A30">
          <!-- Header -->
          <tr>
            <td style="background:#141416;padding:24px 32px;border-bottom:3px solid #C41C0C">
              <span style="font-size:22px;font-weight:900;color:#F0EEE8;letter-spacing:-0.5px">DAUNIA CARS</span>
              <span style="display:block;font-size:11px;color:#8A8A96;margin-top:4px;text-transform:uppercase;letter-spacing:2px">Nuova richiesta dal sito</span>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:24px 32px">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #2A2A30">
                ${tableRows}
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;background:#0C0C0E;border-top:1px solid #2A2A30">
              <span style="font-size:11px;color:#52525C">Inviato da dauniacars.it · ${new Date().toLocaleString('it-IT')}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: unknown = await req.json()
    const parsed = ContactPayloadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dati non validi', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data

    if (!data.privacyConsent) {
      return NextResponse.json(
        { error: 'Consenso privacy obbligatorio' },
        { status: 400 }
      )
    }

    const toEmail = process.env.CONTACT_EMAIL ?? 'info@dauniacars.it'
    const fromEmail = process.env.SMTP_FROM ?? 'noreply@dauniacars.it'

    const transport = createTransport()

    await transport.sendMail({
      from: `"Daunia Cars Sito" <${fromEmail}>`,
      to: toEmail,
      replyTo: data.email,
      subject: `Nuova richiesta: ${data.firstName} ${data.lastName} — ${data.service}`,
      html: buildEmailHtml(data),
      text: `Nuova richiesta da ${data.firstName} ${data.lastName} (${data.email}) — Servizio: ${data.service}`,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[/api/contact] Errore invio email:', err)
    return NextResponse.json(
      { error: 'Errore durante l\'invio. Riprova o contattaci direttamente.' },
      { status: 500 }
    )
  }
}
