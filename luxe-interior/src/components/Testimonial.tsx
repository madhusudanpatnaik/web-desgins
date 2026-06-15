import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { fadeUp, viewport } from '../lib/anim'

export default function Testimonial() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        paddingBlock: 'clamp(7rem, 18vh, 13rem)',
        overflow: 'hidden',
        background: 'var(--ink)',
      }}
    >
      {/* Parallax backdrop image */}
      <motion.div
        style={{
          y,
          position: 'absolute',
          inset: '-10% 0',
          backgroundImage:
            'linear-gradient(rgba(15,12,8,0.66), rgba(15,12,8,0.66)), url(https://images.unsplash.com/photo-1618219740975-d40978bb7378?q=80&w=1800&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="shell" style={{ position: 'relative', zIndex: 2 }}>
        <div className="maxw" style={{ textAlign: 'center', maxWidth: 1100, marginInline: 'auto' }}>
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="display"
            style={{ display: 'block', fontSize: '4rem', color: 'var(--brass-light)', lineHeight: 0.5 }}
          >
            “
          </motion.span>

          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="display"
            style={{
              fontSize: 'clamp(1.7rem, 4.3vw, 3.6rem)',
              lineHeight: 1.25,
              color: 'var(--cream)',
              fontWeight: 400,
              marginTop: '1.5rem',
            }}
          >
            They did not decorate our home — they understood how we wanted to{' '}
            <span className="serif-italic" style={{ color: 'var(--brass-light)' }}>live in it</span>, and
            then made that feeling inevitable in every room.
          </motion.blockquote>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}
          >
            <span style={{ width: 46, height: 1, background: 'var(--brass)' }} />
            <span className="cap" style={{ color: 'var(--cream)', fontSize: '0.78rem', letterSpacing: '0.16em', marginTop: '0.8rem' }}>
              Elena &amp; Marco Visconti
            </span>
            <span className="eyebrow" style={{ color: 'var(--stone)' }}>
              Private Residence, Lake Como
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
