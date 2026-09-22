import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Eye, 
  Sun, 
  Moon, 
  Flame, 
  Headphones, 
  Sparkles,
  Info,
  Layers
} from 'lucide-react';
import { ARTWORKS, MUSEUM_WINGS, ART_FALLBACK_IMAGE } from '../data/museumData';
import { Artwork, MuseumWing } from '../types';

interface VirtualRoomWalkthroughProps {
  onSelectArtwork: (artwork: Artwork) => void;
  selectedWingId?: string;
  onWingChange?: (wingId: string) => void;
}

export const VirtualRoomWalkthrough: React.FC<VirtualRoomWalkthroughProps> = ({
  onSelectArtwork,
  selectedWingId = 'classical',
  onWingChange
}) => {
  const [activeWingId, setActiveWingId] = useState<string>(selectedWingId);
  const [wallIndex, setWallIndex] = useState(0);
  const [lightingPreset, setLightingPreset] = useState<'amber' | 'daylight' | 'dramatic'>('amber');
  const [isFullImmersion, setIsFullImmersion] = useState(false);

  // Filter artworks for this wing
  const wingArtworks = ARTWORKS.filter(a => a.wingId === activeWingId);
  // Break into sets of 3 paintings per gallery wall
  const artworksPerWall = 3;
  const totalWalls = Math.max(1, Math.ceil(wingArtworks.length / artworksPerWall));

  const currentWallArtworks = wingArtworks.slice(
    wallIndex * artworksPerWall,
    (wallIndex + 1) * artworksPerWall
  );

  const activeWing = MUSEUM_WINGS.find(w => w.id === activeWingId) || MUSEUM_WINGS[0];

  const handleNextWall = () => {
    setWallIndex((prev) => (prev + 1) % totalWalls);
  };

  const handlePrevWall = () => {
    setWallIndex((prev) => (prev - 1 + totalWalls) % totalWalls);
  };

  const handleWingSelect = (wingId: string) => {
    setActiveWingId(wingId);
    setWallIndex(0);
    if (onWingChange) onWingChange(wingId);
  };

  // Lighting classes based on preset
  const getLightingStyle = () => {
    switch (lightingPreset) {
      case 'daylight':
        return {
          wallBg: 'bg-[#151922]',
          spotlightGlow: 'radial-gradient(ellipse at 50% 15%, rgba(220, 235, 255, 0.16) 0%, rgba(10, 13, 18, 0) 70%)',
          accent: '#A5C4F0'
        };
      case 'dramatic':
        return {
          wallBg: 'bg-[#08090C]',
          spotlightGlow: 'radial-gradient(ellipse at 50% 20%, rgba(255, 215, 140, 0.25) 0%, rgba(5, 6, 8, 0) 60%)',
          accent: '#E5C378'
        };
      case 'amber':
      default:
        return {
          wallBg: 'bg-[#0E1117]',
          spotlightGlow: 'radial-gradient(ellipse at 50% 20%, rgba(229, 195, 120, 0.14) 0%, rgba(10, 12, 16, 0) 70%)',
          accent: '#C5A059'
        };
    }
  };

  const currentLighting = getLightingStyle();

  return (
    <section className="py-12 bg-[#08090C] border-b border-[#202533]" id="virtual-room-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Room Header & Curatorial Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059]">
                Interactive 3D Walkthrough
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-400">Wall {wallIndex + 1} of {totalWalls}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F9FAFB] font-normal tracking-tight">
              {activeWing.name}
            </h2>
            <p className="text-xs text-[#94A3B8] italic font-serif mt-1">
              {activeWing.frenchTitle} — Curated by {activeWing.curator}
            </p>
          </div>

          {/* Wing Selector Tabs & Gallery Lighting Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Wing Switcher */}
            <div className="flex items-center bg-[#121622] p-1 rounded-lg border border-[#222838] overflow-x-auto">
              {MUSEUM_WINGS.map(wing => (
                <button
                  key={wing.id}
                  onClick={() => handleWingSelect(wing.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                    activeWingId === wing.id
                      ? 'bg-[#C5A059] text-[#0A0C10] font-semibold'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {wing.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Lighting Preset Selector */}
            <div className="flex items-center bg-[#121622] p-1 rounded-lg border border-[#222838]">
              <button
                onClick={() => setLightingPreset('amber')}
                className={`p-1.5 rounded text-xs flex items-center gap-1 transition-all ${
                  lightingPreset === 'amber' ? 'bg-[#C5A059]/20 text-[#C5A059]' : 'text-gray-400 hover:text-white'
                }`}
                title="Warm Gallery Amber"
              >
                <Flame className="w-3.5 h-3.5" />
                <span className="text-[10px] hidden sm:inline">Amber</span>
              </button>
              <button
                onClick={() => setLightingPreset('daylight')}
                className={`p-1.5 rounded text-xs flex items-center gap-1 transition-all ${
                  lightingPreset === 'daylight' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-white'
                }`}
                title="Natural Skylight"
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="text-[10px] hidden sm:inline">Skylight</span>
              </button>
              <button
                onClick={() => setLightingPreset('dramatic')}
                className={`p-1.5 rounded text-xs flex items-center gap-1 transition-all ${
                  lightingPreset === 'dramatic' ? 'bg-amber-400/20 text-amber-300' : 'text-gray-400 hover:text-white'
                }`}
                title="Dramatic Chiaroscuro"
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="text-[10px] hidden sm:inline">Chiaroscuro</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3D Perspective Gallery Wall Box */}
        <div 
          className={`relative rounded-xl overflow-hidden border border-[#242A3B] transition-colors duration-500 shadow-2xl ${currentLighting.wallBg}`}
          style={{ minHeight: '560px' }}
        >
          {/* Ceiling Spotlight Glow */}
          <div 
            className="absolute inset-0 pointer-events-none transition-all duration-700"
            style={{ background: currentLighting.spotlightGlow }}
          />

          {/* Wall Molding Architectural Trim (Classic Museum Cornice) */}
          <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-[#1C202C] via-[#141720] to-transparent border-b border-[#2A3142]/60" />
          <div className="absolute top-10 inset-x-0 h-[1px] bg-[#222838]/80" />

          {/* Ceiling Museum Track Spotlights */}
          <div className="absolute top-3 inset-x-0 flex justify-around px-8 pointer-events-none opacity-40">
            <div className="w-3 h-2 rounded bg-[#C5A059]/80 shadow-[0_0_15px_#C5A059]" />
            <div className="w-3 h-2 rounded bg-[#C5A059]/80 shadow-[0_0_15px_#C5A059]" />
            <div className="w-3 h-2 rounded bg-[#C5A059]/80 shadow-[0_0_15px_#C5A059]" />
          </div>

          {/* Wall Navigation Arrows */}
          <button
            onClick={handlePrevWall}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-[#0E1017]/80 hover:bg-[#1A1F2C] border border-[#2A3144] text-white shadow-xl hover:scale-110 transition-all"
            title="Step to previous wall"
            id="walkthrough-prev-btn"
          >
            <ChevronLeft className="w-5 h-5 text-[#C5A059]" />
          </button>

          <button
            onClick={handleNextWall}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-[#0E1017]/80 hover:bg-[#1A1F2C] border border-[#2A3144] text-white shadow-xl hover:scale-110 transition-all"
            title="Step to next wall"
            id="walkthrough-next-btn"
          >
            <ChevronRight className="w-5 h-5 text-[#C5A059]" />
          </button>

          {/* Main Gallery Wall Canvas Hangings */}
          <div className="relative pt-12 pb-32 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 min-h-[460px]">
            {currentWallArtworks.length > 0 ? (
              currentWallArtworks.map((artwork, idx) => {
                const isCenterPiece = idx === 1 || currentWallArtworks.length === 1;

                return (
                  <div
                    key={artwork.id}
                    onClick={() => onSelectArtwork(artwork)}
                    className={`group relative cursor-pointer transition-all duration-500 hover:scale-105 flex flex-col items-center ${
                      isCenterPiece ? 'w-full md:w-5/12 max-w-sm z-10' : 'w-full md:w-3/12 max-w-[260px]'
                    }`}
                  >
                    {/* Spotlight Cone on Painting */}
                    <div 
                      className="absolute -top-8 w-full h-16 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none"
                      style={{ background: artwork.colorPalette[0]?.hex || '#C5A059' }}
                    />

                    {/* Classic Heavy Museum Frame */}
                    <div className="relative p-2.5 sm:p-3 rounded-md bg-gradient-to-b from-[#382D1C] via-[#1D170E] to-[#120F09] border-[3px] border-[#C5A059]/70 shadow-2xl group-hover:border-[#E5C378] group-hover:shadow-[0_15px_40px_rgba(197,160,89,0.3)] transition-all">
                      
                      {/* Inner Mat */}
                      <div className="p-1.5 sm:p-2 bg-[#0E0D0B] border border-[#483921] rounded">
                        <div className="relative overflow-hidden aspect-[4/5] bg-black/40">
                          <img
                            src={artwork.thumbnail || artwork.image}
                            alt={artwork.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = ART_FALLBACK_IMAGE;
                            }}
                          />

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                            <div className="px-3 py-1.5 rounded-full bg-[#0E1017]/90 border border-[#C5A059] text-[#F3F4F6] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                              <Eye className="w-3 h-3 text-[#C5A059]" />
                              <span>Inspect (8K)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Wall Label Plaque (Cartel de Musée) */}
                    <div className="mt-3 px-3 py-2 rounded bg-[#131722]/90 border border-[#262D3E] text-center shadow-lg max-w-[220px] transition-colors group-hover:border-[#C5A059]/60">
                      <h4 className="font-serif text-xs sm:text-sm font-medium text-[#F3F4F6] truncate">
                        {artwork.title}
                      </h4>
                      <p className="text-[10px] text-[#C5A059] font-medium truncate mt-0.5">
                        {artwork.artist} ({artwork.year})
                      </p>
                      <div className="flex items-center justify-center gap-1 text-[9px] text-[#94A3B8] mt-1">
                        <Headphones className="w-2.5 h-2.5 text-[#C5A059]" />
                        <span>{artwork.audioDuration} Audio Guide</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-[#94A3B8]">
                <p>No artworks located on this gallery wall section.</p>
              </div>
            )}
          </div>

          {/* Perspective Parquet Wood Floor */}
          <div className="absolute bottom-0 inset-x-0 h-28 parquet-floor flex items-center justify-center">
            {/* Museum Velvet Stanchion / Bench Silhouette */}
            <div className="w-48 sm:w-64 h-8 rounded-full bg-gradient-to-r from-[#17130F] via-[#2D2319] to-[#17130F] border border-[#4A3928] shadow-[0_10px_20px_rgba(0,0,0,0.8)] flex items-center justify-center opacity-85">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A7D52] font-serif">
                Salon Viewing Bench
              </span>
            </div>
          </div>

          {/* Wall Bottom Baseboard Trim */}
          <div className="absolute bottom-28 inset-x-0 h-4 bg-gradient-to-b from-[#1C1610] to-[#0D0B08] border-t border-[#3B2F21]" />
        </div>

        {/* Gallery Navigation Footer Guide */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            <span>Click any painting on the wall to launch the 8K Canvas Inspector & Audio Guide.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevWall}
              className="px-3 py-1 rounded bg-[#131722] hover:bg-[#1C2130] border border-[#242938] text-gray-300"
            >
              ← Previous Wall
            </button>
            <span className="text-gray-500 font-mono">
              Wall {wallIndex + 1}/{totalWalls}
            </span>
            <button
              onClick={handleNextWall}
              className="px-3 py-1 rounded bg-[#131722] hover:bg-[#1C2130] border border-[#242938] text-gray-300"
            >
              Next Wall →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
