import React, { useState } from 'react';
import { NOVA_SPECS } from '../../data/novaData';
import { Sliders, Search, Check, Sparkles, Monitor, Cpu, Camera, BatteryCharging, Wifi, Shield } from 'lucide-react';

export const SpecsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['ALL', ...NOVA_SPECS.map((s) => s.category)];

  const filteredSpecs = NOVA_SPECS.filter((group) => {
    if (activeCategory !== 'ALL' && group.category !== activeCategory) {
      return false;
    }
    if (!searchQuery) return true;
    return (
      group.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.specs.some(
        (s) =>
          s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.detail && s.detail.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
  });

  return (
    <section id="specifications" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#07090e] border-t border-white/10 overflow-hidden">
      
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-tech font-bold uppercase tracking-[0.2em] text-blue-400">
            <Sliders className="w-3.5 h-3.5" />
            <span>SECTION 11 • COMPLETE TECHNICAL DATA</span>
          </div>

          <h2 className="font-tech text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Specifications.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed">
            Every millimeter and transistor engineered to redefine what a mobile instrument can achieve. Explore the comprehensive technical breakdown.
          </p>

          <p className="text-xs font-mono text-slate-500">
            * All listed specifications are fictional parameters created for the NOVA product showcase concept.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-tech tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search specs (e.g. 200MP, 3nm)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>

        {/* Specs Matrix Cards */}
        <div className="max-w-5xl mx-auto space-y-8">
          {filteredSpecs.map((group) => (
            <div
              key={group.category}
              className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 backdrop-blur-md"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <span className="font-tech text-lg font-bold text-blue-400 tracking-wider">
                  {group.category}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.specs.map((item) => (
                  <div key={item.label} className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      {item.label}
                    </span>
                    <h4 className="font-tech text-sm sm:text-base font-bold text-white">
                      {item.value}
                    </h4>
                    {item.detail && (
                      <p className="text-[11px] text-slate-400 font-sans">
                        {item.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredSpecs.length === 0 && (
            <div className="text-center py-12 text-slate-400 font-sans">
              No specifications match your search query.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
