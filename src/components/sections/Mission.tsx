import React from 'react';
import { Globe, Cpu, Rocket, ArrowUpRight, Compass, Shield, Eye } from 'lucide-react';

export const Mission: React.FC = () => {
  const missionPillars = [
    {
      number: '01',
      title: 'EARTH INTELLIGENCE',
      tagline: 'Planetary Biosphere & Climate Monitoring',
      description:
        'Advanced orbital systems designed to monitor environmental and planetary changes.',
      details: [
        'Sub-meter hyperspectral environmental mapping',
        'Real-time freshwater reservoir and cryosphere observation',
        'Autonomous wildfire, flood, and cyclonic storm detection',
      ],
      icon: <Globe className="w-6 h-6 text-[#00f0ff]" />,
      badge: 'OBSERVATION MATRIX',
    },
    {
      number: '02',
      title: 'AUTONOMOUS SPACE SYSTEMS',
      tagline: 'Edge AI Decision Architecture in Orbit',
      description:
        'AI-powered systems capable of making intelligent decisions in challenging space environments.',
      details: [
        'Rad-hard neural processing units running onboard inference',
        'Sub-second collision avoidance and orbital hazard reaction',
        'Closed-loop autonomous station-keeping and attitude guidance',
      ],
      icon: <Cpu className="w-6 h-6 text-[#38bdf8]" />,
      badge: 'NEURAL FLIGHT OS',
    },
    {
      number: '03',
      title: 'NEXT-GENERATION EXPLORATION',
      tagline: 'Cislunar, Martian & Deep-Space Hardware',
      description:
        'Technologies designed for future lunar, Martian and deep-space missions.',
      details: [
        'Permanent cislunar navigation and broadband communication relays',
        'Long-duration Xenon Hall-effect propulsion architectures',
        'Autonomous deep-space optical pulsar positioning (XNAV)',
      ],
      icon: <Rocket className="w-6 h-6 text-[#818cf8]" />,
      badge: 'DEEP HORIZONS',
    },
  ];

  return (
    <section id="mission" className="relative py-24 sm:py-32 bg-[#02040a] overflow-hidden">
      {/* Subtle background glow & grid */}
      <div className="absolute inset-0 bg-space-dots pointer-events-none opacity-20" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#38bdf8]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            <span className="text-xs font-mono text-[#00f0ff] tracking-[0.25em] uppercase">
              SECTION 02 // PURPOSE & VISION
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white uppercase mb-6">
            OUR <span className="text-gradient-cyan">MISSION</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 font-sans font-normal leading-relaxed border-l-2 border-[#00f0ff] pl-5">
            “ORBITA develops intelligent space technologies designed to observe, understand and protect our planet while expanding humanity’s capabilities beyond Earth.”
          </p>
        </div>

        {/* Three Large Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {missionPillars.map((pillar) => (
            <div
              key={pillar.number}
              className="group relative rounded-2xl border border-white/10 bg-[#070d1d]/75 backdrop-blur-xl p-8 hover:border-[#00f0ff]/40 transition-all duration-300 flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(0,240,255,0.12)] hud-corner-tl"
            >
              <div>
                {/* Header: Number & Badge */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                  <span className="font-heading font-black text-3xl sm:text-4xl text-[#00f0ff]/60 group-hover:text-[#00f0ff] transition-colors">
                    {pillar.number}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                      {pillar.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {pillar.icon}
                    </div>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white uppercase tracking-wide mb-2 group-hover:text-[#00f0ff] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs font-mono text-[#38bdf8] mb-4">
                  {pillar.tagline}
                </p>

                {/* Primary Description */}
                <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
                  “{pillar.description}”
                </p>

                {/* Feature Bullet List */}
                <ul className="space-y-2.5 pt-4 border-t border-white/5 mb-6">
                  {pillar.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs font-mono text-slate-400">
                      <span className="text-[#00f0ff] mt-0.5">›</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer Indicator */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-white transition-colors">
                <span className="tracking-widest uppercase text-[10px]">
                  TRL 8-9 SYSTEM MATURITY
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#00f0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
