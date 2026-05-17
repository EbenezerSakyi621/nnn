import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, isAdminLoggedIn }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 width-full w-full px-6 md:px-16 py-4 flex justify-between items-center z-[1000] transition-all duration-300 ${
        scrolled
          ? 'bg-[#020617]/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40'
          : 'bg-transparent border-b border-transparent'
      }`}
      style={{ animation: 'slideDown 0.8s ease-out' }}
    >
      <a href="#" className="flex items-center gap-2 text-xl font-black tracking-wider text-white group">
        <Sparkles className="w-5 h-5 text-[#0ea5e9] animate-pulse" />
        <span>
          SKY<span className="text-[#0ea5e9]">CREATIVES</span>
        </span>
      </a>

      <div className="flex items-center gap-6 md:gap-8 text-sm md:text-base font-semibold">
        <a href="#portfolio" className="text-white hover:text-[#0ea5e9] transition-colors">
          Portfolio
        </a>
        <a href="#videos" className="text-white hover:text-[#0ea5e9] transition-colors">
          Videos
        </a>
        <a href="#contact" className="text-white hover:text-[#0ea5e9] transition-colors">
          Contact
        </a>

        <button
          onClick={onOpenAdmin}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold text-xs md:text-sm transition-all duration-300 ${
            isAdminLoggedIn
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
              : 'bg-[#0ea5e9]/20 text-[#0ea5e9] border border-[#0ea5e9]/40 hover:bg-[#0ea5e9]/30 hover:scale-105'
          }`}
        >
          {isAdminLoggedIn ? (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Mode</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Admin Portal</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
};
