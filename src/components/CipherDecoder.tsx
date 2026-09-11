import { useState } from 'react';

interface Props {
  onNavigate: (page: 'corporate' | 'terminal' | 'narrative' | 'cipher' | 'final') => void;
  discoveredClues: string[];
  addClue: (clue: string) => void;
}

export default function CipherDecoder({ onNavigate, addClue }: Props) {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [method, setMethod] = useState<'base64' | 'caesar' | 'binary' | 'reverse' | 'atbash'>('base64');
  const [caesarShift, setCaesarShift] = useState(3);
  const [mode, setMode] = useState<'encode' | 'decode'>('decode');
  const [secretMessage, setSecretMessage] = useState('');
  const [showSecret, setShowSecret] = useState(false);

  const encodedMessages = [
    { encoded: 'Rk9VTkQgVEhFIEZJUlNUIENMVUU=', decoded: 'FOUND THE FIRST CLUE', method: 'base64' },
    { encoded: 'WKH#TXLFN#EURZQ#IR[#MXPSV', decoded: 'THE QUICK BROWN FOX JUMPS', method: 'caesar', shift: 3 },
    { encoded: 'GSRH RH Z GVHG NVHHZTV', decoded: 'THIS IS A TEST MESSAGE', method: 'atbash' },
  ];

  const processText = (text: string, meth: string, dir: 'encode' | 'decode', shift: number) => {
    try {
      switch (meth) {
        case 'base64':
          if (dir === 'decode') {
            return atob(text);
          } else {
            return btoa(text);
          }
        case 'caesar':
          return text.split('').map(char => {
            if (char.match(/[a-z]/)) {
              const base = dir === 'decode' ? -shift : shift;
              return String.fromCharCode(((char.charCodeAt(0) - 97 + base + 26) % 26) + 97);
            }
            if (char.match(/[A-Z]/)) {
              const base = dir === 'decode' ? -shift : shift;
              return String.fromCharCode(((char.charCodeAt(0) - 65 + base + 26) % 26) + 65);
            }
            return char;
          }).join('');
        case 'binary':
          if (dir === 'decode') {
            return text.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
          } else {
            return text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
          }
        case 'reverse':
          return text.split('').reverse().join('');
        case 'atbash':
          return text.split('').map(char => {
            if (char.match(/[a-z]/)) {
              return String.fromCharCode(122 - (char.charCodeAt(0) - 97));
            }
            if (char.match(/[A-Z]/)) {
              return String.fromCharCode(90 - (char.charCodeAt(0) - 65));
            }
            return char;
          }).join('');
        default:
          return text;
      }
    } catch {
      return '[DECODE ERROR - Invalid input]';
    }
  };

  const handleDecode = () => {
    const result = processText(inputText, method, mode, caesarShift);
    setOutputText(result);
    
    // Check for secret messages
    if (result.toUpperCase().includes('ECHO') || result.toUpperCase().includes('7.83') || result.toUpperCase().includes('SCHUMANN')) {
      setSecretMessage('🔓 SECRET MESSAGE DETECTED! You\'ve decoded a fragment of Project Echo.');
      setShowSecret(true);
      addClue('cipher_decode');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="border border-purple-900/50 bg-purple-950/20 rounded-lg p-6 mb-8">
          <h1 className="text-purple-400 font-mono text-2xl font-bold">
            ◈ CIPHER DECODER ◈
          </h1>
          <p className="text-purple-300/60 text-sm font-mono mt-2">
            Meridian Technologies - Cryptographic Analysis Tool v2.1
          </p>
          <p className="text-purple-300/40 text-xs font-mono mt-1">
            "Every signal has a source. Every code has a key."
          </p>
        </div>

        {/* Controls */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-mono text-gray-400 mb-3">CIPHER METHOD</h3>
            <div className="grid grid-cols-2 gap-2">
              {(['base64', 'caesar', 'binary', 'reverse', 'atbash'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`px-3 py-2 text-xs font-mono rounded border transition-all ${
                    method === m
                      ? 'bg-purple-900/50 border-purple-500 text-purple-300'
                      : 'bg-gray-800 border-gray-700 text-gray-500 hover:border-purple-800'
                  }`}
                >
                  {m.toUpperCase()}
                </button>
              ))}
            </div>
            {method === 'caesar' && (
              <div className="mt-3">
                <label className="text-xs text-gray-500 font-mono">Shift: </label>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={caesarShift}
                  onChange={(e) => setCaesarShift(parseInt(e.target.value))}
                  className="w-32"
                />
                <span className="text-purple-400 font-mono text-sm ml-2">{caesarShift}</span>
              </div>
            )}
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-mono text-gray-400 mb-3">MODE</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setMode('decode')}
                className={`flex-1 px-4 py-2 text-sm font-mono rounded border transition-all ${
                  mode === 'decode'
                    ? 'bg-green-900/50 border-green-500 text-green-300'
                    : 'bg-gray-800 border-gray-700 text-gray-500'
                }`}
              >
                🔓 DECODE
              </button>
              <button
                onClick={() => setMode('encode')}
                className={`flex-1 px-4 py-2 text-sm font-mono rounded border transition-all ${
                  mode === 'encode'
                    ? 'bg-blue-900/50 border-blue-500 text-blue-300'
                    : 'bg-gray-800 border-gray-700 text-gray-500'
                }`}
              >
                🔒 ENCODE
              </button>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-mono text-gray-500 mb-2">SAMPLE MESSAGES TO DECODE:</h4>
              <div className="space-y-2">
                {encodedMessages.map((msg, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInputText(msg.encoded);
                      setMethod(msg.method as typeof method);
                      if (msg.shift) setCaesarShift(msg.shift);
                    }}
                    className="w-full text-left text-xs font-mono bg-gray-800 border border-gray-700 rounded p-2 hover:border-purple-700 transition-colors"
                  >
                    <span className="text-gray-500">[{msg.method}]</span>{' '}
                    <span className="text-purple-300">{msg.encoded}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Input/Output */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-mono text-gray-400 mb-2">
              {mode === 'decode' ? '🔒 ENCODED INPUT' : '📝 PLAIN TEXT INPUT'}
            </h3>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-32 bg-black border border-gray-700 rounded p-3 font-mono text-sm text-green-400 resize-none focus:border-purple-500 focus:outline-none"
              placeholder={mode === 'decode' ? 'Paste encoded text here...' : 'Enter text to encode...'}
              spellCheck={false}
            />
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-mono text-gray-400 mb-2">
              {mode === 'decode' ? '📝 DECODED OUTPUT' : '🔒 ENCODED OUTPUT'}
            </h3>
            <div className="w-full h-32 bg-black border border-gray-700 rounded p-3 font-mono text-sm text-cyan-400 overflow-auto">
              {outputText || <span className="text-gray-600">Output will appear here...</span>}
            </div>
          </div>
        </div>

        {/* Process button */}
        <div className="text-center mb-6">
          <button
            onClick={handleDecode}
            className="bg-purple-900/50 border border-purple-500 text-purple-300 px-8 py-3 rounded-lg font-mono hover:bg-purple-800/50 transition-all"
          >
            {mode === 'decode' ? '🔓 DECODE MESSAGE' : '🔒 ENCODE MESSAGE'}
          </button>
        </div>

        {/* Secret message reveal */}
        {showSecret && (
          <div className="bg-red-950/30 border border-red-800 rounded-lg p-6 mb-6 animate-pulse">
            <p className="text-red-400 font-mono text-sm">{secretMessage}</p>
            <p className="text-red-300/60 font-mono text-xs mt-2">
              The frequency is 7.83 Hz. The Schumann resonance. The Earth's heartbeat.
              Or... is it something else entirely?
            </p>
          </div>
        )}

        {/* Hidden challenge */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-mono text-yellow-500 mb-2">🧩 CHALLENGE</h3>
          <p className="text-xs font-mono text-gray-400 mb-3">
            Decode this message to reveal a hidden truth:
          </p>
          <div className="bg-black rounded p-3 font-mono text-sm text-yellow-300 mb-3">
            UGhlIHRydXRoIGlzIGhpZGRlbiBpbiBwbGFpSBzaWdodC4gTG9vayBhdCB0aGUgc291cmNlIGNvZGUu
          </div>
          <p className="text-xs text-gray-600 font-mono">
            Hint: This is Base64 encoded. Try decoding it...
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => onNavigate('narrative')}
            className="text-gray-500 hover:text-gray-300 text-sm font-mono"
          >
            ← Archives
          </button>
          <button
            onClick={() => onNavigate('corporate')}
            className="text-gray-500 hover:text-gray-300 text-sm font-mono"
          >
            [Return to surface]
          </button>
        </div>
      </div>
    </div>
  );
}
