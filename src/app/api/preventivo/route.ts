import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { NextRequest, NextResponse } from 'next/server'

// ─── Types ────────────────────────────────────────────────────────────────────

interface PreventivoBody {
  vehicleName: string
  brand: string
  model: string
  year: number
  km: number
  priceLabel: string
  priceValue: string
  service: string
  clientName: string
  date: string
}

// ─── Character sanitizer (Helvetica non supporta caratteri non-ASCII) ────────

function sanitize(text: string): string {
  return text
    .replace(/à/g, 'a').replace(/á/g, 'a').replace(/â/g, 'a').replace(/ä/g, 'a')
    .replace(/è/g, 'e').replace(/é/g, 'e').replace(/ê/g, 'e').replace(/ë/g, 'e')
    .replace(/ì/g, 'i').replace(/í/g, 'i').replace(/î/g, 'i').replace(/ï/g, 'i')
    .replace(/ò/g, 'o').replace(/ó/g, 'o').replace(/ô/g, 'o').replace(/ö/g, 'o')
    .replace(/ù/g, 'u').replace(/ú/g, 'u').replace(/û/g, 'u').replace(/ü/g, 'u')
    .replace(/À/g, 'A').replace(/È/g, 'E').replace(/É/g, 'E').replace(/Ì/g, 'I')
    .replace(/Ò/g, 'O').replace(/Ù/g, 'U')
    .replace(/ñ/g, 'n').replace(/ç/g, 'c')
    .replace(/\u2019/g, "'").replace(/\u2018/g, "'")
    .replace(/\u201C/g, '"').replace(/\u201D/g, '"')
    .replace(/[^\x00-\x7E]/g, '')
}

// ─── Color helpers ────────────────────────────────────────────────────────────

