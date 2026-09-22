import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, Newspaper, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Press & Media',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#07090e] border-t border-white/10 overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-15 bg-blue-500 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-tech font-bold uppercase tracking-[0.2em] text-blue-400">
            <Mail className="w-3.5 h-3.5" />
            <span>SECTION 16 • GET IN TOUCH</span>
          </div>

          <h2 className="font-tech text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Connect with NOVA.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed">
            Inquiries regarding research, technology licensing, executive press briefings, and architectural partnerships.
          </p>
        </div>

        {/* Contact Form & Corporate Location Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Information & Global Hubs (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
              <h3 className="font-tech text-xl font-bold text-white">
                Global Headquarters
              </h3>

              <div className="space-y-4 text-xs font-sans text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                  <div>
                    <strong className="text-white block font-tech text-sm">NOVA Global Labs</strong>
                    <span>1000 Horizon Way, Suite 400<br />Zurich & San Francisco Tech District</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                  <div>
                    <strong className="text-white block font-tech text-sm">Direct Channels</strong>
                    <span className="block text-slate-400">Press: press@nova-technologies.internal</span>
                    <span className="block text-slate-400">Partnerships: labs@nova-technologies.internal</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Newspaper className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                  <div>
                    <strong className="text-white block font-tech text-sm">Press Kit & Whitepaper</strong>
                    <span className="text-slate-400">Architectural diagrams, high-resolution renders, and executive transcripts available upon verification.</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-300">
                Official Fictional Showcase • Customer service channels and product purchases are intentionally disabled.
              </div>
            </div>
          </div>

          {/* Clean Futuristic Contact Form (Col 7) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#090b14] border border-white/15 shadow-2xl">
              
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="font-tech text-2xl font-bold text-white">
                    Transmission Dispatched
                  </h3>
                  <p className="text-sm text-slate-300 font-sans max-w-md mx-auto">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your message has been routed to the appropriate department.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', inquiryType: 'Press & Media', message: '' });
                    }}
                    className="px-6 py-2 rounded-full border border-white/20 text-xs font-tech text-slate-300 hover:text-white hover:bg-white/5 cursor-pointer uppercase tracking-wider"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-tech text-xl font-bold text-white mb-2">
                    Submit Inquiry
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-tech font-bold uppercase tracking-wider text-slate-300">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Evelyn Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-tech font-bold uppercase tracking-wider text-slate-300">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="evance@institution.org"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-tech font-bold uppercase tracking-wider text-slate-300">
                      Inquiry Nature
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0e121d] border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Press & Media">Press & Media Briefing</option>
                      <option value="Technology Licensing">Silicon & Optics Research Collaboration</option>
                      <option value="Developer Relations">NOVA OS SDK & Matrix NPU API</option>
                      <option value="General Inquiry">General Company Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-tech font-bold uppercase tracking-wider text-slate-300">
                      Transmission Content
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Outline the details of your inquiry or media coverage request..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-tech text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Message</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
