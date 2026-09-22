import React, { useState } from 'react';
import { MIXING_STEPS } from '../data/cakeData';
import { playWhiskSound } from '../utils/audioSynth';
import { Play, RotateCcw, Sparkles, Beaker, Check, ArrowRight } from 'lucide-react';

export const MixingSection: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isMixingActive, setIsMixingActive] = useState(false);

  const step = MIXING_STEPS[currentStepIndex];

  const handleStepChange = (index: number) => {
    playWhiskSound();
    setIsMixingActive(true);
    setCurrentStepIndex(index);
    setTimeout(() => setIsMixingActive(false), 600);
  };

  const handleNext = () => {
    if (currentStepIndex < MIXING_STEPS.length - 1) {
      handleStepChange(currentStepIndex + 1);
    }
  };

  const handleReset = () => {
    handleStepChange(0);
  };

  return (
    <section id="section-mixing" className="py-24 relative bg-[#120e0b] text-[#f7efe6] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#d97736]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#d97736] tracking-widest uppercase mb-2">
            <span>Chapter 02</span>
            <span>•</span>
            <span>Mechanical Aeration</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#fbf6ec]">
            THE ART OF MIXING
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#d4b996] font-light leading-relaxed">
            Mixing is not merely blending ingredients; it is the physical architecture of micro-aeration. Sugar crystals physically gouge air pockets into soft butter fat, while natural lecithin bridges fat and liquid into a stable emulsion.
          </p>
        </div>

        {/* Interactive Mixing Chamber */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Visual Mixing Bowl Simulation */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col items-center">
              
              {/* Bowl Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-4 border-[#3a2c24] bg-gradient-to-b from-[#1f1712] to-[#0e0a08] p-4 shadow-2xl flex items-center justify-center overflow-hidden">
                
                {/* Internal Batter Fluid Simulation */}
                <div
                  className={`w-full h-full rounded-full transition-all duration-700 ease-out relative flex items-center justify-center shadow-inner ${
                    isMixingActive ? 'scale-105 rotate-180 blur-[0.5px]' : 'scale-100 rotate-0'
                  }`}
                  style={{
                    backgroundColor: step.color,
                    boxShadow: 'inset 0 10px 25px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Surface Swirls & Texture patterns representing state */}
                  {step.visualState === 'creamed' && (
                    <div className="absolute inset-4 rounded-full border-4 border-dashed border-[#e6b800]/30 animate-spin" style={{ animationDuration: '20s' }} />
                  )}

                  {step.visualState === 'emulsified' && (
                    <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-yellow-300/40 via-transparent to-amber-500/30 animate-pulse" />
                  )}

                  {step.visualState === 'folded' && (
                    <div className="absolute inset-8 rounded-full border-2 border-[#8c5e3d]/40 border-dotted" />
                  )}

                  {step.visualState === 'smooth_batter' && (
                    <div className="absolute inset-3 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/20" />
                  )}

                  {/* Whisk Silhouette Animation */}
                  <div
                    className={`relative z-10 w-24 h-24 rounded-full border-2 border-black/40 flex items-center justify-center transition-transform duration-500 ${
                      isMixingActive ? 'scale-125 rotate-90' : 'scale-100 rotate-0'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full border border-black/30 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-black/60 animate-bounce" />
                    </div>
                  </div>

                  {/* Floating Micro Air Bubbles (Physical Aeration) */}
                  <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-white/50 blur-[0.5px] animate-ping" />
                  <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-white/60 blur-[0.5px] animate-pulse" />
                  <div className="absolute top-1/2 right-1/3 w-2.5 h-2.5 rounded-full bg-white/40 blur-[0.5px]" />
                </div>

                {/* Mixing motion blur ring */}
                {isMixingActive && (
                  <div className="absolute inset-0 rounded-full border-4 border-[#d97736]/60 animate-ping pointer-events-none" />
                )}
              </div>

              {/* Consistency Readout */}
              <div className="mt-6 text-center">
                <span className="text-[11px] font-mono text-[#d97736] uppercase tracking-wider block">
                  Current Batter Consistency
                </span>
                <span className="font-serif text-sm sm:text-base text-[#fbf6ec] font-medium block mt-1">
                  {step.consistency}
                </span>
              </div>

              {/* Quick Action Navigation Controls */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-[#f7efe6]/70 hover:text-white transition-colors flex items-center gap-1.5"
                  title="Reset to step 1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart</span>
                </button>

                {currentStepIndex < MIXING_STEPS.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-full bg-[#d97736] hover:bg-[#b35e23] text-xs font-medium tracking-wider uppercase text-white shadow-lg shadow-[#d97736]/25 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next Mixing Stage</span>
                    <Play className="w-3 h-3 fill-white" />
                  </button>
                ) : (
                  <span className="px-5 py-2 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Emulsion Complete</span>
                  </span>
                )}
              </div>

            </div>
          </div>

          {/* Right Column: Step Timeline & Scientific Explanations */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Step Selection Buttons */}
            <div className="space-y-3">
              {MIXING_STEPS.map((s, idx) => {
                const isActive = idx === currentStepIndex;
                const isPassed = idx < currentStepIndex;

                return (
                  <button
                    key={s.step}
                    onClick={() => handleStepChange(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-start justify-between cursor-pointer group ${
                      isActive
                        ? 'bg-gradient-to-r from-[#241710] to-[#1a110c] border-[#d97736] shadow-xl shadow-[#d97736]/20'
                        : isPassed
                        ? 'bg-white/5 border-white/10 opacity-75 hover:opacity-100'
                        : 'bg-white/3 border-white/5 hover:bg-white/6 opacity-50 hover:opacity-85'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Step Number Badge */}
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                          isActive
                            ? 'bg-[#d97736] text-white shadow-md'
                            : isPassed
                            ? 'bg-emerald-800 text-emerald-200'
                            : 'bg-white/10 text-white/50'
                        }`}
                      >
                        {isPassed ? <Check className="w-3.5 h-3.5" /> : `0${s.step}`}
                      </span>

                      <div>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-[#fbf6ec] group-hover:text-[#f5dfb3] transition-colors">
                          {s.title}
                        </h4>
                        <span className="text-xs text-[#d97736] font-mono block mt-0.5">
                          {s.subtitle}
                        </span>

                        {isActive && (
                          <div className="mt-3 space-y-3 text-xs text-[#f7efe6]/80 leading-relaxed font-light">
                            <p>{s.description}</p>
                            <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-start gap-2 text-[#f5dfb3]">
                              <Beaker className="w-3.5 h-3.5 text-[#d97736] shrink-0 mt-0.5" />
                              <span>{s.scienceNote}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-[#d97736] translate-x-1' : 'text-white/20 group-hover:text-white/40'}`} />
                  </button>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
