import React from 'react';
import { MessageSquare } from 'lucide-react';

export const ContactFooter: React.FC = () => {
  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/233534023396"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-[#25d366] hover:bg-[#20ba5c] text-white rounded-full flex items-center justify-center text-3xl shadow-xl shadow-[#25d366]/40 z-[99999] animate-float-btn hover:scale-110 transition-transform duration-300"
        title="Chat on WhatsApp"
      >
        💬
      </a>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 md:px-16 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold inline-block relative pb-4 mb-12 animate-glow-line">
          Contact Us
        </h2>

        <div className="bg-[#020617] p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl shadow-black relative overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#0ea5e9]/20 to-[#22c55e]/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition duration-500 pointer-events-none" />

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Let’s Build Something Amazing Together 🚀
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto mb-8 text-base md:text-lg">
              Have a project in mind? Reach out and let’s create premium visuals, branding, and 3D animations for your brand.
            </p>

            <a href="https://wa.me/233534023396" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-4 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold rounded-xl shadow-lg shadow-[#22c55e]/30 hover:shadow-[#22c55e]/60 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 text-base md:text-lg">
                <MessageSquare className="w-6 h-6" />
                <span>Message Us on WhatsApp</span>
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-slate-500 border-t border-white/5 bg-[#020617]/40 backdrop-blur-sm text-sm">
        <p className="mb-2">© 2026 Sky Creatives. All rights reserved.</p>
        <p className="text-xs text-slate-600">Cinematic Design & 3D Animation Studio — Ghana</p>
      </footer>
    </>
  );
};
