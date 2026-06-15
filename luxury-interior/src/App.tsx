import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { Suspense, lazy, useEffect } from 'react';
import Lenis from 'lenis';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ProjectsGrid } from './components/ProjectsGrid';
import { Footer } from './components/Footer';
import './index.css';

const LuxurySculpture = lazy(() => import('./components/LuxurySculpture').then(module => ({ default: module.LuxurySculpture })));

function App() {
  // Initialize Lenis for buttery smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-logo">AURA</div>
        <div className="nav-links">
          <a href="#vision">Vision</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Inquire</a>
        </div>
      </nav>

      {/* 3D Canvas Fixed Background */}
      <div className="canvas-container">
        <Canvas 
          camera={{ position: [0, 0, 15], fov: 45 }}
          dpr={[1, 2]} // Performance optimization: Cap pixel ratio
          performance={{ min: 0.5 }} // Allow adaptive degradation to maintain framerate
        >
          <color attach="background" args={['#030712']} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={2} />
          <spotLight position={[-10, -20, -10]} angle={0.15} penumbra={1} intensity={3} color="#14b8a6" />
          
          <Suspense fallback={null}>
            <Float
              speed={2} 
              rotationIntensity={0.5} 
              floatIntensity={0.5} 
            >
              <LuxurySculpture />
            </Float>
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      {/* Scrolling Content over the 3D Canvas */}
      <div className="content-wrapper">
        <section className="hero" id="vision">
          <motion.h1 
            className="hero-title"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={textVariants}
          >
            Design Beyond<br />
            <span>Boundaries</span>
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={textVariants}
          >
            Elevating interior spaces with uncompromising luxury, precision, and architectural brilliance.
          </motion.p>
        </section>

        {/* Add Spacer for parallax effect */}
        <div className="spacer-section"></div>

        {/* New Components */}
        <BeforeAfterSlider />
        <ProjectsGrid />
        <Footer />
      </div>
    </>
  );
}

export default App;
