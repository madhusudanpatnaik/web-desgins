import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Magnetic from './ui/Magnetic'
import { EASE } from '../lib/anim'

const links = [
  { label: 'Atelier', href: '#intro' },
  { label: 'Work', href: '#work' },
  { label: 'Expertise', href: '#services' },
  { label: 'Journal', href: '#stats' },
]

export default function Nav({ start }: { start: boolean }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={start ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 90,
        padding: scrolled ? '0.9rem var(--gutter)' : '1.6rem var(--gutter)',
        transition: 'padding 0.5s var(--ease), background 0.5s ease, backdrop-filter 0.5s ease',
        background: scrolled ? 'rgba(243,239,232,0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line-soft)' : '1px solid transparent',
      }}
    >
      <div
        className="maxw"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <a href="#top" data-scroll-to="#top" style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
          <span className="display" style={{ fontSize: '1.7rem', letterSpacing: '0.06em' }}>
            AURÉA
          </span>
          <span className="eyebrow" style={{ fontSize: '0.55rem' }}>
            Atelier
          </span>
        </a>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.2rem, 3vw, 3rem)' }} className="nav-links">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-scroll-to={l.href}
              className="cap"
              style={{ fontSize: '0.72rem', letterSpacing: '0.14em', position: 'relative' }}
              onMouseEnter={(e) => ((e.currentTarget.querySelector('.ul') as HTMLElement).style.transform = 'scaleX(1)')}
              onMouseLeave={(e) => ((e.currentTarget.querySelector('.ul') as HTMLElement).style.transform = 'scaleX(0)')}
            >
              {l.label}
              <span
                className="ul"
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: '-6px',
                  height: '1px',
                  width: '100%',
                  background: 'var(--ink)',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.5s var(--ease)',
                }}
              />
            </a>
          ))}

          <Magnetic strength={0.35}>
            <a href="#contact" data-scroll-to="#contact" className="btn" data-cursor>
              <span className="dot" />
              Enquire
            </a>
          </Magnetic>
        </nav>
      </div>
    </motion.header>
  )
}
