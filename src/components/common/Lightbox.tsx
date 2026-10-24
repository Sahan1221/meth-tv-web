import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { EventPhoto } from '../../types';

interface LightboxProps {
  photos: EventPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex];
  if (!currentPhoto) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 animate-fadeIn select-none"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between text-white z-10">
        <div className="text-sm font-medium text-stone-300">
          ඡායාරූපය <span className="text-amber-400 font-bold">{currentIndex + 1}</span> / {photos.length}
        </div>
        <button
          onClick={onClose}
          className="p-2 text-stone-300 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none"
          aria-label="වසන්න (Close)"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Area with Previous & Next controls */}
      <div className="relative flex-1 flex items-center justify-center my-2 overflow-hidden">
        {photos.length > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-4 z-10 p-3 text-white bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="පෙර ඡායාරූපය"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <img
          src={currentPhoto.imageUrl}
          alt={currentPhoto.altText || currentPhoto.caption || 'ගැලරි ඡායාරූපය'}
          className="max-h-[80vh] max-w-[92vw] object-contain rounded-md shadow-2xl transition-all"
        />

        {photos.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-4 z-10 p-3 text-white bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="මීළඟ ඡායාරූපය"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Caption */}
      <div className="text-center max-w-3xl mx-auto py-2 z-10">
        {currentPhoto.caption ? (
          <p className="text-sm text-stone-200 font-sans leading-relaxed">
            {currentPhoto.caption}
          </p>
        ) : (
          <p className="text-xs text-stone-400 italic">
            {currentPhoto.altText || 'මෙත් රූපවාහිනී පුණ්‍යකර්ම ගැලරිය'}
          </p>
        )}
      </div>
    </div>
  );
};
