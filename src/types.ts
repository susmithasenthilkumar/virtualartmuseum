export interface ArtworkColor {
  name: string;
  hex: string;
}

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  artistDates: string;
  year: string;
  period: string;
  wingId: 'classical' | 'impressionism' | 'modern' | 'oriental' | 'sculpture';
  medium: string;
  dimensions: string;
  location: string;
  image: string;
  thumbnail: string;
  fallbackColor: string;
  description: string;
  historicalContext: string;
  compositionAnalysis: string;
  curatorNotes: string;
  colorPalette: ArtworkColor[];
  audioGuideScript: string;
  audioDuration: string;
  highlight?: boolean;
}

export interface MuseumWing {
  id: 'classical' | 'impressionism' | 'modern' | 'oriental' | 'sculpture';
  name: string;
  frenchTitle: string;
  floor: string;
  roomNumber: string;
  curator: string;
  era: string;
  description: string;
  bannerImage: string;
  accentColor: string;
}

export interface CuratedTour {
  id: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  artworkIds: string[];
  theme: string;
  coverImage: string;
  introduction: string;
}

export interface VisitorSalon {
  name: string;
  curatorName: string;
  savedArtworkIds: string[];
  lightingMode: 'amber' | 'daylight' | 'dramatic';
}

export interface MuseumVideoExhibit {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  videoUrl: string;
  posterImage: string;
  category: string;
  narrator: string;
  description: string;
  tags: string[];
}

export type GalleryViewMode = 'grid' | 'virtual-room' | 'minimal-hang';
