import React from 'react';
import { usePerformance } from '../../context/PerformanceContext';
import { Layers, Eye, RefreshCw, Cpu, Compass } from 'lucide-react';

export const FloatingSideDock = () => {
  const { setActiveTour, activeTour, timeOfDay, setTimeOfDay } = usePerformance();

  const toggleLighting = () => {
    const next = timeOfDay === 'golden' ? 'morning' : timeOfDay === 'morning' ? 'sunrise' : 'golden';
    setTimeOfDay(next);
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-2.5 p-1.5 rounded-full bg-forest-950/70 backdrop-blur-xl border border-white/10 shadow-2xl">
      {/* Reset Camera to Panorama */}
      <button
        onClick={() => setActiveTour('panorama')}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
          activeTour === 'panorama'
            ? 'bg-emerald-500 text-stone-950 shadow-lg shadow-emerald-500/30'
            : 'bg-white/5 text-cream-200/70 hover:bg-white/15 hover:text-white'
        }`}
        title="Reset to Farm Panorama"
      >
        <Compass className="w-4 h-4" />
      </button>

      {/* Cycle Lighting State */}
      <button
        onClick={toggleLighting}
        className="w-9 h-9 rounded-full bg-white/5 text-amber-300 hover:bg-amber-500/20 hover:text-amber-200 flex items-center justify-center transition-all"
        title={`Cycle Lighting Atmosphere (Current: ${timeOfDay})`}
      >
        <Eye className="w-4 h-4" />
      </button>

      {/* Jump to Precision Fields */}
      <button
        onClick={() => setActiveTour('fields')}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
          activeTour === 'fields'
            ? 'bg-emerald-500 text-stone-950 shadow-lg shadow-emerald-500/30'
            : 'bg-white/5 text-cream-200/70 hover:bg-white/15 hover:text-white'
        }`}
        title="Focus Precision Crop Fields"
      >
        <Layers className="w-4 h-4" />
      </button>

      {/* IoT Mesh Hub */}
      <button
        onClick={() => setActiveTour('solar')}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
          activeTour === 'solar'
            ? 'bg-emerald-500 text-stone-950 shadow-lg shadow-emerald-500/30'
            : 'bg-white/5 text-cream-200/70 hover:bg-white/15 hover:text-white'
        }`}
        title="Focus Solar Ag-Grid Hub"
      >
        <Cpu className="w-4 h-4" />
      </button>
    </div>
  );
};
