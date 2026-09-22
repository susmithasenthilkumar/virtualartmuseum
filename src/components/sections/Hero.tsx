import React from 'react';
import { ArrowDown, Satellite, Compass, Activity, ShieldCheck, ChevronRight } from 'lucide-react';
import { EarthCanvas } from '../3d/EarthCanvas';

interface HeroProps {
  onExploreTechnologyClick: () => void;
  onViewMissionsClick: () => void;
  onExploreOrbitClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreTechnologyClick,
  onViewMissionsClick,
  onExploreOrbitClick,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-8 overflow-hidden bg-[#02040a]"
    >
      {/* 3D Background: Cinematic Earth viewed from space at night */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <EarthCanvas
          interactive={true}
          showSatellite={true}
          className="w-full h-full min-h-screen opacity-90"
          cameraDistance={3.5}
        />
      </div>

      {/* Atmospheric gradient overlay at top and bottom to blend smoothly */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/80 via-transparent to-[#02040a] pointer-events-none z-10" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-[140px] pointer-events-none z-10" />

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center my-auto py-12">
        <div className="max-w-3xl">
          {/* Top Aerospace Telemetry Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#071329]/80 border border-[#00f0ff]/30 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            <span className="font-mono text-[11px] text-[#00f0ff] tracking-[0.2em] uppercase font-semibold">
              ORBITA AEROSPACE // ORBITAL SYSTEMS
            </span>
            <span className="text-white/20">|</span>
            <span className="font-mono text-[11px] text-slate-300 tracking-wider">
              ALT: 542 KM
            </span>
          </div>

          {/* Main Cinematic Heading */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-black tracking-tight text-white uppercase leading-[0.95] mb-6">
            ENGINEERING <br />
            <span className="text-gradient-cyan">BEYOND EARTH</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-slate-300 font-sans font-light leading-relaxed max-w-2xl mb-10">
            Building intelligent space systems for a connected and sustainable future. Autonomous orbital platforms engineered to observe, protect, and expand humanity’s frontier.
          </p>

          {/* Buttons: EXPLORE OUR TECHNOLOGY, VIEW MISSIONS */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              onClick={onExploreTechnologyClick}
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg bg-[#00f0ff] hover:bg-[#38bdf8] text-black font-mono font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_35px_rgba(0,240,255,0.4)] hover:shadow-[0_0_50px_rgba(0,240,255,0.6)] flex items-center gap-2 group cursor-pointer"
            >
              <span>EXPLORE OUR TECHNOLOGY</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onViewMissionsClick}
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg bg-[#071329]/90 hover:bg-[#0c1f3d] text-slate-200 hover:text-white border border-white/20 hover:border-[#00f0ff]/50 font-mono text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 backdrop-blur-md flex items-center gap-2 cursor-pointer"
            >
              <span>VIEW MISSIONS</span>
            </button>

            <button
              onClick={onExploreOrbitClick}
              className="px-4 py-3.5 sm:py-4 rounded-lg bg-transparent text-[#00f0ff] hover:bg-[#00f0ff]/10 font-mono text-xs tracking-widest uppercase transition-colors flex items-center gap-2 border border-transparent hover:border-[#00f0ff]/30 cursor-pointer"
            >
              <Satellite className="w-4 h-4" />
              <span>ORBIT SIMULATOR</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Information Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-3 sm:p-4 rounded-xl border border-white/10 bg-[#040816]/75 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs font-mono shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          {/* Left item */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            <div>
              <span className="text-slate-400 block text-[10px] tracking-widest uppercase">
                ENTITY / DIVISION
              </span>
              <span className="text-white font-semibold tracking-wider">
                ORBITA / SPACE SYSTEMS
              </span>
            </div>
          </div>

          {/* Center item 1 */}
          <div className="hidden sm:flex items-center gap-3 border-l border-white/10 pl-4">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-slate-400 block text-[10px] tracking-widest uppercase">
                MISSION STATUS
              </span>
              <span className="text-emerald-400 font-semibold tracking-wider">
                OPERATIONAL (NOMINAL)
              </span>
            </div>
          </div>

          {/* Center item 2 */}
          <div className="hidden md:flex items-center gap-3 border-l border-white/10 pl-4">
            <Activity className="w-4 h-4 text-[#38bdf8]" />
            <div>
              <span className="text-slate-400 block text-[10px] tracking-widest uppercase">
                TELEMETRY FEED
              </span>
              <span className="text-[#38bdf8] font-semibold tracking-wider">
                542 KM • 7.61 KM/S
              </span>
            </div>
          </div>

          {/* Right item */}
          <div className="flex items-center gap-3 border-l border-white/10 pl-4">
            <div className="px-2 py-1 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-[10px] tracking-widest uppercase font-bold">
              DATA MODE: SIMULATION
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-4">
          <a
            href="#mission"
            className="text-slate-400 hover:text-[#00f0ff] transition-colors p-2 flex flex-col items-center gap-1 group"
            aria-label="Scroll to Section 02"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 group-hover:text-[#00f0ff]">
              SCROLL DOWN
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#00f0ff]" />
          </a>
        </div>
      </div>
    </section>
  );
};
