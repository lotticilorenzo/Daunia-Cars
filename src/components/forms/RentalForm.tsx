'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Warning, CheckCircle, CircleNotch } from '@phosphor-icons/react'
import {
  rentalFormStep1Schema,
  rentalFormStep2Schema,
  rentalFormSchema,
  type RentalFormValues,
} from '@/lib/validations'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface RentalFormProps {
  servicePreset?: 'noleggio-breve' | 'noleggio-lungo' | 'vendita' | 'permuta' | 'finanziamento'
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

// ─────────────────────────────────────────────
// FLOATING INPUT
// ─────────────────────────────────────────────

interface FloatingInputProps {
  label: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerProps: ReturnType<ReturnType<typeof useForm>['register']>
  error?: { message?: string }
  type?: string
  readOnly?: boolean
}

function FloatingInput({
  label,
  registerProps,
  error,
  type = 'text',
  readOnly = false,
}: FloatingInputProps) {
  return (
    <div className="relative flex flex-col gap-1">
      <input
        {...registerProps}
        type={type}
        placeholder=" "
        readOnly={readOnly}
        className={cn(
          'peer w-full bg-transparent border-b border-border pt-5 pb-2 font-body text-[16px] text-text-primary placeholder-transparent focus:outline-none transition-colors',
          error ? 'border-b-[#E05252]' : 'focus:border-b-accent',
          readOnly && 'cursor-default opacity-70',
        )}
      />
      <label className="absolute top-2 left-0 font-body text-[13px] text-text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[16px] peer-focus:top-2 peer-focus:text-[13px] peer-focus:text-accent pointer-events-none">
        {label}
      </label>
      {error?.message && (
        <p role="alert" className="flex items-center gap-1 font-body text-[13px] text-[#E05252] mt-1">
          <Warning size={14} aria-hidden="true" />
          {error.message}
        </p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// STEP INDICATOR
// ─────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {Array.from({ length: total }, (_, i) => {
        const stepNum = i + 1
        const isActive = stepNum === current
        const isCompleted = stepNum < current
        return (
          <div key={stepNum} className="flex items-center gap-3">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center font-body text-[13px] font-medium transition-all duration-300',
                isCompleted && 'bg-accent text-white',
                isActive && 'bg-accent text-white ring-2 ring-accent/30',
                !isActive && !isCompleted && 'border border-border text-text-muted',
              )}
            >
              {stepNum}
            </div>
            {stepNum < total && (
              <div
                className={cn(
                  'w-12 h-px transition-all duration-300',
                  isCompleted ? 'bg-accent' : 'bg-border',
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────
// SERVICE LABELS
// ─────────────────────────────────────────────

const SERVICE_OPTIONS = [
  { value: 'noleggio-breve', label: 'Noleggio Breve' },
  { value: 'noleggio-lungo', label: 'Noleggio Lungo' },
  { value: 'vendita', label: 'Vendita' },
  { value: 'permuta', label: 'Permuta' },
  { value: 'finanziamento', label: 'Finanziamento' },
] as const

// ─────────────────────────────────────────────
// RENTAL FORM
// ─────────────────────────────────────────────

export function RentalForm({ servicePreset }: RentalFormProps) {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState<FormStatus>('idle')

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
    watch,
  } = useForm<RentalFormValues>({
    mode: 'onBlur',
    defaultValues: {
      service: servicePreset ?? undefined,
      privacyConsent: false,
    },
  })

  const privacyValue = watch('privacyConsent')

  // ── Step navigation with per-step validation ──

  async function goNext() {
    let valid = false
    if (step === 1) {
      const result = await trigger(['firstName', 'lastName', 'email', 'phone'])
      // Also validate with zod step1 schema
      const data = {
        firstName: (document.querySelector('[name="firstName"]') as HTMLInputElement)?.value ?? '',
        lastName: (document.querySelector('[name="lastName"]') as HTMLInputElement)?.value ?? '',
        email: (document.querySelector('[name="email"]') as HTMLInputElement)?.value ?? '',
        phone: (document.querySelector('[name="phone"]') as HTMLInputElement)?.value ?? '',
      }
      const parsed = rentalFormStep1Schema.safeParse(data)
      valid = result && parsed.success
    } else if (step === 2) {
      const result = await trigger(['service'])
      const serviceEl = document.querySelector('[name="service"]:checked') as HTMLInputElement | null
      const parsed = rentalFormStep2Schema.safeParse({
        service: serviceEl?.value ?? '',
      })
      valid = result && parsed.success
    }
    if (valid) setStep((s) => s + 1)
  }

  function goBack() {
    setStep((s) => s - 1)
  }

  async function onSubmit(data: RentalFormValues) {
    // Validate full schema with zod
    const parsed = rentalFormSchema.safeParse(data)
    if (!parsed.success) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, formType: 'rental' }),
      })
      if (!res.ok) throw new Error('server_error')
      setStatus('success')
      setTimeout(() => { reset(); setStep(1); setStatus('idle') }, 3000)
    } catch {
      setStatus('error')
    }
  }

  // ── Success state ──
  if (status === 'success') {
    return (
      <AnimatePresence>
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex flex-col items-center justify-center gap-4 py-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <CheckCircle size={64} className="text-accent" weight="fill" />
          </motion.div>
          <h3 className="font-display text-h3 text-text-primary">Richiesta inviata!</h3>
          <p className="font-body text-text-secondary">Ti contatteremo entro 24 ore.</p>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className="w-full">
      <StepIndicator current={step} total={3} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* ── STEP 1: Dati personali ── */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FloatingInput
                  label="Nome *"
                  name="firstName"
                  registerProps={register('firstName')}
                  error={errors.firstName}
                />
                <FloatingInput
                  label="Cognome *"
                  name="lastName"
                  registerProps={register('lastName')}
                  error={errors.lastName}
                />
              </div>
              <FloatingInput
                label="Email *"
                name="email"
                registerProps={register('email')}
                error={errors.email}
                type="email"
              />
              <FloatingInput
                label="Telefono *"
                name="phone"
                registerProps={register('phone')}
                error={errors.phone}
                type="tel"
              />

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={goNext}
                  className="px-6 py-3 bg-accent hover:bg-accent-dark text-white font-body font-medium rounded-card transition-colors"
                >
                  Avanti →
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Servizio ── */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              {/* Service radio group */}
              <div className="flex flex-col gap-2">
                <p className="font-body text-[13px] text-text-muted mb-1">Servizio *</p>
                {servicePreset ? (
                  <div className="flex flex-col gap-2">
                    {SERVICE_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 rounded-card border transition-colors cursor-pointer',
                          opt.value === servicePreset
                            ? 'border-accent bg-accent/5 text-text-primary'
                            : 'border-border text-text-muted opacity-50 cursor-default',
                        )}
                      >
                        <input
                          {...register('service')}
                          type="radio"
                          value={opt.value}
                          disabled={opt.value !== servicePreset}
                          className="accent-[#C41C0C]"
                        />
                        <span className="font-body text-[15px]">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {SERVICE_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className="flex items-center gap-3 px-4 py-3 rounded-card border border-border hover:border-accent/50 transition-colors cursor-pointer has-[:checked]:border-accent has-[:checked]:bg-accent/5"
                      >
                        <input
                          {...register('service')}
                          type="radio"
                          value={opt.value}
                          className="accent-[#C41C0C]"
                        />
                        <span className="font-body text-[15px] text-text-primary">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                )}
                {errors.service && (
                  <p role="alert" className="flex items-center gap-1 font-body text-[13px] text-[#E05252] mt-1">
                    <Warning size={14} aria-hidden="true" />
                    {errors.service.message}
                  </p>
                )}
              </div>

              {/* Date range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FloatingInput
                  label="Data inizio"
                  name="startDate"
                  registerProps={register('startDate')}
                  error={errors.startDate}
                  type="date"
                />
                <FloatingInput
                  label="Data fine"
                  name="endDate"
                  registerProps={register('endDate')}
                  error={errors.endDate}
                  type="date"
                />
              </div>

              {/* Vehicle preference */}
              <FloatingInput
                label="Preferenza veicolo (opzionale)"
                name="vehiclePreference"
                registerProps={register('vehiclePreference')}
                error={errors.vehiclePreference}
              />

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={goBack}
                  className="px-6 py-3 border border-border hover:border-accent text-text-secondary hover:text-text-primary font-body font-medium rounded-card transition-colors"
                >
                  ← Indietro
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="px-6 py-3 bg-accent hover:bg-accent-dark text-white font-body font-medium rounded-card transition-colors"
                >
                  Avanti →
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Note + Privacy ── */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              {/* Notes textarea */}
              <div className="relative flex flex-col gap-1">
                <textarea
                  {...register('notes')}
                  rows={4}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-border pt-5 pb-2 font-body text-[16px] text-text-primary placeholder-transparent focus:outline-none focus:border-b-accent transition-colors resize-none"
                />
                <label className="absolute top-2 left-0 font-body text-[13px] text-text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[16px] peer-focus:top-2 peer-focus:text-[13px] peer-focus:text-accent pointer-events-none">
                  Note aggiuntive (opzionale)
                </label>
                {errors.notes && (
                  <p role="alert" className="flex items-center gap-1 font-body text-[13px] text-[#E05252] mt-1">
                    <Warning size={14} aria-hidden="true" />
                    {errors.notes.message}
                  </p>
                )}
              </div>

              {/* Privacy consent */}
              <div className="flex flex-col gap-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    {...register('privacyConsent')}
                    type="checkbox"
                    className="mt-0.5 accent-[#C41C0C] w-4 h-4 flex-shrink-0"
                  />
                  <span className="font-body text-[14px] text-text-secondary leading-relaxed">
                    Ho letto e accetto la{' '}
                    <a
                      href="/privacy-policy"
                      className="text-accent underline underline-offset-2 hover:text-accent-dark transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>{' '}
                    *
                  </span>
                </label>
                {errors.privacyConsent && (
                  <p role="alert" className="flex items-center gap-1 font-body text-[13px] text-[#E05252] ml-7">
                    <Warning size={14} aria-hidden="true" />
                    {errors.privacyConsent.message}
                  </p>
                )}
              </div>

              {/* Error banner */}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="flex items-center gap-2 font-body text-[14px] text-[#E05252] bg-[#E05252]/10 border border-[#E05252]/20 rounded-card px-4 py-3"
                >
                  <Warning size={16} aria-hidden="true" />
                  Si è verificato un errore. Riprova tra qualche istante.
                </motion.p>
              )}

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={goBack}
                  className="px-6 py-3 border border-border hover:border-accent text-text-secondary hover:text-text-primary font-body font-medium rounded-card transition-colors"
                >
                  ← Indietro
                </button>
                <button
                  type="submit"
                  disabled={!privacyValue}
                  className={cn(
                    'flex items-center gap-2 px-6 py-3 bg-accent text-white font-body font-medium rounded-card transition-colors',
                    privacyValue ? 'hover:bg-accent-dark' : 'opacity-50 cursor-not-allowed',
                  )}
                >
                  {status === 'loading' && (
                    <CircleNotch size={18} className="animate-spin" aria-hidden="true" />
                  )}
                  Invia la Richiesta
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  )
}
