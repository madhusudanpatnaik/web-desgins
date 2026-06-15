import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import RevealText from './ui/RevealText'
import { fadeUp, viewport, EASE } from '../lib/anim'

const img = (id: string) => `https://images.unsplash.com/photo-${id}?q=80&w=900&auto=format&fit=crop`

const services = [
  { n: '01', title: 'Interior Architecture', desc: 'Spatial planning, structural reimagining and bespoke joinery.', src: img('1586023492125-27b2c045efd7') },
  { n: '02', title: 'Styling & FF&E', desc: 'Furniture, finishes, fixtures — sourced and composed.', src: img('1567538096630-e0c55bd6374c') },
  { n: '03', title: 'Bespoke Furniture', desc: 'One-of-a-kind pieces designed and made for the room.', src: img('1538688525198-9b88f6f53126') },
  { n: '04', title: 'Art Direction', desc: 'Curation, lighting design and the final, considered layer.', src: img('1615875605825-5eb9bb5d52ac') },
  { n: '05', title: 'Hospitality', desc: 'Hotels and restaurants conceived as complete worlds.', src: img('1582719478250-c89cae4dc85b') },
]

export default function Services() {
  const [active, setActive] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const px = useSpring(x, { stiffness: 200, damping: 22 })
  const py = useSpring(y, { stiffness: 200, damping: 22 })

  return (
    <section
      id="services"
      style={{ paddingBlock: 'var(--section)', background: 'var(--ink)', color: 'var(--cream)', position: 'relative' }}
      onMouseMove={(e) => {
        x.set(e.clientX)
        y.set(e.clientY)
      }}
    >
      <div className="shell">
        <div className="maxw">
          <div style={{ marginBottom: 'clamp(3rem, 7vh, 5rem)' }}>
            <span className="eyebrow" style={{ color: 'var(--brass-light)' }}>[ 03 — Expertise ]</span>
            <RevealText text={'What we do,\nend to end'} as="h2" className="display" />
          </div>

          <div style={{ borderTop: '1px solid var(--line-light)' }}>
            {services.map((s, i) => (
              <motion.div
                key={s.n}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                data-cursor
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: 'clamp(1rem, 4vw, 3rem)',
                  alignItems: 'center',
                  padding: 'clamp(1.4rem, 3.4vh, 2.4rem) 0',
                  borderBottom: '1px solid var(--line-light)',
                  position: 'relative',
                }}
              >
                <motion.div
                  animate={{ paddingLeft: active === i ? 24 : 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ display: 'contents' }}
                />
                <span className="eyebrow tnum" style={{ color: active === i ? 'var(--brass-light)' : 'var(--stone)', transition: 'color 0.4s' }}>
                  {s.n}
                </span>
                <motion.h3
                  className="display"
                  animate={{ x: active === i ? 22 : 0, color: active === i ? '#c6a87d' : '#f3efe8' }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)', fontWeight: 400 }}
                >
                  {s.title}
                </motion.h3>
                <motion.span
                  animate={{ opacity: active === i ? 1 : 0.35 }}
                  className="muted services-desc"
                  style={{ maxWidth: 260, fontSize: '0.85rem', textAlign: 'right', color: 'var(--cream-3)' }}
                >
                  {s.desc}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Cursor-following preview */}
      <motion.div
        style={{
          position: 'fixed',
          left: px,
          top: py,
          translateX: '-50%',
          translateY: '-50%',
          width: 280,
          height: 340,
          pointerEvents: 'none',
          zIndex: 70,
          overflow: 'hidden',
          borderRadius: 6,
        }}
      >
        <AnimatePresence>
          {active !== null && (
            <motion.img
              key={services[active].src}
              src={services[active].src}
              alt=""
              initial={{ opacity: 0, scale: 1.1, clipPath: 'inset(100% 0 0 0)' }}
              animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0 0 0)' }}
              exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
