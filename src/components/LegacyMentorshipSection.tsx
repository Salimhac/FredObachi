import React from 'react';
import { Users, GraduationCap, HeartHandshake, Trees, Sparkles, CheckCircle2 } from 'lucide-react';
import { AUTHENTIC_IMAGES } from '../data/machokaData';

export const LegacyMentorshipSection: React.FC = () => {
  const pillars = [
    {
      icon: <GraduationCap className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Mentorship Without Gatekeeping',
      description:
        'Throughout his 50-year career, Machoka has consistently opened doors for young broadcasters, radio producers, and audio engineers, imparting studio discipline, Swahili diction, and audience respect without rivalry.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Preserving Pan-African Heritage',
      description:
        'By archiving and celebrating Congolese Rhumba, Benga, and Swahili jazz, Fred ensured that African music remained revered, dignified, and commercially viable for succeeding generations of musicians.',
    },
    {
      icon: <Trees className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Fred’s Ranch: Agri-Tourism Sanctuary',
      description:
        'His 10-acre ranch in Isinya, Kajiado County, serves as a living blueprint for sustainable rural enterprise, hospitality, and peaceful community congregation, hosting national leaders and ordinary families alike.',
    },
  ];

  return (
    <section id="legacy" className="py-24 bg-[#0d0d11] border-t border-[#232228] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visuals & Ranch */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#121216] group">
              <img
                src={AUTHENTIC_IMAGES.fredsRanchAgri}
                alt="Fred Obachi Machoka at Fred's Ranch in Isinya"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/machoka/machoka_portrait_tall.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-black/30 to-transparent" />

              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#D4AF37]/50 text-xs font-mono text-[#D4AF37]">
                Fred's Ranch & Resort • Isinya
              </div>

              <div className="absolute bottom-4 inset-x-4 p-4 bg-[#0a0a0c]/90 backdrop-blur-md rounded-2xl border border-[#232228]">
                <div className="text-xs font-mono uppercase tracking-wider text-[#A37C40]">
                  The Rancher & Cultural Steward
                </div>
                <div className="font-serif font-bold text-base text-[#FDFBF7] mt-0.5">
                  "Agribusiness, humility, and human connection are the true anchors of wealth."
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Mentorship Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121216] border border-[#D4AF37]/30 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Mentorship & Culture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#FDFBF7] tracking-tight">
                Lifting Generations as We Climb
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Greatness in media is not measured by how long you keep the microphone to yourself, but by how many
                voices you inspire to stand tall behind it. Machoka’s enduring impact is etched in the careers of dozens
                of Kenya's top broadcast personalities today.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#121216] border border-[#232228] hover:border-[#D4AF37]/40 transition-colors flex items-start space-x-4"
                >
                  <div className="p-2.5 rounded-xl bg-[#0a0a0c] border border-[#232228] shrink-0 mt-1">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#FDFBF7]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
