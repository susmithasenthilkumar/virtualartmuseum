import React from 'react';
import { PhoneFinish } from '../../types/nova';
import { NovaPhone3D } from '../3d/NovaPhone3D';
import { ArrowUp, Sparkles, Compass } from 'lucide-react';

interface FinalExperienceSectionProps {
  finish: PhoneFinish;
  onExploreTechnologyClick: () => void;
}

export const FinalExperienceSection: React.FC<FinalExperienceSectionProps> = ({
  finish,
  onExploreTechnologyClick,
}) => {
  return (
    <section className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-8 bg-[#030407] border-t border-white/10 flex flex-col justify-between overflow-hidden">
      
      {/* Cinematic subtle dark lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[240px] opacity-15 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: finish.glowHex }}
      />

      {/* Top Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-tech font-bold uppercase tracking-[0.2em] text-blue-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>NOVA X1 PRO MAX</span>
        </div>

        <h2 className="font-tech text-5xl sm:text-7xl font-black tracking-tight text-white leading-tight">
          Technology,{' '}
          <span className="text-gradient-blue block sm:inline">
            Reimagined.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-slate-400 font-sans font-light">
          Explore what comes next.
        </p>
      </div>

      {/* Center 3D Smartphone slowly rotating in deep space */}
      <div className="relative z-10 w-full max-w-2xl h-[420px] sm:h-[500px] mx-auto my-6 flex items-center justify-center">
        <NovaPhone3D
          finish={finish}
          interactive={true}
          autoRotate={true}
          showControls={false}
        />
      </div>

      {/* Bottom CTA Trigger (Non-purchase) */}
      <div className="relative z-10 text-center space-y-4">
        <button
          onClick={onExploreTechnologyClick}
          className="px-8 py-4 rounded-full bg-white text-black hover:bg-slate-200 text-xs font-tech font-bold tracking-widest uppercase transition-all duration-300 shadow-2xl hover:scale-105 inline-flex items-center gap-2.5 cursor-pointer"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Technology</span>
        </button>

        <p className="text-xs font-mono text-slate-500">
          Scroll to revisit the architecture, silicon, and optics.
        </p>
      </div>

    </section>
  );
};
