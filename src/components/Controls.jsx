import { motion } from 'framer-motion';
import { playButtonClick } from '../utils/audio';

export default function Controls({ onCommand }) {
  const quickCommands = ['-help', '-about', '-projects', '-catch'];

  return (
    <motion.div
      className="flex items-center justify-between px-3 py-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      {/* D-Pad */}
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          <div className="dpad-btn w-5 h-5 rounded-t-sm" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="dpad-btn w-5 h-5 rounded-b-sm" />
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2">
          <div className="dpad-btn w-5 h-5 rounded-l-sm" />
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2">
          <div className="dpad-btn w-5 h-5 rounded-r-sm" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-gray-800" />
      </div>

      {/* Quick command buttons */}
      <div className="flex flex-wrap gap-1 justify-center max-w-[180px]">
        {quickCommands.map(cmd => (
          <button
            key={cmd}
            onClick={() => { playButtonClick(); onCommand && onCommand(cmd); }}
            className="font-pixel text-[6px] px-2 py-1 rounded-sm bg-gray-800/80 text-gray-400 border border-gray-700 hover:text-green-400 hover:border-green-700 transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Pokéball button — shows caught collection */}
      <div
        className="pokeball-btn"
        title="View caught Pokémon"
        onClick={() => { playButtonClick(); onCommand && onCommand('-caught'); }}
      />
    </motion.div>
  );
}
