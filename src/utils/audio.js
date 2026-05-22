let audioCtx = null;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(freq, duration, type = 'square', volume = 0.15) {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

export function playTypeSound() {
  playTone(800 + Math.random() * 200, 0.04, 'square', 0.08);
}

export function playEnterSound() {
  playTone(523, 0.06, 'square', 0.12);
  setTimeout(() => playTone(659, 0.06, 'square', 0.12), 60);
}

export function playButtonClick() {
  playTone(440, 0.05, 'square', 0.1);
}

export function playThrowSound() {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.3);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.3);
}

export function playShakeSound() {
  playTone(300, 0.1, 'triangle', 0.1);
  setTimeout(() => playTone(350, 0.1, 'triangle', 0.08), 100);
}

export function playCatchSuccess() {
  const notes = [523, 659, 784, 1047];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.15, 'square', 0.12), i * 120);
  });
}

export function playCatchFail() {
  playTone(400, 0.15, 'square', 0.12);
  setTimeout(() => playTone(300, 0.2, 'square', 0.12), 150);
  setTimeout(() => playTone(200, 0.3, 'sawtooth', 0.1), 300);
}

export function playBootSound() {
  const notes = [262, 330, 392, 523];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.2, 'square', 0.08), i * 200);
  });
}

export function playCorrectGuess() {
  const notes = [523, 659, 784, 1047, 1319];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.12, 'square', 0.1), i * 80);
  });
}

export function playWrongGuess() {
  playTone(200, 0.2, 'square', 0.1);
  setTimeout(() => playTone(180, 0.3, 'square', 0.1), 200);
}

let bgmPlaying = false;
let bgmInterval = null;

const BGM_MELODY = [
  // Pokémon-style looping melody (note, duration in beats)
  [523, 0.5], [587, 0.5], [659, 0.5], [698, 0.5],
  [784, 1], [698, 0.5], [659, 0.5],
  [587, 1], [523, 0.5], [587, 0.5],
  [659, 1.5], [0, 0.5],
  [784, 0.5], [880, 0.5], [784, 0.5], [698, 0.5],
  [659, 1], [587, 0.5], [523, 0.5],
  [587, 1], [659, 0.5], [587, 0.5],
  [523, 1.5], [0, 0.5],
  // Second phrase
  [392, 0.5], [440, 0.5], [523, 0.5], [587, 0.5],
  [659, 1], [587, 0.5], [523, 0.5],
  [440, 1], [392, 0.5], [440, 0.5],
  [523, 1.5], [0, 0.5],
  [659, 0.5], [698, 0.5], [784, 0.5], [880, 0.5],
  [784, 1], [698, 0.5], [659, 0.5],
  [587, 1], [523, 0.5], [587, 0.5],
  [523, 1.5], [0, 0.5],
];

function playBgmLoop() {
  const ctx = getCtx();
  const bpm = 140;
  const beatDur = 60 / bpm;
  let time = ctx.currentTime + 0.1;

  BGM_MELODY.forEach(([freq, beats]) => {
    const dur = beats * beatDur;
    if (freq > 0) {
      // Lead voice
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.06, time);
      gain.gain.setValueAtTime(0.06, time + dur * 0.8);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur * 0.95);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + dur);

      // Harmony (fifth below, quieter)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 0.667, time);
      gain2.gain.setValueAtTime(0.03, time);
      gain2.gain.exponentialRampToValueAtTime(0.001, time + dur * 0.9);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(time);
      osc2.stop(time + dur);
    }
    time += dur;
  });

  const totalDur = BGM_MELODY.reduce((sum, [, b]) => sum + b * beatDur, 0);
  return totalDur;
}

export function toggleBgm() {
  if (bgmPlaying) {
    if (bgmInterval) clearInterval(bgmInterval);
    bgmInterval = null;
    bgmPlaying = false;
  } else {
    const loopDur = playBgmLoop();
    bgmInterval = setInterval(() => {
      if (bgmPlaying) playBgmLoop();
    }, loopDur * 1000);
    bgmPlaying = true;
  }
  return bgmPlaying;
}

export function isBgmPlaying() {
  return bgmPlaying;
}
