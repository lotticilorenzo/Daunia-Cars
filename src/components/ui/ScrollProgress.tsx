'use client'

import { memo } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export const ScrollProgress = memo(function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] bg-accent origin-left z-[200]"
      style={{ scaleX }}
    />
  )
})
