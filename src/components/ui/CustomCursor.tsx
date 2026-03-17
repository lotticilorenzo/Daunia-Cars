'use client'

import { useEffect, useRef, useState } from 'react'

type CursorState = 'default' | 'hover' | 'drag' | 'view' | 'hidden'

/**
 * CustomCursor
 * Cursore personalizzato con stati contestuali.
 * - default: cerchio vuoto outline
 * - hover: cerchio pieno accent + testo
 * - drag: "DRAG" label
 * - view: "VIEW" label
 * Hidden automaticamente su touch devices.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CursorState>('hidden')
  const [label, setLabel] = useState('')
  const posRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Non mostrare su touch device
    if (window.matchMedia('(hover: none)').matches) return

    setState('default')

    let targetX = -100
    let targetY = -100
    let currentX = -100
    let currentY = -100

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n

    const tick = () => {
      currentX = lerp(currentX, targetX, 0.12)
      currentY = lerp(currentY, targetY, 0.12)

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`
      }

      // Dot segue più velocemente
      const dotX = lerp(currentX, targetX, 0.35)
      const dotY = lerp(currentY, targetY, 0.35)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = () => setState('default')
    const onLeave = () => setState('hidden')

    const handleHoverIn = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      const cursorType = target.dataset.cursor as CursorState | undefined
      const cursorLabel = target.dataset.cursorLabel ?? ''
      setState(cursorType ?? 'hover')
      setLabel(cursorLabel)
    }

    const handleHoverOut = () => {
      setState('default')
      setLabel('')
    }

    // Applica automaticamente hover su link, button, [data-cursor]
    const applyListeners = () => {
      const elements = document.querySelectorAll<HTMLElement>(
        'a, button, [data-cursor], input, select, textarea'
      )
      elements.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverIn)
        el.addEventListener('mouseleave', handleHoverOut)
      })
    }

    applyListeners()

    // Re-apply su mutazioni DOM (nuovi elementi aggiunti)
    const observer = new MutationObserver(applyListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const isHover = state === 'hover'
  const haslabel = state === 'drag' || state === 'view' || label !== ''
  const isHidden = state === 'hidden'

  return (
    <>
      {/* Cerchio principale */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
        style={{
          transition: 'opacity 0.2s',
          opacity: isHidden ? 0 : 1,
        }}
      >
        <div
          style={{
            width: haslabel ? '80px' : isHover ? '44px' : '36px',
            height: haslabel ? '80px' : isHover ? '44px' : '36px',
            borderRadius: '50%',
            border: isHover || haslabel ? 'none' : '1.5px solid rgba(248,238,232,0.6)',
            backgroundColor: isHover || haslabel ? '#C41C0C' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), background-color 0.2s, border 0.2s',
            mixBlendMode: haslabel || isHover ? 'normal' : 'difference',
          }}
        >
          {haslabel && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: '#fff',
                textTransform: 'uppercase',
                userSelect: 'none',
              }}
            >
              {label || (state === 'drag' ? 'DRAG' : state === 'view' ? 'VIEW' : '')}
            </span>
          )}
        </div>
      </div>

      {/* Dot centrale */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
        style={{
          opacity: isHidden ? 0 : isHover || haslabel ? 0 : 1,
          transition: 'opacity 0.15s',
        }}
      >
        <div
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: '#C41C0C',
          }}
        />
      </div>

      {/* Nasconde il cursore nativo */}
      <style>{`
        html { cursor: none !important; }
        * { cursor: none !important; }
      `}</style>
    </>
  )
}
