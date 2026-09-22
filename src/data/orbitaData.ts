import {
  SpacecraftHotspot,
  ObservationData,
  FutureMission,
  JourneyStage,
  TechCapability,
} from '../types/orbita';

export const SPACECRAFT_HOTSPOTS: SpacecraftHotspot[] = [
  {
    id: 'solar-arrays',
    name: 'SOLAR ARRAYS',
    tagline: 'Triple-Junction Gallium Arsenide Photovoltaic Wings',
    shortDesc:
      'High-efficiency solar panels provide continuous electrical power to onboard systems while operating in orbit.',
    detailedSpecs: [
      { label: 'Cell Architecture', value: 'InGaP/GaAs/Ge Triple Junction' },
      { label: 'Conversion Efficiency', value: '32.4% (BOL @ AM0)' },
      { label: 'Peak Generation', value: '4,850 W (Dual Wing Deployment)' },
      { label: 'Articulated Tracking', value: '2-Axis Solar Vector Slew' },
      { label: 'Stowed Dimensions', value: '0.45m × 1.20m × 0.28m' },
    ],
    position3D: [-2.6, 0.2, 0],
    color: '#38bdf8',
    subsystemCode: 'PWR-ARRAY-01',
  },
  {
    id: 'propulsion',
    name: 'PROPULSION',
    tagline: 'Hall-Effect Electric Xenon Ion Thruster Array',
    shortDesc:
      'Precision propulsion systems support orbital adjustments and long-duration mission operations.',
    detailedSpecs: [
      { label: 'Thruster Type', value: 'Dual Magnetically Shielded Hall Thruster' },
      { label: 'Specific Impulse (Isp)', value: '2,450 seconds' },
      { label: 'Propellant Mass', value: '48 kg Xenon High-Pressure Gas' },
      { label: 'Thrust Output', value: '185 mN per thruster' },
      { label: 'Primary Function', value: 'Orbit Raising, Station-Keeping, De-orbit' },
    ],
    position3D: [0, -1.9, 0],
    color: '#00f0ff',
    subsystemCode: 'PRP-ION-42',
  },
  {
    id: 'antenna',
    name: 'COMMUNICATION ANTENNA',
    tagline: 'Ka-Band Phased Array & Optical Laser Downlink Terminal',
    shortDesc:
      'High-bandwidth phased array and optical comms establish ultra-secure high-throughput data relays with ground stations.',
    detailedSpecs: [
      { label: 'Laser Terminal', value: '1,550 nm Wavelength Optical Transceiver' },
      { label: 'Max Optical Rate', value: '10.2 Gbps Ground Terminal Link' },
      { label: 'RF Fallback', value: 'Steerable Ka-Band Direct Radiating Array' },
      { label: 'Pointing Precision', value: '±0.002° Closed-Loop Tracking' },
      { label: 'Encryption', value: 'Quantum-Resistant Lattice Cryptography' },
    ],
    position3D: [0, 1.8, 0.5],
    color: '#818cf8',
    subsystemCode: 'COM-OPT-09',
  },
  {
    id: 'ai-compute',
    name: 'AI COMPUTE MODULE',
    tagline: 'Radiation-Hardened Neural Processing Architecture',
    shortDesc:
      'Onboard intelligence enables autonomous analysis and adaptive spacecraft operations.',
    detailedSpecs: [
      { label: 'Processor Node', value: 'Radiation-Tolerant 7nm FinFET ASIC' },
      { label: 'Neural Throughput', value: '64 TOPS Edge Tensor Engine' },
      { label: 'Memory Bank', value: '128 GB ECC Rad-Hard STT-MRAM' },
      { label: 'Autonomous Response', value: '< 14ms Orbital Hazard Collision Avoidance' },
      { label: 'Model Capabilities', value: 'Hyperspectral compression, Edge triage' },
    ],
    position3D: [0.6, 0.4, 0.8],
    color: '#22d3ee',
    subsystemCode: 'CPT-NPU-X8',
  },
  {
    id: 'navigation',
    name: 'NAVIGATION SYSTEM',
    tagline: 'Autonomous Star Tracker & Multi-Sensor Inertial Guidance',
    shortDesc:
      'Multi-sensor navigation technologies support accurate orbital positioning.',
    detailedSpecs: [
      { label: 'Star Tracker Units', value: 'Triple Coaxial Autonomous Star Cameras' },
      { label: 'Attitude Accuracy', value: '< 0.5 arcsec (3-axis RMS)' },
      { label: 'IMU Architecture', value: 'Ring Laser Gyroscope + MEMS Accelerometers' },
      { label: 'Position Determination', value: 'GNSS Tri-Band + Optical Horizon Sensor' },
      { label: 'Slew Capability', value: 'Up to 3.5 deg/s fast-retargeting' },
    ],
    position3D: [-0.6, 0.8, -0.6],
    color: '#38bdf8',
    subsystemCode: 'NAV-STR-33',
  },
  {
    id: 'sensors',
    name: 'SENSOR ARRAY',
    tagline: 'Multispectral, Hyperspectral & Synthetic Aperture Imaging',
    shortDesc:
      'Advanced optical and radar instruments capture continuous atmospheric, terrestrial, and oceanic telemetry.',
    detailedSpecs: [
      { label: 'Spectral Range', value: '400 nm to 14,000 nm (VNIR, SWIR, TIR)' },
      { label: 'Spatial Resolution', value: '0.35m Ground Sampling Distance (GSD)' },
      { label: 'Swath Width', value: '32 km standard orbital swath' },
      { label: 'SAR Frequency', value: 'X-Band Synthetic Aperture Radar (All-Weather)' },
      { label: 'Calibration', value: 'Onboard Solar Diffuser & Deep-Space Dark Frames' },
    ],
    position3D: [0, -0.7, 1.2],
    color: '#00f0ff',
    subsystemCode: 'SEN-OPT-77',
  },
  {
    id: 'thermal',
    name: 'THERMAL CONTROL',
    tagline: 'Active Loop Heat Pipes & Multi-Layer Insulation Blanketing',
    shortDesc:
      'Regulates spacecraft temperature across harsh solar glare (+120°C) and deep orbital shadow (-150°C).',
    detailedSpecs: [
      { label: 'Thermal Range', value: '-150°C to +120°C operational baseline' },
      { label: 'Active Loops', value: 'Ammonia Heat Pipes with variable conductance' },
      { label: 'Passive Shielding', value: '25-Layer Gold/Mylar MLI Blanket' },
      { label: 'Radiator Surface', value: 'High-Emissivity Carbon Composite Panels' },
      { label: 'Cryocooler', value: 'Stirling Micro-Cooler for IR focal plane (-210°C)' },
    ],
    position3D: [1.2, -0.3, -0.8],
    color: '#f43f5e',
    subsystemCode: 'THM-RAD-12',
  },
];

