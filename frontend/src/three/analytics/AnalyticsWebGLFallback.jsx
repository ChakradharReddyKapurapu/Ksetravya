import React from 'react';
import { BarChart3, TrendingUp, Sparkles } from 'lucide-react';

export const AnalyticsWebGLFallback = () => {
  return (
    <div className="relative w-full h-full min-h-[700px] overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#064e3b] flex items-center justify-center select-none">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f715_1px,transparent_1px),linear-gradient(to_bottom,#a855f715_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />

      {/* Glowing Horizon Flare */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl" />

      {/* Farmland Horizon SVG */}
      <svg
        className="absolute bottom-0 w-full h-auto text-[#022c22] pointer-events-none opacity-85"
        viewBox="0 0 1440 320"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,180 L240,240 L480,160 L720,220 L960,170 L1200,230 L1440,190 L1440,320 L0,320 Z" />
      </svg>

      {/* Status Badge */}
      <div className="absolute top-28 left-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/85 border border-purple-400/30 text-xs font-mono text-purple-300 backdrop-blur-md shadow-2xl">
        <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
        <span>Agricultural Intelligence 2D Viewport Active</span>
      </div>
    </div>
  );
};
