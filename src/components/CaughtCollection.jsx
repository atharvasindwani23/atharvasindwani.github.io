import { motion } from 'framer-motion';

export default function CaughtCollection({ caught }) {
  if (!caught || caught.length === 0) return null;

  return (
    <motion.div
      className="absolute bottom-2 right-2 z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-1 px-2 py-1 rounded-sm" style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid #2d5a2d' }}>
        <span className="font-pixel text-[7px] text-green-500">CAUGHT:</span>
        <span className="font-pixel text-[8px] text-green-400">{caught.length}</span>
        <div className="flex gap-0.5 ml-1">
          {caught.slice(-5).map((p, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-red-500 border border-gray-900" title={p.name} style={{ fontSize: '4px' }} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
