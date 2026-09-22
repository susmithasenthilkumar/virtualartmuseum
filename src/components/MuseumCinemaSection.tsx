import React, { useState, useRef } from 'react';
import { 
  Film, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Clock, 
  UserCheck, 
  Sparkles, 
  Layers,
  CheckCircle2
} from 'lucide-react';
import { MUSEUM_VIDEOS } from '../data/museumData';
import { MuseumVideoExhibit } from '../types';

interface MuseumCinemaSectionProps {
  onSelectArtworkById?: (artworkId: string) => void;
}

export const MuseumCinemaSection: React.FC<MuseumCinemaSectionProps> = () => {
  const [activeVideo, setActiveVideo] = useState<MuseumVideoExhibit>(MUSEUM_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleSelectVideo = (video: MuseumVideoExhibit) => {
    setActiveVideo(video);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // autoplays might be restricted without user interaction
        setIsPlaying(false);
      });
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section className="py-14 bg-[#080A0E] border-b border-[#202533]" id="museum-cinema-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#1E2433]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161B26] border border-[#2B3347] text-xs">
              <Film className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[#C5A059] font-medium uppercase tracking-wider">
                Pavilion of Motion & Cinema
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F9FAFB] font-normal tracking-tight">
              Virtual Art Video Exhibits
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-light max-w-xl leading-relaxed">
              Experience the fluid physics of oceanic waves, time-lapse botanicals from Monet's Giverny sanctuary, and high-definition architectural lighting studies.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#C5A059] bg-[#121622] px-4 py-2 rounded-lg border border-[#252C3D]">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>4 High-Definition Motion Exhibits Available</span>
          </div>
        </div>

        {/* Main Video Theater Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Main Video Player Screen (8 cols) */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black border-2 border-[#C5A059]/40 shadow-2xl group">
              <video
                ref={videoRef}
                src={activeVideo.videoUrl}
                poster={activeVideo.posterImage}
                muted={isMuted}
                playsInline
                loop
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-cover"
              />

              {/* Video Overlay Controls Bar */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 sm:p-6 pointer-events-none">
                
                {/* Top Badge */}
                <div className="flex items-center justify-between pointer-events-auto">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-[#E5C378] font-medium">
                    {activeVideo.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[11px] text-gray-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C5A059]" />
                      <span>{activeVideo.duration}</span>
                    </span>
                  </div>
                </div>

                {/* Big Center Play/Pause Indicator if paused */}
                <div className="self-center pointer-events-auto">
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full bg-[#C5A059]/90 hover:bg-[#D4B36A] text-[#0A0C10] flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7 fill-current" />
                    ) : (
                      <Play className="w-7 h-7 ml-1 fill-current" />
                    )}
                  </button>
                </div>

                {/* Bottom Control Actions */}
                <div className="flex items-center justify-between pointer-events-auto pt-2">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white border border-white/10"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white border border-white/10"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#C5A059]" />}
                    </button>

                    <span className="text-xs text-white/90 font-medium hidden sm:inline">
                      {activeVideo.title}
                    </span>
                  </div>

                  <button
                    onClick={handleFullscreen}
                    className="p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white border border-white/10"
                    title="Fullscreen Mode"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Unmute prompt banner if muted and playing */}
              {isPlaying && isMuted && (
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A059] text-xs text-[#E5C378] flex items-center gap-1.5 shadow-lg animate-pulse"
                >
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Click to Unmute Audio</span>
                </button>
              )}
            </div>

            {/* Video Metadata Panel */}
            <div className="p-6 rounded-xl bg-[#121622] border border-[#222838] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs uppercase tracking-wider text-[#C5A059] font-semibold">
                  {activeVideo.category} • {activeVideo.duration}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Curatorial Commentary: {activeVideo.narrator}</span>
                </span>
              </div>

              <h3 className="font-serif text-2xl text-white font-medium">
                {activeVideo.title}
              </h3>
              <p className="text-xs text-[#E5C378] italic">
                {activeVideo.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed pt-1">
                {activeVideo.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeVideo.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded bg-[#181D2B] border border-[#2A3347] text-[11px] text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Video Exhibit Playlist (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#94A3B8] font-semibold block px-1">
              Select Video Exhibit
            </span>

            <div className="space-y-3">
              {MUSEUM_VIDEOS.map(video => {
                const isSelected = activeVideo.id === video.id;

                return (
                  <div
                    key={video.id}
                    onClick={() => handleSelectVideo(video)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                      isSelected
                        ? 'bg-[#1A2030] border-[#C5A059] shadow-lg'
                        : 'bg-[#10141E] border-[#222838] hover:border-gray-600 hover:bg-[#151926]'
                    }`}
                  >
                    {/* Video Thumbnail */}
                    <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-black border border-white/10">
                      <img
                        src={video.posterImage}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-[#C5A059] text-[#0A0C10]' : 'bg-white/70 text-black'
                        }`}>
                          <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 px-1 rounded bg-black/80 text-[9px] text-white">
                        {video.duration}
                      </span>
                    </div>

                    {/* Exhibit Title & Info */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-medium truncate">
                          {video.category}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                        )}
                      </div>
                      <h4 className={`text-xs font-serif font-medium line-clamp-2 ${
                        isSelected ? 'text-white' : 'text-gray-200'
                      }`}>
                        {video.title}
                      </h4>
                      <p className="text-[11px] text-[#64748B] truncate">
                        {video.narrator}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Curatorial Note */}
            <div className="p-4 rounded-xl bg-[#0D1017] border border-[#1C2232] text-xs text-[#94A3B8] space-y-1 mt-4">
              <span className="text-[#C5A059] font-serif font-medium block">
                Digital Preservation Archive
              </span>
              <p className="text-[11px] font-light leading-relaxed">
                All video exhibits are rendered in native web-standard format to provide seamless, stutter-free playback across all modern desktop, tablet, and mobile displays.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
