import React, { useState } from 'react';
import { SIGNATURE_CAKES } from '../../data/bakeryData';
import { SignatureCake } from '../../types/bakery';
import { Sparkles, Palette, Layers, Award } from 'lucide-react';

export const SignatureCakesSection: React.FC = () => {
  const [activeCake, setActiveCake] = useState<SignatureCake>(SIGNATURE_CAKES[0]);

  return (
    <section id="signature-cakes" className="py-24 sm:py-32 relative bg-[#f5eedf] text-[#2c1810] overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-[#be3a4a]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-widest text-[#be3a4a] uppercase mb-2">
            <span>Chapter III</span>
            <span>•</span>
            <span>Haute Patisserie</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#2c1810]">
            SIGNATURE CREATIONS
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#2c1810]/75 font-sans font-light leading-relaxed">
            The defining centerpieces of The Velvet Whisk. Each cake is an architectural dialogue between crumb structure, aromatic infusions, and artisanal botanical presentation.
          </p>
        </div>

        {/* Featured Cake Spotlight Layout */}
        <div className="rounded-3xl bg-white/90 backdrop-blur-md border border-[#2c1810]/10 shadow-2xl p-6 sm:p-10 lg:p-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-6 relative aspect-4/3 rounded-2xl overflow-hidden shadow-xl border border-[#2c1810]/10 group">
              <img
                src={activeCake.image}
                alt={activeCake.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-sans font-semibold text-[#be3a4a] shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Masterpiece</span>
              </div>
            </div>

            {/* Cake Craft Detail Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-sans font-bold tracking-widest uppercase text-[#c59b6d] block">
                  Artisanal Archive
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2c1810] mt-1">
                  {activeCake.name}
                </h3>
              </div>

              <p className="text-base text-[#2c1810]/80 font-sans font-light leading-relaxed">
                {activeCake.shortDescription}
              </p>

              {/* Flavor & Decorative Specs */}
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#faf6f0] border border-[#2c1810]/8">
                  <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#be3a4a] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Flavor Profile & Notes</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#2c1810]/75 font-sans leading-relaxed">
                    {activeCake.flavorProfile}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#faf6f0] border border-[#2c1810]/8">
                  <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#c59b6d] mb-1">
                    <Palette className="w-3.5 h-3.5" />
                    <span>Decorative Style & Garnishes</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#2c1810]/75 font-sans leading-relaxed">
                    {activeCake.decorativeStyle}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                  <div className="p-3.5 rounded-xl bg-white border border-[#2c1810]/8">
                    <span className="font-bold text-[#2c1810]/60 uppercase block text-[10px]">
                      Sponge Foundation
                    </span>
                    <span className="font-medium text-[#2c1810] mt-0.5 block">
                      {activeCake.spongeType}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#2c1810]/8">
                    <span className="font-bold text-[#2c1810]/60 uppercase block text-[10px]">
                      Silk Frosting
                    </span>
                    <span className="font-medium text-[#2c1810] mt-0.5 block">
                      {activeCake.frostingType}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Cake Selector Thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SIGNATURE_CAKES.map((cake) => {
            const isSelected = cake.id === activeCake.id;
            return (
              <button
                key={cake.id}
                onClick={() => setActiveCake(cake)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#2c1810] text-[#faf6f0] border-[#2c1810] shadow-xl scale-[1.02]'
                    : 'bg-white/80 hover:bg-white text-[#2c1810] border-[#2c1810]/10 hover:border-[#be3a4a]'
                }`}
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-2 relative">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs line-clamp-1">
                    {cake.name}
                  </h4>
                  <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-[#c59b6d]' : 'text-[#be3a4a]'}`}>
                    View Details
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
