import React, { useState } from 'react';
import { 
  Compass, 
  Volume2, 
  VolumeX, 
  Heart, 
  Search, 
  Sparkles, 
  Maximize2,
  Menu,
  X,
  BookOpen,
  Film
} from 'lucide-react';
import { toggleAmbientSoundscape } from '../utils/audioSoundscape';

interface MuseumNavbarProps {
  activeTab: 'gallery' | 'virtual-room' | 'cinema' | 'tours' | 'salon';
  setActiveTab: (tab: 'gallery' | 'virtual-room' | 'cinema' | 'tours' | 'salon') => void;
  savedArtworksCount: number;
  onOpenQuiz: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const MuseumNavbar: React.FC<MuseumNavbarProps> = ({
  activeTab,
  setActiveTab,
  savedArtworksCount,
  onOpenQuiz,
  searchQuery,
  setSearchQuery
}) => {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleToggleAudio = () => {
    const nextState = toggleAmbientSoundscape();
    setIsAudioActive(nextState);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0D12]/95 backdrop-blur-md border-b border-[#242938] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => { setActiveTab('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 cursor-pointer group"
          id="museum-logo"
        >
          <div className="w-10 h-10 rounded border border-[#C5A059]/40 bg-gradient-to-br from-[#1C202E] to-[#0E1017] flex items-center justify-center shadow-md group-hover:border-[#C5A059] transition-colors">
            <span className="font-serif text-[#C5A059] text-xl font-bold tracking-widest">É</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg sm:text-xl font-medium tracking-[0.2em] text-[#F3F4F6] uppercase">
                L'Étoile
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-[#C5A059] px-1.5 py-0.5 rounded border border-[#C5A059]/30 bg-[#C5A059]/10">
                Virtual Salon
              </span>
            </div>
            <p className="text-[11px] text-[#94A3B8] tracking-widest uppercase">
              Grand Virtual Art Museum
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#131722] p-1.5 rounded-full border border-[#242938]">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
              activeTab === 'gallery'
                ? 'bg-[#C5A059] text-[#0B0D12] shadow-sm font-semibold'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
            id="nav-gallery"
          >
            Curated Wings
          </button>

          <button
            onClick={() => setActiveTab('virtual-room')}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'virtual-room'
                ? 'bg-[#C5A059] text-[#0B0D12] shadow-sm font-semibold'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
            id="nav-virtual-room"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            3D Walkthrough
          </button>

          <button
            onClick={() => setActiveTab('cinema')}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'cinema'
                ? 'bg-[#C5A059] text-[#0B0D12] shadow-sm font-semibold'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
            id="nav-cinema"
          >
            <Film className="w-3.5 h-3.5" />
            Cinema & Videos
          </button>

          <button
            onClick={() => setActiveTab('tours')}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'tours'
                ? 'bg-[#C5A059] text-[#0B0D12] shadow-sm font-semibold'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
            id="nav-tours"
          >
            <Compass className="w-3.5 h-3.5" />
            Audio Tours
          </button>

          <button
            onClick={() => setActiveTab('salon')}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'salon'
                ? 'bg-[#C5A059] text-[#0B0D12] shadow-sm font-semibold'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
            id="nav-salon"
          >
            <Heart className={`w-3.5 h-3.5 ${savedArtworksCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            My Salon
            {savedArtworksCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-rose-600 text-white text-[10px] font-bold rounded-full">
                {savedArtworksCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Action Utilities */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Quick Search */}
          <div className="relative">
            {showSearchInput ? (
              <div className="flex items-center bg-[#151924] border border-[#C5A059]/50 rounded-full px-3 py-1.5 w-60">
                <Search className="w-3.5 h-3.5 text-[#C5A059] mr-2" />
                <input
                  type="text"
                  placeholder="Search master, period, title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs text-white focus:outline-none w-full placeholder:text-gray-500"
                  autoFocus
                  onBlur={() => { if (!searchQuery) setShowSearchInput(false); }}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-gray-400 hover:text-white text-xs ml-1"
                  >
                    ×
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => { setShowSearchInput(true); setActiveTab('gallery'); }}
                className="p-2 rounded-full bg-[#151924] hover:bg-[#1E2333] border border-[#262C3E] text-[#94A3B8] hover:text-white transition-colors"
                title="Search masterpieces"
                id="search-toggle-btn"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Aesthetic Quiz Trigger */}
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A1F2C] hover:bg-[#252C3E] border border-[#31384D] text-[#C5A059] text-xs font-medium transition-colors"
            title="Take the 3-question aesthetic discovery quiz"
            id="quiz-modal-btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Find Muse</span>
          </button>

          {/* Ambient Museum Acoustic Audio Generator */}
          <button
            onClick={handleToggleAudio}
            className={`p-2 rounded-full border transition-all ${
              isAudioActive
                ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059]'
                : 'bg-[#151924] border-[#262C3E] text-[#94A3B8] hover:text-white'
            }`}
            title={isAudioActive ? 'Mute ambient museum acoustic atmosphere' : 'Play ambient museum acoustic resonance'}
            id="ambient-sound-btn"
          >
            {isAudioActive ? (
              <Volume2 className="w-4 h-4 animate-pulse text-[#C5A059]" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={handleToggleAudio}
            className={`p-2 rounded-full border text-xs ${
              isAudioActive ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059]' : 'border-gray-800 text-gray-400'
            }`}
          >
            {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#151924] border border-[#242938] text-gray-300"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F121A] border-b border-[#242938] px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center bg-[#151924] border border-[#242938] rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search master, movement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-white focus:outline-none w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => { setActiveTab('gallery'); setMobileMenuOpen(false); }}
              className={`p-3 rounded-lg text-xs uppercase tracking-wider font-semibold text-left border ${
                activeTab === 'gallery'
                  ? 'bg-[#C5A059] text-[#0B0D12] border-[#C5A059]'
                  : 'bg-[#151924] text-gray-300 border-[#242938]'
              }`}
            >
              Curated Wings
            </button>
            <button
              onClick={() => { setActiveTab('virtual-room'); setMobileMenuOpen(false); }}
              className={`p-3 rounded-lg text-xs uppercase tracking-wider font-semibold text-left border ${
                activeTab === 'virtual-room'
                  ? 'bg-[#C5A059] text-[#0B0D12] border-[#C5A059]'
                  : 'bg-[#151924] text-gray-300 border-[#242938]'
              }`}
            >
              3D Walkthrough
            </button>
            <button
              onClick={() => { setActiveTab('cinema'); setMobileMenuOpen(false); }}
              className={`p-3 rounded-lg text-xs uppercase tracking-wider font-semibold text-left border flex items-center gap-1.5 ${
                activeTab === 'cinema'
                  ? 'bg-[#C5A059] text-[#0B0D12] border-[#C5A059]'
                  : 'bg-[#151924] text-gray-300 border-[#242938]'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Cinema & Videos</span>
            </button>
            <button
              onClick={() => { setActiveTab('tours'); setMobileMenuOpen(false); }}
              className={`p-3 rounded-lg text-xs uppercase tracking-wider font-semibold text-left border ${
                activeTab === 'tours'
                  ? 'bg-[#C5A059] text-[#0B0D12] border-[#C5A059]'
                  : 'bg-[#151924] text-gray-300 border-[#242938]'
              }`}
            >
              Audio Tours
            </button>
            <button
              onClick={() => { setActiveTab('salon'); setMobileMenuOpen(false); }}
              className={`p-3 rounded-lg text-xs uppercase tracking-wider font-semibold text-left border flex items-center justify-between ${
                activeTab === 'salon'
                  ? 'bg-[#C5A059] text-[#0B0D12] border-[#C5A059]'
                  : 'bg-[#151924] text-gray-300 border-[#242938]'
              }`}
            >
              <span>My Salon</span>
              {savedArtworksCount > 0 && (
                <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {savedArtworksCount}
                </span>
              )}
            </button>
          </div>

          <button
            onClick={() => { onOpenQuiz(); setMobileMenuOpen(false); }}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#1E2333] to-[#2B2319] border border-[#C5A059]/40 text-[#C5A059] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Discover Your Art Muse Quiz
          </button>
        </div>
      )}
    </header>
  );
};
