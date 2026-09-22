import React from 'react';
import { TESTIMONIALS } from '../../data/bakeryData';
import { Quote, Sparkles, Star, Heart } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 sm:py-32 relative bg-[#f5eedf] text-[#2c1810] overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-[#be3a4a]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-widest text-[#be3a4a] uppercase mb-2">
            <span>Chapter VIII</span>
            <span>•</span>
            <span>Kind Words</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#2c1810]">
            WHAT PEOPLE SAY
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#2c1810]/75 font-sans font-light leading-relaxed">
            From intimate anniversary gatherings to four-hundred-guest galas, hear what our patrons and event hosts remember most about their time with The Velvet Whisk.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-3xl bg-white border border-[#2c1810]/10 p-8 sm:p-10 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#c59b6d]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#be3a4a]/20 group-hover:text-[#be3a4a]/40 transition-colors" />
                </div>

                {/* Primary Quote */}
                <p className="font-serif italic text-xl sm:text-2xl text-[#2c1810] font-medium leading-relaxed">
                  “{t.quote}”
                </p>

                {/* Personal Story Details */}
                <p className="text-sm text-[#2c1810]/75 font-sans font-light leading-relaxed">
                  {t.story}
                </p>
              </div>

              {/* Client & Occasion Footer */}
              <div className="pt-6 mt-6 border-t border-[#2c1810]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2c1810]">
                    {t.clientName}
                  </h4>
                  <span className="text-xs text-[#be3a4a] font-sans font-medium block">
                    {t.occasion}
                  </span>
                </div>
                <div className="text-[11px] font-sans text-[#2c1810]/60 italic">
                  Crafted: {t.cakeChosen}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
