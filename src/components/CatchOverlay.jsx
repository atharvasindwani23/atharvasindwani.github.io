import { motion, AnimatePresence } from 'framer-motion';

export default function CatchOverlay({ active, pokemonName, result, onDone }) {
  if (!active) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 50 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Wild Pokémon appears in the grass */}
        {pokemonName && !result && (
          <motion.div
            className="absolute"
            style={{ bottom: '25%', left: '20%' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <WildPokemonSprite name={pokemonName} />
            <motion.div
              className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-sm"
              style={{ background: '#1a1a1a', border: '2px solid #e04040' }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="font-pixel text-[8px] text-red-400">Wild {pokemonName}!</span>
            </motion.div>
          </motion.div>
        )}

        {/* Pokéball throw animation */}
        {result !== null && (
          <motion.div
            className="absolute"
            style={{ bottom: '35%', left: '35%' }}
            initial={{ x: 200, y: 100 }}
            animate={{ x: 0, y: 0 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
          >
            <PokeballSprite shaking={result === 'pending'} />
          </motion.div>
        )}

        {/* Catch result flash */}
        {result === 'caught' && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function WildPokemonSprite({ name }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" className="pixel-render">
      {/* Generic Pokémon silhouette — shows as a mystery shape */}
      <rect x="16" y="8" width="16" height="16" fill="#404040" />
      <rect x="12" y="16" width="24" height="16" fill="#505050" />
      <rect x="8" y="24" width="8" height="12" fill="#404040" />
      <rect x="32" y="24" width="8" height="12" fill="#404040" />
      <rect x="14" y="32" width="8" height="8" fill="#404040" />
      <rect x="26" y="32" width="8" height="8" fill="#404040" />
      {/* Eyes glow */}
      <motion.rect
        x="18" y="18" width="4" height="4" fill="#ff4040"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.rect
        x="26" y="18" width="4" height="4" fill="#ff4040"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </svg>
  );
}

function PokeballSprite({ shaking }) {
  return (
    <motion.svg
      width="32" height="32" viewBox="0 0 32 32" className="pixel-render"
      animate={shaking ? { rotate: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 1, repeat: shaking ? Infinity : 0 }}
    >
      {/* Top half - red */}
      <path d="M4 16 A12 12 0 0 1 28 16" fill="#e04040" />
      {/* Bottom half - white */}
      <path d="M4 16 A12 12 0 0 0 28 16" fill="#f0f0f0" />
      {/* Center band */}
      <rect x="4" y="14" width="24" height="4" fill="#1a1a1a" />
      {/* Button */}
      <circle cx="16" cy="16" r="5" fill="#f0f0f0" stroke="#1a1a1a" strokeWidth="2" />
      <circle cx="16" cy="16" r="2" fill="#ffffff" />
      {/* Outline */}
      <circle cx="16" cy="16" r="13" fill="none" stroke="#1a1a1a" strokeWidth="2" />
    </motion.svg>
  );
}
