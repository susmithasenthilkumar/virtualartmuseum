import React, { useState } from 'react';
import { NOVA_BENCHMARKS } from '../../data/novaData';
import { BenchmarkItem } from '../../types/nova';
import { Cpu, Zap, Activity, Flame, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

export const PerformanceSection: React.FC = () => {
  const [selectedBenchmark, setSelectedBenchmark] = useState<BenchmarkItem>(NOVA_BENCHMARKS[0]);

  return (
    <section id="performance" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050508] border-t border-white/10 overflow-hidden">
      
      {/* Background ambient silicon glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[200px] opacity-15 bg-blue-600 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full blur-[180px] opacity-10 bg-purple-600 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-tech font-bold uppercase tracking-[0.2em] text-blue-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>SECTION 04 • SILICON ARTIFACT</span>
          </div>

          <h2 className="font-tech text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Built for everything.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed">
            Introducing the <span className="text-white font-bold">NOVA N1 Ultra</span>. Built on next-generation 3-nanometer architecture with an 8-core CPU, 12-core ray tracing GPU, and a 45 TOPS Matrix Neural Engine.
          </p>
        </div>

        {/* 3D Animated Silicon Die & Architecture Overview */}
        <div className="relative max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-[#0b0e17] to-[#04060a] border border-white/15 p-6 sm:p-10 shadow-2xl overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Glowing Futuristic Hologram Silicon Die */}
            <div className="lg:col-span-6 relative flex items-center justify-center p-6">
              
              {/* Outer Pulsing Circuit Rings */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                
                {/* Rotating Orbit 1 */}
                <div className="absolute inset-0 rounded-full border border-blue-500/30 border-dashed animate-spin" style={{ animationDuration: '30s' }} />
                
                {/* Rotating Orbit 2 */}
                <div className="absolute inset-4 rounded-full border border-purple-500/20 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />

                {/* Central Silicon Chip Die */}
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-br from-[#121624] via-[#090b12] to-[#040508] border-2 border-blue-400/50 shadow-2xl shadow-blue-500/30 p-4 flex flex-col justify-between group hover:scale-105 transition-transform duration-500">
                  
                  {/* Subtle holographic circuit lines */}
                  <div className="absolute inset-0 bg-tech-dots opacity-40 pointer-events-none" />

                  <div className="flex items-center justify-between z-10">
                    <span className="font-mono text-[10px] text-blue-400 font-bold uppercase tracking-widest">
                      3nm EXTREME
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>

                  <div className="text-center z-10 space-y-1">
                    <h3 className="font-tech text-xl sm:text-2xl font-black text-white tracking-widest">
                      NOVA N1
                    </h3>
                    <div className="inline-block px-2.5 py-0.5 rounded bg-blue-500/20 border border-blue-400/40 text-[10px] font-mono text-blue-300 font-bold">
                      ULTRA
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 z-10">
                    <span>45 TOPS</span>
                    <span>12-CORE GPU</span>
                  </div>

                </div>

              </div>

            </div>

            {/* Right: Architectural Capabilities Matrix */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400">
                  MONOLITHIC COMPUTE CLUSTER
                </span>
                <h3 className="font-tech text-2xl sm:text-3xl font-bold text-white">
                  Extreme Density. Zero Compromise.
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: '8-Core CPU', detail: '2 Prime + 4 Pro + 2 Efficient cores up to 3.82GHz' },
                  { title: '12-Core Titan GPU', detail: 'Hardware Ray Tracing & Mesh Shading' },
                  { title: '16-Core Matrix NPU', detail: '45 TOPS local on-device neural inferencing' },
                  { title: '5,800mm² Vapor Chamber', detail: 'Liquid-cooled 3D thermal dissipation envelope' },
                ].map((core) => (
                  <div key={core.title} className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                    <h4 className="font-tech text-xs font-bold text-white">{core.title}</h4>
                    <p className="text-[11px] text-slate-400 font-sans leading-snug">{core.detail}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                <p className="text-xs text-blue-200 font-sans">
                  Sustained performance efficiency rating: 99.4% stability after 60 continuous minutes of console-grade workloads.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Interactive Benchmark Workload Selector & Graphs */}
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-tech text-xl font-bold text-white">
              Workload Simulation Benchmarks
            </h3>
            <span className="text-xs font-mono text-slate-400">
              * Fictional product performance metrics
            </span>
          </div>

          {/* 4 Workload Selector Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {NOVA_BENCHMARKS.map((bm) => {
              const isActive = selectedBenchmark.id === bm.id;
              return (
                <button
                  key={bm.id}
                  onClick={() => setSelectedBenchmark(bm)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-xl shadow-blue-500/10'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider block text-slate-500">
                    BENCHMARK
                  </span>
                  <h4 className="font-tech text-sm font-bold text-white mt-1">
                    {bm.title}
                  </h4>
                  <span className="text-xs font-mono text-emerald-400 font-bold block mt-2">
                    {bm.comparisonPercentage}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Benchmark Detailed Data Display */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6 backdrop-blur-md">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-tech text-2xl font-bold text-white">
                  {selectedBenchmark.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1">
                  {selectedBenchmark.description}
                </p>
              </div>

              <div className="text-right sm:shrink-0">
                <span className="text-xs font-mono text-slate-400 block">MEASURED OUTPUT</span>
                <span className="font-tech text-2xl font-extrabold text-blue-400">
                  {selectedBenchmark.novaScore}
                </span>
              </div>
            </div>

            {/* Benchmark Comparison Bar Graphs */}
            <div className="space-y-4 pt-2">
              {/* NOVA N1 Ultra Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white font-bold">NOVA X1 PRO MAX (N1 Ultra)</span>
                  <span className="text-blue-400 font-bold">{selectedBenchmark.novaScore}</span>
                </div>
                <div className="w-full h-3.5 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-400 rounded-full transition-all duration-1000 shadow-lg shadow-blue-500/50"
                    style={{ width: `${selectedBenchmark.benchmarkValue}%` }}
                  />
                </div>
              </div>

              {/* Previous Generation Baseline Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Previous Generation Chipset</span>
                  <span>{selectedBenchmark.previousScore}</span>
                </div>
                <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <div
                    className="h-full bg-slate-600 rounded-full transition-all duration-1000"
                    style={{ width: `${selectedBenchmark.benchmarkValue * 0.62}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 3 Sub-Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              {selectedBenchmark.subMetrics.map((sm) => (
                <div key={sm.label} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{sm.label}</span>
                  <p className="font-tech text-base font-bold text-white">{sm.value}</p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
