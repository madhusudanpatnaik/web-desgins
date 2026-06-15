import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import logoSrc from '@/assets/logo.svg';

const EASE = [0.22, 1, 0.36, 1];

export const IntroSequence: React.FC = () => {
  const [hidden, setHidden] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
    }, prefersReducedMotion ? 100 : 3600);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  if (hidden) return null;

  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 z-[100] bg-[oklch(0.16_0.004_240)]" />
    );
  }

  const circles = [1, 2, 3];
  const rays = [0, 30, 60, 120, 150, 210, 240, 300, 330];

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-[oklch(0.16_0.004_240)]"
        animate={{ opacity: [1, 1, 0] }}
        transition={{ duration: 3.6, times: [0, 0.82, 1], ease: EASE }}
      />

      {/* Concentric Circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {circles.map((n, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{ width: 260 * n, height: 260 * n }}
            initial={{ opacity: 0, scale: 0.15 }}
            animate={{ opacity: [0, 0.55, 0], scale: [0.15, 1, 1.4] }}
            transition={{
              duration: 2.4,
              times: [0, 0.5, 1],
              delay: 1.22 + i * 0.12,
              ease: EASE,
            }}
          />
        ))}
      </div>

      {/* Rays */}
      <svg className="absolute inset-0 w-full h-full" viewBox="-50 -50 100 100">
        {rays.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x2 = Math.cos(rad) * 60;
          const y2 = Math.sin(rad) * 60;
          return (
            <motion.line
              key={i}
              x1={0}
              y1={0}
              x2={x2}
              y2={y2}
              stroke="white"
              strokeWidth={0.12}
              strokeLinecap="round"
              strokeOpacity={0.45}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 0.65, 0] }}
              transition={{
                duration: 2.0,
                times: [0, 0.7, 1],
                delay: 1.2 + i * 0.05,
                ease: EASE,
              }}
            />
          );
        })}
      </svg>

      {/* Logo Container */}
      <motion.div
        className="absolute"
        initial={{ top: '50%', left: '50%', x: '-50%', y: '-50%', scale: 1 }}
        animate={{
          top: ['50%', '50%', '50%', '24px'],
          left: ['50%', '50%', '50%', '24px'],
          x: ['-50%', '-50%', '-50%', '0%'],
          y: ['-50%', '-50%', '-50%', '0%'],
          scale: [1, 1, 1, 0.42],
        }}
        transition={{ duration: 3.6, times: [0, 0.6, 0.82, 1], ease: EASE }}
        style={{ transformOrigin: 'top left' }}
      >
        <div className="relative">
          {/* Wordmark clip box */}
          <motion.div
            className="overflow-hidden flex items-center relative"
            style={{ height: 64 }}
            initial={{ width: 64, opacity: 0 }}
            animate={{
              width: [64, 64, 64, 268, 268],
              opacity: [0, 0, 1, 1, 1],
            }}
            transition={{
              duration: 3.6,
              times: [0, 0.3, 0.42, 0.78, 1],
              ease: EASE,
            }}
          >
            {logoError ? (
              <div className="flex items-center w-[268px] h-[64px]">
                <span className="font-display font-black text-white text-[64px] leading-none tracking-tight">
                  VALMAX
                </span>
              </div>
            ) : (
              <img
                src={logoSrc}
                alt="VALMAX Logo"
                className="max-w-none h-[64px] object-contain"
                onError={() => setLogoError(true)}
              />
            )}
          </motion.div>

          {/* White Dot over icon center */}
          <motion.div
            className="absolute bg-white rounded-full"
            style={{
              top: '50%',
              left: 32, // icon center x
              x: '-50%',
              y: '-50%',
            }}
            initial={{ width: 8, height: 8, opacity: 1 }}
            animate={{
              width: [8, 10, 64, 64],
              height: [8, 10, 64, 64],
              opacity: [1, 1, 1, 0],
            }}
            transition={{
              duration: 3.6,
              times: [0, 0.18, 0.4, 1],
              ease: EASE,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};
