import React, { useState } from 'react';
import { Sparkles, Heart, Globe, Mail, CheckCircle2 } from 'lucide-react';
import { MUSEUM_WINGS } from '../data/museumData';

interface MuseumFooterProps {
  onSelectWing: (wingId: string) => void;
  setActiveTab: (tab: 'gallery' | 'virtual-room' | 'tours' | 'salon') => void;
}

export const MuseumFooter: React.FC<MuseumFooterProps> = ({
  onSelectWing,
  setActiveTab
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 4000);
  };

  return (
    <footer className="bg-[#07080B] border-t border-[#1C212E] text-[#94A3B8] text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#181C26]">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded border border-[#C5A059]/50 bg-[#161B26] flex items-center justify-center">
                <span className="font-serif text-[#C5A059] text-lg font-bold">É</span>
              </div>
              <div>
                <span className="font-serif text-lg tracking-[0.2em] text-[#F3F4F6] uppercase font-medium">
                  L'Étoile
                </span>
                <p className="text-[10px] text-[#C5A059] tracking-widest uppercase">
                  Grand Virtual Art Museum
                </p>
              </div>
            </div>

            <p className="text-xs text-[#94A3B8] font-light leading-relaxed max-w-sm">
              Preserving and democratizing the world’s artistic heritage. Exploring centuries of 
              human creative genius through gigapixel high-resolution inspection, curatorial scholarship, 
              and sensory virtual gallery walkthroughs.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-gray-400">
              <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Digital Pavilion • Free Global Access for All Humanity</span>
            </div>
          </div>

          {/* Col 2: Museum Wings */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-[#F3F4F6] font-semibold block">
              Permanent Wings
            </span>
            <ul className="space-y-2">
              {MUSEUM_WINGS.map(wing => (
                <li key={wing.id}>
                  <button
                    onClick={() => {
                      onSelectWing(wing.id);
                      setActiveTab('gallery');
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-[#C5A059] transition-colors text-left"
                  >
                    {wing.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Curatorial Gazette Newsletter */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-[#F3F4F6] font-semibold block">
              La Gazette des Arts
            </span>
            <p className="text-xs text-[#94A3B8] font-light">
              Receive monthly curatorial monographs, pigment histories, and announcements of newly restored digitized masterworks.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center bg-[#10131B] border border-[#222838] rounded-lg p-1">
                <Mail className="w-4 h-4 text-gray-400 ml-2.5 mr-2" />
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="connoisseur@museum.org"
                  className="bg-transparent text-xs text-white focus:outline-none w-full py-1.5 placeholder:text-gray-600"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-md bg-[#C5A059] hover:bg-[#D4B36A] text-[#0A0C10] font-semibold text-xs tracking-wider"
                >
                  Join
                </button>
              </div>

              {newsletterSuccess && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Welcome to the Gazette des Arts circle.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Credits & Acknowledgements */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#64748B]">
          <div>
            <span>© {new Date().getFullYear()} L'Étoile Virtual Art Museum. Public Domain Masterworks Collection.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-500">Open Access Heritage Initiative</span>
            <span>•</span>
            <span className="text-gray-500">Louvre • MoMA • Uffizi • Rijksmuseum</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
