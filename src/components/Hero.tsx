import React, { useEffect, useState } from 'react';
import { ArrowDown, Play } from 'lucide-react';

export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="relative h-[90vh] min-h-[600px] flex justify-center items-center text-center px-6 overflow-hidden animate-gradient-move"
      style={{
        background: 'linear-gradient(-45deg, #020617, #0f172a, #0ea5e9, #020617)',
        backgroundSize: '400% 400%',
        backgroundPosition: `center ${scrollY * 0.3}px`,
      }}
    >
      {/* Light particles overlay */}
      <div className="absolute inset-0 w-[200%] h-[200%] pointer-events-none animate-particles opacity-20" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="text-xl md:text-3xl font-black tracking-[4px] mb-2 uppercase animate-cinematic-text">
          SKY<span className="text-[#11afe4]">CREATIVES</span>
        </h2>

        <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight animate-cinematic-text" style={{ animationDelay: '0.2s' }}>
          We Create Cinematic <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8]">
            Visual Experiences
          </span>
        </h1>

        <p className="text-base md:text-xl text-slate-300 max-w-2xl mb-10 animate-cinematic-text font-normal" style={{ animationDelay: '0.4s' }}>
          Premium design, branding, and 3D animation studio. Elevating modern businesses with top-tier motion graphics and cinematic visuals.
        </p>

        <div className="flex flex-wrap gap-4 justify-center animate-cinematic-text" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={scrollToPortfolio}
            className="px-8 py-4 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold rounded-xl shadow-lg shadow-[#0ea5e9]/30 hover:shadow-[#0ea5e9]/60 hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <span>View Work</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </button>
          <a
            href="#videos"
            className="px-8 py-4 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 text-white font-bold rounded-xl backdrop-blur-sm hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <Play className="w-5 h-5 text-[#38bdf8]" />
            <span>Watch Animations</span>
          </a>
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none" />
    </div>
  );
};
