import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../../data/bakeryData';
import { GalleryImage } from '../../types/bakery';
import { Sparkles, Maximize2, X, Filter } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const categories = ['All', 'Cakes', 'Pastries', 'Breads', 'Process', 'Atmosphere'];

  const filteredImages = activeCategory === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="py-24 sm:py-32 relative bg-[#faf6f0] text-[#2c1810] overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#be3a4a]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-widest text-[#be3a4a] uppercase mb-2">
              <span>Chapter VII</span>
              <span>•</span>
              <span>Cinematic Visuals</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#2c1810]">
              BAKERY GALLERY
            </h2>
            <p className="mt-4 text-base text-[#2c1810]/75 font-sans font-light leading-relaxed">
              A visual chronicle of dawn baking, delicate piping, hearth-fired loaves, and the sunlit atmosphere of our bakery studio.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-sans font-semibold tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#2c1810] text-[#faf6f0] shadow-sm'
                    : 'bg-white/80 hover:bg-white text-[#2c1810]/70 border border-[#2c1810]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white border border-[#2c1810]/8 aspect-4/3 sm:aspect-square"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white" />

              {/* Top Category Badge (on hover) */}
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-sans font-semibold tracking-wider uppercase text-white">
                  {item.category}
                </span>
              </div>

              {/* Bottom Title & Expand Icon (on hover) */}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between">
                <div>
                  <h4 className="font-serif font-bold text-lg text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/80 line-clamp-1 mt-0.5 font-light">
                    {item.description}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white shrink-0 ml-2">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal Viewer */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative max-w-4xl w-full max-h-[90vh] rounded-3xl overflow-hidden bg-[#faf6f0] shadow-2xl flex flex-col">
            
            {/* Close Lightbox Button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Image Showcase */}
            <div className="relative max-h-[68vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={lightboxImage.image}
                alt={lightboxImage.title}
                className="max-h-[68vh] w-auto object-contain"
              />
            </div>

            {/* Lightbox Information Bar */}
            <div className="p-6 bg-[#faf6f0] text-[#2c1810] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#be3a4a] block">
                  Category: {lightboxImage.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2c1810] mt-0.5">
                  {lightboxImage.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#2c1810]/75 font-sans mt-1">
                  {lightboxImage.description}
                </p>
              </div>

              <a
                href="#contact"
                onClick={() => setLightboxImage(null)}
                className="px-6 py-2.5 rounded-full bg-[#2c1810] hover:bg-[#be3a4a] text-white text-xs font-sans font-semibold tracking-wider uppercase transition-colors whitespace-nowrap self-start sm:self-center"
              >
                Inquire For Private Event
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
