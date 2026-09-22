import React from 'react';
import { BAKERY_INFO } from '../../data/bakeryData';
import { Sparkles, ArrowUp, Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#1f100a] text-[#faf6f0] pt-20 pb-12 overflow-hidden border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#be3a4a]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#faf6f0] text-[#2c1810] flex items-center justify-center font-serif font-bold italic shadow-md">
                VW
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-[#faf6f0] uppercase">
                THE VELVET WHISK
              </span>
            </div>

            <p className="font-serif italic text-base text-[#c59b6d] max-w-sm">
              “{BAKERY_INFO.tagline}”
            </p>

            <p className="text-xs text-[#faf6f0]/65 font-sans font-light leading-relaxed max-w-md">
              An artisan patisserie and hearth bakery honoring traditional European craft, cold fermentation, and contemporary botanical cake architecture.
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#be3a4a] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#be3a4a] text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#c59b6d] block">
              Exploration
            </span>
            <ul className="space-y-2 text-xs font-sans text-[#faf6f0]/75">
              <li>
                <a href="#hero" className="hover:text-[#faf6f0] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#faf6f0] transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-[#faf6f0] transition-colors">
                  Bakery Specialties
                </a>
              </li>
              <li>
                <a href="#signature-cakes" className="hover:text-[#faf6f0] transition-colors">
                  Signature Creations
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#faf6f0] transition-colors">
                  The Art of Baking
                </a>
              </li>
              <li>
                <a href="#ingredients" className="hover:text-[#faf6f0] transition-colors">
                  Quality & Provenance
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-[#faf6f0] transition-colors">
                  Occasions & Gatherings
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#faf6f0] transition-colors">
                  Bakery Gallery
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-[#faf6f0] transition-colors">
                  Visit Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#faf6f0] transition-colors">
                  Contact & Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Bakery Hours & Address */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#c59b6d] block">
              Patisserie Counter
            </span>
            <div className="space-y-2 text-xs font-sans text-[#faf6f0]/75">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#be3a4a] shrink-0 mt-0.5" />
                <span>{BAKERY_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#be3a4a] shrink-0" />
                <span>{BAKERY_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#be3a4a] shrink-0" />
                <span>{BAKERY_INFO.email}</span>
              </p>
            </div>

            <div className="pt-2 text-xs font-sans text-[#faf6f0]/60 space-y-1">
              <span className="font-semibold text-white/90 block">Counter Hours:</span>
              <p>Tue – Fri: 7:00 AM – 6:00 PM</p>
              <p>Sat – Sun: 8:00 AM – 5:00 PM</p>
              <p className="text-[#c59b6d]">Monday: Closed for recipe R&D</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#faf6f0]/50">
          <div>
            © {new Date().getFullYear()} The Velvet Whisk Artisan Bakery. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-[#be3a4a] hover:text-white transition-all border border-white/10 group cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};
