import React, { useState } from 'react';
import { Award, Trophy, Medal, Ribbon, Music, Crown, Shield, ExternalLink, Check } from 'lucide-react';
import { HALL_OF_FAME_AWARDS } from '../data/machokaData';
import { HonorAward } from '../types';

export const HallOfFameSection: React.FC = () => {
  const [selectedAward, setSelectedAward] = useState<HonorAward | null>(null);

  const getAwardIcon = (iconName: string) => {
    switch (iconName) {
      case 'Medal':
        return <Medal className="w-6 h-6 text-[#D4AF37]" />;
      case 'Award':
        return <Award className="w-6 h-6 text-[#D4AF37]" />;
      case 'Trophy':
        return <Trophy className="w-6 h-6 text-[#D4AF37]" />;
      case 'Ribbon':
        return <Ribbon className="w-6 h-6 text-[#D4AF37]" />;
      case 'Music':
        return <Music className="w-6 h-6 text-[#D4AF37]" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-[#D4AF37]" />;
      default:
        return <Shield className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="hall-of-fame" className="py-24 bg-[#0a0a0c] border-t border-[#232228] px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121216] border border-[#D4AF37]/30 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            <Trophy className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>State Honors & Peer Recognitions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#FDFBF7] tracking-tight">
            Hall of Fame
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Honored by Heads of State, peer journalism bodies, and continental music councils for five decades of
            impeccable integrity, cultural diplomacy, and media excellence.
          </p>
        </div>

        {/* Honors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HALL_OF_FAME_AWARDS.map((award) => (
            <div
              key={award.id}
              onClick={() => setSelectedAward(award)}
              className="rounded-2xl bg-[#121216] border border-[#232228] p-6 hover:border-[#D4AF37]/60 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,175,55,0.12)] cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header with year and badge */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-[#0a0a0c] border border-[#232228] group-hover:border-[#D4AF37]/40 transition-colors">
                    {getAwardIcon(award.iconName)}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-[#D4AF37] block">
                      {award.year}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
                      {award.badge}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {award.title}
                  </h3>
                  <div className="text-xs text-[#A37C40] mt-1 font-medium">
                    Conferred by: {award.conferredBy}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {award.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#232228] flex items-center justify-between text-xs text-zinc-500 group-hover:text-[#D4AF37] transition-colors font-mono">
                <span>View Full Citation</span>
                <span>&rarr;</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lifetime Citation Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#121216] via-[#181820] to-[#121216] border border-[#D4AF37]/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              Media Council of Kenya Special Resolution
            </div>
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#FDFBF7]">
              Inaugural Laureate of Kenya's Veteran Broadcasters Roll
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
              Officially recognized in 2026 as the inaugural benchmark for professional longevity, having broadcast
              continuously from Kenya's post-independence era to the modern digital frontier.
            </p>
          </div>
          <div className="shrink-0 flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">
            <Check className="w-4 h-4" />
            <span>National Living Treasure</span>
          </div>
        </div>
      </div>

      {/* Detail Citation Modal */}
      {selectedAward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#121216] border border-[#D4AF37]/60 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-5">
            <div className="flex items-center justify-between border-b border-[#232228] pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-[#0a0a0c] border border-[#D4AF37]/40">
                  {getAwardIcon(selectedAward.iconName)}
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider block">
                    {selectedAward.badge} • {selectedAward.year}
                  </span>
                  <h4 className="font-serif font-bold text-lg text-[#FDFBF7]">
                    {selectedAward.title}
                  </h4>
                </div>
              </div>
              <button
                onClick={() => setSelectedAward(null)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono uppercase text-[#A37C40]">
                Conferring Authority:
              </div>
              <div className="text-sm font-semibold text-zinc-200">
                {selectedAward.conferredBy}
              </div>

              <div className="text-xs font-mono uppercase text-[#A37C40] pt-2">
                Official Citation:
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed bg-[#0a0a0c] p-4 rounded-xl border border-[#232228]">
                "{selectedAward.description}"
              </p>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                onClick={() => setSelectedAward(null)}
                className="px-5 py-2 rounded-full bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110"
              >
                Close Citation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
