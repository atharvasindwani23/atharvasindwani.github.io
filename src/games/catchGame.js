import { catchPool, catchRates } from '../data/pokemon';

let currentCatch = null;

export function startCatchGame() {
  const pokemon = catchPool[Math.floor(Math.random() * catchPool.length)];
  currentCatch = { pokemon, attempts: 0 };

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
  ];
}

export function handleCatchInput(input) {
  if (!currentCatch) return null;

  const cmd = input.toLowerCase().trim();

  if (cmd === 'run') {
    const name = currentCatch.pokemon.name;
    currentCatch = null;
    return ['', `  Got away safely from ${name}!`, ''];
  }

  if (cmd === 'throw') {
    currentCatch.attempts++;
    const { pokemon } = currentCatch;
    const rate = catchRates[pokemon.rarity];
    const success = Math.random() < rate;

    if (success) {
      const caught = { ...pokemon };
      currentCatch = null;
      return {
        lines: [
          '',
          '  ● ● ● Throwing Pokéball... ● ● ●',
          '',
          '  ...Shake...',
          '  ...Shake...',
          '  ...Shake...',
          '',
          `  ★ Gotcha! ${pokemon.name} was caught! ★`,
          `  Added to your collection!`,
          '',
          '  Type -caught to view collection.',
          '',
        ],
        caught,
      };
    } else {
      return {
        lines: [
          '',
          '  ● ● ● Throwing Pokéball... ● ● ●',
          '',
          '  ...Shake...',
          '  ...Shake...',
          '',
          `  ✗ Oh no! ${pokemon.name} broke free!`,
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
