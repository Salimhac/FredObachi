import React, { useState, useEffect, useCallback } from 'react';
import { Image as ImageIcon, ZoomIn, X, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/machokaData';
import { GalleryPhoto } from '../types';

export const GallerySection: React.FC = () => {
  const [selectedDecade, setSelectedDecade] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const decades = ['All', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];

  const filteredPhotos =
    selectedDecade === 'All'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.decade === selectedDecade);

  const handleNext = useCallback(() => {
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[nextIndex]);
  }, [activePhoto, filteredPhotos]);

  const handlePrev = useCallback(() => {
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[prevIndex]);
  }, [activePhoto, filteredPhotos]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!activePhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePhoto(null);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, handleNext, handlePrev]);

  return (
    <section id="gallery" className="py-24 bg-[#0a0a0c] border-t border-[#232228] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121216] border border-[#D4AF37]/30 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            <ImageIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Documentary Photographic Archive</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#FDFBF7] tracking-tight">
            Photo Gallery
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Curated authentic photographs capturing Fred Obachi Machoka across five decades: studio broadcasts,
            presidential award ceremonies, Rhumba luminaries, and moments at Fred's Ranch.
          </p>
        </div>

        {/* Decade Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {decades.map((dec) => {
            const isSelected = selectedDecade === dec;
            return (
              <button
                key={dec}
                onClick={() => setSelectedDecade(dec)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-all ${
                  isSelected
                    ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                    : 'bg-[#121216] border-[#232228] text-zinc-400 hover:text-[#FDFBF7] hover:border-[#D4AF37]/40'
                }`}
              >
                {dec}
              </button>
            );
          })}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative rounded-2xl overflow-hidden bg-[#121216] border border-[#232228] hover:border-[#D4AF37]/70 transition-all cursor-pointer shadow-lg aspect-[4/3]"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/machoka/machoka_portrait_tall.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-[#D4AF37]/40 text-[10px] font-mono text-[#D4AF37] font-semibold">
                  {photo.decade}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-black/60 text-[10px] font-mono text-zinc-300">
                  {photo.category}
                </span>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 border border-zinc-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Caption at bottom */}
              <div className="absolute bottom-0 inset-x-0 p-4 space-y-1">
                <h4 className="font-serif font-bold text-sm text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors leading-snug">
                  {photo.title}
                </h4>
                <p className="text-[11px] text-zinc-300 line-clamp-2">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-fadeIn"
            role="dialog"
            aria-modal="true"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#121216] border border-[#D4AF37]/60 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 z-30 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/80 border border-zinc-700 text-zinc-300 hover:text-white hover:border-[#D4AF37] transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Next / Prev Navigation */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/80 border border-zinc-700 text-zinc-300 hover:text-white hover:border-[#D4AF37] transition-colors"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/80 border border-zinc-700 text-zinc-300 hover:text-white hover:border-[#D4AF37] transition-colors"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Large Image Container */}
              <div className="relative flex-1 min-h-[220px] max-h-[58vh] sm:max-h-[66vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/machoka/machoka_portrait_tall.jpg';
                  }}
                />
              </div>

              {/* Caption & Metadata Bar */}
              <div className="p-4 sm:p-6 bg-[#121216] border-t border-[#232228] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 overflow-y-auto">
                <div className="space-y-1 w-full">
                  <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{activePhoto.year || activePhoto.decade}</span>
                    <span>•</span>
                    <Tag className="w-3.5 h-3.5" />
                    <span>{activePhoto.category}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#FDFBF7]">
                    {activePhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300">
                    {activePhoto.caption}
                  </p>
                </div>

                <div className="shrink-0 text-[11px] font-mono text-zinc-500 hidden sm:block">
                  Documentary Archive • 50 Years
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
