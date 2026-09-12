import React from 'react';
import { Heart, ArrowUp, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070709] border-t border-[#232228] text-zinc-400 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">

        {/* Top Tribute Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-[#232228] pb-8 sm:pb-10">
          {/* Brand Block */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
            <div className="w-14 h-14 sm:w-12 sm:h-12 rounded-full border border-[#D4AF37]/50 bg-[#121216] flex items-center justify-center text-[#D4AF37] font-serif font-bold text-base shrink-0 shadow-lg">
              FOM
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#FDFBF7]">
                Fred Obachi Machoka, OGW
              </h3>
              <p className="text-[11px] sm:text-xs text-[#A37C40] font-mono mt-1">
                Celebrating 50 Years of Broadcasting Excellence • 1976 – 2026
              </p>
            </div>
          </div>

          {/* Nav Links — wraps on mobile, inline on desktop */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[11px] sm:text-xs font-mono uppercase tracking-wider">
            <a href="#journey" className="hover:text-[#D4AF37] transition-colors">
              The Journey
            </a>
            <a href="#biography" className="hover:text-[#D4AF37] transition-colors">
              Biography
            </a>
            <a href="#hall-of-fame" className="hover:text-[#D4AF37] transition-colors">
              Hall of Fame
            </a>
            <a href="#shows" className="hover:text-[#D4AF37] transition-colors">
              Shows
            </a>
            <a href="#tributes" className="hover:text-[#D4AF37] transition-colors">
              Tributes
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 min-h-[40px] min-w-[40px] rounded-full bg-[#121216] border border-[#232228] hover:border-[#D4AF37] text-zinc-300 hover:text-[#D4AF37] transition-colors flex items-center justify-center"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Machoka Final Benediction Quote */}
        <div className="text-center max-w-2xl mx-auto space-y-3 px-2">
          <p className="text-sm sm:text-base font-serif italic text-zinc-300 leading-relaxed">
            "To every Kenyan and East African who ever turned on a radio: thank you for welcoming me into your homes, your cars,
            and your hearts for 50 glorious years. The music plays on."
          </p>
          <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#D4AF37] leading-relaxed">
            — Uncle Fred Obachi Machoka • "The Blackest Man in Black Africa"
          </div>
        </div>

        {/* Creator Attribution & Required Footer Text */}
        <div className="pt-8 border-t border-[#232228] flex flex-col items-center gap-6 text-xs font-mono text-center md:grid md:grid-cols-3 md:items-center md:text-left md:gap-4">

          {/* Left: Designer credit */}
          <div className="space-y-1 order-2 md:order-1">
            <p className="text-zinc-300 font-medium">
              Website Design &amp; Development by S&amp;L Tech
            </p>
            <p className="text-zinc-500 text-[11px]">
              Building Digital Experiences That Last.
            </p>
          </div>

          {/* Center: Badge */}
          <div className="flex items-center justify-center order-1 md:order-2">
            <a
              href="https://sandltechke.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#121216] border border-[#D4AF37]/30 text-[11px] text-zinc-300 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all group"
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] group-hover:animate-ping" />
              <span>Powered by S&amp;L Tech</span>
              <ExternalLink className="w-2.5 h-2.5 ml-0.5 text-[#A37C40]" />
            </a>
          </div>

          {/* Right: Copyright */}
          <div className="text-zinc-600 text-[11px] order-3 md:text-right">
            © 1976 – 2026 • All National Media Tributes Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};