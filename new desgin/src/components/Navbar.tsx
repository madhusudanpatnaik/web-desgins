import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <div className="px-6 md:px-12 lg:px-16 pt-6 absolute top-0 left-0 right-0 z-50">
      <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
        <div className="text-2xl font-semibold tracking-tight text-white">VEX</div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white">
          <a href="#" className="hover:text-gray-300 transition-colors">Story</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Investing</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Building</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Advisory</a>
        </div>
        <div>
          <button className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            Start a Chat
          </button>
        </div>
      </nav>
    </div>
  );
};
