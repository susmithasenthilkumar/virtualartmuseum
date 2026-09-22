export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  category: 'Structure' | 'Fat & Tenderizer' | 'Sweetener & Moisture' | 'Hydration' | 'Leavener' | 'Aroma';
  bakersPercentage: string;
  purpose: string;
  science: string;
  molecularFact: string;
  image: string;
  color: string;
}

export interface MixingStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  scienceNote: string;
  visualState: 'separated' | 'creamed' | 'emulsified' | 'folded' | 'hydrated' | 'smooth_batter';
  color: string;
  consistency: string;
}

export interface BakingPhase {
  tempRange: string;
  timeRange: string;
  title: string;
  description: string;
  microscopeAction: string;
  expansionPercent: number;
  crustColor: string;
}

export interface FrostingType {
  id: string;
  name: string;
  texture: string;
  appearance: string;
  characteristics: string[];
  commonUses: string;
  scientificStability: string;
  meltPoint: string;
  image: string;
  color: string;
}

export interface DecorationItem {
  id: string;
  category: 'fruits' | 'chocolate' | 'flowers' | 'cookies' | 'sprinkles' | 'piping';
  name: string;
  emoji: string;
  description: string;
  color: string;
  visualType: string;
}

export interface CakeStyle {
  id: string;
  name: string;
  tagline: string;
  description: string;
  interestingFact: string;
  origin: string;
  difficulty: 'Classic' | 'Intermediate' | 'Artisanal';
  image: string;
}

export interface FactCard {
  id: string;
  question: string;
  summary: string;
  fullAnswer: string;
  scienceHighlight: string;
  iconName: string;
}

export interface TimelineMilestone {
  step: string;
  title: string;
  duration: string;
  summary: string;
  criticalRule: string;
  icon: string;
}
