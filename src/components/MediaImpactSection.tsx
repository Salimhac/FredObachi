import React from 'react';
import { BarChart3, Radio, Users, Clock, Globe2, Sparkles, Building2, Flame } from 'lucide-react';
import { IMPACT_METRICS } from '../data/machokaData';

export const MediaImpactSection: React.FC = () => {
  const broadcastNetworks = [
    {
      name: 'Voice of Kenya (VOK)',
      era: '1976 – 1989',
      role: 'Foundational Broadcasting & Commercial Shows',
      reach: 'Nationwide AM/Shortwave monopoly network',
    },
    {
      name: 'FM 35 Promotions',
      era: '1988 – Present',
      role: 'Pioneered Independent Audio Commercial Production',
      reach: 'Over 200 corporate ad campaigns across East Africa',
    },
    {
      name: 'Kenya Broadcasting Corp (KBC)',
      era: '1989 – 2002',
      role: 'National General Service, Music Time & Metro FM',
      reach: 'The primary cultural lifeline during democratic transition',
    },
    {
      name: 'Royal Media Services (Radio Citizen & Citizen TV)',
      era: '2002 – Present',
      role: 'Conceived Roga Roga & Weekend Television Dance Party',
      reach: 'Undisputed #1 broadcast network across East Africa',
    },
  ];

  return (
    <section id="impact" className="py-24 bg-[#0d0d11] border-t border-[#232228] px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121216] border border-[#D4AF37]/30 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            <BarChart3 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Broadcasting Authority & Reach</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#FDFBF7] tracking-tight">
            Media Impact & Legacy
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            By every metric of longevity, listenership loyalty, and cultural resonance, Fred Obachi Machoka has set the
            benchmark for African media leadership over a half-century span.
          </p>
        </div>

        {/* Big Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {IMPACT_METRICS.map((metric, i) => (
            <div
              key={i}
              className="rounded-2xl bg-[#121216] border border-[#232228] hover:border-[#D4AF37]/50 p-6 space-y-3 transition-all hover:-translate-y-1 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#D4AF37]">
                  {metric.number}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#0a0a0c] border border-[#232228] flex items-center justify-center text-[#D4AF37]">
                  {i === 0 && <Clock className="w-5 h-5" />}
                  {i === 1 && <Users className="w-5 h-5" />}
                  {i === 2 && <Radio className="w-5 h-5" />}
                  {i === 3 && <Globe2 className="w-5 h-5" />}
                </div>
              </div>
              <h3 className="font-serif font-bold text-base text-[#FDFBF7]">
                {metric.label}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Broadcasting Lineage & Stations Timeline */}
        <div className="rounded-3xl bg-[#121216] border border-[#D4AF37]/30 p-8 sm:p-12 space-y-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232228] pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                Broadcasting Lineage
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#FDFBF7] mt-1">
                Four Eras of Media Transformation (1976 – 2026)
              </h3>
            </div>
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#0a0a0c] border border-zinc-800 text-xs text-zinc-300">
              <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>National Impact</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {broadcastNetworks.map((net, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0a0a0c]/80 border border-[#232228] space-y-3 relative group hover:border-[#D4AF37]/40 transition-colors"
              >
                <div className="text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase">
                  {net.era}
                </div>
                <h4 className="font-serif font-bold text-base text-[#FDFBF7]">
                  {net.name}
                </h4>
                <p className="text-xs text-zinc-300">
                  {net.role}
                </p>
                <div className="pt-2 text-[11px] text-[#A37C40] border-t border-[#232228]/80 font-mono">
                  {net.reach}
                </div>
              </div>
            ))}
          </div>

          {/* Impact Statement Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0a0a0c] via-[#181820] to-[#0a0a0c] border border-[#D4AF37]/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4 text-left">
              <div className="p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] shrink-0">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#FDFBF7]">
                  Cultural Unifier Across Borders
                </h4>
                <p className="text-xs text-zinc-400">
                  Uncle Fred's broadcasts have built cultural bridges between Kenya, DR Congo, Tanzania, and Uganda,
                  cementing Rhumba as a permanent pillar of African shared memory.
                </p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <span className="text-xs font-mono font-semibold text-[#D4AF37] tracking-widest uppercase">
                50 Golden Years
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
