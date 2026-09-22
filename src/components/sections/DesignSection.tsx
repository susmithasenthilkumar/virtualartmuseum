import React, { useState } from 'react';
import { PhoneFinish, Hotspot } from '../../types/nova';
import { NOVA_HOTSPOTS } from '../../data/novaData';
import { NovaPhone3D } from '../3d/NovaPhone3D';
import { Sparkles, Eye, Shield, Compass, ChevronRight, Info } from 'lucide-react';

interface DesignSectionProps {
  finish: PhoneFinish;
}

export const DesignSection: React.FC<DesignSectionProps> = ({ finish }) => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(NOVA_HOTSPOTS[0]);
  const [currentView, setCurrentView] = useState<'free' | 'front' | 'back' | 'side' | 'isometric'>('free');

  // Angle presets
  const viewPresets: Record<string, { rotX: number; rotY: number; zoom?: number }> = {
    front: { rotX: 0.0, rotY: 0.0, zoom: 5.0 },
    back: { rotX: 0.0, rotY: Math.PI, zoom: 4.8 },
    side: { rotX: 0.0, rotY: Math.PI / 2, zoom: 4.9 },
    isometric: { rotX: 0.25, rotY: 0.6, zoom: 5.2 },
  };

  const handleSelectView = (view: 'front' | 'back' | 'side' | 'isometric') => {
    setCurrentView(view);
  };

  const handleHotspotClick = (spot: Hotspot) => {
    setActiveHotspot(spot);
    setCurrentView('free');
  };

  const targetAngle = currentView !== 'free' 
    ? viewPresets[currentView] 
    : activeHotspot.targetCameraAngle;

  return (
    <section id="design" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#07090e] border-t border-white/10 overflow-hidden">
      
      {/* Background radial lighting */}
      <div 
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] opacity-15 pointer-events-none"
        style={{ backgroundColor: finish.glowHex }}
      />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-tech font-bold uppercase tracking-[0.2em] text-blue-400">
            <Compass className="w-3.5 h-3.5" />
            <span>SECTION 01 • INDUSTRIAL ARCHITECTURE</span>
          </div>

          <h2 className="font-tech text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Designed to be seen.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed">
            Sculpted from Grade 5 aerospace titanium alloy. Seamless precision lines converge with crystalline ceramic back glass to craft a device of monolithic purity.
          </p>
        </div>

        {/* View Angle Quick Tabs */}
        <div className="flex items-center justify-center gap-2 p-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md max-w-md mx-auto">
          {(['front', 'back', 'side', 'isometric'] as const).map((view) => (
            <button
              key={view}
              onClick={() => handleSelectView(view)}
              className={`px-4 py-1.5 rounded-full text-xs font-tech tracking-wider uppercase transition-all cursor-pointer ${
                currentView === view
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {view}
            </button>
          ))}
        </div>

        {/* Main 3D Interactive Stage & Hotspots Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          
          {/* Left Column: Interactive Hotspot Selector & Active Card */}
          <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-[11px] font-tech text-slate-400 uppercase tracking-widest">
                Interactive Components
              </span>
              <span className="text-xs font-mono text-blue-400">
                0{NOVA_HOTSPOTS.findIndex((h) => h.id === activeHotspot.id) + 1} / 05
              </span>
            </div>

            {/* Hotspot buttons list */}
            <div className="space-y-2">
              {NOVA_HOTSPOTS.map((spot) => {
                const isActive = activeHotspot.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => handleHotspotClick(spot)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                      isActive
                        ? 'bg-blue-500/15 border-blue-500/50 shadow-lg shadow-blue-500/10'
                        : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <span className={`text-[10px] font-tech font-bold uppercase tracking-wider block ${
                        isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-400'
                      }`}>
                        {spot.name}
                      </span>
                      <h4 className="font-tech text-sm font-semibold text-white">
                        {spot.shortTitle}
                      </h4>
                    </div>

                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-blue-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Active Hotspot Deep Dive Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-blue-500/30 backdrop-blur-xl shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-tech font-bold uppercase tracking-wider text-blue-400">
                  Engineering Insight
                </span>
              </div>

              <h3 className="font-tech text-lg font-bold text-white leading-snug">
                {activeHotspot.headline}
              </h3>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {activeHotspot.description}
              </p>

              <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {activeHotspot.spec}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Large 3D Phone Viewer with Hotspots Target */}
          <div className="lg:col-span-8 relative h-[480px] sm:h-[580px] lg:h-[640px] rounded-3xl bg-gradient-to-b from-[#090c14] to-[#04060a] border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center order-1 lg:order-2">
            
            {/* Background grid */}
            <div className="absolute inset-0 bg-tech-dots opacity-30 pointer-events-none" />

            {/* Top corner label */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-tech text-slate-300">
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span>ACTIVE TARGET: {activeHotspot.shortTitle.toUpperCase()}</span>
            </div>

            {/* 3D Phone Component */}
            <NovaPhone3D
              finish={finish}
              interactive={true}
              autoRotate={false}
              targetAngle={targetAngle}
            />

          </div>

        </div>

      </div>
    </section>
  );
};
