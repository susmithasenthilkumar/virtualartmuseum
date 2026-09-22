import React, { useState } from 'react';
import { 
  Heart, 
  Trash2, 
  Eye, 
  Share2, 
  Sparkles, 
  Award, 
  Flame, 
  Sun, 
  Moon, 
  Plus, 
  Check,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Artwork } from '../types';
import { ARTWORKS, ART_FALLBACK_IMAGE } from '../data/museumData';

interface PrivateSalonViewProps {
  savedArtworkIds: string[];
  onRemoveFromSalon: (artworkId: string) => void;
  onInspectArtwork: (artwork: Artwork) => void;
  onExploreGallery: () => void;
  onAddSampleArtworks: (artworkIds: string[]) => void;
}

export const PrivateSalonView: React.FC<PrivateSalonViewProps> = ({
  savedArtworkIds,
  onRemoveFromSalon,
  onInspectArtwork,
  onExploreGallery,
  onAddSampleArtworks
}) => {
  const [salonTitle, setSalonTitle] = useState('Echoes of Light and Solitude');
  const [curatorName, setCuratorName] = useState('Guest Connoisseur');
  const [salonLighting, setSalonLighting] = useState<'amber' | 'daylight' | 'dramatic'>('amber');
  const [showCertificate, setShowCertificate] = useState(false);

  const savedArtworks = savedArtworkIds
    .map(id => ARTWORKS.find(a => a.id === id))
    .filter((a): a is Artwork => !!a);

  const handleGenerateCertificate = () => {
    setShowCertificate(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const getWallBackground = () => {
    switch (salonLighting) {
      case 'daylight':
        return 'bg-[#151922]';
      case 'dramatic':
        return 'bg-[#08090C]';
      case 'amber':
      default:
        return 'bg-[#0E1118]';
    }
  };

  return (
    <section className="py-14 bg-[#0A0C10] border-b border-[#202533]" id="private-salon-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Salon Header & Curator Credentials */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-[#202533]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161B26] border border-[#2B3347] text-xs">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span className="text-[#C5A059] font-medium uppercase tracking-wider">
                Private Exhibition Wing
              </span>
            </div>
            
            <div className="space-y-1">
              <input
                type="text"
                value={salonTitle}
                onChange={(e) => setSalonTitle(e.target.value)}
                className="font-serif text-3xl sm:text-4xl text-[#F9FAFB] bg-transparent border-b border-dashed border-gray-700 hover:border-[#C5A059] focus:border-[#C5A059] focus:outline-none w-full max-w-xl pb-1"
                placeholder="Name your private exhibition..."
                title="Click to rename your exhibition"
              />
              <div className="flex items-center gap-2 text-xs text-[#94A3B8] italic pt-1">
                <span>Curated by</span>
                <input
                  type="text"
                  value={curatorName}
                  onChange={(e) => setCuratorName(e.target.value)}
                  className="text-[#C5A059] font-medium bg-transparent border-b border-gray-700 hover:border-[#C5A059] focus:outline-none"
                  placeholder="Your Name"
                />
                <span>• {savedArtworks.length} Masterpiece{savedArtworks.length === 1 ? '' : 's'} on Display</span>
              </div>
            </div>
          </div>

          {/* Salon Lighting Controls & Certificate Button */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Lighting Preset */}
            <div className="flex items-center bg-[#131722] p-1 rounded-lg border border-[#222838]">
              <button
                onClick={() => setSalonLighting('amber')}
                className={`p-2 rounded text-xs flex items-center gap-1 ${
                  salonLighting === 'amber' ? 'bg-[#C5A059]/20 text-[#C5A059]' : 'text-gray-400 hover:text-white'
                }`}
                title="Warm Amber Lighting"
              >
                <Flame className="w-3.5 h-3.5" />
                <span className="text-[10px] hidden sm:inline">Amber</span>
              </button>
              <button
                onClick={() => setSalonLighting('daylight')}
                className={`p-2 rounded text-xs flex items-center gap-1 ${
                  salonLighting === 'daylight' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-white'
                }`}
                title="Skylight Daylight"
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="text-[10px] hidden sm:inline">Skylight</span>
              </button>
              <button
                onClick={() => setSalonLighting('dramatic')}
                className={`p-2 rounded text-xs flex items-center gap-1 ${
                  salonLighting === 'dramatic' ? 'bg-amber-400/20 text-amber-300' : 'text-gray-400 hover:text-white'
                }`}
                title="Chiaroscuro"
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="text-[10px] hidden sm:inline">Chiaroscuro</span>
              </button>
            </div>

            {savedArtworks.length > 0 && (
              <button
                onClick={handleGenerateCertificate}
                className="px-4 py-2 rounded-lg bg-[#181D2A] hover:bg-[#252E42] border border-[#C5A059]/50 text-[#C5A059] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
              >
                <Award className="w-4 h-4" />
                <span>Curator Certificate</span>
              </button>
            )}
          </div>
        </div>

        {/* Salon Wall Hanging Display */}
        {savedArtworks.length > 0 ? (
          <div className={`p-8 sm:p-12 rounded-2xl border border-[#252B3C] shadow-2xl transition-colors duration-500 ${getWallBackground()}`}>
            
            {/* Gilded Gallery Wall Header Notice */}
            <div className="text-center mb-10 pb-4 border-b border-[#252B3C]/70">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-serif">
                L'Étoile Virtual Art Museum • Private Salon Wing
              </span>
              <h3 className="font-serif text-2xl text-white font-medium mt-1">
                "{salonTitle}"
              </h3>
            </div>

            {/* Framed Wall Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {savedArtworks.map(art => (
                <div 
                  key={art.id}
                  className="group relative flex flex-col items-center"
                >
                  {/* Classical Heavy Gilded Frame */}
                  <div className="relative p-3 rounded-lg bg-gradient-to-b from-[#382C1B] via-[#1D170E] to-[#110E09] border-[3px] border-[#C5A059]/80 shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:border-[#E5C378] w-full max-w-sm">
                    
                    {/* Inner Velvet Mat */}
                    <div className="p-2 bg-[#0E0D0B] border border-[#524126] rounded">
                      <div className="relative aspect-[3/4] overflow-hidden bg-black rounded">
                        <img
                          src={art.image}
                          alt={art.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = ART_FALLBACK_IMAGE;
                          }}
                        />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                          <button
                            onClick={() => onInspectArtwork(art)}
                            className="px-3 py-1.5 rounded-full bg-[#0E1017] border border-[#C5A059] text-[#F3F4F6] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                            <span>Inspect</span>
                          </button>
                          
                          <button
                            onClick={() => onRemoveFromSalon(art.id)}
                            className="p-1.5 rounded-full bg-rose-900/80 border border-rose-600 text-rose-200 hover:bg-rose-800"
                            title="Remove from salon"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Engraved Plaque below painting */}
                    <div className="mt-3 px-3 py-2 rounded bg-[#16130F] border border-[#C5A059]/40 text-center">
                      <h4 className="font-serif text-xs sm:text-sm font-medium text-white truncate">
                        {art.title}
                      </h4>
                      <p className="text-[10px] text-[#C5A059] font-medium truncate mt-0.5">
                        {art.artist} ({art.year})
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Parquet Floor Skirting */}
            <div className="mt-14 pt-4 border-t-2 border-[#382B1C] flex justify-between items-center text-xs text-[#94A3B8]">
              <span>Private Salon Collection</span>
              <button
                onClick={onExploreGallery}
                className="text-[#C5A059] hover:underline flex items-center gap-1 font-medium"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Curate more masterworks from collection</span>
              </button>
            </div>
          </div>
        ) : (
          /* Empty Salon State with Quick-Curate Suggestions */
          <div className="p-12 text-center bg-[#10131B] rounded-2xl border border-[#222838] space-y-6">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <Heart className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="font-serif text-2xl text-white font-medium">
                Your Private Salon Walls Await
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed">
                As a connoisseur at L'Étoile, you can curate your own personal exhibition. 
                Favorite artworks while browsing our wings or load a curator's starter selection below.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onAddSampleArtworks(['mona-lisa', 'starry-night', 'the-kiss', 'the-great-wave'])}
                className="px-5 py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#D4B36A] text-[#0A0C10] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Load Masterwork Starter Salon</span>
              </button>

              <button
                onClick={onExploreGallery}
                className="px-5 py-2.5 rounded-lg bg-[#181D2A] hover:bg-[#222838] border border-[#2B3347] text-white font-medium text-xs uppercase tracking-wider"
              >
                Explore Curated Wings
              </button>
            </div>
          </div>
        )}

        {/* Certificate Modal */}
        {showCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-xl bg-gradient-to-b from-[#1C1710] to-[#120F0A] border-4 border-[#C5A059] rounded-xl p-8 sm:p-10 shadow-2xl text-center space-y-6">
              
              <button
                onClick={() => setShowCertificate(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 text-gray-400 hover:text-white"
              >
                ×
              </button>

              <div className="w-12 h-12 rounded-full border-2 border-[#C5A059] mx-auto flex items-center justify-center text-[#C5A059]">
                <Award className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-serif">
                  Grand Salon Curation Certificate
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F9FAFB] font-normal">
                  Certificate of Aesthetic Distinction
                </h3>
              </div>

              <div className="p-4 rounded bg-[#0A0805] border border-[#4A381E] text-xs text-gray-300 space-y-2">
                <p>
                  This official document attests that
                </p>
                <p className="font-serif text-lg text-[#E5C378] font-bold">
                  {curatorName}
                </p>
                <p>
                  has curated the private salon exhibition
                </p>
                <p className="font-serif text-base text-white italic">
                  "{salonTitle}"
                </p>
                <p className="text-[11px] text-gray-500 pt-1">
                  Encompassing {savedArtworks.length} historic masterworks preserved in the permanent archives of L'Étoile Virtual Art Museum.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowCertificate(false)}
                  className="px-6 py-2.5 rounded-lg bg-[#C5A059] text-[#0A0C10] font-semibold text-xs uppercase tracking-wider"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
