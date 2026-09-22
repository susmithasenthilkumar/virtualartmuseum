import React from 'react';
import { BRAND_PILLARS } from '../../data/bakeryData';
import { Sparkles, Leaf, Palette, Flame, Heart, Crown } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#be3a4a]" />;
      case 'Leaf':
        return <Leaf className="w-6 h-6 text-[#4a7c59]" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-[#c59b6d]" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-[#d97736]" />;
      case 'Heart':
        return <Heart className="w-6 h-6 text-[#be3a4a]" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-[#c59b6d]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#be3a4a]" />;
    }
  };

  return (
    <section id="why-us" className="py-24 sm:py-32 relative bg-[#faf6f0] text-[#2c1810] overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#c59b6d]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-widest text-[#be3a4a] uppercase mb-2">
            <span>Chapter IX</span>
            <span>•</span>
            <span>The Velvet Standard</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#2c1810]">
            WHY THE VELVET WHISK
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#2c1810]/75 font-sans font-light leading-relaxed">
            We hold ourselves to a set of exacting artisanal principles that define every bake leaving our kitchen.
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRAND_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="p-8 rounded-3xl bg-white border border-[#2c1810]/8 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#faf6f0] border border-[#2c1810]/8 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-[#be3a4a]/10 transition-all duration-300">
                {getIcon(pillar.iconName)}
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#2c1810] group-hover:text-[#be3a4a] transition-colors">
                {pillar.title}
              </h3>
              
              <span className="text-xs font-sans font-semibold text-[#c59b6d] block mt-1 uppercase tracking-wider">
                {pillar.subtitle}
              </span>

              <p className="text-sm text-[#2c1810]/75 font-sans font-light leading-relaxed mt-3">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
