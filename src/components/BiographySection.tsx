import React, { useState } from 'react';
import { BookOpen, Compass, Shield, Mic, Radio, Award, Quote } from 'lucide-react';
import { BIOGRAPHY_CHAPTERS } from '../data/machokaData';

export const BiographySection: React.FC = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(BIOGRAPHY_CHAPTERS[0].id);
  const activeChapter = BIOGRAPHY_CHAPTERS.find((c) => c.id === selectedChapterId) || BIOGRAPHY_CHAPTERS[0];

  const getChapterIcon = (id: string) => {
    switch (id) {
      case 'early-life':
        return <Compass className="w-4 h-4" />;
      case 'gsu-service':
        return <Shield className="w-4 h-4" />;
      case 'broadcasting-discovery':
        return <Mic className="w-4 h-4" />;
      case 'commercial-pioneer':
        return <Radio className="w-4 h-4" />;
      case 'roga-roga-phenomenon':
        return <Award className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const currentChapterIndex = BIOGRAPHY_CHAPTERS.findIndex((c) => c.id === selectedChapterId);
  const prevChapter = BIOGRAPHY_CHAPTERS[currentChapterIndex - 1];
  const nextChapter = BIOGRAPHY_CHAPTERS[currentChapterIndex + 1];

  return (
    <section id="biography" className="py-24 bg-[#0d0d11] border-t border-[#232228] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121216] border border-[#D4AF37]/30 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The Definitive Biography</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#FDFBF7] tracking-tight">
            The Life, Philosophy & Impact
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            The untold story of an officer who answered the call of the microphone, broke commercial advertising frontiers,
            built an agro-tourism sanctuary, and shaped the cultural memory of Kenya.
          </p>
        </div>

        {/* Chapters Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Chapter Selector: Horizontal scroll on mobile, vertical stack on desktop */}
          <div className="lg:col-span-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2 px-1">
              <span>Biographical Chapters</span>
              <span className="lg:hidden text-[10px] text-[#A37C40]">Swipe chapters &rarr;</span>
            </div>
            <div className="flex lg:block overflow-x-auto lg:overflow-visible gap-2.5 pb-2 lg:pb-0 lg:space-y-2 scrollbar-none">
              {BIOGRAPHY_CHAPTERS.map((chap) => {
                const isSelected = chap.id === selectedChapterId;
                return (
                  <button
                    key={chap.id}
                    onClick={() => setSelectedChapterId(chap.id)}
                    className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start space-x-3 shrink-0 min-w-[240px] sm:min-w-[280px] lg:min-w-0 lg:w-full min-h-[52px] ${
                      isSelected
                        ? 'bg-[#181820] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.15)] text-[#FDFBF7]'
                        : 'bg-[#121216]/60 border-[#232228] text-zinc-400 hover:text-zinc-200 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg mt-0.5 shrink-0 ${
                        isSelected ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-[#0a0a0c] text-zinc-500'
                      }`}
                    >
                      {getChapterIcon(chap.id)}
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#A37C40]">
                        {chap.period}
                      </div>
                      <div className={`text-xs sm:text-sm font-semibold mt-0.5 truncate ${isSelected ? 'text-[#D4AF37]' : 'text-[#F5F2EA]'}`}>
                        {chap.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chapter Content Pane */}
          <div className="lg:col-span-8 rounded-3xl bg-[#121216] border border-[#D4AF37]/30 p-6 sm:p-10 shadow-2xl space-y-8">
            {/* Header & Subtitle */}
            <div className="space-y-2 border-b border-[#232228] pb-6">
              <div className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                Era: {activeChapter.period}
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FDFBF7]">
                {activeChapter.title}
              </h3>
              <p className="text-sm text-[#A37C40] italic font-serif">
                "{activeChapter.summary}"
              </p>
            </div>

            {/* Visual & Quote */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 relative rounded-2xl overflow-hidden border border-[#232228] aspect-[4/3]">
                <img
                  src={activeChapter.imageUrl}
                  alt={activeChapter.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/machoka/machoka_portrait_tall.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 inset-x-2.5 text-[11px] text-zinc-300 bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded-md">
                  {activeChapter.imageCaption}
                </div>
              </div>

              {activeChapter.keyQuote && (
                <div className="md:col-span-6 p-6 rounded-2xl bg-[#0a0a0c] border-l-2 border-[#D4AF37] space-y-2">
                  <Quote className="w-6 h-6 text-[#D4AF37]" />
                  <p className="text-sm font-serif italic text-zinc-200 leading-relaxed">
                    {activeChapter.keyQuote}
                  </p>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#A37C40]">
                    — Fred Obachi Machoka
                  </p>
                </div>
              )}
            </div>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
              {activeChapter.content.map((paragraph, idx) => (
                <p key={idx} className="first-letter:text-3xl first-letter:font-serif first-letter:text-[#D4AF37] first-letter:font-bold">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Broadcasting Tenet */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-[#181820] to-[#121216] border border-[#232228] flex items-center justify-between">
              <div>
                <div className="text-[11px] font-mono uppercase text-[#A37C40]">Broadcasting Philosophy</div>
                <div className="text-xs sm:text-sm font-medium text-zinc-200 mt-0.5">
                  Respect the listener's time. Connect with humility. Celebrate African dignity.
                </div>
              </div>
              <div className="hidden sm:block text-2xl font-serif text-[#D4AF37]/40 font-bold">
                50 YRS
              </div>
            </div>

            {/* Chapter Prev / Next Controls */}
            <div className="pt-4 border-t border-[#232228] flex items-center justify-between gap-3">
              <button
                disabled={!prevChapter}
                onClick={() => prevChapter && setSelectedChapterId(prevChapter.id)}
                className="px-4 py-2.5 min-h-[44px] rounded-xl bg-[#0a0a0c] border border-[#232228] text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                &larr; {prevChapter ? prevChapter.title : 'First Chapter'}
              </button>
              <button
                disabled={!nextChapter}
                onClick={() => nextChapter && setSelectedChapterId(nextChapter.id)}
                className="px-4 py-2.5 min-h-[44px] rounded-xl bg-[#0a0a0c] border border-[#232228] text-xs font-mono uppercase tracking-wider text-[#D4AF37] hover:border-[#D4AF37] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                {nextChapter ? `${nextChapter.title} →` : 'Completed'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
