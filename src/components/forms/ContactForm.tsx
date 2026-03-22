'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Warning, CircleNotch } from '@phosphor-icons/react'
import { contactFormSchema, type ContactFormValues } from '@/lib/validations'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

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
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

function FloatingSelect({ label, registerProps, error, options, placeholder = 'Seleziona...' }: FloatingSelectProps) {
  return (
    <div className="relative flex flex-col gap-1">
      <label className="font-body text-[13px] text-text-muted mb-1">{label}</label>
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
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-surface text-text-primary">
            {opt.label}
          </option>
        ))}
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
// SUCCESS SVG CHECKMARK
// ─────────────────────────────────────────────

function AnimatedCheckmark() {
  return (
    <motion.svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <motion.circle
        cx={32}
        cy={32}
        r={30}
        stroke="#C41C0C"
        strokeWidth={3}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
      <motion.path
        d="M18 32 L28 42 L46 22"
        stroke="#C41C0C"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
      />
    </motion.svg>
  )
}

// ─────────────────────────────────────────────
// SERVICE OPTIONS
// ─────────────────────────────────────────────

const SERVICE_OPTIONS = [
  { value: 'noleggio-breve', label: 'Noleggio breve' },
  { value: 'noleggio-lungo', label: 'Noleggio lungo' },
  { value: 'vendita', label: 'Vendita' },
  { value: 'permuta', label: 'Permuta' },
  { value: 'finanziamento', label: 'Finanziamento' },
  { value: 'altro', label: 'Altro' },
]

// ─────────────────────────────────────────────
// CONTACT FORM
// ─────────────────────────────────────────────

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormValues>({
    mode: 'onBlur',
    defaultValues: {
      privacyConsent: false,
      newsletter: false,
    },
  })

  const privacyValue = watch('privacyConsent')

  async function onSubmit(data: ContactFormValues) {
    const parsed = contactFormSchema.safeParse(data)
    if (!parsed.success) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, formType: 'contact' }),
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
          <AnimatedCheckmark />
          <h3 className="font-display text-h3 text-text-primary">Messaggio inviato!</h3>
          <p className="font-body text-text-secondary">Ti risponderemo entro 24 ore.</p>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-10">
      {/* ── SEZIONE 1: Dati personali + servizio ── */}
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FloatingInput
            label="Nome *"
            registerProps={register('firstName')}
            error={errors.firstName}
          />
          <FloatingInput
            label="Cognome *"
            registerProps={register('lastName')}
            error={errors.lastName}
          />
        </div>

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

        <FloatingSelect
          label="Servizio di interesse *"
          registerProps={register('service')}
          error={errors.service}
          options={SERVICE_OPTIONS}
          placeholder="Seleziona un servizio..."
        />
      </div>

      {/* ── SEZIONE 2: Messaggio + consensi ── */}
      <div className="flex flex-col gap-6">
        {/* Message textarea */}
        <div className="relative flex flex-col gap-1">
            <textarea
              {...register('message')}
              rows={4}
              placeholder=" "
              className={cn(
                'peer w-full bg-transparent border-b border-border pt-5 pb-2 font-body text-[16px] text-text-primary placeholder-transparent focus:outline-none transition-colors resize-none rounded-none',
                errors.message ? 'border-b-[#E05252]' : 'focus:border-b-accent',
              )}
            />
          <label className="absolute top-2 left-0 font-body text-[13px] text-text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[16px] peer-focus:top-2 peer-focus:text-[13px] peer-focus:text-accent pointer-events-none">
            Messaggio *
          </label>
          {errors.message && (
            <p role="alert" className="flex items-center gap-1 font-body text-[13px] text-[#E05252] mt-1">
              <Warning size={14} aria-hidden="true" />
              {errors.message.message}
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

        {/* Newsletter (opzionale) */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            {...register('newsletter')}
            type="checkbox"
            className="mt-0.5 accent-[#C41C0C] w-4 h-4 flex-shrink-0"
          />
          <span className="font-body text-[14px] text-text-secondary leading-relaxed">
            Desidero ricevere aggiornamenti e offerte via email (opzionale)
          </span>
        </label>

        {/* Error banner */}
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

        {/* Submit */}
        <button
          type="submit"
          disabled={!privacyValue}
          className={cn(
            'flex items-center justify-center gap-2 w-full sm:w-auto sm:self-end px-8 py-3.5 bg-accent text-white font-body font-medium rounded-card transition-colors',
            privacyValue ? 'hover:bg-accent-dark' : 'opacity-50 cursor-not-allowed',
          )}
        >
          {status === 'loading' && (
            <CircleNotch size={18} className="animate-spin" aria-hidden="true" />
          )}
          Invia il messaggio
        </button>
      </div>
    </form>
  )
}
