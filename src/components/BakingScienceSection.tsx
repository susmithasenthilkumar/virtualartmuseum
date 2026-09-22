import React, { useState } from 'react';
import { BAKING_PHASES } from '../data/cakeData';
import { Flame, Thermometer, Wind, Sparkles, Layers, Activity } from 'lucide-react';

export const BakingScienceSection: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(1);
  const phase = BAKING_PHASES[activePhaseIndex];

  const scientificReactions = [
    {
      title: 'Heat Activates Leaveners',
      desc: 'Double-acting baking powder triggers thermal CO2 gas release above 60°C, expanding millions of pre-existing micro air cavities.',
      icon: Flame,
      color: '#e63946',
    },
    {
      title: 'Air & Gas Expansion',
      desc: 'As temperature climbs, trapped gases follow Charles’s Law (V₁/T₁ = V₂/T₂), causing exponential volumetric ballooning.',
      icon: Wind,
      color: '#f4a261',
    },
    {
      title: 'Starch Gelatinization',
      desc: 'At 60°C–70°C, flour starch granules absorb ambient liquid, swelling until they burst into an elastic, supportive crumb hydrogel.',
      icon: Layers,
      color: '#e76f51',
    },
    {
      title: 'Proteins Set (Coagulation)',
      desc: 'At 80°C–85°C, egg ovalbumin and wheat gluten denature, forming permanent structural cross-links that freeze crumb height.',
      icon: Activity,
      color: '#2a9d8f',
    },
    {
      title: 'Moisture Evaporation',
      desc: 'Superheated water converts to steam, generating interior pressure (oven spring) before harmlessly venting through microscopic crumb pores.',
      icon: Wind,
      color: '#457b9d',
    },
    {
      title: 'Crust Caramelization & Maillard',
      desc: 'Above 140°C, reducing sugars and amino acids fuse on the exterior surface, generating hundreds of nutty, roasted aromatic molecules.',
      icon: Sparkles,
      color: '#d97736',
    },
  ];

  return (
    <section id="section-baking" className="py-24 relative bg-[#150f0c] text-[#f7efe6] overflow-hidden">
      {/* Warm oven ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#d97736]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#d97736] tracking-widest uppercase mb-2">
            <span>Chapter 03</span>
            <span>•</span>
            <span>Thermodynamic Metamorphosis</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#fbf6ec]">
            THE SCIENCE OF BAKING
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#d4b996] font-light leading-relaxed">
            Inside the sealed darkness of a 175°C (350°F) oven, a fluid batter undergoes an irreversible physics and chemistry metamorphosis. Six synchronized thermal thresholds transform a viscous fluid into an airy, cloud-soft sponge.
          </p>
        </div>

        {/* Oven Chamber Simulation & Temperature Stepper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left Column: Animated Oven Cross-Section / Cake Rising */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-[#d97736]/30 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#22150f] via-[#160d09] to-[#0d0705]">
              
              {/* Oven Top Glow Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-[#d97736]">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 animate-pulse text-[#d97736]" />
                  <span>CONVECTION OVEN SIMULATOR</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d97736]/20 border border-[#d97736]/40 text-[#f5dfb3]">
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>{phase.tempRange}</span>
                </div>
              </div>

              {/* Oven Stage Visualizer */}
              <div className="relative h-72 sm:h-80 w-full flex items-end justify-center py-6 overflow-hidden">
                {/* Heat Wave Convection Lines */}
                <div className="absolute top-2 inset-x-8 h-8 flex justify-between opacity-40">
                  <div className="w-1.5 h-full bg-gradient-to-b from-red-500 to-transparent animate-pulse" />
                  <div className="w-1.5 h-full bg-gradient-to-b from-amber-500 to-transparent animate-pulse delay-75" />
                  <div className="w-1.5 h-full bg-gradient-to-b from-orange-500 to-transparent animate-pulse delay-150" />
                  <div className="w-1.5 h-full bg-gradient-to-b from-red-500 to-transparent animate-pulse delay-300" />
                  <div className="w-1.5 h-full bg-gradient-to-b from-amber-500 to-transparent animate-pulse delay-200" />
                </div>

                {/* Cake Pan */}
                <div className="relative w-64 sm:w-80 h-28 border-4 border-[#3d2b22] bg-[#1a120d] rounded-b-2xl shadow-2xl flex items-end justify-center overflow-visible">
                  
                  {/* Rising Cake Sponge Body */}
                  <div
                    className="w-full transition-all duration-700 ease-out relative rounded-t-3xl flex flex-col items-center justify-center shadow-lg"
                    style={{
                      height: `${phase.expansionPercent * 1.5 + 40}px`,
                      backgroundColor: phase.crustColor,
                      borderTop: `4px solid ${phase.crustColor}`,
                    }}
                  >
                    {/* Crumb Interior Texture / Gas Cells */}
                    <div className="absolute inset-x-4 bottom-2 top-4 flex flex-wrap gap-2 items-center justify-center opacity-30 pointer-events-none">
                      {Array.from({ length: 18 }).map((_, i) => (
                        <div
                          key={i}
                          className="rounded-full bg-white/60 animate-pulse"
                          style={{
                            width: `${Math.max(4, (phase.expansionPercent / 100) * 12 + Math.sin(i) * 4)}px`,
                            height: `${Math.max(4, (phase.expansionPercent / 100) * 12 + Math.sin(i) * 4)}px`,
                            animationDelay: `${i * 100}ms`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Crust Dome Peak */}
                    <div className="absolute -top-3 w-3/4 h-6 rounded-t-full bg-inherit filter brightness-95 blur-[0.5px]" />

                    {/* Stage Label */}
                    <div className="relative z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-white border border-white/10">
                      Rise Height: {phase.expansionPercent}%
                    </div>
                  </div>

                  {/* Pan Base Plate */}
                  <div className="absolute -bottom-2 -inset-x-4 h-2 bg-[#2d1f18] rounded-full shadow-md" />
                </div>
              </div>

              {/* Live Microscope Callout */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3 text-xs text-[#f5dfb3]">
                <Activity className="w-4 h-4 text-[#d97736] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Cellular State: </span>
                  {phase.microscopeAction}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Timeline Phase Stepper */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono uppercase text-[#d97736] tracking-wider block">
              Select Baking Stage
            </span>

            {BAKING_PHASES.map((p, idx) => {
              const isSelected = idx === activePhaseIndex;
              return (
                <button
                  key={p.title}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer group ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#2a1a12] to-[#1e130d] border-[#d97736] shadow-xl shadow-[#d97736]/20 translate-x-1.5'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#d97736] mb-1">
                    <span>{p.timeRange}</span>
                    <span className="font-semibold">{p.tempRange}</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#fbf6ec] group-hover:text-[#f5dfb3]">
                    {p.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-[#f7efe6]/70 leading-relaxed font-light">
                    {p.description}
                  </p>
                </button>
              );
            })}
          </div>

        </div>

        {/* 6 Core Scientific Physical Reactions Grid */}
        <div className="mt-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase text-[#d97736] tracking-widest block mb-1">
              Micro-Biochemical Phenomena
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf6ec]">
              The 6 Critical Oven Reactions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scientificReactions.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl glass-panel p-6 border border-white/10 hover:border-[#d97736]/40 transition-all hover:-translate-y-1 shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: `${item.color}25`, border: `1px solid ${item.color}50` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#fbf6ec]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#f7efe6]/70 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-[#d97736]">
                    <span>Verified Food Science</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
