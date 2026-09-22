import React, { useState, useEffect } from 'react';
import {
  Activity,
  Radio,
  Cpu,
  Zap,
  Thermometer,
  ShieldCheck,
  RefreshCw,
  Compass,
  AlertCircle,
  Clock,
  Wifi,
  Satellite
} from 'lucide-react';

export const MissionControl: React.FC = () => {
  // Simulated live telemetry state
  const [telemetry, setTelemetry] = useState({
    status: 'OPERATIONAL',
    altitude: 542.4,
    velocity: 7.612,
    power: 87,
    signal: 98,
    temperature: 21.4,
    dataLink: 'CONNECTED',
    inclination: 97.42,
    apogee: 546.2,
    perigee: 538.6,
    downlinkRate: 10.2, // Gbps
    missionClock: 34129, // seconds
  });

  const [activeTab, setActiveTab] = useState<'orbit' | 'power' | 'signal' | 'temperature'>('orbit');
  const [pingActive, setPingActive] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState<'1X' | '2X' | '5X'>('1X');

  // Simulated live telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const altDelta = (Math.random() - 0.5) * 0.2;
        const velDelta = (Math.random() - 0.5) * 0.002;
        const pwrDelta = Math.sin(Date.now() / 4000) * 0.5;
        const tempDelta = (Math.random() - 0.5) * 0.3;

        return {
          ...prev,
          altitude: Number((prev.altitude + altDelta).toFixed(1)),
          velocity: Number((prev.velocity + velDelta).toFixed(3)),
          power: Math.min(99, Math.max(82, Math.round(prev.power + pwrDelta))),
          temperature: Number((prev.temperature + tempDelta).toFixed(1)),
          missionClock: prev.missionClock + 1,
        };
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const handleSimulatePing = () => {
    setPingActive(true);
    setTimeout(() => {
      setPingActive(false);
    }, 1800);
  };

  // Format mission elapsed time (MET)
  const formatMET = (totalSeconds: number) => {
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `T+${String(days).padStart(2, '0')}D ${String(hours).padStart(2, '0')}:${String(
      mins
    ).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <section id="mission-control" className="relative py-24 sm:py-32 bg-[#02040a] overflow-hidden">
      {/* Background space grid */}
      <div className="absolute inset-0 bg-space-grid pointer-events-none opacity-30" />
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#00f0ff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
              <span className="text-xs font-mono text-[#00f0ff] tracking-[0.25em] uppercase">
                SECTION 06 // FLIGHT OPERATIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white uppercase mb-2">
              MISSION <span className="text-gradient-cyan">CONTROL</span>
            </h2>
            <p className="text-sm font-mono text-slate-400">
              Simulation Environment // Telemetry Console v4.8
            </p>
          </div>

          {/* Prominent Mandatory Simulated Telemetry Notice */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs tracking-wider flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold block">SIMULATED TELEMETRY</span>
              <span className="text-[10px] text-amber-300/80">NOT LIVE MISSION DATA • DEMO PURPOSES ONLY</span>
            </div>
          </div>
        </div>

        {/* Primary Telemetry Cards Bar (7 Metrics from user prompt) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-8">
          {/* 1. MISSION STATUS */}
          <div className="p-4 rounded-xl bg-[#070e20] border border-white/10 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              MISSION STATUS
            </span>
            <div className="mt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm sm:text-base font-heading font-bold text-emerald-400 tracking-wide">
                {telemetry.status}
              </span>
            </div>
            <span className="text-[9px] font-mono text-slate-500 mt-1">ALL SYSTEMS GO</span>
          </div>

          {/* 2. ORBIT ALTITUDE */}
          <div className="p-4 rounded-xl bg-[#070e20] border border-white/10 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              ORBIT ALTITUDE
            </span>
            <div className="mt-2 text-lg sm:text-xl font-heading font-bold text-white">
              {telemetry.altitude}{' '}
              <span className="text-xs font-mono text-[#00f0ff]">km</span>
            </div>
            <span className="text-[9px] font-mono text-slate-500 mt-1">APOGEE: 546 KM</span>
          </div>

          {/* 3. VELOCITY */}
          <div className="p-4 rounded-xl bg-[#070e20] border border-white/10 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              VELOCITY
            </span>
            <div className="mt-2 text-lg sm:text-xl font-heading font-bold text-white">
              {telemetry.velocity}{' '}
              <span className="text-xs font-mono text-[#00f0ff]">km/s</span>
            </div>
            <span className="text-[9px] font-mono text-slate-500 mt-1">CIRCULAR KEPLERIAN</span>
          </div>

          {/* 4. POWER */}
          <div className="p-4 rounded-xl bg-[#070e20] border border-white/10 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              POWER
            </span>
            <div className="mt-2 text-lg sm:text-xl font-heading font-bold text-[#38bdf8]">
              {telemetry.power}%
            </div>
            <span className="text-[9px] font-mono text-slate-500 mt-1">SOLAR BUS + 4.8kW</span>
          </div>

          {/* 5. SIGNAL */}
          <div className="p-4 rounded-xl bg-[#070e20] border border-white/10 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              SIGNAL
            </span>
            <div className="mt-2 text-lg sm:text-xl font-heading font-bold text-[#818cf8]">
              {telemetry.signal}%
            </div>
            <span className="text-[9px] font-mono text-slate-500 mt-1">SNR: 34.2 dB</span>
          </div>

          {/* 6. TEMPERATURE */}
          <div className="p-4 rounded-xl bg-[#070e20] border border-white/10 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              TEMPERATURE
            </span>
            <div className="mt-2 text-lg sm:text-xl font-heading font-bold text-white">
              {telemetry.temperature}°C
            </div>
            <span className="text-[9px] font-mono text-slate-500 mt-1">AMMONIA LOOPS BALANCED</span>
          </div>

          {/* 7. DATA LINK */}
          <div className="p-4 rounded-xl bg-[#070e20] border border-white/10 flex flex-col justify-between col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              DATA LINK
            </span>
            <div className="mt-2 flex items-center gap-1.5 text-sm sm:text-base font-heading font-bold text-[#00f0ff]">
              <Wifi className="w-4 h-4 text-[#00f0ff]" />
              <span>{telemetry.dataLink}</span>
            </div>
            <span className="text-[9px] font-mono text-slate-500 mt-1">OPTICAL 10.2 Gbps</span>
          </div>
        </div>

        {/* Interactive Dashboard Main Body: Animated Graphs + Mission Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Visualizer & Chart Panel (Left 8 Cols) */}
          <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-[#070d1d]/90 backdrop-blur-xl p-6 flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
            {/* Top Bar with Tab Selectors */}
            <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-white/10 gap-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00f0ff]" />
                <span className="text-xs font-mono text-white font-semibold">
                  MET: {formatMET(telemetry.missionClock)}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                  UTC SIMULATED
                </span>
              </div>

              {/* Chart Mode Tabs */}
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
                {(['orbit', 'power', 'signal', 'temperature'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                      activeTab === tab
                        ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab} GRAPH
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Animated Telemetry SVG Graph */}
            <div className="relative h-64 w-full bg-black/50 rounded-xl border border-white/10 p-4 overflow-hidden mb-6 flex flex-col justify-between">
              {/* Background HUD grid lines */}
              <div className="absolute inset-0 bg-space-grid opacity-20 pointer-events-none" />

              {/* Top graph info */}
              <div className="flex items-center justify-between z-10 text-[10px] font-mono text-slate-400">
                <span className="text-[#00f0ff] uppercase font-semibold">
                  CHART CHANNEL: {activeTab.toUpperCase()} REAL-TIME SYNTHESIS
                </span>
                <span>TIME WINDOW: -60s TO NOW</span>
              </div>

              {/* Dynamic Waveform Graph Rendering */}
              <svg className="w-full h-44 z-10 overflow-visible" viewBox="0 0 600 160">
                <defs>
                  <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal reference lines */}
                <line x1="0" y1="40" x2="600" y2="40" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                <line x1="0" y1="80" x2="600" y2="80" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                <line x1="0" y1="120" x2="600" y2="120" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />

                {/* Graph Path based on active tab */}
                {activeTab === 'orbit' && (
                  <>
                    <path
                      d="M 0,80 Q 75,30 150,80 T 300,80 T 450,80 T 600,80 L 600,160 L 0,160 Z"
                      fill="url(#chartGrad)"
                    />
                    <path
                      d="M 0,80 Q 75,30 150,80 T 300,80 T 450,80 T 600,80"
                      fill="none"
                      stroke="#00f0ff"
                      strokeWidth="2.5"
                    />
                  </>
                )}

                {activeTab === 'power' && (
                  <>
                    <path
                      d="M 0,60 C 100,50 200,90 300,55 C 400,30 500,45 600,40 L 600,160 L 0,160 Z"
                      fill="url(#chartGrad)"
                    />
                    <path
                      d="M 0,60 C 100,50 200,90 300,55 C 400,30 500,45 600,40"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                    />
                  </>
                )}

                {activeTab === 'signal' && (
                  <>
                    <path
                      d="M 0,40 L 80,42 L 160,35 L 240,38 L 320,30 L 400,34 L 480,28 L 560,32 L 600,30 L 600,160 L 0,160 Z"
                      fill="url(#chartGrad)"
                    />
                    <path
                      d="M 0,40 L 80,42 L 160,35 L 240,38 L 320,30 L 400,34 L 480,28 L 560,32 L 600,30"
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="2"
                    />
                  </>
                )}

                {activeTab === 'temperature' && (
                  <>
                    <path
                      d="M 0,100 Q 150,50 300,100 T 600,100 L 600,160 L 0,160 Z"
                      fill="url(#chartGrad)"
                    />
                    <path
                      d="M 0,100 Q 150,50 300,100 T 600,100"
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="2.5"
                    />
                  </>
                )}

                {/* Animated Scanner Cursor Line */}
                <line x1="480" y1="0" x2="480" y2="160" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3 3">
                  <animate attributeName="x1" values="0;600" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="x2" values="0;600" dur="4s" repeatCount="indefinite" />
                </line>
              </svg>

              {/* Bottom graph stats summary */}
              <div className="flex items-center justify-between z-10 text-[10px] font-mono text-slate-400 pt-2 border-t border-white/5">
                <span>CHANNEL SAMPLING: 50 Hz</span>
                <span className="text-emerald-400">DATA INTEGRITY: 99.98%</span>
                <span>STATUS: LOCKED</span>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSimulatePing}
                  disabled={pingActive}
                  className="px-4 py-2 rounded-lg bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30 text-xs font-mono tracking-wider uppercase transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <Radio className={`w-3.5 h-3.5 ${pingActive ? 'animate-spin' : ''}`} />
                  <span>{pingActive ? 'TRANSMITTING PING...' : 'SIMULATE GROUND PING'}</span>
                </button>

                <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-slate-400 px-3 py-2 bg-white/5 rounded-lg border border-white/5">
                  <span>RTT LATENCY:</span>
                  <span className="text-[#00f0ff] font-bold">14.2 ms</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400">SIM SPEED:</span>
                {(['1X', '2X', '5X'] as const).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setSimulationSpeed(spd)}
                    className={`px-2 py-1 rounded text-[10px] font-mono tracking-wider transition-colors ${
                      simulationSpeed === spd
                        ? 'bg-[#00f0ff] text-black font-bold'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {spd}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Flight Subsystem Matrix & Orbital Tracker (4 Cols) */}
          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-[#070e20]/90 backdrop-blur-xl p-6 flex flex-col justify-between hud-corner-tl hud-corner-br">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <span className="text-xs font-mono text-white font-bold tracking-wider uppercase">
                  ORBITAL POSITION MATRIX
                </span>
                <Compass className="w-4 h-4 text-[#00f0ff]" />
              </div>

              {/* Animated Mini Globe / Orbit Visualizer */}
              <div className="relative w-full h-40 rounded-xl bg-black/60 border border-white/10 overflow-hidden mb-6 flex items-center justify-center">
                {/* Globe Wireframe circles */}
                <div className="w-28 h-28 rounded-full border border-[#00f0ff]/40 flex items-center justify-center relative">
                  <div className="w-28 h-12 rounded-full border border-[#00f0ff]/30 -rotate-12 absolute" />
                  <div className="w-12 h-28 rounded-full border border-[#00f0ff]/30 absolute" />
                  <div className="w-4 h-4 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff] animate-ping" />
                  {/* Orbiting satellite indicator */}
                  <div className="w-2 h-2 rounded-full bg-emerald-400 absolute top-2 right-4 shadow-[0_0_8px_#10b981]" />
                </div>
                <div className="absolute bottom-2 left-3 text-[9px] font-mono text-slate-400">
                  INCLINATION: {telemetry.inclination}° SSO
                </div>
                <div className="absolute top-2 right-3 text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>PASSING: CONTINENTAL NODE</span>
                </div>
              </div>

              {/* Subsystem Health Matrix */}
              <div className="space-y-3 mb-6">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">
                  SUBSYSTEM OPERATIONAL STATUS
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/5 text-xs font-mono">
                  <span className="text-slate-300">AVIONICS FLIGHT COMPUTER</span>
                  <span className="text-emerald-400 font-bold">NOMINAL</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/5 text-xs font-mono">
                  <span className="text-slate-300">ION THRUSTER MANIFOLD</span>
                  <span className="text-emerald-400 font-bold">STANDBY</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/5 text-xs font-mono">
                  <span className="text-slate-300">STAR TRACKER CAMERAS (3x)</span>
                  <span className="text-emerald-400 font-bold">LOCKED</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/5 text-xs font-mono">
                  <span className="text-slate-300">HYPERSPECTRAL SENSOR BAY</span>
                  <span className="text-[#00f0ff] font-bold">SCANNING</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 text-[10px] font-mono text-slate-400 leading-relaxed">
              Telemetry parameters are synthesized dynamically. Uplink carrier verification verified under protocol CCSDS-131.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
