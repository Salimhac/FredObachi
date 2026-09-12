import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Download,
  Ticket,
  Copy,
  ExternalLink,
  Music,
  Tv,
  Users,
  Mic,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import {
  GOLDEN_ANNIVERSARY_INFO,
  UPCOMING_EVENTS,
  AUTHENTIC_IMAGES,
} from '../data/machokaData';

export const AnniversarySection: React.FC = () => {
  // Lock to the Machoka @ 50 concert only
  const activeEvent =
    UPCOMING_EVENTS.find((e) => e.id === 'machoka-50-concert') || UPCOMING_EVENTS[0];

  const [attendeeName, setAttendeeName] = useState('');
  const [affiliation, setAffiliation] = useState('Loyal Roga Roga Listener');
  const [ticketTier, setTicketTier] = useState('VIP (KES 5,000)');
  const [generatedPass, setGeneratedPass] = useState<{
    name: string;
    serial: string;
    affiliation: string;
    eventTitle: string;
    eventVenue: string;
    eventDate: string;
    tier: string;
  } | null>(null);
  const [copiedPass, setCopiedPass] = useState(false);

  // Generate .ics calendar file
  const handleDownloadICS = () => {
    const uid = 'machoka-50-concert@machoka50.org';
    const dtstart = '20261010T110000Z';
    const dtend = '20261010T210000Z';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Fred Obachi Machoka 50 Years//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      'DTSTAMP:20260912T120000Z',
      `DTSTART:${dtstart}`,
      `DTEND:${dtend}`,
      `SUMMARY:${activeEvent.title} – ${activeEvent.subtitle}`,
      `DESCRIPTION:${activeEvent.description.replace(/\n/g, ' ')}`,
      `LOCATION:${activeEvent.venue}\\, ${activeEvent.city}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${activeEvent.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGeneratePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeName.trim()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const pass = {
      name: attendeeName.trim(),
      serial: `FOM50-${randomSuffix}`,
      affiliation,
      eventTitle: activeEvent.title,
      eventVenue: activeEvent.venue,
      eventDate: activeEvent.date,
      tier: ticketTier,
    };
    setGeneratedPass(pass);
  };

  const handleCopyPass = () => {
    if (!generatedPass) return;
    const text = `🎖️ Fred Obachi Machoka 50 Years Commemorative Pass\nHolder: ${generatedPass.name}\nDesignation: ${generatedPass.affiliation}\nTier: ${generatedPass.tier}\nPass Serial: ${generatedPass.serial}\nEvent: ${generatedPass.eventTitle}\nDate & Venue: ${generatedPass.eventDate} | ${generatedPass.eventVenue}`;
    navigator.clipboard.writeText(text);
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 2500);
  };

  return (
    <section
      id="anniversary"
      className="py-24 bg-obsidian border-t border-obsidian-border px-4 sm:px-6 lg:px-8 relative"
    >
      {/* Subtle gold glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gold-500/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-obsidian-surface border border-gold-500/40 text-xs font-mono uppercase tracking-widest text-gold-500">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Golden Jubilee Celebration • 1976 – 2026</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-ivory tracking-tight">
            Machoka @ 50: Media Legends Night
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            One monumental night. Fifty years of broadcasting excellence. Join us as Kenya's media
            titans gather to honor Fred Obachi Machoka's half-century behind the microphone — live
            from the heart of Nairobi.
          </p>
        </div>

        {/* Jubilee Feature Event Card */}
        <div className="rounded-3xl bg-gradient-to-b from-[#121216] via-[#101014] to-[#0a0a0c] border border-[#D4AF37]/40 p-6 sm:p-12 shadow-2xl space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-[#232228] pb-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#A37C40] px-3 py-1 rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                  {activeEvent.eventType}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  Official 50th Jubilee Milestone
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#FDFBF7] leading-tight">
                {activeEvent.title}
              </h3>

              <div className="text-sm sm:text-base text-[#D4AF37] font-serif italic">
                {activeEvent.subtitle}
              </div>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {activeEvent.description}
              </p>

              {/* Event Coordinates */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-[#0a0a0c] border border-[#232228] text-xs text-zinc-300">
                  <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="font-semibold text-white">{activeEvent.date}</span>
                </div>
                <div className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-[#0a0a0c] border border-[#232228] text-xs text-zinc-300">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>
                    {activeEvent.venue}, {activeEvent.city}
                  </span>
                </div>
              </div>

              {/* Broadcast & Coverage Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-mono text-zinc-500 mr-1 flex items-center">
                  <Tv className="w-3.5 h-3.5 mr-1 text-[#D4AF37]" /> Live Broadcast:
                </span>
                {activeEvent.broadcastChannels.map((ch, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#0a0a0c] border border-[#232228] text-xs text-zinc-300 font-mono"
                  >
                    {ch}
                  </span>
                ))}
              </div>

              {/* Calendar Actions */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={activeEvent.googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 min-h-[44px] rounded-xl bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase flex items-center space-x-2 hover:brightness-110 shadow-md transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Add to Google Calendar</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>

                <button
                  onClick={handleDownloadICS}
                  className="px-4 py-2.5 min-h-[44px] rounded-xl bg-[#0a0a0c] border border-[#D4AF37]/50 text-[#D4AF37] font-semibold text-xs tracking-wider uppercase flex items-center space-x-2 hover:bg-[#D4AF37]/10 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .ics</span>
                </button>
              </div>
            </div>

            {/* Event Visual Showcase */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 aspect-[16/10] w-full shadow-xl bg-black group">
                <img
                  src={activeEvent.imageUrl || AUTHENTIC_IMAGES.golden50Years}
                  alt={activeEvent.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      '/images/machoka/machoka_portrait_tall.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-3 inset-x-3 text-center space-y-1">
                  <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-widest font-semibold block">
                    {activeEvent.title}
                  </span>
                  <span className="text-[10px] text-zinc-300 font-mono">
                    {activeEvent.venue} • {activeEvent.date}
                  </span>
                </div>
              </div>

              {/* Headliner Spotlight */}
              {activeEvent.headliner && (
                <div className="p-4 rounded-xl bg-[#0a0a0c] border border-[#D4AF37]/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#A37C40]">
                      International Headlining Icon
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] font-bold">
                      Live in Nairobi
                    </span>
                  </div>
                  <div className="flex items-start gap-3.5">
                    {activeEvent.headliner.image && (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-[#D4AF37]/50 flex-shrink-0 bg-black shadow-md">
                        <img
                          src={activeEvent.headliner.image}
                          alt={activeEvent.headliner.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="space-y-1 min-w-0">
                      <div className="text-base font-serif font-bold text-[#FDFBF7]">
                        {activeEvent.headliner.name}
                      </div>
                      <div className="text-xs text-[#D4AF37] font-medium">
                        {activeEvent.headliner.alias}
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {activeEvent.headliner.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Featured Media Legends Lineup */}
          {activeEvent.featuredArtists && activeEvent.featuredArtists.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-sm font-mono uppercase tracking-wider text-zinc-300 flex items-center space-x-2">
                  <Mic className="w-4 h-4 text-[#D4AF37]" />
                  <span>Media Legends Performing Lineup</span>
                </h4>
                <span className="text-xs font-mono text-[#A37C40]">
                  {activeEvent.featuredArtists.length} Continental Masters Confirmed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {activeEvent.featuredArtists.map((artist, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0a0a0c] border border-[#232228] hover:border-[#D4AF37]/40 transition-colors space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#1b1a22] text-[#D4AF37] border border-[#D4AF37]/20">
                        {artist.badge || artist.origin}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {artist.origin}
                      </span>
                    </div>
                    <div className="font-serif font-bold text-sm text-[#FDFBF7]">
                      {artist.name}
                    </div>
                    <div className="text-xs text-zinc-400">{artist.role}</div>
                    <div className="text-[11px] text-[#A37C40] italic pt-1 border-t border-[#232228]">
                      Known for: "{artist.hit}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ticketing & Access Tiers */}
          <div className="space-y-4 pt-2">
            <h4 className="text-sm font-mono uppercase tracking-wider text-zinc-300 flex items-center space-x-2">
              <Tag className="w-4 h-4 text-[#D4AF37]" />
              <span>Event Ticketing & Access Levels</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {activeEvent.ticketTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0a0a0c] border border-[#232228] space-y-2 hover:border-[#D4AF37]/50 transition-colors"
                >
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    {tier.tier}
                  </div>
                  <div className="text-xl font-serif font-bold text-[#D4AF37]">
                    {tier.price}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed pt-1 border-t border-[#232228]">
                    {tier.perks}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Program Schedule Highlights */}
          <div className="space-y-6 pt-2">
            <h4 className="text-sm font-mono uppercase tracking-wider text-zinc-300 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>Concert Schedule Highlights</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {GOLDEN_ANNIVERSARY_INFO.programHighlights.map((prog, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-[#0a0a0c]/80 border border-[#232228] space-y-2 hover:border-[#D4AF37]/40 transition-colors"
                >
                  <div className="text-xs font-mono font-bold text-[#D4AF37]">
                    {prog.time}
                  </div>
                  <h5 className="font-serif font-bold text-sm text-[#FDFBF7]">
                    {prog.title}
                  </h5>
                  <p className="text-xs text-zinc-400 leading-relaxed">{prog.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conveners & Sponsor Recognition */}
          <div className="pt-6 border-t border-[#232228] space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-[#A37C40]">
              Convening Partners & Media Institutions
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {GOLDEN_ANNIVERSARY_INFO.conveners.map((c, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0a0a0c] border border-[#232228] text-xs text-zinc-300 font-medium"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};