export const OBSERVATION_CATEGORIES: ObservationData[] = [
  {
    id: 'CLIMATE',
    title: 'Atmospheric & Climate Dynamics',
    tagline: 'Simulated Greenhouse Gas & Cryosphere Observation',
    description:
      'Continuous thermal infrared and greenhouse gas profiling tracking atmospheric carbon column density, stratospheric ozone layers, and polar ice extent.',
    spectralBand: 'SWIR / Thermal IR (1.6µm - 12.0µm)',
    groundResolution: '1.2 km Global Grid (Simulated)',
    simulatedMetrics: [
      { label: 'CO₂ Column Mixing', value: '421.4 ppm', change: '+1.8% YoY', note: 'Simulated baseline anomaly' },
      { label: 'Polar Ice Anomaly', value: '-3.2%', change: 'Seasonal retreat', note: 'Arctic cryosphere estimate' },
      { label: 'Sea Surface Temp', value: '21.14 °C', change: '+0.12°C delta', note: 'Equatorial Pacific demo' },
      { label: 'Atmospheric Aerosols', value: '0.14 AOD', change: 'Moderate clean air', note: 'Global mean index' },
    ],
    activeSatellites: 4,
    dataRate: '2.4 Gbps downlink',
    lastSimulatedPass: '14 mins ago (Equatorial Node)',
  },
  {
    id: 'WATER',
    title: 'Hydrological & Oceanic Ecosystems',
    tagline: 'Satellite-Based Freshwater Reservoirs & Marine Health',
    description:
      'Satellite-based observation can help identify changes in water bodies, monitor environmental conditions and support resource planning.',
    spectralBand: 'VNIR & Synthetic Aperture Radar (SAR)',
    groundResolution: '0.5m High Precision Water Line',
    simulatedMetrics: [
      { label: 'Reservoir Storage', value: '78.4%', change: '+4.2% seasonal inflow', note: 'Basin aggregate index' },
      { label: 'Algal Bloom Alert', value: 'Low Risk', change: 'Chlorophyll-a normal', note: 'Coastal telemetry' },
      { label: 'Ocean Salinity Index', value: '34.8 PSU', change: 'Stable boundary', note: 'Atlantic sample' },
      { label: 'Soil Moisture Flux', value: '28.1 m³/m³', change: '+2.1% root zone', note: 'Agricultural aquifer' },
    ],
    activeSatellites: 3,
    dataRate: '1.8 Gbps downlink',
    lastSimulatedPass: '22 mins ago (Continental Zone)',
  },
  {
    id: 'AGRICULTURE',
    title: 'Planetary Vegetation & Crop Yield',
    tagline: 'NDVI Vegetation Health & Soil Moisture Monitoring',
    description:
      'High-resolution multi-spectral tracking calculates Normalized Difference Vegetation Index (NDVI) to detect crop stress, soil hydration levels, and harvest timelines.',
    spectralBand: 'Red / Near-Infrared (Red-Edge 705nm)',
    groundResolution: '0.35m Micro-Plot GSD',
    simulatedMetrics: [
      { label: 'Global NDVI Mean', value: '0.68', change: 'Optimal vigor', note: 'Canopy density metric' },
      { label: 'Drought Stress Flag', value: '4 Zones', change: 'Early warning trigger', note: 'Semi-arid regions' },
      { label: 'Crop Maturation Index', value: '84/100', change: '+6 pts vs median', note: 'Simulated harvest forecast' },
      { label: 'Biomass Accumulation', value: '4.2 t/ha', change: 'Nominal growth rate', note: 'Grain belt estimation' },
    ],
    activeSatellites: 5,
    dataRate: '3.1 Gbps downlink',
    lastSimulatedPass: '8 mins ago (North American Plains)',
  },
  {
    id: 'URBAN GROWTH',
    title: 'Infrastructure & Urban Morphology',
    tagline: 'High-Density Settlement & Nighttime Radiance Tracking',
    description:
      'Synthetic Aperture Radar combined with sub-meter panchromatic optics surveys surface elevation changes, building density, transport corridors, and thermal heat islands.',
    spectralBand: 'X-Band SAR & High-Res Panchromatic',
    groundResolution: '0.25m Structural Resolution',
    simulatedMetrics: [
      { label: 'Impervious Surface', value: '+1.6%', change: 'Metropolitan fringe', note: 'Urban expansion rate' },
      { label: 'Nighttime Radiance', value: '48.2 nW/cm²', change: '+2.4% industrial shift', note: 'Energy activity proxy' },
      { label: 'Sub-cm Subsidence', value: '-2.1 mm', change: 'Within civil tolerance', note: 'Interferometric SAR' },
      { label: 'Thermal Island Delta', value: '+3.4 °C', change: 'Concrete peak heat', note: 'Urban center vs rural' },
    ],
    activeSatellites: 3,
    dataRate: '2.0 Gbps downlink',
    lastSimulatedPass: '31 mins ago (East Asia Corridor)',
  },
  {
    id: 'DISASTER MONITORING',
    title: 'Rapid Emergency & Disaster Response',
    tagline: 'All-Weather Hazard Detection & Rapid Damage Assessment',
    description:
      'Instant orbital retargeting and AI edge inference map flood inundation, wildfire perimeters, hurricane wind radii, and tectonic seismic displacement in near real-time.',
    spectralBand: 'All-Weather X-Band Radar + Shortwave IR',
    groundResolution: '0.50m Rapid Event Triage',
    simulatedMetrics: [
      { label: 'Active Fire Detections', value: '12 Spots', change: 'Mapped in < 15 min', note: 'Autonomous edge alert' },
      { label: 'Flood Inundation Extent', value: '42.8 km²', change: 'Water retreat phase', note: 'Radar flood boundary' },
      { label: 'Cyclonic Eye Wind Peak', value: '165 km/h', change: 'Category 2 intensity', note: 'Ocean wind scatterometer' },
      { label: 'Tectonic Slip Field', value: '1.8 cm', change: 'Post-quake baseline', note: 'SAR fringe coherence' },
    ],
    activeSatellites: 6,
    dataRate: '4.8 Gbps priority burst',
    lastSimulatedPass: '3 mins ago (Western Pacific Rim)',
  },
];

