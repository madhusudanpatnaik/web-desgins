import React from 'react';
import { Globe } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-10 py-4 grid grid-cols-3 items-center" style={{ backgroundColor: 'rgba(242, 242, 240, 0.85)', backdropFilter: 'blur(12px)' }}>
      {/* Left */}
      <div className="justify-self-start">
        <img src="https://qclay.design/lovable/synex/logo.svg" alt="Synex Logo" className="h-[28px]" />
      </div>

      {/* Middle */}
      <div className="justify-self-center flex space-x-2">
        {['DASHBOARD', 'ASSETS', 'ANALYTICS', 'MARKETS'].map((item) => (
          <a
            key={item}
            href="#"
            className="text-[#111] font-semibold text-[13px] tracking-[1.5px] px-[14px] py-[8px] transition-opacity duration-200 hover:opacity-55"
          >
            {item}
          </a>
        ))}
      </div>

      {/* Right */}
      <div className="justify-self-end flex items-center space-x-4">
        <div className="flex items-center space-x-1.5 text-[#111] cursor-pointer">
          <Globe size={16} />
          <span className="font-normal text-[13px]">English</span>
        </div>
        
        <button className="bg-[#111] text-white rounded-full px-5 py-2.5 flex items-center space-x-2.5 transition-colors duration-200 hover:bg-[#333]">
          <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.20)' }}>
            <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
          </div>
          <span className="font-semibold text-[13px]">Launch app</span>
        </button>
      </div>
    </nav>
  );
};
