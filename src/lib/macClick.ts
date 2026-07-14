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

/** Tactile light-switch flip — familiar, satisfying physical response. */
export function playMacClick(): void {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        const master = ctx.createGain();
        master.gain.setValueAtTime(0.75, now);
        master.connect(ctx.destination);

        // 1) Contact tick — the switch engages
        const tickDuration = 0.025;
        const tickBuffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * tickDuration), ctx.sampleRate);
        const tickData = tickBuffer.getChannelData(0);
        for (let i = 0; i < tickData.length; i++) {
            tickData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (tickData.length * 0.2));
        }

        const tick = ctx.createBufferSource();
        tick.buffer = tickBuffer;

        const tickFilter = ctx.createBiquadFilter();
        tickFilter.type = "bandpass";
        tickFilter.frequency.setValueAtTime(2400, now);
        tickFilter.Q.setValueAtTime(1.4, now);

        const tickGain = ctx.createGain();
        tickGain.gain.setValueAtTime(0, now);
        tickGain.gain.linearRampToValueAtTime(0.35, now + 0.001);
        tickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

        // 2) Lever body — soft plastic flip / thunk
        const body = ctx.createOscillator();
        const bodyGain = ctx.createGain();
        body.type = "triangle";
        body.frequency.setValueAtTime(220, now);
        body.frequency.exponentialRampToValueAtTime(70, now + 0.09);

        bodyGain.gain.setValueAtTime(0, now);
        bodyGain.gain.linearRampToValueAtTime(0.32, now + 0.004);
        bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

        // 3) Soft settle — the flip lands in place
        const settleStart = now + 0.045;
        const settle = ctx.createOscillator();
        const settleGain = ctx.createGain();
        settle.type = "sine";
        settle.frequency.setValueAtTime(340, settleStart);
        settle.frequency.exponentialRampToValueAtTime(120, settleStart + 0.06);

        settleGain.gain.setValueAtTime(0, settleStart);
        settleGain.gain.linearRampToValueAtTime(0.14, settleStart + 0.003);
        settleGain.gain.exponentialRampToValueAtTime(0.001, settleStart + 0.07);

        // Soft transient for the settle
        const settleNoiseDuration = 0.02;
        const settleNoiseBuffer = ctx.createBuffer(
            1,
            Math.ceil(ctx.sampleRate * settleNoiseDuration),
            ctx.sampleRate,
        );
        const settleNoiseData = settleNoiseBuffer.getChannelData(0);
        for (let i = 0; i < settleNoiseData.length; i++) {
            settleNoiseData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (settleNoiseData.length * 0.3));
        }

        const settleNoise = ctx.createBufferSource();
        settleNoise.buffer = settleNoiseBuffer;

        const settleNoiseFilter = ctx.createBiquadFilter();
        settleNoiseFilter.type = "lowpass";
        settleNoiseFilter.frequency.setValueAtTime(900, settleStart);

        const settleNoiseGain = ctx.createGain();
        settleNoiseGain.gain.setValueAtTime(0, settleStart);
        settleNoiseGain.gain.linearRampToValueAtTime(0.18, settleStart + 0.002);
        settleNoiseGain.gain.exponentialRampToValueAtTime(0.001, settleStart + 0.025);

        tick.connect(tickFilter);
        tickFilter.connect(tickGain);
        tickGain.connect(master);

        body.connect(bodyGain);
        bodyGain.connect(master);

        settle.connect(settleGain);
        settleGain.connect(master);

        settleNoise.connect(settleNoiseFilter);
        settleNoiseFilter.connect(settleNoiseGain);
        settleNoiseGain.connect(master);

        tick.start(now);
        body.start(now);
        settle.start(settleStart);
        settleNoise.start(settleStart);

        tick.stop(now + tickDuration);
        body.stop(now + 0.13);
        settle.stop(settleStart + 0.08);
        settleNoise.stop(settleStart + settleNoiseDuration);
    } catch {
        // Ignore — AudioContext may be blocked until user gesture
    }
}
