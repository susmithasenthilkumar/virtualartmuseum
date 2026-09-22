import React, { useState } from 'react';
import { SPECIALTIES } from '../../data/bakeryData';
import { SpecialtyItem } from '../../types/bakery';
import { Sparkles, ArrowRight, X, Check, BookOpen } from 'lucide-react';

export const SpecialtiesSection: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyItem | null>(null);

  return (
    <section id="specialties" className="py-24 sm:py-32 relative bg-[#faf6f0] text-[#2c1810] overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#c59b6d]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-widest text-[#be3a4a] uppercase mb-2">
            <span>Chapter II</span>
            <span>•</span>
            <span>Handmade Collections</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#2c1810]">
            WHAT WE BAKE
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#2c1810]/75 font-sans font-light leading-relaxed">
            From monumental tiered centerpieces to flaky breakfast viennoiserie and rustic hearth loaves, explore the six culinary categories perfected in our ovens every morning.
          </p>
        </div>

        {/* 6 Specialty Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPECIALTIES.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white border border-[#2c1810]/8 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Visual Imagery */}
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-sans font-semibold text-[#2c1810] shadow-sm">
                    <span>{item.icon}</span>
                    <span>{item.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 space-y-3">
                  <h3 className="font-serif text-2xl font-bold text-[#2c1810] group-hover:text-[#be3a4a] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs font-serif italic text-[#c59b6d]">
                    “{item.tagline}”
                  </p>
                  <p className="text-sm text-[#2c1810]/75 font-sans font-light leading-relaxed">
                    {item.shortDescription}
                  </p>
                </div>
              </div>

              {/* Card Footer: Explore Action (Reveals details on same page - strictly information only) */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => setSelectedSpecialty(item)}
                  className="w-full py-3 px-4 rounded-full border border-[#2c1810]/15 hover:border-[#be3a4a] hover:bg-[#be3a4a] hover:text-white text-xs font-sans font-semibold tracking-wider uppercase text-[#2c1810] transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                >
                  <span>Explore Creation Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* On-Page Explore Modal Drawer (No price, no shopping cart, strictly culinary craft details) */}
      {selectedSpecialty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#faf6f0] border border-[#2c1810]/15 shadow-2xl p-6 sm:p-10 text-[#2c1810]">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedSpecialty(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-black/5 hover:bg-black/10 text-[#2c1810] transition-colors"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[#be3a4a] tracking-widest uppercase mb-1">
              <span>{selectedSpecialty.icon}</span>
              <span>{selectedSpecialty.category}</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2c1810]">
              {selectedSpecialty.name}
            </h3>
            <p className="font-serif italic text-base text-[#c59b6d] mt-1">
              “{selectedSpecialty.tagline}”
            </p>

            <div className="my-6 aspect-16/9 rounded-2xl overflow-hidden shadow-md">
              <img
                src={selectedSpecialty.image}
                alt={selectedSpecialty.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Full Story Description */}
            <div className="space-y-4 text-sm sm:text-base text-[#2c1810]/80 font-sans font-light leading-relaxed">
              <p>{selectedSpecialty.fullDescription}</p>
            </div>

            {/* Signature Offerings */}
            <div className="mt-6 p-5 rounded-2xl bg-white border border-[#2c1810]/10 space-y-3">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#2c1810] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#be3a4a]" />
                <span>Patisserie Highlights & Signature Variations</span>
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2c1810]/75">
                {selectedSpecialty.signatureOfferings.map((sig) => (
                  <li key={sig} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#be3a4a] shrink-0" />
                    <span>{sig}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Culinary Specs */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl bg-white/70 border border-[#2c1810]/8">
                <span className="font-bold uppercase tracking-wider text-[#be3a4a] block mb-1">
                  Baking Technique
                </span>
                <span className="text-[#2c1810]/75">{selectedSpecialty.bakingStyle}</span>
              </div>
              <div className="p-4 rounded-xl bg-white/70 border border-[#2c1810]/8">
                <span className="font-bold uppercase tracking-wider text-[#c59b6d] block mb-1">
                  Sensory Taste Profile
                </span>
                <span className="text-[#2c1810]/75">{selectedSpecialty.tasteNotes}</span>
              </div>
            </div>

            {/* Inquire for Custom Ordering Callout */}
            <div className="mt-8 pt-4 border-t border-[#2c1810]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#2c1810]/60 italic font-serif">
                Baked in fresh batches daily. Bespoke flavors available for private occasions.
              </span>
              <a
                href="#contact"
                onClick={() => setSelectedSpecialty(null)}
                className="px-6 py-2.5 rounded-full bg-[#2c1810] hover:bg-[#be3a4a] text-white text-xs font-sans font-semibold tracking-wider uppercase transition-colors"
              >
                Inquire With Our Baker
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
