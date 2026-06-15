import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Image inside a clipped frame. The image scales slightly larger than its frame
 * and drifts vertically as the frame passes through the viewport — depth on scroll.
 */
export default function ParallaxImage({
  src,
  alt = '',
  className = '',
  amount = 14,
  rounded = false,
}: {
  src: string
  alt?: string
  className?: string
  amount?: number
  rounded?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        overflow: 'hidden',
        position: 'relative',
        background: 'var(--cream-3)',
        borderRadius: rounded ? '8px' : 0,
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          y,
          width: '100%',
          height: '120%',
          objectFit: 'cover',
          position: 'absolute',
          top: '-10%',
          left: 0,
          willChange: 'transform',
        }}
      />
    </div>
  )
}
