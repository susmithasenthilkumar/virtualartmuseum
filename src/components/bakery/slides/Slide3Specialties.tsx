import React, { useState } from 'react';
import { SPECIALTIES } from '../../../data/bakeryData';
import { SpecialtyItem } from '../../../types/bakery';
import { Sparkles, ArrowRight, X, Check } from 'lucide-react';
import { BakeryTheme } from '../../../theme/bakeryThemes';

interface Slide3SpecialtiesProps {
  theme: BakeryTheme;
  onNextSlide: () => void;
  onPrevSlide: () => void;
}

export const Slide3Specialties: React.FC<Slide3SpecialtiesProps> = ({ theme, onNextSlide, onPrevSlide }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyItem | null>(null);

  return (
    <div className="h-full w-full flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-6 sm:py-8 relative overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{ backgroundColor: theme.glow1Hex }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-5">
        
        {/* Slide Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${theme.subtleBgClass} border ${theme.borderClass} text-xs font-sans font-semibold tracking-widest ${theme.accentClass} uppercase mb-1`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Slide 03 • Handmade Collections</span>
            </div>
            <h2 className={`font-serif text-3xl sm:text-5xl font-bold tracking-tight ${theme.textPrimaryClass}`}>
              WHAT WE BAKE
            </h2>
          </div>
          <p className={`text-xs sm:text-sm ${theme.textSecondaryClass} font-sans font-light max-w-md`}>
            Six artisanal categories crafted in small morning batches with zero compromises. Click any collection to inspect culinary notes.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SPECIALTIES.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedSpecialty(item)}
              className={`rounded-2xl ${theme.cardBgClass} border ${theme.borderClass} shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer hover:-translate-y-1 backdrop-blur-sm`}
            >
              <div>
                <div className="aspect-4/3 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=900&q=80';
                    }}
                  />
                  <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full ${theme.cardBgClass} backdrop-blur-md text-[10px] font-sans font-semibold ${theme.textPrimaryClass} shadow-sm flex items-center gap-1`}>
                    <span>{item.icon}</span>
                    <span className="truncate max-w-[80px]">{item.category}</span>
                  </div>
                </div>

                <div className="p-3 sm:p-4 text-left space-y-1">
                  <h3 className={`font-serif font-bold text-sm sm:text-base ${theme.textPrimaryClass} group-hover:${theme.accentClass} transition-colors line-clamp-1`}>
                    {item.name}
                  </h3>
                  <p className={`text-[11px] font-serif italic ${theme.goldClass} line-clamp-1`}>
                    “{item.tagline}”
                  </p>
                  <p className={`text-[11px] ${theme.textSecondaryClass} font-sans line-clamp-2 leading-relaxed`}>
                    {item.shortDescription}
                  </p>
                </div>
              </div>

              <div className="px-3 pb-3 pt-1">
                <span className={`w-full py-1.5 px-2 rounded-xl ${theme.subtleBgClass} group-hover:${theme.accentBgClass} group-hover:text-white text-[10px] font-sans font-semibold tracking-wider uppercase ${theme.textPrimaryClass} transition-colors flex items-center justify-center gap-1`}>
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Navigation Buttons */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={onPrevSlide}
            className={`text-xs font-sans font-semibold ${theme.textMutedClass} hover:${theme.textPrimaryClass} transition-colors cursor-pointer`}
          >
            ← Back to Our Story
          </button>
          <button
            onClick={onNextSlide}
            className={`px-5 py-2.5 rounded-full ${theme.accentBgClass} ${theme.accentHoverBgClass} text-white text-xs font-sans font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm`}
          >
            <span>See Signature Cakes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Specialty Exploration Modal Drawer */}
      {selectedSpecialty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className={`relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl ${theme.cardBgClass} border ${theme.borderClass} shadow-2xl p-6 sm:p-8 ${theme.textPrimaryClass} text-left`}>
            
            <button
              onClick={() => setSelectedSpecialty(null)}
              className={`absolute top-4 right-4 p-2 rounded-full ${theme.subtleBgClass} hover:opacity-80 ${theme.textPrimaryClass} transition-colors cursor-pointer`}
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className={`flex items-center gap-2 text-xs font-sans font-semibold ${theme.accentClass} tracking-widest uppercase mb-1`}>
              <span>{selectedSpecialty.icon}</span>
              <span>{selectedSpecialty.category}</span>
            </div>

            <h3 className={`font-serif text-2xl sm:text-3xl font-bold ${theme.textPrimaryClass}`}>
              {selectedSpecialty.name}
            </h3>

            <p className={`font-serif italic text-sm ${theme.goldClass} mt-0.5`}>
              “{selectedSpecialty.tagline}”
            </p>

            <div className={`aspect-16/9 rounded-2xl overflow-hidden my-4 border ${theme.borderClass}`}>
              <img
                src={selectedSpecialty.image}
                alt={selectedSpecialty.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=900&q=80';
                }}
              />
            </div>

            <p className={`text-sm ${theme.textSecondaryClass} font-sans leading-relaxed`}>
              {selectedSpecialty.fullDescription}
            </p>

            {/* Offerings list */}
            <div className="mt-4 space-y-2">
              <span className={`text-[11px] font-sans font-bold uppercase tracking-wider ${theme.textMutedClass}`}>
                Signature Offerings:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedSpecialty.signatureOfferings.map((offering, i) => (
                  <div key={i} className={`flex items-center gap-2 text-xs ${theme.textSecondaryClass} font-sans p-2 rounded-xl ${theme.subtleBgClass}`}>
                    <Check className={`w-3.5 h-3.5 ${theme.accentClass} shrink-0`} />
                    <span>{offering}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Culinary notes */}
            <div className={`mt-4 p-3.5 rounded-2xl ${theme.subtleBgClass} border ${theme.borderClass} space-y-1.5 text-xs font-sans`}>
              <div>
                <strong className={`font-semibold ${theme.accentClass}`}>Baking Method: </strong>
                <span className={theme.textSecondaryClass}>{selectedSpecialty.bakingStyle}</span>
              </div>
              <div>
                <strong className={`font-semibold ${theme.goldClass}`}>Sensory Notes: </strong>
                <span className={theme.textSecondaryClass}>{selectedSpecialty.tasteNotes}</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
