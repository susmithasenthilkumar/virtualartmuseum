import React, { useState } from 'react';
import { QUALITY_INGREDIENTS } from '../../data/bakeryData';
import { QualityIngredient } from '../../types/bakery';
import { Sparkles, MapPin, CheckCircle, Info } from 'lucide-react';

export const IngredientsSection: React.FC = () => {
  const [hoveredIngredient, setHoveredIngredient] = useState<QualityIngredient>(QUALITY_INGREDIENTS[0]);

  return (
    <section id="ingredients" className="py-24 sm:py-32 relative bg-[#faf6f0] text-[#2c1810] overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#be3a4a]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-widest text-[#be3a4a] uppercase mb-2">
            <span>Chapter V</span>
            <span>•</span>
            <span>Ethical Provenance</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#2c1810]">
            QUALITY YOU CAN TASTE
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#2c1810]/75 font-sans font-light leading-relaxed">
            We believe that a cake can only be as sublime as the elements from which it is shaped. Hover over or tap any ingredient to inspect its terroir, culinary role, and aromatic profile.
          </p>
        </div>

        {/* Interactive Ingredients Grid & Spotlight Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: 6 Interactive Ingredient Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUALITY_INGREDIENTS.map((item) => {
              const isSelected = item.id === hoveredIngredient.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredIngredient(item)}
                  onClick={() => setHoveredIngredient(item)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? 'bg-white border-[#be3a4a] shadow-xl shadow-[#be3a4a]/10 -translate-y-1 ring-1 ring-[#be3a4a]/30'
                      : 'bg-white/60 hover:bg-white border-[#2c1810]/10 hover:border-[#2c1810]/20 shadow-sm'
                  }`}
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-sm relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                    <span className="absolute bottom-1 right-1 text-sm">{item.emoji}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-base text-[#2c1810]">
                        {item.name}
                      </h4>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#be3a4a] animate-pulse" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-sans text-[#c59b6d] mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{item.origin}</span>
                    </div>
                    <p className="text-xs text-[#2c1810]/70 font-sans mt-1.5 line-clamp-2">
                      {item.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Terroir & Baking Science Panel */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl bg-white border border-[#2c1810]/10 p-6 sm:p-8 shadow-xl space-y-6">
              
              <div className="relative aspect-16/9 rounded-2xl overflow-hidden shadow-md">
                <img
                  src={hoveredIngredient.image}
                  alt={hoveredIngredient.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-sans font-semibold text-[#be3a4a]">
                  {hoveredIngredient.origin}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#c59b6d] block">
                  Selected Harvest
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2c1810] mt-0.5">
                  {hoveredIngredient.name}
                </h3>
              </div>

              {/* Functional Role in Baking */}
              <div className="p-4 rounded-xl bg-[#faf6f0] border border-[#2c1810]/8 space-y-1">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#be3a4a] block">
                  Crucial Baking Role
                </span>
                <p className="text-xs sm:text-sm font-sans font-medium text-[#2c1810]">
                  {hoveredIngredient.role}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#2c1810]/80 font-sans font-light leading-relaxed">
                {hoveredIngredient.description}
              </p>

              {/* Sensory Profile */}
              <div className="pt-2 border-t border-[#2c1810]/10">
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#2c1810]/70 block mb-1">
                  Sensory Tasting Notes
                </span>
                <p className="text-xs font-serif italic text-[#c59b6d]">
                  “{hoveredIngredient.sensoryProfile}”
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
