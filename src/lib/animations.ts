import type { Variants } from 'framer-motion'

// ─────────────────────────────────────────────
// TRANSIZIONI BASE
// ─────────────────────────────────────────────

const easeOut = [0.0, 0.0, 0.2, 1.0] as const
const spring = { type: 'spring', stiffness: 300, damping: 30 } as const
const springGentle = { type: 'spring', stiffness: 150, damping: 20 } as const

// ─────────────────────────────────────────────
// VARIANTI RIUSABILI
// ─────────────────────────────────────────────

/**
 * Fade dal basso verso l'alto — per testi, card, sezioni.
 * Rispetta prefers-reduced-motion: usa opacità pura senza traslazione.
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: easeOut,
    },
  },
}

/**
 * Fade da sinistra — per elementi di navigazione, label, decorazioni.
 */
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
}

/**
 * Slide da destra — per drawer, pannelli laterali, carousel items.
 */
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 48,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    x: 48,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
}

/**
 * Scale in — per modali, tooltip, badge, elementi "pop".
 * Spring physics per naturalezza.
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springGentle,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
}

/**
 * Container con stagger sui figli.
 * Usare insieme a fadeInUp/fadeInLeft sui children.
 * @example
 * <motion.ul variants={staggerContainer} initial="hidden" animate="visible">
 *   <motion.li variants={fadeInUp}>...</motion.li>
 * </motion.ul>
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

/**
 * Stagger più lento — per griglie di card veicoli.
 */
export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

/**
 * Hover card veicolo — translateY + shadow accent.
 * Usare con whileHover="hover" direttamente sul motion.div.
 */
export const cardHover: Variants = {
  rest: {
    y: 0,
    transition: springGentle,
  },
  hover: {
    y: -4,
    transition: springGentle,
  },
}

/**
 * Pill indicator per FilterTabs — usare con layoutId per la transizione fluida.
 */
export const tabIndicator: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: spring,
  },
}

/**
 * Page transition — per AnimatePresence tra pagine.
 */
export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1],
    },
  },
}

/**
 * Drawer mobile — slide dal basso.
 */
export const drawerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: '100%',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 28,
    },
  },
  exit: {
    opacity: 0,
    y: '100%',
    transition: {
      duration: 0.28,
      ease: [0.4, 0, 1, 1],
    },
  },
}