// #0C0C0E → rgb(0.047, 0.047, 0.055)
const BG = rgb(0.047, 0.047, 0.055)
// #141416 → rgb(0.078, 0.078, 0.086)
const SURFACE = rgb(0.078, 0.078, 0.086)
// #C41C0C → rgb(0.910, 0.220, 0.051)
const ACCENT = rgb(0.910, 0.220, 0.051)
// #F0EEE8 → rgb(0.941, 0.933, 0.910)
const TEXT_PRIMARY = rgb(0.941, 0.933, 0.910)
// #8A8A96 → rgb(0.541, 0.541, 0.588)
const TEXT_SECONDARY = rgb(0.541, 0.541, 0.588)
// #2A2A30 → rgb(0.165, 0.165, 0.188)
const BORDER = rgb(0.165, 0.165, 0.188)

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: PreventivoBody = await req.json()
    const {
      vehicleName: _vn, brand: _br, model: _mo, year, km,
      priceLabel: _pl, priceValue: _pv, service: _sv, clientName: _cn, date,
    } = body
    // Sanitize all user-supplied strings for Helvetica (Latin-1 only)
    const vehicleName = sanitize(_vn)
    const brand = sanitize(_br)
    const model = sanitize(_mo)
    const priceLabel = sanitize(_pl)
    const priceValue = sanitize(_pv)
    const service = sanitize(_sv)
    const clientName = sanitize(_cn)

    // Validate required fields
    if (!vehicleName || !brand || !model || !clientName) {
      return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 })
    }

    // ── Build PDF ─────────────────────────────────────────────────────────────

    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595, 842]) // A4

    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const { width, height } = page.getSize()

    // Background
    page.drawRectangle({ x: 0, y: 0, width, height, color: BG })

    // ── Header band ───────────────────────────────────────────────────────────

    const HEADER_H = 90
    page.drawRectangle({ x: 0, y: height - HEADER_H, width, height: HEADER_H, color: SURFACE })

    // Accent left bar
    page.drawRectangle({ x: 0, y: height - HEADER_H, width: 4, height: HEADER_H, color: ACCENT })

    // Company name
    page.drawText('DAUNIA CARS', {
      x: 24,
      y: height - 42,
      size: 26,
      font: boldFont,
      color: TEXT_PRIMARY,
    })

    // Subtitle
    page.drawText('Noleggio e Vendita Auto · Parma', {
      x: 24,
      y: height - 62,
      size: 10,
      font: regularFont,
      color: TEXT_SECONDARY,
    })

    // "Preventivo" label (right side)
    page.drawText('PREVENTIVO', {
      x: width - 110,
      y: height - 38,
      size: 18,
      font: boldFont,
      color: ACCENT,
    })

    // Date (right side)
    page.drawText(date, {
      x: width - 110,
      y: height - 58,
      size: 9,
      font: regularFont,
      color: TEXT_SECONDARY,
    })

    // ── Section helper ────────────────────────────────────────────────────────

    let cursor = height - HEADER_H - 32

    const sectionTitle = (label: string, y: number): void => {
      // Accent line
      page.drawRectangle({ x: 24, y: y - 2, width: 32, height: 2, color: ACCENT })
      page.drawText(label.toUpperCase(), {
        x: 24,
        y: y + 6,
        size: 8,
        font: boldFont,
        color: ACCENT,
      })
    }

    const row = (label: string, value: string, y: number): void => {
      page.drawText(label, {
        x: 24,
        y,
        size: 9,
        font: regularFont,
        color: TEXT_SECONDARY,
      })
      page.drawText(value, {
        x: 200,
        y,
        size: 9,
        font: regularFont,
        color: TEXT_PRIMARY,
      })
    }

    // ── Client section ────────────────────────────────────────────────────────

    sectionTitle('Cliente', cursor)
    cursor -= 22

    row('Nome cliente', clientName, cursor)
    cursor -= 16
    row('Data richiesta', date, cursor)
    cursor -= 30

    // Separator line
    page.drawRectangle({ x: 24, y: cursor, width: width - 48, height: 1, color: BORDER })
    cursor -= 24

    // ── Vehicle section ───────────────────────────────────────────────────────

    sectionTitle('Veicolo', cursor)
    cursor -= 22

    // Vehicle name large
    page.drawText(`${brand} ${model}`, {
      x: 24,
      y: cursor,
      size: 18,
      font: boldFont,
      color: TEXT_PRIMARY,
    })
    cursor -= 20

    page.drawText(vehicleName, {
      x: 24,
      y: cursor,
      size: 11,
      font: regularFont,
      color: TEXT_SECONDARY,
    })
    cursor -= 28

    row('Anno immatricolazione', String(year), cursor)
    cursor -= 16
    row('Chilometri', `${new Intl.NumberFormat('it-IT').format(km)} km`, cursor)
    cursor -= 16
    row('Tipo di servizio', service, cursor)
    cursor -= 30

    // Separator
    page.drawRectangle({ x: 24, y: cursor, width: width - 48, height: 1, color: BORDER })
    cursor -= 24

    // ── Price highlight box ───────────────────────────────────────────────────

    const BOX_H = 60
    page.drawRectangle({
      x: 24,
      y: cursor - BOX_H,
      width: width - 48,
      height: BOX_H,
      color: SURFACE,
      borderColor: BORDER,
      borderWidth: 1,
      opacity: 1,
    })

    // Accent left indicator on box
    page.drawRectangle({ x: 24, y: cursor - BOX_H, width: 4, height: BOX_H, color: ACCENT })

    page.drawText(priceLabel, {
      x: 44,
      y: cursor - 24,
      size: 9,
      font: regularFont,
      color: TEXT_SECONDARY,
    })

    page.drawText(priceValue, {
      x: 44,
      y: cursor - 44,
      size: 20,
      font: boldFont,
      color: TEXT_PRIMARY,
    })

    cursor -= BOX_H + 24

    // Separator
    page.drawRectangle({ x: 24, y: cursor, width: width - 48, height: 1, color: BORDER })
    cursor -= 24

    // ── Notes ─────────────────────────────────────────────────────────────────

    page.drawText(
      'Il preventivo ha validità 7 giorni dalla data di emissione.',
      {
        x: 24,
        y: cursor,
        size: 8,
        font: regularFont,
        color: TEXT_SECONDARY,
      }
    )
    cursor -= 14

    page.drawText(
      'I prezzi indicati sono IVA inclusa e soggetti a disponibilità al momento della conferma.',
      {
        x: 24,
        y: cursor,
        size: 8,
        font: regularFont,
        color: TEXT_SECONDARY,
      }
    )

    // ── Footer ────────────────────────────────────────────────────────────────

    const FOOTER_H = 44
    page.drawRectangle({ x: 0, y: 0, width, height: FOOTER_H, color: SURFACE })
    page.drawRectangle({ x: 0, y: FOOTER_H - 1, width, height: 1, color: BORDER })

    const footerY = 15

    page.drawText('Strada Langhirano 264/1, Parma (PR)', {
      x: 24,
      y: footerY,
      size: 8,
      font: regularFont,
      color: TEXT_SECONDARY,
    })

    page.drawText('+39 0521 000000  ·  info@dauniacars.it  ·  P.IVA IT00000000000', {
      x: 24,
      y: footerY - 12,
      size: 7,
      font: regularFont,
      color: TEXT_SECONDARY,
    })

    page.drawText('dauniacars.it', {
      x: width - 80,
      y: footerY,
      size: 8,
      font: boldFont,
      color: ACCENT,
    })

    // ── Serialize ─────────────────────────────────────────────────────────────

    const pdfBytes = await pdfDoc.save()
    const buffer = Buffer.from(pdfBytes)

    const safeName = `${brand}-${model}-preventivo`.toLowerCase().replace(/\s+/g, '-')

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeName}.pdf"`,
        'Content-Length': String(buffer.byteLength),
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('[/api/preventivo] Errore generazione PDF:', err)
    return NextResponse.json(
      { error: 'Errore nella generazione del preventivo. Riprova.' },
      { status: 500 }
    )
  }
}
