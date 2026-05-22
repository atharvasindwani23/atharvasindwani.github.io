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

let bgmAudio = null;
let bgmPlaying = false;

export function toggleBgm() {
  if (!bgmAudio) {
    bgmAudio = new Audio('/assets/audio/bgm.mp3');
    bgmAudio.loop = true;
    bgmAudio.volume = 0.3;
  }

  if (bgmPlaying) {
    bgmAudio.pause();
    bgmPlaying = false;
  } else {
    bgmAudio.play().catch(() => {});
    bgmPlaying = true;
  }

  return bgmPlaying;
}

export function isBgmPlaying() {
  return bgmPlaying;
}

let sfxEnabled = true;

export function setSfxEnabled(enabled) {
  sfxEnabled = enabled;
}

export function isSfxEnabled() {
  return sfxEnabled;
}
