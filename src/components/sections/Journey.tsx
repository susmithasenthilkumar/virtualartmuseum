import React, { useState } from 'react';
import {
  Rocket,
  ArrowUp,
  Radio,
  Sun,
  Activity,
  Layers,
  CheckCircle2,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { JOURNEY_STAGES } from '../../data/orbitaData';

export const Journey: React.FC = () => {
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);
  const currentStage = JOURNEY_STAGES[selectedStageIndex];

  return (
    <section id="journey" className="relative py-24 sm:py-32 bg-[#02040a] overflow-hidden">
      {/* Background space lines */}
      <div className="absolute inset-0 bg-space-grid pointer-events-none opacity-25" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#00f0ff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            <span className="text-xs font-mono text-[#00f0ff] tracking-[0.25em] uppercase">
              SECTION 08 // MISSION TRAJECTORY
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white uppercase mb-6 leading-tight">
            FROM EARTH <br />
            <span className="text-gradient-cyan">TO ORBIT</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            The mission flight envelope spans launch pad lift-off to orbital insertion and high-bandwidth optical downlink. Each milestone represents strict aerospace validation gates.
          </p>
        </div>

        {/* Interactive Stepper Navigation (6 Stages) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {JOURNEY_STAGES.map((stage, idx) => {
            const isSelected = selectedStageIndex === idx;
            const isCompleted = idx < selectedStageIndex;

            return (
              <button
                key={stage.step}
                onClick={() => setSelectedStageIndex(idx)}
                className={`p-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#00f0ff] bg-[#071329] shadow-[0_0_25px_rgba(0,240,255,0.25)] -translate-y-1'
                    : isCompleted
                    ? 'border-emerald-500/30 bg-[#040e1a]/60 text-slate-300 hover:border-emerald-500/50'
                    : 'border-white/10 bg-[#040816]/60 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-heading font-black text-xl ${
                      isSelected ? 'text-[#00f0ff]' : isCompleted ? 'text-emerald-400' : 'text-slate-600'
                    }`}
                  >
                    {stage.step}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-[#00f0ff] animate-ping' : 'bg-slate-700'
                      }`}
                    />
                  )}
                </div>

                <div>
                  <div
                    className={`text-xs font-heading font-bold uppercase tracking-wider ${
                      isSelected ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {stage.title}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                    {stage.altitude}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Stage Detailed Display Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-2xl border border-white/10 bg-[#070e20]/90 backdrop-blur-xl p-6 sm:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.8)] hud-corner-tl hud-corner-br">
          {/* Left Column: Altitude Climb Visualizer (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-xl bg-black/50 border border-white/10">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <span className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-widest">
                  ASCENT TRAJECTORY TRACKER
                </span>
                <span className="text-[10px] font-mono text-slate-400">{currentStage.code}</span>
              </div>

              {/* Visual Altitude Column with Rocket Indicator */}
              <div className="relative h-64 w-full bg-[#030712] rounded-lg border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
                {/* Horizontal Altitude Marks */}
                <div className="text-[9px] font-mono text-slate-500 flex justify-between border-b border-white/5 pb-1">
                  <span>542 KM</span>
                  <span className="text-[#00f0ff]">TARGET ORBIT</span>
                </div>
                <div className="text-[9px] font-mono text-slate-500 flex justify-between border-b border-white/5 pb-1">
                  <span>250 KM</span>
                  <span>THERMOSPHERE</span>
                </div>
                <div className="text-[9px] font-mono text-slate-500 flex justify-between border-b border-white/5 pb-1">
                  <span>100 KM</span>
                  <span>KÁRMÁN LINE</span>
                </div>
                <div className="text-[9px] font-mono text-slate-500 flex justify-between">
                  <span>0 KM</span>
                  <span>SURFACE PAD</span>
                </div>

                {/* Animated Rocket Position Pointer based on selectedStageIndex */}
                <div
                  className="absolute left-6 right-6 transition-all duration-700 flex items-center justify-between"
                  style={{
                    bottom: `${Math.min(90, Math.max(10, (selectedStageIndex / 5) * 85 + 8))}%`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff] shadow-[0_0_15px_#00f0ff]">
                      <Rocket className="w-4 h-4 text-[#00f0ff] -rotate-45" />
                    </div>
                    <span className="text-xs font-mono font-bold text-white bg-black/80 px-2 py-0.5 rounded border border-[#00f0ff]/40">
                      {currentStage.altitude}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#00f0ff] animate-pulse">
                    {currentStage.velocity}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs font-mono text-slate-400">
              <span className="text-slate-500 block text-[10px]">CURRENT TIMELINE:</span>
              <span className="text-white font-semibold">{currentStage.timeline}</span>
            </div>
          </div>

          {/* Right Column: Detailed Stage Telemetry & Description (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="font-heading font-black text-3xl sm:text-4xl text-[#00f0ff]">
                    STAGE {currentStage.step}
                  </span>
                  <span className="text-xl sm:text-2xl font-heading font-bold text-white uppercase">
                    // {currentStage.title}
                  </span>
                </div>
                <div className="px-3 py-1 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-mono tracking-widest uppercase">
                  NOMINAL SEQUENCE
                </div>
              </div>

              <h4 className="text-sm font-mono text-[#38bdf8] mb-4 uppercase">
                {currentStage.phase}
              </h4>

              <p className="text-base sm:text-lg text-slate-200 font-sans leading-relaxed mb-8">
                {currentStage.description}
              </p>

              {/* Active Systems Sub-List */}
              <div className="mb-6">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-3">
                  SUBSYSTEMS ACTIVE DURING THIS PHASE:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentStage.systemsActive.map((sys, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-slate-200 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
                      <span>{sys}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Next / Previous Stepper Controls */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setSelectedStageIndex((prev) => Math.max(0, prev - 1))}
                disabled={selectedStageIndex === 0}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 border border-white/10 text-xs font-mono tracking-wider uppercase transition-colors"
              >
                PREVIOUS PHASE
              </button>

              <span className="text-xs font-mono text-slate-500">
                PHASE {selectedStageIndex + 1} OF {JOURNEY_STAGES.length}
              </span>

              <button
                onClick={() =>
                  setSelectedStageIndex((prev) => Math.min(JOURNEY_STAGES.length - 1, prev + 1))
                }
                disabled={selectedStageIndex === JOURNEY_STAGES.length - 1}
                className="px-4 py-2 rounded-lg bg-[#00f0ff]/15 hover:bg-[#00f0ff]/25 text-[#00f0ff] disabled:opacity-30 border border-[#00f0ff]/30 text-xs font-mono tracking-wider uppercase transition-colors flex items-center gap-1"
              >
                <span>NEXT PHASE</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