export const FUTURE_MISSIONS: FutureMission[] = [
  {
    id: 'orbit-01',
    code: 'ORBIT-01',
    name: 'EARTH INTELLIGENCE',
    type: 'Low Earth Orbit (LEO) Constellation',
    status: 'CONCEPT / SIMULATION',
    tagline: 'Next-generation Earth observation platform with real-time AI analytics.',
    description:
      'A synchronized 16-satellite orbital grid deploying edge-computed hyperspectral imaging and continuous laser crosslinks for sub-hourly planetary environmental updates.',
    targetDestination: 'Sun-Synchronous LEO (520 km Altitude)',
    orbitProfile: '97.4° Inclination, 95-minute period',
    payloadMass: '320 kg per spacecraft',
    keyTechnologies: [
      'Edge Hyperspectral NPU',
      'Optical Intersatellite Links (OISL)',
      'Autonomous De-orbit Sails',
      'Ion Station-Keeping',
    ],
  },
  {
    id: 'luna-next',
    code: 'LUNA-NEXT',
    name: 'LUNAR EXPLORATION',
    type: 'Cislunar Communication & Surface Reconnaissance',
    status: 'CONCEPT / SIMULATION',
    tagline: 'Technology concepts for future lunar operations and South Pole ice mapping.',
    description:
      'Orbital relay node in Near-Rectilinear Halo Orbit (NRHO) designed to provide permanent broadband relay, surface positioning, and volatile detection for lunar surface assets.',
    targetDestination: 'Moon Near-Rectilinear Halo Orbit (NRHO)',
    orbitProfile: 'L2 Halo Resonance, 6.5-day synodic cycle',
    payloadMass: '840 kg dry mass',
    keyTechnologies: [
      'Cryogenic Volatile Radar',
      'Cislunar PNT Beacon',
      'Radiation-Resistant Core Bus',
      'Autonomous Terrain Triage',
    ],
  },
  {
    id: 'mars-vision',
    code: 'MARS-VISION',
    name: 'MARS ANALYTICS',
    type: 'Aresian Atmospheric & Surface Synthetic Aperture Radar',
    status: 'CONCEPT / SIMULATION',
    tagline: 'Autonomous observation and environmental intelligence for Mars exploration.',
    description:
      'Long-duration orbital probe concept with subsurface penetrating radar and autonomous dust storm forecast models to assist scientific landing site evaluations.',
    targetDestination: 'Mars Areocentric Polar Orbit (350 km)',
    orbitProfile: 'Sun-Synchronous Martian Orbit, 112-minute cycle',
    payloadMass: '1,250 kg launch wet mass',
    keyTechnologies: [
      'Subsurface Ground-Penetrating Radar',
      'Atmospheric Dust LIDAR',
      'Autonomous Deep-Space Maneuvers',
      'High-Specific-Impulse Hall Engines',
    ],
  },
  {
    id: 'deepspace-x',
    code: 'DEEPSPACE-X',
    name: 'DEEP SPACE',
    type: 'Outer Solar System Autonomous Heliocentric Scout',
    status: 'CONCEPT / SIMULATION',
    tagline: 'Advanced technologies for long-duration deep-space exploration.',
    description:
      'Long-endurance scientific scout concept utilizing multi-radioisotope thermoelectric auxiliary power, autonomous optical pulsar navigation, and deep-space optical communication relays.',
    targetDestination: 'Jupiter Trojan Asteroid Flyby / Heliocentric 4.8 AU',
    orbitProfile: 'Gravity-Assist Multi-Body Trajectory',
    payloadMass: '680 kg deep-space bus',
    keyTechnologies: [
      'X-Ray Pulsar Navigation (XNAV)',
      'Deep-Space Optical Laser Relay',
      'Autonomous Fault Regeneration',
      'Radiation-Hardened Photonic Logic',
    ],
  },
];

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    step: '01',
    code: 'T-00:00:00',
    title: 'LAUNCH',
    phase: 'Ground Pad Lift-off & Main Stage Ignition',
    altitude: '0.0 km',
    velocity: '0.00 km/s',
    timeline: 'Launch Pad 39-Orbital',
    description:
      'Primary booster ignition delivers 7.6 MN thrust, lifting the composite payload fairing through dense lower tropospheric layers with acoustic suppression dampers active.',
    systemsActive: ['Telemetry Uplink', 'Internal Inertial Guidance', 'Fairing Thermal Purge'],
  },
  {
    step: '02',
    code: 'T+00:02:45',
    title: 'ASCENT',
    phase: 'Max-Q, Booster Separation & Fairing Jettison',
    altitude: '115.4 km',
    velocity: '2.84 km/s',
    timeline: 'Atmospheric Boundary Clearance',
    description:
      'Passing Max-Q aerodynamic pressure point, the booster stage cleanly separates via cold-gas thrusters. Protective composite fairing jettisons to expose the ORBITA spacecraft bus.',
    systemsActive: ['Second Stage Vacuum Engine', 'Optical Horizon Tracker', 'Telemetry Downlink'],
  },
  {
    step: '03',
    code: 'T+00:09:12',
    title: 'ORBIT INSERTION',
    phase: 'Payload Cutoff & Orbital Insertion Burn',
    altitude: '520.0 km',
    velocity: '7.61 km/s',
    timeline: 'Initial Parking Orbit Achieved',
    description:
      'Terminal burn achieves nominal orbital speed of 7.61 km/s at 520 km altitude with zero eccentricity deviation. Spacecraft separates cleanly into targeted sun-synchronous inclination.',
    systemsActive: ['Spring Ejection Mechanism', '3-Axis Reaction Wheels', 'Attitude Gyroscopes'],
  },
  {
    step: '04',
    code: 'T+00:18:30',
    title: 'SYSTEM ACTIVATION',
    phase: 'Solar Array Wing Deployment & Sun Acquisition',
    altitude: '525.2 km',
    velocity: '7.60 km/s',
    timeline: 'Solar Lock & Power Positive',
    description:
      'Dual multi-joint gallium arsenide solar wings unfold automatically. Spacecraft completes autonomous solar acquisition roll, generating positive bus power at 4,850 watts.',
    systemsActive: ['Array Drive Actuators', 'Bus Power Distribution Unit', 'B-Field Magnetorquers'],
  },
  {
    step: '05',
    code: 'T+00:45:00',
    title: 'MISSION OPERATIONS',
    phase: 'Sensor Calibration & Edge Neural Engine Warmup',
    altitude: '542.0 km',
    velocity: '7.61 km/s',
    timeline: 'Routine Mission Operations Commenced',
    description:
      'Onboard cryocooler stabilizes infrared sensors to -210°C. Edge neural processing cluster completes self-diagnostic tests and begins autonomous environmental monitoring.',
    systemsActive: ['Hall Effect Thrusters', 'Cryogenic Thermal Loops', 'AI Compute Cluster'],
  },
  {
    step: '06',
    code: 'T+01:32:00',
    title: 'DATA RETURN',
    phase: 'Ground Station Pass & Optical Laser Relay',
    altitude: '542.0 km',
    velocity: '7.61 km/s',
    timeline: 'First 10 Gbps Laser Downlink Transmitted',
    description:
      'Optical laser beam terminal locks onto designated polar ground receiver dish, transmitting 120 GB of compressed hyperspectral planetary observations with zero packet degradation.',
    systemsActive: ['1550nm Laser Downlink', 'Phased Array Ka-Band', 'Secure Lattice Decryption'],
  },
];

