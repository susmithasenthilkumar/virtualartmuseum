import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, MapPin, Phone } from 'lucide-react';
import { BAKERY_INFO } from '../../data/bakeryData';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'OUR STORY', href: '#story' },
    { name: 'SPECIALTIES', href: '#specialties' },
    { name: 'PROCESS', href: '#process' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'VISIT US', href: '#visit' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#faf6f0]/95 backdrop-blur-md shadow-md py-3 border-b border-[#2c1810]/10'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Tagline Brand Mark */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="The Velvet Whisk Home"
          >
            <div className="w-10 h-10 rounded-full bg-[#2c1810] text-[#faf6f0] flex items-center justify-center shadow-md transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105">
              <span className="font-serif text-lg font-bold italic tracking-tighter">VW</span>
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-[#2c1810] block uppercase">
                THE VELVET WHISK
              </span>
              <span className="text-[10px] font-sans tracking-widest text-[#be3a4a] uppercase font-semibold block -mt-0.5">
                Artisan Bakery & Patisserie
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-sans tracking-widest font-semibold text-[#2c1810]/80 hover:text-[#be3a4a] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#be3a4a] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Quick Inquire / Location Callout */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="#contact"
              className="px-4 py-2 rounded-full border border-[#2c1810]/20 hover:border-[#be3a4a] text-xs font-sans font-medium text-[#2c1810] hover:text-[#be3a4a] hover:bg-[#be3a4a]/5 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#be3a4a]" />
              <span>Inquire for Events</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-[#2c1810] hover:bg-[#2c1810]/5 transition-colors focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf6f0] border-b border-[#2c1810]/10 px-6 pt-4 pb-8 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-sans tracking-wider font-semibold text-[#2c1810] hover:text-[#be3a4a] py-2 border-b border-[#2c1810]/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-2.5 text-xs text-[#2c1810]/70">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#be3a4a]" />
              <span>428 Artisan Way, San Francisco</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#be3a4a]" />
              <span>(415) 890-CAKE</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
