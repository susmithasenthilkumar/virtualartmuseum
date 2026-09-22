import React, { useState, useEffect } from 'react';
import { Monitor, Sun, Zap, Eye, Sparkles, Layers, Sliders } from 'lucide-react';

export const DisplaySection: React.FC = () => {
  const [refreshRate, setRefreshRate] = useState<60 | 90 | 120>(120);
  const [brightnessNits, setBrightnessNits] = useState<number>(2400);
  const [alwaysOn, setAlwaysOn] = useState<boolean>(false);
  const [orbPosition, setOrbPosition] = useState<number>(0);

  // Smooth kinetic particle runner for refresh rate visualizer
  useEffect(() => {
    let animId: number;
    let pos = 0;
    let lastTime = performance.now();

    // Step size depends on simulated refresh rate (higher refresh = smoother smaller sub-frames)
    const update = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      const speed = 240; // px per second
      pos = (pos + speed * delta) % 600;
      setOrbPosition(pos);
      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [refreshRate]);

  // Derived brightness level (0 to 1)
  const brightnessFactor = (brightnessNits - 100) / (3200 - 100);

  return (
    <section id="display" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050508] border-t border-white/10 overflow-hidden">
      
      {/* Dynamic ambient screen glow that scales with the brightness slider */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[200px] pointer-events-none transition-all duration-300"
        style={{
          backgroundColor: alwaysOn ? '#0f172a' : '#38bdf8',
          opacity: alwaysOn ? 0.05 : 0.15 + brightnessFactor * 0.35,
        }}
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-tech font-bold uppercase tracking-[0.2em] text-blue-400">
            <Monitor className="w-3.5 h-3.5" />
            <span>SECTION 02 • VISUAL REVELATION</span>
          </div>

          <h2 className="font-tech text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Your world.{' '}
            <span className="text-gradient-silver block sm:inline">
              In extraordinary detail.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed">
            A 6.9-inch Dynamic OLED Horizon canvas with 1Hz–120Hz LTPO 4.0 adaptive refresh and up to 3,200 nits outdoor peak brightness. Engineered to disappear into sheer visual reality.
          </p>
        </div>

        {/* Big Interactive Display Simulation Stage */}
        <div className="relative max-w-5xl mx-auto rounded-[40px] p-4 sm:p-8 bg-[#090b12] border-2 border-white/15 shadow-2xl transition-all duration-500 overflow-hidden">
          
          {/* Simulated Edge-to-edge Horizon Display */}
          <div 
            className="relative w-full min-h-[420px] sm:min-h-[520px] rounded-[32px] overflow-hidden border border-white/20 transition-all duration-500 flex flex-col justify-between p-6 sm:p-10 shadow-inner"
            style={{
              backgroundColor: alwaysOn ? '#020305' : '#050a16',
              filter: alwaysOn ? 'brightness(0.35)' : `brightness(${0.6 + brightnessFactor * 0.7})`,
            }}
          >
            {/* Background dynamic wallpaper (Cosmic Horizon / Nebula) */}
            <div 
              className={`absolute inset-0 transition-opacity duration-700 bg-cover bg-center ${
                alwaysOn ? 'opacity-10' : 'opacity-85'
              }`}
              style={{
                backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(56, 189, 248, 0.45), transparent 50%), radial-gradient(circle at 30% 70%, rgba(168, 85, 247, 0.35), transparent 60%), linear-gradient(135deg, #070a14 0%, #0d1527 50%, #05060a 100%)',
              }}
            />

            {/* Micro grid overlay */}
            <div className="absolute inset-0 bg-tech-dots opacity-20 pointer-events-none" />

            {/* Top Display Bezel Notch / Dynamic Island */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <span className="text-xs font-mono font-bold tracking-wider text-white/90">
                09:41 • 5G
              </span>

              {/* Dynamic Island Capsule */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/90 border border-white/20 backdrop-blur-xl shadow-lg">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-300">
                  {alwaysOn ? 'ALWAYS-ON STANDBY' : `${refreshRate}Hz ADAPTIVE PRO`}
                </span>
              </div>

              <span className="text-xs font-mono text-white/90">
                100% ⚡
              </span>
            </div>

            {/* Interactive Refresh Rate UFO / Fluid Motion Visualizer */}
            {!alwaysOn && (
              <div className="relative z-10 my-auto py-6 space-y-4 max-w-xl mx-auto w-full">
                <div className="flex items-center justify-between text-xs font-tech text-slate-300">
                  <span className="uppercase tracking-wider">KINETIC FLUIDITY TEST</span>
                  <span className="font-mono text-blue-400 font-bold">{refreshRate} FRAMES / SECOND</span>
                </div>

                {/* Motion Track */}
                <div className="relative h-14 rounded-2xl bg-black/60 border border-white/10 overflow-hidden flex items-center px-4">
                  {/* Motion Grid lines */}
                  <div className="absolute inset-0 flex justify-between px-6 pointer-events-none opacity-20">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-[1px] h-full bg-white" />
                    ))}
                  </div>

                  {/* Kinetic Glowing Runner Orb */}
                  <div
                    className="absolute w-10 h-10 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg shadow-blue-500/50 flex items-center justify-center font-mono text-xs font-bold text-white transition-none"
                    style={{
                      transform: `translateX(${orbPosition}px)`,
                      filter: refreshRate === 60 ? 'blur(1.5px)' : refreshRate === 90 ? 'blur(0.6px)' : 'none',
                    }}
                  >
                    ⚡
                  </div>
                </div>

                <p className="text-[11px] font-sans text-slate-400 text-center">
                  {refreshRate === 120
                    ? '120Hz LTPO 4.0: Ultra-responsive fluid rendering with microsecond touch response.'
                    : refreshRate === 90
                    ? '90Hz Balanced: Smooth scrolling dynamics with power conservation.'
                    : '60Hz Standard: Traditional smartphone framerate with perceptible motion judder.'}
                </p>
              </div>
            )}

            {/* Always-on Clock Simulation Mode */}
            {alwaysOn && (
              <div className="relative z-10 my-auto text-center space-y-2">
                <p className="text-xs font-mono text-slate-400 tracking-widest uppercase">
                  ALWAYS-ON HORIZON
                </p>
                <div className="font-tech text-6xl sm:text-7xl font-bold text-white/80 tracking-tight">
                  09:41
                </div>
                <p className="text-xs font-sans text-slate-500">
                  1Hz ultra-low frequency state • Conserves 94% display energy
                </p>
              </div>
            )}

            {/* Bottom Display Spec Metrics */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>CURRENT OUTPUT: <strong className="text-white font-bold">{alwaysOn ? '20' : brightnessNits} NITS</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span>DYNAMIC RANGE: <strong className="text-white font-bold">DOLBY VISION & HDR10+</strong></span>
              </div>
            </div>

          </div>

          {/* Interactive Controls Bar Below Screen */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
            
            {/* Refresh Rate Selector */}
            <div className="space-y-2">
              <label className="text-xs font-tech font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-blue-400" />
                <span>Adaptive Refresh Rate</span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                {([60, 90, 120] as const).map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setRefreshRate(rate)}
                    className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                      refreshRate === rate
                        ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {rate}Hz
                  </button>
                ))}
              </div>
            </div>

            {/* Brightness Nits Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-tech font-bold uppercase tracking-wider text-slate-300">
                <span className="flex items-center gap-2">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Peak Brightness</span>
                </span>
                <span className="font-mono text-amber-400 font-bold">{brightnessNits} nits</span>
              </div>

              <input
                type="range"
                min="100"
                max="3200"
                step="100"
                value={brightnessNits}
                onChange={(e) => setBrightnessNits(Number(e.target.value))}
                disabled={alwaysOn}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>100 nits (Night)</span>
                <span>1,800 nits (HBM)</span>
                <span>3,200 nits (Sunlight)</span>
              </div>
            </div>

            {/* Always-on Mode Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-tech font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-purple-400" />
                <span>Always-On Horizon</span>
              </label>

              <button
                onClick={() => setAlwaysOn(!alwaysOn)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-tech font-bold uppercase tracking-wider transition-all cursor-pointer border flex items-center justify-center gap-2 ${
                  alwaysOn
                    ? 'bg-purple-600/20 border-purple-500/50 text-purple-300 shadow-lg shadow-purple-500/10'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{alwaysOn ? 'Standby Mode Active (1Hz)' : 'Toggle Standby Mode'}</span>
              </button>
            </div>

          </div>

        </div>

        {/* 4 Feature Specification Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { label: '6.9-inch OLED', desc: 'Edge-to-edge symmetrical 0.95mm micro-bezel' },
            { label: '1Hz – 120Hz LTPO', desc: 'Continuous adaptive frame synchronization' },
            { label: '3,200 Nits Peak', desc: 'Flawless readability under direct solar glare' },
            { label: 'Nova Shield Armor', desc: '4x tougher scratch & impact ceramic matrix' },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <h4 className="font-tech text-sm font-bold text-white">{item.label}</h4>
              <p className="text-xs text-slate-400 font-sans">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
