import React, { useState } from 'react';
import { ArrowDown, CheckCircle, Sparkles, Layers, Sliders, Eye } from 'lucide-react';

export const TransformationSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const stages = [
    {
      id: 'batter',
      title: '01. RAW BATTER',
      subtitle: 'Viscous Emulsion Foam',
      temp: '20°C (68°F)',
      physicalState: 'Liquid suspension with suspended micro-droplets',
      image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80',
      description: 'A delicate emulsion where fats, liquid, and dissolved sugars suspend millions of air bubbles trapped during mechanical creaming.',
      highlights: ['Hydrated wheat starches', 'Intact egg liquid proteins', 'Dissolved sucrose molecules', 'Suspended fat globules'],
    },
    {
      id: 'oven',
      title: '02. THE OVEN CHAMBER',
      subtitle: 'Thermal Influx & Convection',
      temp: '175°C (350°F)',
      physicalState: 'Radiant heat transfers through pan perimeter',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
      description: 'Thermal energy penetrates from tin edges toward the center. Fats liquefy, double-acting baking powder triggers thermal release, and steam forms.',
      highlights: ['Thermal conduction from metal tin', 'Expansion of internal air pockets', 'Secondary chemical leavener activation', 'Moisture vaporization'],
    },
    {
      id: 'rising',
      title: '03. THE OVEN SPRING (RISING)',
      subtitle: 'Peak Volumetric Expansion',
      temp: '85°C Internal (185°F)',
      physicalState: 'Expanding gas bubbles push cell walls outward',
      image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
      description: 'Internal gases expand exponentially. Starch granules swell to maximum volume, locking moisture into a firm gel before cell walls solidify.',
      highlights: ['Starch gelatinization (hydrogel matrix)', 'Egg ovalbumin coagulation', 'Micro-pore formation for steam release', 'Maximum dome volume'],
    },
    {
      id: 'baked',
      title: '04. BAKED SPONGE CAKE',
      subtitle: 'Permanent Solid Foam Scaffold',
      temp: '98°C Internal (208°F)',
      physicalState: 'Rigid, airy, tender open-crumb structure',
      image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
      description: 'Proteins and starches have permanently cross-linked. The surface has developed a fragrant, caramelized golden crust through the Maillard reaction.',
      highlights: ['Stable solid foam network', 'Aromatic Maillard crust', 'Tender crumb with springy resilience', 'Ready for stabilization cooling'],
    },
  ];

  const current = stages[activeStage];

  return (
    <section id="section-transformation" className="py-24 relative bg-[#120e0b] text-[#f7efe6] overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#c88a4c]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#d97736] tracking-widest uppercase mb-2">
            <span>Chapter 04</span>
            <span>•</span>
            <span>Morphological Evolution</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#fbf6ec]">
            FROM BATTER TO CAKE
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#d4b996] font-light leading-relaxed">
            Follow the continuous sequence of physical metamorphosis. What begins as a viscous liquid batter becomes a golden, fragrant architectural solid foam.
          </p>
        </div>

        {/* 4-Stage Connected Path Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {stages.map((stg, i) => {
            const isSelected = i === activeStage;
            return (
              <button
                key={stg.id}
                onClick={() => setActiveStage(i)}
                className={`p-4 rounded-2xl border transition-all text-left cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#2a1b12] to-[#1c120c] border-[#d97736] shadow-xl shadow-[#d97736]/20 ring-1 ring-[#d97736]/50'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#d97736] mb-1">
                    <span>{stg.temp}</span>
                    <span className="w-2 h-2 rounded-full bg-current opacity-70" />
                  </div>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#fbf6ec] group-hover:text-[#f5dfb3]">
                    {stg.title}
                  </h4>
                </div>
                <div className="mt-3 text-[11px] text-[#f7efe6]/60 line-clamp-1">
                  {stg.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Cinematic Visual Card */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl glass-panel p-3 sm:p-4 border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Floating State Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#f5dfb3]">
                  <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    {current.physicalState}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-[#d97736]/80 text-white font-semibold">
                    {current.temp}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Metamorphosis Details */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-mono text-[#d97736] uppercase tracking-wider block">
                Metamorphosis Phase 0{activeStage + 1} of 04
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#fbf6ec] mt-1">
                {current.title}
              </h3>
              <p className="text-sm font-mono text-[#d4b996] mt-1">
                {current.subtitle}
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#f7efe6]/80 leading-relaxed font-light">
              {current.description}
            </p>

            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-mono uppercase text-[#f5dfb3] block">
                Microscopic Benchmarks
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {current.highlights.map((h, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs text-[#f7efe6]/85">
                    <CheckCircle className="w-4 h-4 text-[#d97736] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <button
                disabled={activeStage === 0}
                onClick={() => setActiveStage(activeStage - 1)}
                className="px-4 py-2 rounded-full border border-white/15 text-xs font-mono text-[#f7efe6]/80 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                Previous Stage
              </button>
              <button
                disabled={activeStage === stages.length - 1}
                onClick={() => setActiveStage(activeStage + 1)}
                className="px-5 py-2 rounded-full bg-[#d97736] hover:bg-[#b35e23] text-xs font-medium uppercase tracking-wider text-white shadow-lg shadow-[#d97736]/20 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                Next Stage →
              </button>
            </div>

          </div>

        </div>

        {/* Crumb Structure Inspection Slider: Batter vs Baked Cake */}
        <div className="mt-16 rounded-3xl glass-panel p-6 sm:p-8 border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#d97736] uppercase tracking-wider">
                <Sliders className="w-3.5 h-3.5" />
                <span>Before & After Micro-Analysis</span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#fbf6ec]">
                Crumb Structure Transformation
              </h4>
            </div>
            <div className="text-xs font-mono text-[#f7efe6]/60">
              Slide to compare raw emulsion vs baked sponge
            </div>
          </div>

          {/* Interactive Comparison Range Slider */}
          <div className="space-y-4">
            <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden border border-white/10 select-none">
              {/* Left Side: Raw Batter */}
              <div className="absolute inset-0 bg-[#d4b996] flex items-center justify-center">
                <div className="text-center p-6 space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#2b1810] font-bold">
                    Raw Liquid Emulsion
                  </span>
                  <p className="text-xs sm:text-sm text-[#3e2417] max-w-sm">
                    Liquid density 0.85 g/cm³ • Trapped mechanical air cavities in fatty lipid suspension
                  </p>
                </div>
              </div>

              {/* Right Side: Baked Porous Crumb */}
              <div
                className="absolute inset-y-0 right-0 bg-[#f4ebd9] shadow-2xl flex items-center justify-center border-l-2 border-[#d97736]"
                style={{ width: `${100 - sliderPosition}%` }}
              >
                <div className="text-center p-6 space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#78350f] font-bold">
                    Baked Sponge Crumb
                  </span>
                  <p className="text-xs sm:text-sm text-[#78350f]/80 max-w-sm">
                    Dry sponge density 0.28 g/cm³ • Coagulated protein walls locking in open porous cells
                  </p>
                </div>
              </div>

              {/* Slider Handle Marker */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-[#d97736] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#d97736] text-white shadow-xl flex items-center justify-center text-xs font-bold">
                  ⇄
                </div>
              </div>
            </div>

            {/* Slider Control */}
            <input
              type="range"
              min="5"
              max="95"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="w-full accent-[#d97736] cursor-ew-resize"
              aria-label="Morphology comparison slider"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
