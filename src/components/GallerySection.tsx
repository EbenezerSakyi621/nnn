import React, { useEffect, useRef } from 'react';
import { DesignItem } from '../data/initialData';
import { ZoomIn } from 'lucide-react';

interface GallerySectionProps {
  title: string;
  items: DesignItem[];
  onSelectImg: (url: string) => void;
  id?: string;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ title, items, onSelectImg, id }) => {
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
      id={id}
      ref={sectionRef}
      className="py-24 px-6 md:px-16 max-w-[1500px] mx-auto opacity-0 translate-y-12 transition-all duration-700 ease-out"
    >
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold inline-block relative pb-4 animate-glow-line">
          {title}
        </h2>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/50 rounded-xl border border-white/5">
          <p className="text-slate-400">No items available in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectImg(item.url)}
              className="group relative h-64 bg-[#020617] rounded-xl overflow-hidden cursor-pointer border border-white/5 shadow-md shadow-black/40 transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0ea5e9]/20 hover:border-[#0ea5e9]/40"
            >
              <img
                src={item.url}
                alt={item.title || 'Design'}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex items-center gap-2 text-[#0ea5e9] font-bold text-sm">
                  <ZoomIn className="w-5 h-5" />
                  <span>View Preview</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
