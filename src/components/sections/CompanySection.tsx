import React from 'react';
import { Building2, Lightbulb, Wrench, Palette, Cpu, Sparkles } from 'lucide-react';

export const CompanySection: React.FC = () => {
  const pillars = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      tagline: 'Defying Industry Incrementalism',
      description: 'We believe genuine breakthroughs require questioning fundamental mobile assumptions—from thermal dissipation to sensor physics.',
    },
    {
      icon: Wrench,
      title: 'Engineering',
      tagline: 'Extreme Material Precision',
      description: 'Forging Grade 5 titanium with sub-millimeter tolerances, ensuring structural resilience without burdensome excess weight.',
    },
    {
      icon: Palette,
      title: 'Design',
      tagline: 'Monolithic Restraint',
      description: 'Eliminating decorative noise in pursuit of objects that feel timeless, balanced, and an extension of human creative will.',
    },
    {
      icon: Cpu,
      title: 'Artificial Intelligence',
      tagline: 'Edge-Resident Sovereignty',
      description: 'Advancing intelligence that lives strictly within your physical possession—refusing to compromise privacy for capability.',
    },
  ];

  return (
    <section id="company" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050508] border-t border-white/10 overflow-hidden">
      
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-tech font-bold uppercase tracking-[0.2em] text-blue-400">
            <Building2 className="w-3.5 h-3.5" />
            <span>SECTION 15 • CORPORATE PHILOSOPHY</span>
          </div>

          <h2 className="font-tech text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            NOVA Technologies.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            NOVA is a fictional technology company exploring the future of intelligent personal devices. We design at the intersection of aerospace materials and edge silicon cognition.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-all duration-300 space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-tech text-lg font-bold text-white">
                    {p.title}
                  </h3>
                  <span className="text-[11px] font-mono text-blue-400 block">
                    {p.tagline}
                  </span>
                </div>

                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
