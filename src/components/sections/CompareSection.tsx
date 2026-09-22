import React from 'react';
import { NOVA_COMPARISON } from '../../data/novaData';
import { ArrowLeftRight, Check, Sparkles, Minus } from 'lucide-react';

export const CompareSection: React.FC = () => {
  return (
    <section id="compare" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050508] border-t border-white/10 overflow-hidden">
      
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-tech font-bold uppercase tracking-[0.2em] text-blue-400">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>SECTION 12 • LINEUP COMPARISON</span>
          </div>

          <h2 className="font-tech text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Compare models.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed">
            Discover the ideal balance of portability, optical range, and extreme compute across the NOVA family.
          </p>

          <p className="text-xs font-mono text-slate-500">
            * Purely technical informational comparison. No e-commerce ordering.
          </p>
        </div>

        {/* Comparison Table Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {NOVA_COMPARISON.map((device) => {
            const isMax = device.isFlagship;
            return (
              <div
                key={device.name}
                className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 relative ${
                  isMax
                    ? 'bg-gradient-to-b from-blue-950/30 via-[#0a0d18] to-[#04060c] border-blue-500/50 shadow-2xl shadow-blue-500/10 ring-1 ring-blue-500/30'
                    : 'bg-white/[0.02] border-white/10'
                }`}
              >
                {/* Flagship Badge */}
                {isMax && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-tech font-bold uppercase tracking-widest shadow-md shadow-blue-600/50">
                    FLAGSHIP PINNACLE
                  </div>
                )}

                <div className="space-y-6">
                  {/* Model Header */}
                  <div className="text-center pb-6 border-b border-white/10 space-y-1">
                    <h3 className="font-tech text-2xl font-bold text-white">
                      {device.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans">
                      {device.tagline}
                    </p>
                  </div>

                  {/* Spec Items Stack */}
                  <div className="space-y-4 text-xs font-sans">
                    
                    {/* Display */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-slate-400">Display</span>
                      <p className="font-tech font-semibold text-white">{device.display}</p>
                      <p className="text-[11px] text-slate-400">{device.refreshRate}</p>
                    </div>

                    {/* Chipset */}
                    <div className="space-y-1 pt-3 border-t border-white/5">
                      <span className="text-[10px] font-mono uppercase text-slate-400">Processor</span>
                      <p className="font-tech font-semibold text-white">{device.chipset}</p>
                    </div>

                    {/* Camera */}
                    <div className="space-y-1 pt-3 border-t border-white/5">
                      <span className="text-[10px] font-mono uppercase text-slate-400">Camera System</span>
                      <p className="font-tech font-semibold text-white">{device.cameraMain}</p>
                      <p className="text-[11px] text-blue-400 font-medium">{device.cameraZoom}</p>
                    </div>

                    {/* Battery */}
                    <div className="space-y-1 pt-3 border-t border-white/5">
                      <span className="text-[10px] font-mono uppercase text-slate-400">Battery & Charging</span>
                      <p className="font-tech font-semibold text-white">{device.battery}</p>
                      <p className="text-[11px] text-slate-400">{device.charging}</p>
                    </div>

                    {/* AI Engine */}
                    <div className="space-y-1 pt-3 border-t border-white/5">
                      <span className="text-[10px] font-mono uppercase text-slate-400">On-Device Intelligence</span>
                      <p className="font-tech font-semibold text-white">{device.aiEngine}</p>
                    </div>

                    {/* Chassis Materials */}
                    <div className="space-y-1 pt-3 border-t border-white/5">
                      <span className="text-[10px] font-mono uppercase text-slate-400">Chassis & Craft</span>
                      <p className="font-tech font-semibold text-white">{device.materials}</p>
                    </div>

                    {/* Satellite SOS */}
                    <div className="space-y-1 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-slate-400">Satellite SOS</span>
                      {device.satellite ? (
                        <span className="text-emerald-400 flex items-center gap-1 font-mono text-xs font-bold">
                          <Check className="w-3.5 h-3.5" /> Included
                        </span>
                      ) : (
                        <span className="text-slate-500 font-mono text-xs">
                          <Minus className="w-3.5 h-3.5 inline" />
                        </span>
                      )}
                    </div>

                  </div>
                </div>

                {/* Informational Action (No Purchase) */}
                <div className="pt-6 mt-6 border-t border-white/10">
                  <a
                    href="#specifications"
                    className="w-full py-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-tech font-bold uppercase tracking-wider transition-colors flex items-center justify-center"
                  >
                    View Specs Details
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
