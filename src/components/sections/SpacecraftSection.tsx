import React, { useState } from 'react';
import {
  RotateCcw,
  Sparkles,
  Layers,
  Eye,
  Radio,
  Cpu,
  Flame,
  Sun,
  Compass,
  Radar,
  Thermometer,
  ShieldCheck,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { SpacecraftCanvas } from '../3d/SpacecraftCanvas';
import { SPACECRAFT_HOTSPOTS } from '../../data/orbitaData';
import { HotspotId } from '../../types/orbita';

export const SpacecraftSection: React.FC = () => {
  const [selectedHotspotId, setSelectedHotspotId] = useState<HotspotId>('solar-arrays');
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [explodedView, setExplodedView] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const selectedHotspot =
    SPACECRAFT_HOTSPOTS.find((s) => s.id === selectedHotspotId) || SPACECRAFT_HOTSPOTS[0];

  const getSubsystemIcon = (id: HotspotId) => {
    switch (id) {
      case 'solar-arrays':
        return <Sun className="w-4 h-4 text-[#38bdf8]" />;
      case 'propulsion':
        return <Flame className="w-4 h-4 text-[#00f0ff]" />;
      case 'antenna':
        return <Radio className="w-4 h-4 text-[#818cf8]" />;
      case 'ai-compute':
        return <Cpu className="w-4 h-4 text-[#22d3ee]" />;
      case 'navigation':
        return <Compass className="w-4 h-4 text-[#38bdf8]" />;
      case 'sensors':
        return <Radar className="w-4 h-4 text-[#00f0ff]" />;
      case 'thermal':
        return <Thermometer className="w-4 h-4 text-[#f43f5e]" />;
    }
  };

  return (
    <section id="spacecraft" className="relative py-24 sm:py-32 bg-[#02040a] overflow-hidden">
      {/* Background technical grid and radial glow */}
      <div className="absolute inset-0 bg-space-grid pointer-events-none opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00f0ff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
              <span className="text-xs font-mono text-[#00f0ff] tracking-[0.25em] uppercase">
                SECTION 03 // VEHICLE ARCHITECTURE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white uppercase">
              MEET THE <span className="text-gradient-cyan">ORBITA SPACECRAFT</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-400 font-mono leading-relaxed">
            Engineered for high-reliability orbital intelligence. Interactive 3D visualization allows inspection of primary avionics, propulsion, and neural telemetry modules.
          </p>
        </div>

        {/* 3D Viewport & Interactive HUD Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main 3D Canvas Box (Left / Center) */}
          <div className="lg:col-span-8 relative rounded-2xl border border-white/10 bg-[#070d1d]/80 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col justify-between min-h-[520px]">
            {/* Top Toolbar */}
            <div className="p-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#02050f]/80 z-20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-slate-300 font-medium">
                  MODEL: ORBITA-BUS-GEN3
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                  INTERACTIVE PBR
                </span>
              </div>

              {/* Viewport Action Controls */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider uppercase transition-colors flex items-center gap-1.5 ${
                    autoRotate
                      ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                  title="Toggle continuous rotation"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">AUTO ROTATE</span>
                </button>

                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider uppercase transition-colors flex items-center gap-1.5 ${
                    wireframe
                      ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                  title="Toggle wireframe rendering"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">WIREFRAME</span>
                </button>

                <button
                  onClick={() => setExplodedView(!explodedView)}
                  className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider uppercase transition-colors flex items-center gap-1.5 ${
                    explodedView
                      ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                  title="Toggle exploded assembly view"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">EXPLODE</span>
                </button>

                <button
                  onClick={() => setResetTrigger((prev) => prev + 1)}
                  className="px-3 py-1.5 rounded text-xs font-mono tracking-wider uppercase bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors flex items-center gap-1.5"
                  title="Reset 3D camera to default"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">RESET</span>
                </button>
              </div>
            </div>

            {/* 3D Canvas Container */}
            <div className="relative flex-1 w-full min-h-[420px]">
              <SpacecraftCanvas
                selectedHotspotId={selectedHotspotId}
                onSelectHotspot={(id) => setSelectedHotspotId(id)}
                autoRotate={autoRotate}
                wireframe={wireframe}
                explodedView={explodedView}
                onResetTrigger={resetTrigger}
              />
            </div>

            {/* Horizontal Subsystem Selector Tabs (Below 3D) */}
            <div className="p-3 border-t border-white/10 bg-[#02050f]/90 z-20 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-2 min-w-max">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-2 pr-1">
                  HOTSPOTS:
                </span>
                {SPACECRAFT_HOTSPOTS.map((spot) => {
                  const isActive = spot.id === selectedHotspotId;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => setSelectedHotspotId(spot.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-200 flex items-center gap-2 border ${
                        isActive
                          ? 'bg-[#00f0ff]/15 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                          : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      {getSubsystemIcon(spot.id)}
                      <span>{spot.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Subsystem HUD Glass Information Panel */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-6 sm:p-8 rounded-2xl border border-[#00f0ff]/30 bg-[#071024]/90 backdrop-blur-2xl shadow-[0_0_35px_rgba(0,240,255,0.08)] flex-1 flex flex-col justify-between hud-corner-tl hud-corner-br">
              <div>
                {/* Panel Top Meta */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 font-bold">
                      {selectedHotspot.subsystemCode}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 tracking-wider">
                      STATUS: NOMINAL
                    </span>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-[#00f0ff]" />
                </div>

                {/* Subsystem Name & Tagline */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/30">
                    {getSubsystemIcon(selectedHotspot.id)}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-wide uppercase">
                      {selectedHotspot.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs font-mono text-[#38bdf8] mb-4">
                  {selectedHotspot.tagline}
                </p>

                <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
                  {selectedHotspot.shortDesc}
                </p>

                {/* Detailed Technical Specifications Table */}
                <div className="border border-white/10 rounded-xl bg-black/40 overflow-hidden mb-6">
                  <div className="px-3 py-2 bg-white/5 border-b border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                      TECHNICAL TELEMETRY SPECS
                    </span>
                    <span className="text-[10px] font-mono text-[#00f0ff]">SIMULATED</span>
                  </div>
                  <div className="divide-y divide-white/5">
                    {selectedHotspot.detailedSpecs.map((spec, i) => (
                      <div key={i} className="px-3 py-2.5 flex items-center justify-between text-xs">
                        <span className="font-mono text-slate-400">{spec.label}</span>
                        <span className="font-mono text-white font-medium text-right ml-2">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Navigation between hotspots */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-[11px] font-mono text-slate-400">
                  SUBSYSTEM {SPACECRAFT_HOTSPOTS.findIndex((s) => s.id === selectedHotspot.id) + 1} OF{' '}
                  {SPACECRAFT_HOTSPOTS.length}
                </div>
                <button
                  onClick={() => {
                    const currentIndex = SPACECRAFT_HOTSPOTS.findIndex(
                      (s) => s.id === selectedHotspot.id
                    );
                    const nextIndex = (currentIndex + 1) % SPACECRAFT_HOTSPOTS.length;
                    setSelectedHotspotId(SPACECRAFT_HOTSPOTS[nextIndex].id);
                  }}
                  className="px-3 py-1.5 rounded bg-white/5 hover:bg-[#00f0ff]/15 text-[#00f0ff] border border-white/10 hover:border-[#00f0ff]/40 text-xs font-mono tracking-wider flex items-center gap-1 transition-colors"
                >
                  <span>NEXT MODULE</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
