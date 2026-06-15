import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Instagram, MoveRight, Menu, Clock3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IntroSequence } from './IntroSequence';
import { StarField } from './StarField';
import { LineField } from './LineField';

// Import all assets
import logoSrc from '@/assets/logo.svg';
import photoRalphPortrait from '@/assets/photo-ralph-portrait.png';
import photoBasketball from '@/assets/photo-basketball.png';
import photoHat from '@/assets/photo-hat.png';
import photoRed from '@/assets/photo-red.png';
import photoSculptureBw from '@/assets/photo-sculpture-bw.png';
import photoSculptureColor from '@/assets/photo-sculpture-color.png';
import photoTwins from '@/assets/photo-twins.png';
import photoBerries from '@/assets/photo-berries.png';
import photoFieldsBw from '@/assets/photo-fields-bw.png';
import photoFieldsColor from '@/assets/photo-fields-color.png';
import photoCar from '@/assets/photo-car.png';
import photoGirlGrass from '@/assets/photo-girl-grass.png';
import photoCamera from '@/assets/photo-camera.png';
import getInTouchBg from '@/assets/get-in-touch-bg.png';
import noiseSrc from '@/assets/noise.png';
import bgSilhouettes from '@/assets/bg-silhouettes.png';
import bgNikon from '@/assets/bg-nikon.png';
import bgFabric from '@/assets/bg-fabric.png';
import vectorSrc from '@/assets/Vector.svg';
import ellipseArcSrc from '@/assets/ellipse-arc.png';

const MATTE = "bg-[oklch(0.16_0.004_240)]";
const EASE = [0.22, 1, 0.36, 1];
const INTRO_DELAY = 2.9; // 2900ms

const blurIn = (custom = 0) => ({
  hidden: { opacity: 0, y: 24, filter: 'blur(14px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, delay: INTRO_DELAY + custom * 0.08, ease: EASE },
  },
});

const photoIn = (custom = 0) => ({
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(12px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.2, delay: INTRO_DELAY + 0.1 + custom * 0.1, ease: EASE },
  },
});

// Helper for image fallbacks
const SafeImage = ({ src, alt, className, containerClassName }: { src: string, alt: string, className?: string, containerClassName?: string }) => {
  const [error, setError] = useState(false);
  if (error) {
    return <div className={cn("bg-[oklch(0.18_0_0)]", containerClassName, className)} />;
  }
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
};

const SafeDecoImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const [error, setError] = useState(false);
  if (error) return null;
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} aria-hidden="true" />;
};

// Pinterest Icon
const PinterestIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0a12 12 0 0 0-4.4 23.2c-.1-1-.2-2.5 0-3.6l1.5-6.3s-.4-.7-.4-1.8c0-1.7 1-3 2.2-3 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4 .2.7.8 1.4 1.7 1.4 2 0 3.5-2.2 3.5-5.3 0-2.8-2-4.7-4.8-4.7-3.3 0-5.2 2.5-5.2 5 0 1 .4 2 .9 2.6.1.1.1.2.1.3-.1.4-.3 1.1-.3 1.3-.1.2-.2.3-.4.2-1.4-.7-2.3-2.7-2.3-4.4 0-3.6 2.6-6.9 7.6-6.9 4 0 7.1 2.8 7.1 6.6 0 4-2.5 7.2-6 7.2-1.2 0-2.3-.6-2.6-1.3l-.7 2.7c-.3 1-1 2.3-1.5 3.1A12 12 0 1 0 12 0z" />
  </svg>
);

