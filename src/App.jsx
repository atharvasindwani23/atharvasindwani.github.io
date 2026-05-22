import { useState } from 'react';
import PixelJungleBackground from './components/PixelJungleBackground';
import PokedexShell from './components/PokedexShell';
import CatchOverlay from './components/CatchOverlay';

export default function App() {
  const [catchState, setCatchState] = useState({ active: false, pokemonName: null, result: null });

  const triggerCatchVisual = (pokemonName) => {
    setCatchState({ active: true, pokemonName, result: null });
  };

  const triggerThrowVisual = (success) => {
    setCatchState(prev => ({ ...prev, result: 'pending' }));
    setTimeout(() => {
      setCatchState(prev => ({ ...prev, result: success ? 'caught' : 'failed' }));
      setTimeout(() => {
        setCatchState({ active: false, pokemonName: null, result: null });
      }, 1500);
    }, 2000);
  };

  return (
    <>
      <PixelJungleBackground />
      <PokedexShell
        onCatchStart={triggerCatchVisual}
        onThrow={triggerThrowVisual}
      />
      <CatchOverlay
        active={catchState.active}
        pokemonName={catchState.pokemonName}
        result={catchState.result}
      />
    </>
  );
}
