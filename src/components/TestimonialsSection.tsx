import React, { useState } from 'react';
import { MessageSquare, Quote, Heart, Star, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/machokaData';

export const TestimonialsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Broadcaster', 'Journalist', 'Artist', 'Public Figure', 'Fan'];

  const filteredTestimonials =
    selectedCategory === 'All'
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.category === selectedCategory);

  return (
    <section id="testimonials" className="py-24 bg-[#0a0a0c] border-t border-[#232228] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121216] border border-[#D4AF37]/30 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Voices Across the Continent</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#FDFBF7] tracking-tight">
            Tributes & Testimonials
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Words of respect, memories, and celebration from fellow broadcasters, international Rhumba stars, media leaders,
            and devoted fans who have tuned in since 1976.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider border transition-all ${
                  isSelected
                    ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                    : 'bg-[#121216] border-[#232228] text-zinc-400 hover:text-white hover:border-[#D4AF37]/40'
                }`}
              >
                {cat === 'All' ? 'All Testimonials' : `${cat}s`}
              </button>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl bg-[#121216] border border-[#232228] hover:border-[#D4AF37]/50 p-6 space-y-4 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg relative group"
            >
              <div className="space-y-4">
                {/* Quote Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
                    {t.category}
                  </span>
                  <Quote className="w-5 h-5 text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors" />
                </div>

                {/* Message Body */}
                <p className="text-xs sm:text-sm text-zinc-300 italic font-serif leading-relaxed">
                  "{t.message}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-[#232228] flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#0a0a0c] border border-[#D4AF37]/40 flex items-center justify-center font-serif font-bold text-xs text-[#D4AF37]">
                  {t.avatarInitials}
                </div>
                <div className="truncate">
                  <div className="font-serif font-bold text-sm text-[#FDFBF7] truncate">
                    {t.author}
                  </div>
                  <div className="text-[11px] text-zinc-400 truncate">
                    {t.role} • <span className="text-[#A37C40]">{t.organization}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
