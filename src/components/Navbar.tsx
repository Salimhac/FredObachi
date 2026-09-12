import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Sparkles, Award } from 'lucide-react';
import { ambientSound } from '../utils/audioSynth';

interface NavbarProps {
  onOpenTributeModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleSound = () => {
    const active = ambientSound.toggle();
    setIsPlayingAudio(active);
  };

  const navLinks = [
    { label: 'Journey', href: '#journey' },
    { label: 'Biography', href: '#biography' },
    { label: 'Hall of Fame', href: '#hall-of-fame' },
    { label: 'Signature Shows', href: '#shows' },
    { label: 'Photo Gallery', href: '#gallery' },
    { label: 'Impact', href: '#impact' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Events & Gala', href: '#anniversary' },
    { label: 'Tribute Wall', href: '#tributes' },
    { label: 'Crafted By', href: '#partner' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0c]/90 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-2xl py-3'
          : 'bg-gradient-to-b from-[#0a0a0c]/90 via-[#0a0a0c]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram & Title */}
        <a href="#" className="flex items-center space-x-3 group" id="nav-brand-logo">
          <div className="w-10 h-10 rounded-full border border-[#D4AF37]/60 bg-[#121216] flex items-center justify-center shadow-lg group-hover:border-[#D4AF37] transition-colors">
            <span className="font-serif text-[#D4AF37] font-bold text-sm tracking-wider">FOM</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-sm sm:text-base font-semibold tracking-wide text-[#F5F2EA] group-hover:text-[#D4AF37] transition-colors">
                Fred Obachi Machoka
              </span>
              <span className="hidden sm:inline-flex items-center text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-medium">
                50 Years
              </span>
            </div>
            <p className="text-[10px] text-[#A37C40] tracking-wider uppercase font-mono">
              "The Blackest Man in Black Africa" • 1976 – 2026
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-6 text-xs tracking-wider uppercase font-medium text-[#dcd6c8]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#D4AF37] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Ambient Rhumba Sound Toggle */}
          <button
            id="btn-ambient-audio"
            onClick={toggleSound}
            aria-label="Toggle ambient radio acoustic chords"
            title={isPlayingAudio ? 'Mute ambient sound' : 'Play ambient Rhumba soundscape'}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              isPlayingAudio
                ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'bg-[#121216]/80 border-[#232228] text-[#dcd6c8] hover:border-[#D4AF37]/50'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                <span className="hidden md:inline">Rhumba Ambient</span>
                <span className="flex space-x-0.5 items-end h-3">
                  <span className="w-0.5 h-2 bg-[#D4AF37] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-0.5 h-3 bg-[#D4AF37] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-0.5 h-1.5 bg-[#D4AF37] animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                <span className="hidden md:inline text-zinc-400">Atmosphere</span>
              </>
            )}
          </button>

          {/* Quick Tribute CTA */}
          <a
            href="#tributes"
            id="btn-nav-tribute-cta"
            className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8972E] text-black font-semibold text-xs tracking-wider uppercase shadow-md hover:brightness-110 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-3 h-3 text-black" />
            <span>Sign Tribute</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            id="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-[#121216] border border-[#232228] text-[#F5F2EA] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Backdrop & Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Click Dismiss */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 top-[65px] bg-black/70 backdrop-blur-sm z-40 xl:hidden animate-fadeIn"
            aria-hidden="true"
          />

          {/* Drawer Menu */}
          <div className="relative z-50 xl:hidden bg-[#0a0a0c]/98 backdrop-blur-2xl border-b border-[#D4AF37]/30 px-4 sm:px-6 py-5 shadow-2xl transition-all max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2.5 text-xs sm:text-sm font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-3 min-h-[44px] flex items-center rounded-xl bg-[#121216]/80 border border-[#232228] text-[#F5F2EA] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 active:bg-[#D4AF37]/10 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#232228] flex flex-col space-y-2.5">
              <a
                href="#tributes"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 min-h-[44px] flex items-center justify-center rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8972E] text-black font-semibold text-xs tracking-wider uppercase shadow-md"
              >
                Sign the National Tribute Wall
              </a>
              <div className="text-center text-[11px] font-mono text-[#A37C40]">
                "The Blackest Man in Black Africa" • 1976 – 2026
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
