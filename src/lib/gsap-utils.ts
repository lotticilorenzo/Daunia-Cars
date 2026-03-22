'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─────────────────────────────────────────────
// REGISTRAZIONE PLUGIN
// Chiamare una volta sola nell'entry point
// ─────────────────────────────────────────────

export function registerGSAP(): void {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
  }
}

// ─────────────────────────────────────────────
// SPLIT TEXT MANUALE — word-by-word reveal senza plugin premium
// Wrappa ogni parola in uno span .reveal-word
// ─────────────────────────────────────────────

export function splitIntoWords(el: Element): void {
  const text = el.textContent ?? ''
  el.textContent = ''
  text.split(' ').forEach((word, i, arr) => {
    const span = document.createElement('span')
    span.className = 'reveal-word inline-block'
    span.textContent = i < arr.length - 1 ? word + '\u00a0' : word
    el.appendChild(span)
  })
}

// ─────────────────────────────────────────────
// ANIMAZIONE HERO — fade-up sequenziale
// ─────────────────────────────────────────────

interface HeroAnimateOptions {
  ctx: gsap.Context
  elements: {
    label?: Element | null
    line1?: Element | null
    line2?: Element | null
    subtitle?: Element | null
    ctas?: Element[] | NodeList | null
    badge?: Element | null
  }
}

export function animateHero({ ctx, elements }: HeroAnimateOptions): void {
  ctx.add(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (elements.label) {
      tl.fromTo(elements.label, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.1)
    }
    if (elements.line1) {
      tl.fromTo(elements.line1, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.25)
    }
    if (elements.line2) {
      tl.fromTo(elements.line2, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.4)
    }
    if (elements.subtitle) {
      tl.fromTo(elements.subtitle, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.55)
    }
    if (elements.ctas) {
      tl.fromTo(
        Array.from(elements.ctas),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        0.7
      )
    }
    if (elements.badge) {
      tl.fromTo(elements.badge, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 }, 1.0)
    }
  })
}

// ─────────────────────────────────────────────
// CAR SCROLL SECTION — animazione pinnata
// ─────────────────────────────────────────────

interface CarScrollOptions {
  ctx: gsap.Context
  section: Element
  car: Element
  trail: Element
  chips: [Element, Element, Element, Element]
}

export function initCarScroll({ ctx, section, car, trail, chips }: CarScrollOptions): void {
  ctx.add(() => {
    const isMobile = window.innerWidth < 768

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: isMobile ? '+=120%' : '+=200%',
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
      },
    })

    tl.to([car, trail], { x: '140vw', ease: 'none' })
      .from(chips[0], { opacity: 0, y: 20, duration: 0.1 }, 0.1)
      .from(chips[1], { opacity: 0, y: 20, duration: 0.1 }, 0.3)
      .from(chips[2], { opacity: 0, y: 20, duration: 0.1 }, 0.55)
      .from(chips[3], { opacity: 0, y: 20, duration: 0.1 }, 0.75)
  })
}

// ─────────────────────────────────────────────
// STATS COUNT-UP
// ─────────────────────────────────────────────

interface CountUpOptions {
  ctx: gsap.Context
  targets: { el: Element; end: number; decimals?: number }[]
  trigger: Element
}

export function initCountUp({ ctx, targets, trigger }: CountUpOptions): void {
  ctx.add(() => {
    targets.forEach((item, i) => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: item.end,
        duration: 2,
        ease: 'power2.out',
        delay: i * 0.15,
        scrollTrigger: {
          trigger,
          start: 'top 80%',
          once: true,
        },
        onUpdate: () => {
          item.el.textContent = item.decimals
            ? obj.val.toFixed(item.decimals)
            : Math.floor(obj.val).toString()
        },
      })
    })
  })
}

// ─────────────────────────────────────────────
// MANIFESTO — word-by-word reveal
// ─────────────────────────────────────────────

export function initManifestoReveal(ctx: gsap.Context, container: Element): void {
  ctx.add(() => {
    const words = container.querySelectorAll('.reveal-word')
    if (!words.length) return

    gsap.fromTo(
      words,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.04,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 70%',
        },
      }
    )
  })
}

// ─────────────────────────────────────────────
// SVG LINE DRAW — stroke-dashoffset
// ─────────────────────────────────────────────

export function initLineDraw(ctx: gsap.Context, path: SVGPathElement, trigger: Element): void {
  ctx.add(() => {
    const length = path.getTotalLength()
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger,
        start: 'top 75%',
      },
    })
  })
}

// ─────────────────────────────────────────────
// TIMELINE MILESTONE — punto si illumina
// ─────────────────────────────────────────────

export function initTimelineMilestones(ctx: gsap.Context, milestones: NodeListOf<Element>): void {
  ctx.add(() => {
    milestones.forEach((dot) => {
      gsap.fromTo(
        dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: dot,
            start: 'top 80%',
          },
        }
      )
    })
  })
}

// ─────────────────────────────────────────────
// FADE-IN STAGGER — generico per liste vantaggi
// ─────────────────────────────────────────────

export function initFadeInStagger(
  ctx: gsap.Context,
  items: NodeListOf<Element> | Element[],
  trigger: Element,
  direction: 'up' | 'left' = 'up'
): void {
  ctx.add(() => {
    const from = direction === 'left' ? { x: -30, opacity: 0 } : { y: 24, opacity: 0 }
    const to = direction === 'left' ? { x: 0, opacity: 1 } : { y: 0, opacity: 1 }

    gsap.fromTo(Array.from(items), from, {
      ...to,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start: 'top 75%',
      },
    })
  })
}

// ─────────────────────────────────────────────
// PROCESS STICKY STACK
// ─────────────────────────────────────────────

export function initProcessStack(ctx: gsap.Context, cards: Element[]): void {
  ctx.add(() => {
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return

      // Pre-hinting the browser for GPU acceleration
      gsap.set(card, { willChange: 'transform, opacity' })

      gsap.to(card, {
        scale: 0.92,
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      })
    })
  })
}

// ─────────────────────────────────────────────
// PARALLAX GENERICO
// ─────────────────────────────────────────────

export function initParallax(ctx: gsap.Context, el: Element, speed = -0.3): void {
  ctx.add(() => {
    gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  })
}

// ─────────────────────────────────────────────
// PREFERS-REDUCED-MOTION CHECK
// ─────────────────────────────────────────────

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
