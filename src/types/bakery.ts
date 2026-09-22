export interface SpecialtyItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  signatureOfferings: string[];
  bakingStyle: string;
  tasteNotes: string;
  image: string;
}

export interface SignatureCake {
  id: string;
  name: string;
  shortDescription: string;
  flavorProfile: string;
  decorativeStyle: string;
  spongeType: string;
  frostingType: string;
  image: string;
}

export interface BakingProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  artisanDetail: string;
  timeframe: string;
}

export interface QualityIngredient {
  id: string;
  name: string;
  origin: string;
  role: string;
  description: string;
  sensoryProfile: string;
  image: string;
  emoji: string;
}

export interface OccasionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  customizationOptions: string[];
  image: string;
  emoji: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'Cakes' | 'Pastries' | 'Breads' | 'Process' | 'Atmosphere';
  description: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  occasion: string;
  quote: string;
  story: string;
  cakeChosen: string;
}

export interface BrandPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}
