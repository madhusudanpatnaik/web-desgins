import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { fadeUp, viewport } from '../lib/anim'

const statement =
  'We believe a room should feel inevitable — as though it could never have been arranged any other way. Every commission begins with restraint and ends in warmth.'

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  accent?: boolean
}) {
  const opacity = useTransform(progress, range, [0.16, 1])
  const color = useTransform(progress, range, accent ? ['#cdbfa9', '#a9885e'] : ['#cdbfa9', '#16130e'])
  return (
    <motion.span style={{ opacity, color, display: 'inline-block', marginRight: '0.28em' }}>
      {children}
    </motion.span>
  )
}

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.25'],
  })

  const words = statement.split(' ')
  const accents = new Set(['inevitable', 'restraint', 'warmth.'])

  return (
    <section id="intro" className="shell" style={{ paddingBlock: 'var(--section)' }}>
      <div className="maxw">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,2.4fr)',
            gap: 'clamp(2rem, 6vw, 7rem)',
            alignItems: 'start',
          }}
          className="intro-grid"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            style={{ position: 'sticky', top: '20vh' }}
          >
            <span className="eyebrow">[ 01 — Philosophy ]</span>
            <div style={{ marginTop: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ width: 40, height: 1, background: 'var(--brass)' }} />
              <span className="serif-italic" style={{ fontSize: '1.3rem' }}>Aurélie Marchand</span>
            </div>
            <p className="muted" style={{ marginTop: '0.4rem', fontSize: '0.78rem', letterSpacing: '0.04em' }}>
              Founder &amp; Creative Director
            </p>
          </motion.div>

          <div ref={ref}>
            <h2
              className="display"
              style={{ fontSize: 'clamp(1.8rem, 4.2vw, 3.7rem)', lineHeight: 1.2, fontWeight: 400 }}
            >
              {words.map((w, i) => {
                const start = i / words.length
                const end = Math.min(1, start + 1.4 / words.length)
                return (
                  <Word key={i} progress={scrollYProgress} range={[start, end]} accent={accents.has(w)}>
                    {w}
                  </Word>
                )
              })}
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}