const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 px-6 md:px-10">
      <div className="flex items-center justify-between gap-4">
        {/* Logo */}
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: INTRO_DELAY - 0.2, ease: EASE }}
          className="block"
        >
          {logoError ? (
            <span className="font-display font-black text-white h-6 flex items-center">VALMAX</span>
          ) : (
            <img src={logoSrc} alt="VALMAX logo" className="h-6 w-auto" onError={() => setLogoError(true)} />
          )}
        </motion.a>

        {/* Email Form (desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <div className="relative">
            <input
              type="email"
              placeholder="Your email"
              className="bg-white/10 text-white text-sm rounded-full pl-4 pr-10 py-2 border border-transparent focus:outline-none focus:border-white/20 transition-colors w-64"
            />
            <button className="absolute right-1 top-1 bottom-1 px-3 bg-white text-black text-xs rounded-full font-medium uppercase tracking-wide hover:bg-white/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {['Our photographer', 'Projects', 'Marvels'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-white/70 hover:text-white transition-colors">
              {item}
            </a>
          ))}
          <a href="#contact" className="ml-4 inline-flex items-center justify-center bg-white text-black text-sm font-medium rounded-full px-5 py-2 hover:bg-white/90 transition-colors uppercase">
            Let's talk
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-[60] text-white/80 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#090909] pt-24 pb-8 flex flex-col">
          <nav className="flex-1 px-6 space-y-2">
            {['Home', 'Our photographer', 'Projects', 'Marvels'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="group flex items-center justify-between px-4 py-3 rounded-xl text-sm text-white/80 hover:text-white hover:bg-white/[0.06] transition"
                onClick={() => setMenuOpen(false)}
              >
                {item}
                <ArrowUpRight className="w-4 h-4 opacity-40 transition group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </nav>
          <div className="mt-2 px-6 py-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
            <span>Follow</span>
            <a href="#instagram" className="hover:text-white transition-colors">
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

const RalphHero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  const pX = prefersReducedMotion ? 0 : mousePos.x;
  const pY = prefersReducedMotion ? 0 : mousePos.y;

  return (
    <section className={cn("relative min-h-[110vh] pt-32 pb-24 overflow-hidden", MATTE)} style={{ '--mx': pX * -50, '--my': pY * -50 } as any}>
      <StarField count={700} ring={false} />
      <LineField variant="hero" />
      <SafeDecoImage src={noiseSrc} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-overlay z-1" />
      
      {/* Ellipse Arcs */}
      <SafeDecoImage src={ellipseArcSrc} alt="" className="absolute w-[1500px] top-[10%] left-[50%] opacity-50 -translate-x-[78%] pointer-events-none z-0" />
      <SafeDecoImage src={ellipseArcSrc} alt="" className="absolute w-[1500px] top-[10%] left-[50%] opacity-50 -translate-x-[22%] pointer-events-none z-0" />
      
      {/* Central Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-white/[0.04] blur-3xl z-1 pointer-events-none" />

      <div className="relative z-10 grid place-items-center min-h-[80vh] px-6 text-center max-w-2xl mx-auto pointer-events-none">
        <motion.h1
          variants={blurIn(1)}
          initial="hidden"
          animate="show"
          className="font-display font-black text-7xl md:text-[110px] leading-[0.95] tracking-tight text-white"
        >
          RALPH<br />EDWARDS
        </motion.h1>
        <motion.p
          variants={blurIn(3)}
          initial="hidden"
          animate="show"
          className="mt-8 text-white/55 text-base md:text-[15px] leading-relaxed max-w-md mx-auto"
        >
          Crafting digital experiences that captivate and inspire. Elevating your brand through design and innovation.
        </motion.p>
      </div>

      {/* Floating Photo Collage */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {[
          { src: photoFieldsBw, alt: "Fields", top: "2%", left: "34%", w: "150px", aspect: "4/3", depth: 18, badge: "ig", index: 1 },
          { src: photoBerries, alt: "Berries", top: "2%", right: "2%", w: "260px", aspect: "16/9", depth: 22, index: 2 },
          { src: photoBasketball, alt: "Athlete", top: "7%", left: "4%", w: "110px", aspect: "3/4", depth: 28, badge: "ig", index: 3 },
          { src: photoRed, alt: "Portrait red", top: "10%", right: "12%", w: "200px", aspect: "3/4", depth: 26, badge: "pin", index: 4, hasOverlay: true },
          { src: photoHat, alt: "Hat", top: "18%", left: "3%", w: "220px", aspect: "3/4", depth: 20, badge: "ig", index: 5 },
          { src: photoSculptureBw, alt: "Sculpture", bottom: "calc(6% - 10px)", left: "calc(34% - 90px)", w: "160px", aspect: "4/5", depth: 24, badge: "pin", index: 6 },
          { src: photoTwins, alt: "Twins", bottom: "6%", right: "22%", w: "230px", aspect: "16/10", depth: 22, index: 7 },
        ].map((item) => (
          <motion.div
            key={item.index}
            variants={photoIn(item.index)}
            initial="hidden"
            animate="show"
            className={cn("absolute group overflow-hidden ring-1 ring-white/10 pointer-events-auto")}
            style={{
              top: item.top, bottom: item.bottom, left: item.left, right: item.right, width: item.w, aspectRatio: item.aspect,
              boxShadow: '0 30px 80px -30px rgba(0,0,0,0.9)',
              transform: `translate3d(calc(var(--mx) * ${item.depth / 10}px), calc(var(--my) * ${item.depth / 10}px), 0)`,
              transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <SafeImage src={item.src} alt={item.alt} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" containerClassName="w-full h-full" />
            
            {item.badge && (
              <div className="absolute bottom-2 right-2 w-6 h-6 rounded-md bg-black/40 backdrop-blur-sm grid place-items-center text-white/80">
                {item.badge === 'ig' ? <Instagram className="w-3 h-3" /> : <PinterestIcon className="w-3 h-3" />}
              </div>
            )}

            {item.hasOverlay && (
              <div className="absolute left-4 bottom-5 pointer-events-none flex items-center gap-2.5">
                <div className="relative grid place-items-center w-6 h-6">
                  <div className="absolute w-[55px] h-[55px] rounded-full bg-white/30 blur-[10px]" />
                  <div className="absolute w-[38px] h-[38px] rounded-full bg-white/50 blur-[4px]" />
                  <div className="absolute w-[25px] h-[25px] rounded-full bg-white shadow-[0_0_18px_4px_rgba(255,255,255,0.7)]" />
                </div>
                <div className="grid place-items-center rounded-full bg-black/35 backdrop-blur-md text-white text-[13px] border border-white/15 w-[119px] h-[39px]">
                  View album
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const OurPhotographer = () => {
  return (
    <section id="our-photographer" className={cn("relative px-6 md:px-12 py-32 overflow-hidden", MATTE)}>
      <StarField count={500} ring={false} />
      <LineField variant="photographer" />
      <SafeDecoImage src={noiseSrc} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-overlay z-1" />
      
      <SafeDecoImage src={bgFabric} alt="" className="absolute left-0 top-1/3 w-[280px] md:w-[340px] opacity-[0.13] pointer-events-none select-none z-1" />
      <SafeDecoImage src={bgSilhouettes} alt="" className="absolute right-0 top-[12%] w-[360px] md:w-[460px] opacity-[0.16] pointer-events-none select-none z-1" />
      <SafeDecoImage src={bgNikon} alt="" className="absolute right-[4%] bottom-0 w-[280px] md:w-[360px] opacity-[0.14] pointer-events-none select-none z-1" />

      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-3xl z-1 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto items-start">
        <motion.div
          initial={{ opacity: 0, y: 60, filter: 'blur(16px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: EASE }}
          className="bg-[#efeae0] p-4 pb-20 max-w-[440px] w-full justify-self-center md:justify-self-end relative shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: 'blur(14px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE }}
            className="absolute -top-16 md:-top-19 left-[40rem] -translate-x-1/2 font-display font-medium text-4xl md:text-5xl leading-[0.95] uppercase text-white whitespace-nowrap"
          >
            Our photographer
          </motion.h2>
          <SafeImage src={photoRalphPortrait} alt="Ralph portrait" className="w-full aspect-[3/4] object-cover" containerClassName="w-full aspect-[3/4]" />
          <div className="absolute bottom-6 left-6 text-black font-display font-black text-2xl leading-none">
            RALPH<br />EDWARDS
          </div>
        </motion.div>

        <div className="space-y-8 max-w-xl">
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: 'blur(14px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.1, ease: EASE }}
            className="font-display font-medium text-4xl md:text-5xl leading-[1.05] uppercase md:w-[600px] mt-[-28px] text-white"
          >
            will select the<br />best images and ideas<br />for you
          </motion.h2>
          
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="text-white/55 text-[15px] leading-relaxed"
            >
              Once upon a time, nestled in a quaint little town, there lived an author named Alice. She wasn't your typical writer; her stories weren't just ink on paper; they were portals to worlds beyond imagination. Alice had a peculiar gift — she could breathe life into her characters, making them dance off the pages and into the hearts of her readers.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
              className="text-white/55 text-[15px] leading-relaxed"
            >
              Alice's love for storytelling began in her childhood. She would spend hours in her attic, surrounded by dusty old books, dreaming up adventures for her imaginary friends. As she grew older, her passion for writing only intensified. She studied literature at university, honing her craft and delving deeper into the mysteries of storytelling.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

const AllTypes = () => {
  return (
    <section id="projects" className={cn("relative px-6 md:px-12 py-32 overflow-hidden", MATTE)}>
      <StarField count={550} ring={true} ringCount={260} ringRadiusFactor={0.37} ringBandWidth={50} />
      <LineField variant="projects" />
      <SafeDecoImage src={noiseSrc} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-overlay z-1" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: 'blur(14px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.1, ease: EASE }}
            className="font-display font-black text-5xl md:text-6xl uppercase leading-[0.95] text-white"
          >
            All types of<br />projects
          </motion.h2>
          
          <div className="max-w-md">
            <p className="text-white/55 text-[15px] mb-6">
              Welcome to the Innovation Hub: Where Ideas Take Shape. Explore the Intersection of Creativity and Technology. Dive Into Our Portfolio and Witness the Power of Ingenuity.
            </p>
            <button className="group flex items-center gap-3 text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors">
              <span>View the artwork</span>
              <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-start">
          {[
            { src: photoCar, alt: "Company Photo", title: "Company Photo", tall: false, mt: "md:mt-20", w: "w-full md:w-[216px]", aspect: "aspect-[4/5]" },
            { src: photoFieldsColor, alt: "Landscape Series", title: "Landscape Series", tall: true, mt: "md:mt-25", w: "w-full md:w-[220px]", aspect: "aspect-[3/4]" },
            { src: photoGirlGrass, alt: "Classy Photo Shoot", title: "Classy Photo Shoot", tall: false, mt: "md:mt-10", w: "w-full md:w-[230px]", aspect: "aspect-[4/5]" },
            { src: photoSculptureColor, alt: "Photo Brand", title: "Photo Brand", tall: false, mt: "md:mt-4", w: "w-full md:w-[200px]", aspect: "aspect-[4/5]" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, delay: i * 0.12, ease: EASE }}
              className={cn(item.mt, item.w)}
            >
              <div className={cn("overflow-hidden ring-1 ring-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] group", item.aspect)}>
                <SafeImage src={item.src} alt={item.alt} className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" containerClassName="w-full h-full" />
              </div>
              <div className="text-center space-y-3 mt-4">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white">{item.title}</h3>
                <div className="inline-flex items-center gap-2 text-xs text-white/60 border border-white/15 rounded-full px-3 py-1.5 hover:bg-white/5 transition">
                  <span>photo shoot</span>
                  <div className="w-4 h-4 rounded-full border border-white/20 grid place-items-center">
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MechanicalMarvels = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const [cameraError, setCameraError] = useState(false);
  const [vectorError, setVectorError] = useState(false);

  return (
    <section id="marvels">
      {/* Top Block */}
      <div className="relative px-6 md:px-12 pt-28 pb-12 overflow-hidden bg-[oklch(0.06_0_0)]">
        <StarField count={450} ring={false} />
        <LineField variant="marvels" />
        <SafeDecoImage src={noiseSrc} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-overlay z-1" />

        <div className="relative z-10 max-w-[1200px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40, filter: 'blur(16px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
            className="font-display font-medium uppercase text-5xl md:text-[90px] leading-[0.95] tracking-tight text-white inline-block"
          >
            Mechanical{' '}
            {cameraError ? (
              <span className="inline-block w-16 md:w-32 h-10 md:h-20 bg-[oklch(0.18_0_0)] rounded-md align-middle" />
            ) : (
              <img src={photoCamera} alt="Camera" className="inline-block h-10 md:h-20 w-auto rounded-md align-middle mx-1" onError={() => setCameraError(true)} />
            )}
            {' '}Marvels: Unveiling the artistry of automation
          </motion.h2>

          <div className="flex justify-between items-center mt-16 text-xs uppercase tracking-widest text-white/50">
            <button className="group flex items-center gap-3 hover:text-white transition-colors">
              <span>View the artwork</span>
              <MoveRight className="w-3.5 h-3.5 -rotate-45 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
            <button className="group flex items-center gap-3 hover:text-white transition-colors">
              <span>Scroll to view more</span>
              <MoveRight className="w-3.5 h-3.5 rotate-90 transition-transform group-hover:translate-y-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Block */}
      <div id="contact" className="relative h-[80vh] overflow-hidden bg-black">
        <motion.div className="absolute inset-0 -top-[10%] -bottom-[10%] z-0" style={{ y }}>
          <SafeImage src={getInTouchBg} alt="" className="w-full h-full object-cover" containerClassName="w-full h-full" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 z-0" />
        <LineField variant="marvelsBottom" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 40, filter: 'blur(16px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
            className="font-display font-black uppercase text-4xl md:text-7xl leading-[1] tracking-tight text-white"
          >
            Get in touch to our<br />
            <span className="text-lime">Modern maintenance.</span>
          </motion.h3>

          <div className="flex items-center justify-center gap-1 mt-10">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
              className="inline-flex bg-white text-black rounded-full px-6 py-2 text-sm font-medium hover:bg-white/90 uppercase transition-colors"
            >
              GET IN TOUCH
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="w-[18.86px] h-[18.53px] rounded-full border-[1px] border-white mt-[4rem] flex items-center justify-center -ml-2"
            >
              {vectorError ? (
                <ArrowUpRight className="w-[5.86px] h-[5.53px] text-white" />
              ) : (
                <img src={vectorSrc} alt="" className="w-[5.86px] h-[5.53px]" onError={() => setVectorError(true)} />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="relative border-t border-white/10 px-6 md:px-12 py-6 flex items-center justify-between text-xs text-white/40 bg-black z-10">
    <div>All right reserved — 2024</div>
    <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
  </footer>
);

export const ValmaxLanding = () => {
  return (
    <div className="bg-[oklch(0.06_0_0)] min-h-screen text-white font-body selection:bg-lime selection:text-[oklch(0.06_0_0)] overflow-x-hidden">
      <IntroSequence />
      <TopBar />
      <RalphHero />
      <OurPhotographer />
      <AllTypes />
      <MechanicalMarvels />
      <Footer />
    </div>
  );
};

export default ValmaxLanding;
