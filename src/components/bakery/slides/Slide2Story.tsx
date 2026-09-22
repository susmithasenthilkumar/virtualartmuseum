import React from 'react';
import { ArrowRight, Sparkles, Clock, Heart, Award, Leaf } from 'lucide-react';
import { BakeryTheme } from '../../../theme/bakeryThemes';

interface Slide2StoryProps {
  theme: BakeryTheme;
  onNextSlide: () => void;
  onPrevSlide: () => void;
}

export const Slide2Story: React.FC<Slide2StoryProps> = ({ theme, onNextSlide, onPrevSlide }) => {
  const craftPillars = [
    {
      title: 'Handmade Daily',
      desc: 'No automated lines or mass mixes. Doughs are hand-kneaded and laminated before sunrise.',
      icon: Heart,
      accent: theme.accentClass,
    },
    {
      title: '48-Hour Cold Ferment',
      desc: 'Slow refrigeration yields honeycomb crumb textures, deep aromas, and easy digestibility.',
      icon: Clock,
      accent: theme.goldClass,
    },
    {
      title: 'Single-Estate Terroir',
      desc: 'Unbleached heritage flour, cultured 84% butter, and Valrhona Grand Cru chocolate.',
      icon: Leaf,
      accent: 'text-emerald-600',
    },
    {
      title: 'Botanical Artistry',
      desc: 'Pressed organic edible blossoms, delicate sugar florals, and hand-applied 24k gold leaf.',
      icon: Award,
      accent: theme.accentClass,
    },
  ];

  return (
    <div className="h-full w-full flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-6 sm:py-8 relative overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{ backgroundColor: theme.glow1Hex }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Column: The Story Narrative */}
        <div className="lg:col-span-6 space-y-5 text-left">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${theme.subtleBgClass} border ${theme.borderClass} text-xs font-sans font-semibold tracking-widest ${theme.accentClass} uppercase`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Slide 02 • Our Story & Philosophy</span>
          </div>

          <h2 className={`font-serif text-3xl sm:text-5xl font-bold tracking-tight ${theme.textPrimaryClass} leading-tight`}>
            THE ART OF SLOW CRAFT
          </h2>

          <p className={`font-serif italic text-lg sm:text-xl ${theme.goldClass} leading-relaxed`}>
            “Baking is a meditation on patience, temperature, and respect for the harvest.”
          </p>

          <p className={`text-sm sm:text-base ${theme.textSecondaryClass} font-sans font-light leading-relaxed`}>
            Founded by pastry chef Genevieve Bennett after years working across classic Paris ateliers and San Francisco hearth bakeries, <strong className={`font-semibold ${theme.textPrimaryClass}`}>The Velvet Whisk</strong> was created to honor the lost rhythm of slow baking.
          </p>

          <p className={`text-sm sm:text-base ${theme.textSecondaryClass} font-sans font-light leading-relaxed hidden sm:block`}>
            We reject synthetic improvers, frozen sponge bases, and pre-made pastes. Every cake and loaf is born of living sourdough levains, pure fruit compotes, and silky European buttercreams.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className={`p-3 rounded-2xl ${theme.cardBgClass} border ${theme.borderClass} shadow-sm backdrop-blur-sm`}>
              <span className={`font-serif text-xl sm:text-2xl font-bold ${theme.accentClass} block`}>
                4:30 AM
              </span>
              <span className={`text-[10px] font-sans uppercase font-bold ${theme.textMutedClass}`}>
                Dawn Hearth Fire
              </span>
            </div>
            <div className={`p-3 rounded-2xl ${theme.cardBgClass} border ${theme.borderClass} shadow-sm backdrop-blur-sm`}>
              <span className={`font-serif text-xl sm:text-2xl font-bold ${theme.textPrimaryClass} block`}>
                48 hrs
              </span>
              <span className={`text-[10px] font-sans uppercase font-bold ${theme.textMutedClass}`}>
                Slow Fermentation
              </span>
            </div>
            <div className={`p-3 rounded-2xl ${theme.cardBgClass} border ${theme.borderClass} shadow-sm backdrop-blur-sm`}>
              <span className={`font-serif text-xl sm:text-2xl font-bold ${theme.goldClass} block`}>
                0%
              </span>
              <span className={`text-[10px] font-sans uppercase font-bold ${theme.textMutedClass}`}>
                Artificial Additives
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: 4 Pillars & Editorial Visual */}
        <div className="lg:col-span-6 space-y-4">
          <div className={`relative aspect-16/9 rounded-3xl overflow-hidden shadow-xl border ${theme.borderClass}`}>
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80"
              alt="Artisan bakery table"
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 text-white">
              <span className="text-xs font-mono text-amber-200 uppercase block">
                Baking Studio • San Francisco
              </span>
              <p className="font-serif text-base sm:text-lg font-bold">
                Where flour, water, and heat become art
              </p>
            </div>
          </div>

          {/* 4 Pillars Mini Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {craftPillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className={`p-3.5 rounded-2xl ${theme.cardBgClass} border ${theme.borderClass} shadow-sm hover:shadow-md transition-all flex items-start gap-3 backdrop-blur-sm`}
                >
                  <div className={`p-2 rounded-xl ${theme.subtleBgClass} shrink-0`}>
                    <Icon className={`w-4 h-4 ${p.accent}`} />
                  </div>
                  <div>
                    <h4 className={`font-serif font-bold text-xs sm:text-sm ${theme.textPrimaryClass}`}>
                      {p.title}
                    </h4>
                    <p className={`text-[11px] ${theme.textSecondaryClass} font-sans mt-0.5 leading-snug`}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slide Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onPrevSlide}
              className={`text-xs font-sans font-semibold ${theme.textMutedClass} hover:${theme.textPrimaryClass} transition-colors cursor-pointer`}
            >
              ← Back to Welcome
            </button>
            <button
              onClick={onNextSlide}
              className={`px-5 py-2.5 rounded-full ${theme.accentBgClass} ${theme.accentHoverBgClass} text-white text-xs font-sans font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm`}
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
