let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
    if (typeof window === "undefined") {
        throw new Error("Web Audio API is only available in the browser");
    }

    if (!audioCtx) {
        audioCtx = new AudioContext();
    }

    if (audioCtx.state === "suspended") {
        void audioCtx.resume();
    }

    return audioCtx;
}

/** Lower chromatic range so notes stay warm and thocky, not sharp. */
export function getXylophoneFrequency(index: number): number {
    const C3 = 261.63;
    return C3 * Math.pow(2, index / 12);
}

/** Soft, muted thock — round body + filtered knock, no bright highs. */
export function playXylophoneNote(frequency: number): void {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        // Round tonal body
        const body = ctx.createOscillator();
        const bodyGain = ctx.createGain();
        body.type = "sine";
        body.frequency.setValueAtTime(frequency, now);
        body.frequency.exponentialRampToValueAtTime(frequency * 0.92, now + 0.12);

        bodyGain.gain.setValueAtTime(0, now);
        bodyGain.gain.linearRampToValueAtTime(0.35, now + 0.012);
        bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        // Sub thump for weight
        const sub = ctx.createOscillator();
        const subGain = ctx.createGain();
        sub.type = "sine";
        sub.frequency.setValueAtTime(frequency * 0.5, now);

        subGain.gain.setValueAtTime(0, now);
        subGain.gain.linearRampToValueAtTime(0.22, now + 0.008);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        // Soft noise knock (the "thock")
        const noiseDuration = 0.06;
        const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * noiseDuration, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
        }

        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = "lowpass";
        noiseFilter.frequency.setValueAtTime(Math.min(frequency * 2.2, 900), now);
        noiseFilter.Q.setValueAtTime(0.7, now);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0, now);
        noiseGain.gain.linearRampToValueAtTime(0.45, now + 0.004);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

        // Master lowpass — keeps everything muted / thocky
        const master = ctx.createBiquadFilter();
        master.type = "lowpass";
        master.frequency.setValueAtTime(Math.min(frequency * 3.5, 1200), now);
        master.Q.setValueAtTime(0.5, now);

        const out = ctx.createGain();
        out.gain.setValueAtTime(0.7, now);

        body.connect(bodyGain);
        bodyGain.connect(master);
        sub.connect(subGain);
        subGain.connect(master);
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(master);
        master.connect(out);
        out.connect(ctx.destination);

        body.start(now);
        sub.start(now);
        noise.start(now);
        body.stop(now + 0.32);
        sub.stop(now + 0.22);
        noise.stop(now + noiseDuration);
    } catch {
        // Ignore — AudioContext may be blocked until user gesture in some browsers
    }
}
