import React from 'react';
import { Sun, Sprout, Wind, Droplets, Compass } from 'lucide-react';

export const WebGLFallback = () => {
  return (
    <div className="relative w-full h-full min-h-[700px] overflow-hidden bg-gradient-to-b from-[#2a1d12] via-[#1f2e1a] to-[#0c1f14] flex items-center justify-center select-none">
      {/* Golden Sun Flare */}
      <div className="absolute top-12 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-transparent opacity-85 blur-3xl animate-pulse" />
      <div className="absolute top-20 right-[28%] w-28 h-28 rounded-full bg-amber-100 opacity-95 shadow-[0_0_100px_rgba(251,191,36,0.9)]" />

      {/* Distant Mountains Silhouette SVG */}
      <svg
        className="absolute bottom-0 w-full h-auto text-[#14261b] opacity-80 pointer-events-none"
        viewBox="0 0 1440 380"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,280 L180,180 L360,260 L540,140 L720,240 L900,160 L1080,260 L1260,190 L1440,280 L1440,380 L0,380 Z" />
      </svg>

      {/* Terraced Rolling Hills SVG */}
      <svg
        className="absolute bottom-0 w-full h-auto text-[#22442d] pointer-events-none"
        viewBox="0 0 1440 320"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,220 Q360,140 720,200 T1440,180 L1440,320 L0,320 Z" />
      </svg>

      {/* Reflective River Ribbon */}
      <svg
        className="absolute bottom-0 w-full h-auto pointer-events-none"
        viewBox="0 0 1440 260"
        preserveAspectRatio="none"
      >
        <path
          d="M620,260 Q720,180 840,210 T1040,160 L1090,160 Q890,210 770,180 T660,260 Z"
          fill="url(#riverGradGolden)"
          opacity="0.9"
        />
        <defs>
          <linearGradient id="riverGradGolden" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="40%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Golden Wheat Terraces SVG */}
      <svg
        className="absolute bottom-0 w-full h-auto text-[#2b5839] pointer-events-none"
        viewBox="0 0 1440 220"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,140 Q400,200 800,130 T1440,160 L1440,220 L0,220 Z" />
        {/* Golden wheat highlight */}
        <polygon points="60,180 360,155 410,220 30,220" fill="#d97706" opacity="0.65" />
        <polygon points="100,175 330,150 370,220 70,220" fill="#f59e0b" opacity="0.45" />
      </svg>

      {/* Floating Animated CSS Seed / Pollen Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2.5 h-2.5 rounded-full bg-amber-300/70 blur-[1px] animate-float"
            style={{
              top: `${15 + (i * 17) % 70}%`,
              left: `${8 + (i * 21) % 84}%`,
              animationDelay: `${(i * 0.35).toFixed(1)}s`,
              animationDuration: `${3.5 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      {/* Accessible Informational Badge */}
      <div className="absolute top-28 left-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/85 border border-amber-400/30 text-xs font-mono text-amber-300 backdrop-blur-md shadow-2xl">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <span>Golden 2D Vector Fallback Mode</span>
      </div>
    </div>
  );
};
