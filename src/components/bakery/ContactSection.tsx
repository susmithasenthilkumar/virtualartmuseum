import React, { useState } from 'react';
import { BAKERY_INFO } from '../../data/bakeryData';
import { Mail, Phone, Instagram, Facebook, Send, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occasion: 'Celebration Cake Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      // Keep confirmation or allow reset
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative bg-[#f5eedf] text-[#2c1810] overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#be3a4a]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-widest text-[#be3a4a] uppercase mb-2">
            <span>Chapter XII</span>
            <span>•</span>
            <span>Inquiries & Gatherings</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#2c1810]">
            LET'S CONNECT
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#2c1810]/75 font-sans font-light leading-relaxed">
            Planning a wedding, celebration, or intimate party? Or simply have questions about our ingredients and daily bakes? Send us a note and our bakery team will be delighted to connect.
          </p>
        </div>

        {/* Contact Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Inquiries & Socials */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="p-8 rounded-3xl bg-white border border-[#2c1810]/10 shadow-sm space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#2c1810]">
                Bakery Concierge
              </h3>
              <p className="text-sm text-[#2c1810]/75 font-sans font-light leading-relaxed">
                We respond to all event inquiries, bespoke cake consultations, and dietary inquiries within 24 hours during business days.
              </p>

              <div className="space-y-4 pt-2 text-xs font-sans">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#faf6f0] flex items-center justify-center text-[#be3a4a]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#2c1810]/60 block text-[10px] uppercase font-bold">Call the Bakery</span>
                    <a href={`tel:${BAKERY_INFO.phone}`} className="font-medium text-[#2c1810] hover:text-[#be3a4a]">
                      {BAKERY_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#faf6f0] flex items-center justify-center text-[#be3a4a]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#2c1810]/60 block text-[10px] uppercase font-bold">Email Inquiries</span>
                    <a href={`mailto:${BAKERY_INFO.email}`} className="font-medium text-[#2c1810] hover:text-[#be3a4a]">
                      {BAKERY_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[#2c1810]/10">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#c59b6d] block mb-3">
                  Follow Our Daily Bake Stories
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-full bg-[#faf6f0] hover:bg-[#be3a4a] text-[#2c1810] hover:text-white transition-all shadow-sm"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-full bg-[#faf6f0] hover:bg-[#be3a4a] text-[#2c1810] hover:text-white transition-all shadow-sm"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Clean Event & General Inquiry Form (Strictly No E-commerce) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#2c1810]/10 shadow-xl">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-[#2c1810]">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-[#2c1810]/75 font-sans font-light max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. Our head baker and event coordinator will review your note and reach out with thoughtful details promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', occasion: 'Celebration Cake Inquiry', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-full border border-[#2c1810]/20 text-xs font-sans font-semibold text-[#2c1810] hover:bg-[#2c1810] hover:text-white transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#2c1810]/10 text-xs font-sans font-bold uppercase tracking-wider text-[#be3a4a]">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Send an Inquiry or Tasting Request</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#2c1810]/80 block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Genevieve Bennett"
                        className="w-full px-4 py-3 rounded-xl bg-[#faf6f0] border border-[#2c1810]/15 text-xs text-[#2c1810] placeholder:text-[#2c1810]/40 focus:outline-none focus:border-[#be3a4a]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#2c1810]/80 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g., genevieve@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#faf6f0] border border-[#2c1810]/15 text-xs text-[#2c1810] placeholder:text-[#2c1810]/40 focus:outline-none focus:border-[#be3a4a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#2c1810]/80 block mb-1">
                      Inquiry Focus / Occasion
                    </label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#faf6f0] border border-[#2c1810]/15 text-xs text-[#2c1810] focus:outline-none focus:border-[#be3a4a]"
                    >
                      <option value="Wedding Cake Consultation">Wedding Cake Consultation & Tasting</option>
                      <option value="Milestone Birthday Celebration">Milestone Birthday Celebration</option>
                      <option value="Corporate / Gala Event Dessert Table">Corporate / Gala Event Dessert Table</option>
                      <option value="Bespoke Celebration Cake">Bespoke Celebration Cake</option>
                      <option value="Allergen & Recipe Inquiries">Allergen & Recipe Inquiries</option>
                      <option value="General Bakery Greetings">General Bakery Greetings</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#2c1810]/80 block mb-1">
                      Your Message or Celebration Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your planned celebration date, guest count, preferred flavor families, or any custom questions..."
                      className="w-full px-4 py-3 rounded-xl bg-[#faf6f0] border border-[#2c1810]/15 text-xs text-[#2c1810] placeholder:text-[#2c1810]/40 focus:outline-none focus:border-[#be3a4a]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-[#2c1810] hover:bg-[#be3a4a] text-[#faf6f0] text-xs font-sans font-semibold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>SEND MESSAGE</span>
                    </button>
                    <span className="text-[11px] font-sans text-[#2c1810]/50 text-center block mt-2">
                      Information & inquiry form only. No payment or transaction information required.
                    </span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
