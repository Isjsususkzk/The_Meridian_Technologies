import { useState, useEffect, useCallback } from 'react';
import CorporateSite from './components/CorporateSite';
import SecretTerminal from './components/SecretTerminal';
import HiddenNarrative from './components/HiddenNarrative';
import CipherDecoder from './components/CipherDecoder';
import GlitchOverlay from './components/GlitchOverlay';

// Console secrets - for those who open DevTools
console.log('%c⚠️ WARNING ⚠️', 'color: red; font-size: 30px; font-weight: bold;');
console.log('%cYou shouldn\'t be here.', 'color: red; font-size: 16px;');
console.log('%cBut since you are... the first key is: ECHO', 'color: yellow; font-size: 14px;');
console.log('%cType "protocol7" in the hidden terminal to proceed.', 'color: gray; font-size: 12px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: darkgray;');
console.log('%c📡 Signal intercepted. Frequency: 7.83 Hz', 'color: cyan; font-size: 12px;');
console.log('%c📡 Subject count: 1,247', 'color: cyan; font-size: 12px;');
console.log('%c📡 Status: COMPROMISED', 'color: cyan; font-size: 12px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: darkgray;');

type Page = 'corporate' | 'terminal' | 'narrative' | 'cipher' | 'final';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('corporate');
  const [discoveredClues, setDiscoveredClues] = useState<string[]>([]);
  const [showGlitch, setShowGlitch] = useState(false);
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [konamiActive, setKonamiActive] = useState(false);
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  const addClue = useCallback((clue: string) => {
    setDiscoveredClues(prev => {
      if (prev.includes(clue)) return prev;
      setShowGlitch(true);
      setTimeout(() => setShowGlitch(false), 1500);
      return [...prev, clue];
    });
  }, []);

  // Konami code listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...konamiSequence, e.key].slice(-10);
      setKonamiSequence(newSequence);
      
      if (newSequence.length === 10 && newSequence.every((key, i) => key === konamiCode[i])) {
        setKonamiActive(true);
        addClue('konami');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiSequence, addClue]);

  // Secret URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('p') === 'echo') {
      setCurrentPage('terminal');
      addClue('url_echo');
    }
    if (params.get('access') === 'protocol7') {
      setCurrentPage('narrative');
      addClue('url_protocol7');
    }
    if (params.get('cipher') === 'true') {
      setCurrentPage('cipher');
      addClue('url_cipher');
    }
  }, [addClue]);

  const handleLogoClick = () => {
    setEasterEggClicks(prev => {
      const next = prev + 1;
      if (next >= 7) {
        setCurrentPage('terminal');
        addClue('logo_secret');
        return 0;
      }
      return next;
    });
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {showGlitch && <GlitchOverlay />}
      
      {currentPage === 'corporate' && (
        <CorporateSite 
          onLogoClick={handleLogoClick}
          onNavigate={navigateTo}
          discoveredClues={discoveredClues}
          addClue={addClue}
        />
      )}
      
      {currentPage === 'terminal' && (
        <SecretTerminal 
          onNavigate={navigateTo}
          discoveredClues={discoveredClues}
          addClue={addClue}
        />
      )}
      
      {currentPage === 'narrative' && (
        <HiddenNarrative 
          onNavigate={navigateTo}
          discoveredClues={discoveredClues}
          addClue={addClue}
        />
      )}
      
      {currentPage === 'cipher' && (
        <CipherDecoder 
          onNavigate={navigateTo}
          discoveredClues={discoveredClues}
          addClue={addClue}
        />
      )}

      {konamiActive && (
        <div className="fixed top-4 right-4 bg-black/90 border border-green-500 text-green-400 p-4 font-mono text-sm z-50 animate-pulse">
          🎮 KONAMI CODE ACTIVATED<br/>
          <span className="text-xs text-green-600">Clue discovered: "The frequency is the key"</span>
          <button 
            onClick={() => setKonamiActive(false)}
            className="mt-2 text-xs underline text-green-300"
          >
            dismiss
          </button>
        </div>
      )}

      {/* Hidden clue counter */}
      {discoveredClues.length > 0 && (
        <div className="fixed bottom-4 left-4 bg-black/80 border border-red-900 text-red-400 px-3 py-1 font-mono text-xs z-40">
          🔍 Clues: {discoveredClues.length}/8
        </div>
      )}
    </div>
  );
}

export default App;
