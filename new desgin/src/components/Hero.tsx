import React from 'react';
import { Navbar } from './Navbar';
import { AnimatedHeading } from './AnimatedHeading';
import { FadeIn } from './FadeIn';

export const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 h-full flex flex-col justify-end pb-12 lg:pb-16 pointer-events-none">
        <div className="lg:grid lg:grid-cols-2 lg:items-end w-full gap-8">
          {/* Left Column */}
          <div className="pointer-events-auto">
            <AnimatedHeading
              text={"Shaping tomorrow\nwith vision and action."}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4"
            />
            
            <FadeIn delayMs={800} durationMs={1000}>
              <p className="text-base md:text-lg text-gray-300 mb-5">
                We back visionaries and craft ventures that define what comes next.
              </p>
            </FadeIn>

            <FadeIn delayMs={1200} durationMs={1000}>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Start a Chat
                </button>
                <button className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors">
                  Explore Now
                </button>
              </div>
            </FadeIn>
          </div>

          {/* Right Column */}
          <div className="flex items-end justify-start lg:justify-end mt-8 lg:mt-0 pointer-events-auto">
            <FadeIn delayMs={1400} durationMs={1000}>
              <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl font-light text-white">
                  Investing. Building. Advisory.
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};
