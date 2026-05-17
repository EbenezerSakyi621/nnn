import React, { useEffect, useRef } from 'react';
import { VideoItem } from '../data/initialData';
import { Play } from 'lucide-react';

interface VideoSectionProps {
  items: VideoItem[];
}

export const VideoSection: React.FC<VideoSectionProps> = ({ items }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-12');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="videos"
      ref={sectionRef}
      className="py-24 px-6 md:px-16 max-w-[1500px] mx-auto opacity-0 translate-y-12 transition-all duration-700 ease-out"
    >
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold inline-block relative pb-4 animate-glow-line">
          Latest Animations
        </h2>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/50 rounded-xl border border-white/5">
          <p className="text-slate-400">No animations available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#020617] rounded-xl overflow-hidden border border-white/10 shadow-lg shadow-black/50 transition-all duration-400 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#0ea5e9]/30 animate-border-glow flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-video bg-black overflow-hidden">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#ef4444] flex items-center justify-center shadow-lg shadow-[#ef4444]/50 group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-white ml-1 fill-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col justify-between flex-1 relative z-10 bg-[#020617]">
                <h3 className="font-bold text-base md:text-lg mb-4 text-slate-100 group-hover:text-[#38bdf8] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <div>
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ef4444] hover:bg-[#dc2626] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Watch Video</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
