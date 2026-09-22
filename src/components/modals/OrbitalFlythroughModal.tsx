import React, { useState, useEffect } from 'react';
import {
  X,
  Compass,
  Satellite,
  Radio,
  Eye,
  Activity,
  Layers,
  Sparkles,
  Maximize2,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { EarthCanvas } from '../3d/EarthCanvas';

interface OrbitalFlythroughModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrbitalFlythroughModal: React.FC<OrbitalFlythroughModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [cameraView, setCameraView] = useState<'NADIR' | 'SOLAR_WING' | 'DEEP_SPACE' | 'AVIONICS'>('NADIR');
  const [timeWarp, setTimeWarp] = useState<'1X' | '5X' | '20X'>('1X');
  const [simClock, setSimClock] = useState(1240);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      const step = timeWarp === '1X' ? 1 : timeWarp === '5X' ? 5 : 20;
      setSimClock((prev) => prev + step);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, timeWarp]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-6xl h-[90vh] rounded-3xl border border-[#00f0ff]/40 bg-[#02050f] overflow-hidden flex flex-col justify-between shadow-[0_0_80px_rgba(0,240,255,0.3)] hud-corner-tl hud-corner-br">
        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#04091a]/90 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
              <Satellite className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-base text-white tracking-wider">
                  ORBITA // REAL-TIME ORBITAL SIMULATOR
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30">
                  SIMULATION
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                ALT: 542.4 KM • INCLINATION: 97.4° SUN-SYNCHRONOUS • VELOCITY: 7.61 KM/S
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Exit Simulator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center 3D Space Scene Viewport */}
        <div className="relative flex-1 w-full bg-black overflow-hidden flex items-center justify-center">
          <EarthCanvas
            interactive={true}
            showSatellite={true}
            cameraDistance={cameraView === 'NADIR' ? 2.8 : cameraView === 'SOLAR_WING' ? 3.6 : 4.4}
            className="w-full h-full"
          />

          {/* HUD Overlay Crosshairs */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border border-[#00f0ff]/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#00f0ff]/60" />
            </div>
            <div className="w-72 h-[1px] bg-[#00f0ff]/20 absolute" />
            <div className="h-72 w-[1px] bg-[#00f0ff]/20 absolute" />
          </div>

          {/* Telemetry HUD overlays (Top Left) */}
          <div className="absolute top-6 left-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono space-y-1.5 pointer-events-none">
            <div className="text-[10px] text-[#00f0ff] uppercase tracking-wider font-bold">
              ORBITAL STATE VECTOR
            </div>
            <div className="text-white">RADIUS: 6,913.4 km</div>
            <div className="text-slate-300">PERIOD: 95.4 mins</div>
            <div className="text-emerald-400">PROPULSION: ION STANDBY</div>
            <div className="text-slate-400 text-[10px]">TIME TO ECLIPSE: 38m 12s</div>
          </div>

          {/* View Mode Selector (Top Right) */}
          <div className="absolute top-6 right-6 flex flex-col gap-2 z-20">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest text-right">
              CAMERA PERSPECTIVE:
            </span>
            {(
              [
                { id: 'NADIR', label: 'NADIR SURFACE' },
                { id: 'SOLAR_WING', label: 'SOLAR WING' },
                { id: 'DEEP_SPACE', label: 'DEEP SPACE' },
                { id: 'AVIONICS', label: 'COCKPIT HUD' },
              ] as const
            ).map((v) => (
              <button
                key={v.id}
                onClick={() => setCameraView(v.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-colors text-right border ${
                  cameraView === v.id
                    ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff]'
                    : 'bg-black/60 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Telemetry & Time Controls Bar */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#04091a]/90 flex flex-wrap items-center justify-between gap-4 z-20">
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-white font-semibold">SIMULATED MISSION CLOCK:</span>
              <span className="text-[#00f0ff] font-bold">+{simClock}s</span>
            </div>
            <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-4 text-slate-400">
              <Radio className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>GROUND CARRIER: 10.2 Gbps LOCKED</span>
            </div>
          </div>

          {/* Time Warp Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">WARP SPEED:</span>
            {(['1X', '5X', '20X'] as const).map((tw) => (
              <button
                key={tw}
                onClick={() => setTimeWarp(tw)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors ${
                  timeWarp === tw
                    ? 'bg-[#00f0ff] text-black'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {tw}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
