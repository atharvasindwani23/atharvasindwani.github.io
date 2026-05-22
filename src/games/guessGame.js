import { guessPool } from '../data/pokemon';

let currentGame = null;

export function startGuessGame() {
  const pokemon = guessPool[Math.floor(Math.random() * guessPool.length)];
  currentGame = { pokemon, clueIndex: 0 };

  return [
    '',
    '═══════════════════════════════════',
    '     ❓ WHO\'S THAT POKÉMON? ❓',
    '═══════════════════════════════════',
    '',
    `  Clue 1: "${pokemon.clues[0]}"`,
    '',
    '  Type your guess below.',
    '  Type "clue" for another hint.',
    '  Type "quit" to give up.',
    '',
  ];
}

export function handleGuessInput(input) {
  if (!currentGame) return null;

  const guess = input.toLowerCase().trim();

  if (guess === 'quit') {
    const answer = currentGame.pokemon.name;
    currentGame = null;
    return ['', `  You gave up! It was ${answer.toUpperCase()}.`, ''];
  }

  if (guess === 'clue') {
    currentGame.clueIndex++;
    if (currentGame.clueIndex >= currentGame.pokemon.clues.length) {
      return ['  No more clues! Take your best guess.'];
    }
    return [`  Clue ${currentGame.clueIndex + 1}: "${currentGame.pokemon.clues[currentGame.clueIndex]}"`];
  }

  if (guess === currentGame.pokemon.name) {
    const name = currentGame.pokemon.name.toUpperCase();
    currentGame = null;
    return [
      '',
      `  ★ ★ ★ CORRECT! ★ ★ ★`,
      `  ${name} was identified!`,
      '  +50 EXP gained!',
      '',
    ];
  }

  return [`  ✗ "${guess}" is not correct. Try again!`];
}

export function isGuessGameActive() {
  return currentGame !== null;
}
