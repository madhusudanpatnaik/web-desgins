import type { Variants } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1] as const
export const EASE_OUT = [0.16, 1, 0.3, 1] as const

/** Word/line that rises from a clipped mask. */
export const riseLine: Variants = {
  hidden: { y: '110%' },
  show: (i: number = 0) => ({
    y: '0%',
    transition: { duration: 1, ease: EASE, delay: 0.05 + i * 0.08 },
  }),
}

/** Soft fade + lift for blocks of copy and UI. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: i * 0.08 },
  }),
}

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

/** Scale-in image reveal (paired with a clip-path mask on the wrapper). */
export const imageScale: Variants = {
  hidden: { scale: 1.18 },
  show: { scale: 1, transition: { duration: 1.4, ease: EASE } },
}

export const maskWipe: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.2, ease: EASE } },
}

export const viewport = { once: true, margin: '-12% 0px -12% 0px' } as const
