import React, { useState, useEffect } from "react";
import { MuseumNavbar } from "./components/MuseumNavbar";
import { MuseumHero } from "./components/MuseumHero";
import { VirtualRoomWalkthrough } from "./components/VirtualRoomWalkthrough";
import { ArtworkGallery } from "./components/ArtworkGallery";
import { MuseumCinemaSection } from "./components/MuseumCinemaSection";
import { CuratedToursSection } from "./components/CuratedToursSection";
import { PrivateSalonView } from "./components/PrivateSalonView";
import { ArtworkInspectorModal } from "./components/ArtworkInspectorModal";
import { TourGuideModal } from "./components/TourGuideModal";
import { ArtDiscoveryQuizModal } from "./components/ArtDiscoveryQuizModal";
import { MuseumFooter } from "./components/MuseumFooter";
import { ARTWORKS, CURATED_TOURS } from "./data/museumData";
import { Artwork, CuratedTour } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<'gallery' | 'virtual-room' | 'cinema' | 'tours' | 'salon'>('gallery');
  const [selectedWingId, setSelectedWingId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals
  const [inspectingArtwork, setInspectingArtwork] = useState<Artwork | null>(null);
  const [activeTour, setActiveTour] = useState<CuratedTour | null>(null);
  const [quizModalOpen, setQuizModalOpen] = useState(false);

  // Private Salon Saved Artworks with localStorage persistence
  const [savedArtworkIds, setSavedArtworkIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('museum_salon_artworks');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    // Default starter saved masterworks for rich initial visitor experience
    return ['starry-night', 'girl-with-pearl-earring', 'the-great-wave'];
  });

  useEffect(() => {
    try {
      localStorage.setItem('museum_salon_artworks', JSON.stringify(savedArtworkIds));
    } catch {
      // ignore
    }
  }, [savedArtworkIds]);

  // Toggle artwork in salon
  const handleToggleSalon = (artworkId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedArtworkIds(prev => 
      prev.includes(artworkId)
        ? prev.filter(id => id !== artworkId)
        : [...prev, artworkId]
    );
  };

  const handleRemoveFromSalon = (artworkId: string) => {
    setSavedArtworkIds(prev => prev.filter(id => id !== artworkId));
  };

  const handleAddSampleArtworks = (ids: string[]) => {
    setSavedArtworkIds(prev => Array.from(new Set([...prev, ...ids])));
  };

  // Artwork Modal Carousel (Next / Prev)
  const handleNextArtwork = () => {
    if (!inspectingArtwork) return;
    const currentIndex = ARTWORKS.findIndex(a => a.id === inspectingArtwork.id);
    const nextIndex = (currentIndex + 1) % ARTWORKS.length;
    setInspectingArtwork(ARTWORKS[nextIndex]);
  };

  const handlePrevArtwork = () => {
    if (!inspectingArtwork) return;
    const currentIndex = ARTWORKS.findIndex(a => a.id === inspectingArtwork.id);
    const prevIndex = (currentIndex - 1 + ARTWORKS.length) % ARTWORKS.length;
    setInspectingArtwork(ARTWORKS[prevIndex]);
  };

  const handleSelectWingFromHero = (wingId: string) => {
    setSelectedWingId(wingId);
    setActiveTab('gallery');
    const el = document.getElementById('gallery-curated-wings');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#F3F4F6] font-sans antialiased selection:bg-[#C5A059] selection:text-[#0A0C10] flex flex-col">
      
      {/* 1. Classical Museum Header Navigation */}
      <MuseumNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedArtworksCount={savedArtworkIds.length}
        onOpenQuiz={() => setQuizModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Museum Body */}
      <main className="flex-1">
        {activeTab === 'gallery' && (
          <>
            {/* Grand Hero Entrance Spotlight */}
            <MuseumHero
              onSelectArtwork={(art) => setInspectingArtwork(art)}
              onEnter3D={() => {
                setActiveTab('virtual-room');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreTours={() => {
                setActiveTab('tours');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectWing={handleSelectWingFromHero}
            />

            {/* Permanent Collection Masterwork Galleries */}
            <ArtworkGallery
              onInspectArtwork={(art) => setInspectingArtwork(art)}
              savedArtworkIds={savedArtworkIds}
              onToggleSalon={handleToggleSalon}
              selectedWingId={selectedWingId}
              onWingChange={(wingId) => setSelectedWingId(wingId)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* Virtual Art Video Exhibits Cinema Pavilion */}
            <MuseumCinemaSection
              onSelectArtworkById={(artId) => {
                const art = ARTWORKS.find(a => a.id === artId);
                if (art) setInspectingArtwork(art);
              }}
            />

            {/* Curated Thematic Audio Tours Teaser */}
            <CuratedToursSection
              onStartTour={(tour) => setActiveTour(tour)}
              onInspectArtwork={(art) => setInspectingArtwork(art)}
            />
          </>
        )}

        {activeTab === 'cinema' && (
          <div className="pt-4">
            <MuseumCinemaSection
              onSelectArtworkById={(artId) => {
                const art = ARTWORKS.find(a => a.id === artId);
                if (art) setInspectingArtwork(art);
              }}
            />

            {/* Featured Artworks related to the Cinema Exhibits */}
            <ArtworkGallery
              onInspectArtwork={(art) => setInspectingArtwork(art)}
              savedArtworkIds={savedArtworkIds}
              onToggleSalon={handleToggleSalon}
              selectedWingId={selectedWingId}
              onWingChange={(wingId) => setSelectedWingId(wingId)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        )}

        {activeTab === 'virtual-room' && (
          <div className="pt-4">
            <VirtualRoomWalkthrough
              onSelectArtwork={(art) => setInspectingArtwork(art)}
              selectedWingId={selectedWingId !== 'all' ? selectedWingId : 'classical'}
              onWingChange={(wingId) => setSelectedWingId(wingId)}
            />

            {/* Accompanying Wing Gallery below 3D room */}
            <ArtworkGallery
              onInspectArtwork={(art) => setInspectingArtwork(art)}
              savedArtworkIds={savedArtworkIds}
              onToggleSalon={handleToggleSalon}
              selectedWingId={selectedWingId}
              onWingChange={(wingId) => setSelectedWingId(wingId)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        )}

        {activeTab === 'tours' && (
          <div className="pt-4">
            <CuratedToursSection
              onStartTour={(tour) => setActiveTour(tour)}
              onInspectArtwork={(art) => setInspectingArtwork(art)}
            />
          </div>
        )}

        {activeTab === 'salon' && (
          <div className="pt-4">
            <PrivateSalonView
              savedArtworkIds={savedArtworkIds}
              onRemoveFromSalon={handleRemoveFromSalon}
              onInspectArtwork={(art) => setInspectingArtwork(art)}
              onExploreGallery={() => {
                setActiveTab('gallery');
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              onAddSampleArtworks={handleAddSampleArtworks}
            />
          </div>
        )}
      </main>

      {/* 2. Classical Museum Heritage Footer */}
      <MuseumFooter
        onSelectWing={handleSelectWingFromHero}
        setActiveTab={setActiveTab}
      />

      {/* MODAL 1: 8K Canvas Micro-Inspector & Audio Guide */}
      {inspectingArtwork && (
        <ArtworkInspectorModal
          artwork={inspectingArtwork}
          onClose={() => setInspectingArtwork(null)}
          onNextArtwork={handleNextArtwork}
          onPrevArtwork={handlePrevArtwork}
          isSavedInSalon={savedArtworkIds.includes(inspectingArtwork.id)}
          onToggleSalon={handleToggleSalon}
        />
      )}

      {/* MODAL 2: Step-by-Step Curated Tour Guide */}
      {activeTour && (
        <TourGuideModal
          tour={activeTour}
          onClose={() => setActiveTour(null)}
          onInspectArtwork={(art) => setInspectingArtwork(art)}
        />
      )}

      {/* MODAL 3: Art Discovery Quiz ("Find Your Muse") */}
      {quizModalOpen && (
        <ArtDiscoveryQuizModal
          onClose={() => setQuizModalOpen(false)}
          onInspectArtwork={(art) => setInspectingArtwork(art)}
          onGoToWing={(wingId) => {
            setSelectedWingId(wingId);
            setActiveTab('gallery');
          }}
        />
      )}

    </div>
  );
}
