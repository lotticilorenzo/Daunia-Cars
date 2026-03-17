'use client'

import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  Warning,
  Info,
  X,
} from '@phosphor-icons/react'

// ─── Types ────────────────────────────────────────────────────────────────────

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  type: ToastType
  message: string
  duration: number
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType, duration?: number) => void
  success: (message: string) => void
  error: (message: string) => void
  info: (message: string) => void
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}

// ─── Single Toast Item ────────────────────────────────────────────────────────

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = progressRef.current
    if (!el) return
    el.style.transition = `width ${toast.duration}ms linear`
    requestAnimationFrame(() => {
      el.style.width = '0%'
    })
  }, [toast.duration])

  const ICON = {
    success: CheckCircle,
    error: Warning,
    info: Info,
  }[toast.type]

  const colors = {
    success: 'border-green-500/30 text-green-400',
    error: 'border-[#C41C0C]/30 text-[#C41C0C]',
    info: 'border-blue-500/30 text-blue-400',
  }[toast.type]

  const barColors = {
    success: 'bg-green-500',
    error: 'bg-[#C41C0C]',
    info: 'bg-blue-500',
  }[toast.type]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className={`relative w-[340px] max-w-[calc(100vw-2rem)] bg-surface border rounded-2xl overflow-hidden shadow-2xl shadow-black/40`}
      style={{ borderColor: 'rgba(42,42,48,1)' }}
    >
      {/* Content */}
      <div className="flex items-start gap-3 px-4 py-3.5">
        <ICON
          size={18}
          weight="fill"
          className={`flex-none mt-0.5 ${colors}`}
          aria-hidden="true"
        />
        <p className="font-body text-[14px] text-text-primary leading-snug flex-1">
          {toast.message}
        </p>
        <button
          type="button"
          onClick={() => onRemove(toast.id)}
          aria-label="Chiudi notifica"
          className="flex-none text-text-muted hover:text-text-secondary transition-colors ml-1"
        >
          <X size={14} weight="bold" aria-hidden="true" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border">
        <div
          ref={progressRef}
          className={`h-full ${barColors} rounded-full`}
          style={{ width: '100%' }}
        />
      </div>
    </motion.div>
  )
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback((message: string, type: ToastType = 'info', duration = 4000) => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts((prev) => [...prev, { id, type, message, duration }])
    setTimeout(() => remove(id), duration)
  }, [remove])

  const success = useCallback((msg: string) => toast(msg, 'success'), [toast])
  const error = useCallback((msg: string) => toast(msg, 'error'), [toast])
  const info = useCallback((msg: string) => toast(msg, 'info'), [toast])

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}

      {/* Toast container */}
      <div
        aria-live="polite"
        aria-label="Notifiche"
        className="fixed bottom-24 right-6 z-[99990] flex flex-col gap-3 items-end"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onRemove={remove} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
