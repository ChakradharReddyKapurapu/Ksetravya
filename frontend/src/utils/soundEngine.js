/**
 * Procedural Web Audio Synthesizer for Morning Farm Ambiance
 * No external MP3 files required! Fully dynamic and lightweight.
 */

class FarmSoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.windNode = null;
    this.windGain = null;
    this.birdTimer = null;
    this.masterGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  startAmbiance() {
    this.init();
    if (!this.ctx || this.isPlaying) return;
    this.isPlaying = true;

    // 1. Soft Morning Wind Generator (Pink/Brown noise filter)
    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 2.5; // Gain
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Low pass filter for soft breeze
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    // LFO to modulate breeze frequency
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.18, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    this.windGain = this.ctx.createGain();
    this.windGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(this.windGain);
    this.windGain.connect(this.masterGain);
    noise.start();
    this.windNode = noise;

    // 2. Procedural Bird Chirps Generator
    const scheduleNextBird = () => {
      if (!this.isPlaying) return;
      this.playBirdChirp();
      const nextDelay = 2200 + Math.random() * 4500;
      this.birdTimer = setTimeout(scheduleNextBird, nextDelay);
    };
    scheduleNextBird();
  }

  playBirdChirp() {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const startFreq = 2200 + Math.random() * 1200;
    const endFreq = startFreq + (Math.random() > 0.5 ? 600 : -500);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(startFreq + 200, now + 0.22);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  stopAmbiance() {
    this.isPlaying = false;
    if (this.birdTimer) clearTimeout(this.birdTimer);
    if (this.windNode) {
      try {
        this.windNode.stop();
        this.windNode.disconnect();
      } catch (e) {
        // already stopped
      }
      this.windNode = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stopAmbiance();
      return false;
    } else {
      this.startAmbiance();
      return true;
    }
  }
}

export const farmSound = new FarmSoundEngine();
