import { useState } from 'react'
import { useLenis } from './lib/useLenis'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Intro from './components/Intro'
import Projects from './components/Projects'
import Services from './components/Services'
import Stats from './components/Stats'
import Testimonial from './components/Testimonial'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)
  useLenis()

  return (
    <>
      <Cursor />
      <Preloader onDone={() => setReady(true)} />

      <Nav start={ready} />

      <main>
        <Hero start={ready} />
        <Marquee items={['Residential', 'Hospitality', 'Bespoke', 'Curation', 'Architecture']} />
        <Intro />
        <Projects />
        <Services />
        <Stats />
        <Testimonial />
        <CTA />
      </main>

      <Footer />
    </>
  )
}
