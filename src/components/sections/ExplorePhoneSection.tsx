import React, { useState } from 'react';
import { PhoneFinish } from '../../types/nova';
import { NovaPhone3D } from '../3d/NovaPhone3D';
import { Sparkles, Eye, Info, X, Compass, ChevronRight } from 'lucide-react';

interface ExplorePhoneSectionProps {
  finish: PhoneFinish;
}

interface ComponentTarget {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  specs: string;
  targetAngle: { rotX: number; rotY: number; zoom: number };
  positionBadge: string;
}

export const ExplorePhoneSection: React.FC<ExplorePhoneSectionProps> = ({ finish }) => {
  const componentTargets: ComponentTarget[] = [
    {
      id: 'display',
      name: 'DISPLAY',
      category: 'Front Canvas',
      tagline: '6.9-inch 120Hz Horizon OLED',
      description: 'Zero-bezel edge-to-edge organic light-emitting diode substrate with 3,200 nits outdoor clarity and microsecond touch response.',
      specs: '3200 × 1440 • 518 ppi • 1Hz-120Hz LTPO 4.0',
      targetAngle: { rotX: 0.0, rotY: 0.0, zoom: 4.6 },
      positionBadge: 'Front View',
    },
    {
      id: 'camera',
      name: 'CAMERA',
      category: 'Pro Imaging Island',
      tagline: '200MP Master Triple Periscope',
      description: 'Folded light path with continuous 10x true optical zoom, sapphire crystal outer elements, and dual-axis ball-bearing OIS.',
      specs: '200MP Main • 50MP Wide • 50MP 10x Periscope',
      targetAngle: { rotX: -0.2, rotY: Math.PI, zoom: 4.1 },
      positionBadge: 'Rear View',
    },
    {
      id: 'chip',
      name: 'CHIP',
      category: 'Core Logic',
      tagline: 'NOVA N1 Ultra Silicon',
      description: '3-nanometer compute fabric combining 8 CPU cores, 12 GPU cores, and a 45 TOPS Matrix Neural Engine under a liquid vapor cooling envelope.',
      specs: '3nm Lithography • 45 TOPS • 3.82GHz Peak',
      targetAngle: { rotX: 0.2, rotY: 0.4, zoom: 4.5 },
      positionBadge: 'Internal Core',
    },
    {
      id: 'battery',
      name: 'BATTERY',
      category: 'Power Reservoir',
      tagline: '5,500 mAh Silicon-Carbon Cell',
      description: 'High-density chemistry providing up to 34 hours of video playback. 100W HyperCharge achieves 50% replenishment in 9 minutes.',
      specs: '5,500 mAh • 100W Wired • 50W Qi2 Wireless',
      targetAngle: { rotX: 0.1, rotY: 1.0, zoom: 4.8 },
      positionBadge: 'Chassis Inset',
    },
    {
      id: 'speakers',
      name: 'SPEAKERS',
      category: 'Acoustic Chamber',
      tagline: 'Dual Spatial Stereo Enclosures',
      description: 'Dual 0.8cc acoustic back-cavities calibrated with Dolby Atmos spatial rendering for crisp highs and resonant sub-bass.',
      specs: '0.8cc Chambers • 24-bit/192kHz Hi-Res Audio',
      targetAngle: { rotX: 0.6, rotY: 0.2, zoom: 4.3 },
      positionBadge: 'Base Port',
    },
    {
      id: 'frame',
      name: 'FRAME',
      category: 'Perimeter Armor',
      tagline: 'Grade 5 Aerospace Titanium',
      description: 'Isothermally forged and precision CNC-milled for unmatched structural rigidity with an ultra-lightweight in-hand balance.',
      specs: 'Grade 5 Titanium • 198g • IP68 Submersion',
      targetAngle: { rotX: 0.0, rotY: Math.PI / 2, zoom: 4.6 },
      positionBadge: 'Side Profile',
    },
    {
      id: 'port',
      name: 'PORT',
      category: 'High-Speed Bus',
      tagline: '40Gbps Thunderbolt 4 / USB-C',
      description: 'Hardware interface supporting 8K 60fps external drive recording, high-throughput data pipelines, and DisplayPort 2.1 video output.',
      specs: '40 Gbps • DP 2.1 • 100W Power Delivery',
      targetAngle: { rotX: 0.7, rotY: 0.0, zoom: 4.2 },
      positionBadge: 'Bottom Bezel',
    },
  ];

  const [activeTarget, setActiveTarget] = useState<ComponentTarget>(componentTargets[0]);
  const [showDetailPanel, setShowDetailPanel] = useState<boolean>(true);

  const handleSelectComponent = (comp: ComponentTarget) => {
    setActiveTarget(comp);
    setShowDetailPanel(true);
  };

  return (
    <section id="explore-phone" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#07090e] border-t border-white/10 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[200px] opacity-15 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: finish.glowHex }}
      />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-tech font-bold uppercase tracking-[0.2em] text-blue-400">
            <Compass className="w-3.5 h-3.5" />
            <span>SECTION 09 • DEEP COMPONENT EXPLORATION</span>
          </div>

          <h2 className="font-tech text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Explore the Phone.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed">
            Select any floating component label to inspect its microscopic engineering. Rotate, inspect, and experience NOVA X1 PRO MAX in full 360-degree freedom.
          </p>
        </div>

        {/* Floating Labels Navigation Bar */}
        <div className="flex items-center justify-center flex-wrap gap-2 max-w-4xl mx-auto">
          {componentTargets.map((comp) => {
            const isSelected = activeTarget.id === comp.id;
            return (
              <button
                key={comp.id}
                onClick={() => handleSelectComponent(comp)}
                className={`px-4 py-2 rounded-full border text-xs font-tech font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-400 shadow-xl shadow-blue-500/25 scale-105'
                    : 'bg-black/60 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{comp.name}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Deep Exploration Stage */}
        <div className="relative max-w-6xl mx-auto h-[540px] sm:h-[640px] rounded-3xl bg-gradient-to-b from-[#090b14] to-[#04060a] border border-white/15 overflow-hidden shadow-2xl flex items-center justify-center">
          
          {/* Micro dots texture */}
          <div className="absolute inset-0 bg-tech-dots opacity-30 pointer-events-none" />

          {/* Top Left Instructions */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-xs font-mono text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>ROTATE TO EXPLORE • CLICK LABELS TO FOCUS</span>
          </div>

          {/* 3D Phone with target angle camera lerp */}
          <div className="w-full h-full">
            <NovaPhone3D
              finish={finish}
              interactive={true}
              autoRotate={false}
              targetAngle={activeTarget.targetAngle}
              showControls={true}
            />
          </div>

          {/* Floating Information Panel on Bottom/Right */}
          {showDetailPanel && (
            <div className="absolute bottom-6 right-6 z-30 max-w-sm w-full p-6 rounded-2xl bg-[#090d18]/90 border border-blue-500/40 backdrop-blur-xl shadow-2xl space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">
                  {activeTarget.category} • {activeTarget.positionBadge}
                </span>
                <button
                  onClick={() => setShowDetailPanel(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h3 className="font-tech text-xl font-bold text-white">
                {activeTarget.tagline}
              </h3>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {activeTarget.description}
              </p>

              <div className="pt-2 border-t border-white/10">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 block text-center">
                  {activeTarget.specs}
                </span>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
