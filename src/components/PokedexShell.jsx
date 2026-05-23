import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TrainerCard from './TrainerCard';
import TerminalScreen from './TerminalScreen';
import Controls from './Controls';
import MusicToggle from './MusicToggle';
import CaughtCollection from './CaughtCollection';
import { toggleBgm, startBgmOnInteraction } from '../utils/audio';

export default function PokedexShell({ onCatchStart, onThrow }) {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [caughtPokemon, setCaughtPokemon] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('caughtPokemon')) || [];
    } catch { return []; }
  });
  const bgmStarted = useRef(false);

  useEffect(() => {
    const handleInteraction = () => {
      if (!bgmStarted.current) {
        bgmStarted.current = true;
        startBgmOnInteraction();
        setMusicPlaying(true);
      }
    };
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const toggleMusic = () => {
    const playing = toggleBgm();
    setMusicPlaying(playing);
  };

  const handleCatch = (pokemon) => {
    setCaughtPokemon(prev => {
      const updated = [...prev, pokemon];
      localStorage.setItem('caughtPokemon', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4" style={{ zIndex: 1 }}>
      <motion.div
        className="relative w-full max-w-sm sm:max-w-md"
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Pokédex outer casing — slimmer and taller */}
        <div
          className="rounded-2xl p-1.5 sm:p-2 relative"
          style={{
            background: 'linear-gradient(160deg, #ef4444 0%, #dc2626 40%, #b91c1c 100%)',
            border: '4px solid #1a1a1a',
            boxShadow: '8px 8px 0 rgba(0,0,0,0.6), inset 2px 2px 0 rgba(255,255,255,0.15), inset -1px -1px 0 rgba(0,0,0,0.3)',
          }}
        >
          {/* Top details — lights and screws */}
          <div className="flex items-center gap-2 mb-2 px-1">
            <motion.div
              className="w-7 h-7 rounded-full"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #7dd3fc, #0ea5e9, #0369a1)',
                border: '3px solid #1e3a5f',
                boxShadow: '0 0 15px rgba(14, 165, 233, 0.5), inset 2px 2px 3px rgba(255,255,255,0.4)',
              }}
              animate={{ boxShadow: ['0 0 12px rgba(14, 165, 233, 0.4)', '0 0 22px rgba(14, 165, 233, 0.8)', '0 0 12px rgba(14, 165, 233, 0.4)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="w-2.5 h-2.5 rounded-full bg-red-400 border border-red-700"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-yellow-600" />
            <motion.div
              className="w-2.5 h-2.5 rounded-full bg-green-400 border border-green-600"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <div className="ml-auto flex gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-600 border border-gray-800" style={{ boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.2)' }} />
              <div className="w-2 h-2 rounded-full bg-gray-600 border border-gray-800" style={{ boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.2)' }} />
            </div>
          </div>

          {/* Inner black frame */}
          <div
            className="rounded-xl p-2 sm:p-3 relative"
            style={{
              background: '#1a1a1a',
              border: '2px solid #0a0a0a',
              boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.5)',
            }}
          >
            <MusicToggle playing={musicPlaying} onToggle={toggleMusic} />
            <CaughtCollection caught={caughtPokemon} />

            {/* Screen label */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="font-pixel text-[5px] text-gray-500">POKÉDEX v2.0</span>
            </div>

            {/* Main layout: TrainerCard + Terminal stacked vertically on mobile, side by side on sm+ */}
            <div className="flex flex-col sm:flex-row gap-2 mb-2">
              {/* Left: Trainer Card */}
              <div className="sm:w-[130px] flex-shrink-0 hidden sm:block">
                <TrainerCard />
              </div>

              {/* Right: Terminal Screen */}
              <div className="flex-1 h-[420px] sm:h-[480px]">
                <TerminalScreen
                  onMusicToggle={toggleMusic}
                  onCatch={handleCatch}
                  onCatchStart={onCatchStart}
                  onThrow={onThrow}
                  caughtPokemon={caughtPokemon}
                />
              </div>
            </div>

            {/* Controls */}
            <Controls />
          </div>

          {/* Bottom details */}
          <div className="flex items-center justify-between px-2 mt-1.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-0.5 h-3 bg-gray-800 rounded-full" />
              ))}
            </div>
            <span className="font-pixel text-[5px] text-red-900 opacity-60">TRAINER-DEX™</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-600 border border-gray-800" />
              <div className="w-2 h-2 rounded-full bg-gray-600 border border-gray-800" />
            </div>
          </div>
        </div>

        {/* Hinge */}
        <div className="flex justify-center">
          <div className="w-16 h-1.5 rounded-b-lg" style={{ background: 'linear-gradient(180deg, #991b1b, #7f1d1d)', border: '1px solid #1a1a1a', borderTop: 'none' }} />
        </div>
      </motion.div>
    </div>
  );
}
