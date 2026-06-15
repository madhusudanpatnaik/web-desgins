import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import ParallaxImage from './ui/ParallaxImage'
import RevealText from './ui/RevealText'
import { fadeUp, viewport, EASE } from '../lib/anim'

const stats = [
  { value: 15, suffix: '', label: 'Years of practice' },
  { value: 120, suffix: '+', label: 'Projects delivered' },
  { value: 28, suffix: '', label: 'International awards' },
  { value: 14, suffix: '', label: 'Countries' },
]

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const dur = 1600
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - t, 3)
      setN(Math.round(eased * to))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return (
    <span ref={ref} className="tnum">
      {n}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section id="stats" className="shell" style={{ paddingBlock: 'var(--section)' }}>
      <div className="maxw">
        <div className="stats-grid">
          {/* Left: image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            style={{ height: 'clamp(360px, 60vh, 640px)' }}
          >
            <ParallaxImage
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
              alt="Atelier interior"
              className="stats-img"
              amount={10}
              rounded
            />
          </motion.div>

          {/* Right: copy + numbers */}
          <div>
            <span className="eyebrow">[ 04 — The Practice ]</span>
            <RevealText
              text={'Measured in\ncraft, not haste'}
              as="h2"
              className="display"
            />
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              style={{ marginTop: '1.6rem', maxWidth: 460, color: 'var(--ink-soft)', lineHeight: 1.8 }}
            >
              For over a decade we have taken on a deliberately small number of
              commissions each year — giving every space the time, sourcing and
              attention that distinction requires.
            </motion.p>

            <div className="numbers">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  style={{ borderTop: '1px solid var(--line)', paddingTop: '1.1rem' }}
                >
                  <div className="display" style={{ fontSize: 'clamp(2.6rem, 6vw, 4.4rem)', lineHeight: 1 }}>
                    <CountUp to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="eyebrow" style={{ marginTop: '0.6rem', color: 'var(--stone)' }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
