import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  Volume2, 
  VolumeX, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Info, 
  BookOpen, 
  Palette, 
  Layers, 
  Play, 
  Pause,
  Check,
  Maximize2
} from 'lucide-react';
import { Artwork } from '../types';
import { ART_FALLBACK_IMAGE } from '../data/museumData';

interface ArtworkInspectorModalProps {
  artwork: Artwork;
  onClose: () => void;
  onNextArtwork: () => void;
  onPrevArtwork: () => void;
  isSavedInSalon: boolean;
  onToggleSalon: (artworkId: string, e: React.MouseEvent) => void;
}

export const ArtworkInspectorModal: React.FC<ArtworkInspectorModalProps> = ({
  artwork,
  onClose,
  onNextArtwork,
  onPrevArtwork,
  isSavedInSalon,
  onToggleSalon
}) => {
  const [activeTab, setActiveTab] = useState<'narrative' | 'context' | 'technique' | 'palette'>('narrative');
  
  // Magnifier state
  const [magnifierActive, setMagnifierActive] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 50, y: 50 }); // percentages
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 }); // client px
  const imageRef = useRef<HTMLImageElement>(null);

  // Audio Guide State using Web SpeechSynthesis
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechProgress, setSpeechProgress] = useState(0);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Handle Magnifier Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    
    // Check if within image bounds
    if (
      e.clientX < left || 
      e.clientX > left + width || 
      e.clientY < top || 
      e.clientY > top + height
    ) {
      setMagnifierActive(false);
      return;
    }

    const xPercent = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const yPercent = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));

    setMagnifierPos({ x: xPercent, y: yPercent });
    setCursorPos({ x: e.clientX, y: e.clientY });
    setMagnifierActive(true);
  };

  const handleMouseLeave = () => {
    setMagnifierActive(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNextArtwork();
      if (e.key === 'ArrowLeft') onPrevArtwork();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNextArtwork, onPrevArtwork]);

  // Handle Audio Guide Speech
  const toggleSpeechAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToSpeak = `${artwork.title} by ${artwork.artist}. ${artwork.audioGuideScript} ${artwork.description}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95; // gentle, steady curatorial cadence
      utterance.pitch = 1.0;

      utterance.onend = () => {
        setIsPlayingAudio(false);
      };
      utterance.onerror = () => {
        setIsPlayingAudio(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  // Stop speech when modal closes or artwork changes
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [artwork.id]);

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 lg:p-6 overflow-y-auto">
      
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-6xl max-h-[92vh] bg-[#0E1118] border border-[#2B3347] rounded-2xl shadow-2xl flex flex-col overflow-hidden my-auto"
        id="artwork-inspector-modal"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#202636] bg-[#121622]/90">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059] shadow-[0_0_8px_#C5A059]" />
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">
                8K Curatorial Inspector
              </span>
              <h2 className="font-serif text-lg text-white font-medium truncate max-w-md">
                {artwork.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Previous Masterwork */}
            <button
              onClick={onPrevArtwork}
              className="p-2 rounded-lg bg-[#181D2A] hover:bg-[#222838] border border-[#2B3347] text-gray-300 hover:text-white"
              title="Previous Masterwork (← Arrow Key)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Masterwork */}
            <button
              onClick={onNextArtwork}
              className="p-2 rounded-lg bg-[#181D2A] hover:bg-[#222838] border border-[#2B3347] text-gray-300 hover:text-white"
              title="Next Masterwork (→ Arrow Key)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#181D2A] hover:bg-rose-900/40 border border-[#2B3347] hover:border-rose-700/50 text-gray-300 hover:text-rose-200 transition-colors"
              title="Close Inspector (ESC)"
              id="close-inspector-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Body (2 Columns on Desktop) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
          
          {/* Left Column: Interactive High-Res Canvas with Magnifier */}
          <div 
            className="lg:col-span-7 p-6 sm:p-8 flex flex-col items-center justify-center bg-[#090B0F] border-b lg:border-b-0 lg:border-r border-[#202636] relative select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Classical Framing */}
            <div className="relative max-w-md w-full p-3 sm:p-4 rounded bg-gradient-to-b from-[#2D2316] via-[#1A140D] to-[#0E0B07] border-2 border-[#C5A059]/60 shadow-2xl">
              <div className="relative overflow-hidden bg-black rounded">
                <img
                  ref={imageRef}
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full max-h-[58vh] object-contain mx-auto transition-transform"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = ART_FALLBACK_IMAGE;
                  }}
                />

                {/* Simulated Museum Spotlighting */}
                <div className="absolute inset-0 pointer-events-none bg-radial from-white/5 via-transparent to-black/30" />
              </div>
            </div>

            {/* Magnifier Lens Loupe Float */}
            {magnifierActive && (
              <div 
                className="hidden sm:block pointer-events-none fixed w-44 h-44 rounded-full border-4 border-[#C5A059] shadow-2xl overflow-hidden z-50 bg-[#0E1017]"
                style={{
                  left: `${cursorPos.x - 88}px`,
                  top: `${cursorPos.y - 88}px`,
                  boxShadow: '0 0 35px rgba(0,0,0,0.9), 0 0 15px rgba(197,160,89,0.5)'
                }}
              >
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${artwork.image})`,
                    backgroundPosition: `${magnifierPos.x}% ${magnifierPos.y}%`,
                    backgroundSize: '400%',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                <div className="absolute inset-0 border border-white/20 rounded-full" />
                <div className="absolute bottom-2 inset-x-0 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-black/80 text-[9px] text-[#C5A059] font-mono uppercase tracking-wider">
                    3x Canvas Detail
                  </span>
                </div>
              </div>
            )}

            {/* Canvas Hint */}
            <div className="mt-4 flex items-center gap-2 text-xs text-[#64748B]">
              <ZoomIn className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">Hover over canvas for 3x micro-lens inspection</span>
              <span className="sm:hidden">Pinch or tap to view details</span>
            </div>
          </div>

          {/* Right Column: Curatorial Audio, Tabs, Analysis, and Location */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#0E1118]">
            
            <div className="space-y-6">
              {/* Top Details & Title */}
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059]">
                  {artwork.period}
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl text-white font-medium tracking-tight mt-1 leading-snug">
                  {artwork.title}
                </h1>
                <p className="text-sm text-[#E5C378] font-medium mt-1">
                  {artwork.artist} <span className="text-gray-400 font-normal text-xs">({artwork.artistDates})</span>
                </p>
                <p className="text-xs text-[#94A3B8] italic mt-0.5">
                  {artwork.year} • {artwork.medium}
                </p>
              </div>

              {/* Curatorial Audio Guide Player Bar */}
              <div className="p-4 rounded-xl bg-[#141824] border border-[#242C3E] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={toggleSpeechAudio}
                      className={`p-2.5 rounded-full transition-all ${
                        isPlayingAudio
                          ? 'bg-[#C5A059] text-[#0A0C10] shadow-lg shadow-[#C5A059]/30 scale-105'
                          : 'bg-[#1E2435] text-white hover:bg-[#283147]'
                      }`}
                      title={isPlayingAudio ? 'Pause Curatorial Guide' : 'Play Curatorial Guide'}
                    >
                      {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <div>
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                        Curatorial Audio Guide
                      </h4>
                      <p className="text-[11px] text-[#94A3B8]">
                        Narrated in English ({artwork.audioDuration})
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${isPlayingAudio ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-800 text-gray-400'}`}>
                    {isPlayingAudio ? 'Playing' : 'Ready'}
                  </span>
                </div>

                <p className="text-xs text-[#CBD5E1] italic bg-[#0D1017] p-2.5 rounded border border-[#1E2333] leading-relaxed">
                  "{artwork.audioGuideScript}"
                </p>
              </div>

              {/* Curatorial Tab Navigation */}
              <div className="flex items-center border-b border-[#222838] gap-2">
                <button
                  onClick={() => setActiveTab('narrative')}
                  className={`pb-2 text-xs font-medium uppercase tracking-wider transition-all border-b-2 ${
                    activeTab === 'narrative'
                      ? 'border-[#C5A059] text-[#C5A059]'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('context')}
                  className={`pb-2 text-xs font-medium uppercase tracking-wider transition-all border-b-2 ${
                    activeTab === 'context'
                      ? 'border-[#C5A059] text-[#C5A059]'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  History
                </button>
                <button
                  onClick={() => setActiveTab('technique')}
                  className={`pb-2 text-xs font-medium uppercase tracking-wider transition-all border-b-2 ${
                    activeTab === 'technique'
                      ? 'border-[#C5A059] text-[#C5A059]'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  Technique
                </button>
                <button
                  onClick={() => setActiveTab('palette')}
                  className={`pb-2 text-xs font-medium uppercase tracking-wider transition-all border-b-2 ${
                    activeTab === 'palette'
                      ? 'border-[#C5A059] text-[#C5A059]'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  Pigments
                </button>
              </div>

              {/* Tab Contents */}
              <div className="min-h-[160px] text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                {activeTab === 'narrative' && (
                  <div className="space-y-3">
                    <p>{artwork.description}</p>
                    <div className="p-3 rounded-lg bg-[#141824] border border-[#222838] text-xs">
                      <span className="text-[#C5A059] font-semibold uppercase tracking-wider block mb-1">
                        Curator's Note:
                      </span>
                      <p className="text-gray-300 italic">{artwork.curatorNotes}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'context' && (
                  <div className="space-y-3">
                    <p>{artwork.historicalContext}</p>
                    <div className="flex items-start gap-2 pt-2 border-t border-[#1F2535] text-xs">
                      <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-300 font-medium">Permanent Museum Location:</span>
                        <p className="text-[#C5A059]">{artwork.location}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'technique' && (
                  <div className="space-y-3">
                    <p>{artwork.compositionAnalysis}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                      <div className="p-2 rounded bg-[#141824] border border-[#202534]">
                        <span className="text-[#64748B] block">Dimensions:</span>
                        <span className="text-gray-200 font-medium">{artwork.dimensions}</span>
                      </div>
                      <div className="p-2 rounded bg-[#141824] border border-[#202534]">
                        <span className="text-[#64748B] block">Support / Medium:</span>
                        <span className="text-gray-200 font-medium truncate block">{artwork.medium}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'palette' && (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-400">
                      Spectrophotometric color harmonies extracted from this canvas. Click any swatch to copy hexadecimal pigment value:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {artwork.colorPalette.map(color => (
                        <div
                          key={color.name}
                          onClick={() => copyHex(color.hex)}
                          className="flex items-center gap-3 p-2 rounded-lg bg-[#141824] hover:bg-[#1A2030] border border-[#242C3E] cursor-pointer transition-colors"
                        >
                          <div
                            className="w-7 h-7 rounded-md border border-white/20 shadow-inner flex-shrink-0"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div className="min-w-0 flex-1">
                            <span className="text-xs text-white font-medium block truncate">
                              {color.name}
                            </span>
                            <span className="text-[10px] font-mono text-gray-400">
                              {color.hex}
                            </span>
                          </div>
                          {copiedHex === color.hex && (
                            <span className="text-[10px] text-emerald-400 font-semibold">
                              Copied!
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: Save to Salon */}
            <div className="pt-4 border-t border-[#202636] flex items-center justify-between gap-3">
              <button
                onClick={(e) => onToggleSalon(artwork.id, e)}
                className={`w-full py-3 rounded-lg border font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isSavedInSalon
                    ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-900/30'
                    : 'bg-[#181D2A] hover:bg-[#222838] border-[#2D354A] text-gray-200 hover:text-white'
                }`}
                id="modal-toggle-salon-btn"
              >
                <Heart className={`w-4 h-4 ${isSavedInSalon ? 'fill-white' : ''}`} />
                <span>{isSavedInSalon ? 'Saved in My Salon' : 'Add to My Private Salon'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
