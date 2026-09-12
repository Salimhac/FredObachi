import React, { useEffect, useRef } from 'react';
import { Play, ChevronDown, Award, Sparkles, Radio, ShieldCheck } from 'lucide-react';
import { AUTHENTIC_IMAGES } from '../data/machokaData';

interface HeroSectionProps {
  onOpenVideo: (videoId: string, title: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenVideo }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animated gold particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particleCount = Math.min(width > 768 ? 65 : 30, 80);
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
    }> = [];

    const goldPalette = ['#D4AF37', '#E5C158', '#FFF0BD', '#A37C40', '#B8972E'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.6,
        speedY: -(Math.random() * 0.45 + 0.15),
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.7 + 0.2,
        color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        // Wrap around
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#D4AF37';
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0c] pt-24 pb-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Gold Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-60"
        aria-hidden="true"
      />

      {/* Atmospheric Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#A37C40]/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Text & Introduction Column */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-6">
          {/* Presidential & Golden Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>National Golden Jubilee</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#121216] border border-[#232228] text-[#dcd6c8]">
              <Radio className="w-3 h-3 text-[#A37C40]" />
              <span>Voice of Kenya • KBC • Radio Citizen • Citizen TV</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#121216] border border-[#232228] text-[#dcd6c8]">
              <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
              <span>Order of the Grand Warrior (OGW)</span>
            </span>
          </div>

          {/* Golden Jubilee Epoch Header */}
          <div className="space-y-3">
            <a
              href="#anniversary"
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1b1a22] border border-[#D4AF37]/40 text-xs font-mono text-[#D4AF37] hover:bg-[#D4AF37]/15 hover:border-[#D4AF37] transition-all group"
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Upcoming Event: Machoka @50 with Koffi Olomide (Oct 10, 2026 • Ulinzi Sports Complex)</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </a>
            <div className="text-sm sm:text-base font-mono uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">
              1976 — 2026
            </div>
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif font-extrabold tracking-tight text-[#FDFBF7] leading-[1.08]">
              Celebrating{' '}
              <span className="gold-gradient-text block sm:inline">
                50 Years
              </span>{' '}
              in Media
            </h1>
            
            {/* The Legendary Tagline Banner */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/25 via-[#D4AF37]/10 to-transparent border-l-4 border-l-[#D4AF37] border-y border-r border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm sm:text-lg font-serif font-bold text-[#FDFBF7] tracking-wide">
                "The Blackest Man in Black Africa"
              </span>
              <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider hidden sm:inline">
                • Uncle Fred Obachi Machoka
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-zinc-400 font-medium">
              The King of Rhumba • Commander of Roga Roga • Kenya's Living Broadcasting Monument
            </p>
          </div>

          {/* Documentary Narrative Synopsis */}
          <p className="text-sm sm:text-base text-[#dcd6c8] leading-relaxed max-w-2xl mx-auto lg:mx-0">
            For half a century, <strong className="text-[#FDFBF7]">Uncle Fred Obachi Machoka</strong> has entered millions of living rooms, farms, vehicles, and hearts.
            From a young paramilitary GSU officer discovered by Voice of Kenya in 1975 to commanding the continental
            phenomenon of <strong className="text-[#FDFBF7] font-semibold">Roga Roga</strong>, his golden baritone and proud celebration of African heritage have
            defined the soundtrack of Kenyan history and the soul of African music.
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <a
              href="#journey"
              id="btn-hero-explore"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B8972E] text-black font-semibold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.5)] transition-all hover:scale-[1.02] text-center"
            >
              Explore 50-Year Journey
            </a>

            <button
              onClick={() => onOpenVideo('cKTcBxOLrTw', 'Fred Obachi Machoka: 50 Years of Broadcasting (Citizen TV Special)')}
              id="btn-hero-watch-documentary"
              className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-full bg-[#121216] border border-[#D4AF37]/50 text-[#F5F2EA] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all text-sm font-medium uppercase tracking-wider group"
            >
              <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors">
                <Play className="w-3 h-3 text-[#D4AF37] group-hover:text-black fill-current ml-0.5" />
              </div>
              <span>Watch Documentary</span>
            </button>

            <a
              href="#tributes"
              id="btn-hero-tribute"
              className="w-full sm:w-auto text-center px-5 py-3 text-xs uppercase tracking-widest text-[#A37C40] hover:text-[#D4AF37] underline underline-offset-8 transition-colors"
            >
              Leave a Tribute Wall Message &rarr;
            </a>
          </div>

          {/* Key Stat Badges Row */}
          <div className="pt-4 border-t border-[#232228]/80 grid grid-cols-3 gap-2 sm:gap-4 text-center lg:text-left">
            <div>
              <div className="text-lg sm:text-2xl font-serif font-bold text-[#D4AF37]">5 Decades</div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400">Continuous Service</div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-serif font-bold text-[#FDFBF7]">1976 – 2026</div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400">Broadcasting Era</div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-serif font-bold text-[#D4AF37]">20M+</div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400">Weekly Audience</div>
            </div>
          </div>
        </div>

        {/* Hero Portrait & Frame Column */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md">
            {/* Outer Decorative Gold Ring */}
            <div className="absolute -inset-2.5 rounded-2xl bg-gradient-to-b from-[#D4AF37]/50 via-[#8C6D3B]/20 to-[#D4AF37]/10 blur-sm pointer-events-none" />

            {/* Main Portrait Card */}
            <div className="relative rounded-2xl bg-[#121216] border-2 border-[#D4AF37]/60 overflow-hidden shadow-2xl">
              {/* Corner ornamental accents */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none z-20" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none z-20" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none z-20" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none z-20" />

              {/* Authentic Photo of Fred Obachi Machoka */}
              <div className="relative aspect-[4/5] overflow-hidden group">
                <img
                  src={AUTHENTIC_IMAGES.portrait}
                  alt="Authentic portrait photograph of veteran broadcaster Fred Obachi Machoka"
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to official 70th anniversary broadcast photograph
                    (e.target as HTMLImageElement).src = AUTHENTIC_IMAGES.anniversary70th;
                  }}
                />

                {/* Subtle vignette gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-black/20" />

                {/* Golden Badge floating on image */}
                <div className="absolute top-4 right-4 bg-[#0a0a0c]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#D4AF37]/60 flex items-center space-x-1.5 shadow-lg z-10">
                  <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="text-[11px] font-mono tracking-wider text-[#D4AF37] font-semibold">
                    1976 – 2026
                  </span>
                </div>

                {/* Caption Banner at Bottom */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/90 to-transparent z-10 space-y-1">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[10px] uppercase font-mono tracking-wider text-[#D4AF37] font-bold">
                    <span>The Blackest Man in Black Africa</span>
                  </div>
                  <p className="text-base sm:text-lg font-serif font-bold text-[#FDFBF7]">
                    Fred Obachi Machoka, OGW
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-zinc-300">
                    Host of Roga Roga • 50 Years of Continuous Broadcasting
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Vintage Stamp */}
            <div className="absolute -bottom-4 left-2 sm:-bottom-5 sm:-left-5 bg-[#0a0a0c] border border-[#D4AF37]/60 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-2xl flex items-center space-x-2.5 sm:space-x-3 z-20">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="text-left">
                <div className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-[#A37C40]">Golden Milestone</div>
                <div className="text-xs font-bold text-[#F5F2EA]">50 Years Behind The Mic</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-[#A37C40] hover:text-[#D4AF37] transition-colors pointer-events-auto">
        <a href="#journey" className="flex flex-col items-center space-y-1" aria-label="Scroll to Journey Timeline">
          <span className="text-[10px] uppercase tracking-[0.25em] font-mono">Scroll to Explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#D4AF37]" />
        </a>
      </div>
    </section>
  );
};
