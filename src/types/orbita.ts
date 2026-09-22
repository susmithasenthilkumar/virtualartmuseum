export type HotspotId =
  | 'solar-arrays'
  | 'propulsion'
  | 'antenna'
  | 'ai-compute'
  | 'navigation'
  | 'sensors'
  | 'thermal';

export interface SpacecraftHotspot {
  id: HotspotId;
  name: string;
  tagline: string;
  shortDesc: string;
  detailedSpecs: {
    label: string;
    value: string;
  }[];
  position3D: [number, number, number];
  color: string;
  subsystemCode: string;
}

export type ObservationCategory =
  | 'CLIMATE'
  | 'WATER'
  | 'AGRICULTURE'
  | 'URBAN GROWTH'
  | 'DISASTER MONITORING';

export interface ObservationData {
  id: ObservationCategory;
  title: string;
  tagline: string;
  description: string;
  spectralBand: string;
  groundResolution: string;
  simulatedMetrics: {
    label: string;
    value: string;
    change: string;
    note: string;
  }[];
  activeSatellites: number;
  dataRate: string;
  lastSimulatedPass: string;
}

export interface TelemetryReading {
  timestamp: string;
  altitude: number; // km
  velocity: number; // km/s
  power: number; // %
  signal: number; // %
  temperature: number; // °C
  solarGeneration: number; // Watts
  batteryLevel: number; // %
  latency: number; // ms
}

export interface FutureMission {
  id: string;
  code: string;
  name: string;
  type: string;
  status: 'CONCEPT / SIMULATION';
  tagline: string;
  description: string;
  targetDestination: string;
  orbitProfile: string;
  payloadMass: string;
  keyTechnologies: string[];
}

export interface JourneyStage {
  step: string;
  code: string;
  title: string;
  phase: string;
  altitude: string;
  velocity: string;
  timeline: string;
  description: string;
  systemsActive: string[];
}

export interface TechCapability {
  id: string;
  title: string;
  category: string;
  summary: string;
  features: string[];
  simulatedReadiness: string;
}
