import { useEffect, useState } from 'react';

export default function GlitchOverlay() {
  const [glitches, setGlitches] = useState<Array<{ id: number; top: number; left: number; width: number; height: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newGlitches = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        width: Math.random() * 100,
        height: Math.random() * 5 + 1,
      }));
      setGlitches(newGlitches);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Glitch bars */}
      {glitches.map(g => (
        <div
          key={g.id}
          className="absolute bg-red-500/20 mix-blend-screen"
          style={{
            top: `${g.top}%`,
            left: `${g.left}%`,
            width: `${g.width}%`,
            height: `${g.height}px`,
          }}
        />
      ))}
      
      {/* Color channel separation effect */}
      <div className="absolute inset-0 mix-blend-screen opacity-30"
        style={{
          background: 'linear-gradient(90deg, rgba(255,0,0,0.1) 0%, transparent 33%, rgba(0,255,0,0.1) 33%, transparent 66%, rgba(0,0,255,0.1) 66%)',
          transform: `translateX(${Math.random() * 4 - 2}px)`,
        }}
      />

      {/* Flash effect */}
      <div className="absolute inset-0 bg-white/5 animate-pulse" />
      
      {/* Text glitch */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500/30 font-mono text-4xl font-bold whitespace-nowrap">
        7.83 Hz
      </div>
    </div>
  );
}
