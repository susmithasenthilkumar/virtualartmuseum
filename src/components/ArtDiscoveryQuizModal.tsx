import React, { useState } from 'react';
import { X, Sparkles, Compass, ArrowRight, RotateCcw, Eye, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ARTWORKS, ART_FALLBACK_IMAGE } from '../data/museumData';
import { Artwork } from '../types';

interface ArtDiscoveryQuizModalProps {
  onClose: () => void;
  onInspectArtwork: (artwork: Artwork) => void;
  onGoToWing: (wingId: string) => void;
}

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    wingId: 'classical' | 'impressionism' | 'modern' | 'oriental';
    artworkId: string;
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Which emotional landscape resonates with your soul today?',
    subtitle: 'Select the atmosphere that calls to you most instinctively.',
    options: [
      {
        label: 'Sacred Harmony & Divine Balance',
        description: 'Timeless human dignity, intellectual poise, and serene renaissance geometry.',
        wingId: 'classical',
        artworkId: 'mona-lisa'
      },
      {
        label: 'Fleeting Light & Sunlit Reverie',
        description: 'Water reflections, summer riverbanks, and the spontaneous joy of the present moment.',
        wingId: 'impressionism',
        artworkId: 'water-lilies'
      },
      {
        label: 'Cosmic Passion & Raw Emotion',
        description: 'Vibrating starry skies, golden intimacy, and existential longing that shatters convention.',
        wingId: 'modern',
        artworkId: 'starry-night'
      },
      {
        label: 'Sublime Nature & Meditative Stillness',
        description: 'Crashing tidal power, snow-capped sacred peaks, and ancient ink wash poetry.',
        wingId: 'oriental',
        artworkId: 'the-great-wave'
      }
    ]
  },
  {
    id: 2,
    question: 'Which visual texture draws your eye closest?',
    subtitle: 'Art is tactile sensation translated onto a surface.',
    options: [
      {
        label: 'Smoky Sfumato & Lapis Lazuli Glazes',
        description: 'Subtle transitions without sharp outlines, soft shadows breathing like living skin.',
        wingId: 'classical',
        artworkId: 'girl-with-pearl-earring'
      },
      {
        label: 'Vibrant Pointillist Dots & Broken Brushwork',
        description: 'Pure prismatic colors that vibrate optically in the retina of the beholder.',
        wingId: 'impressionism',
        artworkId: 'sunday-grande-jatte'
      },
      {
        label: 'Shimmering Gold Leaf & Intense Swirls',
        description: 'Rich decorative Byzantium patterns fused with expressive psychological depth.',
        wingId: 'modern',
        artworkId: 'the-kiss'
      },
      {
        label: 'Flowing Ink Washes & Mineral Pigments',
        description: 'Bold calligraphic strokes and precious mica dust capturing nature’s pulse.',
        wingId: 'oriental',
        artworkId: 'plum-blossoms'
      }
    ]
  },
  {
    id: 3,
    question: 'If you could spend one magical hour inside a painting...',
    subtitle: 'Where would your spirit wander?',
    options: [
      {
        label: 'Under the high vaulted arches of ancient Athens',
        description: 'Debating with philosophers, surrounded by marble statues and eternal truths.',
        wingId: 'classical',
        artworkId: 'school-of-athens'
      },
      {
        label: 'Drifting on a wooden punt through Monet’s lily pond',
        description: 'Listening to weeping willows in the damp fragrance of Giverny twilight.',
        wingId: 'impressionism',
        artworkId: 'water-lilies'
      },
      {
        label: 'Standing on a Provençal balcony beneath a swirling vortex',
        description: 'Watching the cosmos dance in radiant cobalt and cadmium golds.',
        wingId: 'modern',
        artworkId: 'starry-night'
      },
      {
        label: 'Standing upon a mountain ridge above a sea of mist',
        description: 'Confronting the infinite majesty of nature in contemplative solitude.',
        wingId: 'classical',
        artworkId: 'wanderer-fog'
      }
    ]
  }
];

export const ArtDiscoveryQuizModal: React.FC<ArtDiscoveryQuizModalProps> = ({
  onClose,
  onInspectArtwork,
  onGoToWing
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [resultArtwork, setResultArtwork] = useState<Artwork | null>(null);

  const handleSelectOption = (optionIndex: number) => {
    const nextAnswers = [...answers, optionIndex];
    setAnswers(nextAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate result
      const lastSelected = QUIZ_QUESTIONS[2].options[optionIndex];
      const match = ARTWORKS.find(a => a.id === lastSelected.artworkId) || ARTWORKS[0];
      setResultArtwork(match);

      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResultArtwork(null);
  };

  const currentQ = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0F121A] border border-[#2B3347] rounded-2xl shadow-2xl overflow-hidden my-auto p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#202534] mb-6">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#C5A059]" />
            <span className="font-serif text-lg text-white font-medium">
              Discover Your Aesthetic Muse
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#181D2A] hover:bg-[#222838] border border-[#2B3347] text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quiz Steps or Result */}
        {!resultArtwork ? (
          <div className="space-y-6">
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs text-[#94A3B8]">
              <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
              <div className="flex items-center gap-1.5">
                {QUIZ_QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === currentStep
                        ? 'bg-[#C5A059] ring-2 ring-[#C5A059]/40'
                        : i < currentStep
                        ? 'bg-gray-400'
                        : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question title */}
            <div className="space-y-1">
              <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                {currentQ.question}
              </h3>
              <p className="text-xs text-[#94A3B8] font-light">
                {currentQ.subtitle}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="w-full text-left p-4 rounded-xl bg-[#141824] hover:bg-[#1C2233] border border-[#242C3E] hover:border-[#C5A059]/70 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-base text-white group-hover:text-[#E5C378] transition-colors">
                      {opt.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-[#94A3B8] font-light mt-1">
                    {opt.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Screen */
          <div className="text-center space-y-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059]">
                Your Aesthetic Soul Match
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                {resultArtwork.title}
              </h3>
              <p className="text-xs text-[#E5C378] font-medium">
                by {resultArtwork.artist} • {resultArtwork.period}
              </p>
            </div>

            {/* Framed Match Image */}
            <div className="relative max-w-xs mx-auto p-3 rounded-lg bg-[#18140E] border-2 border-[#C5A059] shadow-2xl">
              <div className="aspect-[3/4] overflow-hidden rounded bg-black">
                <img
                  src={resultArtwork.image}
                  alt={resultArtwork.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = ART_FALLBACK_IMAGE;
                  }}
                />
              </div>
            </div>

            <p className="text-xs text-[#94A3B8] max-w-md mx-auto leading-relaxed italic">
              "{resultArtwork.description}"
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onInspectArtwork(resultArtwork);
                }}
                className="px-5 py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#D4B36A] text-[#0A0C10] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <Eye className="w-4 h-4" />
                <span>Inspect in 8K Detail</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onGoToWing(resultArtwork.wingId);
                }}
                className="px-5 py-2.5 rounded-lg bg-[#181D2A] hover:bg-[#222838] border border-[#2B3347] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Visit Wing Gallery
              </button>

              <button
                onClick={handleReset}
                className="p-2.5 rounded-lg bg-transparent hover:bg-white/5 text-gray-400 hover:text-white"
                title="Retake Quiz"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
