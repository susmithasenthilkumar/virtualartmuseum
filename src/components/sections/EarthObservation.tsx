import React, { useState } from 'react';
import {
  Globe,
  Droplets,
  Sprout,
  Building2,
  AlertTriangle,
  Radio,
  Satellite,
  Layers,
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import { EarthCanvas } from '../3d/EarthCanvas';
import { OBSERVATION_CATEGORIES } from '../../data/orbitaData';
import { ObservationCategory } from '../../types/orbita';

export const EarthObservation: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ObservationCategory>('WATER');

  const currentData =
    OBSERVATION_CATEGORIES.find((c) => c.id === selectedCategory) || OBSERVATION_CATEGORIES[0];

  const getCategoryIcon = (id: ObservationCategory) => {
    switch (id) {
      case 'CLIMATE':
        return <Globe className="w-4 h-4" />;
      case 'WATER':
        return <Droplets className="w-4 h-4" />;
      case 'AGRICULTURE':
        return <Sprout className="w-4 h-4" />;
      case 'URBAN GROWTH':
        return <Building2 className="w-4 h-4" />;
      case 'DISASTER MONITORING':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <section id="earth-observation" className="relative py-24 sm:py-32 bg-[#02040a] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-[#0284c7]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-space-grid pointer-events-none opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
              <span className="text-xs font-mono text-[#00f0ff] tracking-[0.25em] uppercase">
                SECTION 05 // PLANETARY REMOTE SENSING
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white uppercase">
              UNDERSTANDING <span className="text-gradient-cyan">OUR PLANET</span>
            </h2>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs tracking-wider uppercase flex items-center gap-2 self-start md:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>DEMO / SIMULATED DATA</span>
          </div>
        </div>

        {/* Category Pill Selector Bar */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          {OBSERVATION_CATEGORIES.map((cat) => {
            const isActive = cat.id === selectedCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-2.5 whitespace-nowrap border ${
                  isActive
                    ? 'bg-[#00f0ff]/15 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                    : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.id}</span>
              </button>
            );
          })}
        </div>

        {/* Split Grid: 3D Earth on Left + Observation Telemetry Dashboard on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: 3D Earth Scene Container */}
          <div className="lg:col-span-7 relative rounded-2xl border border-white/10 bg-[#060c1c]/90 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col min-h-[480px]">
            {/* Viewport Header */}
            <div className="p-4 border-b border-white/10 bg-[#030612]/90 flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <Satellite className="w-4 h-4 text-[#00f0ff]" />
                <span className="text-xs font-mono text-slate-200">
                  ORBITAL PASS: {currentData.id} SPECTRAL MATRIX
                </span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ACTIVE CONSTELLATION: {currentData.activeSatellites} SATS</span>
              </div>
            </div>

            {/* 3D Earth Canvas */}
            <div className="relative flex-1 w-full min-h-[420px]">
              <EarthCanvas
                interactive={true}
                showSatellite={true}
                activeCategory={selectedCategory}
                className="w-full h-full"
                cameraDistance={3.2}
              />

              {/* In-canvas active overlay HUD badge */}
              <div className="absolute bottom-4 left-4 z-10 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                  ACTIVE SENSOR BAND
                </div>
                <div className="text-[#00f0ff] font-semibold">{currentData.spectralBand}</div>
              </div>
            </div>
          </div>

          {/* Right: Simulated Remote Sensing Telemetry Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#070e20]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.6)] hud-corner-tl hud-corner-br">
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff]">
                  {getCategoryIcon(currentData.id)}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#00f0ff] tracking-widest uppercase block">
                    CATEGORY // {currentData.id}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white uppercase">
                    {currentData.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs font-mono text-[#38bdf8] mb-4">
                {currentData.tagline}
              </p>

              <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
                “{currentData.description}”
              </p>

              {/* Simulated Metrics Grid */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    SIMULATED OBSERVATIONAL METRICS
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30">
                    DEMO DATA
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {currentData.simulatedMetrics.map((metric, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-[#00f0ff]/30 transition-colors"
                    >
                      <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider mb-1">
                        {metric.label}
                      </span>
                      <div className="text-lg font-heading font-bold text-white mb-0.5">
                        {metric.value}
                      </div>
                      <div className="text-[10px] font-mono text-[#00f0ff] flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>{metric.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Telemetry specs: Resolution & Pass Timing */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Ground Sampling (GSD):</span>
                  <span className="text-white font-medium">{currentData.groundResolution}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Telemetry Downlink:</span>
                  <span className="text-[#00f0ff] font-medium">{currentData.dataRate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Last Simulated Pass:</span>
                  <span className="text-slate-300">{currentData.lastSimulatedPass}</span>
                </div>
              </div>
            </div>

            {/* Note at bottom */}
            <div className="pt-6 border-t border-white/10 text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>All planetary telemetry metrics displayed above represent simulated synthetic models.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
