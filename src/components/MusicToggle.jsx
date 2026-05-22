import { motion } from 'framer-motion';

export default function MusicToggle({ playing, onToggle }) {
  return (
    <motion.button
      className="absolute top-2 right-2 z-20 flex items-center gap-1 px-2 py-1 rounded-sm font-pixel text-[7px] transition-colors"
      style={{
        background: 'rgba(0,0,0,0.7)',
        border: '1px solid #2d5a2d',
        color: playing ? '#4ade80' : '#6b7280',
      }}
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Toggle music (-music)"
    >
      {playing ? '♪ ON' : '♪ OFF'}
    </motion.button>
  );
}
