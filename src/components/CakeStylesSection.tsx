import React, { useState } from 'react';
import { CAKE_STYLES } from '../data/cakeData';
import { CakeStyle } from '../types/cake';
import { Sparkles, MapPin, Award, BookOpen, Compass } from 'lucide-react';

export const CakeStylesSection: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<CakeStyle>(CAKE_STYLES[0]);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');

  const filteredStyles = filterDifficulty === 'All'
    ? CAKE_STYLES
    : CAKE_STYLES.filter((s) => s.difficulty === filterDifficulty);

  return (
    <section id="section-styles" className="py-24 relative bg-[#120e0b] text-[#f7efe6] overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-[#d97736]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#d97736] tracking-widest uppercase mb-2">
            <span>Chapter 08</span>
            <span>•</span>
            <span>Iconic Traditions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#fbf6ec]">
            THE ICONIC CAKE STYLES
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#d4b996] font-light leading-relaxed">
            Across centuries and continents, pastry artisans have adapted the fundamental sponge-and-frosting architecture into distinct cultural, celebratory, and structural styles.
          </p>

          {/* Filter Pills */}
          <div className="mt-6 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-[#f7efe6]/50 mr-2">Filter Craft Level:</span>
            {['All', 'Classic', 'Intermediate', 'Artisanal'].map((level) => (
              <button
                key={level}
                onClick={() => setFilterDifficulty(level)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  filterDifficulty === level
                    ? 'bg-[#d97736] text-white shadow-md shadow-[#d97736]/25'
                    : 'bg-white/5 text-[#f7efe6]/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Hero Cake Showcase */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Card */}
            <div className="lg:col-span-6 relative aspect-4/3 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src={selectedStyle.image}
                alt={selectedStyle.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-[#f5dfb3]">
                  {selectedStyle.difficulty} Craft
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#f7efe6]/80">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d97736]" />
                  <span>Origin: {selectedStyle.origin}</span>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono text-[#d97736] uppercase tracking-wider block">
                  Featured Archetype
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#fbf6ec] mt-1">
                  {selectedStyle.name}
                </h3>
                <p className="text-sm font-serif italic text-[#d4b996] mt-1">
                  “{selectedStyle.tagline}”
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#f7efe6]/85 leading-relaxed font-light">
                {selectedStyle.description}
              </p>

              {/* Historical / Science Fact Callout */}
              <div className="p-5 rounded-2xl bg-[#d97736]/10 border border-[#d97736]/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#f5dfb3]">
                  <Sparkles className="w-3.5 h-3.5 text-[#d97736]" />
                  <span>Culinary Science & History Fact</span>
                </div>
                <p className="text-xs sm:text-sm text-[#fbf6ec]/95 leading-relaxed font-light">
                  {selectedStyle.interestingFact}
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Horizontal Carousel / Grid of Styles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
          {filteredStyles.map((style) => {
            const isSelected = style.id === selectedStyle.id;
            return (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#2a1a12] to-[#1a110c] border-[#d97736] shadow-xl shadow-[#d97736]/20 ring-1 ring-[#d97736]'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                }`}
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-2 relative">
                  <img
                    src={style.image}
                    alt={style.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs text-[#fbf6ec] group-hover:text-[#f5dfb3] line-clamp-1">
                    {style.name}
                  </h4>
                  <span className="text-[10px] font-mono text-[#d97736] block mt-0.5">
                    {style.difficulty}
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
