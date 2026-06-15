import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const handleDrag = (e: any, info: any) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newX = info.point.x - containerRect.left;
      const newPercentage = Math.max(0, Math.min(100, (newX / containerRect.width) * 100));
      setSliderPosition(newPercentage);
    }
  };

  return (
    <section className="section before-after-section" ref={containerRef}>
      <motion.div
        className="section-header"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
        }}
      >
        <h2 className="section-title">The <span>Transformation</span></h2>
        <p className="section-subtitle">Slide to reveal the uncompromising luxury.</p>
      </motion.div>

      <motion.div 
        className="slider-container"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.2 } }
        }}
      >
        {/* Before Image (Background) */}
        <div className="slider-image-layer before-image">
          <img src="https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1600&q=80" alt="Before" loading="lazy" />
          <span className="slider-label label-before">BEFORE</span>
        </div>

        {/* After Image (Clipped overlay) */}
        <div 
          className="slider-image-layer after-image" 
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80" alt="After" loading="lazy" />
          <span className="slider-label label-after">AFTER</span>
        </div>

        {/* Draggable Handle */}
        <motion.div 
          className="slider-handle"
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleDrag}
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="handle-line"></div>
          <div className="handle-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
