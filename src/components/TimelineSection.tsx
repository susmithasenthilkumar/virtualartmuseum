import React, { useState } from 'react';
import { TIMELINE_MILESTONES } from '../data/cakeData';
import { TimelineMilestone } from '../types/cake';
import { Clock, ShieldAlert, Award, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>('01');

  const sectionLinks: Record<string, string> = {
    '01': '#section-ingredients',
    '02': '#section-mixing',
    '03': '#section-baking',
    '04': '#section-cooling',
    '05': '#section-frosting',
    '06': '#section-lab',
    '07': '#section-final-creation',
  };

  return (
    <section id="section-timeline" className="py-24 relative bg-[#120e0b] text-[#f7efe6] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-[#d97736]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#d97736] tracking-widest uppercase mb-2">
            <span>Chapter 11</span>
            <span>•</span>
            <span>Master Process Blueprint</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#fbf6ec]">
            THE COMPLETE CAKE TIMELINE
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#d4b996] font-light leading-relaxed">
            The journey of cake making follows an unbroken chronological sequence of culinary discipline. Every stage builds on the mechanical foundation of the predecessor.
          </p>
        </div>

        {/* Timeline Horizontal / Vertical Connected Stepper */}
        <div className="relative">
          {/* Central Connecting Timeline Line */}
          <div className="hidden lg:block absolute left-8 top-10 bottom-10 w-[2px] bg-gradient-to-b from-[#d97736] via-[#f5dfb3]/50 to-[#d97736]" />

          <div className="space-y-6 lg:space-y-8">
            {TIMELINE_MILESTONES.map((item, index) => {
              const isActive = item.step === activeStep;
              const link = sectionLinks[item.step] || '#';

              return (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(item.step)}
                  className={`relative lg:ml-20 rounded-3xl p-6 sm:p-8 border transition-all cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#241710] to-[#18100b] border-[#d97736] shadow-2xl shadow-[#d97736]/15 ring-1 ring-[#d97736]/40'
                      : 'bg-white/4 border-white/6 hover:bg-white/7 hover:border-white/12'
                  }`}
                >
                  {/* Timeline Node Marker on the Line (Desktop) */}
                  <div
                    className={`hidden lg:flex absolute -left-20 top-8 w-16 h-16 rounded-2xl items-center justify-center font-mono text-sm font-bold border transition-transform ${
                      isActive
                        ? 'bg-[#d97736] text-white border-[#f5dfb3] scale-110 shadow-lg shadow-[#d97736]/30'
                        : 'bg-[#1e140e] text-[#f7efe6]/60 border-white/10 group-hover:scale-105'
                    }`}
                  >
                    {item.step}
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="lg:hidden px-2.5 py-1 rounded-md bg-[#d97736] text-white text-xs font-mono font-bold">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#fbf6ec] group-hover:text-[#f5dfb3]">
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#f5dfb3]">
                        <Clock className="w-3.5 h-3.5 text-[#d97736]" />
                        <span>{item.duration}</span>
                      </div>

                      <a
                        href={link}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full bg-white/5 hover:bg-[#d97736] text-[#f7efe6] hover:text-white transition-all border border-white/10 group-hover:border-transparent"
                        title="Jump to this chapter section"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Summary & Critical Rule */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 items-center">
                    <div className="md:col-span-7">
                      <p className="text-sm text-[#f7efe6]/85 font-light leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    <div className="md:col-span-5">
                      <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-start gap-2.5 text-xs text-[#f5dfb3]">
                        <ShieldAlert className="w-4 h-4 text-[#d97736] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-white">Critical Rule: </span>
                          <span className="font-light">{item.criticalRule}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
