import React, { useState } from 'react';
import { SIGNATURE_CAKES } from '../../../data/bakeryData';
import { SignatureCake } from '../../../types/bakery';
import { Sparkles, ArrowRight } from 'lucide-react';
import { BakeryTheme } from '../../../theme/bakeryThemes';

interface Slide4SignatureCakesProps {
  theme: BakeryTheme;
  onNextSlide: () => void;
  onPrevSlide: () => void;
}

export const Slide4SignatureCakes: React.FC<Slide4SignatureCakesProps> = ({ theme, onNextSlide, onPrevSlide }) => {
  const [activeCake, setActiveCake] = useState<SignatureCake>(SIGNATURE_CAKES[0]);

  return (
    <div className="h-full w-full flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-6 sm:py-8 relative overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ backgroundColor: theme.glow1Hex }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-4">
        
        {/* Slide Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${theme.subtleBgClass} border ${theme.borderClass} text-xs font-sans font-semibold tracking-widest ${theme.accentClass} uppercase mb-1`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Slide 04 • Haute Patisserie</span>
            </div>
            <h2 className={`font-serif text-3xl sm:text-5xl font-bold tracking-tight ${theme.textPrimaryClass}`}>
              SIGNATURE CREATIONS
            </h2>
          </div>
          <p className={`text-xs sm:text-sm ${theme.textSecondaryClass} font-sans font-light max-w-md`}>
            The defining centerpieces of our bakery. Select any cake below to view its sponge architecture, frosting, and botanical styling.
          </p>
        </div>

        {/* Cake Spotlight Card */}
        <div className={`rounded-3xl ${theme.cardBgClass} border ${theme.borderClass} shadow-xl p-5 sm:p-7 overflow-hidden text-left backdrop-blur-sm`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Visual */}
            <div className="lg:col-span-5 relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-2xl overflow-hidden shadow-md group">
              <img
                src={activeCake.image}
                alt={activeCake.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=900&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className={`absolute top-3 left-3 px-3 py-1 rounded-full ${theme.cardBgClass} backdrop-blur-md text-[11px] font-sans font-semibold ${theme.accentClass} shadow-sm flex items-center gap-1.5`}>
                <Sparkles className="w-3 h-3" />
                <span>Featured Masterpiece</span>
              </div>
            </div>

            {/* Specs & Description */}
            <div className="lg:col-span-7 space-y-3.5">
              <div>
                <span className={`text-[10px] font-sans font-bold tracking-widest uppercase ${theme.goldClass} block`}>
                  Artisanal Archive
                </span>
                <h3 className={`font-serif text-2xl sm:text-3xl font-bold ${theme.textPrimaryClass} mt-0.5`}>
                  {activeCake.name}
                </h3>
                <p className={`text-xs sm:text-sm ${theme.textSecondaryClass} font-sans font-light mt-1 line-clamp-2`}>
                  {activeCake.shortDescription}
                </p>
              </div>

              {/* Flavor Profile Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                <div className={`p-3 rounded-xl ${theme.subtleBgClass} border ${theme.borderClass}`}>
                  <span className={`font-bold ${theme.accentClass} uppercase text-[10px] block mb-0.5`}>
                    Flavor Profile
                  </span>
                  <span className={`${theme.textSecondaryClass} text-[11px] line-clamp-2`}>{activeCake.flavorProfile}</span>
                </div>
                <div className={`p-3 rounded-xl ${theme.subtleBgClass} border ${theme.borderClass}`}>
                  <span className={`font-bold ${theme.goldClass} uppercase text-[10px] block mb-0.5`}>
                    Aesthetic Styling
                  </span>
                  <span className={`${theme.textSecondaryClass} text-[11px] line-clamp-2`}>{activeCake.decorativeStyle}</span>
                </div>
              </div>

              {/* Foundation & Frosting Pills */}
              <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                <div className={`p-2.5 rounded-xl ${theme.cardBgClass} border ${theme.borderClass}`}>
                  <span className={`text-[10px] font-bold ${theme.textMutedClass} uppercase block`}>
                    Sponge Foundation
                  </span>
                  <span className={`text-[11px] font-medium ${theme.textPrimaryClass} truncate block mt-0.5`}>
                    {activeCake.spongeType}
                  </span>
                </div>
                <div className={`p-2.5 rounded-xl ${theme.cardBgClass} border ${theme.borderClass}`}>
                  <span className={`text-[10px] font-bold ${theme.textMutedClass} uppercase block`}>
                    Silk Frosting
                  </span>
                  <span className={`text-[11px] font-medium ${theme.textPrimaryClass} truncate block mt-0.5`}>
                    {activeCake.frostingType}
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 6 Selector Thumbnails */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {SIGNATURE_CAKES.map((cake) => {
            const isSelected = cake.id === activeCake.id;
            return (
              <button
                key={cake.id}
                onClick={() => setActiveCake(cake)}
                className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between backdrop-blur-sm ${
                  isSelected
                    ? `${theme.accentBgClass} text-white border-transparent shadow-md scale-[1.02]`
                    : `${theme.cardBgClass} hover:opacity-95 ${theme.textPrimaryClass} ${theme.borderClass}`
                }`}
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-1.5">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=900&q=80';
                    }}
                  />
                </div>
                <h4 className="font-serif font-bold text-[11px] truncate">
                  {cake.name}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Slide Navigation Buttons */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={onPrevSlide}
            className={`text-xs font-sans font-semibold ${theme.textMutedClass} hover:${theme.textPrimaryClass} transition-colors cursor-pointer`}
          >
            ← Back to Collections
          </button>
          <button
            onClick={onNextSlide}
            className={`px-5 py-2.5 rounded-full ${theme.accentBgClass} ${theme.accentHoverBgClass} text-white text-xs font-sans font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm`}
          >
            <span>Quality & Process</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
