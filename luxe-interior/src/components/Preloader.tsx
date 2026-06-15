import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from '../lib/anim'

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    let n = 0
    const tick = () => {
      n += Math.floor(Math.random() * 6) + 2
      if (n >= 100) {
        n = 100
        setCount(100)
        setTimeout(() => setOpen(false), 600)
        setTimeout(onDone, 1500)
        return
      }
      setCount(n)
      setTimeout(tick, 90 + Math.random() * 110)
    }
    const id = setTimeout(tick, 350)
    return () => clearTimeout(id)
  }, [onDone])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <div style={{ overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '120%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}
              style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}
            >
              <span
                className="display"
                style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)', letterSpacing: '0.04em' }}
              >
                AURÉA
              </span>
              <span className="eyebrow" style={{ color: 'var(--brass-light)' }}>
                Interior Atelier
              </span>
            </motion.div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem' }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="eyebrow"
              style={{ color: 'var(--stone)', maxWidth: 220, lineHeight: 1.7 }}
            >
              Composing spaces with intention
            </motion.span>
            <span
              className="display tnum"
              style={{ fontSize: 'clamp(3rem, 9vw, 7rem)', lineHeight: 0.8, color: 'var(--cream)' }}
            >
              {count}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
