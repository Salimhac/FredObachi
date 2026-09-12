import React, { useState } from 'react';
import { Globe, Mail, ExternalLink, Code2, Sparkles, Send, Check } from 'lucide-react';
import { AUTHENTIC_IMAGES } from '../data/machokaData';

export const CreatorPartnerSection: React.FC = () => {
  const [contactSent, setContactSent] = useState(false);
  const [contactEmail, setContactEmail] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail) return;
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactEmail('');
    }, 4000);
  };

  return (
    <section id="partner" className="py-16 bg-[#0a0a0c] border-t border-[#232228] px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-[#121216] border border-[#D4AF37]/30 text-[11px] font-mono uppercase tracking-widest text-[#D4AF37]">
            <Code2 className="w-3 h-3 text-[#D4AF37]" />
            <span>Digital Platform & Archival Partner</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#FDFBF7]">
            Digital Experience Crafted By
          </h2>
        </div>

        {/* Creator Showcase Container */}
        <div className="rounded-2xl bg-[#121216] border border-[#232228] p-6 sm:p-8 shadow-xl hover:border-[#D4AF37]/40 transition-all">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Company Overview (S&L Tech) */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center space-x-3">
                {/* Official S&L Tech Logo */}
                <div className="w-12 h-12 rounded-xl bg-black border border-[#D4AF37]/40 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
                  <img
                    src={AUTHENTIC_IMAGES.slTechLogo}
                    alt="S&L Tech Logo"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback monogram if image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#FDFBF7] flex items-center space-x-2">
                    <span>S&L Tech</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                      Nairobi, Kenya
                    </span>
                  </h3>
                  <p className="text-xs text-[#A37C40] font-mono">
                    Modern Web & Mobile App Development
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                This commemorative website was designed and developed by{' '}
                <strong className="text-[#FDFBF7]">S&L Tech</strong>, a Kenyan web and mobile app development
                company focused on building modern digital experiences, business platforms, and impactful technology
                solutions.
              </p>

              {/* Links & CTA */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://sandltechke.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-[#0a0a0c] border border-[#D4AF37]/40 text-xs font-mono text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visit sandltechke.vercel.app</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>

                <a
                  href="mailto:melanj23@gmail.com?subject=Fred%20Obachi%20Machoka%2050%20Years%20Website%20Inquiry"
                  className="inline-flex items-center space-x-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-[#0a0a0c] border border-[#232228] text-xs font-mono text-zinc-300 hover:text-white hover:border-[#D4AF37]/40 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#A37C40]" />
                  <span>Contact S&L Tech</span>
                </a>
              </div>
            </div>

            {/* Featured Founder Profile: Ramadhan Salim */}
            <div className="md:col-span-5 rounded-xl bg-[#0a0a0c] border border-[#232228] p-5 space-y-3.5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#A37C40]">
                Featured Founder
              </div>

              <div className="flex items-start space-x-3">
                {/* Professional Crest / Portrait Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#181820] to-[#121216] border border-[#D4AF37] flex items-center justify-center shrink-0 shadow-lg text-[#D4AF37] font-serif font-bold text-sm">
                  RS
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#FDFBF7]">
                    Ramadhan Salim
                  </h4>
                  <p className="text-[11px] text-[#A37C40] font-mono">
                    Founder & Lead Developer, S&L Tech
                  </p>
                </div>
              </div>

              <blockquote className="text-xs text-zinc-400 italic font-serif leading-relaxed border-l-2 border-[#D4AF37]/40 pl-3">
                "Passionate about technology, digital innovation, and building solutions that create meaningful impact across Africa."
              </blockquote>

              {/* Founder Profiles */}
              <div className="flex items-center space-x-3 pt-2 border-t border-[#232228] text-[11px] font-mono">
                <a
                  href="https://sandltechke.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-[#D4AF37] transition-colors flex items-center space-x-1"
                >
                  <span>Portfolio</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <span className="text-zinc-600">•</span>
                <a
                  href="https://github.com/Salimhac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-[#D4AF37] transition-colors"
                >
                  GitHub
                </a>
                <span className="text-zinc-600">•</span>
                <a
                  href="https://instagram.com/s_and_ltech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-[#D4AF37] transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
