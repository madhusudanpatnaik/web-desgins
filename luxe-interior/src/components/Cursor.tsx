import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/** Difference-blend dot + trailing ring that swells over interactive elements. */
export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.5 })
  const dotX = useSpring(x, { stiffness: 600, damping: 35 })
  const dotY = useSpring(y, { stiffness: 600, damping: 35 })

  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target as HTMLElement
      const interactive = !!el.closest('a, button, [data-cursor], input, textarea, [data-scroll-to]')
      setHovering(interactive)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <>
      <motion.div
        className="cursor"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: hovering ? 1.6 : 1,
          backgroundColor: hovering ? 'rgba(169,136,94,0.12)' : 'rgba(169,136,94,0)',
          borderColor: hovering ? 'rgba(169,136,94,0.8)' : 'rgba(22,19,14,0.4)',
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  )
}
