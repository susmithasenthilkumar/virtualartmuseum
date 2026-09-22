import React, { useState } from 'react';
import {
  Compass,
  Cpu,
  Flame,
  Thermometer,
  ShieldAlert,
  Radio,
  Radar,
  ArrowUpRight,
  Activity,
  Layers,
  Zap
} from 'lucide-react';

export const Technology: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const techCards = [
    {
      number: '01',
      title: 'AUTONOMOUS NAVIGATION',
      tagline: 'Multi-Sensor Inertial & Star Tracking',
      description:
        'Continuous orbital determination without ground reliance, fusing star trackers, GNSS tri-band receivers, and ring laser gyros.',
      metric: '< 0.5 arcsec',
      metricLabel: 'Attitude Pointing Accuracy',
      icon: <Compass className="w-5 h-5 text-[#00f0ff]" />,
      stats: '3-Axis RMS Closed-Loop',
    },
    {
      number: '02',
      title: 'AI COMPUTING',
      tagline: 'Radiation-Tolerant Neural Processing',
      description:
        'Embedded edge tensor cores process petabytes of raw hyperspectral sensor data directly in orbit, triaging key events in milliseconds.',
      metric: '64 TOPS',
      metricLabel: 'Orbital Edge Inference',
      icon: <Cpu className="w-5 h-5 text-[#38bdf8]" />,
      stats: '7nm FinFET Rad-Hard Bus',
    },
    {
      number: '03',
      title: 'ADVANCED PROPULSION',
      tagline: 'Hall-Effect Electric Ion Arrays',
      description:
        'High specific impulse Xenon plasma thrusters deliver precise delta-v for station-keeping, altitude raising, and autonomous de-orbiting.',
      metric: '2,450 s',
      metricLabel: 'Specific Impulse (Isp)',
      icon: <Flame className="w-5 h-5 text-[#00f0ff]" />,
      stats: '185 mN Continuous Thrust',
    },
    {
      number: '04',
      title: 'THERMAL MANAGEMENT',
      tagline: 'Active Heat Pipes & Multi-Layer Insulation',
      description:
        'Variable conductance heat pipe loops and high-emissivity carbon radiator surfaces maintain operational equilibrium from -150°C to +120°C.',
      metric: '270°C ΔT',
      metricLabel: 'Extreme Thermal Tolerance',
      icon: <Thermometer className="w-5 h-5 text-[#f43f5e]" />,
      stats: 'Stirling Micro-Cryocooler',
    },
    {
      number: '05',
      title: 'SECURE COMMUNICATION',
      tagline: 'Ka-Band RF & Optical Laser Downlinks',
      description:
        'Dual-redundant optical crosslinks deliver high-bandwidth data transfers to ground stations with quantum-resistant encryption protocols.',
      metric: '10.2 Gbps',
      metricLabel: 'Laser Downlink Throughput',
      icon: <Radio className="w-5 h-5 text-[#818cf8]" />,
      stats: '1550nm Laser Beam Lock',
    },
    {
      number: '06',
      title: 'PRECISION SENSING',
      tagline: 'Multispectral & Synthetic Aperture Radar',
      description:
        'Sub-meter ground sampling optics paired with all-weather X-band radar survey planetary topography through dense cloud cover and night.',
      metric: '0.35m GSD',
      metricLabel: 'Ground Sampling Resolution',
      icon: <Radar className="w-5 h-5 text-[#00f0ff]" />,
      stats: '224 Contiguous Spectral Bands',
    },
  ];

  return (
    <section id="technology" className="relative py-24 sm:py-32 bg-[#02040a] overflow-hidden">
      {/* Background Grid & Decorative Aerospace Lines */}
      <div className="absolute inset-0 bg-space-grid pointer-events-none opacity-30" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#00f0ff]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            <span className="text-xs font-mono text-[#00f0ff] tracking-[0.25em] uppercase">
              SECTION 04 // ENGINEERING SPECIFICATIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white uppercase mb-6">
            BUILT FOR <span className="text-gradient-cyan">THE EXTREME</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            Operating in the harsh vacuum of space demands uncompromising architectural precision. Every sub-assembly is engineered to withstand radiation bombardment, extreme thermal cycling, and continuous autonomous operation.
          </p>
        </div>

        {/* Six High-Tech Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCards.map((card, index) => {
            const isHovered = activeCard === index;
            return (
              <div
                key={card.number}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                className={`relative rounded-2xl border transition-all duration-300 p-7 flex flex-col justify-between backdrop-blur-xl ${
                  isHovered
                    ? 'border-[#00f0ff] bg-[#09152e] shadow-[0_0_35px_rgba(0,240,255,0.18)] -translate-y-1'
                    : 'border-white/10 bg-[#070e1e]/80 hover:border-white/20'
                } hud-corner-tl`}
              >
                <div>
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/10">
                    <span className="font-heading font-extrabold text-2xl text-[#00f0ff]/70">
                      {card.number}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {card.icon}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-white uppercase tracking-wide mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-xs font-mono text-[#38bdf8] mb-4">
                    {card.tagline}
                  </p>

                  {/* Explanation */}
                  <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Technical Telemetry Indicator Box */}
                <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider">
                      {card.metricLabel}
                    </span>
                    <span className="text-base font-heading font-bold text-[#00f0ff]">
                      {card.metric}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-emerald-400 block">
                      VERIFIED
                    </span>
                    <span className="text-[11px] font-mono text-slate-300">
                      {card.stats}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
