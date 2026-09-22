// Subtle, soothing ambient soundscape generator using the Web Audio API
// Generates gentle museum-hall acoustic resonance without needing external audio files.

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let isPlaying = false;
let oscillators: OscillatorNode[] = [];
let intervalId: any = null;

export function toggleAmbientSoundscape(shouldPlay?: boolean): boolean {
  if (typeof window === 'undefined') return false;

  const targetState = shouldPlay !== undefined ? shouldPlay : !isPlaying;

  if (targetState) {
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtx = new AudioContextClass();
      }

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      if (!masterGain) {
        masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        masterGain.connect(audioCtx.destination);
      }

      // Gentle warm drone chords: F# minor ambient pad (185Hz, 220Hz, 277Hz, 370Hz)
      const baseFreqs = [185.00, 220.00, 277.18, 369.99];
      oscillators = baseFreqs.map((freq, i) => {
        const osc = audioCtx!.createOscillator();
        const gain = audioCtx!.createGain();
        
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq + (Math.random() * 0.5 - 0.25), audioCtx!.currentTime);

        gain.gain.setValueAtTime(0.015 / (i + 1), audioCtx!.currentTime);
        osc.connect(gain);
        gain.connect(masterGain!);

        osc.start();
        return osc;
      });

      // Occasional gentle museum chime
      intervalId = setInterval(() => {
        if (!audioCtx || !masterGain || !isPlaying) return;
        try {
          const chimeFreqs = [554.37, 659.25, 830.61, 987.77, 1108.73];
          const chosenFreq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];
          const chimeOsc = audioCtx.createOscillator();
          const chimeGain = audioCtx.createGain();

          chimeOsc.type = 'sine';
          chimeOsc.frequency.setValueAtTime(chosenFreq, audioCtx.currentTime);

          chimeGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
          chimeGain.gain.exponentialRampToValueAtTime(0.012, audioCtx.currentTime + 0.1);
          chimeGain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 3.5);

          chimeOsc.connect(chimeGain);
          chimeGain.connect(masterGain);

          chimeOsc.start();
          chimeOsc.stop(audioCtx.currentTime + 3.6);
        } catch {
          // ignore transient audio quirks
        }
      }, 7000);

      isPlaying = true;
      return true;
    } catch {
      isPlaying = false;
      return false;
    }
  } else {
    // Stop audio
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    oscillators = [];
    isPlaying = false;
    return false;
  }
}

export function isAmbientPlaying(): boolean {
  return isPlaying;
}
