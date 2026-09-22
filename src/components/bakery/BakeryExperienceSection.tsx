import React, { useState } from 'react';
import { Sparkles, Eye, Coffee, Wind, Flame, Heart } from 'lucide-react';

export const BakeryExperienceSection: React.FC = () => {
  const [activeVignette, setActiveVignette] = useState(0);

  const vignettes = [
    {
      title: 'Dawn Fire & Hearth Ovens',
      time: '4:30 AM',
      description: 'The gentle hum of the kitchen waking up. Hearth stones preheated to 460°F, sourdough loaves scored with razor lamés, and the sudden hiss of steam injection filling the bakery air.',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80',
      tag: 'Thermal Awakening',
    },
    {
      title: 'Lamination & Dough Folding',
      time: '6:00 AM',
      description: 'Cold marble counters dusted with stoneground flour. Master bakers fold cultured dry butter into rested dough, measuring turns with millimeter precision to build 72 honeycomb layers.',
      image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=1200&q=80',
      tag: 'Hand Manipulation',
    },
    {
      title: 'The Patisserie Decorating Studio',
      time: '8:30 AM',
      description: 'Chilled sponges placed upon spinning turntables. Palette knives glide warm Swiss buttercream into silk finishes before edible organic pansies and gold leaf flakes are placed with tweezers.',
      image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1200&q=80',
      tag: 'Fine Sugar Art',
    },
    {
      title: 'The Warm Sunlit Counter',
      time: '10:00 AM',
      description: 'The front doors open as sunlight pours across polished Carrara marble and antique oak cases. Freshly brewed espresso pairs with steaming morning buns and warm conversation.',
      image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80',
      tag: 'Sensory Welcome',
    },
  ];

  return (
    <section id="experience" className="py-24 sm:py-32 relative bg-[#1f100a] text-[#faf6f0] overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#be3a4a]/8 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Core Quote */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-sans font-medium text-[#c59b6d] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chapter X • Sensory Immersion</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#faf6f0]">
            THE BAKERY EXPERIENCE
          </h2>

          <p className="font-serif italic text-2xl sm:text-3xl text-[#faf6f0] font-light">
            “Step inside a world where every aroma tells a story.”
          </p>

          <p className="text-base text-[#faf6f0]/75 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            Our bakery is designed with an open-kitchen philosophy. We welcome patrons to witness the graceful choreography of baking while enjoying the intoxicating perfumes of caramelized sugars and fresh yeast.
          </p>
        </div>

        {/* Cinematic Vignette Showcase */}
        <div className="rounded-3xl glass-chocolate border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Cinematic Stage */}
            <div className="lg:col-span-7 relative aspect-16/10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src={vignettes[activeVignette].image}
                alt={vignettes[activeVignette].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono text-[#c59b6d] border border-white/15">
                {vignettes[activeVignette].time} • {vignettes[activeVignette].tag}
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                  {vignettes[activeVignette].title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-sans mt-2 font-light leading-relaxed">
                  {vignettes[activeVignette].description}
                </p>
              </div>
            </div>

            {/* Interactive Timeline Tabs */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#c59b6d] block mb-2">
                A Day in Our Artisan Studio
              </span>

              {vignettes.map((v, idx) => {
                const isActive = idx === activeVignette;
                return (
                  <button
                    key={v.title}
                    onClick={() => setActiveVignette(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-[#faf6f0] text-[#2c1810] border-[#faf6f0] shadow-lg translate-x-2'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white'
                    }`}
                  >
                    <div>
                      <span className={`text-[11px] font-mono font-bold block ${isActive ? 'text-[#be3a4a]' : 'text-[#c59b6d]'}`}>
                        {v.time}
                      </span>
                      <h4 className="font-serif font-bold text-sm sm:text-base mt-0.5">
                        {v.title}
                      </h4>
                    </div>

                    <span className={`text-xs font-sans font-medium px-2.5 py-1 rounded-full ${isActive ? 'bg-[#2c1810]/10 text-[#2c1810]' : 'bg-white/10 text-white/60'}`}>
                      {v.tag}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
