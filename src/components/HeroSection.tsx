import React from 'react';
import { Hero3DCake } from './Hero3DCake';
import { ChevronDown, Compass, Sparkles, Beaker, Flame } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('section-ingredients');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="section-hero"
      className="relative min-h-screen pt-24 pb-16 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#18110c] via-[#120e0b] to-[#140f0c]"
    >
      {/* Subtle atmospheric documentary background elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#d97736]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#c88a4c]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Documentary Narrative & Typography */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
            {/* Documentary badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-light text-xs tracking-widest text-[#f5dfb3] font-mono uppercase">
              <span className="w-2 h-2 rounded-full bg-[#d97736] animate-pulse" />
              <span>Interactive Culinary Science Exhibition</span>
            </div>

            {/* Main Title */}
            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#fbf6ec] leading-[1.08]">
              THE ART OF <br />
              <span className="italic font-display font-normal text-[#f5dfb3] underline decoration-[#d97736]/40 decoration-wavy decoration-1">
                CAKE MAKING
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-serif italic text-xl sm:text-2xl text-[#d4b996] max-w-xl mx-auto lg:mx-0 font-light">
              “From simple ingredients to a beautiful creation.”
            </p>

            {/* Exposition paragraph */}
            <p className="text-sm sm:text-base text-[#f7efe6]/75 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
              Every slice of cake represents an extraordinary convergence of biochemistry, thermal physics, and sculptural patience. Follow the micro-evolution from raw flour grains and egg proteins into an architectural masterpiece.
            </p>

            {/* Action CTA: EXPLORE THE JOURNEY */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                id="hero-explore-button"
                onClick={scrollToNext}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#d97736] to-[#b35e23] hover:from-[#e08445] hover:to-[#c66c2d] text-white font-medium text-sm tracking-wider uppercase shadow-xl shadow-[#d97736]/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                <span>EXPLORE THE JOURNEY</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-[#f7efe6]/60 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-[#d97736]" />
                <span>3D Interactive • 12 Chapters</span>
              </div>
            </div>

            {/* Documentary Feature Metrics */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div>
                <div className="flex items-center gap-1 text-xs text-[#d97736] font-mono">
                  <Beaker className="w-3 h-3" />
                  <span>EMULSION</span>
                </div>
                <div className="text-lg font-serif font-bold text-[#fbf6ec]">100%</div>
                <div className="text-[11px] text-[#f7efe6]/50">Biochemical Harmony</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs text-[#d97736] font-mono">
                  <Flame className="w-3 h-3" />
                  <span>OVEN SPRING</span>
                </div>
                <div className="text-lg font-serif font-bold text-[#fbf6ec]">175°C</div>
                <div className="text-[11px] text-[#f7efe6]/50">Protein Setting Peak</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs text-[#d97736] font-mono">
                  <Sparkles className="w-3 h-3" />
                  <span>DECORATION</span>
                </div>
                <div className="text-lg font-serif font-bold text-[#fbf6ec]">Artisanal</div>
                <div className="text-[11px] text-[#f7efe6]/50">Zero Synthetic Bounds</div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Freshly Decorated Cake */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl glass-panel p-2 sm:p-4 border border-[#f7efe6]/10 shadow-2xl">
              {/* Corner Accents */}
              <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-[#d97736]" />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-[#d97736]" />
              
              <Hero3DCake />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative flex flex-col items-center justify-center pt-8 text-center">
        <button
          onClick={scrollToNext}
          className="group flex flex-col items-center gap-1.5 text-xs text-[#f7efe6]/50 hover:text-[#f5dfb3] transition-colors focus:outline-none cursor-pointer"
        >
          <span className="tracking-widest uppercase font-mono text-[10px]">Begin Chapter 01</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#d97736]" />
        </button>
      </div>
    </section>
  );
};
