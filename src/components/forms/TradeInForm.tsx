'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Warning, CheckCircle, CircleNotch } from '@phosphor-icons/react'
import { tradeInFormSchema, type TradeInFormValues } from '@/lib/validations'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

// ─────────────────────────────────────────────
// OPTIONS
// ─────────────────────────────────────────────

const BRAND_OPTIONS = [
  'Fiat',
  'Volkswagen',
  'BMW',
  'Audi',
  'Mercedes-Benz',
  'Toyota',
  'Ford',
  'Jeep',
  'Renault',
  'Skoda',
  'Tesla',
  'Altro',
]

const CONDITION_OPTIONS = [
  { value: 'ottime', label: 'Ottime' },
  { value: 'buone', label: 'Buone' },
  { value: 'da-revisionare', label: 'Da revisionare' },
] as const

const currentYear = new Date().getFullYear()
const YEAR_OPTIONS = Array.from({ length: currentYear - 1999 }, (_, i) => String(currentYear - i))

// ─────────────────────────────────────────────
// FLOATING INPUT
// ─────────────────────────────────────────────

interface FloatingInputProps {
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerProps: ReturnType<ReturnType<typeof useForm>['register']>
  error?: { message?: string }
  type?: string
}

function FloatingInput({ label, registerProps, error, type = 'text' }: FloatingInputProps) {
  return (
    <div className="relative flex flex-col gap-1">
      <input
        {...registerProps}
        type={type}
        placeholder=" "
        className={cn(
          'peer w-full bg-transparent border-b border-border pt-5 pb-2 font-body text-[16px] text-text-primary placeholder-transparent focus:outline-none transition-colors rounded-none',
          error ? 'border-b-[#E05252]' : 'focus:border-b-accent',
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
// FLOATING SELECT
// ─────────────────────────────────────────────

interface FloatingSelectProps {
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerProps: ReturnType<ReturnType<typeof useForm>['register']>
  error?: { message?: string }
  options: Array<{ value: string; label: string } | string>
  placeholder?: string
}

function FloatingSelect({
  label,
  registerProps,
  error,
  options,
  placeholder = 'Seleziona...',
}: FloatingSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-body text-[13px] text-text-muted">{label}</label>
      <select
        {...registerProps}
        className={cn(
          'w-full bg-transparent border-b border-border py-2 font-body text-[16px] text-text-primary focus:outline-none transition-colors appearance-none cursor-pointer rounded-none',
          error ? 'border-b-[#E05252]' : 'focus:border-b-accent',
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => {
          const value = typeof opt === 'string' ? opt : opt.value
          const label = typeof opt === 'string' ? opt : opt.label
          return (
            <option key={value} value={value} className="bg-surface text-text-primary">
              {label}
            </option>
          )
        })}
      </select>
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
// TRADE-IN FORM
// ─────────────────────────────────────────────

export function TradeInForm() {
  const [status, setStatus] = useState<FormStatus>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TradeInFormValues>({
    mode: 'onBlur',
    defaultValues: {
      privacyConsent: false,
    },
  })

  const privacyValue = watch('privacyConsent')

  async function onSubmit(data: TradeInFormValues) {
    // Validate with zod schema
    const parsed = tradeInFormSchema.safeParse(data)
    if (!parsed.success) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, formType: 'tradeIn', service: 'permuta' }),
      })
      if (!res.ok) throw new Error('server_error')
      setStatus('success')
      setTimeout(() => { reset(); setStatus('idle') }, 3000)
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
          <p className="font-body text-text-secondary">
            Ti contatteremo entro 24 ore con la valutazione.
          </p>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      {/* ── Veicolo ── */}
      <FloatingSelect
        label="Marca veicolo *"
        registerProps={register('vehicleBrand')}
        error={errors.vehicleBrand}
        options={BRAND_OPTIONS}
        placeholder="Seleziona la marca..."
      />

      <FloatingInput
        label="Modello veicolo *"
        registerProps={register('vehicleModel')}
        error={errors.vehicleModel}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FloatingSelect
          label="Anno *"
          registerProps={register('vehicleYear')}
          error={errors.vehicleYear}
          options={YEAR_OPTIONS}
          placeholder="Seleziona l'anno..."
        />

        <FloatingInput
          label="Chilometri *"
          registerProps={register('vehicleKm')}
          error={errors.vehicleKm}
          type="number"
        />
      </div>

      {/* ── Condizioni ── */}
      <div className="flex flex-col gap-2">
        <p className="font-body text-[13px] text-text-muted">Condizioni del veicolo *</p>
        <div className="flex flex-wrap gap-3">
          {CONDITION_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 px-4 py-2.5 rounded-card border border-border hover:border-accent/50 transition-colors cursor-pointer has-[:checked]:border-accent has-[:checked]:bg-accent/5"
            >
              <input
                {...register('vehicleCondition')}
                type="radio"
                value={opt.value}
                className="accent-[#C41C0C]"
              />
              <span className="font-body text-[14px] text-text-primary">{opt.label}</span>
            </label>
          ))}
        </div>
        {errors.vehicleCondition && (
          <p role="alert" className="flex items-center gap-1 font-body text-[13px] text-[#E05252] mt-1">
            <Warning size={14} aria-hidden="true" />
            {errors.vehicleCondition.message}
          </p>
        )}
      </div>

      {/* ── Contatti ── */}
      <FloatingInput
        label="Email *"
        registerProps={register('email')}
        error={errors.email}
        type="email"
      />

      <FloatingInput
        label="Telefono *"
        registerProps={register('phone')}
        error={errors.phone}
        type="tel"
      />

      {/* ── Privacy ── */}
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

      {/* ── Error banner ── */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="flex items-center gap-2 font-body text-[14px] text-[#E05252] bg-[#E05252]/10 border border-[#E05252]/20 rounded-card px-4 py-3"
          >
            <Warning size={16} aria-hidden="true" />
            Si è verificato un errore. Riprova tra qualche istante.
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={!privacyValue}
        className={cn(
          'flex items-center justify-center gap-2 w-full py-4 bg-accent text-white font-body font-medium text-[16px] rounded-card transition-colors mt-2',
          privacyValue ? 'hover:bg-accent-dark' : 'opacity-50 cursor-not-allowed',
        )}
      >
        {status === 'loading' && (
          <CircleNotch size={18} className="animate-spin" aria-hidden="true" />
        )}
        Richiedi Valutazione Gratuita
      </button>
    </form>
  )
}
