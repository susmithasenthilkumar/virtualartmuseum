import React, { useState } from 'react';
import { BAKERY_INFO } from '../../data/bakeryData';
import { MapPin, Clock, Phone, Mail, Navigation, ExternalLink, Sparkles, Check } from 'lucide-react';

export const VisitUsSection: React.FC = () => {
  const [directionsCopied, setDirectionsCopied] = useState(false);

  const handleGetDirections = () => {
    // Open Google Maps directions in new tab
    const encodedAddress = encodeURIComponent(BAKERY_INFO.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <section id="visit" className="py-24 sm:py-32 relative bg-[#faf6f0] text-[#2c1810] overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#c59b6d]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-widest text-[#be3a4a] uppercase mb-2">
            <span>Chapter XI</span>
            <span>•</span>
            <span>Welcome to Our Hearth</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#2c1810]">
            COME VISIT US
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#2c1810]/75 font-sans font-light leading-relaxed">
            Located in San Francisco’s historic Blossom District. Join us for morning viennoiserie fresh from the oven, afternoon tea, or to view our rotating celebration cake showcase.
          </p>
        </div>

        {/* Visit Details & Interactive Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bakery Location Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#2c1810]/10 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-xs font-sans font-bold uppercase tracking-wider text-[#be3a4a]">
                <MapPin className="w-4 h-4" />
                <span>Patisserie & Bakery Address</span>
              </div>
              <p className="font-serif text-lg font-bold text-[#2c1810]">
                {BAKERY_INFO.address}
              </p>
              <p className="text-xs text-[#2c1810]/65 font-sans">
                Located near the historic cable turnaround, with complimentary curbside bicycle parking and charming outdoor garden tables.
              </p>
            </div>

            {/* Hours Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#2c1810]/10 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-xs font-sans font-bold uppercase tracking-wider text-[#c59b6d]">
                <Clock className="w-4 h-4" />
                <span>Bakery Doors & Counter Hours</span>
              </div>
              <div className="space-y-2 text-xs font-sans">
                {BAKERY_INFO.hours.map((h) => (
                  <div key={h.days} className="flex items-center justify-between pb-1 border-b border-[#2c1810]/5 last:border-none">
                    <span className="font-medium text-[#2c1810]">{h.days}</span>
                    <span className="text-[#2c1810]/70 font-mono">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Lines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#2c1810]/10 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#2c1810] mb-1">
                  <Phone className="w-3.5 h-3.5 text-[#be3a4a]" />
                  <span>Telephone</span>
                </div>
                <a href={`tel:${BAKERY_INFO.phone}`} className="text-xs font-mono text-[#2c1810]/80 hover:text-[#be3a4a] transition-colors">
                  {BAKERY_INFO.phone}
                </a>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#2c1810]/10 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#2c1810] mb-1">
                  <Mail className="w-3.5 h-3.5 text-[#be3a4a]" />
                  <span>Email</span>
                </div>
                <a href={`mailto:${BAKERY_INFO.email}`} className="text-xs font-mono text-[#2c1810]/80 hover:text-[#be3a4a] transition-colors truncate block">
                  {BAKERY_INFO.email}
                </a>
              </div>
            </div>

            {/* Get Directions Button */}
            <button
              onClick={handleGetDirections}
              className="w-full py-4 rounded-full bg-[#2c1810] hover:bg-[#3d2317] text-[#faf6f0] text-xs font-sans font-semibold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-[#be3a4a]" />
              <span>GET DIRECTIONS</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </button>

          </div>

          {/* Right Column: Stylized Visual Map Illustration */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#2c1810]/10 bg-[#eedfc9] p-8 sm:p-12 min-h-[460px] flex flex-col justify-between">
              
              {/* Map Grid Aesthetic Lines */}
              <div className="absolute inset-0 bg-cream-grain opacity-40 pointer-events-none" />
              
              {/* Map streets vector simulation */}
              <div className="absolute top-1/4 inset-x-0 h-10 bg-white/40 rotate-6 pointer-events-none" />
              <div className="absolute bottom-1/3 inset-x-0 h-12 bg-white/40 -rotate-3 pointer-events-none" />
              <div className="absolute inset-y-0 left-1/3 w-10 bg-white/40 rotate-12 pointer-events-none" />
              <div className="absolute inset-y-0 right-1/4 w-8 bg-white/30 -rotate-6 pointer-events-none" />

              {/* Map Header */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-[#2c1810] text-[#faf6f0] text-xs font-mono tracking-wider">
                  BLOSSOM DISTRICT • SAN FRANCISCO
                </span>
                <span className="text-xs font-sans text-[#2c1810]/60 italic font-serif">
                  Corner of 4th & Artisan Way
                </span>
              </div>

              {/* Center Map Location Marker Pin */}
              <div className="relative z-10 flex flex-col items-center justify-center my-8">
                <div className="relative group cursor-pointer" onClick={handleGetDirections}>
                  <div className="w-16 h-16 rounded-full bg-[#be3a4a] text-white flex items-center justify-center shadow-2xl animate-bounce">
                    <MapPin className="w-8 h-8 fill-current" />
                  </div>
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#2c1810] text-white text-xs font-sans font-bold whitespace-nowrap shadow-xl">
                    THE VELVET WHISK
                  </div>
                </div>
              </div>

              {/* Surrounding Landmark Markers */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-sans">
                <div className="p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2c1810]/10">
                  <span className="font-bold text-[#2c1810] block">Blossom Square</span>
                  <span className="text-[10px] text-[#2c1810]/60">1 block east</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2c1810]/10">
                  <span className="font-bold text-[#2c1810] block">Artisan Promenade</span>
                  <span className="text-[10px] text-[#2c1810]/60">Pedestrian avenue</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2c1810]/10 col-span-2 sm:col-span-1">
                  <span className="font-bold text-[#2c1810] block">Transit Station</span>
                  <span className="text-[10px] text-[#2c1810]/60">3 min walk</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
