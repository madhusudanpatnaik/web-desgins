import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Buttery inertial scrolling. Drives native scroll position so Framer Motion's
 * useScroll() stays in sync. Returns nothing — fire-and-forget on mount.
 */
export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Allow anchor links / data-scroll-to to use Lenis
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('[data-scroll-to]') as HTMLElement | null
      if (!target) return
      const id = target.getAttribute('data-scroll-to')
      if (!id) return
      const el = document.querySelector(id)
      if (el) {
        e.preventDefault()
        lenis.scrollTo(el as HTMLElement, { offset: -10, duration: 1.5 })
      }
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      lenis.destroy()
    }
  }, [])
}
