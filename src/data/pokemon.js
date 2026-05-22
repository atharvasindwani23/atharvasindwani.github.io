export const guessPool = [
  {
    name: "pikachu",
    clues: ["Electric type.", "Yellow body with red cheeks.", "Mascot of the franchise.", "Says its own name a lot."],
  },
  {
    name: "charizard",
    clues: ["Fire/Flying type.", "Final evolution of a starter.", "Has wings and a flame tail.", "Orange dragon-like creature."],
  },
  {
    name: "mewtwo",
    clues: ["Psychic type.", "Created in a laboratory.", "One of the most powerful legendary Pokémon.", "Clone of Mew."],
  },
  {
    name: "snorlax",
    clues: ["Normal type.", "Known for blocking paths.", "Sleeps most of the time.", "Extremely heavy and loves to eat."],
  },
  {
    name: "gengar",
    clues: ["Ghost/Poison type.", "Has a mischievous grin.", "Hides in shadows.", "Final evolution involves trading."],
  },
  {
    name: "eevee",
    clues: ["Normal type.", "Has the most evolutions.", "Small and fox-like.", "Unstable genetic code."],
  },
  {
    name: "gyarados",
    clues: ["Water/Flying type.", "Evolves from a very weak Pokémon.", "Known for its rage.", "Serpentine sea creature."],
  },
  {
    name: "lucario",
    clues: ["Fighting/Steel type.", "Can sense aura.", "Bipedal jackal-like Pokémon.", "Featured in its own movie."],
  },
  {
    name: "gardevoir",
    clues: ["Psychic/Fairy type.", "Extremely loyal to its trainer.", "Can see the future.", "Elegant and graceful."],
  },
  {
    name: "greninja",
    clues: ["Water/Dark type.", "A ninja frog.", "Can create shuriken from water.", "Ash's strongest Kalos Pokémon."],
  },
];

export const catchPool = [
  { name: "Pidgey", rarity: "common", sprite: "pidgey" },
  { name: "Rattata", rarity: "common", sprite: "rattata" },
  { name: "Caterpie", rarity: "common", sprite: "caterpie" },
  { name: "Weedle", rarity: "common", sprite: "weedle" },
  { name: "Zubat", rarity: "common", sprite: "zubat" },
  { name: "Charmander", rarity: "uncommon", sprite: "charmander" },
  { name: "Bulbasaur", rarity: "uncommon", sprite: "bulbasaur" },
  { name: "Squirtle", rarity: "uncommon", sprite: "squirtle" },
  { name: "Pikachu", rarity: "uncommon", sprite: "pikachu" },
  { name: "Eevee", rarity: "uncommon", sprite: "eevee" },
  { name: "Abra", rarity: "rare", sprite: "abra" },
  { name: "Dratini", rarity: "rare", sprite: "dratini" },
  { name: "Larvitar", rarity: "rare", sprite: "larvitar" },
  { name: "Scyther", rarity: "rare", sprite: "scyther" },
  { name: "Mewtwo", rarity: "legendary", sprite: "mewtwo" },
  { name: "Mew", rarity: "legendary", sprite: "mew" },
  { name: "Rayquaza", rarity: "legendary", sprite: "rayquaza" },
  { name: "Lugia", rarity: "legendary", sprite: "lugia" },
];

export const catchRates = {
  common: 0.85,
  uncommon: 0.6,
  rare: 0.3,
  legendary: 0.1,
};

export const backgroundPokemon = [
  { name: "Bulbasaur", x: 8, y: 70, size: 40, hidden: false },
  { name: "Oddish", x: 85, y: 75, size: 32, hidden: true },
  { name: "Caterpie", x: 15, y: 85, size: 28, hidden: false },
  { name: "Pikachu", x: 90, y: 60, size: 36, hidden: false },
  { name: "Bellsprout", x: 5, y: 55, size: 30, hidden: true },
  { name: "Butterfree", x: 75, y: 20, size: 38, hidden: false },
  { name: "Pidgey", x: 20, y: 15, size: 34, hidden: false },
  { name: "Jigglypuff", x: 92, y: 40, size: 30, hidden: true },
];
