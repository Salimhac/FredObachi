import React, { useState } from 'react';
import { Radio, Tv, Sparkles, Disc, Clock, MessageSquareQuote } from 'lucide-react';
import { SIGNATURE_SHOWS } from '../data/machokaData';

export const SignatureShowsSection: React.FC = () => {
  const [activeShowId, setActiveShowId] = useState<string>(SIGNATURE_SHOWS[0].id);
  const activeShow = SIGNATURE_SHOWS.find((s) => s.id === activeShowId) || SIGNATURE_SHOWS[0];

  return (
    <section id="shows" className="py-24 bg-[#0d0d11] border-t border-[#232228] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121216] border border-[#D4AF37]/30 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            <Radio className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Legendary Broadcasts</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#FDFBF7] tracking-tight">
            Signature Shows
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            The landmark radio and television broadcasts that stopped clocks across Kenya, defined generations of weekend
            rituals, and introduced the world to unforgettable catchphrases.
          </p>
        </div>

        {/* Show Selector Tabs */}
        <div className="flex items-center justify-start lg:justify-center overflow-x-auto gap-2.5 pb-4 mb-10 scrollbar-none">
          {SIGNATURE_SHOWS.map((show) => {
            const isSelected = show.id === activeShowId;
            return (
              <button
                key={show.id}
                onClick={() => setActiveShowId(show.id)}
                className={`px-5 py-3 rounded-xl border text-left min-w-max transition-all ${
                  isSelected
                    ? 'bg-[#181820] border-[#D4AF37] text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                    : 'bg-[#121216]/70 border-[#232228] text-zinc-400 hover:text-[#F5F2EA] hover:border-[#D4AF37]/40'
                }`}
              >
                <div className="font-serif font-bold text-sm sm:text-base">
                  {show.name}
                </div>
                <div className="text-[10px] uppercase font-mono text-zinc-500">
                  {show.station}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Show Showcase Card */}
        <div className="rounded-3xl bg-[#121216] border border-[#D4AF37]/30 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-[#232228] aspect-[16/10] bg-[#0a0a0c] group">
                <img
                  src={activeShow.imageUrl}
                  alt={activeShow.name}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/machoka/machoka_portrait_tall.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute top-4 left-4 bg-[#0a0a0c]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/40 text-xs font-mono text-[#D4AF37] font-semibold">
                  {activeShow.badge}
                </div>

                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-700 text-xs font-mono text-zinc-300">
                  {activeShow.era}
                </div>

                {/* Catchphrase Pill overlay at bottom */}
                <div className="absolute bottom-4 inset-x-4 bg-[#0a0a0c]/90 backdrop-blur-md border border-[#D4AF37]/40 p-3 rounded-xl flex items-center space-x-2.5">
                  <Disc className="w-5 h-5 text-[#D4AF37] shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
                  <div className="truncate">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#A37C40] block">
                      Catchphrase / Call-out
                    </span>
                    <span className="text-xs sm:text-sm font-serif font-bold text-[#FDFBF7]">
                      "{activeShow.catchphrase}"
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                  <span>{activeShow.station}</span>
                  <span>•</span>
                  <span>{activeShow.era}</span>
                </div>
                <h3 className="text-3xl font-serif font-bold text-[#FDFBF7]">
                  {activeShow.name}
                </h3>
                <p className="text-sm font-medium text-[#A37C40] italic font-serif">
                  {activeShow.tagline}
                </p>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {activeShow.description}
              </p>

              {/* Memorable Moments */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Memorable Broadcast Moments</span>
                </h4>
                <div className="space-y-2">
                  {activeShow.memorableMoments.map((moment, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#0a0a0c]/70 border border-[#232228] text-xs text-zinc-300 flex items-start space-x-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{moment}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
