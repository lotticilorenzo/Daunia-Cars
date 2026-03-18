'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
}

interface FilterTabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
  layoutId?: string
}

export function FilterTabs({
  tabs,
  activeTab,
  onChange,
  className,
  layoutId = 'filter-pill',
}: FilterTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filtri"
      className={cn(
        'relative flex items-center gap-1 p-1 rounded-full bg-surface-2',
        'w-full overflow-x-auto sm:w-fit',
        'scrollbar-none',
        className
      )}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative z-10 px-4 py-2.5 rounded-full font-body font-medium text-sm whitespace-nowrap shrink-0',
              'transition-colors duration-200 focus-visible:outline-none',
              'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-surface-2',
              isActive ? 'text-white' : 'text-text-secondary hover:text-text-primary'
            )}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-accent"
                style={{ zIndex: -1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
