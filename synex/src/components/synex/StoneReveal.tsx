import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

interface StoneRevealProps {
  side: 'left' | 'right';
}

export const StoneReveal: React.FC<StoneRevealProps> = ({ side }) => {
  const isLeft = side === 'left';
  
  const zBase = isLeft ? 1 : 4;
  const zGrass = isLeft ? 2 : 5;
  
  const baseImg = isLeft ? 'https://qclay.design/lovable/synex/stone-left.png' : 'https://qclay.design/lovable/synex/stone-right.png';
  const grassImg = isLeft ? 'https://qclay.design/lovable/synex/stone-g-left.png' : 'https://qclay.design/lovable/synex/stone-g-right.png';
  
  const xOffset = isLeft ? -40 : 40;
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radiusRaw = useMotionValue(0);
  const radius = useSpring(radiusRaw, { stiffness: 200, damping: 25 });
  
  const maskImage = useMotionTemplate`radial-gradient(circle ${radius}px at ${mouseX}px ${mouseY}px, black 0%, black 40%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    radiusRaw.set(120);
  };

  const handleMouseLeave = () => {
    radiusRaw.set(0);
  };

  return (
    <div
      ref={wrapperRef}
      className={`absolute bottom-0 cursor-crosshair w-fit ${isLeft ? 'left-0' : 'right-0'}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ zIndex: zBase }}
    >
      <motion.img
        src={baseImg}
        alt={`${side} stone`}
        className="h-[280px] sm:h-[380px] md:h-[500px] lg:h-[600px] xl:h-[680px] object-contain pointer-events-none"
        style={{ objectPosition: `${side} bottom` }}
        initial={{ opacity: 0, x: xOffset }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
      />
      
      <motion.img
        src={grassImg}
        alt={`${side} grass stone`}
        className="absolute inset-0 h-full w-full object-contain pointer-events-none"
        style={{ 
          objectPosition: `${side} bottom`,
          zIndex: zGrass,
          WebkitMaskImage: maskImage,
          maskImage: maskImage
        }}
      />
    </div>
  );
};
