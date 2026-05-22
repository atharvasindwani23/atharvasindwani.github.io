import { motion } from 'framer-motion';

export default function TrainerCard() {
  return (
    <motion.div
      className="h-full flex flex-col justify-between rounded-md p-3"
      style={{
        background: 'linear-gradient(180deg, #0d1f3c 0%, #081428 100%)',
        border: '2px solid #1a3a1a',
        boxShadow: 'inset 0 0 20px rgba(74, 222, 128, 0.05)',
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {/* Avatar */}
      <div className="text-center mb-3">
        <div className="text-4xl mb-2">👨‍💻</div>
        <h2 className="font-pixel text-green-400 text-[9px] leading-tight">ATHARVA</h2>
        <h2 className="font-pixel text-green-400 text-[9px] leading-tight">SINDWANI</h2>
        <p className="font-pixel text-green-700 text-[7px] mt-1">CS + ADV @ UIUC</p>
      </div>

      {/* Stats */}
      <div className="border-t border-green-900/50 pt-2 space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="font-pixel text-[7px] text-green-600">LVL</span>
          <span className="font-pixel text-[7px] text-green-400">JUNIOR</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-pixel text-[7px] text-green-600">GPA</span>
          <span className="font-pixel text-[7px] text-green-400">4.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-pixel text-[7px] text-green-600">TYPE</span>
          <span className="font-pixel text-[7px] text-green-400">AI/SWE</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-pixel text-[7px] text-green-600">REGION</span>
          <span className="font-pixel text-[7px] text-green-400">UIUC</span>
        </div>
      </div>

      {/* Badges */}
      <div className="border-t border-green-900/50 pt-2 mt-2">
        <p className="font-pixel text-[7px] text-green-700 mb-1.5">BADGES</p>
        <div className="grid grid-cols-3 gap-1">
          {['🏆', '⚡', '🎯', '🔬', '👑', '🚀'].map((badge, i) => (
            <motion.div
              key={i}
              className="w-6 h-6 rounded-sm flex items-center justify-center text-xs"
              style={{ background: '#1a2d1a', border: '1px solid #2d5a2d' }}
              whileHover={{ scale: 1.2 }}
            >
              {badge}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="border-t border-green-900/50 pt-2 mt-2 flex items-center gap-2">
        <motion.div
          className="w-2 h-2 rounded-full bg-green-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="font-pixel text-[7px] text-green-500">ONLINE</span>
      </div>
    </motion.div>
  );
}
