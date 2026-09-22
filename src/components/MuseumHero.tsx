import React, { useState } from 'react';
import { 
  Sparkles, 
  Compass, 
  Maximize2, 
  Headphones, 
  ArrowRight, 
  Search, 
  ChevronRight,
  Eye,
  Info
} from 'lucide-react';
import { ARTWORKS, MUSEUM_FACTS, MUSEUM_WINGS, ART_FALLBACK_IMAGE } from '../data/museumData';
import { Artwork } from '../types';

interface MuseumHeroProps {
  onSelectArtwork: (artwork: Artwork) => void;
  onEnter3D: () => void;
  onExploreTours: () => void;
  onSelectWing: (wingId: string) => void;
}

export const MuseumHero: React.FC<MuseumHeroProps> = ({
  onSelectArtwork,
  onEnter3D,
  onExploreTours,
  onSelectWing
}) => {
  // Highlight masterpieces for hero showcase
  const featuredArtworks = ARTWORKS.filter(a => ['starry-night', 'mona-lisa', 'the-great-wave', 'the-kiss', 'water-lilies'].includes(a.id));
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  const currentArtwork = featuredArtworks[activeHeroIndex] || ARTWORKS[0];

  return (
    <section className="relative overflow-hidden bg-[#0A0C10] border-b border-[#202533] pt-8 pb-16 lg:py-20">
      {/* Ambient Gallery Lighting Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ background: currentArtwork.colorPalette[2]?.hex || '#C5A059' }}
      />
      <div className="absolute inset-0 bg-radial from-transparent via-[#0A0C10]/60 to-[#0A0C10] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges & Announcement */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161B26] border border-[#2B3347] text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#94A3B8]">The Grand Salon Archives</span>
            <span className="text-[#C5A059] font-medium">• Open to the World</span>
          </div>

          {/* Quick Wing Jump Links */}
          <div className="hidden lg:flex items-center gap-2 text-xs">
            <span className="text-[#64748B] uppercase tracking-wider text-[11px]">Wings:</span>
            {MUSEUM_WINGS.map(wing => (
              <button
                key={wing.id}
                onClick={() => onSelectWing(wing.id)}
                className="px-2.5 py-1 rounded-md bg-[#12151E] hover:bg-[#1A1F2C] border border-[#222736] text-[#CBD5E1] hover:text-[#C5A059] transition-colors"
              >
                {wing.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Vision & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C5A059]">
                Immersion in World Heritage
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#F9FAFB] leading-[1.15]">
                Behold Humanity’s <br />
                <span className="italic font-serif text-[#E5C378]">Greatest Masterpieces</span>
              </h1>
            </div>

            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed max-w-xl font-light">
              Step across centuries of artistic brilliance. Inspect micro-details with 
              gigapixel canvas magnification, listen to curatorial audio narrations, 
              and wander our virtual 3D gallery halls from anywhere on Earth.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onEnter3D}
                className="px-6 py-3.5 rounded-lg bg-[#C5A059] hover:bg-[#D4B36A] text-[#0A0C10] font-semibold text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-lg shadow-[#C5A059]/20 transition-all hover:translate-y-[-1px]"
                id="hero-3d-walkthrough-btn"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Enter 3D Gallery</span>
              </button>

              <button
                onClick={onExploreTours}
                className="px-6 py-3.5 rounded-lg bg-[#151924] hover:bg-[#1E2333] border border-[#2D3446] text-[#F3F4F6] font-medium text-sm uppercase tracking-wider flex items-center gap-2 transition-all"
                id="hero-audio-tours-btn"
              >
                <Headphones className="w-4 h-4 text-[#C5A059]" />
                <span>Audio Tours</span>
              </button>

              <button
                onClick={() => onSelectArtwork(currentArtwork)}
                className="px-4 py-3.5 rounded-lg bg-transparent hover:bg-white/5 border border-transparent hover:border-[#2D3446] text-[#94A3B8] hover:text-white text-sm flex items-center gap-1.5 transition-colors"
                id="hero-inspect-current-btn"
              >
                <Eye className="w-4 h-4 text-[#C5A059]" />
                <span>Inspect Spotlight</span>
              </button>
            </div>

            {/* Thumbnail Selector Row */}
            <div className="pt-4 border-t border-[#1C212E]">
              <p className="text-xs uppercase tracking-wider text-[#64748B] mb-2 font-medium">
                Spotlighted in the Grand Rotunda
              </p>
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {featuredArtworks.map((art, idx) => (
                  <button
                    key={art.id}
                    onClick={() => setActiveHeroIndex(idx)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                      idx === activeHeroIndex
                        ? 'border-[#C5A059] ring-2 ring-[#C5A059]/30 scale-105'
                        : 'border-[#262C3D] opacity-60 hover:opacity-100'
                    }`}
                    title={`${art.title} by ${art.artist}`}
                  >
                    <img
                      src={art.thumbnail}
                      alt={art.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = ART_FALLBACK_IMAGE;
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Artwork Display in Gilded Classical Frame */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* The Framed Masterpiece Canvas */}
            <div 
              onClick={() => onSelectArtwork(currentArtwork)}
              className="group relative cursor-pointer max-w-md w-full"
              id="hero-artwork-canvas-container"
            >
              {/* Outer Gilded Frame */}
              <div className="relative p-3.5 sm:p-5 rounded-lg bg-gradient-to-b from-[#3A2D1B] via-[#211A11] to-[#14100A] border-4 border-[#C5A059]/80 shadow-2xl transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(197,160,89,0.25)]">
                
                {/* Inner Linen Matting */}
                <div className="relative p-2.5 sm:p-4 bg-[#131210] border border-[#5A4525] rounded shadow-inner">
                  
                  {/* Canvas Image Container */}
                  <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded bg-[#1A1815]">
                    <img
                      src={currentArtwork.image}
                      alt={currentArtwork.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = ART_FALLBACK_IMAGE;
                      }}
                    />

                    {/* Spotlight overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 opacity-70 group-hover:opacity-40 transition-opacity" />

                    {/* Canvas Hover Prompt */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                      <div className="px-4 py-2 rounded-full bg-[#0E1017]/90 border border-[#C5A059] text-[#F3F4F6] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-xl">
                        <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Inspect Masterwork (8K Lens)</span>
                      </div>
                    </div>

                    {/* Live Period Tag */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0A0C10]/80 backdrop-blur-md border border-white/10 text-[11px] text-[#E5C378] font-medium tracking-wide">
                      {currentArtwork.period}
                    </div>

                    {/* Audio Length Pill */}
                    <div className="absolute top-3 right-3 px-2 py-1 rounded bg-[#0A0C10]/80 backdrop-blur-md border border-white/10 text-[10px] text-gray-300 flex items-center gap-1">
                      <Headphones className="w-3 h-3 text-[#C5A059]" />
                      <span>{currentArtwork.audioDuration}</span>
                    </div>
                  </div>
                </div>

                {/* Museum Brass Plaque */}
                <div className="mt-4 px-4 py-3 rounded bg-gradient-to-r from-[#1E1912] via-[#2A2317] to-[#1E1912] border border-[#C5A059]/40 text-center shadow-md">
                  <h3 className="font-serif text-lg font-medium text-[#F5F2EB] tracking-wide">
                    {currentArtwork.title}
                  </h3>
                  <p className="text-xs text-[#C5A059] font-medium tracking-wider uppercase mt-0.5">
                    {currentArtwork.artist} • {currentArtwork.year}
                  </p>
                  <p className="text-[11px] text-[#94A3B8] italic mt-1 truncate">
                    {currentArtwork.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Extracted Masterwork Color Harmonies */}
            <div className="mt-4 flex items-center gap-2 max-w-md w-full justify-center">
              <span className="text-[11px] text-[#64748B] uppercase tracking-wider">Palette:</span>
              <div className="flex items-center gap-1.5">
                {currentArtwork.colorPalette.map(color => (
                  <div
                    key={color.name}
                    className="w-5 h-5 rounded-full border border-black/40 shadow-sm transition-transform hover:scale-125 cursor-pointer"
                    style={{ backgroundColor: color.hex }}
                    title={`${color.name} (${color.hex})`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Museum Facts Strip */}
        <div className="mt-14 pt-8 border-t border-[#1C212E] grid grid-cols-2 md:grid-cols-4 gap-6">
          {MUSEUM_FACTS.map((fact, i) => (
            <div key={i} className="space-y-1">
              <div className="font-serif text-2xl sm:text-3xl font-normal text-[#C5A059]">
                {fact.metric}
              </div>
              <p className="text-xs text-[#94A3B8] font-light">
                {fact.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
