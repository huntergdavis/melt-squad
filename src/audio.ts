export class Sound {
  private context?: AudioContext;
  muted = false;
  unlock() {
    if (this.muted) return;
    try {
      this.context ??= new AudioContext();
      void this.context.resume().catch(() => {});
    } catch {
      /* Audio is optional. */
    }
  }
  play(kind: "tap" | "goal" | "win") {
    if (this.muted || !this.context || this.context.state !== "running") return;
    const notes =
      kind === "win"
        ? [392, 494, 587, 784]
        : kind === "goal"
          ? [440, 660]
          : [350];
    notes.forEach((note, i) => {
      const ctx = this.context!,
        at = ctx.currentTime + i * 0.11;
      const osc = ctx.createOscillator(),
        gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(note, at);
      gain.gain.setValueAtTime(0, at);
      gain.gain.linearRampToValueAtTime(0.07, at + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, at + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(at);
      osc.stop(at + 0.27);
    });
  }
}
