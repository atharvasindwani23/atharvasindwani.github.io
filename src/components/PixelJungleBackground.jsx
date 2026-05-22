import { motion } from 'framer-motion';

export default function PixelJungleBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none pixel-render" style={{ zIndex: 0 }}>
      {/* Sky */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #68c8f0 0%, #88d8ff 30%, #a8e8ff 55%, #d0f4ff 80%, #e8fcff 100%)' }} />

      {/* Clouds */}
      <CloudLayer />

      {/* Large flying Pokémon */}
      <PidgeotFlyer />
      <DragoniteFlyer />

      {/* Distant mountains */}
      <MountainLayer />

      {/* Tree line */}
      <TreeLine />

      {/* Grass field with path */}
      <GrassField />

      {/* Cyclist on the road */}
      <Cyclist />

      {/* Pikachu running */}
      <PikachuRunning />

      {/* Charmander running */}
      <CharmanderRunning />

      {/* Foreground grass */}
      <ForegroundGrass />
    </div>
  );
}

function CloudLayer() {
  return (
    <div className="absolute inset-0">
      <motion.svg
        className="absolute pixel-render"
        style={{ top: '6%', left: '5%' }}
        width="180" height="60" viewBox="0 0 180 60"
        animate={{ x: [0, 40, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="40" y="10" width="100" height="10" fill="#ffffff" />
        <rect x="30" y="20" width="120" height="10" fill="#ffffff" />
        <rect x="20" y="30" width="140" height="10" fill="#ffffff" />
        <rect x="35" y="40" width="110" height="10" fill="#f0f8ff" />
        <rect x="50" y="50" width="80" height="6" fill="#e8f4ff" />
      </motion.svg>

      <motion.svg
        className="absolute pixel-render"
        style={{ top: '14%', right: '8%' }}
        width="130" height="45" viewBox="0 0 130 45"
        animate={{ x: [0, -30, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="30" y="5" width="70" height="8" fill="#ffffff" />
        <rect x="20" y="13" width="90" height="8" fill="#ffffff" />
        <rect x="10" y="21" width="110" height="8" fill="#ffffff" />
        <rect x="25" y="29" width="80" height="8" fill="#f0f8ff" />
        <rect x="40" y="37" width="50" height="6" fill="#e8f4ff" />
      </motion.svg>

      <motion.svg
        className="absolute pixel-render"
        style={{ top: '20%', left: '42%' }}
        width="90" height="32" viewBox="0 0 90 32"
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 45, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="20" y="4" width="50" height="6" fill="#ffffff" />
        <rect x="10" y="10" width="70" height="8" fill="#ffffff" />
        <rect x="15" y="18" width="60" height="6" fill="#f0f8ff" />
        <rect x="25" y="24" width="40" height="5" fill="#e8f4ff" />
      </motion.svg>
    </div>
  );
}

function PidgeotFlyer() {
  return (
    <motion.div
      className="absolute"
      style={{ top: '5%', left: '8%' }}
      animate={{
        y: [0, -10, 5, -8, 0],
        x: [0, 20, 10, 18, 0],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    >
      <img
        src="/assets/sprites/pidgeot.gif"
        alt="Pidgeot"
        className="pixel-render sprite-no-bg"
        style={{ width: '160px', height: '160px', objectFit: 'contain' }}
      />
    </motion.div>
  );
}

function DragoniteFlyer() {
  return (
    <motion.div
      className="absolute"
      style={{ top: '6%', right: '6%' }}
      animate={{
        y: [0, -12, 6, -10, 0],
        x: [0, -15, -5, -12, 0],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    >
      <img
        src="/assets/sprites/dragonite.gif"
        alt="Dragonite"
        className="pixel-render sprite-no-bg"
        style={{
          width: '160px',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </motion.div>
  );
}

function MountainLayer() {
  return (
    <div className="absolute bottom-[28%] left-0 right-0 h-[20%]">
      <svg className="absolute bottom-0 w-full h-full pixel-render" viewBox="0 0 800 160" preserveAspectRatio="none">
        <polygon points="0,160 100,40 200,160" fill="#88b880" />
        <polygon points="150,160 280,20 410,160" fill="#78a870" />
        <polygon points="350,160 480,35 610,160" fill="#88b880" />
        <polygon points="520,160 660,25 800,160" fill="#78a870" />
        <polygon points="270,20 280,20 295,45 265,45" fill="#e8f8e0" />
        <polygon points="650,25 660,25 678,50 642,50" fill="#e8f8e0" />
      </svg>
    </div>
  );
}

function TreeLine() {
  return (
    <div className="absolute bottom-[18%] left-0 right-0 h-[14%]">
      <motion.div
        className="relative w-full h-full"
        animate={{ x: [0, -2, 0, 2, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg className="w-full h-full pixel-render" viewBox="0 0 960 120" preserveAspectRatio="none">
          {Array.from({ length: 20 }).map((_, i) => {
            const x = i * 48 + (i % 2 === 0 ? 10 : 0);
            return (
              <g key={`b-${i}`}>
                <rect x={x + 20} y={90} width="8" height="30" fill="#3d5a20" />
                <polygon points={`${x + 24},${20 + (i % 3) * 10} ${x + 4},${90} ${x + 44},${90}`} fill="#2d6b2d" />
              </g>
            );
          })}
          {Array.from({ length: 16 }).map((_, i) => {
            const x = i * 60 + 15;
            const h = 55 + (i % 3) * 12;
            return (
              <g key={`f-${i}`}>
                <rect x={x + 22} y={95} width="6" height="25" fill="#5c3a1a" />
                <polygon points={`${x + 25},${120 - h} ${x + 6},${95} ${x + 44},${95}`} fill="#3da63d" />
                <polygon points={`${x + 25},${120 - h + 15} ${x + 10},${92} ${x + 40},${92}`} fill="#4db84d" />
              </g>
            );
          })}
          <rect x="0" y="110" width="960" height="10" fill="#2d5a1a" />
        </svg>
      </motion.div>
    </div>
  );
}

function GrassField() {
  return (
    <div className="absolute bottom-[5%] left-0 right-0 h-[16%]">
      <svg className="w-full h-full pixel-render" viewBox="0 0 960 120" preserveAspectRatio="none">
        <rect x="0" y="0" width="960" height="120" fill="#4db84d" />
        <rect x="0" y="0" width="960" height="6" fill="#3da63d" />
        <rect x="80" y="20" width="100" height="25" fill="#5dc85d" opacity="0.3" rx="3" />
        <rect x="350" y="40" width="120" height="20" fill="#5dc85d" opacity="0.3" rx="3" />
        <rect x="650" y="25" width="90" height="30" fill="#5dc85d" opacity="0.3" rx="3" />
        {/* Road/path */}
        <rect x="0" y="55" width="960" height="18" fill="#c8a060" />
        <rect x="0" y="57" width="960" height="4" fill="#d8b870" />
        <rect x="0" y="70" width="960" height="3" fill="#b89050" />
        {/* Dashed center line */}
        {Array.from({ length: 20 }).map((_, i) => (
          <rect key={i} x={i * 50 + 10} y={63} width="25" height="3" fill="#e8d090" opacity="0.5" />
        ))}
      </svg>
    </div>
  );
}

function Cyclist() {
  return (
    <motion.div
      className="absolute"
      style={{ bottom: '12%', left: '50%', transform: 'translateX(-50%)' }}
      animate={{ x: [-300, 300] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
    >
      <svg width="52" height="48" viewBox="0 0 52 48" className="pixel-render">
        {/* Back wheel */}
        <circle cx="12" cy="38" r="8" fill="none" stroke="#404040" strokeWidth="2.5" />
        <circle cx="12" cy="38" r="2" fill="#606060" />
        {/* Front wheel */}
        <circle cx="40" cy="38" r="8" fill="none" stroke="#404040" strokeWidth="2.5" />
        <circle cx="40" cy="38" r="2" fill="#606060" />
        {/* Frame */}
        <line x1="12" y1="38" x2="26" y2="26" stroke="#e04040" strokeWidth="3" />
        <line x1="40" y1="38" x2="26" y2="26" stroke="#e04040" strokeWidth="3" />
        <line x1="26" y1="26" x2="26" y2="18" stroke="#e04040" strokeWidth="2.5" />
        <line x1="40" y1="38" x2="36" y2="28" stroke="#e04040" strokeWidth="2" />
        {/* Handlebars */}
        <rect x="32" y="24" width="10" height="2.5" fill="#808080" rx="1" />
        {/* Pedals — animated */}
        <motion.g
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '20px 38px' }}
        >
          <rect x="16" y="36" width="8" height="3" fill="#606060" rx="1" />
        </motion.g>
        {/* Rider body */}
        <rect x="22" y="12" width="10" height="12" fill="#30a030" />
        {/* Backpack */}
        <rect x="19" y="14" width="4" height="8" fill="#e04040" rx="1" />
        {/* Arms reaching to handlebars */}
        <rect x="30" y="16" width="8" height="3" fill="#f0c8a0" />
        {/* Head */}
        <rect x="23" y="4" width="10" height="9" fill="#f0c8a0" />
        {/* Hair */}
        <rect x="22" y="2" width="12" height="5" fill="#30a030" />
        {/* Hat */}
        <rect x="21" y="0" width="14" height="4" fill="#ffffff" rx="1" />
        <rect x="32" y="2" width="5" height="2" fill="#ffffff" />
        {/* Eyes */}
        <rect x="25" y="7" width="2" height="2" fill="#1a1a1a" />
        <rect x="29" y="7" width="2" height="2" fill="#1a1a1a" />
        {/* Legs — animated pedaling */}
        <motion.g
          animate={{ rotate: [-15, 15, -15] }}
          transition={{ duration: 0.3, repeat: Infinity }}
          style={{ transformOrigin: '24px 24px' }}
        >
          <rect x="22" y="24" width="4" height="10" fill="#2040a0" />
          <rect x="21" y="32" width="5" height="3" fill="#e04040" rx="1" />
        </motion.g>
        <motion.g
          animate={{ rotate: [15, -15, 15] }}
          transition={{ duration: 0.3, repeat: Infinity }}
          style={{ transformOrigin: '30px 24px' }}
        >
          <rect x="28" y="24" width="4" height="10" fill="#2040a0" />
          <rect x="27" y="32" width="5" height="3" fill="#e04040" rx="1" />
        </motion.g>
        {/* Wheel spokes hint */}
        <motion.g
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '12px 38px' }}
        >
          <line x1="12" y1="31" x2="12" y2="45" stroke="#808080" strokeWidth="1" />
          <line x1="5" y1="38" x2="19" y2="38" stroke="#808080" strokeWidth="1" />
        </motion.g>
        <motion.g
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '40px 38px' }}
        >
          <line x1="40" y1="31" x2="40" y2="45" stroke="#808080" strokeWidth="1" />
          <line x1="33" y1="38" x2="47" y2="38" stroke="#808080" strokeWidth="1" />
        </motion.g>
      </svg>
    </motion.div>
  );
}

function PikachuRunning() {
  return (
    <motion.div
      className="absolute"
      style={{ bottom: '8%', left: '10%' }}
      animate={{ x: [0, 6, 0, -4, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="40" height="40" viewBox="0 0 44 44" className="pixel-render">
        {/* Body */}
        <ellipse cx="22" cy="26" rx="10" ry="9" fill="#f8d030" />
        <ellipse cx="22" cy="24" rx="8" ry="7" fill="#ffe040" />
        {/* Head */}
        <ellipse cx="22" cy="14" rx="9" ry="8" fill="#f8d030" />
        <ellipse cx="22" cy="13" rx="7" ry="6" fill="#ffe040" />
        {/* Ears */}
        <rect x="12" y="2" width="4" height="10" fill="#f8d030" rx="1" />
        <rect x="12" y="0" width="4" height="4" fill="#1a1a1a" />
        <rect x="28" y="2" width="4" height="10" fill="#f8d030" rx="1" />
        <rect x="28" y="0" width="4" height="4" fill="#1a1a1a" />
        {/* Cheeks */}
        <circle cx="15" cy="16" r="3" fill="#e04040" />
        <circle cx="29" cy="16" r="3" fill="#e04040" />
        {/* Eyes */}
        <rect x="18" y="11" width="3" height="4" fill="#1a1a1a" rx="1" />
        <rect x="24" y="11" width="3" height="4" fill="#1a1a1a" rx="1" />
        <rect x="19" y="12" width="1" height="1" fill="#ffffff" />
        <rect x="25" y="12" width="1" height="1" fill="#ffffff" />
        {/* Back stripes */}
        <rect x="18" y="22" width="3" height="4" fill="#a07000" />
        <rect x="23" y="22" width="3" height="4" fill="#a07000" />
        {/* Tail */}
        <motion.g
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 0.4, repeat: Infinity }}
          style={{ transformOrigin: '32px 20px' }}
        >
          <rect x="32" y="12" width="4" height="10" fill="#f8d030" />
          <rect x="34" y="8" width="6" height="8" fill="#f8d030" />
          <rect x="36" y="6" width="6" height="6" fill="#f8d030" />
        </motion.g>
        {/* Running legs */}
        <motion.g
          animate={{ rotate: [-15, 15, -15] }}
          transition={{ duration: 0.2, repeat: Infinity }}
          style={{ transformOrigin: '18px 34px' }}
        >
          <rect x="15" y="33" width="4" height="7" fill="#f8d030" />
          <rect x="14" y="38" width="5" height="3" fill="#c8a020" />
        </motion.g>
        <motion.g
          animate={{ rotate: [15, -15, 15] }}
          transition={{ duration: 0.2, repeat: Infinity }}
          style={{ transformOrigin: '26px 34px' }}
        >
          <rect x="24" y="33" width="4" height="7" fill="#f8d030" />
          <rect x="23" y="38" width="5" height="3" fill="#c8a020" />
        </motion.g>
        {/* Speed lines */}
        <motion.g animate={{ opacity: [0, 0.6, 0] }} transition={{ duration: 0.3, repeat: Infinity }}>
          <rect x="2" y="22" width="6" height="2" fill="#ffffff" opacity="0.5" />
          <rect x="4" y="26" width="5" height="2" fill="#ffffff" opacity="0.4" />
        </motion.g>
      </svg>
    </motion.div>
  );
}

function CharmanderRunning() {
  return (
    <motion.div
      className="absolute"
      style={{ bottom: '7%', right: '12%' }}
      animate={{ x: [0, -5, 0, 4, 0] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="36" height="40" viewBox="0 0 40 44" className="pixel-render">
        {/* Body */}
        <ellipse cx="20" cy="26" rx="9" ry="10" fill="#f08030" />
        <ellipse cx="20" cy="24" rx="7" ry="8" fill="#f89850" />
        {/* Head */}
        <ellipse cx="20" cy="12" rx="8" ry="7" fill="#f08030" />
        <ellipse cx="20" cy="11" rx="6" ry="5" fill="#f89850" />
        {/* Eyes */}
        <rect x="16" y="10" width="3" height="4" fill="#1a1a1a" rx="1" />
        <rect x="22" y="10" width="3" height="4" fill="#1a1a1a" rx="1" />
        <rect x="17" y="11" width="1" height="1" fill="#40a0e0" />
        <rect x="23" y="11" width="1" height="1" fill="#40a0e0" />
        {/* Belly */}
        <ellipse cx="20" cy="28" rx="5" ry="6" fill="#ffe8a0" />
        {/* Arms */}
        <rect x="10" y="22" width="4" height="6" fill="#f08030" />
        <rect x="26" y="22" width="4" height="6" fill="#f08030" />
        {/* Claws */}
        <rect x="9" y="27" width="2" height="2" fill="#ffffff" />
        <rect x="11" y="27" width="2" height="2" fill="#ffffff" />
        <rect x="27" y="27" width="2" height="2" fill="#ffffff" />
        <rect x="29" y="27" width="2" height="2" fill="#ffffff" />
        {/* Running legs */}
        <motion.g
          animate={{ rotate: [-20, 20, -20] }}
          transition={{ duration: 0.25, repeat: Infinity }}
          style={{ transformOrigin: '16px 35px' }}
        >
          <rect x="14" y="34" width="4" height="7" fill="#f08030" />
          <rect x="13" y="39" width="5" height="3" fill="#d06020" />
        </motion.g>
        <motion.g
          animate={{ rotate: [20, -20, 20] }}
          transition={{ duration: 0.25, repeat: Infinity }}
          style={{ transformOrigin: '24px 35px' }}
        >
          <rect x="22" y="34" width="4" height="7" fill="#f08030" />
          <rect x="21" y="39" width="5" height="3" fill="#d06020" />
        </motion.g>
        {/* Tail with flame */}
        <rect x="28" y="18" width="4" height="8" fill="#f08030" rx="1" />
        <rect x="30" y="14" width="4" height="6" fill="#f08030" rx="1" />
        <motion.g
          animate={{ scale: [1, 1.2, 0.9, 1.1, 1], y: [0, -2, 1, -1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <ellipse cx="33" cy="12" rx="4" ry="5" fill="#f8c030" />
          <ellipse cx="33" cy="10" rx="3" ry="4" fill="#f86030" />
          <ellipse cx="33" cy="9" rx="2" ry="3" fill="#ffe060" />
        </motion.g>
        {/* Speed lines */}
        <motion.g animate={{ opacity: [0, 0.5, 0] }} transition={{ duration: 0.35, repeat: Infinity }}>
          <rect x="32" y="24" width="5" height="2" fill="#ffffff" opacity="0.4" />
          <rect x="34" y="28" width="4" height="2" fill="#ffffff" opacity="0.3" />
        </motion.g>
      </svg>
    </motion.div>
  );
}

function ForegroundGrass() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[7%]">
      <motion.svg
        className="w-full h-full pixel-render"
        viewBox="0 0 960 50"
        preserveAspectRatio="none"
        animate={{ x: [0, -3, 0, 3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="0" y="15" width="960" height="35" fill="#3d9030" />
        <rect x="0" y="15" width="960" height="3" fill="#4db040" />
        {Array.from({ length: 35 }).map((_, i) => {
          const x = i * 28 + (i % 2 === 0 ? 4 : 12);
          return (
            <g key={i}>
              <rect x={x} y={6} width="3" height="14" fill="#2d8020" />
              <rect x={x + 5} y={3} width="3" height="16" fill="#3da030" />
              <rect x={x + 9} y={8} width="3" height="12" fill="#2d8020" />
            </g>
          );
        })}
      </motion.svg>
    </div>
  );
}
