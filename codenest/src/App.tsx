import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoSrc = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8';

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: false });
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => console.log('Autoplay prevented', err));
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari where HLS is natively supported
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch((err) => console.log('Autoplay prevented', err));
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070b0a] font-inter overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          muted
          loop
          playsInline
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b0a] to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a] via-transparent to-transparent z-10" />
      </div>

      {/* Grid Lines */}
      <div className="absolute inset-0 z-10 hidden md:flex justify-evenly pointer-events-none">
        <div className="w-[1px] h-full bg-white/10" />
        <div className="w-[1px] h-full bg-white/10" />
        <div className="w-[1px] h-full bg-white/10" />
      </div>

      {/* Central Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <svg width="800" height="400" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#glow)">
            <ellipse cx="400" cy="200" rx="300" ry="100" fill="#00FFB2" fillOpacity="0.15" />
          </g>
          <defs>
            <filter id="glow" x="0" y="0" width="800" height="400" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-8 md:px-12">
        <div className="text-white font-bold text-2xl tracking-tighter">CodeNest</div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-[16px] text-white">
          <a href="#" className="hover:text-[#5ed29c] transition-colors">PROJECTS</a>
          <a href="#" className="hover:text-[#5ed29c] transition-colors">BLOG</a>
          <a href="#" className="hover:text-[#5ed29c] transition-colors">ABOUT</a>
          <a href="#" className="hover:text-[#5ed29c] transition-colors">RESUME</a>
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden text-white z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#070b0a] flex flex-col items-center justify-center gap-8 text-2xl text-white">
          <a href="#" className="hover:text-[#5ed29c] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>PROJECTS</a>
          <a href="#" className="hover:text-[#5ed29c] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>BLOG</a>
          <a href="#" className="hover:text-[#5ed29c] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</a>
          <a href="#" className="hover:text-[#5ed29c] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>RESUME</a>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-20 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
        
        <div className="max-w-4xl pt-32">
          {/* Liquid Glass Card */}
          <div className="w-[200px] h-[200px] rounded-2xl liquid-glass flex flex-col justify-between p-6 -translate-y-[50px] mb-[-50px]">
            <div className="text-[14px] font-medium text-white/80">
              [ 2025 ]
            </div>
            <div>
              <h3 className="text-[18px] leading-tight text-white mb-2">
                Taught by <span className="font-instrument italic font-normal text-[22px]">Industry</span> Professionals
              </h3>
              <p className="text-[11px] text-white/60 leading-relaxed">
                Learn from engineers at top tech companies. Real-world skills for real-world impact.
              </p>
            </div>
          </div>

          {/* Hero Copy */}
          <div className="font-plus-jakarta font-bold text-[11px] text-[#5ed29c] uppercase tracking-wider mb-4">
            Career-Ready Curriculum
          </div>
          
          <h1 className="font-inter font-extrabold text-[40px] md:text-[72px] leading-[1.1] uppercase tracking-tight text-white mb-6">
            LAUNCH YOUR CODING CAREER<span className="text-[#5ed29c]">.</span>
          </h1>

          <p className="font-inter text-[14px] text-white/70 max-w-[512px] leading-relaxed mb-10">
            Master in-demand coding skills through immersive, project-based learning. Join our elite platform and transform your future with curriculum designed by industry experts.
          </p>

          <button className="flex items-center gap-3 bg-[#5ed29c] text-[#070b0a] px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:bg-[#4bc18a] transition-colors group">
            Get Started
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>
    </div>
  );
}
