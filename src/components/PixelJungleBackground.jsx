import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TREES = [
  { x: 2, y: 10, scale: 1.2 },
  { x: 12, y: 5, scale: 1.4 },
  { x: 80, y: 8, scale: 1.3 },
  { x: 92, y: 12, scale: 1.1 },
  { x: 35, y: 3, scale: 0.9 },
  { x: 60, y: 6, scale: 1.0 },
];

const BUSHES = [
  { x: 5, y: 80 },
  { x: 15, y: 85 },
  { x: 25, y: 82 },
  { x: 70, y: 78 },
  { x: 82, y: 84 },
  { x: 90, y: 80 },
  { x: 55, y: 88 },
  { x: 40, y: 86 },
];

const GRASS_PATCHES = Array.from({ length: 30 }, (_, i) => ({
  x: Math.random() * 100,
  y: 65 + Math.random() * 35,
  delay: Math.random() * 3,
}));

const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 60,
  size: 2 + Math.random() * 4,
  duration: 3 + Math.random() * 4,
  delay: Math.random() * 5,
}));

const POKEMON_SPRITES = [
  { name: 'Bulbasaur', x: 6, y: 72, emoji: '🌿', hidden: false, bobDelay: 0 },
  { name: 'Caterpie', x: 88, y: 82, emoji: '🐛', hidden: false, bobDelay: 1 },
  { name: 'Pikachu', x: 92, y: 55, emoji: '⚡', hidden: false, bobDelay: 0.5 },
  { name: 'Butterfree', x: 78, y: 18, emoji: '🦋', hidden: false, bobDelay: 1.5 },
  { name: 'Pidgey', x: 18, y: 14, emoji: '🐦', hidden: false, bobDelay: 2 },
  { name: 'Oddish', x: 8, y: 88, emoji: '🌱', hidden: true, bobDelay: 0.8 },
  { name: 'Jigglypuff', x: 94, y: 38, emoji: '🎀', hidden: true, bobDelay: 1.2 },
  { name: 'Bellsprout', x: 3, y: 50, emoji: '🌻', hidden: true, bobDelay: 2.5 },
];

export default function PixelJungleBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0a0e1a 0%, #0f1b2d 30%, #132a1a 60%, #0a1f0a 100%)',
        }}
      />

      {/* Stars */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 40}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

      {/* Moon */}
      <div
        className="absolute rounded-full"
        style={{
          top: '8%',
          right: '15%',
          width: '60px',
          height: '60px',
          background: 'radial-gradient(circle, #fffde6 0%, #f5f0c0 50%, transparent 70%)',
          boxShadow: '0 0 40px rgba(255, 253, 200, 0.3)',
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />

      {/* Trees (parallax layer - back) */}
      {TREES.map((tree, i) => (
        <div
          key={`tree-${i}`}
          className="absolute"
          style={{
            left: `${tree.x}%`,
            top: `${tree.y}%`,
            transform: `scale(${tree.scale}) translateY(${scrollY * 0.02}px)`,
          }}
        >
          {/* Trunk */}
          <div className="mx-auto" style={{ width: '8px', height: '60px', background: '#3d2b1f', imageRendering: 'pixelated' }} />
          {/* Canopy */}
          <div
            style={{
              width: '50px',
              height: '50px',
              background: '#1a5c1a',
              borderRadius: '50% 50% 10% 10%',
              marginTop: '-15px',
              marginLeft: '-21px',
              boxShadow: 'inset -5px -5px 0 #0f3d0f, inset 5px 5px 0 #2d7a2d',
              imageRendering: 'pixelated',
            }}
          />
        </div>
      ))}

      {/* Bushes */}
      {BUSHES.map((bush, i) => (
        <motion.div
          key={`bush-${i}`}
          className="absolute"
          style={{
            left: `${bush.x}%`,
            top: `${bush.y}%`,
            width: '40px',
            height: '24px',
            background: '#1f6b1f',
            borderRadius: '50%',
            boxShadow: 'inset -3px -3px 0 #145214, inset 3px 3px 0 #2d8a2d',
            imageRendering: 'pixelated',
          }}
          animate={{ scaleX: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      {/* Tall Grass */}
      {GRASS_PATCHES.map((grass, i) => (
        <motion.div
          key={`grass-${i}`}
          className="absolute"
          style={{
            left: `${grass.x}%`,
            top: `${grass.y}%`,
            width: '12px',
            height: '20px',
            imageRendering: 'pixelated',
          }}
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 2, repeat: Infinity, delay: grass.delay }}
        >
          <div style={{ width: '3px', height: '18px', background: '#2d8a2d', margin: '0 auto', borderRadius: '2px 2px 0 0', transform: 'rotate(-5deg)' }} />
          <div style={{ width: '3px', height: '15px', background: '#3da63d', position: 'absolute', top: '3px', left: '6px', borderRadius: '2px 2px 0 0', transform: 'rotate(5deg)' }} />
          <div style={{ width: '3px', height: '12px', background: '#1f6b1f', position: 'absolute', top: '5px', left: '2px', borderRadius: '2px 2px 0 0' }} />
        </motion.div>
      ))}

      {/* Floating particles (fireflies/spores) */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: 'radial-gradient(circle, #7fff7f, transparent)',
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.7, 0],
            x: [0, 5, -5, 0],
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
        />
      ))}

      {/* Pokémon in the jungle */}
      {POKEMON_SPRITES.map((pkmn, i) => (
        <motion.div
          key={`pkmn-${i}`}
          className="absolute select-none"
          style={{
            left: `${pkmn.x}%`,
            top: `${pkmn.y}%`,
            fontSize: '24px',
            opacity: pkmn.hidden ? 0.4 : 0.8,
            filter: pkmn.hidden ? 'brightness(0.5)' : 'none',
            imageRendering: 'pixelated',
          }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: pkmn.bobDelay }}
          title={pkmn.name}
        >
          {pkmn.emoji}
        </motion.div>
      ))}

      {/* Ground layer */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '15%',
          background: 'linear-gradient(180deg, #0f3d0f 0%, #0a2d0a 50%, #061f06 100%)',
          borderTop: '3px solid #2d8a2d',
          imageRendering: 'pixelated',
        }}
      />

      {/* Vines from top */}
      <div className="absolute top-0 left-[10%] w-1 h-32 bg-green-800 rounded-b-full opacity-60" />
      <div className="absolute top-0 left-[25%] w-1 h-20 bg-green-700 rounded-b-full opacity-50" />
      <div className="absolute top-0 right-[12%] w-1 h-28 bg-green-800 rounded-b-full opacity-55" />
      <div className="absolute top-0 right-[30%] w-1 h-16 bg-green-700 rounded-b-full opacity-45" />
    </div>
  );
}
