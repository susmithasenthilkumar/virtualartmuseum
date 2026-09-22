import React, { useState } from 'react';
import { INGREDIENTS } from '../data/cakeData';
import { Ingredient } from '../types/cake';
import { Beaker, Sparkles, CheckCircle2, Atom, ArrowRight } from 'lucide-react';

export const IngredientsSection: React.FC = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>(INGREDIENTS[0]);

  return (
    <section id="section-ingredients" className="py-24 relative bg-[#140f0c] text-[#f7efe6]">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#c88a4c]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#d97736] tracking-widest uppercase mb-2">
            <span>Chapter 01</span>
            <span>•</span>
            <span>Fundamental Chemistry</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#fbf6ec]">
            WHERE IT ALL BEGINS
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#d4b996] font-light leading-relaxed">
            A cake is not an arbitrary assembly of foods, but an exact biochemical formula. Every granule, fat crystal, and protein strand plays a strictly defined thermodynamic and structural role.
          </p>
        </div>

        {/* Interactive Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Ingredient Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono uppercase text-[#f7efe6]/50 mb-3 flex items-center justify-between">
              <span>Select an element to analyze</span>
              <span>7 Core Building Blocks</span>
            </div>

            {INGREDIENTS.map((ing) => {
              const isSelected = selectedIngredient.id === ing.id;
              return (
                <button
                  key={ing.id}
                  onClick={() => setSelectedIngredient(ing)}
                  onMouseEnter={() => setSelectedIngredient(ing)}
                  className={`w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between group cursor-pointer border ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#2a1c14] to-[#1c1410] border-[#d97736] shadow-xl shadow-[#d97736]/15 translate-x-1.5'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl p-2 rounded-xl bg-black/30 border border-white/5 group-hover:scale-110 transition-transform">
                      {ing.emoji}
                    </span>
                    <div>
                      <div className="font-medium text-sm sm:text-base text-[#fbf6ec] group-hover:text-[#f5dfb3] transition-colors flex items-center gap-2">
                        <span>{ing.name}</span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d97736]" />
                        )}
                      </div>
                      <div className="text-xs text-[#d97736] font-mono mt-0.5">
                        {ing.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline text-xs font-mono text-[#f7efe6]/40">
                      {ing.bakersPercentage}
                    </span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#d97736] translate-x-1' : 'text-white/20 group-hover:text-white/50'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Scientific Spotlight Panel */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-[#f7efe6]/10 shadow-2xl relative overflow-hidden">
              {/* Subtle top background decorative glow */}
              <div
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none"
                style={{ backgroundColor: selectedIngredient.color }}
              />

              <div className="relative z-10 space-y-6">
                {/* Header of Active Ingredient */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl p-3 rounded-2xl bg-black/40 border border-white/10 shadow-inner">
                      {selectedIngredient.emoji}
                    </span>
                    <div>
                      <span className="text-xs font-mono text-[#d97736] uppercase tracking-wider block">
                        Chemical Function: {selectedIngredient.category}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf6ec]">
                        {selectedIngredient.name}
                      </h3>
                    </div>
                  </div>

                  <div className="inline-flex flex-col sm:items-end justify-center px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] font-mono text-[#f7efe6]/50 uppercase">Bakers Ratio</span>
                    <span className="font-mono text-sm font-semibold text-[#f5dfb3]">
                      {selectedIngredient.bakersPercentage}
                    </span>
                  </div>
                </div>

                {/* Cinematic Image & Purpose Banner */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5 relative rounded-2xl overflow-hidden aspect-4/3 border border-white/10 shadow-xl group">
                    <img
                      src={selectedIngredient.image}
                      alt={selectedIngredient.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-[11px] font-mono text-[#f5dfb3] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                      {selectedIngredient.emoji} High Resolution Specimen
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#d97736]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Primary Purpose in Batter</span>
                    </div>
                    <p className="font-serif text-lg sm:text-xl text-[#fbf6ec] leading-snug italic">
                      “{selectedIngredient.purpose}”
                    </p>
                    <p className="text-xs text-[#f7efe6]/60 leading-relaxed">
                      Without {selectedIngredient.name.toLowerCase()}, the thermodynamic sponge network fails to maintain balanced elasticity and hydration.
                    </p>
                  </div>
                </div>

                {/* Deep Scientific Explanation */}
                <div className="p-5 rounded-2xl bg-black/35 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#f5dfb3] uppercase">
                    <Beaker className="w-3.5 h-3.5 text-[#d97736]" />
                    <span>Scientific Mechanism</span>
                  </div>
                  <p className="text-sm text-[#f7efe6]/85 leading-relaxed font-light">
                    {selectedIngredient.science}
                  </p>
                </div>

                {/* Molecular Fact */}
                <div className="p-4 rounded-xl bg-[#d97736]/10 border border-[#d97736]/30 flex items-start gap-3">
                  <Atom className="w-4 h-4 text-[#d97736] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#f5dfb3] leading-relaxed">
                    <span className="font-semibold text-white">Molecular Insight: </span>
                    {selectedIngredient.molecularFact}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
