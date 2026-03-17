'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatCircle, X, ArrowLeft, WhatsappLogo, CaretRight } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

// ─── Constants ────────────────────────────────────────────────────────────────

const WA_PHONE = '391234567890'

interface Step {
  question: string
  options: string[]
}

const STEPS: Step[] = [
  {
    question: 'Cosa stai cercando?',
    options: ['Noleggio Breve', 'Noleggio Lungo', 'Acquisto', 'Permuta'],
  },
  {
    question: 'Qual è il tuo budget mensile?',
    options: ['< €300/mese', '€300-600/mese', '> €600/mese', 'Acquisto diretto'],
  },
  {
    question: 'Quando hai bisogno del veicolo?',
    options: ['Subito', 'Entro 1 settimana', 'Entro 1 mese', 'Solo informazioni'],
  },
]

const ANSWER_LABELS = ['Servizio', 'Budget', 'Disponibilità']

// ─── Typing Indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-text-muted"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

// ─── Step Dots ─────────────────────────────────────────────────────────────────

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`Passaggio ${current + 1} di ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className={cn('rounded-full', i === current ? 'bg-accent' : 'bg-border')}
          animate={{
            width: i === current ? 16 : 6,
            height: 6,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      ))}
    </div>
  )
}

// ─── Summary Card ─────────────────────────────────────────────────────────────

function SummaryCard({ answers, onWhatsApp }: { answers: string[]; onWhatsApp: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4"
    >
      <p className="font-body text-sm text-text-secondary leading-snug">
        Ottimo! Ecco un riepilogo della tua richiesta:
      </p>

      <div className="rounded-xl border border-border bg-surface-2 overflow-hidden">
        {answers.map((answer, i) => (
          <div
            key={i}
            className={cn(
              'flex items-center justify-between px-4 py-3',
              i < answers.length - 1 && 'border-b border-border'
            )}
          >
            <span className="font-body text-xs text-text-muted uppercase tracking-wide">
              {ANSWER_LABELS[i]}
            </span>
            <span className="font-body text-sm font-medium text-text-primary">{answer}</span>
          </div>
        ))}
      </div>

      <motion.button
        type="button"
        onClick={onWhatsApp}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Parla con noi su WhatsApp"
        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#25D366] text-white font-body font-semibold text-sm transition-shadow"
        style={{ boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}
      >
        <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
        Parla con noi su WhatsApp
        <CaretRight size={14} weight="bold" aria-hidden="true" />
      </motion.button>
    </motion.div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [questionVisible, setQuestionVisible] = useState(true)

  const isDone = step >= STEPS.length

  // Show typing animation when step changes
  useEffect(() => {
    if (!isOpen) return
    setIsTyping(true)
    setQuestionVisible(false)
    const timer = setTimeout(() => {
      setIsTyping(false)
      setQuestionVisible(true)
    }, 800)
    return () => clearTimeout(timer)
  }, [step, isOpen])

  function handleOpen() {
    setIsOpen(true)
    setStep(0)
    setAnswers([])
  }

  function handleClose() {
    setIsOpen(false)
  }

  function handleAnswer(option: string) {
    const next = answers.concat(option)
    setAnswers(next)
    if (next.length < STEPS.length) {
      setStep(next.length)
    } else {
      setStep(STEPS.length)
    }
  }

  function handleBack() {
    if (step === 0) return
    const prev = step - 1
    setAnswers((a) => a.slice(0, prev))
    setStep(prev)
  }

  function handleWhatsApp() {
    const [service = '', budget = '', timing = ''] = answers
    const text = encodeURIComponent(
      `Ciao! Sono interessato a: ${service}. Budget: ${budget}. Disponibilità: ${timing}.`
    )
    window.open(`https://wa.me/${WA_PHONE}?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  const currentStep = STEPS[step]

  return (
    <>
      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="fixed bottom-[5.5rem] right-6 z-[9000] w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-surface shadow-2xl shadow-black/60 overflow-hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Assistente Daunia Cars"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 bg-surface-2 border-b border-border">
              {/* Bot avatar */}
              <div
                className="flex items-center justify-center w-9 h-9 rounded-full bg-accent/15 border border-accent/30 flex-none"
                aria-hidden="true"
              >
                <span className="font-display text-xs font-bold text-accent leading-none">DC</span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-display text-sm font-bold text-text-primary leading-tight">
                  Ciao! 👋
                </p>
                <p className="font-body text-xs text-text-secondary truncate">
                  Posso aiutarti a trovare il veicolo giusto
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Chiudi assistente"
                className="flex-none p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X size={16} weight="bold" aria-hidden="true" />
              </button>
            </div>

            {/* Progress dots */}
            {!isDone && (
              <div className="flex justify-center pt-4 pb-1">
                <StepDots current={step} total={STEPS.length} />
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
              {isDone ? (
                <SummaryCard answers={answers} onWhatsApp={handleWhatsApp} />
              ) : (
                <>
                  {/* Question area */}
                  <div className="flex items-start gap-2">
                    <div
                      className="flex items-center justify-center w-7 h-7 rounded-full bg-accent/15 border border-accent/30 flex-none mt-0.5"
                      aria-hidden="true"
                    >
                      <span className="font-display text-[10px] font-bold text-accent leading-none">
                        DC
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <AnimatePresence mode="wait">
                        {isTyping ? (
                          <motion.div
                            key="typing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="rounded-2xl rounded-tl-none bg-surface-2 border border-border w-fit"
                          >
                            <TypingIndicator />
                          </motion.div>
                        ) : questionVisible && currentStep ? (
                          <motion.div
                            key={`q-${step}`}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="rounded-2xl rounded-tl-none bg-surface-2 border border-border px-3.5 py-2.5"
                          >
                            <p className="font-body text-sm text-text-primary leading-snug">
                              {currentStep.question}
                            </p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Options */}
                  <AnimatePresence>
                    {questionVisible && currentStep && (
                      <motion.div
                        key={`opts-${step}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.05 }}
                        className="flex flex-wrap gap-2"
                      >
                        {currentStep.options.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleAnswer(option)}
                            className={cn(
                              'px-3.5 py-2 rounded-full font-body text-sm font-medium',
                              'border border-border bg-surface-2 text-text-secondary',
                              'hover:border-accent hover:text-text-primary hover:bg-accent/10',
                              'transition-colors duration-150 focus-visible:outline-none',
                              'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-surface'
                            )}
                          >
                            {option}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-surface-2">
              {step > 0 && !isDone ? (
                <button
                  type="button"
                  onClick={handleBack}
                  aria-label="Torna alla domanda precedente"
                  className="flex items-center gap-1 text-xs font-body text-text-muted hover:text-text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  <ArrowLeft size={13} weight="bold" aria-hidden="true" />
                  Indietro
                </button>
              ) : (
                <span />
              )}

              <button
                type="button"
                onClick={handleClose}
                className="text-xs font-body text-text-muted hover:text-text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                Non ora
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <div className="fixed bottom-6 right-24 z-[9000]">
        <div className="relative">
          {/* Pulsing ring */}
          {!isOpen && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-accent"
              animate={{ scale: [1, 1.55, 1.55], opacity: [0.35, 0, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
          )}

          <motion.button
            type="button"
            onClick={isOpen ? handleClose : handleOpen}
            aria-label={isOpen ? 'Chiudi assistente' : 'Apri assistente virtuale'}
            aria-expanded={isOpen}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-accent text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            style={{ boxShadow: '0 4px 18px rgba(232,56,13,0.4)' }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} weight="bold" aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChatCircle size={26} weight="fill" aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </>
  )
}
