import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { A } from '../lib/assets';
import { TrustedBy } from '../components/TrustedBy';
import { CraftExperiences } from '../components/CraftExperiences';
import { Testimonials } from '../components/Testimonials';

export const Route = createFileRoute('/')({
  component: GroundAILandingPage,
  head: () => ({
    meta: [
      { title: 'GroundAI — Redefine space with intelligent design' },
      { name: 'description', content: 'GroundAI helps you imagine, plan, and refine spaces through natural conversations.' },
      { property: 'og:title', content: 'GroundAI — Redefine space with intelligent design' },
      { property: 'og:description', content: 'GroundAI helps you imagine, plan, and refine spaces through natural conversations.' }
    ],
    links: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500&family=Playfair+Display:ital@1&display=swap' }
    ]
  })
});

const AnimatedWords = ({ text, baseDelay = 1.2 }: { text: string; baseDelay?: number }) => {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay + i * 0.045, duration: 0.5, ease: 'easeOut' }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </>
  );
};

function GroundAILandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full text-white flex flex-col justify-between p-6 md:p-12 overflow-hidden bg-black">
        <video src={A.Hero} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="absolute inset-0 bg-black/20 z-0" />

        <motion.header 
          initial={{ y: "45vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[1360px] mx-auto flex justify-between items-center z-20 relative"
        >
          <div className="flex items-center gap-[20px]">
            <img src={A.logo} alt="GroundAI" className="w-10 h-10 object-contain" />
            <span className="text-white text-3xl font-medium" style={{ fontFamily: "'Inter Tight', sans-serif" }}>GroundAI</span>
          </div>

          {/* Desktop Nav */}
          <motion.nav 
            layout
            initial={{ width: 110 }}
            animate={{ width: "auto" }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "width" }}
            className="hidden lg:flex bg-black/40 backdrop-blur-lg rounded-3xl items-center overflow-hidden h-[64px] flex-row-reverse"
          >
            <div className="p-1.5 shrink-0">
              <button className="h-12 px-6 rounded-full text-black text-xl font-medium bg-white hover:bg-neutral-100 transition-colors" style={{ fontFamily: "'SF Pro Rounded', system-ui, sans-serif" }}>
                Login
              </button>
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="flex items-center gap-8 pl-8 pr-2 whitespace-nowrap"
            >
              {["Product", "Platform", "Customers", "Company"].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-white text-base opacity-90 hover:opacity-100 transition-opacity">
                  {link}
                </a>
              ))}
            </motion.div>
          </motion.nav>

          {/* Mobile Nav Toggle */}
          <div className="lg:hidden relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-lg flex items-center justify-center relative z-30"
            >
              {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 mt-3 w-60 bg-black/70 backdrop-blur-lg rounded-2xl p-4 flex flex-col gap-3 z-30"
                >
                  {["Product", "Platform", "Customers", "Company"].map((link) => (
                    <a key={link} href={`#${link.toLowerCase()}`} className="text-white text-base opacity-90 hover:opacity-100 px-2 py-1">
                      {link}
                    </a>
                  ))}
                  <button className="h-11 px-6 rounded-full text-black text-lg font-medium bg-white w-full" style={{ fontFamily: "'SF Pro Rounded', system-ui, sans-serif" }}>
                    Login
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>

        <div className="w-full max-w-[800px] mx-auto flex flex-col justify-center items-center gap-6 md:gap-8 text-center my-auto z-10 px-4">
          <h1 className="text-white text-[40px] sm:text-[52px] md:text-[64px] font-normal leading-[1.1] md:leading-[1.02] flex flex-col items-center" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="block">
              Meet GroundAI.
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="block">
              <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>Redefine space</span> with
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="block">
              intelligent design
            </motion.span>
          </h1>
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="h-12 md:h-14 px-6 md:px-8 py-3 bg-white rounded-2xl inline-flex justify-center items-center text-black text-lg md:text-xl font-medium hover:bg-neutral-200 transition-colors shadow-lg mt-2 md:mt-0"
            style={{ fontFamily: "'SF Pro Rounded', system-ui, sans-serif" }}
          >
            Start free decoration
          </motion.button>
        </div>

        <footer className="w-full max-w-[1360px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-10">
          <div className="w-full md:w-[480px] max-w-prose text-white/80 text-xl leading-[1.25] text-left" style={{ fontFamily: "'SF Pro Rounded', system-ui, sans-serif" }}>
            <AnimatedWords text="It helps you imagine, plan, and refine spaces through natural conversations. From choosing colors and layouts to suggesting furniture and décor, it adapts to your taste." baseDelay={1.2} />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex flex-row flex-wrap lg:flex-col items-center lg:items-end gap-2.5 w-full md:w-auto justify-end"
          >
            <div className="h-[56px] px-5 rounded-2xl border border-white/40 text-white text-xl whitespace-nowrap flex items-center justify-center" style={{ fontFamily: "'SF Pro Rounded', system-ui, sans-serif" }}>
              Solutions for complex spaces
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[56px] h-[56px] rounded-2xl border border-white/40 flex items-center justify-center shrink-0">
                <img src={A.ArrowUp} alt="Arrow Up" className="w-6 h-6 object-contain" />
              </div>
              <div className="h-[56px] px-5 rounded-2xl border border-white/40 text-white text-xl whitespace-nowrap flex items-center justify-center" style={{ fontFamily: "'SF Pro Rounded', system-ui, sans-serif" }}>
                Conversational & Action
              </div>
            </div>
          </motion.div>
        </footer>
      </section>

      <TrustedBy />
      <CraftExperiences />
      <Testimonials />
    </div>
  );
}
