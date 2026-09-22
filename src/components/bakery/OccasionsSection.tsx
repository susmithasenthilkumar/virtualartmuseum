import React, { useState } from 'react';
import { OCCASIONS } from '../../data/bakeryData';
import { OccasionItem } from '../../types/bakery';
import { Sparkles, Check, ArrowRight, Heart } from 'lucide-react';

export const OccasionsSection: React.FC = () => {
  const [activeOccasion, setActiveOccasion] = useState<OccasionItem>(OCCASIONS[1]); // Default to Weddings

  return (
    <section id="occasions" className="py-24 sm:py-32 relative bg-[#f5efe6] text-[#2c1810] overflow-hidden">
      
      {/* Background radial accent */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#c59b6d]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-widest text-[#be3a4a] uppercase mb-2">
            <span>Chapter VI</span>
            <span>•</span>
            <span>Bespoke Gatherings</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#2c1810]">
            MADE FOR MOMENTS
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#2c1810]/75 font-sans font-light leading-relaxed">
            Every celebration carries its own emotional cadence. We curate structural tiers, flavor profiles, and artisanal flourishes to harmonize with life’s most cherished milestones.
          </p>
        </div>

        {/* Occasion Selector Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar mb-10">
          {OCCASIONS.map((occ) => {
            const isActive = occ.id === activeOccasion.id;
            return (
              <button
                key={occ.id}
                onClick={() => setActiveOccasion(occ)}
                className={`px-5 py-3 rounded-full text-xs font-sans font-semibold tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-[#2c1810] text-[#faf6f0] shadow-md shadow-[#2c1810]/20 scale-105'
                    : 'bg-white/80 hover:bg-white text-[#2c1810]/80 border border-[#2c1810]/10'
                }`}
              >
                <span>{occ.emoji}</span>
                <span>{occ.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Occasion Showcase Card */}
        <div className="rounded-3xl bg-white border border-[#2c1810]/10 shadow-2xl p-6 sm:p-10 lg:p-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-6 relative aspect-4/3 rounded-2xl overflow-hidden shadow-xl border border-[#2c1810]/10 group">
              <img
                src={activeOccasion.image}
                alt={activeOccasion.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-sans font-semibold text-[#be3a4a] flex items-center gap-1.5 shadow-md">
                <span>{activeOccasion.emoji}</span>
                <span>Custom Curation</span>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#c59b6d] block">
                  Celebratory Portfolio
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2c1810] mt-1">
                  {activeOccasion.title}
                </h3>
                <p className="font-serif italic text-lg text-[#be3a4a] mt-1">
                  “{activeOccasion.subtitle}”
                </p>
              </div>

              <p className="text-base text-[#2c1810]/80 font-sans font-light leading-relaxed">
                {activeOccasion.description}
              </p>

              {/* Bespoke Customization Options */}
              <div className="p-5 rounded-2xl bg-[#faf6f0] border border-[#2c1810]/8 space-y-3">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#2c1810] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c59b6d]" />
                  <span>Artisanal Customization Capabilities</span>
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2c1810]/75">
                  {activeOccasion.customizationOptions.map((opt) => (
                    <li key={opt} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#be3a4a] shrink-0" />
                      <span>{opt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-sans text-[#2c1810]/60 italic font-serif">
                  Advance consultations recommended for wedding and gala milestones.
                </span>
                <a
                  href="#contact"
                  className="px-6 py-2.5 rounded-full border border-[#2c1810]/20 hover:border-[#2c1810] hover:bg-[#2c1810] hover:text-white text-xs font-sans font-semibold tracking-wider uppercase transition-all"
                >
                  Consultation Details
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
