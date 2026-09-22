import React from 'react';
import { PhoneFinish } from '../../types/nova';
import { NovaPhone3D } from '../3d/NovaPhone3D';
import { ArrowDown, Play, Sparkles, Shield, Cpu, Camera } from 'lucide-react';

interface HeroSectionProps {
  finish: PhoneFinish;
  onFinishChange: (finish: PhoneFinish) => void;
  finishes: PhoneFinish[];
  onExploreClick: () => void;
  onWatchExperienceClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  finish,
  onFinishChange,
  finishes,
  onExploreClick,
  onWatchExperienceClick,
}) => {
  return (
    <section 
      id="overview"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050508]"
    >
      {/* Cinematic Ambient Glow & Flares */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[180px] opacity-25 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: finish.glowHex }}
      />
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full blur-[140px] opacity-15 bg-blue-600 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full blur-[140px] opacity-15 bg-purple-600 pointer-events-none" />

      {/* Background Micro Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-40 pointer-events-none" />

      {/* Top Hero Text Intro */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4 pt-6">
        
        {/* Flagship Label Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-tech font-bold uppercase tracking-[0.25em] text-blue-400 backdrop-blur-md shadow-lg shadow-blue-500/10">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>NOVA X1 PRO MAX</span>
        </div>

        {/* Huge Display Heading */}
        <h1 className="font-tech text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05]">
          Technology,{' '}
          <span className="text-gradient-blue block sm:inline">
            Reimagined.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 font-sans font-light max-w-2xl mx-auto leading-relaxed">
          Power, intelligence and precision engineered into every detail.
        </p>

        {/* Dual Primary Action Buttons (Non-commercial) */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="px-7 py-3.5 rounded-full bg-white text-black hover:bg-slate-200 text-xs font-tech font-bold tracking-widest uppercase transition-all duration-300 shadow-xl shadow-white/10 hover:scale-105 flex items-center gap-2.5 cursor-pointer"
          >
            <span>Explore NOVA X1 PRO MAX</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={onWatchExperienceClick}
            className="px-6 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-tech font-bold tracking-widest uppercase transition-all duration-300 backdrop-blur-md hover:scale-105 flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
              <Play className="w-2.5 h-2.5 text-blue-400 fill-blue-400 ml-0.5" />
            </div>
            <span>Watch The Experience</span>
          </button>
        </div>

      </div>

      {/* Center 3D Smartphone Stage */}
      <div className="relative z-10 w-full max-w-3xl h-[460px] sm:h-[540px] lg:h-[620px] mx-auto my-2 flex items-center justify-center">
        <NovaPhone3D finish={finish} interactive={true} autoRotate={true} />
      </div>

      {/* Bottom Finish Selector & Key Innovations Strip */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-white/10">
        
        {/* Color Palette Switcher */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-tech text-slate-400 uppercase tracking-widest">
            Finish:
          </span>
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
            {finishes.map((f) => (
              <button
                key={f.id}
                onClick={() => onFinishChange(f)}
                className={`group relative p-1.5 rounded-full transition-all cursor-pointer ${
                  finish.id === f.id
                    ? 'ring-2 ring-blue-400 scale-110 shadow-lg shadow-blue-500/20'
                    : 'opacity-70 hover:opacity-100'
                }`}
                title={f.name}
              >
                <div 
                  className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
                  style={{ backgroundColor: f.hex }}
                />
              </button>
            ))}
          </div>
          <span className="text-xs font-sans font-medium text-slate-200">
            {finish.name}
          </span>
        </div>

        {/* 3 Pillar Highlights */}
        <div className="flex items-center gap-6 sm:gap-8 text-slate-400">
          <div className="flex items-center gap-2 text-xs font-mono">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>N1 Ultra 3nm</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <Camera className="w-4 h-4 text-blue-400" />
            <span>200MP Master Prism</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>Aerospace Titanium</span>
          </div>
        </div>

      </div>

    </section>
  );
};
