import { catchPool } from '../data/pokemon';

let currentCatch = null;
let sequenceChallenge = null;

const DIFFICULTY = {
  common:    { length: 4, timeMs: 5000 },
  uncommon:  { length: 5, timeMs: 4000 },
  rare:      { length: 6, timeMs: 3000 },
  legendary: { length: 8, timeMs: 2500 },
};

function generateSequence(length) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

export function startCatchGame() {
  const pokemon = catchPool[Math.floor(Math.random() * catchPool.length)];
  currentCatch = { pokemon };
  sequenceChallenge = null;

  const diff = DIFFICULTY[pokemon.rarity];
  return [
    '',
    '═══════════════════════════════════',
    '     🔴 WILD POKÉMON APPEARED! 🔴',
    '═══════════════════════════════════',
    '',
    `  A wild ${pokemon.name} appeared!`,
    `  Rarity: ⟨${pokemon.rarity.toUpperCase()}⟩`,
    '',
    '  Type "throw" to use a Pokéball.',
    '  Type "run" to flee.',
    '',
    `  ⚡ Catch challenge: type a ${diff.length}-digit`,
    `     sequence within ${(diff.timeMs / 1000).toFixed(1)}s!`,
    '',
  ];
}

export function handleCatchInput(input) {
  if (!currentCatch) return null;

  const cmd = input.trim();

  if (cmd.toLowerCase() === 'run' && !sequenceChallenge) {
    const name = currentCatch.pokemon.name;
    currentCatch = null;
    sequenceChallenge = null;
    return { lines: ['', `  Got away safely from ${name}!`, ''], caught: null };
  }

  if (cmd.toLowerCase() === 'throw' && !sequenceChallenge) {
    const { pokemon } = currentCatch;
    const diff = DIFFICULTY[pokemon.rarity];
    const seq = generateSequence(diff.length);
    sequenceChallenge = { sequence: seq, startTime: Date.now(), timeMs: diff.timeMs };

    return {
      lines: [
        '',
        '  ● ● ● Throwing Pokéball... ● ● ●',
        '',
        '  ┌───────────────────────────────┐',
        `  │  QUICK! Type: ${seq}${' '.repeat(Math.max(0, 14 - seq.length))}│`,
        `  │  Time limit: ${(diff.timeMs / 1000).toFixed(1)}s${' '.repeat(Math.max(0, 14 - 4))}│`,
        '  └───────────────────────────────┘',
        '',
      ],
      caught: null,
    };
  }

  if (sequenceChallenge) {
    const elapsed = Date.now() - sequenceChallenge.startTime;
    const { pokemon } = currentCatch;

    if (elapsed > sequenceChallenge.timeMs) {
      sequenceChallenge = null;
      return {
        lines: [
          '',
          '  ⏱ TOO SLOW!',
          '',
          `  ✗ ${pokemon.name} broke free!`,
          '',
          '  Type "throw" to try again or "run" to flee.',
          '',
        ],
        caught: null,
      };
    }

    if (cmd === sequenceChallenge.sequence) {
      const caught = { ...pokemon };
      const timeUsed = (elapsed / 1000).toFixed(2);
      currentCatch = null;
      sequenceChallenge = null;
      return {
        lines: [
          '',
          `  ⚡ Sequence entered in ${timeUsed}s!`,
          '',
          '  ...Shake...',
          '  ...Shake...',
          '  ...Shake...',
          '',
          `  ★ Gotcha! ${pokemon.name} was caught! ★`,
          '  Added to your collection!',
          '',
          '  Type -caught to view collection.',
          '',
        ],
        caught,
      };
    } else {
      sequenceChallenge = null;
      return {
        lines: [
          '',
          `  ✗ Wrong sequence! ${pokemon.name} broke free!`,
          '',
          '  Type "throw" to try again or "run" to flee.',
          '',
        ],
        caught: null,
      };
    }
  }

  return { lines: ['  Type "throw" to use a Pokéball or "run" to flee.'], caught: null };
}

export function isCatchGameActive() {
  return currentCatch !== null;
}
