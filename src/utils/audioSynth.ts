/**
 * Subtle Ambient Web Audio Synthesizer
 * Provides an optional, elegant documentary sonic backdrop
 * Simulates gentle bakery warmth and soft harmonic hum.
 */

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let osc1: OscillatorNode | null = null;
let osc2: OscillatorNode | null = null;
let lfo: OscillatorNode | null = null;
let isPlaying = false;

export function toggleBakeryAmbiance(): boolean {
  if (isPlaying) {
    stopBakeryAmbiance();
    return false;
  } else {
    startBakeryAmbiance();
    return true;
  }
}

export function isAmbiancePlaying(): boolean {
  return isPlaying;
}

export function startBakeryAmbiance() {
  if (isPlaying) return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 3);
    masterGain.connect(audioCtx.destination);

    // Warm fundamental tone (F2 / 87.3 Hz)
    osc1 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(87.31, audioCtx.currentTime);

    // Soft 5th harmonic (C3 / 130.8 Hz)
    osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(130.81, audioCtx.currentTime);

    // LFO for slow breathing wave
    lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.setValueAtTime(0.15, audioCtx.currentTime); // 6.6 sec breathing cycle
    lfoGain.gain.setValueAtTime(0.015, audioCtx.currentTime);

    lfo.connect(lfoGain.gain);
    osc1.connect(masterGain);
    osc2.connect(masterGain);

    osc1.start();
    osc2.start();
    lfo.start();

    isPlaying = true;
  } catch (err) {
    console.warn('Audio ambiance could not be started:', err);
  }
}

export function stopBakeryAmbiance() {
  if (!isPlaying || !audioCtx || !masterGain) return;

  try {
    masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);

    setTimeout(() => {
      osc1?.stop();
      osc2?.stop();
      lfo?.stop();
      osc1?.disconnect();
      osc2?.disconnect();
      audioCtx?.close();
      audioCtx = null;
      isPlaying = false;
    }, 1250);
  } catch (err) {
    console.warn('Audio ambiance stop error:', err);
    isPlaying = false;
  }
}

export function playWhiskSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch {
    // Graceful fallback
  }
}
