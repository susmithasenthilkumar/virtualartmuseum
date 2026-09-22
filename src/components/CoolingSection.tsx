import React, { useState } from 'react';
import { ThermometerSnowflake, ShieldAlert, CheckCircle2, Wind, Clock, Flame, AlertCircle } from 'lucide-react';

export const CoolingSection: React.FC = () => {
  const [thermalStage, setThermalStage] = useState<0 | 1 | 2>(1);

  const coolingStages = [
    {
      stage: 'Fresh from Oven',
      temp: '180°C → 95°C',
      status: 'CRITICAL DANGER ZONE',
      badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40',
      description: 'The internal crumb is tender, fragile, and steaming. Moisture is actively evaporating, and protein lattices are still delicate.',
      butterState: 'Completely liquefied butter oil. Frosting applied now will instantly melt into grease and destroy the sponge.',
      icon: Flame,
    },
    {
      stage: 'Cooling on Wire Rack',
      temp: '95°C → 35°C',
      status: 'STABILIZATION IN PROGRESS',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      description: 'Elevated on a mesh wire rack to allow ambient 360° airflow. Internal moisture redistributes harmoniously through the crumb.',
      butterState: 'Semi-solid transition. Core heat is still sufficient to soften delicate whipped creams or Swiss meringue.',
      icon: Wind,
    },
    {
      stage: 'Ready for Frosting',
      temp: '21°C Ambient (70°F)',
      status: 'OPTIMAL THERMAL ZONE',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      description: 'Crumb structure has fully firmed into a resilient elastic solid. Internal temperature exactly matches ambient kitchen air.',
      butterState: 'Butterfat crystalline networks are stable. Ready for razor-sharp palette-knife frosting without risk of melting.',
      icon: CheckCircle2,
    },
  ];

  const current = coolingStages[thermalStage];

  return (
    <section id="section-cooling" className="py-24 relative bg-[#150f0c] text-[#f7efe6] overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#d97736] tracking-widest uppercase mb-2">
            <span>Chapter 05</span>
            <span>•</span>
            <span>Thermodynamic Equilibrium</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#fbf6ec]">
            THE ART OF COOLING
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#d4b996] font-light leading-relaxed">
            The baker’s greatest virtue is patience. Frosting a warm cake is the single most common mistake in pastry craft. Cooling is not passive waiting—it is the structural setting of the protein lattice.
          </p>
        </div>

        {/* Interactive 3-Stage Cooling Progression */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {coolingStages.map((cs, idx) => {
            const isSelected = idx === thermalStage;
            const Icon = cs.icon;
            return (
              <button
                key={cs.stage}
                onClick={() => setThermalStage(idx as 0 | 1 | 2)}
                className={`p-6 rounded-3xl border transition-all text-left cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#241a14] to-[#17100b] border-[#d97736] shadow-xl shadow-[#d97736]/20 ring-1 ring-[#d97736]/40'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-[#d97736]">0{idx + 1}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${cs.badgeColor}`}>
                      {cs.temp}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#fbf6ec] group-hover:text-[#f5dfb3]">
                    {cs.stage}
                  </h4>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[#f7efe6]/60">
                  <Icon className="w-4 h-4 text-[#d97736]" />
                  <span>Click to Inspect Thermal Dynamics</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Panel into Current Temperature State */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Thermal Meter Visualization */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-white/10">
              <div className="relative w-40 h-40 flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-white/10 animate-spin" style={{ animationDuration: '30s' }} />
                
                {/* Temperature Ring */}
                <div
                  className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-700 shadow-2xl ${
                    thermalStage === 0
                      ? 'bg-gradient-to-tr from-red-600 to-orange-500 text-white shadow-red-500/30'
                      : thermalStage === 1
                      ? 'bg-gradient-to-tr from-amber-600 to-yellow-500 text-white shadow-amber-500/30'
                      : 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-emerald-500/30'
                  }`}
                >
                  <ThermometerSnowflake className="w-8 h-8 mb-1" />
                  <span className="font-mono text-sm font-bold tracking-tight text-center px-2">
                    {current.temp}
                  </span>
                </div>
              </div>

              <span className={`mt-4 px-3 py-1 rounded-full text-xs font-mono border ${current.badgeColor}`}>
                {current.status}
              </span>
            </div>

            {/* Right: Scientific Explanations */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-mono uppercase text-[#d97736] tracking-wider block">
                  Thermal Phase Analysis
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf6ec] mt-1">
                  {current.stage}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#f7efe6]/80 leading-relaxed font-light">
                {current.description}
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-xs font-mono uppercase text-[#d97736] block">
                  Lipid & Butterfat Behavior:
                </span>
                <p className="text-xs sm:text-sm text-[#f5dfb3] leading-relaxed">
                  {current.butterState}
                </p>
              </div>

              {/* 3 Critical Scientific Reasons Why Cooling is Non-Negotiable */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-xs">
                  <span className="font-semibold text-white block mb-0.5">1. Fat Emulsion</span>
                  <span className="text-[#f7efe6]/60 text-[11px]">Butter crystals melt above 30°C. Cold sponge preserves piping sharpness.</span>
                </div>
                <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-xs">
                  <span className="font-semibold text-white block mb-0.5">2. Protein Firming</span>
                  <span className="text-[#f7efe6]/60 text-[11px]">Gluten & egg scaffolding solidifies into an elastic, sliceable sponge.</span>
                </div>
                <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-xs">
                  <span className="font-semibold text-white block mb-0.5">3. Moisture Balance</span>
                  <span className="text-[#f7efe6]/60 text-[11px]">Internal steam settles uniformly instead of condensing into soggy puddles.</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
