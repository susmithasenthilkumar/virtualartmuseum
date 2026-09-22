import React, { useState } from 'react';
import { QUALITY_INGREDIENTS, BAKING_PROCESS } from '../../../data/bakeryData';
import { Sparkles, MapPin, Clock, ArrowRight } from 'lucide-react';
import { BakeryTheme } from '../../../theme/bakeryThemes';

interface Slide5QualityProcessProps {
  theme: BakeryTheme;
  onNextSlide: () => void;
  onPrevSlide: () => void;
}

export const Slide5QualityProcess: React.FC<Slide5QualityProcessProps> = ({ theme, onNextSlide, onPrevSlide }) => {
  const [viewTab, setViewTab] = useState<'ingredients' | 'process'>('ingredients');
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activeIngredientIndex, setActiveIngredientIndex] = useState(0);

  const activeIngredient = QUALITY_INGREDIENTS[activeIngredientIndex];
  const activeStep = BAKING_PROCESS[activeStepIndex];

  return (
    <div className="h-full w-full flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-6 sm:py-8 relative overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{ backgroundColor: theme.glow2Hex }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-4">
        
        {/* Slide Header & Dual Tab Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${theme.subtleBgClass} border ${theme.borderClass} text-xs font-sans font-semibold tracking-widest ${theme.accentClass} uppercase mb-1`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Slide 05 • Terroir & Discipline</span>
            </div>
            <h2 className={`font-serif text-3xl sm:text-5xl font-bold tracking-tight ${theme.textPrimaryClass}`}>
              QUALITY & THE ART OF BAKING
            </h2>
          </div>

          {/* Toggle Tab */}
          <div className={`p-1 rounded-full ${theme.cardBgClass} border ${theme.borderClass} shadow-sm flex items-center gap-1 self-start sm:self-auto`}>
            <button
              onClick={() => setViewTab('ingredients')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
                viewTab === 'ingredients'
                  ? `${theme.accentBgClass} text-white shadow-sm`
                  : `${theme.textSecondaryClass} hover:${theme.textPrimaryClass}`
              }`}
            >
              Pure Provenance
            </button>
            <button
              onClick={() => setViewTab('process')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
                viewTab === 'process'
                  ? `${theme.accentBgClass} text-white shadow-sm`
                  : `${theme.textSecondaryClass} hover:${theme.textPrimaryClass}`
              }`}
            >
              The 5 Baking Stages
            </button>
          </div>
        </div>

        {/* Dynamic Content View */}
        {viewTab === 'ingredients' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center text-left">
            {/* 6 Ingredient Selector Pills */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {QUALITY_INGREDIENTS.map((item, idx) => {
                const isSelected = idx === activeIngredientIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIngredientIndex(idx)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between backdrop-blur-sm ${
                      isSelected
                        ? `${theme.cardBgClass} border-transparent ring-2 ring-current ${theme.accentClass} shadow-lg -translate-y-0.5`
                        : `${theme.cardBgClass} hover:opacity-95 ${theme.borderClass} shadow-sm`
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden mb-2 relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <span className="absolute bottom-0.5 right-0.5 text-xs">{item.emoji}</span>
                    </div>
                    <div>
                      <h4 className={`font-serif font-bold text-xs ${theme.textPrimaryClass} line-clamp-1`}>
                        {item.name}
                      </h4>
                      <span className={`text-[10px] ${theme.goldClass} font-sans flex items-center gap-1 mt-0.5 truncate`}>
                        <MapPin className="w-2.5 h-2.5 shrink-0" />
                        {item.origin}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Ingredient Focus Card */}
            <div className="lg:col-span-6">
              <div className={`rounded-3xl ${theme.cardBgClass} border ${theme.borderClass} p-5 sm:p-6 shadow-xl space-y-4 backdrop-blur-sm`}>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden relative shadow-md shrink-0">
                    <img 
                      src={activeIngredient.image} 
                      alt={activeIngredient.name} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <span className="absolute bottom-1 right-1 text-base">{activeIngredient.emoji}</span>
                  </div>
                  <div>
                    <span className={`text-[10px] font-sans font-bold uppercase tracking-wider ${theme.goldClass} flex items-center gap-1`}>
                      <MapPin className="w-3 h-3" />
                      {activeIngredient.origin}
                    </span>
                    <h3 className={`font-serif text-xl sm:text-2xl font-bold ${theme.textPrimaryClass}`}>
                      {activeIngredient.name}
                    </h3>
                    <p className={`text-xs ${theme.accentClass} font-sans font-medium mt-0.5`}>
                      {activeIngredient.role}
                    </p>
                  </div>
                </div>

                <p className={`text-xs sm:text-sm ${theme.textSecondaryClass} font-sans leading-relaxed`}>
                  {activeIngredient.description}
                </p>

                <div className={`p-3 rounded-2xl ${theme.subtleBgClass} border ${theme.borderClass}`}>
                  <span className={`text-[10px] font-sans font-bold uppercase ${theme.textMutedClass} block mb-0.5`}>
                    Sensory Profile
                  </span>
                  <p className={`text-xs font-serif italic ${theme.textPrimaryClass}`}>
                    “{activeIngredient.sensoryProfile}”
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Process Stages View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center text-left">
            {/* Steps Navigation */}
            <div className="lg:col-span-5 space-y-2">
              {BAKING_PROCESS.map((p, idx) => {
                const isSelected = idx === activeStepIndex;
                return (
                  <button
                    key={p.step}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between backdrop-blur-sm ${
                      isSelected
                        ? `${theme.cardBgClass} border-transparent ring-2 ring-current ${theme.accentClass} shadow-md`
                        : `${theme.cardBgClass} hover:opacity-95 ${theme.borderClass}`
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs font-bold ${isSelected ? theme.accentClass : theme.textMutedClass}`}>
                        {p.step}
                      </span>
                      <div>
                        <h4 className={`font-serif font-bold text-xs sm:text-sm ${theme.textPrimaryClass}`}>
                          {p.title}
                        </h4>
                        <span className={`text-[10px] ${theme.textMutedClass} font-sans block`}>
                          {p.subtitle}
                        </span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-sans font-semibold ${theme.goldClass} flex items-center gap-1`}>
                      <Clock className="w-3 h-3" />
                      {p.timeframe.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Step Detail Card */}
            <div className="lg:col-span-7">
              <div className={`rounded-3xl ${theme.cardBgClass} border ${theme.borderClass} p-5 sm:p-6 shadow-xl space-y-4 backdrop-blur-sm`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`font-mono text-xs font-bold ${theme.accentClass}`}>
                      STAGE {activeStep.step} OF 05
                    </span>
                    <h3 className={`font-serif text-2xl font-bold ${theme.textPrimaryClass}`}>
                      {activeStep.title} — {activeStep.subtitle}
                    </h3>
                  </div>
                  <div className={`px-3 py-1 rounded-full ${theme.subtleBgClass} text-xs font-mono font-medium ${theme.textPrimaryClass} flex items-center gap-1`}>
                    <Clock className="w-3 h-3" />
                    <span>{activeStep.timeframe}</span>
                  </div>
                </div>

                <p className={`text-xs sm:text-sm ${theme.textSecondaryClass} font-sans leading-relaxed`}>
                  {activeStep.description}
                </p>

                <div className={`p-3.5 rounded-2xl ${theme.subtleBgClass} border ${theme.borderClass} space-y-1`}>
                  <span className={`text-[10px] font-sans font-bold uppercase tracking-wider ${theme.goldClass} block`}>
                    Master Baker's Secret
                  </span>
                  <p className={`text-xs ${theme.textSecondaryClass} font-sans leading-relaxed`}>
                    {activeStep.artisanDetail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slide Navigation Buttons */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={onPrevSlide}
            className={`text-xs font-sans font-semibold ${theme.textMutedClass} hover:${theme.textPrimaryClass} transition-colors cursor-pointer`}
          >
            ← Back to Signature Cakes
          </button>
          <button
            onClick={onNextSlide}
            className={`px-5 py-2.5 rounded-full ${theme.accentBgClass} ${theme.accentHoverBgClass} text-white text-xs font-sans font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm`}
          >
            <span>Visit & Inquire</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
