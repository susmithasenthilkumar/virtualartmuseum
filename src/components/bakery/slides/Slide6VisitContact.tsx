import React, { useState } from 'react';
import { BAKERY_INFO } from '../../../data/bakeryData';
import { MapPin, Clock, Phone, Mail, Navigation, Send, CheckCircle2, Sparkles, ExternalLink, RotateCcw } from 'lucide-react';
import { BakeryTheme } from '../../../theme/bakeryThemes';

interface Slide6VisitContactProps {
  theme: BakeryTheme;
  onPrevSlide: () => void;
  onGoToStart: () => void;
}

export const Slide6VisitContact: React.FC<Slide6VisitContactProps> = ({ theme, onPrevSlide, onGoToStart }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occasion: 'Wedding Cake Consultation',
    message: '',
  });

  const handleGetDirections = () => {
    const encodedAddress = encodeURIComponent(BAKERY_INFO.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="h-full w-full flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-6 sm:py-8 relative overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{ backgroundColor: theme.glow1Hex }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-4">
        
        {/* Slide Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${theme.subtleBgClass} border ${theme.borderClass} text-xs font-sans font-semibold tracking-widest ${theme.accentClass} uppercase mb-1`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Slide 06 • Join Us</span>
            </div>
            <h2 className={`font-serif text-3xl sm:text-5xl font-bold tracking-tight ${theme.textPrimaryClass}`}>
              VISIT US & INQUIRE
            </h2>
          </div>
          <p className={`text-xs sm:text-sm ${theme.textSecondaryClass} font-sans font-light max-w-md`}>
            Step into our Blossom District bakery studio or drop our pastry team a message for private event tastings and wedding consultations.
          </p>
        </div>

        {/* Split Details & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
          
          {/* Left Column: Bakery Location, Hours, and Phone */}
          <div className="lg:col-span-5 space-y-3.5">
            
            {/* Address & Hours Card */}
            <div className={`p-4 sm:p-5 rounded-2xl ${theme.cardBgClass} border ${theme.borderClass} shadow-sm space-y-3 backdrop-blur-sm`}>
              <div>
                <div className={`flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider ${theme.accentClass} mb-1`}>
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Patisserie Address</span>
                </div>
                <p className={`font-serif text-base sm:text-lg font-bold ${theme.textPrimaryClass}`}>
                  {BAKERY_INFO.address}
                </p>
                <p className={`text-xs ${theme.textMutedClass} font-sans mt-0.5`}>
                  Blossom District, near historic cable turnaround. Curbside garden seating.
                </p>
              </div>

              {/* Hours */}
              <div className={`pt-2 border-t ${theme.borderClass} space-y-1.5`}>
                <div className={`flex items-center gap-2 text-[11px] font-sans font-bold uppercase ${theme.goldClass}`}>
                  <Clock className="w-3 h-3" />
                  <span>Counter Hours</span>
                </div>
                <div className={`grid grid-cols-2 gap-2 text-xs font-sans ${theme.textSecondaryClass}`}>
                  <div className={`p-2 rounded-xl ${theme.subtleBgClass}`}>
                    <span className="font-semibold block text-[11px]">Tue – Fri</span>
                    <span className="text-[11px] font-mono">7:00 AM – 6:00 PM</span>
                  </div>
                  <div className={`p-2 rounded-xl ${theme.subtleBgClass}`}>
                    <span className="font-semibold block text-[11px]">Sat – Sun</span>
                    <span className="text-[11px] font-mono">8:00 AM – 5:00 PM</span>
                  </div>
                </div>
                <span className={`text-[10px] ${theme.textMutedClass} italic block pt-0.5`}>
                  Monday closed for slow-ferment recipe research & development.
                </span>
              </div>
            </div>

            {/* Direct Lines & Directions Button */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${BAKERY_INFO.phone}`}
                className={`p-3 rounded-2xl ${theme.cardBgClass} border ${theme.borderClass} shadow-sm hover:opacity-90 transition-all flex items-center gap-2.5 backdrop-blur-sm`}
              >
                <div className={`p-2 rounded-xl ${theme.subtleBgClass} shrink-0`}>
                  <Phone className={`w-3.5 h-3.5 ${theme.accentClass}`} />
                </div>
                <div className="truncate">
                  <span className={`text-[9px] font-sans uppercase font-bold ${theme.textMutedClass} block`}>
                    Call Bakery
                  </span>
                  <span className={`text-xs font-mono font-semibold ${theme.textPrimaryClass} truncate block`}>
                    {BAKERY_INFO.phone}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${BAKERY_INFO.email}`}
                className={`p-3 rounded-2xl ${theme.cardBgClass} border ${theme.borderClass} shadow-sm hover:opacity-90 transition-all flex items-center gap-2.5 backdrop-blur-sm`}
              >
                <div className={`p-2 rounded-xl ${theme.subtleBgClass} shrink-0`}>
                  <Mail className={`w-3.5 h-3.5 ${theme.goldClass}`} />
                </div>
                <div className="truncate">
                  <span className={`text-[9px] font-sans uppercase font-bold ${theme.textMutedClass} block`}>
                    Email Us
                  </span>
                  <span className={`text-xs font-mono font-semibold ${theme.textPrimaryClass} truncate block`}>
                    {BAKERY_INFO.email}
                  </span>
                </div>
              </a>
            </div>

            {/* Google Map Directions Trigger */}
            <button
              onClick={handleGetDirections}
              className={`w-full py-3 px-4 rounded-2xl border ${theme.borderClass} ${theme.cardBgClass} hover:opacity-95 ${theme.textPrimaryClass} text-xs font-sans font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm`}
            >
              <Navigation className={`w-4 h-4 ${theme.accentClass}`} />
              <span>Get Directions to Bakery</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </button>

          </div>

          {/* Right Column: Custom Cake & Tasting Consultation Form */}
          <div className="lg:col-span-7">
            <div className={`rounded-3xl ${theme.cardBgClass} border ${theme.borderClass} p-5 sm:p-7 shadow-xl space-y-4 backdrop-blur-sm`}>
              <div>
                <h3 className={`font-serif text-xl sm:text-2xl font-bold ${theme.textPrimaryClass}`}>
                  Private Event & Consultation Inquiry
                </h3>
                <p className={`text-xs ${theme.textSecondaryClass} font-sans mt-0.5`}>
                  Planning a wedding, milestone anniversary, or private celebration? Our head decorator answers all inquiries within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className={`p-6 rounded-2xl ${theme.subtleBgClass} border ${theme.borderClass} text-center space-y-3 animate-in zoom-in-95`}>
                  <div className={`w-12 h-12 rounded-full ${theme.accentBgClass} text-white flex items-center justify-center mx-auto shadow-md`}>
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className={`font-serif text-lg font-bold ${theme.textPrimaryClass}`}>
                      Thank You, {formData.name || 'Friend'}!
                    </h4>
                    <p className={`text-xs ${theme.textSecondaryClass} font-sans mt-1 max-w-sm mx-auto leading-relaxed`}>
                      Your inquiry has been received. Our pastry team will contact you at <strong className={theme.textPrimaryClass}>{formData.email}</strong> with tasting options.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', occasion: 'Wedding Cake Consultation', message: '' });
                    }}
                    className={`text-xs font-sans font-semibold ${theme.accentClass} hover:underline cursor-pointer`}
                  >
                    Submit another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={`text-[10px] font-sans font-bold uppercase ${theme.textMutedClass} block mb-1`}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Clara Oswald"
                        className={`w-full px-3.5 py-2.5 rounded-xl ${theme.subtleBgClass} border ${theme.borderClass} text-xs font-sans ${theme.textPrimaryClass} focus:outline-none focus:ring-1 focus:ring-current transition-all`}
                      />
                    </div>
                    <div>
                      <label className={`text-[10px] font-sans font-bold uppercase ${theme.textMutedClass} block mb-1`}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="clara@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl ${theme.subtleBgClass} border ${theme.borderClass} text-xs font-sans ${theme.textPrimaryClass} focus:outline-none focus:ring-1 focus:ring-current transition-all`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`text-[10px] font-sans font-bold uppercase ${theme.textMutedClass} block mb-1`}>
                      Occasion / Purpose
                    </label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl ${theme.subtleBgClass} border ${theme.borderClass} text-xs font-sans ${theme.textPrimaryClass} focus:outline-none focus:ring-1 focus:ring-current transition-all`}
                    >
                      <option value="Wedding Cake Consultation">Wedding Cake Multi-Tier Design & Tasting</option>
                      <option value="Milestone Birthday Celebration">Milestone Birthday Celebration</option>
                      <option value="Corporate / Brand Event Patisserie">Corporate / Brand Event Patisserie</option>
                      <option value="General Bakery Question">General Bakery Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className={`text-[10px] font-sans font-bold uppercase ${theme.textMutedClass} block mb-1`}>
                      Event Details & Flavor Notes *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your anticipated date, guest count, and flavor visions..."
                      className={`w-full px-3.5 py-2.5 rounded-xl ${theme.subtleBgClass} border ${theme.borderClass} text-xs font-sans ${theme.textPrimaryClass} focus:outline-none focus:ring-1 focus:ring-current transition-all resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3 rounded-full ${theme.accentBgClass} ${theme.accentHoverBgClass} text-white text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Consultation Inquiry</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* Slide Navigation Buttons */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={onPrevSlide}
            className={`text-xs font-sans font-semibold ${theme.textMutedClass} hover:${theme.textPrimaryClass} transition-colors cursor-pointer`}
          >
            ← Back to Quality & Process
          </button>
          <button
            onClick={onGoToStart}
            className={`px-5 py-2 rounded-full border ${theme.borderClass} ${theme.cardBgClass} hover:opacity-90 ${theme.textPrimaryClass} text-xs font-sans font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm`}
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restart Presentation</span>
          </button>
        </div>

      </div>
    </div>
  );
};
