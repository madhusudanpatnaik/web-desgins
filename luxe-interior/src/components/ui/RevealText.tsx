import { motion } from 'framer-motion'
import { riseLine, viewport } from '../../lib/anim'

type Props = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delay?: number
  /** stagger each word instead of each line */
  byWord?: boolean
}

/**
 * Splits a string into lines (by \n) or words and reveals each from a clip mask.
 * The signature cinematic-headline move.
 */
export default function RevealText({ text, as = 'h2', className = '', delay = 0, byWord = false }: Props) {
  const Tag = motion[as] as typeof motion.h2
  const units = byWord ? text.split(' ') : text.split('\n')

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {units.map((unit, i) => (
        <span className="reveal-line" key={i} style={{ display: byWord ? 'inline-block' : 'block' }}>
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            variants={riseLine}
            custom={i + delay * 10}
          >
            {unit}
            {byWord && i < units.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
