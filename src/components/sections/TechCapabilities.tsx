import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  Globe,
  Compass,
  Radio,
  Wrench,
  Activity,
  BarChart,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';
import { TECH_CAPABILITIES } from '../../data/orbitaData';
import { TechCapability } from '../../types/orbita';

export const TechCapabilities: React.FC = () => {
  const [selectedCapability, setSelectedCapability] = useState<TechCapability | null>(null);

  const getCapabilityIcon = (id: string) => {
    switch (id) {
      case 'ai-ml':
        return <Cpu className="w-5 h-5 text-[#00f0ff]" />;
      case 'spacecraft-sys':
        return <Layers className="w-5 h-5 text-[#38bdf8]" />;
      case 'earth-obs':
        return <Globe className="w-5 h-5 text-[#22d3ee]" />;
      case 'auto-nav':
        return <Compass className="w-5 h-5 text-[#818cf8]" />;
      case 'comms':
        return <Radio className="w-5 h-5 text-[#00f0ff]" />;
      case 'robotics':
        return <Wrench className="w-5 h-5 text-[#38bdf8]" />;
      case 'digital-twins':
        return <Activity className="w-5 h-5 text-[#f43f5e]" />;
      case 'data-analytics':
        return <BarChart className="w-5 h-5 text-[#818cf8]" />;
      default:
        return <Layers className="w-5 h-5 text-[#00f0ff]" />;
    }
  };

  return (
    <section id="capabilities" className="relative py-24 sm:py-32 bg-[#02040a] overflow-hidden">
      {/* Background space lines */}
      <div className="absolute inset-0 bg-space-grid pointer-events-none opacity-25" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00f0ff]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            <span className="text-xs font-mono text-[#00f0ff] tracking-[0.25em] uppercase">
              SECTION 10 // TECHNOLOGY CAPABILITIES
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white uppercase mb-6">
            OUR <span className="text-gradient-cyan">TECHNOLOGY</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            The ORBITA technology ecosystem is built upon eight core aerospace and software pillars, combining space-qualified physical avionics with modern distributed neural intelligence.
          </p>
        </div>

        {/* 8 Technical Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TECH_CAPABILITIES.map((cap) => (
            <div
              key={cap.id}
              onClick={() => setSelectedCapability(cap)}
              className="group relative rounded-2xl border border-white/10 bg-[#070e20]/80 backdrop-blur-xl p-6 hover:border-[#00f0ff]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] hud-corner-tl"
            >
              <div>
                {/* Header Icon & Tag */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-[#00f0ff]/40 transition-all">
                    {getCapabilityIcon(cap.id)}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {cap.category}
                  </span>
                </div>

                <h3 className="text-base font-heading font-bold text-white uppercase tracking-wide mb-2 group-hover:text-[#00f0ff] transition-colors">
                  {cap.title}
                </h3>

                <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3 mb-4">
                  {cap.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:text-white transition-colors">
                <span className="text-[10px] text-[#00f0ff]">INSPECT SPEC</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#00f0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Detailed Drawer when clicking a Capability */}
      {selectedCapability && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-2xl border border-[#00f0ff]/40 bg-[#070e22] p-8 shadow-[0_0_50px_rgba(0,240,255,0.25)] hud-corner-tl hud-corner-br">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCapability(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30">
                {getCapabilityIcon(selectedCapability.id)}
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-widest block">
                  CAPABILITY MATRIX // {selectedCapability.category}
                </span>
                <h3 className="text-2xl font-heading font-bold text-white uppercase">
                  {selectedCapability.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
              {selectedCapability.summary}
            </p>

            {/* Features List */}
            <div className="mb-6">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-3">
                SYSTEM ATTRIBUTES & BENCHMARKS:
              </span>
              <div className="space-y-2.5">
                {selectedCapability.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-black/40 border border-white/10 flex items-start gap-2.5 text-xs font-mono text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Readiness level */}
            <div className="p-3.5 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">TECHNOLOGY READINESS:</span>
              <span className="text-[#00f0ff] font-bold">{selectedCapability.simulatedReadiness}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
