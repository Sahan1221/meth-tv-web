import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Image as ImageIcon, ZoomIn, Share2, Check } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Lightbox } from '../components/common/Lightbox';

interface EventDetailPageProps {
  eventId: string;
  onNavigate: (route: string) => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({ eventId, onNavigate }) => {
  const { publishedEvents } = useContent();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const event = publishedEvents.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#650F18] font-sinhala-serif">
          පුණ්‍යකර්ම විස්තරය හමු නොවීය
        </h2>
        <p className="text-xs text-stone-500">
          ඔබ සොයන පුණ්‍යකර්මය මකා දමා හෝ ප්‍රකාශනයෙන් ඉවත් කර තිබිය හැක.
        </p>
        <button
          onClick={() => onNavigate('/programs/completed')}
          className="px-5 py-2.5 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
        >
          පුණ්‍යකර්ම ලැයිස්තුවට ආපසු
        </button>
      </div>
    );
  }

  const sortedPhotos = [...(event.photos || [])].sort((a, b) => a.displayOrder - b.displayOrder);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
    setLightboxOpen(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Navigation bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('/programs/completed')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#650F18] hover:text-[#9C1C24] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#9C1C24]" />
          <span>අවසන් වූ පුණ්‍යකර්ම ලැයිස්තුවට</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#650F18] bg-white border border-[#EFE6E4] rounded-xl shadow-xs hover:bg-[#FAF7F5] transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-[#9C1C24]" />}
          <span>{copied ? 'සබැඳිය පිටපත් විය' : 'බෙදාහරින්න'}</span>
        </button>
      </div>

      {/* Event Header Banner */}
      <div className="bg-white rounded-3xl border border-[#EFE6E4] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
          <span className="flex items-center gap-1 text-[#9C1C24] font-bold bg-[#FDF4F5] border border-[#EFCED1] px-3 py-1 rounded-xl">
            <Calendar className="w-3.5 h-3.5 text-[#9C1C24]" />
            {event.eventDate}
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="flex items-center gap-1 text-[#2B2526]">
            <MapPin className="w-3.5 h-3.5 text-[#9C1C24]" />
            {event.venue}
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="flex items-center gap-1 text-[#2B2526]">
            <ImageIcon className="w-3.5 h-3.5 text-[#9C1C24]" />
            {sortedPhotos.length} ඡායාරූප
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#650F18] font-sinhala-serif leading-tight">
          {event.title}
        </h1>

        <p className="text-sm sm:text-base text-[#2B2526] leading-relaxed max-w-4xl whitespace-pre-line font-sans">
          {event.description}
        </p>
      </div>

      {/* Photo Gallery Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#650F18] font-sinhala-serif">
            ඡායාරූප ගැලරිය
          </h2>
          <span className="text-xs text-stone-500">
            විශාල කර බැලීමට ඡායාරූපයක් මත ක්ලික් කරන්න
          </span>
        </div>

        {sortedPhotos.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#EFE6E4]">
            <p className="text-xs text-stone-500">මෙම පුණ්‍යකර්මය සඳහා ඡායාරූප තවමත් උඩුගත කර නොමැත.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {sortedPhotos.map((photo, index) => (
              <figure
                key={photo.id}
                onClick={() => openLightbox(index)}
                className="bg-white rounded-2xl overflow-hidden border border-[#EFE6E4] shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={photo.imageUrl}
                    alt={photo.altText || photo.caption || event.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 bg-black/60 rounded-full text-white">
                      <ZoomIn className="w-5 h-5 text-[#F5C518]" />
                    </span>
                  </div>
                </div>

                {photo.caption && (
                  <figcaption className="p-3 text-xs text-[#2B2526] bg-white border-t border-[#EFE6E4] leading-snug line-clamp-2">
                    {photo.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Component */}
      <Lightbox
        photos={sortedPhotos}
        currentIndex={activePhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setActivePhotoIndex((prev) => (prev + 1) % sortedPhotos.length)}
        onPrev={() => setActivePhotoIndex((prev) => (prev - 1 + sortedPhotos.length) % sortedPhotos.length)}
      />
    </div>
  );
};
