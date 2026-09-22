import React, { useState } from 'react';
import { NOVA_TIMELINE } from '../../data/novaData';
import { Sparkles, BookOpen, ChevronRight, Award, Compass } from 'lucide-react';

export const TechnologyStorySection: React.FC = () => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const activeStory = NOVA_TIMELINE[activeStepIdx];

  return (
    <section id="technology-story" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#07090e] border-t border-white/10 overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-15 bg-blue-500 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-tech font-bold uppercase tracking-[0.2em] text-blue-400">
            <BookOpen className="w-3.5 h-3.5" />
            <span>SECTION 13 • DESIGN GENESIS</span>
          </div>

          <h2 className="font-tech text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Every detail has a reason.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed">
            The narrative of how NOVA engineers dismantled mobile design paradigms to forge the X1 PRO MAX.
          </p>
        </div>

        {/* 5-Step Timeline Navigation Track */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 border-b border-white/10 pb-4">
            {NOVA_TIMELINE.map((item, idx) => {
              const isSelected = activeStepIdx === idx;
              return (
                <button
                  key={item.step}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`p-3 rounded-2xl text-left transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/10'
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'
                  }`}
                >
                  <span className={`font-mono text-xs font-bold block ${isSelected ? 'text-blue-400' : 'text-slate-500'}`}>
                    {item.step}
                  </span>
                  <h4 className="font-tech text-xs sm:text-sm font-bold text-white mt-1">
                    {item.phase.split(' ')[0]}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Editorial Deep-Dive Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#090b14] border border-white/15 p-6 sm:p-12 shadow-2xl space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
                PHASE {activeStory.step} • {activeStory.phase}
              </span>
              <h3 className="font-tech text-2xl sm:text-4xl font-bold text-white mt-1">
                {activeStory.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-sans font-light mt-1">
                {activeStory.subtitle}
              </p>
            </div>

            <div className="sm:shrink-0 bg-blue-500/10 px-4 py-2.5 rounded-2xl border border-blue-500/30 text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">KEY MILESTONE</span>
              <span className="font-tech text-sm sm:text-base font-bold text-blue-300">{activeStory.stats}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed">
                {activeStory.description}
              </p>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                <Award className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    TECHNICAL BREAKTHROUGH
                  </span>
                  <p className="text-xs sm:text-sm font-tech font-bold text-white">
                    {activeStory.breakthrough}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex items-center justify-center p-6 bg-black/40 rounded-2xl border border-white/5">
              <div className="text-center space-y-2">
                <span className="font-tech text-6xl font-black text-white/20">
                  {activeStory.step}
                </span>
                <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                  NOVA GENESIS PROTOCOL
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
