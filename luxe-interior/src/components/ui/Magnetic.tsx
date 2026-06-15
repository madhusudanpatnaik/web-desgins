import { useRef, type ReactNode } from 'react'
import { motion, useSpring } from 'framer-motion'

/** Element drifts toward the cursor while hovered — a tactile, premium micro-interaction. */
export default function Magnetic({
  children,
  strength = 0.4,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.4 })
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.4 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: 'inline-block' }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  )
}
