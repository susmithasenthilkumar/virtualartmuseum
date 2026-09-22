import React, { useState } from 'react';
import { DECORATION_ITEMS } from '../data/cakeData';
import { DecorationItem } from '../types/cake';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Shuffle, Info, Check, Heart } from 'lucide-react';

export const DecorationLabSection: React.FC = () => {
  // Array of active decoration IDs placed on the display cake
  const [activeDecorations, setActiveDecorations] = useState<string[]>([
    'strawberries',
    'piped_rosettes',
    'gold_leaf',
  ]);
  const [tierColor, setTierColor] = useState<string>('#fdf6ec'); // default vanilla

  const toggleDecoration = (item: DecorationItem) => {
    if (activeDecorations.includes(item.id)) {
      setActiveDecorations(activeDecorations.filter((id) => id !== item.id));
    } else {
      setActiveDecorations([...activeDecorations, item.id]);
      // Gentle celebratory sparkle
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { y: 0.7 },
        colors: ['#d97736', '#f5dfb3', '#ffd166', '#be3a4a'],
        ticks: 80,
      });
    }
  };

  const handleClear = () => {
    setActiveDecorations([]);
  };

  const handleRandomize = () => {
    const randomCount = Math.floor(Math.random() * 4) + 3;
    const shuffled = [...DECORATION_ITEMS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, randomCount).map((d) => d.id);
    setActiveDecorations(selected);
  };

  return (
    <section id="section-lab" className="py-24 relative bg-[#150f0c] text-[#f7efe6] overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-[#d97736]/6 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#d97736] tracking-widest uppercase mb-2">
            <span>Chapter 07</span>
            <span>•</span>
            <span>Interactive Studio</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#fbf6ec]">
            THE DECORATION LABORATORY
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#d4b996] font-light leading-relaxed">
            Cake decoration is where pastry physics transforms into fine art. Click on edible decorative elements below to experiment with sculptural balance, color contrast, and textural harmony on the live display cake.
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#f5dfb3]">
            <Info className="w-3.5 h-3.5 text-[#d97736]" />
            <span>Pure Educational Simulation • No Commercial or Purchase Elements</span>
          </div>
        </div>

        {/* Decoration Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Display Cake Preview */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 shadow-2xl relative flex flex-col items-center justify-between min-h-[520px]">
              
              {/* Studio Header Bar */}
              <div className="w-full flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-[#d97736]">
                <span>DISPLAY CAKE PEDESTAL</span>
                <span className="text-[#f5dfb3]">{activeDecorations.length} Accents Placed</span>
              </div>

              {/* The Live Interactive Visual Display Cake */}
              <div className="relative w-72 h-80 my-auto flex flex-col items-center justify-end select-none">
                
                {/* PEDESTAL STAND */}
                <div className="w-48 h-3 rounded-full bg-[#2a1c14] border border-white/15 shadow-2xl" />
                <div className="w-12 h-14 bg-gradient-to-b from-[#2a1c14] to-[#1c120c] border-x border-white/10" />
                <div className="w-64 h-4 rounded-full bg-[#352319] border border-white/15 shadow-xl -mt-1" />

                {/* BOTTOM TIER */}
                <div
                  className="relative w-56 h-28 rounded-t-xl transition-colors duration-500 shadow-2xl border-t border-x border-white/20 flex flex-col justify-between overflow-visible"
                  style={{ backgroundColor: tierColor }}
                >
                  {/* Chocolate Drip Overlay (if active) */}
                  {activeDecorations.includes('chocolate_drip') && (
                    <div className="absolute top-0 inset-x-0 h-10 flex justify-around pointer-events-none z-20">
                      <div className="w-3 h-8 bg-[#2b170e] rounded-b-full shadow-md" />
                      <div className="w-2.5 h-6 bg-[#2b170e] rounded-b-full shadow-md" />
                      <div className="w-3.5 h-10 bg-[#2b170e] rounded-b-full shadow-md" />
                      <div className="w-2 h-7 bg-[#2b170e] rounded-b-full shadow-md" />
                      <div className="w-3 h-9 bg-[#2b170e] rounded-b-full shadow-md" />
                    </div>
                  )}

                  {/* Gold Specks (if active) */}
                  {activeDecorations.includes('gold_leaf') && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-15">
                      <span className="absolute top-3 left-4 w-2 h-2 rounded-sm bg-[#ffd700] rotate-12 shadow-sm animate-pulse" />
                      <span className="absolute top-8 right-6 w-2.5 h-1.5 rounded-sm bg-[#ffd700] -rotate-45 shadow-sm" />
                      <span className="absolute bottom-5 left-10 w-1.5 h-2 rounded-sm bg-[#ffd700] rotate-45 shadow-sm" />
                    </div>
                  )}

                  {/* TOP TIER */}
                  <div
                    className="relative w-40 h-24 mx-auto -mt-20 rounded-t-xl transition-colors duration-500 shadow-xl border-t border-x border-white/20 overflow-visible flex items-center justify-center"
                    style={{ backgroundColor: tierColor }}
                  >
                    {/* Crown Garnishes Arranged on Top Tier */}
                    <div className="absolute -top-7 inset-x-0 flex items-center justify-center gap-1.5 z-30 flex-wrap px-2">
                      {/* Strawberries */}
                      {activeDecorations.includes('strawberries') && (
                        <span className="text-2xl animate-bounce" title="Strawberries">🍓</span>
                      )}

                      {/* Raspberries & Figs */}
                      {activeDecorations.includes('raspberries') && (
                        <span className="text-xl" title="Berries & Figs">🫐</span>
                      )}

                      {/* Macaron */}
                      {activeDecorations.includes('macarons') && (
                        <span className="text-xl" title="Macarons">🍪</span>
                      )}

                      {/* Edible Flowers */}
                      {activeDecorations.includes('edible_flowers') && (
                        <span className="text-2xl animate-pulse" title="Edible Flowers">🌸</span>
                      )}

                      {/* Chocolate Curls */}
                      {activeDecorations.includes('chocolate_curls') && (
                        <span className="text-xl" title="Chocolate Curls">🍫</span>
                      )}
                    </div>

                    {/* Rosettes Piped Border (if active) */}
                    {activeDecorations.includes('piped_rosettes') && (
                      <div className="absolute -top-2 inset-x-1 flex justify-between z-25 pointer-events-none px-1">
                        <span className="w-4 h-4 rounded-full bg-[#fdecd2] border border-[#d97736]/30 shadow-md" />
                        <span className="w-4 h-4 rounded-full bg-[#fdecd2] border border-[#d97736]/30 shadow-md" />
                        <span className="w-4 h-4 rounded-full bg-[#fdecd2] border border-[#d97736]/30 shadow-md" />
                        <span className="w-4 h-4 rounded-full bg-[#fdecd2] border border-[#d97736]/30 shadow-md" />
                        <span className="w-4 h-4 rounded-full bg-[#fdecd2] border border-[#d97736]/30 shadow-md" />
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Pedestal Controls */}
              <div className="w-full pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                {/* Frosting Color Swatches */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#f7efe6]/60">Base:</span>
                  {[
                    { color: '#fdf6ec', name: 'Vanilla' },
                    { color: '#382218', name: 'Ganache' },
                    { color: '#f7cad0', name: 'Rose' },
                    { color: '#dbe7c9', name: 'Pistachio' },
                  ].map((s) => (
                    <button
                      key={s.name}
                      onClick={() => setTierColor(s.color)}
                      className={`w-5 h-5 rounded-full border transition-all ${
                        tierColor === s.color ? 'border-white ring-2 ring-[#d97736]' : 'border-white/30'
                      }`}
                      style={{ backgroundColor: s.color }}
                      title={s.name}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRandomize}
                    className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-[#f7efe6]/80 flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Randomize aesthetic balance"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>Aesthetic Mix</span>
                  </button>
                  <button
                    onClick={handleClear}
                    className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-[#f7efe6]/80 flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Clear all garnishes"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Edible Decoration Element Palette */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#d97736] uppercase tracking-wider mb-2">
              <span>Edible Elements Palette</span>
              <span>Click to toggle garnish</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DECORATION_ITEMS.map((item) => {
                const isActive = activeDecorations.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleDecoration(item)}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer group ${
                      isActive
                        ? 'bg-gradient-to-r from-[#2c1d15] to-[#1c130d] border-[#d97736] shadow-lg shadow-[#d97736]/15 ring-1 ring-[#d97736]/50'
                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15'
                    }`}
                  >
                    <span className="text-3xl p-2 rounded-xl bg-black/40 border border-white/10 shrink-0 group-hover:scale-110 transition-transform">
                      {item.emoji}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-bold text-sm text-[#fbf6ec] group-hover:text-[#f5dfb3]">
                          {item.name}
                        </h4>
                        {isActive && (
                          <Check className="w-4 h-4 text-[#d97736] shrink-0" />
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-[#d97736] uppercase block mt-0.5">
                        Category: {item.category}
                      </span>
                      <p className="mt-1 text-[11px] text-[#f7efe6]/70 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Pastry Chef Aesthetic Rules */}
            <div className="mt-6 p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <span className="text-xs font-mono uppercase text-[#f5dfb3] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d97736]" />
                <span>The Golden Rules of Cake Aesthetics</span>
              </span>
              <ul className="text-xs text-[#f7efe6]/75 space-y-1 font-light leading-relaxed">
                <li>• <strong>Rule of Odds:</strong> Garnish in clusters of 3, 5, or 7 items to create dynamic optical movement.</li>
                <li>• <strong>Negative Space:</strong> Leave 30% of the surface bare so the pristine frosting sheen can breathe.</li>
                <li>• <strong>Height Variation:</strong> Contrast tall upright berries or macarons against flat gold flakes and low piped shell borders.</li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
