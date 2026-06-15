import { motion } from 'framer-motion'
import Magnetic from './ui/Magnetic'
import { fadeUp, riseLine, viewport } from '../lib/anim'

// Closing call-to-action — headline reveal observes the unclipped <h2> parent.
export default function CTA() {
  return (
    <section id="contact" className="shell" style={{ paddingBlock: 'var(--section)', textAlign: 'center' }}>
      <div className="maxw" style={{ maxWidth: 1200, marginInline: 'auto' }}>
        <motion.span variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="eyebrow">
          [ 05 — Begin ]
        </motion.span>

        <motion.h2
          className="display"
          style={{ fontSize: 'clamp(2.6rem, 10vw, 9rem)', lineHeight: 0.98, marginTop: '1.5rem' }}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {['Let us compose', 'something '].map((t, i) => (
            <span className="reveal-line" key={i} style={{ display: 'block' }}>
              <motion.span style={{ display: 'inline-block' }} variants={riseLine} custom={i}>
                {t}
                {i === 1 && <span className="serif-italic" style={{ color: 'var(--brass)' }}>extraordinary</span>}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          style={{ marginTop: 'clamp(2.5rem, 6vh, 4rem)', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
        >
          <Magnetic strength={0.5}>
            <a
              href="mailto:studio@aurea-atelier.com"
              data-cursor
              className="cta-circle"
            >
              <span>Start a<br />Project</span>
            </a>
          </Magnetic>

          <a
            href="mailto:studio@aurea-atelier.com"
            data-cursor
            className="display"
            style={{ fontSize: 'clamp(1.4rem, 4vw, 2.6rem)', borderBottom: '1px solid var(--line)', paddingBottom: '0.2rem' }}
          >
            studio@aurea-atelier.com
          </a>
        </motion.div>
      </div>
    </section>
  )
}
