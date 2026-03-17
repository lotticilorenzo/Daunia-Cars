'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface MagneticButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
  target?: string
  rel?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white border-transparent hover:bg-accent-dark',
  ghost:
    'bg-transparent text-chrome border border-chrome/40 hover:border-chrome hover:text-text-primary',
  outline:
    'bg-transparent text-accent border border-accent/40 hover:border-accent hover:bg-accent/5',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export function MagneticButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
  disabled,
  type = 'button',
  'aria-label': ariaLabel,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const x = useSpring(rawX, springConfig)
  const y = useSpring(rawY, springConfig)

  const textX = useTransform(x, (v) => v * 0.4)
  const textY = useTransform(y, (v) => v * 0.4)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    rawX.set(dx * 0.35)
    rawY.set(dy * 0.35)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  const baseClass = cn(
    'relative inline-flex items-center justify-center gap-2',
    'rounded-full font-body font-medium tracking-wide',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
    'disabled:opacity-50 disabled:pointer-events-none',
    'select-none cursor-pointer',
    variantStyles[variant],
    sizeStyles[size],
    className
  )

  const innerContent = (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div className={baseClass} style={{ x: textX, y: textY }}>
        {children}
      </motion.div>
    </motion.div>
  )

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className="inline-block"
        tabIndex={0}
      >
        {innerContent}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="inline-block"
    >
      {innerContent}
    </button>
  )
}
