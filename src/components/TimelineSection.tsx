import React, { useState } from 'react';
import { Play, Calendar, CheckCircle2, ChevronRight, Award, Quote } from 'lucide-react';
import { MILESTONES } from '../data/machokaData';

interface TimelineSectionProps {
  onOpenVideo: (videoId: string, title: string) => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ onOpenVideo }) => {
  const [activeDecadeIndex, setActiveDecadeIndex] = useState<number>(0);
  const activeMilestone = MILESTONES[activeDecadeIndex];

  return (
    <section id="journey" className="relative py-24 bg-[#0a0a0c] border-t border-[#232228] px-4 sm:px-6 lg:px-8">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121216] border border-[#D4AF37]/30 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Interactive Chronicle • 1976 to 2026</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#FDFBF7] tracking-tight">
            The 50-Year Journey
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Follow the five-decade trajectory of a Kenyan icon: from patrolling border posts in the General Service Unit
            to commanding national airwaves and inspiring millions across East and Central Africa.
          </p>
        </div>

        {/* Decade Navigation Scrubber Bar */}
        <div className="mb-12 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center justify-start lg:justify-center space-x-2 sm:space-x-3 min-w-max px-2">
            {MILESTONES.map((m, idx) => {
              const isActive = idx === activeDecadeIndex;
              return (
                <button
                  key={m.year}
                  onClick={() => setActiveDecadeIndex(idx)}
                  className={`flex flex-col items-center px-4 py-3 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-[#181820] border-[#D4AF37] text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)] scale-105'
                      : 'bg-[#121216]/70 border-[#232228] text-zinc-400 hover:text-[#F5F2EA] hover:border-[#D4AF37]/40'
                  }`}
                >
                  <span className="font-serif font-bold text-base sm:text-lg">
                    {m.year}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                    {m.period}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Milestone Showcase Card */}
        <div className="rounded-3xl bg-[#121216] border border-[#D4AF37]/30 shadow-2xl p-6 sm:p-10 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Real Photographic Visual & Video Trigger */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-[#232228] group aspect-[16/10] bg-[#0a0a0c]">
                <img
                  src={activeMilestone.imageUrl}
                  alt={activeMilestone.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/machoka/machoka_portrait_tall.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Milestone Badge in Corner */}
                <div className="absolute top-4 left-4 bg-[#0a0a0c]/85 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/50 text-xs font-mono text-[#D4AF37] font-semibold">
                  Era: {activeMilestone.year}
                </div>

                {/* Video Play Overlay if video exists */}
                {activeMilestone.videoId && (
                  <button
                    onClick={() =>
                      onOpenVideo(activeMilestone.videoId!, `${activeMilestone.year}: ${activeMilestone.title}`)
                    }
                    className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/25 transition-colors group/play"
                    aria-label={`Play historical video for ${activeMilestone.year}`}
                  >
                    <div className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.6)] group-hover/play:scale-110 transition-transform">
                      <Play className="w-7 h-7 text-black fill-current ml-1" />
                    </div>
                  </button>
                )}

                {/* Caption at bottom */}
                <div className="absolute bottom-3 inset-x-3 text-[11px] text-zinc-300 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  {activeMilestone.imageCaption}
                </div>
              </div>

              {/* Historical Quote Callout */}
              {activeMilestone.quote && (
                <div className="p-4 rounded-xl bg-[#0a0a0c] border-l-2 border-[#D4AF37] flex items-start space-x-3 text-xs sm:text-sm italic text-zinc-300">
                  <Quote className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <p>{activeMilestone.quote}</p>
                </div>
              )}
            </div>

            {/* Narrative & Milestone Achievements */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                  <span>Chapter {activeDecadeIndex + 1} of 7</span>
                  <span>•</span>
                  <span>{activeMilestone.period}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FDFBF7] leading-snug">
                  {activeMilestone.title}
                </h3>
                <p className="text-sm font-medium text-[#A37C40]">
                  {activeMilestone.subtitle}
                </p>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {activeMilestone.description}
              </p>

              {/* Landmark Highlights */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center space-x-1.5">
                  <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Historical Highlights & Achievements</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeMilestone.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start space-x-2 p-2.5 rounded-lg bg-[#0a0a0c]/60 border border-[#232228] text-xs text-zinc-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation controls next / prev */}
              <div className="flex items-center justify-between pt-4 border-t border-[#232228]">
                <button
                  disabled={activeDecadeIndex === 0}
                  onClick={() => setActiveDecadeIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-lg text-xs uppercase font-mono tracking-wider text-zinc-400 hover:text-[#D4AF37] disabled:opacity-30 disabled:hover:text-zinc-400"
                >
                  &larr; Previous Era
                </button>
                <span className="text-xs font-mono text-zinc-500">
                  {activeDecadeIndex + 1} / {MILESTONES.length}
                </span>
                <button
                  disabled={activeDecadeIndex === MILESTONES.length - 1}
                  onClick={() => setActiveDecadeIndex((prev) => Math.min(MILESTONES.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-lg text-xs uppercase font-mono tracking-wider text-[#D4AF37] hover:brightness-125 disabled:opacity-30 flex items-center space-x-1"
                >
                  <span>Next Era</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
