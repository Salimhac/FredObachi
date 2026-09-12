import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface VideoModalProps {
  videoId: string | null;
  title?: string;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ videoId, title, onClose }) => {
  useEffect(() => {
    if (!videoId) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [videoId, onClose]);

  if (!videoId) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-[#121216] border border-[#D4AF37]/50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl space-y-3 p-3 sm:p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#232228] pb-3">
          <h3 className="font-serif font-bold text-sm sm:text-lg text-[#FDFBF7] truncate pr-3">
            {title || 'Fred Obachi Machoka Broadcast Footage'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-[#0a0a0c] border border-zinc-700 text-zinc-300 hover:text-white hover:border-[#D4AF37] transition-colors"
            aria-label="Close Video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-[#232228]">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title || 'YouTube video player'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* Footer Notes */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-zinc-400 pt-1">
          <span>Authentic Broadcast Archive • Citizen TV & KBC Records</span>
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D4AF37] hover:underline flex items-center space-x-1 py-1"
          >
            <span>Watch on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
