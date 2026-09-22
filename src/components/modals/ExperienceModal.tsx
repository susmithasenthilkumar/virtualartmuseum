import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, ChevronRight, Maximize2 } from 'lucide-react';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [progress, setProgress] = useState(0);

  const chapters = [
    {
      title: '01 • THE MONOLITH',
      subtitle: 'Forging Grade 5 Titanium',
      description: 'Zero seam lines. Precision CNC-milled structural boundary with microscopic thermal vapor channels.',
      accent: '#38bdf8',
    },
    {
      title: '02 • N1 ULTRA SILICON',
      subtitle: 'Next-Gen 3nm Extreme Lithography',
      description: '45 Trillion operations per second. Dedicated ray-tracing GPU and 16-core matrix neural accelerator.',
      accent: '#a855f7',
    },
    {
      title: '03 • 200MP MASTER OPTICS',
      subtitle: 'Folded Periscope Prism System',
      description: '10x True Optical Zoom with ball-bearing magnetic levitation OIS reacting at 12,000 corrections per second.',
      accent: '#f59e0b',
    },
    {
      title: '04 • ZERO-CLOUD COGNITION',
      subtitle: '100% Private On-Device Intelligence',
      description: 'Generative photo reconstruction, real-time live speech translation, and intelligent context synthesis.',
      accent: '#10b981',
    },
  ];

  // Auto-progress simulation
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentChapter((c) => (c + 1) % chapters.length);
          return 0;
        }
        return prev + 1.2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, chapters.length]);

  if (!isOpen) return null;

  const current = chapters[currentChapter];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-300">
      
      {/* Background ambient lighting */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: current.accent }}
      />

      {/* Main Experience Container */}
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#090b10] border border-white/15 shadow-2xl overflow-hidden flex flex-col justify-between max-h-[90vh]">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
            <span className="font-tech text-xs uppercase tracking-widest text-slate-300">
              NOVA X1 PRO MAX • CINEMATIC EXPERIENCE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cinematic Stage Visualization */}
        <div className="relative flex-1 min-h-[380px] sm:min-h-[460px] flex items-center justify-center p-6 sm:p-12 overflow-hidden bg-tech-grid">
          
          {/* Animated Waveform Visualizer */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
            <div className="flex items-center gap-1 sm:gap-2">
              {[40, 75, 120, 200, 310, 180, 95, 230, 360, 210, 140, 270, 180, 85, 45].map((h, i) => (
                <div
                  key={i}
                  className="w-1 sm:w-1.5 rounded-full transition-all duration-300"
                  style={{
                    height: isPlaying ? `${(h * (progress % 50)) / 25}px` : '40px',
                    backgroundColor: current.accent,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Center Cinematic Card Content */}
          <div className="relative z-10 max-w-xl text-center space-y-4">
            <div 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-tech font-bold uppercase tracking-widest backdrop-blur-md"
              style={{
                borderColor: `${current.accent}40`,
                backgroundColor: `${current.accent}15`,
                color: current.accent,
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{current.title}</span>
            </div>

            <h2 className="font-tech text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              {current.subtitle}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-lg mx-auto">
              {current.description}
            </p>

            {/* Interactive Hologram Badge */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                ULTRA-PRECISION ARCHITECTURE
              </span>
              <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                PATENT PENDING
              </span>
            </div>
          </div>

          {/* Floating Chapter Controls */}
          <div className="absolute bottom-6 inset-x-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 rounded-full bg-white text-black hover:bg-slate-200 transition-transform hover:scale-105 shadow-xl flex items-center justify-center cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
              </button>
              <span className="text-xs font-mono text-slate-400">
                {isPlaying ? 'PLAYING PREVIEW' : 'PAUSED'}
              </span>
            </div>

            {/* Chapter Indicators */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {chapters.map((ch, idx) => (
                <button
                  key={ch.title}
                  onClick={() => {
                    setCurrentChapter(idx);
                    setProgress(0);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentChapter === idx
                      ? 'w-8 bg-blue-500'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  title={ch.title}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Progress Scrub Bar */}
        <div className="w-full h-1 bg-white/10 overflow-hidden">
          <div
            className="h-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              backgroundColor: current.accent,
            }}
          />
        </div>

      </div>
    </div>
  );
};
