import { motion } from 'framer-motion'
import HeroScene from './HeroScene'
import { EASE } from '../lib/anim'

const lines = [
  { text: 'Interiors', italic: false },
  { text: 'for a', italic: false },
  { text: 'considered life', italic: true },
]

export default function Hero({ start }: { start: boolean }) {
  return (
    <section
      id="top"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'clamp(7rem, 12vh, 10rem)',
        paddingBottom: 'clamp(2rem, 5vh, 3.5rem)',
        overflow: 'hidden',
      }}
      className="shell"
    >
      {/* 3D centerpiece */}
      <div aria-hidden className="hero-3d">
        <motion.div
          initial={{ opacity: 0 }}
          animate={start ? { opacity: 1 } : {}}
          transition={{ duration: 1.6, ease: EASE, delay: 0.4 }}
          style={{ width: '100%', height: '100%' }}
        >
          <HeroScene />
        </motion.div>
      </div>

      <div className="maxw" style={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Top meta bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={start ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <span className="eyebrow">Interior Architecture — Est. 2009</span>
          <span className="eyebrow" style={{ textAlign: 'right' }}>Lisbon · Milan · New York</span>
        </motion.div>

        {/* Headline anchored to the lower portion */}
        <div style={{ marginTop: 'auto' }}>
          <h1 className="display" style={{ fontSize: 'clamp(3.2rem, 11vw, 10rem)', lineHeight: 0.92 }}>
            {lines.map((line, i) => (
              <span className="reveal-line" key={i} style={{ display: 'block' }}>
                <motion.span
                  style={{ display: 'inline-block', fontStyle: line.italic ? 'italic' : 'normal', fontWeight: line.italic ? 300 : 400 }}
                  initial={{ y: '110%' }}
                  animate={start ? { y: '0%' } : {}}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.55 + i * 0.12 }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={start ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: EASE, delay: 1 }}
          style={{
            marginTop: 'clamp(2rem, 5vh, 3.5rem)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <p style={{ maxWidth: 380, color: 'var(--ink-soft)', fontSize: '0.95rem', lineHeight: 1.75 }}>
            A multidisciplinary atelier shaping residences, hospitality and private
            spaces — where material, light and proportion meet quiet intention.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <span className="eyebrow">Scroll</span>
            <span style={{ position: 'relative', width: 70, height: 1, background: 'var(--line)', overflow: 'hidden' }}>
              <motion.span
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity }}
                style={{ position: 'absolute', inset: 0, background: 'var(--brass)' }}
              />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
