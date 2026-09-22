import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Headphones, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  MapPin,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CuratedTour, Artwork } from '../types';
import { ARTWORKS, ART_FALLBACK_IMAGE } from '../data/museumData';

interface TourGuideModalProps {
  tour: CuratedTour;
  onClose: () => void;
  onInspectArtwork: (artwork: Artwork) => void;
}

export const TourGuideModal: React.FC<TourGuideModalProps> = ({
  tour,
  onClose,
  onInspectArtwork
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [completedTour, setCompletedTour] = useState(false);

  const tourArtworks = tour.artworkIds
    .map(id => ARTWORKS.find(a => a.id === id))
    .filter((a): a is Artwork => !!a);

  const currentArtwork = tourArtworks[currentStepIndex];

  // SpeechSynthesis audio control
  const toggleAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !currentArtwork) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const narrative = `Stop ${currentStepIndex + 1} of ${tour.title}. ${currentArtwork.title} by ${currentArtwork.artist}, painted in ${currentArtwork.year}. ${currentArtwork.audioGuideScript} ${currentArtwork.description}`;
      const utterance = new SpeechSynthesisUtterance(narrative);
      utterance.rate = 0.95;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  // Change stop
  const goToStep = (index: number) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setCurrentStepIndex(index);
    setCompletedTour(false);
  };

  const handleNext = () => {
    if (currentStepIndex < tourArtworks.length - 1) {
      goToStep(currentStepIndex + 1);
    } else {
      setCompletedTour(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1);
    }
  };

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!currentArtwork) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0F121A] border border-[#2B3347] rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-[#202534] bg-[#131722] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Headphones className="w-5 h-5 text-[#C5A059]" />
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold">
                Curated Audio Tour • Stop {currentStepIndex + 1} of {tourArtworks.length}
              </span>
              <h2 className="font-serif text-lg text-white font-medium">
                {tour.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#181D2A] hover:bg-[#23293B] border border-[#2B3347] text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tour Progress Bar */}
        <div className="bg-[#181C26] h-1.5 w-full">
          <div 
            className="bg-[#C5A059] h-full transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / tourArtworks.length) * 100}%` }}
          />
        </div>

        {/* Modal Main Content */}
        {completedTour ? (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center mx-auto text-[#C5A059]">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                Tour Completed
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                You Have Traversed "{tour.title}"
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed">
                Thank you for journeying through this curated dialogue between great masters. You can revisit any stop, or explore other museum wings.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => goToStep(0)}
                className="px-5 py-2.5 rounded-lg bg-[#181D2A] hover:bg-[#222838] border border-[#2B3347] text-xs font-semibold text-white uppercase tracking-wider"
              >
                Restart Tour
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#D4B36A] text-[#0A0C10] text-xs font-semibold uppercase tracking-wider"
              >
                Return to Museum
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Artwork Image Box */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative p-3 rounded-lg bg-[#18140E] border-2 border-[#C5A059]/70 shadow-2xl max-w-xs w-full">
                <div className="overflow-hidden rounded aspect-[3/4] bg-black">
                  <img
                    src={currentArtwork.image}
                    alt={currentArtwork.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = ART_FALLBACK_IMAGE;
                    }}
                  />
                </div>
              </div>

              <button
                onClick={() => onInspectArtwork(currentArtwork)}
                className="mt-3 text-xs text-[#C5A059] hover:underline flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Open 8K Canvas Inspector</span>
              </button>
            </div>

            {/* Curatorial Audio Narration & Context */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#C5A059] font-medium">
                  {currentArtwork.period} • {currentArtwork.year}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium mt-0.5">
                  {currentArtwork.title}
                </h3>
                <p className="text-sm text-[#E5C378]">
                  {currentArtwork.artist}
                </p>
                <p className="text-xs text-[#94A3B8] italic mt-0.5">
                  {currentArtwork.location}
                </p>
              </div>

              {/* Audio Playback Box */}
              <div className="p-4 rounded-xl bg-[#141824] border border-[#242C3E] space-y-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={toggleAudio}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs uppercase tracking-wider transition-all ${
                      isPlayingAudio
                        ? 'bg-[#C5A059] text-[#0A0C10] shadow-md'
                        : 'bg-[#1E2435] text-white hover:bg-[#283147]'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pause Narration</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Play Curatorial Guide ({currentArtwork.audioDuration})</span>
                      </>
                    )}
                  </button>

                  <span className="text-[11px] text-[#94A3B8]">
                    Stop {currentStepIndex + 1} of {tourArtworks.length}
                  </span>
                </div>

                <p className="text-xs text-gray-300 italic leading-relaxed bg-[#0E1017] p-3 rounded border border-[#1E2333]">
                  "{currentArtwork.audioGuideScript}"
                </p>
              </div>

              {/* Curatorial Analysis Extract */}
              <div className="space-y-2 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                <p>{currentArtwork.description}</p>
              </div>
            </div>

          </div>
        )}

        {/* Footer Navigation Bar */}
        {!completedTour && (
          <div className="px-6 py-4 border-t border-[#202534] bg-[#121622] flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                currentStepIndex === 0
                  ? 'opacity-40 cursor-not-allowed text-gray-500'
                  : 'bg-[#181D2A] hover:bg-[#222838] border border-[#2B3347] text-white'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Stop</span>
            </button>

            {/* Stepper Dots */}
            <div className="flex items-center gap-1.5">
              {tourArtworks.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToStep(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentStepIndex
                      ? 'bg-[#C5A059] scale-125'
                      : idx < currentStepIndex
                      ? 'bg-gray-400'
                      : 'bg-gray-700'
                  }`}
                  title={`Stop ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-lg bg-[#C5A059] hover:bg-[#D4B36A] text-[#0A0C10] font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all"
            >
              <span>{currentStepIndex === tourArtworks.length - 1 ? 'Finish Tour' : 'Next Stop'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
