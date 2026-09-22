import React, { useState } from 'react';
import { Battery, Zap, BatteryCharging, Shield, Sparkles, Clock, RefreshCw } from 'lucide-react';

export const BatterySection: React.FC = () => {
  const [chargeStage, setChargeStage] = useState<20 | 50 | 80 | 100>(100);
  const [isChargingSim, setIsChargingSim] = useState(false);

  const stageDetails = {
    20: { time: '0 mins (Depleted)', label: 'Emergency Reserve', temp: '26°C', watts: '100W Max Draw' },
    50: { time: '9 mins (Ultra Fast)', label: 'Daily Commute Power', temp: '32°C', watts: '95W Sustained' },
    80: { time: '17 mins', label: 'Long Day Autonomy', temp: '30°C', watts: '65W Step-Down' },
    100: { time: '24 mins (Full Capacity)', label: 'All-Weekend Battery', temp: '25°C', watts: 'Trickle Safe' },
  };

  const handleSimulateCharge = () => {
    setIsChargingSim(true);
    setChargeStage(20);
    setTimeout(() => setChargeStage(50), 600);
    setTimeout(() => setChargeStage(80), 1200);
    setTimeout(() => {
      setChargeStage(100);
      setIsChargingSim(false);
    }, 1800);
  };

  return (
    <section id="battery" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050508] border-t border-white/10 overflow-hidden">
      
      {/* Background ambient emerald energy glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-15 bg-emerald-500 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-tech font-bold uppercase tracking-[0.2em] text-emerald-400">
            <Zap className="w-3.5 h-3.5" />
            <span>SECTION 06 • SILICON-CARBON CELL</span>
          </div>

          <h2 className="font-tech text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Power that keeps up.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed">
            5,500 mAh of high-density silicon-carbon energy nestled inside an 8.25mm profile. 100W HyperCharge powers from 0% to 50% in just 9 minutes.
          </p>
        </div>

        {/* Big Interactive Battery Visualizer */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#090b12] border border-white/15 p-6 sm:p-10 shadow-2xl space-y-8">
          
          {/* Top Battery Status & Simulation Trigger */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                HIGH-DENSITY ANODE ARCHITECTURE
              </span>
              <h3 className="font-tech text-2xl font-bold text-white">
                5,500 mAh • 100W HyperCharge
              </h3>
            </div>

            <button
              onClick={handleSimulateCharge}
              disabled={isChargingSim}
              className="px-4 py-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-tech font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isChargingSim ? 'animate-spin' : ''}`} />
              <span>{isChargingSim ? 'Simulating Fast Charge...' : 'Simulate 0-100% Sequence'}</span>
            </button>
          </div>

          {/* Center Giant Battery Shell Graphics */}
          <div className="relative py-8 flex flex-col items-center justify-center space-y-6">
            
            {/* Battery Tank Exterior */}
            <div className="relative w-full max-w-xl h-24 sm:h-28 rounded-3xl bg-black/80 border-4 border-white/20 p-2 flex items-center shadow-2xl">
              
              {/* Battery Positive Anode Terminal Cap */}
              <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-4 h-12 rounded-r-xl bg-white/30 border-r-2 border-y-2 border-white/20" />

              {/* Animated Internal Fluid Energy Cells */}
              <div
                className="h-full rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-300 transition-all duration-700 relative overflow-hidden flex items-center justify-end pr-4 shadow-lg shadow-emerald-500/30"
                style={{ width: `${chargeStage}%` }}
              >
                {/* Flowing energy stripes */}
                <div className="absolute inset-0 bg-white/10 bg-tech-dots opacity-40 animate-pulse" />

                <span className="font-tech text-sm sm:text-lg font-black text-black z-10">
                  {chargeStage}%
                </span>
              </div>

            </div>

            {/* Stage Selector Pills: 20% → 50% → 80% → 100% */}
            <div className="flex items-center gap-2 sm:gap-4">
              {([20, 50, 80, 100] as const).map((stage) => (
                <button
                  key={stage}
                  onClick={() => setChargeStage(stage)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                    chargeStage === stage
                      ? 'bg-emerald-500 border-emerald-400 text-black shadow-lg shadow-emerald-500/30'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {stage}%
                </button>
              ))}
            </div>

            {/* Active Stage Technical Diagnostics */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-center">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Elapsed Duration</span>
                <p className="font-tech text-xs sm:text-sm font-bold text-white">{stageDetails[chargeStage].time}</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Power Protocol</span>
                <p className="font-tech text-xs sm:text-sm font-bold text-emerald-400">{stageDetails[chargeStage].watts}</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Thermal State</span>
                <p className="font-tech text-xs sm:text-sm font-bold text-white">{stageDetails[chargeStage].temp}</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Autonomy Target</span>
                <p className="font-tech text-xs sm:text-sm font-bold text-white">{stageDetails[chargeStage].label}</p>
              </div>
            </div>

          </div>

        </div>

        {/* 3 Battery Breakthrough Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <h4 className="font-tech text-base font-bold text-white">34 Hours Continuous Playback</h4>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Consumes up to 28% less power than previous flagships thanks to the 3nm N1 Ultra and LTPO 4.0 1Hz idle display.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <BatteryCharging className="w-5 h-5 text-emerald-400" />
            <h4 className="font-tech text-base font-bold text-white">50W Wireless + 15W Reverse</h4>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Place on any Qi2 charging pad for fast 50W cable-free replenishment, or flip the device to reverse-power earbuds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h4 className="font-tech text-base font-bold text-white">1,600 Full Charge Cycles</h4>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Maintains over 85% original battery capacity after 4+ years of daily high-speed recharging with smart thermal pacing.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
