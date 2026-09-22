import React, { useState } from 'react';
import { CONNECTIVITY_NODES } from '../../data/novaData';
import { ConnectivityItem } from '../../types/nova';
import { Wifi, Globe, Radio, Disc, Cable, Sparkles, CheckCircle2 } from 'lucide-react';

export const ConnectivitySection: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<ConnectivityItem>(CONNECTIVITY_NODES[0]);

  return (
    <section id="technology" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050508] border-t border-white/10 overflow-hidden">
      
      {/* Background ambient network glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[200px] opacity-15 bg-blue-600 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-tech font-bold uppercase tracking-[0.2em] text-blue-400">
            <Radio className="w-3.5 h-3.5" />
            <span>SECTION 08 • GLOBAL INFRASTRUCTURE</span>
          </div>

          <h2 className="font-tech text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Connected everywhere.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed">
            From low-orbit emergency satellites to Wi-Fi 7 and 40Gbps Thunderbolt ports. Engineered for persistent, latency-free global throughput.
          </p>
        </div>

        {/* Global Network Map Simulation with Pulsing Orbital Nodes */}
        <div className="relative max-w-5xl mx-auto rounded-3xl bg-[#090b14] border border-white/15 p-6 sm:p-10 shadow-2xl overflow-hidden min-h-[420px] flex flex-col justify-between">
          
          {/* Animated Matrix Map Vector Grid */}
          <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />

          {/* Interactive World Map Node Dots */}
          <div className="relative z-10 w-full h-48 sm:h-64 flex items-center justify-center">
            
            {/* Ambient Orbital Rings */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-blue-500/20 border-dashed animate-spin" style={{ animationDuration: '45s' }} />
            <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-purple-500/20" />

            {/* Glowing Map Hubs */}
            {[
              { id: '5g', top: '35%', left: '25%', label: 'Tokyo Node' },
              { id: 'wifi7', top: '55%', left: '72%', label: 'London Gateway' },
              { id: 'satellite', top: '20%', left: '50%', label: 'Orbital Satellite Alpha' },
              { id: 'usbc', top: '68%', left: '40%', label: 'Direct 40Gbps Bus' },
            ].map((node) => {
              const isCurrent = selectedTech.id === node.id;
              return (
                <div
                  key={node.label}
                  className="absolute cursor-pointer group"
                  style={{ top: node.top, left: node.left }}
                  onClick={() => {
                    const found = CONNECTIVITY_NODES.find((c) => c.id === node.id);
                    if (found) setSelectedTech(found);
                  }}
                >
                  <div className={`w-3.5 h-3.5 rounded-full transition-transform duration-300 ${
                    isCurrent ? 'bg-blue-400 scale-150 ring-4 ring-blue-500/40' : 'bg-slate-500 group-hover:scale-125'
                  }`} />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono text-slate-400 bg-black/80 px-2 py-0.5 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {node.label}
                  </span>
                </div>
              );
            })}

            <div className="text-center space-y-1 z-10 pointer-events-none">
              <Globe className="w-12 h-12 text-blue-400 mx-auto animate-pulse" />
              <p className="font-tech text-xs tracking-widest text-slate-300 uppercase">
                GLOBAL MESH ACTIVE
              </p>
            </div>

          </div>

          {/* Active Connectivity Technology Detail Card */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">
                  {selectedTech.standard}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {selectedTech.badge}
                </span>
              </div>
              <h3 className="font-tech text-xl sm:text-2xl font-bold text-white">
                {selectedTech.name}
              </h3>
              <p className="text-xs text-slate-300 font-sans max-w-xl">
                {selectedTech.description}
              </p>
            </div>

            <div className="text-right sm:shrink-0 bg-white/[0.04] p-3.5 rounded-2xl border border-white/10">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">PEAK BANDWIDTH</span>
              <span className="font-tech text-xl font-black text-blue-400">{selectedTech.speed}</span>
            </div>
          </div>

        </div>

        {/* 5 Interactive Technology Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
          {CONNECTIVITY_NODES.map((node) => {
            const isSelected = selectedTech.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedTech(node)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-xl shadow-blue-500/10'
                    : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 block">
                  STANDARD
                </span>
                <h4 className="font-tech text-xs font-bold text-white mt-1">
                  {node.name}
                </h4>
                <p className="text-[10px] font-mono text-blue-400 font-bold mt-2">
                  {node.speed}
                </p>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
