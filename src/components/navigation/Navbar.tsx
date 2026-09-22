import React, { useState, useEffect } from 'react';
import { Menu, X, Orbit, Satellite, Compass } from 'lucide-react';

interface NavbarProps {
  onExploreOrbitClick: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onExploreOrbitClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Mission', href: '#mission' },
    { label: 'Spacecraft', href: '#spacecraft' },
    { label: 'Technology', href: '#technology' },
    { label: 'Earth Observation', href: '#earth-observation' },
    { label: 'Mission Control', href: '#mission-control' },
    { label: 'Future Missions', href: '#future-missions' },
    { label: 'Company', href: '#company' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#02040a]/90 backdrop-blur-md border-b border-[#00f0ff]/15 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-5 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="relative w-9 h-9 rounded-lg bg-[#071329] border border-[#00f0ff]/30 flex items-center justify-center overflow-hidden group-hover:border-[#00f0ff] transition-colors shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <Orbit className="w-5 h-5 text-[#00f0ff] group-hover:rotate-45 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00f0ff]/10 to-transparent pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-lg tracking-[0.2em] text-white group-hover:text-[#00f0ff] transition-colors">
                  ORBITA
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 tracking-wider">
                  SPACE-TECH
                </span>
              </div>
              <span className="block text-[10px] font-mono text-slate-400 tracking-widest uppercase">
                Engineering Beyond Earth
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-1.5 text-xs font-mono tracking-wider text-slate-300 hover:text-[#00f0ff] hover:bg-white/[0.03] rounded-md transition-all duration-200 uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Explore Orbit CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onExploreOrbitClick}
              className="relative group px-4 py-2 rounded-md bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40 hover:border-[#00f0ff] text-xs font-mono tracking-widest uppercase transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_25px_rgba(0,240,255,0.35)]"
            >
              <Satellite className="w-3.5 h-3.5 text-[#00f0ff] group-hover:scale-110 transition-transform" />
              <span>EXPLORE ORBIT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onExploreOrbitClick}
              className="p-2 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30"
              aria-label="Orbit Simulation"
            >
              <Compass className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#02040a]/95 backdrop-blur-xl pt-24 px-6 sm:hidden border-b border-[#00f0ff]/20 animate-fadeIn">
          <div className="flex flex-col gap-2">
            <div className="text-[11px] font-mono text-[#00f0ff] tracking-widest uppercase mb-2 pb-2 border-b border-white/10">
              ORBITA NAVIGATION MATRIX
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-3 px-4 text-sm font-mono tracking-wider text-slate-200 hover:text-[#00f0ff] hover:bg-[#071329] rounded-lg border border-transparent hover:border-[#00f0ff]/20 transition-colors uppercase flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#00f0ff]/60">→</span>
              </a>
            ))}
            <div className="pt-6 border-t border-white/10 mt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onExploreOrbitClick();
                }}
                className="w-full py-3.5 rounded-lg bg-[#00f0ff] text-black font-mono font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.4)]"
              >
                <Satellite className="w-4 h-4" />
                <span>EXPLORE ORBIT SIMULATION</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
