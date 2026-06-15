import React, { useState } from 'react';
import { Search, User, Menu, X, Star, Clock, Calendar, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden bg-black text-white font-sans">
      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4"
        />
      </div>

      {/* Bottom Blur Overlay */}
      <div 
        className="fixed inset-0 z-[1] pointer-events-none backdrop-blur-xl"
        style={{
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
          maskImage: 'linear-gradient(to top, black 0%, transparent 45%)'
        }}
      />

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6">
        {/* Logo */}
        <div 
          className="animate-blur-fade-up flex items-center h-8 md:h-10 text-xl font-bold tracking-widest"
          style={{ animationDelay: '0ms' }}
        >
          CINEMATIC
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {['Movies', 'TV Series', 'Editor\'s Pick', 'Interviews', 'User Reviews'].map((item, index) => (
            <a
              key={item}
              href="#"
              className="animate-blur-fade-up text-sm hover:text-gray-300 transition-colors"
              style={{ animationDelay: `${100 + index * 50}ms` }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <button 
            className="animate-blur-fade-up hidden sm:flex items-center space-x-2 rounded-full liquid-glass px-4 md:px-6 py-2"
            style={{ animationDelay: '350ms' }}
          >
            <Search size={18} />
            <span className="text-sm">Search</span>
          </button>
          
          <button 
            className="animate-blur-fade-up hidden sm:flex items-center justify-center w-10 h-10 rounded-full liquid-glass"
            style={{ animationDelay: '400ms' }}
          >
            <User size={18} />
          </button>

          {/* Hamburger Menu Button */}
          <button 
            className="animate-blur-fade-up lg:hidden flex items-center justify-center w-10 h-10 rounded-full liquid-glass relative overflow-hidden"
            style={{ animationDelay: '350ms' }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={cn(
              "absolute transition-all duration-500 ease-out",
              isMenuOpen ? "rotate-180 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"
            )}>
              <Menu size={18} />
            </div>
            <div className={cn(
              "absolute transition-all duration-500 ease-out",
              !isMenuOpen ? "-rotate-180 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"
            )}>
              <X size={18} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "absolute top-[72px] left-0 right-0 z-40 lg:hidden",
          "bg-gray-900/95 backdrop-blur-lg border-t border-b border-gray-800 shadow-2xl transition-all duration-500 ease-out",
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <div className="p-4 space-y-2">
          {['Movies', 'TV Series', 'Editor\'s Pick', 'Interviews', 'User Reviews'].map((item, index) => (
            <a
              key={item}
              href="#"
              className="block py-3 px-3 rounded-lg hover:bg-gray-800/50 transition-colors"
              style={{
                transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(-10px)',
                opacity: isMenuOpen ? 1 : 0,
                transitionProperty: 'all',
                transitionDuration: '500ms',
                transitionTimingFunction: 'ease-out'
              }}
            >
              {item}
            </a>
          ))}
          
          {/* Mobile Search/User Actions (<sm) */}
          <div 
            className="sm:hidden pt-4 mt-4 border-t border-gray-800 flex items-center space-x-4"
            style={{
              transitionDelay: isMenuOpen ? '250ms' : '0ms',
              opacity: isMenuOpen ? 1 : 0,
              transitionProperty: 'opacity',
              transitionDuration: '500ms'
            }}
          >
            <button className="flex-1 flex items-center justify-center space-x-2 rounded-full bg-white/10 py-2.5">
              <Search size={18} />
              <span className="text-sm">Search</span>
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
              <User size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16">
        <div className="flex flex-col md:flex-row items-end gap-8">
          
          {/* Left Side */}
          <div className="flex-1 w-full">
            
            {/* Metadata row */}
            <div 
              className="animate-blur-fade-up flex flex-wrap items-center gap-3 sm:gap-6 mb-6 md:mb-8 text-xs sm:text-sm"
              style={{ animationDelay: '300ms' }}
            >
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                <span className="font-medium">8.7/10 IMDB</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>132 min</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>April, 2025</span>
              </div>
            </div>

            {/* Title */}
            <h1 
              className="animate-blur-fade-up text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 md:mb-6"
              style={{ animationDelay: '400ms', letterSpacing: '-0.04em' }}
            >
              Step Through. Work Smarter.
            </h1>

            {/* Description */}
            <p 
              className="animate-blur-fade-up text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-12 max-w-2xl"
              style={{ animationDelay: '500ms' }}
            >
              A voyage through forgotten realms, where past and future intertwine.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button 
                className="animate-blur-fade-up flex items-center space-x-2 bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 hover:bg-gray-200 transition-colors"
                style={{ animationDelay: '600ms' }}
              >
                <Play size={18} className="fill-black" />
                <span>Watch Now</span>
              </button>
              
              <button 
                className="animate-blur-fade-up rounded-full font-medium liquid-glass px-6 sm:px-8 py-2.5 sm:py-3 hover:bg-white/10 transition-colors"
                style={{ animationDelay: '700ms' }}
              >
                Learn More
              </button>
            </div>
            
          </div>

          {/* Right Side (Arrows) */}
          <div className="flex items-center justify-start md:justify-end gap-3 w-full md:w-auto">
            <button 
              className="animate-blur-fade-up rounded-full liquid-glass px-4 sm:px-6 py-2.5 sm:py-3 hover:bg-white/10 transition-colors"
              style={{ animationDelay: '800ms' }}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="animate-blur-fade-up rounded-full liquid-glass px-4 sm:px-6 py-2.5 sm:py-3 hover:bg-white/10 transition-colors"
              style={{ animationDelay: '900ms' }}
            >
              <ChevronRight size={24} />
            </button>
          </div>

        </div>
      </main>

    </div>
  );
}

export default App;
