// Ambient Web Audio synth delivering a gentle, warm vintage Rhumba guitar & vinyl texture
class AmbientSoundManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private gainNode: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.08, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
  }

  // Plays a melodic acoustic guitar pluck chord progression inspired by classic Congolese Rhumba
  private playChord() {
    if (!this.ctx || !this.gainNode || !this.isPlaying) return;

    // Classic Rhumba progression in C Major / G Major / F Major
    const progressions = [
      [261.63, 329.63, 392.0, 523.25], // C major
      [349.23, 440.0, 523.25, 698.46], // F major
      [392.0, 493.88, 587.33, 783.99], // G major
      [349.23, 440.0, 523.25, 659.25], // F major 7
    ];

    const chord = progressions[Math.floor(Math.random() * progressions.length)];
    const now = this.ctx.currentTime;

    chord.forEach((freq, idx) => {
      if (!this.ctx || !this.gainNode) return;
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      noteGain.gain.setValueAtTime(0.001, now + idx * 0.12);
      noteGain.gain.exponentialRampToValueAtTime(0.04, now + idx * 0.12 + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.6);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 1.8);
    });
  }

  public toggle(): boolean {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.isPlaying = true;
      this.playChord();
      this.timerId = window.setInterval(() => {
        this.playChord();
      }, 3200);
      return true;
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const ambientSound = new AmbientSoundManager();
