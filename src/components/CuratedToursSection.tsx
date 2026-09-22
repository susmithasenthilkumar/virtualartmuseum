import React from 'react';
import { Compass, Headphones, Clock, ArrowRight, Play, Sparkles } from 'lucide-react';
import { CURATED_TOURS, ARTWORKS, ART_FALLBACK_IMAGE } from '../data/museumData';
import { CuratedTour, Artwork } from '../types';

interface CuratedToursSectionProps {
  onStartTour: (tour: CuratedTour) => void;
  onInspectArtwork: (artwork: Artwork) => void;
}

export const CuratedToursSection: React.FC<CuratedToursSectionProps> = ({
  onStartTour,
  onInspectArtwork
}) => {
  return (
    <section className="py-14 bg-[#0A0C10] border-b border-[#202533]" id="curated-tours-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161B26] border border-[#2B3347] text-xs">
            <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[#C5A059] font-medium uppercase tracking-wider">Audio Journey</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F9FAFB] font-normal tracking-tight">
            Curated Thematic Audio Tours
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed">
            Follow our chief curators on immersive audio journeys connecting masterpieces across centuries, exploring light, existential nature, and sacred mythologies.
          </p>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CURATED_TOURS.map(tour => {
            const tourArtworks = ARTWORKS.filter(a => tour.artworkIds.includes(a.id));

            return (
              <div 
                key={tour.id}
                className="group relative flex flex-col bg-[#12151E] rounded-xl overflow-hidden border border-[#222838] hover:border-[#C5A059]/60 transition-all duration-300 hover:shadow-2xl"
              >
                {/* Tour Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={tour.coverImage}
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = ART_FALLBACK_IMAGE;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12151E] via-black/40 to-transparent" />

                  {/* Duration Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0A0C10]/80 backdrop-blur-md border border-white/10 text-[11px] text-gray-200 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#C5A059]" />
                    <span>{tour.estimatedMinutes} Minutes</span>
                  </div>

                  {/* Artworks Count */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#0A0C10]/80 backdrop-blur-md border border-white/10 text-[11px] text-[#E5C378] font-medium">
                    {tour.artworkIds.length} Masterworks
                  </div>

                  {/* Play Tour Overlay */}
                  <div 
                    onClick={() => onStartTour(tour)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#C5A059] text-[#0A0C10] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </div>
                </div>

                {/* Tour Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#C5A059] font-semibold">
                      {tour.theme}
                    </span>
                    <h3 className="font-serif text-xl text-white font-medium group-hover:text-[#E5C378] transition-colors">
                      {tour.title}
                    </h3>
                    <p className="text-xs text-gray-400 italic">
                      {tour.subtitle}
                    </p>
                    <p className="text-xs text-[#94A3B8] font-light leading-relaxed pt-1">
                      {tour.introduction}
                    </p>
                  </div>

                  {/* Included Masterworks Thumbnails Strip */}
                  <div className="pt-3 border-t border-[#1E2435]">
                    <span className="text-[10px] uppercase tracking-wider text-[#64748B] block mb-2">
                      Included in this Tour:
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {tourArtworks.map(art => (
                        <div
                          key={art.id}
                          onClick={() => onInspectArtwork(art)}
                          className="w-10 h-10 rounded border border-[#262D3E] overflow-hidden flex-shrink-0 cursor-pointer hover:border-[#C5A059] transition-colors"
                          title={`${art.title} by ${art.artist}`}
                        >
                          <img
                            src={art.thumbnail}
                            alt={art.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = ART_FALLBACK_IMAGE;
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Start Tour Button */}
                  <button
                    onClick={() => onStartTour(tour)}
                    className="w-full py-2.5 rounded-lg bg-[#181D2A] hover:bg-[#C5A059] text-gray-200 hover:text-[#0A0C10] border border-[#2B3347] hover:border-[#C5A059] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <Headphones className="w-3.5 h-3.5" />
                    <span>Begin Curated Audio Tour</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
