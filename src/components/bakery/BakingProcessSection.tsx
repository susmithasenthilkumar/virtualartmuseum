import React, { useState } from 'react';
import { BAKING_PROCESS } from '../../data/bakeryData';
import { BakingProcessStep } from '../../types/bakery';
import { Sparkles, ArrowRight, Clock, Award, Compass, ChevronRight } from 'lucide-react';

export const BakingProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = BAKING_PROCESS[activeStepIndex];

  return (
    <section id="process" className="py-24 sm:py-32 relative bg-[#2c1810] text-[#faf6f0] overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#c59b6d]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#be3a4a]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-widest text-[#c59b6d] uppercase mb-2">
            <span>Chapter IV</span>
            <span>•</span>
            <span>The Five Pillars</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#faf6f0]">
            THE ART OF BAKING
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#faf6f0]/75 font-sans font-light leading-relaxed">
            Great pastry is born of precision and patience. Journey through the five stages that guide every dough, batter, and confection from raw harvest to your celebratory table.
          </p>
        </div>

        {/* Process Stepper Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
          {BAKING_PROCESS.map((p, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={p.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative group ${
                  isActive
                    ? 'bg-[#faf6f0] text-[#2c1810] border-[#faf6f0] shadow-xl scale-[1.03]'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white'
                }`}
              >
                <span className={`text-xs font-mono font-bold block ${isActive ? 'text-[#be3a4a]' : 'text-[#c59b6d]'}`}>
                  STAGE {p.step}
                </span>
                <span className="font-serif text-base sm:text-lg font-bold block mt-1">
                  {p.title}
                </span>
                <span className="text-[11px] font-sans opacity-70 block mt-0.5 truncate">
                  {p.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep-Dive Showcase */}
        <div className="rounded-3xl glass-chocolate border border-white/15 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Detail Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-[#be3a4a]/20 border border-[#be3a4a]/30 text-xs font-mono font-bold text-[#faf6f0]">
                  STAGE {currentStep.step} OF 05
                </span>
                <div className="flex items-center gap-1.5 text-xs font-sans text-[#c59b6d]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentStep.timeframe}</span>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#faf6f0]">
                  {currentStep.title}: {currentStep.subtitle}
                </h3>
              </div>

              <p className="text-base sm:text-lg text-[#faf6f0]/85 font-sans font-light leading-relaxed">
                {currentStep.description}
              </p>

              {/* Artisan Detail Highlight */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#c59b6d]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Baker’s Craft Observation</span>
                </div>
                <p className="text-xs sm:text-sm text-[#faf6f0]/90 font-sans font-light leading-relaxed">
                  {currentStep.artisanDetail}
                </p>
              </div>

              {/* Stepper Controls */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-5 py-2.5 rounded-full border border-white/20 text-xs font-sans font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                >
                  Previous Stage
                </button>

                <div className="flex items-center gap-1.5">
                  {BAKING_PROCESS.map((_, i) => (
                    <span
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === activeStepIndex ? 'w-6 bg-[#be3a4a]' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>

                <button
                  disabled={activeStepIndex === BAKING_PROCESS.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(BAKING_PROCESS.length - 1, prev + 1))}
                  className="px-5 py-2.5 rounded-full bg-[#faf6f0] hover:bg-white text-[#2c1810] text-xs font-sans font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next Stage
                </button>
              </div>

            </div>

            {/* Right Editorial Illustration Column */}
            <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/15">
              <img
                src={
                  activeStepIndex === 0
                    ? 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80'
                    : activeStepIndex === 1
                    ? 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=900&q=80'
                    : activeStepIndex === 2
                    ? 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80'
                    : activeStepIndex === 3
                    ? 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=900&q=80'
                    : 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=900&q=80'
                }
                alt={currentStep.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-serif italic text-white/90">
                “Discipline in the small things yields transcendence in the final crumb.”
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
