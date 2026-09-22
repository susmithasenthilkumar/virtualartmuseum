import React from 'react';
import { Shield, Sparkles, Globe, Compass, Award, CheckCircle, Info } from 'lucide-react';

export const Company: React.FC = () => {
  const companyStats = [
    {
      value: '10+',
      label: 'Technology Domains',
      detail: 'From rad-hard neural NPUs to autonomous Hall-effect ion arrays',
    },
    {
      value: '04',
      label: 'Mission Concepts',
      detail: 'LEO Earth observation, lunar relay, Mars SAR, and deep-space scouts',
    },
    {
      value: '∞',
      label: 'Future Possibilities',
      detail: 'Expanding planetary insight while safeguarding Earth’s orbital environment',
    },
  ];

  const coreValues = [
    {
      title: 'Planetary Stewardship',
      desc: 'Deploying continuous orbital remote sensing to observe biodiversity, climate change, and freshwater supplies.',
    },
    {
      title: 'Autonomous Precision',
      desc: 'Developing resilient edge computing architectures capable of operating independently across interplanetary distances.',
    },
    {
      title: 'Orbital Sustainability',
      desc: 'Committing to zero-debris policies, autonomous collision avoidance, and guaranteed end-of-life de-orbit propulsion.',
    },
    {
      title: 'Scientific Openness',
      desc: 'Collaborating on open standards for space networking, interplanetary optical protocols, and planetary data accessibility.',
    },
  ];

  return (
    <section id="company" className="relative py-24 sm:py-32 bg-[#02040a] overflow-hidden">
      {/* Background space lines */}
      <div className="absolute inset-0 bg-space-dots pointer-events-none opacity-20" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#00f0ff]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            <span className="text-xs font-mono text-[#00f0ff] tracking-[0.25em] uppercase">
              SECTION 11 // INSTITUTION & VISION
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white uppercase mb-6">
            ABOUT <span className="text-gradient-cyan">ORBITA</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-200 font-sans font-normal leading-relaxed border-l-2 border-[#00f0ff] pl-5">
            “ORBITA is a fictional space technology concept focused on exploring how intelligent computing, autonomous systems and advanced spacecraft technologies could shape the future of space exploration.”
          </p>
        </div>

        {/* 3 Core Statistics Cards (Clearly labeled as concept/demo) */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              CONCEPT ARCHITECTURE BENCHMARKS
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-300 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">
              <Info className="w-3 h-3" />
              <span>CONCEPT / DEMO STATISTICS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {companyStats.map((stat, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl border border-white/10 bg-[#070e20]/80 backdrop-blur-xl flex flex-col justify-between hud-corner-tl"
              >
                <div>
                  <div className="font-heading font-black text-5xl sm:text-6xl text-[#00f0ff] mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white uppercase tracking-wider mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-xs font-sans text-slate-400 leading-relaxed">
                    {stat.detail}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-white/10 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  ORBITA DESIGN SPEC
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Philosophy & Planetary Stewardship Values */}
        <div className="p-8 sm:p-12 rounded-2xl border border-white/10 bg-[#060c1c]/90 backdrop-blur-xl">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest block mb-2">
              FOUNDATIONAL PHILOSOPHY
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white uppercase">
              ENGINEERING WITH PLANETARY RESPONSIBILITY
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, i) => (
              <div key={i} className="p-5 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] font-mono text-[#00f0ff] block mb-2">
                  PILLAR 0{i + 1}
                </span>
                <h4 className="text-base font-heading font-bold text-white uppercase mb-2">
                  {val.title}
                </h4>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
