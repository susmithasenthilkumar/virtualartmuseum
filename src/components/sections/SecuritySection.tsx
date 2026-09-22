import React, { useState } from 'react';
import { ShieldCheck, Lock, ScanFace, Key, Cpu, Fingerprint, Eye, Sparkles } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanUnlocked, setScanUnlocked] = useState(true);

  const handleTestBiometrics = () => {
    setIsScanning(true);
    setScanUnlocked(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanUnlocked(true);
    }, 1400);
  };

  return (
    <section id="security" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#07090e] border-t border-white/10 overflow-hidden">
      
      {/* Background ambient security glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-15 bg-blue-500 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-tech font-bold uppercase tracking-[0.2em] text-blue-400">
            <Lock className="w-3.5 h-3.5" />
            <span>SECTION 07 • HARDWARE ENCLAVE</span>
          </div>

          <h2 className="font-tech text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Your world.{' '}
            <span className="text-gradient-blue block sm:inline">
              Your privacy.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed">
            Biometric credentials never leave the physical silicon of your phone. Secured by an isolated hardware enclave with 3D structured light facial mapping.
          </p>
        </div>

        {/* Security Interactive Stage: 3D Face-Scan Biometric Simulation */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Biometric Face-Scan Simulator Screen (Col 6) */}
          <div className="lg:col-span-6 relative rounded-3xl bg-[#090c14] border border-white/15 p-8 flex flex-col items-center justify-between min-h-[420px] shadow-2xl overflow-hidden">
            
            {/* Top Security Status */}
            <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-blue-400">
                <ScanFace className="w-4 h-4" />
                <span>3D STRUCTURED LIGHT IR</span>
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                FIDO2 CERTIFIED
              </span>
            </div>

            {/* Center Biometric Face Reticle */}
            <div className="relative my-8 w-56 h-56 flex items-center justify-center">
              
              {/* Outer scanning circle */}
              <div className={`absolute inset-0 rounded-full border-2 border-dashed transition-all duration-700 ${
                isScanning ? 'border-blue-400 animate-spin' : scanUnlocked ? 'border-emerald-400/60' : 'border-white/20'
              }`} />

              {/* Glowing face mesh points simulation */}
              <div className="relative w-40 h-40 rounded-full bg-black/60 border border-white/15 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-tech-dots opacity-40" />

                {/* Laser scanline animation */}
                {isScanning && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-lg shadow-blue-500 animate-bounce" />
                )}

                <div className="text-center space-y-1 z-10">
                  <ScanFace className={`w-14 h-14 mx-auto transition-colors duration-300 ${
                    scanUnlocked ? 'text-emerald-400' : isScanning ? 'text-blue-400' : 'text-slate-500'
                  }`} />
                  <span className="font-mono text-[10px] text-slate-300 block">
                    {isScanning ? 'MAPPING 30,000 INFRARED DOTS...' : scanUnlocked ? 'BIOMETRICS AUTHENTICATED' : 'LOCKED'}
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Trigger Action */}
            <div className="w-full space-y-3">
              <button
                onClick={handleTestBiometrics}
                disabled={isScanning}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-tech text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-600/20 cursor-pointer disabled:opacity-50"
              >
                {isScanning ? 'Authenticating Infrared Map...' : 'Simulate 3D Face Unlock'}
              </button>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>False Acceptance Rate: 1 in 1,000,000</span>
                <span>Latency: 0.12s</span>
              </div>
            </div>

          </div>

          {/* Hardware Secure Enclave Architecture Breakdown (Col 6) */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-tech text-lg font-bold text-white">
                    NOVA Secure Vault
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    Physically Isolated Hardware Security Module
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                A physically segregated micro-controller inside the N1 Ultra that has its own isolated RAM, clock generator, and crypto-engine. Keys never enter main memory.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { label: 'AES-256-XTS', desc: 'Hardware Disk Encryption' },
                  { label: 'FIPS 140-3 Level 3', desc: 'Tamper-Resistant Silicon' },
                  { label: 'Zero Cloud Storage', desc: 'Local Biometric Vault' },
                  { label: 'Private Neural Sandbox', desc: 'Isolated AI Execution' },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
                    <h4 className="font-tech text-xs font-bold text-white">{item.label}</h4>
                    <p className="text-[10px] text-slate-400 font-sans">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-3 text-xs text-slate-400 font-sans">
              <Fingerprint className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Includes 3D Ultrasonic In-Display Fingerprint Sensor functioning with wet or oily fingertips.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
