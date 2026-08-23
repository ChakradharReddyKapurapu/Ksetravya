import React from 'react';
import { Sun, Users, Tractor, Sprout } from 'lucide-react';

export const JobsWebGLFallback = () => {
  return (
    <div className="relative w-full h-full min-h-[700px] overflow-hidden bg-gradient-to-b from-[#1b2a1a] via-[#142314] to-[#0a140a] flex items-center justify-center select-none">
      {/* Sunrise Flare */}
      <div className="absolute top-10 left-1/3 w-72 h-72 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-transparent opacity-80 blur-3xl animate-pulse" />
      <div className="absolute top-16 left-[36%] w-24 h-24 rounded-full bg-amber-100 opacity-90 shadow-[0_0_80px_rgba(251,191,36,0.8)]" />

      {/* Distant Hills Silhouette SVG */}
      <svg
        className="absolute bottom-0 w-full h-auto text-[#0f2113] opacity-80 pointer-events-none"
        viewBox="0 0 1440 360"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,260 L200,160 L420,240 L640,120 L860,220 L1080,150 L1300,240 L1440,180 L1440,360 L0,360 Z" />
      </svg>

      {/* Terraced Crop Fields SVG */}
      <svg
        className="absolute bottom-0 w-full h-auto text-[#18361e] pointer-events-none"
        viewBox="0 0 1440 300"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,200 Q360,120 720,180 T1440,150 L1440,300 L0,300 Z" />
      </svg>

      {/* Farm Road SVG */}
      <svg
        className="absolute bottom-0 w-full h-auto pointer-events-none"
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
      >
        <path
          d="M680,240 Q740,160 820,190 T980,140 L1020,140 Q860,190 780,160 T710,240 Z"
          fill="#8c6848"
          opacity="0.85"
        />
      </svg>

      {/* Animated Floating Workers & Spores */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-emerald-300/60 blur-[1px] animate-float"
            style={{
              top: `${20 + (i * 15) % 65}%`,
              left: `${10 + (i * 19) % 80}%`,
              animationDelay: `${(i * 0.4).toFixed(1)}s`,
              animationDuration: `${3.2 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      {/* Mode Badge */}
      <div className="absolute top-28 left-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/85 border border-emerald-400/30 text-xs font-mono text-emerald-300 backdrop-blur-md shadow-2xl">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Agricultural Work Morning Viewport Active</span>
      </div>
    </div>
  );
};
