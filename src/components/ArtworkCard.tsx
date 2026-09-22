import React from 'react';
import { Eye, Heart, Headphones, MapPin, Sparkles } from 'lucide-react';
import { Artwork } from '../types';
import { ART_FALLBACK_IMAGE } from '../data/museumData';

interface ArtworkCardProps {
  artwork: Artwork;
  onInspect: (artwork: Artwork) => void;
  isSavedInSalon: boolean;
  onToggleSalon: (artworkId: string, e: React.MouseEvent) => void;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  onInspect,
  isSavedInSalon,
  onToggleSalon
}) => {
  return (
    <div 
      onClick={() => onInspect(artwork)}
      className="group relative flex flex-col bg-[#12151E] rounded-xl overflow-hidden border border-[#222838] hover:border-[#C5A059]/60 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] cursor-pointer"
      id={`artwork-card-${artwork.id}`}
    >
      {/* Canvas Frame Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#181C26]">
        {/* Artwork Image */}
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

        {/* Subtle Canvas Glaze Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/90 via-transparent to-black/20 opacity-60 group-hover:opacity-30 transition-opacity" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded bg-[#0A0C10]/85 backdrop-blur-md border border-white/10 text-[10px] text-[#E5C378] font-medium tracking-wide">
            {artwork.period}
          </span>

          {/* Save to Private Salon Button */}
          <button
            onClick={(e) => onToggleSalon(artwork.id, e)}
            className={`p-2 rounded-full backdrop-blur-md border transition-all ${
              isSavedInSalon
                ? 'bg-rose-500/90 border-rose-400 text-white shadow-md'
                : 'bg-[#0A0C10]/70 border-white/10 text-gray-300 hover:text-white hover:bg-black/80'
            }`}
            title={isSavedInSalon ? 'Remove from My Salon' : 'Add to My Private Salon'}
            id={`salon-btn-${artwork.id}`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSavedInSalon ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick Action Overlay on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          <div className="flex items-center gap-2">
            <span className="px-4 py-2 rounded-full bg-[#0E1017]/90 border border-[#C5A059] text-[#F3F4F6] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-xl">
              <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Inspect Canvas</span>
            </span>
          </div>
        </div>

        {/* Bottom Bar inside image: Audio Guide indication */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-gray-300">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/5">
            <Headphones className="w-3 h-3 text-[#C5A059]" />
            <span>{artwork.audioDuration}</span>
          </div>

          {/* Color Harmonies dot preview */}
          <div className="flex items-center gap-1 bg-black/60 px-1.5 py-0.5 rounded-full border border-white/5">
            {artwork.colorPalette.slice(0, 3).map((col) => (
              <span
                key={col.name}
                className="w-2.5 h-2.5 rounded-full border border-black/40"
                style={{ backgroundColor: col.hex }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Cartel / Information Plaque */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-serif text-base sm:text-lg font-medium text-[#F5F2EB] group-hover:text-[#E5C378] transition-colors leading-snug">
            {artwork.title}
          </h3>
          <p className="text-xs text-[#C5A059] font-medium tracking-wide mt-1">
            {artwork.artist} <span className="text-gray-400 font-normal">({artwork.year})</span>
          </p>
        </div>

        <p className="text-xs text-[#94A3B8] font-light line-clamp-2 leading-relaxed">
          {artwork.description}
        </p>

        <div className="pt-2 border-t border-[#1F2535] flex items-center justify-between text-[11px] text-[#64748B]">
          <span className="truncate max-w-[170px]" title={artwork.medium}>
            {artwork.medium}
          </span>
          <span className="text-[#C5A059] flex items-center gap-1 font-medium">
            Details →
          </span>
        </div>
      </div>
    </div>
  );
};
