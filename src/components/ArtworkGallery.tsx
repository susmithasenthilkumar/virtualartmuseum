import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Search, 
  Grid, 
  Columns, 
  BookOpen, 
  Sparkles, 
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';
import { ARTWORKS, MUSEUM_WINGS } from '../data/museumData';
import { Artwork, MuseumWing } from '../types';
import { ArtworkCard } from './ArtworkCard';

interface ArtworkGalleryProps {
  onInspectArtwork: (artwork: Artwork) => void;
  savedArtworkIds: string[];
  onToggleSalon: (artworkId: string, e: React.MouseEvent) => void;
  selectedWingId?: string;
  onWingChange: (wingId: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const ArtworkGallery: React.FC<ArtworkGalleryProps> = ({
  onInspectArtwork,
  savedArtworkIds,
  onToggleSalon,
  selectedWingId = 'all',
  onWingChange,
  searchQuery,
  setSearchQuery
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [selectedMedium, setSelectedMedium] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'chronological' | 'artist' | 'title'>('chronological');

  // Unique lists for secondary filters
  const periods = useMemo(() => {
    const list = Array.from(new Set(ARTWORKS.map(a => a.period)));
    return ['all', ...list];
  }, []);

  const mediums = ['all', 'Oil on canvas', 'Oil on poplar panel', 'Fresco', 'Woodblock print', 'Marble sculpture', 'Bronze'];

  // Filtered artworks
  const filteredArtworks = useMemo(() => {
    return ARTWORKS.filter(artwork => {
      // Wing filter
      if (selectedWingId !== 'all' && artwork.wingId !== selectedWingId) {
        return false;
      }
      // Period filter
      if (selectedPeriod !== 'all' && artwork.period !== selectedPeriod) {
        return false;
      }
      // Medium filter
      if (selectedMedium !== 'all' && !artwork.medium.toLowerCase().includes(selectedMedium.toLowerCase())) {
        return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = artwork.title.toLowerCase().includes(query);
        const matchesArtist = artwork.artist.toLowerCase().includes(query);
        const matchesPeriod = artwork.period.toLowerCase().includes(query);
        const matchesDesc = artwork.description.toLowerCase().includes(query);
        const matchesLocation = artwork.location.toLowerCase().includes(query);
        if (!matchesTitle && !matchesArtist && !matchesPeriod && !matchesDesc && !matchesLocation) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'artist') return a.artist.localeCompare(b.artist);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      // default chronological approx
      return a.year.localeCompare(b.year);
    });
  }, [selectedWingId, selectedPeriod, selectedMedium, searchQuery, sortBy]);

  const activeWingObj = MUSEUM_WINGS.find(w => w.id === selectedWingId);

  const resetFilters = () => {
    onWingChange('all');
    setSelectedPeriod('all');
    setSelectedMedium('all');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedWingId !== 'all' || selectedPeriod !== 'all' || selectedMedium !== 'all' || searchQuery !== '';

  return (
    <section className="py-14 bg-[#0A0C10]" id="gallery-curated-wings">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curatorial Wing Banner if specific wing selected */}
        {activeWingObj && (
          <div className="mb-10 rounded-xl overflow-hidden border border-[#262D3E] bg-[#12151E] relative">
            <div className="p-6 sm:p-8 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059]">
                  {activeWingObj.floor} • {activeWingObj.roomNumber}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F9FAFB] font-normal">
                  {activeWingObj.name}
                </h2>
                <p className="text-xs text-[#94A3B8] italic font-serif">
                  {activeWingObj.frenchTitle} — Curated by {activeWingObj.curator}
                </p>
                <p className="text-sm text-[#94A3B8] font-light pt-1 leading-relaxed">
                  {activeWingObj.description}
                </p>
              </div>

              <div className="flex-shrink-0 flex items-center gap-3">
                <button
                  onClick={() => onWingChange('all')}
                  className="px-4 py-2 rounded-lg bg-[#181C26] hover:bg-[#222838] border border-[#2B3347] text-xs text-[#CBD5E1] transition-colors"
                >
                  View All Wings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Section Header & Search/Filter Controls */}
        <div className="space-y-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059]">
                Permanent Collections
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F9FAFB] font-normal tracking-tight mt-1">
                The Masterwork Galleries
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 font-light">
                Showing {filteredArtworks.length} of {ARTWORKS.length} digitized masterworks in museum collection
              </p>
            </div>

            {/* Quick Sort Options */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#64748B]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#141824] border border-[#242A3C] text-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:border-[#C5A059]"
              >
                <option value="chronological">Chronological Era</option>
                <option value="artist">Artist Name</option>
                <option value="title">Artwork Title</option>
              </select>
            </div>
          </div>

          {/* Primary Filter Tabs: Museum Wings */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#1E2333] scrollbar-none">
            <button
              onClick={() => onWingChange('all')}
              className={`px-4 py-2 rounded-md text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedWingId === 'all'
                  ? 'bg-[#C5A059] text-[#0A0C10] font-semibold shadow-sm'
                  : 'bg-[#121622] text-[#94A3B8] hover:text-white border border-[#202535]'
              }`}
            >
              All Wings ({ARTWORKS.length})
            </button>

            {MUSEUM_WINGS.map(wing => {
              const count = ARTWORKS.filter(a => a.wingId === wing.id).length;
              return (
                <button
                  key={wing.id}
                  onClick={() => onWingChange(wing.id)}
                  className={`px-4 py-2 rounded-md text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all ${
                    selectedWingId === wing.id
                      ? 'bg-[#C5A059] text-[#0A0C10] font-semibold shadow-sm'
                      : 'bg-[#121622] text-[#94A3B8] hover:text-white border border-[#202535]'
                  }`}
                >
                  {wing.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Secondary Filter Dropdowns & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Filters:</span>
              </div>

              {/* Period Dropdown */}
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-[#121520] border border-[#222838] text-xs text-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:border-[#C5A059]"
              >
                <option value="all">All Movements & Eras</option>
                {periods.filter(p => p !== 'all').map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

              {/* Medium Dropdown */}
              <select
                value={selectedMedium}
                onChange={(e) => setSelectedMedium(e.target.value)}
                className="bg-[#121520] border border-[#222838] text-xs text-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:border-[#C5A059]"
              >
                <option value="all">All Mediums & Materials</option>
                {mediums.filter(m => m !== 'all').map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs text-[#C5A059] hover:underline px-2 py-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>

            {searchQuery && (
              <div className="text-xs text-gray-400">
                Searching for <span className="text-[#C5A059] font-semibold">"{searchQuery}"</span>
              </div>
            )}
          </div>
        </div>

        {/* Artworks Grid */}
        {filteredArtworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredArtworks.map(artwork => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                onInspect={onInspectArtwork}
                isSavedInSalon={savedArtworkIds.includes(artwork.id)}
                onToggleSalon={onToggleSalon}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#10131B] rounded-xl border border-[#202534] space-y-4">
            <p className="font-serif text-xl text-gray-300">
              No masterworks match your selected criteria.
            </p>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Try adjusting your search terms, clearing movement filters, or exploring other museum wings.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-lg bg-[#C5A059] text-[#0A0C10] text-xs font-semibold uppercase tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
