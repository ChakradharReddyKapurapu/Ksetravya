/**
 * Procedural Web Audio Synthesizer for Agricultural Wholesale Market Ambiance
 * No external MP3 files required! Lightweight and dynamic.
 * OFF by default per user guidelines.
 */

class MarketSoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.noiseNode = null;
    this.masterGain = null;
    this.chatterTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
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

    // 1. Soft Warm Market Ambient Air Filter (Pink/Brown noise)
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.03 * white) / 1.03;
      lastOut = data[i];
      data[i] *= 2.0;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start();
    this.noiseNode = noise;

    // 2. Periodic subtle acoustic market tones (simulating distant bells / auction chime)
    const scheduleNextChime = () => {
      if (!this.isPlaying) return;
      this.playAuctionChime();
      const nextDelay = 4000 + Math.random() * 6000;
      this.chatterTimer = setTimeout(scheduleNextChime, nextDelay);
    };
    scheduleNextChime();
  }

  playAuctionChime() {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.35);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  stopAmbiance() {
    this.isPlaying = false;
    if (this.chatterTimer) clearTimeout(this.chatterTimer);
    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      } catch (e) {
        // already stopped
      }
      this.noiseNode = null;
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

export const marketSound = new MarketSoundEngine();
