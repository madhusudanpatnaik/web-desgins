import { motion } from 'framer-motion'
import { fadeUp, viewport, EASE } from '../lib/anim'

const cols = [
  {
    head: 'Studio',
    links: ['Atelier', 'Selected Work', 'Expertise', 'The Practice', 'Journal'],
  },
  {
    head: 'Connect',
    links: ['Instagram', 'Pinterest', 'LinkedIn', 'Architectural Digest'],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--cream)', paddingTop: 'clamp(4rem, 8vh, 6rem)' }}>
      <div className="shell">
        <div className="maxw">
          <div className="footer-top">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
              <span className="eyebrow" style={{ color: 'var(--brass-light)' }}>Newsletter</span>
              <p className="display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginTop: '1rem', maxWidth: 420, lineHeight: 1.25 }}>
                Occasional notes on new work and the craft behind it.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                style={{ marginTop: '1.8rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--line-light)', maxWidth: 420, paddingBottom: '0.7rem' }}
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--cream)', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}
                />
                <button data-cursor className="cap" style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: 'var(--brass-light)' }}>
                  Subscribe →
                </button>
              </form>
            </motion.div>

            <div className="footer-cols">
              {cols.map((c) => (
                <motion.div key={c.head} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
                  <span className="eyebrow" style={{ color: 'var(--stone)' }}>{c.head}</span>
                  <ul style={{ listStyle: 'none', marginTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                    {c.links.map((l) => (
                      <li key={l}>
                        <a data-cursor href="#" className="footer-link" style={{ fontSize: '0.95rem', color: 'var(--cream-3)' }}>
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}

              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
                <span className="eyebrow" style={{ color: 'var(--stone)' }}>Visit</span>
                <p style={{ marginTop: '1.2rem', color: 'var(--cream-3)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                  Rua das Flores 24<br />
                  1200-194 Lisbon<br />
                  Portugal
                </p>
              </motion.div>
            </div>
          </div>

          {/* Giant wordmark */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE }}
            style={{ marginTop: 'clamp(3rem, 8vh, 6rem)', borderTop: '1px solid var(--line-light)', paddingTop: 'clamp(2rem, 4vh, 3rem)' }}
          >
            <h2 className="display" style={{ fontSize: 'clamp(4rem, 26vw, 24rem)', lineHeight: 0.8, letterSpacing: '0.01em', textAlign: 'center' }}>
              AURÉA
            </h2>
          </motion.div>

          <div className="footer-bottom">
            <span className="eyebrow" style={{ color: 'var(--stone)' }}>© 2026 Auréa Atelier — All rights reserved</span>
            <span className="eyebrow" style={{ color: 'var(--stone)' }}>Interior Architecture &amp; Design</span>
            <a data-cursor href="#top" data-scroll-to="#top" className="eyebrow" style={{ color: 'var(--brass-light)' }}>
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
