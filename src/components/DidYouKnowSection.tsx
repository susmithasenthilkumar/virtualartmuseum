import React, { useState } from 'react';
import { DID_YOU_KNOW_CARDS } from '../data/cakeData';
import { FactCard } from '../types/cake';
import { HelpCircle, ChevronRight, Sparkles, BookOpen, Flame, ThermometerSnowflake, Feather, Coffee } from 'lucide-react';

export const DidYouKnowSection: React.FC = () => {
  const [activeCardId, setActiveCardId] = useState<string>(DID_YOU_KNOW_CARDS[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#e63946]" />;
      case 'ThermometerSnowflake':
        return <ThermometerSnowflake className="w-5 h-5 text-[#457b9d]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#ffd166]" />;
      case 'Feather':
        return <Feather className="w-5 h-5 text-[#2a9d8f]" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-[#d97736]" />;
      default:
        return <HelpCircle className="w-5 h-5 text-[#d97736]" />;
    }
  };

  return (
    <section id="section-did-you-know" className="py-24 relative bg-[#140f0c] text-[#f7efe6] overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#d97736]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#d97736] tracking-widest uppercase mb-2">
            <span>Chapter 10</span>
            <span>•</span>
            <span>Kitchen Laboratory Mysteries</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#fbf6ec]">
            DID YOU KNOW?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#d4b996] font-light leading-relaxed">
            The mysteries behind common baking triumphs and disasters. Click each inquiry to reveal the molecular science that resolves everyday kitchen enigmas.
          </p>
        </div>

        {/* Interactive Cards & Answer Reveal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Inquiry Cards */}
          <div className="lg:col-span-6 space-y-3">
            {DID_YOU_KNOW_CARDS.map((card, idx) => {
              const isActive = card.id === activeCardId;
              return (
                <button
                  key={card.id}
                  onClick={() => setActiveCardId(card.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#291b13] to-[#1c130d] border-[#d97736] shadow-xl shadow-[#d97736]/20 translate-x-1.5 ring-1 ring-[#d97736]/40'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 shrink-0">
                      {getIcon(card.iconName)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#d97736]">
                        <span>Query 0{idx + 1}</span>
                      </div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-[#fbf6ec] group-hover:text-[#f5dfb3] mt-0.5">
                        {card.question}
                      </h4>
                      <p className="text-xs text-[#f7efe6]/60 line-clamp-1 mt-1 font-light">
                        {card.summary}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className={`w-5 h-5 shrink-0 transition-transform ${isActive ? 'text-[#d97736] translate-x-1' : 'text-white/20 group-hover:text-white/50'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Scientific Answer Reveal Spotlight */}
          <div className="lg:col-span-6">
            {(() => {
              const active = DID_YOU_KNOW_CARDS.find((c) => c.id === activeCardId) || DID_YOU_KNOW_CARDS[0];
              return (
                <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-[#d97736]/30 shadow-2xl relative overflow-hidden space-y-6">
                  {/* Inquiry Header */}
                  <div className="flex items-start gap-4 pb-6 border-b border-white/10">
                    <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 shadow-inner">
                      {getIcon(active.iconName)}
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase text-[#d97736] tracking-wider block">
                        Scientific Resolution
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf6ec] mt-1">
                        {active.question}
                      </h3>
                    </div>
                  </div>

                  {/* Summary Core Principle */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] font-mono text-[#d97736] uppercase block">
                      Core Thermodynamic Principle
                    </span>
                    <p className="text-sm font-serif italic text-[#f5dfb3] mt-1">
                      “{active.summary}”
                    </p>
                  </div>

                  {/* Full Scientific Answer */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono uppercase text-[#f7efe6]/60 block">
                      Mechanistic Breakdown
                    </span>
                    <p className="text-sm sm:text-base text-[#f7efe6]/85 leading-relaxed font-light">
                      {active.fullAnswer}
                    </p>
                  </div>

                  {/* Baker's Golden Rule / Science Highlight */}
                  <div className="p-4 rounded-2xl bg-[#d97736]/10 border border-[#d97736]/30 space-y-1">
                    <span className="text-xs font-mono uppercase text-[#f5dfb3] flex items-center gap-1.5 font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-[#d97736]" />
                      <span>Baker's Rule of Thumb</span>
                    </span>
                    <p className="text-xs sm:text-sm text-[#fbf6ec]/90 leading-relaxed font-light">
                      {active.scienceHighlight}
                    </p>
                  </div>

                </div>
              );
            })()}
          </div>

        </div>

      </div>
    </section>
  );
};
