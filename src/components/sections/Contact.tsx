import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, ShieldCheck, Mail, Building, User } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#02040a] overflow-hidden">
      {/* Background space lines */}
      <div className="absolute inset-0 bg-space-grid pointer-events-none opacity-20" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-[#00f0ff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            <span className="text-xs font-mono text-[#00f0ff] tracking-[0.25em] uppercase">
              SECTION 12 // COLLABORATION & INQUIRY
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white uppercase mb-4">
            START THE <span className="text-gradient-cyan">CONVERSATION</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            “Have an idea for the future of space technology?”
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="rounded-2xl border border-white/10 bg-[#070e20]/90 backdrop-blur-2xl p-8 sm:p-12 shadow-[0_4px_40px_rgba(0,0,0,0.8)] hud-corner-tl hud-corner-br">
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-wider mb-2">
                TRANSMISSION RECEIVED
              </h3>
              <p className="text-sm font-mono text-[#00f0ff] mb-6 max-w-md">
                “Thank you. This is a demonstration contact form.”
              </p>
              <p className="text-xs text-slate-400 max-w-md mb-8">
                Your simulated inquiry has been logged in the demonstration portal. ORBITA is a fictional aerospace concept created for presentation and portfolio demonstration.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', organization: '', message: '' });
                }}
                className="px-6 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-mono uppercase tracking-wider transition-colors"
              >
                SUBMIT ANOTHER INQUIRY
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Dr. Elena Rostova"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff] text-sm text-white placeholder-slate-600 transition-colors font-sans"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.rostova@institute.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff] text-sm text-white placeholder-slate-600 transition-colors font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Organization */}
              <div>
                <label
                  htmlFor="contact-org"
                  className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2"
                >
                  Organization
                </label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    id="contact-org"
                    type="text"
                    required
                    placeholder="Institute for Atmospheric Physics / Aerospace Lab"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff] text-sm text-white placeholder-slate-600 transition-colors font-sans"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2"
                >
                  Message
                </label>
                <div className="relative">
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Discuss collaboration regarding orbital hyperspectral monitoring or autonomous onboard decision algorithms..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-xl bg-black/50 border border-white/10 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff] text-sm text-white placeholder-slate-600 transition-colors font-sans leading-relaxed resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="text-[11px] font-mono text-slate-400">
                  <span className="text-amber-400 font-semibold">NOTE:</span> Demonstrational submission. No actual email transmission or commercial processing.
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-lg bg-[#00f0ff] hover:bg-[#38bdf8] text-black font-mono font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'TRANSMITTING...' : 'SEND MESSAGE'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
