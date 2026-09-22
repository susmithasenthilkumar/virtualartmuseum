import React from 'react';
import { PhoneFinish } from '../../types/nova';
import { NovaPhone3D } from '../3d/NovaPhone3D';
import { Palette, Sparkles, Check, Layers } from 'lucide-react';

interface ColorsSectionProps {
  finish: PhoneFinish;
  onFinishChange: (finish: PhoneFinish) => void;
  finishes: PhoneFinish[];
}

export const ColorsSection: React.FC<ColorsSectionProps> = ({
  finish,
  onFinishChange,
  finishes,
}) => {
  return (
    <section id="colors" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050508] border-t border-white/10 overflow-hidden">
      
      {/* Background ambient color bloom */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[220px] opacity-20 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: finish.glowHex }}
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-tech font-bold uppercase tracking-[0.2em] text-blue-400">
            <Palette className="w-3.5 h-3.5" />
            <span>SECTION 10 • CHROMATIC FINISHES</span>
          </div>

          <h2 className="font-tech text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Choose your expression.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed">
            Four master finishes, each bonded with specialized physical vapor deposition coatings and nanoscale crystalline layers to refract natural light with quiet depth.
          </p>
        </div>

        {/* 3D Color Viewer & Selector Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 3D Phone Preview displaying active finish */}
          <div className="lg:col-span-7 relative h-[480px] sm:h-[560px] rounded-3xl bg-gradient-to-b from-[#090b14] to-[#04060a] border border-white/15 overflow-hidden shadow-2xl flex items-center justify-center">
            
            <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-xs font-mono text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: finish.hex }} />
              <span>ACTIVE FINISH: {finish.name.toUpperCase()}</span>
            </div>

            <NovaPhone3D
              finish={finish}
              interactive={true}
              autoRotate={true}
              showControls={true}
            />
          </div>

          {/* Right: 4 Finish Cards and Material Detail */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="space-y-3">
              {finishes.map((f) => {
                const isSelected = finish.id === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => onFinishChange(f)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-center gap-4 ${
                      isSelected
                        ? 'bg-white/[0.08] border-blue-400 shadow-xl shadow-blue-500/10 scale-[1.02]'
                        : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20'
                    }`}
                  >
                    {/* Color Swatch Circle */}
                    <div 
                      className="w-10 h-10 rounded-full border-2 border-white/30 shrink-0 shadow-inner flex items-center justify-center"
                      style={{ backgroundColor: f.hex }}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                    </div>

                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-tech text-base font-bold text-white">
                          {f.name}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400">
                          {f.finishType}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-sans line-clamp-1">
                        {f.tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Finish Material Breakdown */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                <Layers className="w-3.5 h-3.5" />
                <span>MATERIAL COMPOSITION</span>
              </div>
              <h3 className="font-tech text-lg font-bold text-white">
                {finish.name} • {finish.finishType}
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {finish.description}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
