import React from 'react';
import { Sparkles, Shield, ArrowUp, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020306] border-t border-white/10 text-slate-400 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-tech text-2xl font-black text-white tracking-widest">
                NOVA
              </span>
              <span className="text-[10px] font-mono text-blue-400 border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 rounded-full">
                X1 PRO MAX
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Technology, Reimagined. The definitive 2026 flagship smartphone showcase.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-tech font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer self-start md:self-auto"
          >
            <span>Back to Summit</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs font-sans">
          
          <div className="space-y-3">
            <h4 className="font-tech text-xs font-bold text-white uppercase tracking-wider">
              Architecture
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#design" className="hover:text-white transition-colors">Titanium Unibody</a></li>
              <li><a href="#display" className="hover:text-white transition-colors">Horizon OLED Display</a></li>
              <li><a href="#camera" className="hover:text-white transition-colors">200MP Triple Periscope</a></li>
              <li><a href="#performance" className="hover:text-white transition-colors">NOVA N1 Ultra Chip</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-tech text-xs font-bold text-white uppercase tracking-wider">
              Intelligence & Power
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#ai" className="hover:text-white transition-colors">Matrix Neural Engine</a></li>
              <li><a href="#battery" className="hover:text-white transition-colors">100W HyperCharge</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Secure Hardware Vault</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">Orbital Satellite SOS</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-tech text-xs font-bold text-white uppercase tracking-wider">
              Exploration
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#explore-phone" className="hover:text-white transition-colors">3D Interactive Model</a></li>
              <li><a href="#colors" className="hover:text-white transition-colors">Chromatic Finishes</a></li>
              <li><a href="#specifications" className="hover:text-white transition-colors">Technical Data</a></li>
              <li><a href="#compare" className="hover:text-white transition-colors">NOVA Lineup Comparison</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-tech text-xs font-bold text-white uppercase tracking-wider">
              Organization
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#technology-story" className="hover:text-white transition-colors">Genesis Timeline</a></li>
              <li><a href="#company" className="hover:text-white transition-colors">Corporate Philosophy</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Press & Media Relations</a></li>
            </ul>
          </div>

        </div>

        {/* Fictional Disclaimer & Compliance Notice */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-[11px] font-sans text-slate-400 leading-relaxed">
          <div className="flex items-center gap-2 text-white font-tech font-bold text-xs uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>Official Showcase & Concept Notice</span>
          </div>
          <p>
            NOVA and NOVA X1 PRO MAX are fictional concepts designed exclusively for demonstrating high-fidelity web technology, 3D computer graphics, and product showcase UX. No physical or digital consumer smartphones are sold, manufactured, or distributed through this domain. All specifications, processor microbenchmarks, optical focal lengths, and model comparisons are illustrative creations for artistic and developmental demonstration.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 pt-6 border-t border-white/5">
          <p>© 2026 NOVA Technologies Inc. All conceptual rights reserved.</p>
          <p>Non-commercial Flagship Product Launch Experience</p>
        </div>

      </div>
    </footer>
  );
};
