import React, { useState, useEffect } from 'react';
import {
  MessageSquarePlus,
  Heart,
  Send,
  Sparkles,
  MapPin,
  CheckCircle,
  Share2,
  Copy,
  Check,
  Radio,
  Wifi,
} from 'lucide-react';
import { INITIAL_TRIBUTES } from '../data/machokaData';
import { TributeNote } from '../types';
import {
  subscribeToLiveTributes,
  submitLiveTribute,
  likeLiveTribute,
  testFirebaseConnection,
} from '../lib/firebase';

export const TributeWallSection: React.FC = () => {
  const [tributes, setTributes] = useState<TributeNote[]>(() => {
    try {
      const stored = localStorage.getItem('fom_50_tributes');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return INITIAL_TRIBUTES;
  });

  const [likedIds, setLikedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('fom_50_liked_ids');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [];
  });

  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<'Memory' | 'Congratulations' | 'Gratitude'>('Congratulations');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Subscribe to real-time updates from Firestore
  useEffect(() => {
    testFirebaseConnection().then((connected) => {
      if (connected) setIsLiveConnected(true);
    });

    const unsubscribe = subscribeToLiveTributes((liveTributes) => {
      if (liveTributes && liveTributes.length > 0) {
        setTributes(liveTributes);
        setIsLiveConnected(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fom_50_tributes', JSON.stringify(tributes));
    } catch {
      // ignore
    }
  }, [tributes]);

  useEffect(() => {
    try {
      localStorage.setItem('fom_50_liked_ids', JSON.stringify(likedIds));
    } catch {
      // ignore
    }
  }, [likedIds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    // Optimistic local update
    const optimisticId = `trib-${Date.now()}`;
    const newTribute: TributeNote = {
      id: optimisticId,
      name: name.trim(),
      location: location.trim() || 'Kenya',
      category,
      message: message.trim(),
      date: formattedDate,
      likes: 0,
    };

    setTributes((prev) => [newTribute, ...prev]);

    try {
      // Send to Firestore database
      await submitLiveTribute({
        name: name.trim(),
        location: location.trim() || 'Kenya',
        category,
        message: message.trim(),
        date: formattedDate,
      });
    } catch (err) {
      console.warn('Saved tribute locally; cloud sync pending:', err);
    } finally {
      setName('');
      setLocation('');
      setMessage('');
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    }
  };

  const handleLike = async (id: string) => {
    const alreadyLiked = likedIds.includes(id);
    if (alreadyLiked) {
      setLikedIds(likedIds.filter((item) => item !== id));
      setTributes(
        tributes.map((t) => (t.id === id ? { ...t, likes: Math.max(0, t.likes - 1) } : t))
      );
    } else {
      setLikedIds([...likedIds, id]);
      setTributes(
        tributes.map((t) => (t.id === id ? { ...t, likes: t.likes + 1 } : t))
      );
      try {
        await likeLiveTribute(id);
      } catch (err) {
        console.warn('Like stored locally:', err);
      }
    }
  };

  const handleCopyWallLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#tributes`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const shareText = encodeURIComponent(
    'Join me in celebrating Fred Obachi Machoka’s 50 Years in Media (1976–2026)! Sign the National Tribute Wall here: ' +
      (typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}#tributes` : '')
  );

  const categories = ['All', 'Memory', 'Congratulations', 'Gratitude'];

  const filteredTributes =
    activeCategory === 'All'
      ? tributes
      : tributes.filter((t) => t.category === activeCategory);

  return (
    <section id="tributes" className="py-24 bg-[#0d0d11] border-t border-[#232228] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121216] border border-[#D4AF37]/30 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              <MessageSquarePlus className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>National Tribute Wall</span>
            </div>
            {isLiveConnected && (
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Sync Active</span>
              </div>
            )}
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#FDFBF7] tracking-tight">
            Leave Your Tribute & Memories
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Did you tune in to Sportsman ni Sawa Hasa in 1980? Did you dance to Roga Roga on a Sunday afternoon? Share
            your personal story, memory, or congratulations for Uncle Fred Obachi Machoka.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Tribute Submission Form */}
          <div className="lg:col-span-5 rounded-3xl bg-[#121216] border border-[#D4AF37]/40 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-xl text-[#FDFBF7]">
                Sign the Golden Commemorative Registry
              </h3>
              <p className="text-xs text-zinc-400">
                Your message will be permanently archived on this national digital monument.
              </p>
            </div>

            {showSuccess && (
              <div className="p-3.5 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-xs text-[#D4AF37] flex items-center space-x-2 animate-fadeIn">
                <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Asante sana! Your commemorative message has been added to the tribute wall.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Your Full Name / Moniker *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Mungai"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0c] border border-[#232228] text-sm text-[#F5F2EA] focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Location (City / County / Diaspora)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kisumu, Nairobi, or London"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0c] border border-[#232228] text-sm text-[#F5F2EA] focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Tribute Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Congratulations', 'Memory', 'Gratitude'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`py-2 px-2 rounded-lg text-xs font-mono transition-all ${
                        category === cat
                          ? 'bg-[#D4AF37] text-black font-bold'
                          : 'bg-[#0a0a0c] border border-[#232228] text-zinc-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Your Tribute / Memory *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write your heartfelt message to Uncle Fred Obachi Machoka..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0c] border border-[#232228] text-sm text-[#F5F2EA] focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8972E] text-black font-semibold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Posting...' : 'Submit to National Tribute Wall'}</span>
              </button>
            </form>
          </div>

          {/* Tribute Stream Feed */}
          <div className="lg:col-span-7 space-y-6">
            {/* Action & Filter Bar */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center flex-wrap gap-1.5">
                {categories.map((cat) => {
                  const isSelected = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3.5 py-1.5 min-h-[38px] rounded-full text-xs font-mono transition-all ${
                        isSelected
                          ? 'bg-[#D4AF37] text-black font-semibold shadow-sm'
                          : 'bg-[#121216] border border-[#232228] text-zinc-400 hover:text-white hover:border-[#D4AF37]/40'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Share Controls */}
              <div className="flex items-center space-x-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 min-h-[38px] rounded-lg bg-[#0a0a0c] border border-green-600/40 text-green-400 hover:bg-green-600/10 text-xs font-mono flex items-center space-x-1.5 transition-colors"
                  title="Share on WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>

                <button
                  onClick={handleCopyWallLink}
                  className="px-3 py-1.5 min-h-[38px] rounded-lg bg-[#0a0a0c] border border-[#232228] text-zinc-300 hover:border-[#D4AF37]/50 text-xs font-mono flex items-center space-x-1.5 transition-colors"
                  title="Copy tribute wall URL"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Tributes List */}
            <div className="space-y-4 max-h-[620px] overflow-y-auto pr-1">
              {filteredTributes.map((t) => {
                const isLiked = likedIds.includes(t.id);
                return (
                  <div
                    key={t.id}
                    className="p-5 rounded-2xl bg-[#121216] border border-[#232228] hover:border-[#D4AF37]/30 transition-colors space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-serif font-bold text-sm text-[#FDFBF7] block">
                          {t.name}
                        </span>
                        <div className="flex items-center space-x-1.5 text-[11px] text-zinc-400">
                          <MapPin className="w-3 h-3 text-[#A37C40]" />
                          <span>{t.location}</span>
                          <span>•</span>
                          <span>{t.date}</span>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
                        {t.category}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 italic font-serif leading-relaxed">
                      "{t.message}"
                    </p>

                    <div className="flex items-center justify-end pt-2 border-t border-[#232228]">
                      <button
                        onClick={() => handleLike(t.id)}
                        className={`min-h-[40px] px-3 py-1 rounded-full border text-xs flex items-center space-x-1.5 transition-all ${
                          isLiked
                            ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]'
                            : 'bg-[#0a0a0c] border-[#232228] text-zinc-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/40'
                        }`}
                        aria-label={isLiked ? 'Unlike tribute' : 'Like tribute'}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                            isLiked ? 'text-[#D4AF37] fill-current' : 'text-zinc-500'
                          }`}
                        />
                        <span>{t.likes}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
