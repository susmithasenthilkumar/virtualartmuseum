import React from 'react';
import { Sparkles, Heart, Clock, Award, ShieldCheck, Flame } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const brandQualities = [
    {
      title: 'Handcrafted',
      description: 'Slow folded, hand-kneaded, and sculpted individually by master pastry artisans.',
      icon: <Sparkles className="w-5 h-5 text-[#be3a4a]" />,
    },
    {
      title: 'Freshly Baked',
      description: 'Our hearth ovens ignite before sunrise so each creation is savored at prime warmth.',
      icon: <Flame className="w-5 h-5 text-[#c59b6d]" />,
    },
    {
      title: 'Quality Ingredients',
      description: 'Cultured French dairy, heirloom stoneground grains, and organic seasonal orchard fruits.',
      icon: <ShieldCheck className="w-5 h-5 text-[#be3a4a]" />,
    },
    {
      title: 'Made with Care',
      description: 'Zero commercial premixes, stabilizers, or artificial coloring. Pure wholesome pastry.',
      icon: <Heart className="w-5 h-5 text-[#c59b6d]" />,
    },
  ];

  return (
    <section id="story" className="py-24 sm:py-32 relative bg-[#f5efe6] text-[#2c1810] overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#be3a4a]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Bakery Story */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-widest text-[#be3a4a] uppercase">
              <span>Chapter I</span>
              <span>•</span>
              <span>Artisan Heritage</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#2c1810]">
              OUR STORY
            </h2>

            <p className="font-serif italic text-xl sm:text-2xl text-[#be3a4a] font-light leading-relaxed">
              “At The Velvet Whisk, baking is more than a process — it is a craft. Every creation begins with thoughtfully selected ingredients, carefully developed recipes and a passion for bringing people together.”
            </p>

            <div className="space-y-4 text-base text-[#2c1810]/75 font-sans font-light leading-relaxed">
              <p>
                Founded on the belief that a truly exceptional pastry should be both an aesthetic revelation and an unforgettable sensory memory, The Velvet Whisk brings timeless European baking techniques together with vibrant, contemporary botanical artistry.
              </p>
              <p>
                From the crackle of our heirloom sourdough crusts at dawn to the delicate assembly of multi-tier celebration cakes adorned with hand-pressed gold leaf and garden blooms, we honor the deliberate patience that true craftsmanship demands.
              </p>
            </div>

            {/* Core Bakery Principles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {brandQualities.map((quality) => (
                <div
                  key={quality.title}
                  className="p-4 rounded-2xl bg-white/80 border border-[#2c1810]/8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    {quality.icon}
                    <h3 className="font-serif font-bold text-base text-[#2c1810]">
                      {quality.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#2c1810]/70 font-sans leading-relaxed">
                    {quality.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Bakery Interior & Craft Imagery */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#2c1810]/10 aspect-4/3 group">
              <img
                src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80"
                alt="The Velvet Whisk Bakery Interior"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[11px] font-sans tracking-widest uppercase text-[#faf6f0]/80 block">
                  The Patisserie Studio
                </span>
                <p className="font-serif text-lg sm:text-xl font-bold text-[#faf6f0] mt-0.5">
                  A sanctuary of warm butter, stone hearths, and delicate sugar craft.
                </p>
              </div>
            </div>

            {/* Secondary Twin Detail Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-4/3 border border-[#2c1810]/10 group">
                <img
                  src="https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=700&q=80"
                  alt="Pastry Chef decorating cake"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-3 text-[10px] font-sans text-white/90 font-medium">
                  Artisanal Piping Precision
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-4/3 border border-[#2c1810]/10 group">
                <img
                  src="https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=700&q=80"
                  alt="Dough Folding Process"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-3 text-[10px] font-sans text-white/90 font-medium">
                  Natural Wild Fermentation
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
