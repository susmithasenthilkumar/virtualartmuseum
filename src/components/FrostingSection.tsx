import React, { useState } from 'react';
import { FROSTING_TYPES } from '../data/cakeData';
import { FrostingType } from '../types/cake';
import { Sparkles, Check, Thermometer, Layers, Wand2 } from 'lucide-react';

export const FrostingSection: React.FC = () => {
  const [selectedFrosting, setSelectedFrosting] = useState<FrostingType>(FROSTING_TYPES[0]);
  const [frostingCoverage, setFrostingCoverage] = useState<number>(75);
  const [isSpreading, setIsSpreading] = useState<boolean>(false);

  const handleSmoothFrosting = () => {
    setIsSpreading(true);
    setFrostingCoverage(100);
    setTimeout(() => setIsSpreading(false), 700);
  };

  const handleCrumbCoat = () => {
    setFrostingCoverage(35);
  };

  return (
    <section id="section-frosting" className="py-24 relative bg-[#120e0b] text-[#f7efe6] overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#d97736]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#d97736] tracking-widest uppercase mb-2">
            <span>Chapter 06</span>
            <span>•</span>
            <span>Edible Sculpture</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#fbf6ec]">
            THE ART OF FROSTING
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#d4b996] font-light leading-relaxed">
            Frosting is the sensory skin of a cake. More than aesthetic covering, it serves as a protective lipid seal locking in sponge moisture and balancing the crumb’s sweetness with rich, velvety mouthfeel.
          </p>
        </div>

        {/* 4 Frosting Types Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {FROSTING_TYPES.map((frost) => {
            const isSelected = frost.id === selectedFrosting.id;
            return (
              <button
                key={frost.id}
                onClick={() => setSelectedFrosting(frost)}
                className={`p-5 rounded-2xl border transition-all text-left cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#281c15] to-[#1a120d] border-[#d97736] shadow-xl shadow-[#d97736]/20 ring-1 ring-[#d97736]/50'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="w-4 h-4 rounded-full border border-white/30 shadow-sm"
                      style={{ backgroundColor: frost.color }}
                    />
                    <span className="text-[10px] font-mono text-[#d97736]">
                      {frost.meltPoint.split('—')[0]}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#fbf6ec] group-hover:text-[#f5dfb3]">
                    {frost.name}
                  </h4>
                </div>
                <div className="mt-3 text-xs text-[#f7efe6]/60 line-clamp-1">
                  {frost.appearance}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Spatula / Frosting Coverage Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left Column: Interactive Cake Frosting Canvas */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col items-center">
              
              <div className="w-full flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-[#d97736]">
                <span>PALETTE KNIFE SIMULATOR</span>
                <span className="text-[#f5dfb3] font-semibold">{frostingCoverage}% Surface Coat</span>
              </div>

              {/* Cake Cylinder Display */}
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 my-8 flex items-center justify-center">
                {/* Turntable Base */}
                <div className="absolute -bottom-4 w-64 h-8 rounded-full bg-[#1b120c] border border-white/10 shadow-2xl" />

                {/* Cake Core (Sponge Crumb) */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#e8cfa6] border-4 border-[#c88a4c] shadow-2xl overflow-hidden flex items-center justify-center">
                  
                  {/* Sponge Crumb Texture */}
                  <div className="absolute inset-0 bg-radial from-[#deb887] via-[#cda270] to-[#b8864b] opacity-80" />

                  {/* Dynamic Frosting Layer Covering from Left to Right */}
                  <div
                    className={`absolute inset-0 transition-all duration-700 ease-out shadow-2xl flex items-center justify-center ${
                      isSpreading ? 'scale-102' : 'scale-100'
                    }`}
                    style={{
                      clipPath: `polygon(0 0, ${frostingCoverage}% 0, ${frostingCoverage}% 100%, 0 100%)`,
                      backgroundColor: selectedFrosting.color,
                    }}
                  >
                    {/* Swirl stroke pattern */}
                    <div className="absolute inset-2 rounded-full border-2 border-dashed border-black/10 opacity-60" />
                    <div className="absolute inset-6 rounded-full border border-black/10 opacity-40" />
                  </div>

                  {/* Center Spatula Sweep Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1.5 bg-[#d97736] shadow-lg pointer-events-none transition-all duration-700"
                    style={{ left: `${frostingCoverage}%` }}
                  />

                  {/* Live Status Tag */}
                  <div className="relative z-10 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono text-[#f5dfb3] border border-white/15">
                    {frostingCoverage < 50 ? 'Crumb Coat (Base)' : frostingCoverage < 100 ? 'Final Coat Applied' : 'Pristine Satin Finish'}
                  </div>
                </div>
              </div>

              {/* Interactive Spatula Controls */}
              <div className="w-full flex items-center justify-center gap-3">
                <button
                  onClick={handleCrumbCoat}
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-[#f7efe6]/80 transition-colors border border-white/10"
                >
                  Apply Crumb Coat (35%)
                </button>
                <button
                  onClick={handleSmoothFrosting}
                  className="px-5 py-2.5 rounded-full bg-[#d97736] hover:bg-[#b35e23] text-xs font-medium uppercase tracking-wider text-white shadow-lg shadow-[#d97736]/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Glide Spatula (100%)</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Selected Frosting Scientific Profile */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono uppercase text-[#d97736] block">
                    Frosting Profile
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf6ec]">
                    {selectedFrosting.name}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#f7efe6]/50 uppercase block">Melt Point</span>
                  <span className="text-xs font-mono font-bold text-[#f5dfb3]">
                    {selectedFrosting.meltPoint}
                  </span>
                </div>
              </div>

              {/* Texture & Appearance Spec */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[11px] font-mono text-[#d97736] uppercase block">Texture</span>
                  <p className="text-xs text-[#fbf6ec] mt-1 font-medium">
                    {selectedFrosting.texture}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[11px] font-mono text-[#d97736] uppercase block">Appearance</span>
                  <p className="text-xs text-[#fbf6ec] mt-1 font-medium">
                    {selectedFrosting.appearance}
                  </p>
                </div>
              </div>

              {/* Key Culinary Characteristics */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#f5dfb3] uppercase tracking-wider block">
                  Core Characteristics:
                </span>
                <ul className="space-y-1.5">
                  {selectedFrosting.characteristics.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#f7efe6]/80 font-light">
                      <Check className="w-3.5 h-3.5 text-[#d97736] shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Uses & Scientific Stability */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="text-xs">
                  <span className="font-semibold text-white">Ideal Pairings: </span>
                  <span className="text-[#f7efe6]/75 font-light">{selectedFrosting.commonUses}</span>
                </div>
                <div className="text-xs p-3 rounded-xl bg-black/40 border border-white/10 text-[#f5dfb3]">
                  <span className="font-semibold text-white">Thermodynamic Stability: </span>
                  <span className="font-light">{selectedFrosting.scientificStability}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
