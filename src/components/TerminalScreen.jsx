import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { executeCommand } from '../data/commands';
import { startGuessGame, handleGuessInput, isGuessGameActive } from '../games/guessGame';
import { startCatchGame, handleCatchInput, isCatchGameActive } from '../games/catchGame';
import {
  playTypeSound, playEnterSound, playBootSound,
  playThrowSound, playShakeSound, playCatchSuccess, playCatchFail,
  playCorrectGuess, playWrongGuess,
} from '../utils/audio';

const BOOT_MESSAGES = [
  '> POKÉDEX OS v2.0 booting...',
  '> Initializing trainer database......... OK',
  '> Loading Pokédex entries............... OK',
  '> Connecting to Professor Oak\'s lab..... OK',
  '> Scanning nearby Pokémon............... OK',
  '',
  '════════════════════════════════════════',
  '  Trainer profile loaded:',
  '  ATHARVA SINDWANI',
  '  Level: Junior | Region: UIUC',
  '════════════════════════════════════════',
  '',
  '  Type -help to view commands.',
  '',
];

export default function TerminalScreen({ onMusicToggle, onCatch, onCatchStart, onThrow }) {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [booted, setBooted] = useState(false);
  const [bootIndex, setBootIndex] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bootIndex < BOOT_MESSAGES.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, BOOT_MESSAGES[bootIndex]]);
        setBootIndex(prev => prev + 1);
      }, 200 + Math.random() * 150);
      return () => clearTimeout(timer);
    } else {
      setBooted(true);
      playBootSound();
    }
  }, [bootIndex]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const processInput = (cmd) => {
    if (isGuessGameActive()) {
      const result = handleGuessInput(cmd);
      if (result) {
        setLines(prev => [...prev, ...result]);
        const joined = result.join(' ');
        if (joined.includes('CORRECT')) playCorrectGuess();
        else if (joined.includes('not correct')) playWrongGuess();
      }
      return;
    }

    if (isCatchGameActive()) {
      const result = handleCatchInput(cmd);
      if (result) {
        if (cmd.toLowerCase() === 'throw') {
          playThrowSound();
          if (onThrow) onThrow(!!result.caught);
          setTimeout(() => playShakeSound(), 400);
          setTimeout(() => playShakeSound(), 800);
          setTimeout(() => {
            if (result.caught) playCatchSuccess();
            else playCatchFail();
          }, 1200);
        }
        setLines(prev => [...prev, ...result.lines]);
        if (result.caught && onCatch) {
          onCatch(result.caught);
        }
      }
      return;
    }

    if (cmd.toLowerCase() === '-catch') {
      const result = startCatchGame();
      setLines(prev => [...prev, ...result]);
      const pokeName = result.find(l => l.includes('wild'))?.match(/wild (.+?)!/i)?.[1];
      if (pokeName && onCatchStart) onCatchStart(pokeName);
      return;
    }

    if (cmd.toLowerCase() === '-guess') {
      const result = startGuessGame();
      setLines(prev => [...prev, ...result]);
      return;
    }

    const result = executeCommand(cmd);

    if (result.clear) {
      setLines([]);
      return;
    }

    if (result.music) {
      setLines(prev => [...prev, ...result.lines]);
      if (onMusicToggle) onMusicToggle();
      return;
    }

    if (result.caught) {
      setLines(prev => [...prev, '', '  Your caught Pokémon collection:', '']);
      return;
    }

    setLines(prev => [...prev, ...result]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    playEnterSound();
    const cmd = input.trim();
    setLines(prev => [...prev, `> ${cmd}`]);
    setInput('');
    processInput(cmd);
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <div
      className="relative flex flex-col h-full rounded-md overflow-hidden cursor-text"
      onClick={focusInput}
      style={{
        background: '#0a1628',
        boxShadow: 'inset 0 0 60px rgba(74, 222, 128, 0.08), 0 0 15px rgba(74, 222, 128, 0.1)',
      }}
    >
      {/* Scanlines overlay */}
      <div className="scanlines rounded-md" />

      {/* Screen content */}
      <div className="flex-1 overflow-y-auto p-3 font-readable text-[11px] sm:text-xs leading-relaxed relative z-0 screen-flicker">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="terminal-text whitespace-pre-wrap break-words min-h-[1.4em]"
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
          >
            {line}
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      {booted && (
        <form onSubmit={handleSubmit} className="flex items-center px-3 pb-3 relative z-0">
          <span className="terminal-text font-readable text-[11px] sm:text-xs mr-2">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); playTypeSound(); }}
            className="flex-1 bg-transparent border-none outline-none terminal-text font-readable text-[11px] sm:text-xs caret-green-400"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            placeholder="enter command..."
          />
          <span className="cursor-blink terminal-text text-sm">█</span>
        </form>
      )}
    </div>
  );
}
