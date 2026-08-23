import React from 'react';
import { Map, Compass, Waves, Sun } from 'lucide-react';

export const LandWebGLFallback = () => {
  return (
    <div className="relative w-full h-full min-h-[700px] overflow-hidden bg-gradient-to-b from-[#1c2e17] via-[#142410] to-[#0a1408] flex items-center justify-center select-none">
      {/* Golden Sunrise Glow */}
      <div className="absolute top-8 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-transparent opacity-75 blur-3xl animate-pulse" />
      <div className="absolute top-16 left-[28%] w-28 h-28 rounded-full bg-amber-100 opacity-90 shadow-[0_0_90px_rgba(251,191,36,0.9)]" />

      {/* Distant Hills Silhouette SVG */}
      <svg
        className="absolute bottom-0 w-full h-auto text-[#0f2110] opacity-85 pointer-events-none"
        viewBox="0 0 1440 380"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,280 L180,180 L380,260 L600,140 L820,240 L1040,160 L1260,250 L1440,200 L1440,380 L0,380 Z" />
      </svg>

      {/* Subdivided Land Parcels SVG */}
      <svg
        className="absolute bottom-0 w-full h-auto text-[#183616] pointer-events-none"
        viewBox="0 0 1440 320"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,220 Q360,140 720,200 T1440,170 L1440,320 L0,320 Z" />
      </svg>

      {/* Irrigation Canal SVG (Diagonal Blue Ribbon) */}
      <svg
        className="absolute bottom-0 w-full h-auto pointer-events-none opacity-80"
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
      >
        <path d="M300,240 L880,120 L910,120 L330,240 Z" fill="#38bdf8" />
      </svg>

      {/* Floating Spores */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-amber-300/60 blur-[1px] animate-float"
            style={{
              top: `${15 + (i * 14) % 70}%`,
              left: `${8 + (i * 18) % 85}%`,
              animationDelay: `${(i * 0.35).toFixed(1)}s`,
              animationDuration: `${3.5 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      {/* Status Badge */}
      <div className="absolute top-28 left-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/85 border border-amber-400/30 text-xs font-mono text-amber-300 backdrop-blur-md shadow-2xl">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <span>Farmland Discovery 2D Viewport Active</span>
      </div>
    </div>
  );
};
