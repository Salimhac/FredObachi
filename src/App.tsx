import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TimelineSection } from './components/TimelineSection';
import { BiographySection } from './components/BiographySection';
import { HallOfFameSection } from './components/HallOfFameSection';
import { SignatureShowsSection } from './components/SignatureShowsSection';
import { GallerySection } from './components/GallerySection';
import { MediaImpactSection } from './components/MediaImpactSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LegacyMentorshipSection } from './components/LegacyMentorshipSection';
import { AnniversarySection } from './components/AnniversarySection';
import { TributeWallSection } from './components/TributeWallSection';
import { CreatorPartnerSection } from './components/CreatorPartnerSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenVideo = (videoId: string, title: string) => {
    setActiveVideo({ id: videoId, title });
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#F5F2EA] flex flex-col selection:bg-[#D4AF37]/30 selection:text-[#FFF] overflow-x-hidden relative">
      {/* Primary Sticky Glass Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <HeroSection onOpenVideo={handleOpenVideo} />

        {/* 2. The Journey Timeline */}
        <TimelineSection onOpenVideo={handleOpenVideo} />

        {/* 3. Biography Section */}
        <BiographySection />

        {/* 4. Hall of Fame */}
        <HallOfFameSection />

        {/* 5. Signature Shows */}
        <SignatureShowsSection />

        {/* 6. Photo Gallery */}
        <GallerySection />

        {/* 7. Media Impact */}
        <MediaImpactSection />

        {/* 8. Testimonials & Tributes */}
        <TestimonialsSection />

        {/* 9. Legacy & Mentorship */}
        <LegacyMentorshipSection />

        {/* 10. Golden Anniversary Section (50 Years of Excellence) */}
        <AnniversarySection />

        {/* 11. Contact & Tribute Wall */}
        <TributeWallSection />

        {/* 12. Creator & Digital Partner (S&L Tech / Ramadhan Salim) */}
        <CreatorPartnerSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Back To Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 min-h-[44px] min-w-[44px] rounded-full bg-[#121216]/90 border border-[#D4AF37]/50 text-[#D4AF37] shadow-xl hover:bg-[#D4AF37] hover:text-black transition-all animate-fadeIn flex items-center justify-center"
          aria-label="Back to top of page"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Historical Video Modal */}
      <VideoModal
        videoId={activeVideo?.id ?? null}
        title={activeVideo?.title}
        onClose={handleCloseVideo}
      />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
