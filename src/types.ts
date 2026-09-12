export interface Milestone {
  year: string;
  period: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  imageCaption: string;
  videoId?: string;
  quote?: string;
}

export interface BiographyChapter {
  id: string;
  title: string;
  period: string;
  summary: string;
  content: string[];
  keyQuote?: string;
  imageUrl: string;
  imageCaption: string;
}

export interface HonorAward {
  id: string;
  year: string;
  title: string;
  conferredBy: string;
  category: 'State Honor' | 'Lifetime Achievement' | 'Broadcasting Pioneer' | 'Cultural Legacy';
  description: string;
  iconName: string;
  badge: string;
}

export interface RadioShow {
  id: string;
  name: string;
  station: string;
  era: string;
  tagline: string;
  description: string;
  memorableMoments: string[];
  imageUrl: string;
  badge: string;
  catchphrase: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  decade: '1970s' | '1980s' | '1990s' | '2000s' | '2010s' | '2020s';
  year: string;
  caption: string;
  imageUrl: string;
  aspect?: string;
  category: string;
}

export interface ImpactMetric {
  number: string;
  label: string;
  detail: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  organization: string;
  message: string;
  category: 'Broadcaster' | 'Journalist' | 'Artist' | 'Public Figure' | 'Fan';
  avatarInitials: string;
  year?: string;
}

export interface TributeNote {
  id: string;
  name: string;
  location: string;
  category: 'Memory' | 'Congratulations' | 'Gratitude';
  message: string;
  date: string;
  likes: number;
}

export interface ConcertArtist {
  name: string;
  role: string;
  origin: string;
  hit: string;
  badge?: string;
}

export interface AnniversaryEvent {
  id: string;
  title: string;
  subtitle: string;
  eventType: 'Mega Concert' | 'National Gala';
  date: string;
  isoDate: string;
  venue: string;
  city: string;
  imageUrl?: string;
  headliner?: {
    name: string;
    alias: string;
    description: string;
    image?: string;
  };
  featuredArtists?: ConcertArtist[];
  conveners: string[];
  broadcastChannels: string[];
  ticketTiers: {
    tier: string;
    price: string;
    perks: string;
  }[];
  description: string;
  googleCalendarUrl: string;
}
