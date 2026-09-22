import React, { useState } from 'react';
import {
  Orbit,
  Moon,
  Compass,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Radio,
  Layers
} from 'lucide-react';
import { FUTURE_MISSIONS } from '../../data/orbitaData';

export const FutureMissions: React.FC = () => {
  const [selectedMission, setSelectedMission] = useState<string | null>(null);

  const getMissionIcon = (id: string) => {
    switch (id) {
      case 'orbit-01':
        return <Orbit className="w-6 h-6 text-[#00f0ff]" />;
      case 'luna-next':
        return <Moon className="w-6 h-6 text-[#38bdf8]" />;
      case 'mars-vision':
        return <Compass className="w-6 h-6 text-[#f97316]" />;
      case 'deepspace-x':
        return <Sparkles className="w-6 h-6 text-[#818cf8]" />;
    }
  };

  return (
    <section id="future-missions" className="relative py-24 sm:py-32 bg-[#02040a] overflow-hidden">
      {/* Background space lines */}
      <div className="absolute inset-0 bg-space-dots pointer-events-none opacity-20" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#818cf8]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            <span className="text-xs font-mono text-[#00f0ff] tracking-[0.25em] uppercase">
              SECTION 09 // STRATEGIC ROADMAP
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white uppercase mb-6">
            THE NEXT <span className="text-gradient-cyan">FRONTIER</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            Beyond low Earth orbit, ORBITA explores advanced technological concepts for planetary exploration, lunar surface telemetry, and deep-space autonomous scouts.
          </p>
        </div>

        {/* 4 Large Mission Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FUTURE_MISSIONS.map((mission) => {
            const isExpanded = selectedMission === mission.id;

            return (
              <div
                key={mission.id}
                className="group relative rounded-2xl border border-white/10 bg-[#070e20]/80 backdrop-blur-xl p-8 hover:border-[#00f0ff]/40 transition-all duration-300 flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(0,240,255,0.12)] hud-corner-tl"
              >
                <div>
                  {/* Top Bar: Mission Code & Status */}
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {getMissionIcon(mission.id)}
                      </div>
                      <div>
                        <span className="font-heading font-extrabold text-2xl text-white block tracking-wider">
                          {mission.code}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {mission.type}
                        </span>
                      </div>
                    </div>

                    <div className="px-3 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-mono tracking-widest uppercase font-semibold">
                      {mission.status}
                    </div>
                  </div>

                  {/* Mission Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white uppercase tracking-wide mb-2 group-hover:text-[#00f0ff] transition-colors">
                    {mission.name}
                  </h3>
                  <p className="text-xs font-mono text-[#38bdf8] mb-4">
                    “{mission.tagline}”
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
                    {mission.description}
                  </p>

                  {/* Mission Profile Specs */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs font-mono space-y-2 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Target Destination:</span>
                      <span className="text-white font-medium text-right">{mission.targetDestination}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Orbital Profile:</span>
                      <span className="text-slate-300 text-right">{mission.orbitProfile}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Estimated Bus Mass:</span>
                      <span className="text-[#00f0ff] font-medium">{mission.payloadMass}</span>
                    </div>
                  </div>

                  {/* Key Technologies Tags */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                      KEY ARCHITECTURAL TECHNOLOGIES:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {mission.keyTechnologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-[10px] text-amber-300/80">
                    CONCEPT ARCHITECTURE • NO DATES CLAIMED
                  </span>
                  <div className="flex items-center gap-1 text-[#00f0ff] group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE ARCHITECTURE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
