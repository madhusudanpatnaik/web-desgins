import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { StoneReveal } from './StoneReveal';

export const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#F2F2F0]">
      {/* Background Radial Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(40% 30% at 50% 30%, rgba(220,220,215,0.6) 0%, transparent 70%)',
          zIndex: 0
        }}
      />

      <Navbar />

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center pt-[90px] sm:pt-[110px] md:pt-[140px] px-6">
        <motion.span
          className="text-[12px] sm:text-[13px] md:text-[14px] font-medium text-[rgba(0,0,0,0.50)] mb-3 sm:mb-4 text-center"
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          Finance Reimagined
        </motion.span>

        <h1 className="flex flex-col items-center text-center font-medium leading-[1.05] tracking-[-1.36px] text-[34px] sm:text-[44px] md:text-[56px] lg:text-[68px]">
          <motion.span
            className="text-[rgba(0,0,0,0.20)]"
            initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            A New Standard
          </motion.span>
          <motion.span
            className="text-[#05050C]"
            initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.32, ease: 'easeOut' }}
          >
            in Wealth Management
          </motion.span>
        </h1>

        <motion.p
          className="text-[14px] sm:text-[16px] md:text-[18px] font-medium text-[rgba(0,0,0,0.20)] max-w-[460px] text-center mt-4 sm:mt-5"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
        >
          Take full control of your assets with a unified platform for investing, tracking, and growing your portfolio in real time.
        </motion.p>
      </div>

      <StoneReveal side="left" />
      <StoneReveal side="right" />

      {/* Dashboard Image Container */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none" style={{ zIndex: 3 }}>
        <motion.div
          className="w-[92vw] sm:w-[72vw] md:w-[60vw] lg:w-[54vw] max-w-[944px]"
          initial={{ opacity: 0, y: 80, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.0, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <img 
            src="https://qclay.design/lovable/synex/Dashboard.png" 
            alt="Dashboard" 
            className="w-full h-auto object-contain rounded-t-[12px]"
            style={{
              boxShadow: '0 -8px 80px rgba(0,0,0,0.12), 0 40px 120px rgba(0,0,0,0.10)'
            }}
          />
        </motion.div>
      </div>

      {/* Bottom Dark Fade */}
      <div 
        className="absolute bottom-0 w-full h-[220px] pointer-events-none"
        style={{
          zIndex: 6,
          background: 'linear-gradient(to top, rgba(5,5,12,0.85) 0%, rgba(5,5,12,0.5) 40%, transparent 100%)'
        }}
      />

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-[10px] left-0 right-0 mx-auto w-fit flex flex-row items-center gap-[8px]"
        style={{ zIndex: 20 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-row items-center gap-[8px]"
        >
          <motion.img 
            src="https://qclay.design/lovable/synex/star.svg" 
            alt="Star"
            className="w-[14px] h-[14px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="font-medium text-[14px] tracking-[-0.28px] text-white">
            Scroll to explore
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};
