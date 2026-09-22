export type FinishId = 'obsidian' | 'titanium-silver' | 'aurora-blue' | 'cosmic-violet';

export interface PhoneFinish {
  id: FinishId;
  name: string;
  tagline: string;
  hex: string;
  frameHex: string;
  accentHex: string;
  glowHex: string;
  description: string;
  finishType: string;
}

export type HotspotId = 'frame' | 'camera' | 'action-button' | 'usb-c' | 'speakers';

export interface Hotspot {
  id: HotspotId;
  name: string;
  shortTitle: string;
  headline: string;
  description: string;
  spec: string;
  highlightCoordinates: { x: number; y: number; z: number };
  targetCameraAngle: { rotX: number; rotY: number; zoom: number };
}

export interface CameraLens {
  id: 'main' | 'ultra' | 'telephoto';
  name: string;
  megapixels: string;
  focalLength: string;
  aperture: string;
  sensorSize: string;
  headline: string;
  description: string;
  features: string[];
  photoSampleUrl: string;
}

export type CameraMode = 'photo' | 'portrait' | 'night' | 'video' | 'macro';
export type ZoomLevel = '0.5x' | '1x' | '2x' | '5x' | '10x' | '50x';

export interface AIFeatureItem {
  id: 'assist' | 'studio' | 'translate' | 'summary' | 'search';
  title: string;
  tagline: string;
  badge: string;
  description: string;
  capabilities: string[];
}

export interface BenchmarkItem {
  id: 'gaming' | 'video' | 'multitasking' | 'ai';
  title: string;
  metric: string;
  benchmarkValue: number; // 0-100
  novaScore: string;
  previousScore: string;
  comparisonPercentage: string;
  description: string;
  subMetrics: { label: string; value: string }[];
}

export interface SpecGroup {
  category: string;
  icon: string;
  specs: { label: string; value: string; detail?: string }[];
}

export interface ComparisonDevice {
  name: string;
  tagline: string;
  isFlagship?: boolean;
  display: string;
  refreshRate: string;
  chipset: string;
  cameraMain: string;
  cameraZoom: string;
  battery: string;
  charging: string;
  aiEngine: string;
  materials: string;
  satellite: boolean;
}

export interface TechnologyStoryStep {
  step: string;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  breakthrough: string;
  stats: string;
}

export interface ConnectivityItem {
  id: string;
  name: string;
  speed: string;
  standard: string;
  description: string;
  badge: string;
}
