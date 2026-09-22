import React, { useState } from 'react';
import {
  Cpu,
  Brain,
  ShieldAlert,
  Wrench,
  BarChart3,
  Sparkles,
  Network,
  Zap,
  ChevronRight
} from 'lucide-react';

export const AISection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const aiFeatures = [
    {
      id: 'autonomous-decisions',
      title: 'AUTONOMOUS DECISION MAKING',
      tagline: 'Sub-Second Orbital Hazard Evasion & Retargeting',
      quote: 'AI systems can assist spacecraft in responding to changing mission conditions.',
      description:
        'When unpredictable orbital debris or sudden high-radiation solar events occur, onboard neural models evaluate trajectory adjustments and initiate thruster maneuvers without waiting for ground station contact.',
      metric: '< 14 ms',
      metricLabel: 'Response Latency',
      techNode: 'Edge Decision Engine',
      icon: <Brain className="w-5 h-5 text-[#00f0ff]" />,
    },
    {
      id: 'anomaly-detection',
      title: 'ANOMALY DETECTION',
      tagline: 'Continuous Multi-Variant Telemetry Supervision',
      quote: 'Machine learning models can help identify unusual system behavior.',
      description:
        'Over 1,200 onboard sensory telemetry streams are continuously analyzed by autoencoder models to flag micro-vibrations, unexpected power draws, or thermal anomalies before they impact flight operations.',
      metric: '99.94%',
      metricLabel: 'Anomaly Precision',
      techNode: 'Autoencoder Neural Bus',
      icon: <ShieldAlert className="w-5 h-5 text-[#38bdf8]" />,
    },
    {
      id: 'predictive-maintenance',
      title: 'PREDICTIVE MAINTENANCE',
      tagline: 'Component Fatigue & Propellant Lifetime Forecasting',
      quote: 'Data-driven models can help anticipate potential equipment issues.',
      description:
        'Physics-informed machine learning models model bearing degradation, battery dendrite growth, and reaction wheel friction, scheduling proactive recalibrations to extend mission lifetime beyond 12 years.',
      metric: '12+ Years',
      metricLabel: 'Projected Operational Bus Life',
      techNode: 'Kinematic Degradation Model',
      icon: <Wrench className="w-5 h-5 text-[#818cf8]" />,
    },
    {
      id: 'earth-analytics',
      title: 'EARTH ANALYTICS',
      tagline: 'Edge Hyperspectral Cloud-Masking & Target Extraction',
      quote: 'AI can analyze large volumes of Earth observation data.',
      description:
        'Rather than downlinking terabytes of unneeded cloud imagery, onboard computer vision models filter obscurities, extract critical ground vectors (wildfire fronts, flood margins), and downlink prioritized intelligence.',
      metric: '82% Bandwidth',
      metricLabel: 'Downlink Optimization Efficiency',
      techNode: 'Orbital Vision Transformer',
      icon: <BarChart3 className="w-5 h-5 text-[#00f0ff]" />,
    },
  ];

  return (
    <section id="ai-in-space" className="relative py-24 sm:py-32 bg-[#02040a] overflow-hidden">
      {/* Background Neural Network Graphic (Procedural Nodes & Interconnects) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="neuralNet" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="#00f0ff" />
              <circle cx="100" cy="40" r="1" fill="#818cf8" />
              <circle cx="60" cy="90" r="1.5" fill="#38bdf8" />
              <line x1="20" y1="20" x2="100" y2="40" stroke="#00f0ff" strokeWidth="0.4" strokeOpacity="0.4" />
              <line x1="100" y1="40" x2="60" y2="90" stroke="#818cf8" strokeWidth="0.4" strokeOpacity="0.3" />
              <line x1="60" y1="90" x2="20" y2="20" stroke="#38bdf8" strokeWidth="0.4" strokeOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neuralNet)" />
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-[#00f0ff]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            <span className="text-xs font-mono text-[#00f0ff] tracking-[0.25em] uppercase">
              SECTION 07 // COGNITIVE ORBITAL SYSTEMS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white uppercase mb-6">
            INTELLIGENCE <span className="text-gradient-cyan">IN ORBIT</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            Space exploration requires distributed autonomy. By executing deep learning algorithms on radiation-hardened hardware directly at the edge, ORBITA spacecraft make informed planetary observations and mission decisions in real time.
          </p>
        </div>

        {/* Four Interactive Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {aiFeatures.map((feat, index) => {
            const isActive = activeFeature === index;
            return (
              <div
                key={feat.id}
                onClick={() => setActiveFeature(index)}
                className={`relative rounded-2xl border p-7 sm:p-8 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'border-[#00f0ff] bg-[#081226] shadow-[0_0_35px_rgba(0,240,255,0.18)]'
                    : 'border-white/10 bg-[#070e1e]/80 hover:border-white/25 hover:bg-[#070e1e]'
                } hud-corner-tl`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/30">
                        {feat.icon}
                      </div>
                      <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-wider font-semibold">
                        {feat.techNode}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                      ONBOARD NPU
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white uppercase tracking-wide mb-2">
                    {feat.title}
                  </h3>

                  <p className="text-xs font-mono text-[#38bdf8] mb-3">
                    {feat.tagline}
                  </p>

                  {/* Quote */}
                  <p className="text-sm font-sans text-slate-200 font-medium italic mb-4 border-l-2 border-[#00f0ff]/40 pl-3">
                    “{feat.quote}”
                  </p>

                  {/* Deep Description */}
                  <p className="text-sm text-slate-400 font-sans leading-relaxed mb-6">
                    {feat.description}
                  </p>
                </div>

                {/* Bottom Metric Gauge */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      {feat.metricLabel}
                    </span>
                    <span className="text-xl font-heading font-bold text-[#00f0ff]">
                      {feat.metric}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
                    <span>INSPECT</span>
                    <ChevronRight className="w-4 h-4 text-[#00f0ff]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Neural Architecture Diagnostic Bar */}
        <div className="p-6 rounded-2xl border border-white/10 bg-[#070d1d]/80 backdrop-blur-xl flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center">
              <Network className="w-6 h-6 text-[#00f0ff]" />
            </div>
            <div>
              <h4 className="text-base font-heading font-bold text-white uppercase">
                RAD-HARD NEURAL INFERENCE PIPELINE
              </h4>
              <p className="text-xs font-mono text-slate-400">
                Operating autonomously at 542 km altitude • Zero ground dependency for nominal operations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono">
            <div>
              <span className="text-slate-500 block uppercase text-[10px]">TENSOR THROUGHPUT</span>
              <span className="text-white font-bold">64 TOPS INT8</span>
            </div>
            <div className="border-l border-white/10 pl-6">
              <span className="text-slate-500 block uppercase text-[10px]">ECC STT-MRAM</span>
              <span className="text-[#00f0ff] font-bold">128 GB RAD-HARD</span>
            </div>
            <div className="border-l border-white/10 pl-6">
              <span className="text-slate-500 block uppercase text-[10px]">FAULT RECOVERY</span>
              <span className="text-emerald-400 font-bold">&lt; 200 ms RESTART</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
