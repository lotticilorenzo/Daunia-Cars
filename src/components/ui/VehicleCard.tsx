'use client'

import { memo, useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn, formatPrice, formatKm } from '@/lib/utils'
import { WishlistButton } from '@/components/ui/WishlistButton'
import { CompareButton } from '@/components/ui/CompareButton'
import type { Vehicle } from '@/types'

interface VehicleCardProps {
  vehicle: Vehicle
  className?: string
  priority?: boolean
}

const badgeColors: Record<NonNullable<Vehicle['badge']>, string> = {
  'Nuovo Arrivo': 'bg-accent text-white',
  Offerta: 'bg-gold/90 text-bg',
  'Solo Noleggio': 'bg-surface-2 text-chrome border border-border',
  'Garanzia+': 'bg-surface-2 text-accent border border-accent/30',
}

export const VehicleCard = memo(function VehicleCard({
  vehicle,
  className,
  priority = false,
}: VehicleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Tilt 3D
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 25 })
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 25 })
  const scale = useSpring(1, { stiffness: 300, damping: 30 })
  const imageScale = useTransform(scale, (s) => 1 + (s - 1) * 2.5)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || reducedMotion) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.width / 2
    const cy = rect.height / 2
    const x = e.clientX - rect.left - cx
    const y = e.clientY - rect.top - cy

    rotateY.set(x / cx * 8)   // max ±8deg
    rotateX.set(-y / cy * 6)  // max ±6deg

    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [rotateX, rotateY, reducedMotion])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    if (!reducedMotion) scale.set(1.02)
  }, [scale, reducedMotion])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    scale.set(1)
    rotateX.set(0)
    rotateY.set(0)
  }, [scale, rotateX, rotateY])

  const displayPrice =
    vehicle.pricePerDay != null
      ? formatPrice(vehicle.pricePerDay, true)
      : vehicle.pricePerMonth != null
        ? formatPrice(vehicle.pricePerMonth, false, true)
        : vehicle.salePrice != null
          ? formatPrice(vehicle.salePrice)
          : null

  const pricePrefix =
    vehicle.pricePerDay != null || vehicle.pricePerMonth != null ? 'da ' : null

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="view"
      data-cursor-label="VIEW"
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        scale,
        transformStyle: 'preserve-3d',
        perspective: 800,
        boxShadow: isHovered
          ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(232,56,13,0.2)'
          : '0 2px 8px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.3s',
      }}
      className={cn(
        'group relative flex flex-col bg-surface rounded-[10px] overflow-hidden border',
        isHovered ? 'border-accent/40' : 'border-border',
        className
      )}
    >
      {/* Spotlight radial */}
      {isHovered && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[10px] z-10"
          style={{
            background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(232,56,13,0.1) 0%, transparent 65%)`,
          }}
        />
      )}

      {/* Badge */}
      {vehicle.badge && (
        <div className="absolute top-3 left-3 z-20">
          <span
            className={cn(
              'font-display font-bold text-[11px] uppercase tracking-wider',
              'px-2.5 py-1 rounded-full',
              badgeColors[vehicle.badge]
            )}
          >
            {vehicle.badge}
          </span>
        </div>
      )}

      {/* Action buttons: Confronta + Wishlist */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
        <CompareButton
          vehicleId={vehicle.id}
          vehicleName={`${vehicle.brand} ${vehicle.name}`}
        />
        <WishlistButton
          vehicleId={vehicle.id}
          vehicleName={`${vehicle.brand} ${vehicle.name}`}
        />
      </div>

      {/* Immagine 16/9 */}
      <div className="relative aspect-video overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
        <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
          <Image
            src={vehicle.images[0]}
            alt={`${vehicle.brand} ${vehicle.name} — Daunia Cars Parma`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={priority}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent" />
      </div>

      {/* Contenuto */}
      <div className="flex flex-col gap-2.5 p-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
          {vehicle.category.replace('-', ' ')}
        </span>

        <h3 className="font-display font-bold text-[20px] text-text-primary leading-tight">
          {vehicle.brand} {vehicle.name}
        </h3>

        <p className="font-mono text-[12px] text-text-muted">
          {vehicle.year}&nbsp;&middot;&nbsp;{formatKm(vehicle.km)}&nbsp;&middot;&nbsp;
          <span className="capitalize">{vehicle.fuel}</span>
        </p>

        {displayPrice && (
          <p className="font-mono font-bold text-[18px] text-accent">
            {pricePrefix && (
              <span className="font-body font-normal text-[13px] text-text-muted mr-1">
                {pricePrefix}
              </span>
            )}
            {displayPrice}
          </p>
        )}

        <Link
          href={`/flotta/${vehicle.slug}`}
          className="mt-1 font-body font-medium text-[14px] text-chrome transition-colors duration-200 hover:text-accent flex items-center gap-1 group/link"
          aria-label={`Dettagli ${vehicle.brand} ${vehicle.name}`}
        >
          Dettagli
          <span className="transition-transform duration-200 group-hover/link:translate-x-1">
            &rarr;
          </span>
        </Link>
      </div>
    </motion.div>
  )
})