export const TECH_CAPABILITIES: TechCapability[] = [
  {
    id: 'ai-ml',
    title: 'AI & MACHINE LEARNING',
    category: 'Autonomous Orbital Intelligence',
    summary:
      'Embedded neural inference enables real-time event classification and adaptive collision hazard avoidance directly in low Earth orbit.',
    features: [
      '64 TOPS Radiation-Tolerant Neural Engine',
      'Real-time cloud masking & hyperspectral compression',
      'Autonomous orbital debris evasive maneuver planner',
      'Fault self-diagnosis and autonomous system restart',
    ],
    simulatedReadiness: 'TRL 8 — Flight Proven Bus Architecture',
  },
  {
    id: 'spacecraft-sys',
    title: 'SPACECRAFT SYSTEMS',
    category: 'Aerospace Core Engineering',
    summary:
      'Modular avionics bus built with carbon-fiber reinforced polyether ether ketone (PEEK) unibody and dual-redundant power distribution.',
    features: [
      'Modular 12U/24U/ESPA-class scalable structural bus',
      '4,850W Gallium Arsenide articulated solar wings',
      'High-pressure composite overwrapped xenon tanks',
      'Space-grade MIL-STD-1553 and SpaceWire data bus',
    ],
    simulatedReadiness: 'TRL 9 — Operational Standard',
  },
  {
    id: 'earth-obs',
    title: 'EARTH OBSERVATION',
    category: 'Planetary Remote Sensing',
    summary:
      'Multi-band optical and X-band radar payload providing high spatial resolution and wide-swath coverage for environmental monitoring.',
    features: [
      '0.35m Ground Sampling Distance (GSD) Panchromatic',
      '224 contiguous spectral bands (400 - 2,500 nm)',
      'All-weather day/night Synthetic Aperture Radar (SAR)',
      'Precision onboard calibration with solar diffuser',
    ],
    simulatedReadiness: 'TRL 8 — Orbital Validation',
  },
  {
    id: 'auto-nav',
    title: 'AUTONOMOUS NAVIGATION',
    category: 'Orbital Kinematics & GNC',
    summary:
      'Autonomous Guidance, Navigation & Control (GNC) calculates high-precision orbital elements without continuous ground station contact.',
    features: [
      'Tri-sensor star tracker with 0.5 arcsec precision',
      'Autonomous orbit determination via multi-constellation GNSS',
      'Magnetic torquers and reaction wheels for high-agility slews',
      'Optical horizon detection and limb-crossing sensors',
    ],
    simulatedReadiness: 'TRL 9 — Flight Standard',
  },
  {
    id: 'comms',
    title: 'COMMUNICATION SYSTEMS',
    category: 'High-Bandwidth Orbital Relays',
    summary:
      'Dual-mode hybrid RF/optical telecommunication system delivering secure multi-gigabit downlinks to ground networks.',
    features: [
      '10.2 Gbps free-space optical laser communication terminal',
      'Steerable Ka-band phased array with electronic beam steering',
      'Quantum-resistant lattice-based data encryption',
      'Inter-satellite mesh crosslinks for global instant reach',
    ],
    simulatedReadiness: 'TRL 7 — Space Demonstration',
  },
  {
    id: 'robotics',
    title: 'ROBOTICS & MECHANISMS',
    category: 'In-Space Servicing & Deployment',
    summary:
      'Micro-actuated deployment booms, precision gimbal drives, and robotic berthing interfaces engineered for zero-gravity vacuum environments.',
    features: [
      'High-reliability non-explosive release actuators (NEA)',
      'Sub-milliradian 2-axis solar array drive mechanisms',
      'Modular docking target and magnetic grapple points',
      'Vacuum-rated dry lubricant bearings tested to 10-year life',
    ],
    simulatedReadiness: 'TRL 6 — System Prototype',
  },
  {
    id: 'digital-twins',
    title: 'DIGITAL TWINS',
    category: 'Mission Simulation & Modeling',
    summary:
      'Physics-accurate digital twins running in mission control predict thermal cycles, power generation, and structural fatigue in real time.',
    features: [
      'Real-time telemetry synchronization with 3D kinematic model',
      'Full orbital thermal flux and albedo modeling',
      'Predictive propellant consumption and battery degradation',
      'Automated stress-testing of proposed command sequences',
    ],
    simulatedReadiness: 'TRL 8 — Production Mission Control',
  },
  {
    id: 'data-analytics',
    title: 'DATA ANALYTICS',
    category: 'Downstream Planetary Intelligence',
    summary:
      'Petabyte-scale distributed processing pipeline turning raw downlink data streams into actionable planetary insights within minutes.',
    features: [
      'Automated orthorectification and radiometric calibration',
      'Multi-temporal change detection and vector polygon indexing',
      'API pipelines for climate institutes and emergency responders',
      'Public open-science catalog for verified research groups',
    ],
    simulatedReadiness: 'TRL 9 — Cloud Infrastructure',
  },
];
