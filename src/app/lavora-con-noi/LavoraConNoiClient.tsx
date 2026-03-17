'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Warning,
  CircleNotch,
  UploadSimple,
  CheckCircle,
  Briefcase,
  Users,
  Sparkle,
  X,
} from '@phosphor-icons/react'
import { jobApplicationSchema, type JobApplicationValues } from '@/lib/validations'
import { cn } from '@/lib/utils'

// ─── Floating input ────────────────────────────────────────────────────────────

function FloatingInput({
  label,
  name,
  type = 'text',
  register,
  error,
}: {
  label: string
  name: string
  type?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any
  error?: { message?: string }
}) {
  return (
    <div className="relative flex flex-col gap-1">
      <input
        {...register(name)}
        type={type}
        placeholder=" "
        className={cn(
          'peer w-full bg-transparent border-b border-border pt-5 pb-2 font-body text-[16px] text-text-primary placeholder-transparent focus:outline-none transition-colors',
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

// ─── Animated checkmark ───────────────────────────────────────────────────────

function AnimatedCheckmark() {
  return (
    <motion.svg width={64} height={64} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <motion.circle
        cx={32} cy={32} r={30}
        stroke="#C41C0C" strokeWidth={3}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
      <motion.path
        d="M18 32 L28 42 L46 22"
        stroke="#C41C0C" strokeWidth={3}
        strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
      />
    </motion.svg>
  )
}

// ─── Perché unirsi card ────────────────────────────────────────────────────────

const WHY_ITEMS = [
  {
    icon: Briefcase,
    title: 'Settore in crescita',
    body: 'Il noleggio e la mobilità flessibile sono tra i settori automotive in maggiore espansione.',
  },
  {
    icon: Users,
    title: 'Team giovane',
    body: 'Un ambiente di lavoro dinamico dove ogni persona conta e può fare la differenza.',
  },
  {
    icon: Sparkle,
    title: 'Crescita continua',
    body: 'Formazione, responsabilità reale e spazio per chi vuole costruire una carriera seria.',
  },
]

// ─── Main component ────────────────────────────────────────────────────────────

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export function LavoraConNoiClient() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [cvError, setCvError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<JobApplicationValues>({
    resolver: zodResolver(jobApplicationSchema),
    mode: 'onBlur',
    defaultValues: { privacyConsent: false },
  })

  const privacyValue = watch('privacyConsent')

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setCvError(null)
    if (!file) { setCvFile(null); return }
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowed.includes(file.type)) {
      setCvError('Formato non supportato. Usa PDF, DOC o DOCX.')
      setCvFile(null)
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setCvError('Il file non può superare 5 MB.')
      setCvFile(null)
      return
    }
    setCvFile(file)
  }

  async function onSubmit(data: JobApplicationValues) {
    setStatus('loading')
    try {
      const fd = new FormData()
      Object.entries(data).forEach(([k, v]) => fd.append(k, String(v)))
      if (cvFile) fd.append('cv', cvFile)

      const res = await fetch('/api/lavora-con-noi', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('server_error')

      setStatus('success')
      setTimeout(() => {
        reset()
        setCvFile(null)
        setStatus('idle')
      }, 4000)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section className="min-h-screen bg-bg flex items-center justify-center px-6">
        <AnimatePresence>
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-5 text-center max-w-sm"
          >
            <AnimatedCheckmark />
            <h2 className="font-display font-extrabold text-text-primary text-[2rem]">
              Candidatura inviata!
            </h2>
            <p className="font-body text-[16px] text-text-secondary">
              Abbiamo ricevuto la tua candidatura. Ti contatteremo via email se il profilo è in linea con le nostre esigenze.
            </p>
          </motion.div>
        </AnimatePresence>
      </section>
    )
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-bg pt-24 pb-16 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-accent/5 blur-[100px] pointer-events-none"
        />
        <div className="container-custom relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-[11px] text-accent uppercase tracking-wider mb-4"
          >
            Unisciti al team
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-display font-extrabold leading-none tracking-tight mb-5"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            <span className="block text-text-primary">Lavora</span>
            <span className="block italic text-accent">con noi.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="font-body text-[18px] text-text-secondary max-w-[52ch]"
          >
            Cerchiamo persone motivate e appassionate di automotive. Candidatura spontanea sempre aperta.
          </motion.p>
        </div>
      </section>

      {/* ── Perché unirsi ── */}
      <section className="bg-surface py-[60px]">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {WHY_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex flex-col gap-4 p-6 rounded-2xl border border-border bg-bg"
              >
                <span className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <item.icon size={20} weight="duotone" className="text-accent" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-body font-semibold text-[15px] text-text-primary mb-1">{item.title}</p>
                  <p className="font-body text-[14px] text-text-secondary leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form candidatura ── */}
      <section className="bg-bg py-[80px]">
        <div className="container-custom max-w-[760px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="font-mono text-[11px] text-accent uppercase tracking-wider mb-2">
              Candidatura spontanea
            </p>
            <h2
              className="font-display font-extrabold text-text-primary leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
            >
              Inviaci il tuo curriculum.
            </h2>
            <p className="font-body text-[15px] text-text-secondary mt-2">
              Compila il form e allega il tuo CV. Ti contatteremo se il profilo è in linea.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-8"
          >
            {/* Dati personali */}
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FloatingInput label="Nome *" name="firstName" register={register} error={errors.firstName} />
                <FloatingInput label="Cognome *" name="lastName" register={register} error={errors.lastName} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FloatingInput label="Email *" name="email" type="email" register={register} error={errors.email} />
                <FloatingInput label="Telefono *" name="phone" type="tel" register={register} error={errors.phone} />
              </div>
              <FloatingInput
                label="Posizione di interesse (opzionale)"
                name="position"
                register={register}
                error={errors.position}
              />
            </div>

            {/* Lettera di presentazione */}
            <div className="relative flex flex-col gap-1">
              <textarea
                {...register('coverLetter')}
                rows={5}
                placeholder=" "
                className={cn(
                  'peer w-full bg-transparent border-b border-border pt-5 pb-2 font-body text-[16px] text-text-primary placeholder-transparent focus:outline-none transition-colors resize-none',
                  errors.coverLetter ? 'border-b-[#E05252]' : 'focus:border-b-accent',
                )}
              />
              <label className="absolute top-2 left-0 font-body text-[13px] text-text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[16px] peer-focus:top-2 peer-focus:text-[13px] peer-focus:text-accent pointer-events-none">
                Presentati — raccontaci chi sei e cosa cerchi *
              </label>
              {errors.coverLetter && (
                <p role="alert" className="flex items-center gap-1 font-body text-[13px] text-[#E05252] mt-1">
                  <Warning size={14} aria-hidden="true" />
                  {errors.coverLetter.message}
                </p>
              )}
            </div>

            {/* Upload CV */}
            <div className="flex flex-col gap-2">
              <p className="font-body text-[13px] text-text-muted">Curriculum Vitae (PDF, DOC, DOCX — max 5 MB)</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="sr-only"
                id="cv-upload"
                aria-label="Carica il tuo curriculum"
              />
              <div className="flex items-center gap-3 flex-wrap">
                <label
                  htmlFor="cv-upload"
                  className={cn(
                    'inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border font-body text-[14px] font-medium cursor-pointer transition-colors',
                    'text-text-secondary hover:border-accent/50 hover:text-accent',
                    'focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-bg',
                  )}
                >
                  <UploadSimple size={18} aria-hidden="true" />
                  {cvFile ? 'Cambia file' : 'Allega curriculum'}
                </label>

                {cvFile && (
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface border border-border">
                    <CheckCircle size={16} weight="fill" className="text-green-400" aria-hidden="true" />
                    <span className="font-body text-[13px] text-text-secondary truncate max-w-[200px]">
                      {cvFile.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => { setCvFile(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                      aria-label="Rimuovi il curriculum allegato"
                      className="text-text-muted hover:text-text-primary transition-colors ml-1"
                    >
                      <X size={14} aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
              {cvError && (
                <p role="alert" className="flex items-center gap-1 font-body text-[13px] text-[#E05252]">
                  <Warning size={14} aria-hidden="true" />
                  {cvError}
                </p>
              )}
            </div>

            {/* Privacy */}
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline underline-offset-2 hover:text-accent-dark transition-colors"
                  >
                    Privacy Policy
                  </a>{' '}
                  e autorizzo il trattamento dei dati personali *
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
            <AnimatePresence>
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                  className="flex items-center gap-2 font-body text-[14px] text-[#E05252] bg-[#E05252]/10 border border-[#E05252]/20 rounded-2xl px-4 py-3"
                >
                  <Warning size={16} aria-hidden="true" />
                  Si è verificato un errore. Riprova tra qualche istante.
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={!privacyValue || status === 'loading'}
              className={cn(
                'flex items-center justify-center gap-2 w-full sm:w-auto sm:self-end px-8 py-3.5 bg-accent text-white font-body font-medium rounded-full transition-colors',
                privacyValue && status !== 'loading' ? 'hover:bg-accent/90' : 'opacity-50 cursor-not-allowed',
              )}
            >
              {status === 'loading' && (
                <CircleNotch size={18} className="animate-spin" aria-hidden="true" />
              )}
              Invia candidatura
            </button>
          </motion.form>
        </div>
      </section>
    </>
  )
}
