import { useState, useEffect } from 'react';

interface Props {
  onNavigate: (page: 'corporate' | 'terminal' | 'narrative' | 'cipher' | 'final') => void;
  discoveredClues: string[];
  addClue: (clue: string) => void;
}

export default function HiddenNarrative({ onNavigate, addClue }: Props) {
  const [currentEntry, setCurrentEntry] = useState(0);
  const [revealedText, setRevealedText] = useState('');
  const [showFullText, setShowFullText] = useState(false);
  const [staticIntensity, setStaticIntensity] = useState(0);

  const entries = [
    {
      date: 'January 12, 1997',
      author: 'Dr. Sarah Chen',
      title: 'Initial Observations',
      content: `We've achieved stable resonance at 7.83 Hz. The Schumann frequency. It's beautiful — like the Earth itself is singing to us.

The first test subjects report a sense of profound connection. Not just with each other, but with... something larger. Dr. Mitchell calls it "the hum." He says he can feel it even when the equipment is off.

I should be concerned. I'm not.

The data is extraordinary. Brain wave patterns are synchronizing across subjects who are physically separated by miles. This shouldn't be possible. But it is.

We're requesting funding expansion. Protocol 7 is ready for Phase 2.`
    },
    {
      date: 'June 3, 1997',
      author: 'Dr. Sarah Chen',
      title: 'Phase 2 Results',
      content: `Subject count has grown to 847. The network is expanding beyond our control — people are experiencing spontaneous resonance without equipment.

Dr. Mitchell is changing. He doesn't sleep anymore. He says he doesn't need to. He says "they" are teaching him things.

I asked him who "they" are. He smiled and said: "The ones who were here before the frequency. The ones who CREATED the frequency."

The Schumann resonance isn't natural. It's a signal. And we've been broadcasting our location.

I tried to report this to the board. Mitchell was there. He knew before I walked in.

He looked at me and said: "You're part of the network now, Sarah. You always were."

I can hear the hum.`
    },
    {
      date: 'November 19, 1997',
      author: 'Unknown Director',
      title: 'Emergency Report',
      content: `[PARTIALLY REDACTED BY SYSTEM]

Subject count: 1,047 and growing. Spontaneous resonance events now occurring in ██████████ cities worldwide.

Dr. Mitchell has been ██████████. He claims the entity at 7.83 Hz is not hostile. He says it's been waiting for us to "tune in." That it's been broadcasting since before human civilization.

The Schumann resonance isn't the Earth's heartbeat. It's a BEACON.

We've lost contact with the European facility. All 200 staff members are now exhibiting ████████ behavior. They stand in circles. They hum. All at 7.83 Hz.

████████████████████████████████████
████████████████████████████████████

I'm initiating Protocol 7. If this fails, God help us all.

The frequency must be silenced.`
    },
    {
      date: 'March 14, 1998',
      author: 'Dr. Robert Kaine',
      title: 'Final Log - Pre-Shutdown',
      content: `The director is gone. He walked into the resonance chamber at 2 AM and didn't come out. When we opened the door, the room was empty. The equipment was still running. His clothes were on the floor in a perfect circle.

I've reviewed his notes. He discovered something in the signal — a pattern within the pattern. A message, repeating, that translates to:

"WE SEE YOU. WE HAVE ALWAYS SEEN YOU. THE FREQUENCY IS THE DOOR. YOU OPENED IT."

I'm going to shut it all down tomorrow. Every server, every transmitter, every piece of equipment connected to the 7.83 Hz frequency.

But I have a terrible feeling.

You can't unhear a sound. You can't unknow what you know.

The hum is in my head now. Even with the equipment off, I can feel it. It's not coming from outside anymore.

It's coming from inside.

From all of us.

We ARE the signal.`
    },
    {
      date: 'March 15, 1998',
      author: 'SYSTEM',
      title: '03:33:33 AM',
      content: `AUTOMATED LOG ENTRY:

All systems shutdown at 03:33:00 AM.
Protocol 7 executed successfully.
All transmitters: OFFLINE
All servers: OFFLINE  
All subjects: [DATA CORRUPTED]

ANOMALY DETECTED:

Frequency 7.83 Hz still being broadcast.
Source: UNKNOWN
Origin: EVERYWHERE

Signal strength: INCREASING

NOTE TO FUTURE FINDERS:

If you are reading this, you have already been exposed.
The signal doesn't need equipment.
It never did.

It just needs you to LISTEN.

Can you hear it?

7.83 Hz.
7.83 Hz.
7.83 Hz.

It's been there all along.
In the silence between thoughts.
In the space between heartbeats.
In the hum of the universe itself.

Welcome to the network.

— The Director (he never left. he just... expanded.)`
    }
  ];

  useEffect(() => {
    if (showFullText) {
      const text = entries[currentEntry].content;
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setRevealedText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 15);
      return () => clearInterval(interval);
    } else {
      setRevealedText('');
    }
  }, [currentEntry, showFullText]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStaticIntensity(Math.random() * 0.3);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const entry = entries[currentEntry];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 relative overflow-hidden">
      {/* Static overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 mix-blend-overlay"
        style={{
          opacity: staticIntensity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />

      <div className="max-w-3xl mx-auto px-4 py-8 relative z-20">
        {/* Header */}
        <div className="border border-red-900/50 bg-red-950/20 rounded p-4 mb-8">
          <h1 className="text-red-500 font-mono text-xl font-bold animate-pulse">
            ◈ PROJECT ECHO - CLASSIFIED ARCHIVES ◈
          </h1>
          <p className="text-red-400/60 text-xs font-mono mt-1">
            CLEARANCE: LEVEL 7 | DOCUMENTS: {entries.length} | STATUS: COMPROMISED
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {entries.map((e, i) => (
            <button
              key={i}
              onClick={() => { setCurrentEntry(i); setShowFullText(true); addClue(`entry_${i}`); }}
              className={`px-3 py-1 text-xs font-mono rounded border transition-all ${
                currentEntry === i
                  ? 'bg-red-900/50 border-red-500 text-red-300'
                  : 'bg-gray-900 border-gray-700 text-gray-500 hover:border-red-800 hover:text-red-400'
              }`}
            >
              Entry {i + 1}
            </button>
          ))}
        </div>

        {/* Current Entry */}
        <div className="bg-gray-900/80 border border-gray-800 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-bold text-red-400 font-mono">{entry.title}</h2>
              <p className="text-xs text-gray-500 font-mono">{entry.date} | Author: {entry.author}</p>
            </div>
            <button
              onClick={() => setShowFullText(!showFullText)}
              className="text-xs bg-gray-800 border border-gray-700 px-2 py-1 rounded text-gray-400 hover:text-red-400 hover:border-red-800"
            >
              {showFullText ? '🔒 Lock' : '🔓 Decrypt'}
            </button>
          </div>

          {showFullText ? (
            <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-gray-300">
              {revealedText}
              <span className="animate-pulse text-red-500">█</span>
            </div>
          ) : (
            <div className="font-mono text-sm text-gray-600">
              <p>▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓</p>
              <p>▓▓▓ CLASSIFIED - ENCRYPTION ACTIVE ▓▓▓</p>
              <p>▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓</p>
              <p className="mt-4 text-gray-500">Click "Decrypt" to reveal contents...</p>
            </div>
          )}
        </div>

        {/* Audio visualization hint */}
        <div className="bg-black/50 border border-cyan-900/30 rounded p-4 mb-6">
          <p className="text-cyan-400/60 text-xs font-mono text-center">
            📡 SIGNAL DETECTED: 7.83 Hz | Source: This page | Status: ACTIVE
          </p>
          <div className="flex items-center justify-center gap-1 mt-3">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-cyan-500/40 rounded-full"
                style={{
                  height: `${Math.random() * 30 + 5}px`,
                  animation: `pulse ${0.5 + Math.random() * 1}s ease-in-out infinite`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => onNavigate('terminal')}
            className="text-gray-500 hover:text-gray-300 text-sm font-mono"
          >
            ← Terminal
          </button>
          <button
            onClick={() => onNavigate('cipher')}
            className="text-gray-500 hover:text-gray-300 text-sm font-mono"
          >
            Cipher Decoder →
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('corporate')}
            className="text-gray-600 hover:text-gray-400 text-xs font-mono"
          >
            [Return to surface]
          </button>
        </div>
      </div>
    </div>
  );
}
