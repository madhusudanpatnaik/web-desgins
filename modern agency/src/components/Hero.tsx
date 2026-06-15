import { useState, useEffect } from 'react';
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';
import { ArrowRight, Clock, Menu, X } from 'lucide-react';

const LondonClock = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setTime(formatter.format(new Date()));
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (!time) return null;

  return (
    <div className="flex items-center gap-1.5 hidden md:flex">
      <Clock className="w-[14px] h-[14px] text-gray-600" />
      <span className="text-[13px] text-gray-600">{time} in London</span>
    </div>
  );
};

export const Hero = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen w-full flex flex-col overflow-hidden bg-[#EFEFEF]">
      {/* Shader Stack Background */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Shader>
          <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
          <ChromaFlow baseColor="#ffffff" downColor="#ff5f03" leftColor="#ff5f03" rightColor="#ff5f03" upColor="#ff5f03" momentum={13} radius={3.5} />
          <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} />
          <FilmGrain strength={0.05} />
        </Shader>
      </div>

      {/* Navigation */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto p-2 sm:p-3">
        <nav className="bg-white rounded-full p-[5px] flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-900 rounded-full flex items-center justify-center mr-6">
              <span className="text-white text-[10px] sm:text-[11px] font-bold tracking-tight leading-none">AX</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {['Projects', 'Studio', 'Journal', 'Connect'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-[14px] text-gray-900 hover:text-gray-500 transition-colors duration-300">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            <span className="text-[13px] text-gray-600 hidden lg:block">Taking on projects for Q1 2026</span>
            <LondonClock />
            
            {/* Desktop CTA */}
            <button className="hidden md:flex items-center gap-3 bg-gray-900 text-white text-[13px] font-medium rounded-full pl-5 pr-2 py-2 group">
              <div className="flex-col overflow-hidden h-[20px] flex">
                <div className="group-hover:-translate-y-1/2 duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] flex flex-col">
                  <span className="h-[20px] flex items-center">Book a strategy call</span>
                  <span className="h-[20px] flex items-center">Book a strategy call</span>
                </div>
              </div>
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-gray-900 group-hover:-rotate-45 duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden w-9 h-9 sm:w-10 sm:h-10 bg-gray-900 rounded-full flex items-center justify-center text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </nav>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex-1 flex flex-col justify-end w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
        <span className="text-[13px] sm:text-[14px] text-gray-900 tracking-wide mb-5 sm:mb-8 uppercase font-medium">Axion Studio</span>
        
        <h1 className="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900">
          We craft digital experiences <br className="hidden sm:block" /><span className="sm:hidden"> </span>
          for brands ready to dominate <br className="hidden sm:block" /><span className="sm:hidden"> </span>
          their category online.
        </h1>

        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
          <button className="flex items-center gap-3 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 group transition-colors duration-300">
            <div className="flex-col overflow-hidden h-[20px] flex">
              <div className="group-hover:-translate-y-1/2 duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] flex flex-col">
                <span className="h-[20px] flex items-center">Start a project</span>
                <span className="h-[20px] flex items-center">Start a project</span>
              </div>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-[#F26522] group-hover:-rotate-45 duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          <div className="flex items-center gap-2 bg-white rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow duration-300 px-3 py-2 cursor-default">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8704E] fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z"/>
            </svg>
            <span className="text-[13px] sm:text-[14px] font-medium text-gray-900 ml-1">Certified Partner</span>
            <span className="bg-gray-900 text-white text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded ml-1">Featured</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/60 transition-opacity duration-500" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="relative bg-white rounded-2xl mx-3 mb-3 p-6 animate-[slideUp_0.5s_cubic-bezier(0.32,0.72,0,1)]">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-1.5">
                <Clock className="w-[14px] h-[14px] text-gray-600" />
                <span className="text-[13px] text-gray-600">
                  {new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date())} in London
                </span>
              </div>
              <button 
                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-4 h-4 text-gray-900" />
              </button>
            </div>
            
            <div className="flex flex-col gap-6 mb-10">
              {['Projects', 'Studio', 'Journal', 'Connect'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-[28px] sm:text-[32px] font-medium text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
                  {link}
                </a>
              ))}
            </div>

            <button className="w-full flex items-center justify-between bg-gray-900 text-white text-[15px] font-medium rounded-full pl-6 pr-2 py-2 group">
              <span>Start a project</span>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-900">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
