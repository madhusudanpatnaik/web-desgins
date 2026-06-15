import { motion } from 'framer-motion'

export default function Marquee({
  items,
  duration = 28,
  dark = false,
}: {
  items: string[]
  duration?: number
  dark?: boolean
}) {
  const content = [...items, ...items]
  return (
    <div
      className="marquee"
      style={{
        padding: '2.2rem 0',
        background: dark ? 'var(--ink)' : 'transparent',
        color: dark ? 'var(--cream)' : 'var(--ink)',
        borderTop: dark ? 'none' : '1px solid var(--line)',
        borderBottom: dark ? 'none' : '1px solid var(--line)',
      }}
    >
      <motion.div
        className="marquee__track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {content.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span
              className="display"
              style={{ fontSize: 'clamp(1.6rem, 3.4vw, 3rem)', fontWeight: 400, padding: '0 1.6rem' }}
            >
              {item}
            </span>
            <span style={{ color: 'var(--brass)', fontSize: '0.8rem' }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
