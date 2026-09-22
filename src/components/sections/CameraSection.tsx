import React, { useState } from 'react';
import { CameraLens, CameraMode, ZoomLevel } from '../../types/nova';
import { NOVA_LENSES } from '../../data/novaData';
import { Camera, Aperture, Sparkles, ZoomIn, Moon, Video, Users, CheckCircle2 } from 'lucide-react';

export const CameraSection: React.FC = () => {
  const [selectedLens, setSelectedLens] = useState<CameraLens>(NOVA_LENSES[0]);
  const [cameraMode, setCameraMode] = useState<CameraMode>('photo');
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('1x');
  const [shutterFlash, setShutterFlash] = useState(false);

  // Zoom scale multiplier
  const zoomMultipliers: Record<ZoomLevel, number> = {
    '0.5x': 0.75,
    '1x': 1.0,
    '2x': 1.45,
    '5x': 2.1,
    '10x': 3.2,
    '50x': 5.0,
  };

  const handleTriggerShutter = () => {
    setShutterFlash(true);
    setTimeout(() => setShutterFlash(false), 200);
  };

  return (
    <section id="camera" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#07090e] border-t border-white/10 overflow-hidden">
      
      {/* Background ambient optical glow */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] rounded-full blur-[180px] opacity-15 bg-blue-500 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-tech font-bold uppercase tracking-[0.2em] text-blue-400">
            <Aperture className="w-3.5 h-3.5" />
            <span>SECTION 03 • COMPUTATIONAL OPTICS</span>
          </div>

          <h2 className="font-tech text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            See beyond the ordinary.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed">
            A folded periscope triple-sensor architecture powered by a 200MP 1/1.14-inch master sensor and continuous 10x true optical zoom. Capturing photons with scientific exactitude.
          </p>
        </div>

        {/* 3 Interactive Lens Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {NOVA_LENSES.map((lens) => {
            const isSelected = selectedLens.id === lens.id;
            return (
              <button
                key={lens.id}
                onClick={() => setSelectedLens(lens)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-blue-600/15 border-blue-500/60 shadow-xl shadow-blue-500/15'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/20 blur-xl rounded-full" />
                )}

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-tech font-bold uppercase tracking-widest text-slate-400">
                      {lens.name}
                    </span>
                    <span className="text-xs font-mono font-bold text-blue-400">
                      {lens.megapixels}
                    </span>
                  </div>

                  <h3 className="font-tech text-lg font-bold text-white">
                    {lens.focalLength}
                  </h3>

                  <p className="text-xs text-slate-300 font-sans line-clamp-2">
                    {lens.headline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Camera Viewfinder Simulation Workspace */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Interactive Viewfinder UI Screen (Col 8) */}
          <div className="lg:col-span-8 relative rounded-3xl bg-black border-2 border-white/15 overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[16/10] flex flex-col justify-between p-4 sm:p-6">
            
            {/* Background Sample Photo reacting to Zoom & Mode */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-500"
              style={{
                backgroundImage: `url(${selectedLens.photoSampleUrl})`,
                transform: `scale(${zoomMultipliers[zoomLevel]})`,
                filter: cameraMode === 'night' 
                  ? 'brightness(1.4) contrast(1.15) saturate(1.2)' 
                  : cameraMode === 'portrait'
                  ? 'contrast(1.05)'
                  : 'none',
              }}
            />

            {/* Shutter flash overlay effect */}
            {shutterFlash && (
              <div className="absolute inset-0 bg-white z-40 animate-out fade-out duration-200 pointer-events-none" />
            )}

            {/* Portrait Mode Creamy Bokeh Depth Blur Vignette */}
            {cameraMode === 'portrait' && (
              <div className="absolute inset-0 border-[28px] border-black/40 backdrop-blur-[4px] pointer-events-none transition-all duration-500" />
            )}

            {/* Rule of Thirds Grid Lines */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20">
              <div className="border-r border-b border-white" />
              <div className="border-r border-b border-white" />
              <div className="border-b border-white" />
              <div className="border-r border-b border-white" />
              <div className="border-r border-b border-white" />
              <div className="border-b border-white" />
              <div className="border-r border-white" />
              <div className="border-r border-white" />
              <div />
            </div>

            {/* Viewfinder Top Bar */}
            <div className="relative z-10 flex items-center justify-between px-2 text-xs font-mono text-white/90 drop-shadow-md">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 uppercase">
                  RAW 12-BIT
                </span>
                <span className="hidden sm:inline px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10">
                  {selectedLens.sensorSize}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px]">
                  OIS ACTIVE (12,000/s)
                </span>
              </div>
            </div>

            {/* Center Focus Reticle */}
            <div className="relative z-10 m-auto w-16 h-16 border-2 border-yellow-400/80 rounded-lg flex items-center justify-center pointer-events-none animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            </div>

            {/* Viewfinder Bottom Bar (Zoom Controls + Shutter + Modes) */}
            <div className="relative z-10 space-y-3 pt-2">
              
              {/* Zoom Selector Pills */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                {(['0.5x', '1x', '2x', '5x', '10x', '50x'] as const).map((z) => (
                  <button
                    key={z}
                    onClick={() => setZoomLevel(z)}
                    className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer backdrop-blur-md ${
                      zoomLevel === z
                        ? 'bg-yellow-400 text-black shadow-lg scale-110'
                        : 'bg-black/60 text-white/80 hover:text-white border border-white/15'
                    }`}
                  >
                    {z}
                  </button>
                ))}
              </div>

              {/* Camera Modes Strip */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs font-tech font-bold uppercase tracking-wider text-slate-400 overflow-x-auto no-scrollbar py-1">
                {(['photo', 'portrait', 'night', 'video', 'macro'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setCameraMode(mode)}
                    className={`transition-colors whitespace-nowrap cursor-pointer ${
                      cameraMode === mode ? 'text-yellow-400 scale-105' : 'hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              {/* Shutter Button & Gallery simulation */}
              <div className="flex items-center justify-center pt-1">
                <button
                  onClick={handleTriggerShutter}
                  className="w-14 h-14 rounded-full border-4 border-white p-1 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Capture Frame"
                >
                  <div className="w-full h-full rounded-full bg-white active:bg-slate-300 transition-colors shadow-lg" />
                </button>
              </div>

            </div>

          </div>

          {/* Lens Optical Specifications Card (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 backdrop-blur-md">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400">
                  OPTICAL PROFILE
                </span>
                <h3 className="font-tech text-2xl font-bold text-white">
                  {selectedLens.megapixels} • {selectedLens.aperture}
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {selectedLens.description}
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[10px] font-tech text-slate-400 uppercase tracking-widest block">
                  Hardware Breakthroughs
                </span>
                {selectedLens.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-300 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono text-blue-300">
                Active Simulation: {cameraMode.toUpperCase()} mode at {zoomLevel} magnification.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
