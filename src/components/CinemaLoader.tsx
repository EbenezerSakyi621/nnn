import React, { useState, useEffect } from 'react';

export const CinemaLoader: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3500); // 3.5s total to allow fadeOut animation to finish
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      id="cinemaLoader"
      className="fixed inset-0 bg-black flex justify-center items-center z-[999999] animate-fade-out"
      style={{ animationDelay: '2.2s' }}
    >
      <div className="text-3xl md:text-5xl font-black tracking-[4px] text-white animate-logo-reveal uppercase">
        Sky<span className="text-[#0ea5e9]">Creatives</span>
      </div>
    </div>
  );
};
