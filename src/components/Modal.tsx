import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  imgUrl: string | null;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ imgUrl, onClose }) => {
  if (!imgUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black/95 backdrop-blur-md flex justify-center items-center z-[9999] p-4 animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:top-10 md:right-10 text-white/80 hover:text-white p-2 rounded-full bg-slate-800/60 hover:bg-slate-700/60 transition-all"
      >
        <X className="w-8 h-8" />
      </button>

      <div
        className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-xl animate-zoom-in shadow-2xl shadow-black"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={imgUrl} alt="Preview" className="w-full h-auto max-h-[85vh] object-contain rounded-xl" />
      </div>
    </div>
  );
};
