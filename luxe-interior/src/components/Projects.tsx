import { motion } from 'framer-motion'
import ParallaxImage from './ui/ParallaxImage'
import RevealText from './ui/RevealText'
import { fadeUp, viewport } from '../lib/anim'

const img = (id: string) => `https://images.unsplash.com/photo-${id}?q=80&w=1500&auto=format&fit=crop`

const projects = [
  {
    n: '01',
    title: 'Maison Lúmen',
    cat: 'Private Residence',
    place: 'Comporta',
    year: '2024',
    src: img('1618221195710-dd6b41faaea6'),
    span: 'wide',
  },
  {
    n: '02',
    title: 'Hôtel Verdé',
    cat: 'Hospitality',
    place: 'Milan',
    year: '2023',
    src: img('1582719478250-c89cae4dc85b'),
    span: 'tall',
  },
  {
    n: '03',
    title: 'The Linden Penthouse',
    cat: 'Residence',
    place: 'New York',
    year: '2023',
    src: img('1600210492493-0946911123ea'),
    span: 'tall',
  },
  {
    n: '04',
    title: 'Atelier Saine',
    cat: 'Gallery & Studio',
    place: 'Lisbon',
    year: '2022',
    src: img('1616486338812-3dadae4b4ace'),
    span: 'wide',
  },
]

function ProjectCard({ p, i }: { p: (typeof projects)[number]; i: number }) {
  return (
    <motion.article
      className={`project project--${p.span}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      data-cursor
    >
      <div className="project__media">
        <ParallaxImage src={p.src} alt={p.title} className="project__img" amount={12} />
        <span className="project__view">
          <span className="dot" style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
          View Project
        </span>
      </div>
      <div className="project__meta">
        <span className="eyebrow tnum">({p.n})</span>
        <RevealText
          text={p.title}
          as="h3"
          className="display project__title"
        />
        <div className="project__sub">
          <span>{p.cat}</span>
          <span className="muted">{p.place} — {p.year}</span>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="work" className="shell" style={{ paddingBlock: 'var(--section)' }}>
      <div className="maxw">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: 'clamp(3rem, 7vh, 6rem)',
          }}
        >
          <div>
            <span className="eyebrow">[ 02 — Selected Work ]</span>
            <RevealText
              text={'A portfolio of\nquiet distinction'}
              as="h2"
              className="display"
              delay={0.1}
            />
          </div>
          <motion.a
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            href="#contact"
            data-scroll-to="#contact"
            className="btn"
            data-cursor
          >
            <span className="dot" /> All Projects
          </motion.a>
        </div>

        <div className="project-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.n} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
