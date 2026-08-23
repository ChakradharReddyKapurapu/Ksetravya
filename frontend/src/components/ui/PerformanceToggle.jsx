import React, { useState } from 'react';
import { usePerformance } from '../../context/PerformanceContext';
import { Sparkles, Gauge, Zap, Monitor, Settings2 } from 'lucide-react';

export const PerformanceToggle = () => {
  const { qualityMode, setQualityMode, force2DFallback, setForce2DFallback } = usePerformance();
  const [isOpen, setIsOpen] = useState(false);

  const modes = [
    {
      id: 'immersive',
      name: 'Immersive',
      desc: 'Full 3D, particles, dynamic water & reflections',
      icon: Sparkles,
      color: 'text-emerald-400',
    },
    {
      id: 'balanced',
      name: 'Balanced',
      desc: 'Optimized shadows, steady 60fps',
      icon: Gauge,
      color: 'text-sky-400',
    },
    {
      id: 'performance',
      name: 'Performance',
      desc: 'Low-poly ultra-fast rendering',
      icon: Zap,
      color: 'text-amber-400',
    },
  ];

  const currentMode = modes.find((m) => m.id === qualityMode);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-900/80 hover:bg-forest-800 border border-white/10 text-xs font-mono text-cream-200 transition-all duration-200"
        title="Graphics & Performance Settings"
      >
        {currentMode && <currentMode.icon className={`w-3.5 h-3.5 ${currentMode.color}`} />}
        <span className="hidden sm:inline capitalize">{qualityMode} Mode</span>
        <Settings2 className="w-3 h-3 text-cream-200/50 ml-0.5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 p-3 rounded-2xl bg-forest-950/95 backdrop-blur-2xl border border-white/15 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <span className="text-xs font-semibold text-white uppercase tracking-wider font-mono">Graphics Quality</span>
            <span className="text-[10px] text-cream-200/50 font-mono">Real-time LOD</span>
          </div>

          <div className="space-y-1.5">
            {modes.map((mode) => {
              const Icon = mode.icon;
              const isSelected = qualityMode === mode.id && !force2DFallback;
              return (
                <button
                  key={mode.id}
                  onClick={() => {
                    setQualityMode(mode.id);
                    setForce2DFallback(false);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-emerald-900/40 border border-emerald-500/40'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 mt-0.5 ${mode.color}`} />
                  <div>
                    <div className="text-xs font-medium text-white">{mode.name}</div>
                    <div className="text-[10px] text-cream-200/60 leading-tight mt-0.5">{mode.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-[11px] text-cream-200">2D Vector Fallback</span>
            </div>
            <button
              onClick={() => setForce2DFallback(!force2DFallback)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors ${
                force2DFallback
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-white/5 text-stone-400 border-white/10 hover:text-white'
              }`}
            >
              {force2DFallback ? 'Enabled (2D)' : 'WebGL Active'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
