import React from 'react';
import { Store, ShoppingCart, TrendingUp, Truck } from 'lucide-react';

export const MarketWebGLFallback = () => {
  return (
    <div className="relative w-full h-full min-h-[600px] overflow-hidden bg-gradient-to-b from-[#2a1a0f] via-[#1c291e] to-[#0c1810] flex items-center justify-center select-none">
      {/* Warm Golden Market Sun Halo */}
      <div className="absolute top-10 left-1/3 w-72 h-72 rounded-full bg-amber-400/20 blur-3xl" />

      {/* Stylized Market Arch & Plaza Vector Illustration */}
      <svg
        className="absolute bottom-0 w-full h-auto text-[#1f150c] opacity-85 pointer-events-none"
        viewBox="0 0 1440 380"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,300 L200,260 L400,280 L600,180 L840,180 L1040,280 L1240,260 L1440,300 L1440,380 L0,380 Z" />
      </svg>

      {/* Market Stalls Silhouette */}
      <svg
        className="absolute bottom-0 w-full h-auto text-[#3b2416] opacity-75 pointer-events-none"
        viewBox="0 0 1440 260"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M120,260 L120,180 L280,180 L280,260 M400,260 L400,160 L580,160 L580,260 M860,260 L860,160 L1040,160 L1040,260 M1160,260 L1160,180 L1320,180 L1320,260 Z" />
      </svg>

      {/* Floating Dust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-amber-300/60 blur-[1px] animate-float"
            style={{
              top: `${20 + (i * 18) % 65}%`,
              left: `${10 + (i * 22) % 80}%`,
              animationDelay: `${(i * 0.4).toFixed(1)}s`,
              animationDuration: `${3.5 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      {/* Accessible Badge */}
      <div className="absolute top-24 left-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/90 border border-amber-400/40 text-xs font-mono text-amber-300 backdrop-blur-md shadow-2xl">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <span>2D Agricultural Wholesale Market Mode</span>
      </div>
    </div>
  );
};
