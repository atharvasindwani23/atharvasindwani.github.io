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
  const fanfare = [
    [523, 0.12], [523, 0.12], [523, 0.12], [523, 0.35],
    [415, 0.12], [466, 0.12], [523, 0.18],
    [466, 0.08], [523, 0.5],
    [659, 0.15], [784, 0.15], [880, 0.15], [1047, 0.4],
  ];
  let delay = 0;
  fanfare.forEach(([freq, dur]) => {
    setTimeout(() => playTone(freq, dur + 0.05, 'square', 0.13), delay * 1000);
    setTimeout(() => playTone(freq * 0.5, dur + 0.05, 'triangle', 0.06), delay * 1000);
    delay += dur;
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
let bgmAudio = null;

function getBgmAudio() {
  if (!bgmAudio) {
    bgmAudio = new Audio('/bgm.mp3');
    bgmAudio.loop = true;
    bgmAudio.volume = 0.3;
  }
  return bgmAudio;
}

export function startBgmOnInteraction() {
  if (bgmPlaying) return;
  const audio = getBgmAudio();
  audio.play().then(() => {
    bgmPlaying = true;
  }).catch(() => {});
}

export function toggleBgm() {
  const audio = getBgmAudio();
  if (bgmPlaying) {
    audio.pause();
    bgmPlaying = false;
  } else {
    audio.play().catch(() => {});
    bgmPlaying = true;
  }
  return bgmPlaying;
}

export function isBgmPlaying() {
  return bgmPlaying;
}
