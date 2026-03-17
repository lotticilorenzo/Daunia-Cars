import { z } from 'zod'

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

const phoneRegex =
  /^(\+39)?[\s.-]?3[0-9]{2}[\s.-]?[0-9]{6,7}$|^(\+39)?[\s.-]?0[0-9]{1,3}[\s.-]?[0-9]{5,8}$/

// ─────────────────────────────────────────────
// SCHEMA — CONTATTO BASE
// ─────────────────────────────────────────────

export const contactBaseSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Il nome deve avere almeno 2 caratteri')
    .max(50, 'Nome troppo lungo'),
  lastName: z
    .string()
    .min(2, 'Il cognome deve avere almeno 2 caratteri')
    .max(50, 'Cognome troppo lungo'),
  email: z.string().email('Inserisci un indirizzo email valido'),
  phone: z.string().regex(phoneRegex, 'Inserisci un numero di telefono italiano valido'),
})

// ─────────────────────────────────────────────
// SCHEMA — FORM CONTATTO (2 step)
// ─────────────────────────────────────────────

export const contactFormSchema = contactBaseSchema.extend({
  service: z.enum(
    ['noleggio-breve', 'noleggio-lungo', 'vendita', 'permuta', 'finanziamento', 'altro'] as const,
    { message: 'Seleziona un servizio di interesse' }
  ),
  message: z
    .string()
    .min(10, 'Il messaggio deve avere almeno 10 caratteri')
    .max(1000, 'Messaggio troppo lungo'),
  privacyConsent: z
    .boolean()
    .refine((v) => v === true, 'Devi accettare la privacy policy per continuare'),
  newsletter: z.boolean().optional(),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

// ─────────────────────────────────────────────
// SCHEMA — FORM NOLEGGIO (3 step)
// ─────────────────────────────────────────────

export const rentalFormStep1Schema = contactBaseSchema

export const rentalFormStep2Schema = z.object({
  service: z.enum(
    ['noleggio-breve', 'noleggio-lungo', 'vendita', 'permuta', 'finanziamento'] as const,
    { message: 'Seleziona il servizio desiderato' }
  ),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  vehiclePreference: z.string().max(100, 'Preferenza troppo lunga').optional(),
})

export const rentalFormStep3Schema = z.object({
  notes: z.string().max(500, 'Note troppo lunghe').optional(),
  privacyConsent: z
    .boolean()
    .refine((v) => v === true, 'Devi accettare la privacy policy per continuare'),
})

export const rentalFormSchema = rentalFormStep1Schema
  .merge(rentalFormStep2Schema)
  .merge(rentalFormStep3Schema)

export type RentalFormValues = z.infer<typeof rentalFormSchema>

// ─────────────────────────────────────────────
// SCHEMA — FORM NLT
// ─────────────────────────────────────────────

export const nltFormSchema = rentalFormSchema.extend({
  contractDuration: z.enum(['12', '24', '36', '48'] as const, {
    message: 'Seleziona la durata del contratto',
  }),
  usageType: z.enum(['privato', 'aziendale'] as const, {
    message: 'Seleziona il tipo di utilizzo',
  }),
  vatNumber: z.string().max(11).optional(),
  companyName: z.string().max(100).optional(),
  annualKm: z.enum(['<15000', '15000-25000', '>25000'] as const, {
    message: 'Seleziona i km annui previsti',
  }),
})

export type NltFormValues = z.infer<typeof nltFormSchema>

// ─────────────────────────────────────────────
// SCHEMA — FORM PERMUTA
// ─────────────────────────────────────────────

export const tradeInFormSchema = z.object({
  vehicleBrand: z.string().min(2, 'Inserisci la marca del veicolo').max(50),
  vehicleModel: z.string().min(1, 'Inserisci il modello del veicolo').max(100),
  vehicleYear: z
    .string()
    .regex(/^\d{4}$/, 'Anno non valido')
    .refine((v) => {
      const y = parseInt(v, 10)
      return y >= 1990 && y <= new Date().getFullYear()
    }, 'Anno fuori range'),
  vehicleKm: z
    .string()
    .regex(/^\d+$/, 'Inserisci solo numeri')
    .refine(
      (v) => parseInt(v, 10) >= 0 && parseInt(v, 10) <= 1000000,
      'Km non valido'
    ),
  vehicleCondition: z.enum(['ottime', 'buone', 'da-revisionare'] as const, {
    message: 'Seleziona le condizioni del veicolo',
  }),
  email: z.string().email('Inserisci un indirizzo email valido'),
  phone: z.string().regex(phoneRegex, 'Numero di telefono non valido'),
  privacyConsent: z
    .boolean()
    .refine((v) => v === true, 'Devi accettare la privacy policy per continuare'),
})

export type TradeInFormValues = z.infer<typeof tradeInFormSchema>

// ─────────────────────────────────────────────
// SCHEMA — FORM FINANZIAMENTO
// ─────────────────────────────────────────────

export const financingFormSchema = contactBaseSchema.extend({
  vehicleInterest: z.string().max(100).optional(),
  amount: z
    .string()
    .regex(/^\d+$/, 'Importo non valido')
    .refine(
      (v) => parseInt(v, 10) >= 1000 && parseInt(v, 10) <= 200000,
      'Importo fuori range'
    ),
  duration: z.enum(['24', '36', '48', '60'] as const, {
    message: 'Seleziona la durata del finanziamento',
  }),
  financingType: z.enum(['tasso-fisso', 'leasing', 'balloon'] as const, {
    message: 'Seleziona il tipo di finanziamento',
  }),
  privacyConsent: z
    .boolean()
    .refine((v) => v === true, 'Devi accettare la privacy policy'),
})

export type FinancingFormValues = z.infer<typeof financingFormSchema>

// ─────────────────────────────────────────────
// SCHEMA — FORM LAVORA CON NOI
// ─────────────────────────────────────────────

export const jobApplicationSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Il nome deve avere almeno 2 caratteri')
    .max(50, 'Nome troppo lungo'),
  lastName: z
    .string()
    .min(2, 'Il cognome deve avere almeno 2 caratteri')
    .max(50, 'Cognome troppo lungo'),
  email: z.string().email('Inserisci un indirizzo email valido'),
  phone: z.string().regex(phoneRegex, 'Inserisci un numero di telefono italiano valido'),
  position: z.string().max(100, 'Posizione troppo lunga').optional(),
  coverLetter: z
    .string()
    .min(30, 'La lettera di presentazione deve avere almeno 30 caratteri')
    .max(2000, 'Testo troppo lungo'),
  privacyConsent: z
    .boolean()
    .refine((v) => v === true, 'Devi accettare la privacy policy per continuare'),
})

export type JobApplicationValues = z.infer<typeof jobApplicationSchema>
