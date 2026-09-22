import React from 'react';
import { Orbit, ArrowUp, AlertTriangle } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { label: 'Mission', href: '#mission' },
    { label: 'Spacecraft', href: '#spacecraft' },
    { label: 'Technology', href: '#technology' },
    { label: 'Earth Observation', href: '#earth-observation' },
    { label: 'Future Missions', href: '#future-missions' },
    { label: 'Company', href: '#company' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: '#', symbol: 'LI' },
    { name: 'X / Twitter', href: '#', symbol: '𝕏' },
    { name: 'Instagram', href: '#', symbol: 'IG' },
    { name: 'YouTube', href: '#', symbol: 'YT' },
  ];

  return (
    <footer className="relative bg-[#010308] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#00f0ff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#071329] border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff]">
                <Orbit className="w-6 h-6" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-2xl text-white tracking-[0.2em] block">
                  ORBITA
                </span>
                <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest">
                  Engineering Beyond Earth.
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 font-sans leading-relaxed mb-6">
              Advancing autonomous aerospace systems, edge-computed Earth intelligence, and next-generation planetary exploration architectures.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#00f0ff]/15 border border-white/10 hover:border-[#00f0ff]/40 flex items-center justify-center text-xs font-mono font-bold text-slate-300 hover:text-[#00f0ff] transition-colors"
                >
                  {social.symbol}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <div className="text-xs font-mono text-white uppercase tracking-widest font-semibold mb-4">
              NAVIGATION MATRIX
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs font-mono text-slate-400 hover:text-[#00f0ff] transition-colors uppercase tracking-wider block py-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Back to top button */}
          <div className="flex flex-col items-start lg:items-end justify-between">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-white/5 hover:bg-[#00f0ff]/20 text-slate-300 hover:text-[#00f0ff] border border-white/10 hover:border-[#00f0ff]/40 transition-colors flex items-center gap-2 text-xs font-mono uppercase tracking-wider cursor-pointer"
            >
              <span>RETURN TO APOGEE</span>
              <ArrowUp className="w-4 h-4" />
            </button>
            <div className="mt-6 text-[10px] font-mono text-slate-600">
              BUILD: ORBITA-2026.4 // SIMULATOR-V8
            </div>
          </div>
        </div>

        {/* Mandatory Explicit Disclaimer from prompt */}
        <div className="mt-8 p-4 rounded-xl bg-[#060c1c] border border-white/5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs font-mono text-slate-400 leading-relaxed">
            <strong className="text-amber-300">LEGAL & TECHNICAL DISCLAIMER:</strong> “ORBITA is a fictional aerospace technology concept created for demonstration purposes. Mission data and telemetry shown on this website are simulated and do not represent real spacecraft operations.” No commercial purchase, subscription, e-commerce, or orbital launch booking is offered.
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} ORBITA AEROSPACE CONCEPT. ALL RIGHTS RESERVED.
          </div>
          <div>
            DESIGNED WITH REACT • THREE.JS • TAILWIND CSS
          </div>
        </div>
      </div>
    </footer>
  );
};
