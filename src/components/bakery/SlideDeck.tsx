import React, { useState, useEffect, useRef } from 'react';
import { Slide1Welcome } from './slides/Slide1Welcome';
import { Slide2Story } from './slides/Slide2Story';
import { Slide3Specialties } from './slides/Slide3Specialties';
import { Slide4SignatureCakes } from './slides/Slide4SignatureCakes';
import { Slide5QualityProcess } from './slides/Slide5QualityProcess';
import { Slide6VisitContact } from './slides/Slide6VisitContact';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutList, 
  Sliders, 
  Sparkles, 
  Palette,
} from 'lucide-react';
import { BAKERY_THEMES, ThemeId } from '../../theme/bakeryThemes';

export const SlideDeck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState<'deck' | 'continuous'>('deck');
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>('rose-berry');
  const [showThemePicker, setShowThemePicker] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const theme = BAKERY_THEMES[currentThemeId];

  const slides = [
    { id: 0, title: 'Welcome', subtitle: 'Brand Essence', component: Slide1Welcome },
    { id: 1, title: 'Our Story', subtitle: 'Slow Ferment Philosophy', component: Slide2Story },
    { id: 2, title: 'What We Bake', subtitle: 'Handmade Collections', component: Slide3Specialties },
    { id: 3, title: 'Signature Cakes', subtitle: 'Haute Patisserie', component: Slide4SignatureCakes },
    { id: 4, title: 'Quality & Art', subtitle: 'Terroir & Baking Stages', component: Slide5QualityProcess },
    { id: 5, title: 'Visit & Inquire', subtitle: 'Location & Consultation', component: Slide6VisitContact },
  ];

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    if (viewMode === 'continuous') {
      const el = document.getElementById(`slide-section-${idx}`);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in form inputs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key >= '1' && e.key <= '6') {
        goToSlide(parseInt(e.key, 10) - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
  };

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div 
      className={`min-h-screen ${theme.bgClass} ${theme.textPrimaryClass} flex flex-col justify-between relative transition-colors duration-500 overflow-hidden`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Bar */}
      <header className={`sticky top-0 z-40 ${theme.navBgClass} backdrop-blur-md border-b ${theme.borderClass} px-4 sm:px-8 py-3 transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Brand Mark */}
          <div 
            onClick={() => goToSlide(0)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className={`w-9 h-9 rounded-full ${theme.accentBgClass} text-white flex items-center justify-center font-serif font-bold italic shadow-sm transition-transform duration-300 group-hover:scale-105`}>
              VW
            </div>
            <div>
              <span className={`font-serif text-base sm:text-lg font-bold tracking-wider ${theme.textPrimaryClass} uppercase block leading-none`}>
                THE VELVET WHISK
              </span>
              <span className={`text-[9px] font-sans tracking-widest ${theme.accentClass} uppercase font-semibold block mt-0.5`}>
                Artisan Patisserie • 6-Slide Showcase
              </span>
            </div>
          </div>

          {/* Current Slide Indicator & Progress Bar (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="text-right">
              <span className={`text-xs font-mono font-bold ${theme.accentClass} block`}>
                SLIDE 0{currentSlide + 1} OF 0{totalSlides}
              </span>
              <span className={`text-[11px] font-serif ${theme.textSecondaryClass} italic block`}>
                {slides[currentSlide].title}
              </span>
            </div>

            {/* Micro Progress Bar */}
            <div className="w-24 h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <div 
                className={`h-full ${theme.accentBgClass} transition-all duration-300 rounded-full`}
                style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
              />
            </div>
          </div>

          {/* Theme Selector + Mode Toggle + Inquire */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Palette Selector */}
            <div className="relative">
              <div className={`hidden sm:flex items-center gap-1 p-1 rounded-full ${theme.cardBgClass} border ${theme.borderClass} shadow-sm backdrop-blur-md`}>
                {(Object.keys(BAKERY_THEMES) as ThemeId[]).map((tid) => {
                  const t = BAKERY_THEMES[tid];
                  const isActive = currentThemeId === tid;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setCurrentThemeId(t.id)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-sans transition-all flex items-center gap-1 cursor-pointer ${
                        isActive
                          ? `${t.accentBgClass} text-white shadow-sm font-semibold`
                          : `${theme.textSecondaryClass} hover:${theme.textPrimaryClass}`
                      }`}
                      title={`Switch to ${t.name}`}
                    >
                      <span>{t.icon}</span>
                      <span className="hidden xl:inline">{t.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile theme toggle button */}
              <button
                onClick={() => setShowThemePicker(!showThemePicker)}
                className={`sm:hidden p-2 rounded-full ${theme.cardBgClass} border ${theme.borderClass} ${theme.textPrimaryClass} text-xs shadow-sm flex items-center gap-1`}
                aria-label="Change Theme"
              >
                <Palette className="w-3.5 h-3.5" />
                <span>{theme.icon}</span>
              </button>

              {/* Mobile Theme Dropdown */}
              {showThemePicker && (
                <div className={`sm:hidden absolute right-0 mt-2 w-48 rounded-2xl ${theme.cardBgClass} border ${theme.borderClass} shadow-xl p-2 z-50 space-y-1`}>
                  {(Object.keys(BAKERY_THEMES) as ThemeId[]).map((tid) => {
                    const t = BAKERY_THEMES[tid];
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setCurrentThemeId(t.id);
                          setShowThemePicker(false);
                        }}
                        className={`w-full px-3 py-2 rounded-xl text-left text-xs font-sans flex items-center gap-2 ${
                          currentThemeId === tid ? `${t.accentBgClass} text-white font-bold` : `${theme.textPrimaryClass} hover:opacity-80`
                        }`}
                      >
                        <span>{t.icon}</span>
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Toggle Slide Deck vs Continuous View */}
            <button
              onClick={() => setViewMode(viewMode === 'deck' ? 'continuous' : 'deck')}
              className={`p-1.5 sm:px-3 sm:py-1.5 rounded-full border ${theme.borderClass} ${theme.textPrimaryClass} text-[11px] font-sans font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${theme.cardBgClass} shadow-sm`}
              title={viewMode === 'deck' ? 'Switch to Continuous Scroll View' : 'Switch to Slide Deck View'}
            >
              {viewMode === 'deck' ? (
                <>
                  <LayoutList className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Continuous View</span>
                </>
              ) : (
                <>
                  <Sliders className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Slide Deck</span>
                </>
              )}
            </button>

            {/* Right Action: Quick Inquire */}
            <button
              onClick={() => goToSlide(5)}
              className={`px-3.5 py-1.5 rounded-full ${theme.accentBgClass} ${theme.accentHoverBgClass} text-white text-[11px] font-sans font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Inquire</span>
            </button>

          </div>

        </div>
      </header>

      {/* Main Slide Presentation Content */}
      {viewMode === 'deck' ? (
        <main className="flex-1 flex flex-col justify-center items-center w-full min-h-[calc(100vh-140px)] py-4 relative">
          <div 
            key={`${currentSlide}-${currentThemeId}`}
            className="w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-300"
          >
            <CurrentSlideComponent 
              theme={theme}
              onNextSlide={nextSlide}
              onPrevSlide={prevSlide}
              onGoToSlide={goToSlide}
              onGoToStart={() => goToSlide(0)}
            />
          </div>
        </main>
      ) : (
        /* Continuous Mode: Displays all 6 slides in a short, scannable format */
        <main className="flex-1 w-full space-y-16 py-8">
          {slides.map((s, idx) => {
            const Comp = s.component;
            return (
              <section 
                key={s.id} 
                id={`slide-section-${idx}`}
                className={`border-b ${theme.borderClass} pb-16 last:border-none min-h-[85vh] flex items-center justify-center relative`}
              >
                <div className="w-full">
                  <div className="max-w-7xl mx-auto px-4 mb-3 flex items-center justify-between">
                    <span className={`text-[11px] font-mono font-bold ${theme.accentClass} uppercase`}>
                      Slide 0{idx + 1} of 06 • {s.title}
                    </span>
                    <button
                      onClick={() => {
                        setCurrentSlide(idx);
                        setViewMode('deck');
                      }}
                      className={`text-[11px] ${theme.textMutedClass} hover:${theme.accentClass} underline`}
                    >
                      Focus in Slide Deck
                    </button>
                  </div>
                  <Comp 
                    theme={theme}
                    onNextSlide={() => goToSlide(Math.min(5, idx + 1))}
                    onPrevSlide={() => goToSlide(Math.max(0, idx - 1))}
                    onGoToSlide={goToSlide}
                    onGoToStart={() => goToSlide(0)}
                  />
                </div>
              </section>
            );
          })}
        </main>
      )}

      {/* Floating Bottom Slide Controller Bar (Active in Deck Mode) */}
      {viewMode === 'deck' && (
        <footer className={`sticky bottom-0 z-40 ${theme.navBgClass} backdrop-blur-md border-t ${theme.borderClass} px-4 sm:px-8 py-3 transition-colors duration-500`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            
            {/* Prev Button */}
            <button
              onClick={prevSlide}
              className={`px-3 sm:px-4 py-2 rounded-full border ${theme.borderClass} hover:opacity-90 ${theme.cardBgClass} ${theme.textPrimaryClass} text-xs font-sans font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shrink-0`}
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev Slide</span>
            </button>

            {/* 6 Slide Navigation Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
              {slides.map((s, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={s.id}
                    onClick={() => goToSlide(idx)}
                    className={`px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      isActive
                        ? `${theme.accentBgClass} text-white font-bold shadow-md scale-105`
                        : `${theme.cardBgClass} hover:opacity-95 ${theme.textSecondaryClass} border ${theme.borderClass} font-medium`
                    }`}
                  >
                    <span className={`text-[10px] font-mono ${isActive ? 'text-amber-200' : theme.accentClass}`}>
                      0{idx + 1}
                    </span>
                    <span className="hidden md:inline whitespace-nowrap">
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className={`px-3 sm:px-4 py-2 rounded-full ${theme.accentBgClass} ${theme.accentHoverBgClass} text-white text-xs font-sans font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shrink-0`}
              aria-label="Next Slide"
            >
              <span className="hidden sm:inline">Next Slide</span>
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>
        </footer>
      )}

      {/* Floating Keyboard hint (subtle) */}
      {viewMode === 'deck' && (
        <div className={`hidden lg:block fixed bottom-16 right-6 text-[10px] font-mono ${theme.textMutedClass} pointer-events-none`}>
          Use ← / → keys or numbers 1–6
        </div>
      )}

    </div>
  );
};
